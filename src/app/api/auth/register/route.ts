import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { AUTH_COOKIE, cookieOpts, signAuthToken } from "@/lib/auth";

type Body = {
    ime: string;
    prezime: string;
    email: string;
    sifra: string;
    uloga?: "pcelar" | "poljoprivrednik" | "administrator";
}

export async function POST(req: Request) {
    const body = await req.json() as Body;
    const { ime, prezime, email, sifra, uloga } = body;

    if (!ime || !prezime || !email || !sifra) {
        return NextResponse.json({ error: "Nedostaju podaci" }, { status: 400 });
    }

    // 1. Provera da li korisnik postoji
    const exists = await db.select().from(users).where(eq(users.email, email));
    if (exists.length > 0) {
        return NextResponse.json({ error: "Email postoji u bazi" }, { status: 400 });
    }

    const hashedSifra = await bcrypt.hash(sifra, 10);

    const noviId = crypto.randomUUID();

    await db.insert(users).values({
        id: noviId,
        ime,
        prezime,
        email,
        sifra: hashedSifra,
        uloga: uloga || "pcelar"
    });


    const token = signAuthToken({ sub: noviId, email, name: ime });

    const res = NextResponse.json({ id: noviId, email, ime });


    res.cookies.set(AUTH_COOKIE, token, cookieOpts());

    return res;
}