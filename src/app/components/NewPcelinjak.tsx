export default function NewPcelinjak() {
  return (
    <form className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-yellow-800">
        🐝 Unos pčelinjaka
      </h3>

      <div className="mb-3">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Naziv
        </label>
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
          placeholder="Unesite naziv pčelinjaka"
        />
      </div>

      <div className="mb-3">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Geo širina
        </label>
        <input
          type="number"
          step="any"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
          placeholder="npr. 43.32"
        />
      </div>

      <div className="mb-3">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Geo dužina
        </label>
        <input
          type="number"
          step="any"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
          placeholder="npr. 21.89"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Adresa
        </label>
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
          placeholder="Unesite adresu"
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600"
      >
        Sačuvaj pčelinjak
      </button>
    </form>
  );
}
