import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center text-center gap-10">
      
      
      <Image
        src="/logo.png"
        alt="Veb pčelarstvo"
        width={220}
        height={110}
        priority
      />

     
      <h1 className="text-4xl font-bold text-gray-900">
        Dobrodošli na <span className="text-orange-600">Veb pčelarstvo</span>
      </h1>

      
      <p className="max-w-3xl text-lg text-gray-700 leading-relaxed">
        Veb pčelarstvo je aplikacija namenjena pčelarima za lakše vođenje evidencije
        o pčelinjacima, svakodnevnim aktivnostima i ličnom pčelarskom dnevniku.
        Na jednom mestu možete pratiti sve što je važno za uspešno i organizovano pčelarstvo.
      </p>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-orange-600 mb-2">
            🐝 Aktivnosti
          </h3>
          <p className="text-gray-600">
            Beležite sve aktivnosti vezane za rad sa košnicama, tretmane,
            preglede i sezonske poslove.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-orange-600 mb-2">
            🍯 Pčelinjak
          </h3>
          <p className="text-gray-600">
            Upravljajte svojim pčelinjacima i košnicama uz jasan pregled
            i jednostavnu organizaciju podataka.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-orange-600 mb-2">
            📓 Moj dnevnik
          </h3>
          <p className="text-gray-600">
            Vodite lični pčelarski dnevnik i sačuvajte svoja iskustva,
            zapažanja i planove.
          </p>
        </div>
      </div>

    </section>
  );
}

