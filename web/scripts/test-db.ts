import "dotenv/config";
import { db } from "../lib/db";
import { users } from "../lib/db/schema";

async function testConn() {
    try {
        console.log("Testing DB connection...");
        const result = await db.select().from(users).limit(1);
        console.log("Connection successful, found users:", result.length);
        process.exit(0);
    } catch (err) {
        console.error("DB Connection failed:", err);
        process.exit(1);
    }
}

testConn();
