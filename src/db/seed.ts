import "dotenv/config";
import { users } from "./schema";
import { db } from "./index";
import bcrypt from "bcrypt";

async function seed() {
    // Hešovanje lozinke
    const hash = await bcrypt.hash("1233", 10);

    console.log("⏳ Ubacivanje podataka u bazu...");

    try {
        await db.transaction(async (tx) => {
            await tx.insert(users).values([
                {
                    id: "7a0a1e00-9651-4071-86b8-ed32dba35bf2",
                    ime: "Marko",
                    prezime: "Markovic",
                    email: "markovic@gmail.com",
                    sifra: hash,
                    uloga: "administrator", // Morate navesti ulogu jer je notNull
                },
                {
                    id: "7a0a1e00-9651-4071-86b8-ed32dba35bf3",
                    ime: "Petar",
                    prezime: "Petrović",
                    email: "petrovic@gmail.com",
                    sifra: hash,
                    uloga: "pcelar",
                },
                {
                    id: "7a0a1e00-9651-4071-86b8-ed32dba35bf4",
                    ime: "Janko",
                    prezime: "Jankovic",
                    email: "jankovic@gmail.com",
                    sifra: hash,
                    uloga: "poljoprivrednik",
                },
            ]);
        });

        console.log("Podaci su uspešno uneti!");
    } catch (error) {
        console.error("Greška pri unosu podataka:", error);
    } finally {
        process.exit(0);
    }
}

seed();