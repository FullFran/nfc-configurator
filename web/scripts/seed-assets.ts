import "dotenv/config";
import { nanoid } from "nanoid";
import { db } from "../lib/db";
import { assets, users } from "../lib/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

const TOTAL_ASSETS = 20; // Reduced for testing

async function seed() {
    console.log("🌱 Seeding database...");

    // 1. Create Test User
    const email = "admin@test.com";
    const password = "password123";
    const passwordHash = await bcrypt.hash(password, 10);

    try {
        const [existing] = await db.select().from(users).where(eq(users.email, email)) as any[];
        if (!existing) {
            await db.insert(users).values({
                email,
                passwordHash,
                role: "ADMIN",
            });
            console.log(`👤 Test user created: ${email} / ${password}`);
        }
    } catch (e) {
        console.error("❌ Error creating test user:", e);
    }

    // 2. Create Assets
    console.log(`📦 Generating ${TOTAL_ASSETS} assets...`);
    for (let i = 0; i < TOTAL_ASSETS; i++) {
        const publicId = nanoid(10);
        const claimCode = nanoid(12);

        try {
            await db.insert(assets).values({
                publicId,
                claimCode,
                status: "NO_CLAIMED",
            });
            console.log(`✅ Asset: ${publicId} (Claim: ${claimCode})`);
        } catch (e) {
            // Ignore duplicates
        }
    }

    console.log("🏁 Seeding complete.");
}

seed();
