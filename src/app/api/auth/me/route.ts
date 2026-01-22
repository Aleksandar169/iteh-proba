import { db } from "@/db";
import { users } from "@/db/schema";
import { AUTH_COOKIE, verifyAuthToken } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const token = (await cookies()).get(AUTH_COOKIE)?.value
    if (!token) {
        return NextResponse.json({ user: null })
    }

    try {
        const claims = verifyAuthToken(token);
        const [u] = await db
            .select({ id: users.id, name: users.ime, email: users.email, createdAt: users.createdAt })
            .from(users)
            .where(eq(users.id, claims.sub))

        return NextResponse.json({ user: u ?? null })
    } catch {
        return NextResponse.json({ user: null }, { status: 401 })
    }
}