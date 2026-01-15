"use client";

import { useMemo, useState } from "react";
import ListaPcelinjaka, { PcelinjakItem } from "@/components/ListaPcelinjaka";
import NewPcelinjak, { NewPcelinjakForm } from "@/components/NewPcelinjak";

type ModalState =
  | { open: false }
  | { open: true; mode: "add" }
  | { open: true; mode: "edit"; editId: string };

export default function Page() {
  const initial = useMemo<PcelinjakItem[]>(
    () => [
      {
        id: "1",
        naziv: "Hergoleša",
        geoSirina: 43.32,
        geoDuzina: 21.89,
        adresa: "Priboj",
      },
      {
        id: "2",
        naziv: "Uvac",
        geoSirina: 43.4,
        geoDuzina: 19.82,
        adresa: "Nova Varoš",
      },
    ],
    []
  );

  const [pcelinjaci, setPcelinjaci] = useState<PcelinjakItem[]>(initial);
  const [modal, setModal] = useState<ModalState>({ open: false });

  const openAdd = () => setModal({ open: true, mode: "add" });
  const openEdit = (id: string) => setModal({ open: true, mode: "edit", editId: id });
  const close = () => setModal({ open: false });

  const editItem =
    modal.open && modal.mode === "edit"
      ? pcelinjaci.find((p) => p.id === modal.editId)
      : undefined;

  function handleSubmit(data: NewPcelinjakForm) {
    if (!modal.open) return;

    if (modal.mode === "add") {
      const newItem: PcelinjakItem = {
        id: crypto.randomUUID(),
        naziv: data.naziv.trim(),
        geoSirina: Number(data.geoSirina),
        geoDuzina: Number(data.geoDuzina),
        adresa: data.adresa.trim(),
      };
      setPcelinjaci((prev) => [newItem, ...prev]);
      close();
      return;
    }

    // edit
    const id = modal.editId;
    setPcelinjaci((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              naziv: data.naziv.trim(),
              geoSirina: Number(data.geoSirina),
              geoDuzina: Number(data.geoDuzina),
              adresa: data.adresa.trim(),
            }
          : p
      )
    );
    close();
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
        {/* Header */}
        <div className="mb-6 rounded-3xl border border-yellow-200/70 bg-white/70 p-6 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-yellow-900">
                Moji pčelinjaci
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Dodaj, izmeni i otvori detalje pčelinjaka.
              </p>
            </div>

            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-5 py-3 text-sm font-bold text-white shadow-md hover:opacity-95 active:scale-[0.99]"
            >
              <span className="text-lg leading-none">＋</span>
              Dodaj
            </button>
          </div>
        </div>

        {/* Lista (veće kartice, jedna ispod druge) */}
        <ListaPcelinjaka pcelinjaci={pcelinjaci} onEdit={openEdit} />

        {/* Modal */}
        {modal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={close} />
            <div className="relative z-10 w-full max-w-xl rounded-3xl border border-yellow-200 bg-white p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-gray-900">
                  {modal.mode === "add" ? "Novi pčelinjak" : "Izmena pčelinjaka"}
                </h2>
                <button
                  onClick={close}
                  className="rounded-lg px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>

              <NewPcelinjak
                initial={
                  modal.mode === "edit" && editItem
                    ? {
                        naziv: editItem.naziv,
                        geoSirina: String(editItem.geoSirina),
                        geoDuzina: String(editItem.geoDuzina),
                        adresa: editItem.adresa,
                      }
                    : undefined
                }
                onSubmit={handleSubmit}
                onCancel={close}
                submitLabel={modal.mode === "add" ? "Sačuvaj pčelinjak" : "Sačuvaj izmene"}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
