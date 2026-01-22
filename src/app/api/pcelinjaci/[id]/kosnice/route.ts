import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/db";
import { kosnice } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id: pcelinjakId } = await ctx.params;

  const rows = await db
    .select()
    .from(kosnice)
    .where(eq(kosnice.pcelinjakId, pcelinjakId))
    .orderBy(asc(kosnice.broj));

  return NextResponse.json(rows);
}

export async function POST(req: NextRequest, ctx: Ctx) {
  const { id: pcelinjakId } = await ctx.params;
  const body = await req.json();

  const broj = Number(body.broj);
  const tip = body.tip == null ? null : String(body.tip).trim();
  const starostMatice = body.starostMatice == null ? null : Number(body.starostMatice);
  const brNastavaka = body.brNastavaka == null ? null : Number(body.brNastavaka);

  if (!Number.isFinite(broj) || broj <= 0) {
    return NextResponse.json({ error: "Broj košnice mora biti pozitivan broj" }, { status: 400 });
  }

  // (opciono, ali preporuka) da broj bude jedinstven po pčelinjaku:
  const exists = await db
    .select({ id: kosnice.id, broj: kosnice.broj })
    .from(kosnice)
    .where(eq(kosnice.pcelinjakId, pcelinjakId));

  if (exists.some((k: any) => k.broj === broj)) {
    return NextResponse.json({ error: "Košnica sa tim brojem već postoji u ovom pčelinjaku" }, { status: 400 });
  }

 await db.insert(kosnice).values({
  broj,
  tip,
  starostMatice:
    starostMatice == null || Number.isNaN(starostMatice)
      ? null
      : starostMatice,
  brNastavaka:
    brNastavaka == null || Number.isNaN(brNastavaka)
      ? null
      : brNastavaka,
  pcelinjakId,
});

return NextResponse.json({ ok: true }, { status: 201 });

}
