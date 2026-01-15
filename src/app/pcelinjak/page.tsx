import ListaPcelinjaka from "@/components/ListaPcelinjaka";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">
        Veb pčelarstvo
      </h1>

      <div className="max-w-2xl space-y-4">
      <ListaPcelinjaka />
      </div>
    </main>
  );
}
