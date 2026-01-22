"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import ListaKosnica from "@/components/ListaKosnica";
import type { KosnicaItem } from "@/components/KosnicaCard";
import NewKosnica, { NewKosnicaForm } from "@/components/NewKosnica";

type ModalState =
  | { open: false }
  | { open: true; mode: "add" }
  | { open: true; mode: "edit"; editId: string };

export default function Page() {
  const params = useParams<{ id: string }>();
  const pcelinjakId = params.id;

  const [kosnice, setKosnice] = useState<KosnicaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalState>({ open: false });
  const [q, setQ] = useState("");

  const openAdd = () => setModal({ open: true, mode: "add" });
  const openEdit = (id: string) => setModal({ open: true, mode: "edit", editId: id });
  const close = () => setModal({ open: false });

  const editItem =
    modal.open && modal.mode === "edit"
      ? kosnice.find((k) => k.id === modal.editId)
      : undefined;

  async function loadKosnice() {
    setLoading(true);
    try {
      const res = await fetch(`/api/pcelinjaci/${pcelinjakId}/kosnice`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Greška pri učitavanju košnica");
      setKosnice(data ?? []);
    } catch (e) {
      console.error(e);
      alert(String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadKosnice();
  }, [pcelinjakId]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return kosnice;
    return kosnice.filter((k) => {
      const a = String(k.broj ?? "").toLowerCase();
      const b = String(k.tip ?? "").toLowerCase();
      return a.includes(s) || b.includes(s);
    });
  }, [kosnice, q]);

  async function handleDelete(kosnicaId: string) {
    try {
      const res = await fetch(`/api/kosnice/${kosnicaId}`, { method: "DELETE" });
      const out = await res.json();
      if (!res.ok) throw new Error(out?.error || "Neuspešno brisanje košnice");
      await loadKosnice();
    } catch (e) {
      console.error(e);
      alert(String(e));
    }
  }

  async function handleSubmit(form: NewKosnicaForm) {
    if (!modal.open) return;

    const payload = {
      broj: Number(form.broj),
      tip: form.tip.trim() === "" ? null : form.tip.trim(),
      starostMatice: form.starostMatice.trim() === "" ? null : Number(form.starostMatice),
      brNastavaka: form.brNastavaka.trim() === "" ? null : Number(form.brNastavaka),
    };

    try {
      if (modal.mode === "add") {
        const res = await fetch(`/api/pcelinjaci/${pcelinjakId}/kosnice`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const out = await res.json();
        if (!res.ok) throw new Error(out?.error || "Neuspešno dodavanje košnice");
        close();
        await loadKosnice();
        return;
      }

      const res = await fetch(`/api/kosnice/${modal.editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out?.error || "Neuspešna izmena košnice");
      close();
      await loadKosnice();
    } catch (e) {
      console.error(e);
      alert(String(e));
    }
  }

  return (
    <main
      className="min-h-screen px-4 py-8"
      style={{
        backgroundImage: "url(/bg-bee-blur.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 rounded-3xl border border-yellow-200/70 bg-white/70 p-6 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-yellow-900">
                Košnice pčelinjaka
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Pregled, pretraga, dodavanje i izmena košnica.
              </p>
            </div>

            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-5 py-3 text-sm font-bold text-white shadow-md hover:opacity-95 active:scale-[0.99]"
            >
              <span className="text-lg leading-none">＋</span>
              Dodaj košnicu
            </button>
          </div>

          {/* Pretraga */}
          <div className="mt-4">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Pretraga po broju ili tipu (npr. 3 ili LR)"
              className="w-full rounded-2xl border border-yellow-200 bg-white/80 p-4 text-black outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white/70 p-6 text-gray-700">Učitavanje...</div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl bg-white/70 p-6 text-gray-700">
            Nema košnica za prikaz.
          </div>
        ) : (
          <ListaKosnica kosnice={filtered} onEdit={openEdit} onDelete={handleDelete} />
        )}

        {/* Modal Add/Edit */}
        {modal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={close} />
            <div className="relative z-10 w-full max-w-xl rounded-3xl border border-yellow-200 bg-white p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-gray-900">
                  {modal.mode === "add" ? "Nova košnica" : "Izmena košnice"}
                </h2>
                <button
                  onClick={close}
                  className="rounded-lg px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>

              <NewKosnica
                initial={
                  modal.mode === "edit" && editItem
                    ? {
                        broj: String(editItem.broj ?? ""),
                        tip: editItem.tip ?? "",
                        starostMatice: editItem.starostMatice == null ? "" : String(editItem.starostMatice),
                        brNastavaka: editItem.brNastavaka == null ? "" : String(editItem.brNastavaka),
                      }
                    : undefined
                }
                onSubmit={handleSubmit}
                onCancel={close}
                submitLabel={modal.mode === "add" ? "Sačuvaj košnicu" : "Sačuvaj izmene"}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
