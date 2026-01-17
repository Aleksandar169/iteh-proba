import { db } from "@/db";
import { users } from "@/db/schema";
import { error } from "console";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";
import bcrypt from "bcrypt"
import { AUTH_COOKIE, cookieOpts, signAuthToken } from "@/lib/auth";

type Body = {
    ime: string;
    prezime: string;
    email: string;
    sifra: string;

}

export async function POST(req: Request) {
    const { ime, prezime, email, sifra } = await req.json() as Body

    if (!ime || !prezime || !email || !sifra) {
        return NextResponse.json({ error: "Nedostaju podaci" }, { status: 400 })
    }

    const exists = await db.select().from(users).where(eq(users.email, email))
    if (exists.length) {
        return NextResponse.json({ error: "Email postoji u bazi" }, { status: 400 })
    }

    const passHash = await bcrypt.hash(sifra, 10)

    const [u] = await db.insert(users).values({ ime, prezime, email, passHash }).returning({ id: users.id, email: users.email })


    const token = signAuthToken({ sub: u.id, email: u.email, name: u.ime })

    const res = NextResponse.json({ id: u.id, email: u.email, name: u.ime })
    res.cookies.set(AUTH_COOKIE, token, cookieOpts())

    return res;
}