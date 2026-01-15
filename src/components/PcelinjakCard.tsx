"use client";

import type { PcelinjakItem } from "./ListaPcelinjaka";

export default function PcelinjakCard({
  p,
  onEdit,
}: {
  p: PcelinjakItem;
  onEdit?: (id: string) => void;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-[28px] border border-yellow-200 bg-white/80 p-8 shadow-lg backdrop-blur transition hover:shadow-xl"
      style={{
        backgroundImage: "url(/pcelinjakCard.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-yellow-300 bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-900">
            🐝 Pčelinjak
          </span>

          <h3 className="mt-2 text-3xl font-extrabold text-gray-900">
            {p.naziv}
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            Klikni karticu za detalje pčelinjaka
          </p>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit?.(p.id);
          }}
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow hover:bg-gray-50"
        >
          ✏️ Izmeni
        </button>
      </div>

      {/* Content */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {/* Adresa */}
        <div className="md:col-span-2 rounded-2xl bg-white/80 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Adresa
          </p>
          <p className="mt-2 text-lg font-semibold text-gray-900">
            📍 {p.adresa}
          </p>
        </div>

        {/* Koordinate */}
        <div className="flex flex-col justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-900">
            🌍 Geo širina: {p.geoSirina}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-900">
            🌍 Geo dužina: {p.geoDuzina}
          </span>
        </div>
      </div>
    </div>
  );
}

