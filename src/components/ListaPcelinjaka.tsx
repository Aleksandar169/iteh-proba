"use client";

import Link from "next/link";
import PcelinjakCard from "./PcelinjakCard";

export type PcelinjakItem = {
  id: string;
  naziv: string;
  geoSirina: number;
  geoDuzina: number;
  adresa: string;
};

export default function ListaPcelinjaka({
  pcelinjaci,
  onEdit,
}: {
  pcelinjaci: PcelinjakItem[];
  onEdit?: (id: string) => void; // ✅ opciono
}) {
  return (
    <div className="space-y-6">
      {pcelinjaci.map((p) => (
        <Link key={p.id} href={`/pcelinjak/${p.id}`} className="block">
          <PcelinjakCard p={p} onEdit={onEdit} />
        </Link>
      ))}
    </div>
  );
}
