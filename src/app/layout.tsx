import "./globals.css";
import Header from "../components/header";
import Background from "@/components/background";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body className="min-h-screen bg-amber-50 text-gray-900 antialiased">
        <Background/>
        <Header />

        <main className="mx-auto max-w-7xl px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}

