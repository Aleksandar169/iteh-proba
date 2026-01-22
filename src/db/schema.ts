import { mysqlTable, varchar, timestamp, mysqlEnum, MySqlVarBinary, boolean, decimal, int, datetime } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const ulogeKorisnika = ["administrator", "pcelar", "poljoprivrednik"] as const;

export const users = mysqlTable("users", {

    id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
    ime: varchar("ime", { length: 100 }).notNull(),
    prezime: varchar("prezime", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    sifra: varchar("sifra", { length: 255 }).notNull(),
    uloga: mysqlEnum("uloga", ulogeKorisnika).notNull(),

    createdAt: timestamp("created_at").defaultNow(),
});

// 2. PCELINJAK
export const pcelinjaci = mysqlTable("pcelinjaci", {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
    naziv: varchar("naziv", { length: 255 }).notNull(),
    adresa: varchar("adresa", { length: 255 }),
    geoSirina: decimal("geo_sirina", { precision: 10, scale: 8 }),
    geoDuzina: decimal("geo_duzina", { precision: 11, scale: 8 }),
});

// 3. IZVESTAJ (Povezuje Korisnika i Pčelinjak)
export const izvestaji = mysqlTable("izvestaji", {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
    datumOd: datetime("datum_od").notNull(),
    datumDo: datetime("datum_do").notNull(),
    korisnikId: varchar("korisnik_id", { length: 36 }).references(() => users.id),
    pcelinjakId: varchar("pcelinjak_id", { length: 36 }).references(() => pcelinjaci.id),
});

// 4. KOSNICA (Slaba entitetska celina, vezana za Pčelinjak)
export const kosnice = mysqlTable("kosnice", {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
    broj: int("broj").notNull(),
    tip: varchar("tip", { length: 100 }),
    datum: timestamp("datum").defaultNow(),
    starostMatice: int("starost_matice"),
    brNastavaka: int("br_nastavaka"),
    pcelinjakId: varchar("pcelinjak_id", { length: 36 }).references(() => pcelinjaci.id).notNull(),
});

// 5. DNEVNIK
export const dnevnici = mysqlTable("dnevnici", {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
    datum: timestamp("datum").defaultNow(),
    vreme: varchar("vreme", { length: 50 }),
    slika: varchar("slika", { length: 512 }), // URL do slike
    kolicinaMeda: decimal("kolicina_meda", { precision: 10, scale: 2 }),
    pregled: varchar("pregled", { length: 512 }),
    komentar: varchar("komentar", { length: 512 }),
    kosnicaId: varchar("kosnica_id", { length: 36 }).references(() => kosnice.id).notNull(),
});

// 6. AKTIVNOSTI
export const aktivnosti = mysqlTable("aktivnosti", {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
    naziv: varchar("naziv", { length: 255 }).notNull(),
    opis: varchar("opis", { length: 512 }),
    tip: varchar("tip", { length: 100 }),
    datum: timestamp("datum"),
    uradjen: boolean("uradjen").default(false),
});

// 7. NOTIFIKACIJA (Slabi entitet/Relacija između Korisnika i Aktivnosti)
export const notifikacije = mysqlTable("notifikacije", {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
    korisnikId: varchar("korisnik_id", { length: 36 }).references(() => users.id).notNull(),
    aktivnostId: varchar("aktivnost_id", { length: 36 }).references(() => aktivnosti.id).notNull(),
});