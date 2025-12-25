import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Campos faltantes" }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 });
        }

        // 1. Check if user exists
        const [existing] = await db.select().from(users).where(eq(users.email, email));
        if (existing) {
            return NextResponse.json({ error: "El email ya está registrado" }, { status: 400 });
        }

        // 2. Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // 3. Create user
        const [newUser] = await db.insert(users).values({
            email,
            passwordHash,
            role: "USER",
        }).returning();

        // 4. Auto-login by creating session
        const session = await getSession();
        session.userId = newUser.id;
        session.email = newUser.email;
        session.isLoggedIn = true;
        await session.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
