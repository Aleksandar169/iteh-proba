import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/db";
import { kosnice } from "@/db/schema";
import { eq } from "drizzle-orm";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const body = await req.json();

  const broj = Number(body.broj);
  const tip = body.tip == null ? null : String(body.tip).trim();
  const starostMatice = body.starostMatice == null ? null : Number(body.starostMatice);
  const brNastavaka = body.brNastavaka == null ? null : Number(body.brNastavaka);

  if (!Number.isFinite(broj) || broj <= 0) {
    return NextResponse.json({ error: "Broj košnice mora biti pozitivan broj" }, { status: 400 });
  }

  await db
    .update(kosnice)
    .set({
      broj,
      tip,
      starostMatice: starostMatice == null || Number.isNaN(starostMatice) ? null : starostMatice,
      brNastavaka: brNastavaka == null || Number.isNaN(brNastavaka) ? null : brNastavaka,
    })
    .where(eq(kosnice.id, id));

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;

  await db.delete(kosnice).where(eq(kosnice.id, id));

  return NextResponse.json({ ok: true });
}
