import { db } from "@/db";
import { users } from "@/db/schema";

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import bcrypt from "bcrypt"
import { AUTH_COOKIE, cookieOpts, signAuthToken } from "@/lib/auth";
import { error } from "console";

type Body = {
    email: string;
    password: string;
}

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json() as Body

        if (!email || !password) {
            return NextResponse.json({ error: "Pogresan email ili lozinka" }, { status: 401 })
        }

        const [u] = await db.select().from(users).where(eq(users.email, email))
        if (!u) {
            return NextResponse.json({ error: "Pogresan email ili lozinka" }, { status: 401 })
        }

        const ok = await bcrypt.compare(password, u.sifra)
        if (!ok) {
            return NextResponse.json({ error: "Pogresan email ili lozinka" }, { status: 401 })
        }

        const token = signAuthToken({ sub: u.id, email: u.email, name: u.ime })

        const res = NextResponse.json({ id: u.id, email: u.email, name: u.ime })
        res.cookies.set(AUTH_COOKIE, token, cookieOpts())

        return res;
    } catch (err) {
        console.error("Login error: ", err);
        return NextResponse.json({ error: "Server trenutno nije dostupan" }, { status: 500 })
    }
}