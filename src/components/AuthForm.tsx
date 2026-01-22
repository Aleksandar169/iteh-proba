
"use client";

import { useState } from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";

export default function AuthBox() {
    const router = useRouter();
    const [isRegister, setIsRegister] = useState(false);

    // State polja
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();


        const payload = isRegister
            ? { ime: name, prezime: lastName, email, sifra: password, confirmPassword }
            : { email, password };

        try {
            const res = await fetch(isRegister ? "/api/auth/register" : "/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server nije vratio JSON. Proveri putanju (route.ts).");
            }

            const data = await res.json();

            if (!res.ok) {
                alert("Greška: " + (data.error || "Neuspešna operacija"));
                return;
            }

            if (isRegister) {
                // AKO JE REGISTRACIJA: Prebaci na login umesto na početnu
                alert("Uspešna registracija! Sada se možete prijaviti.");
                setIsRegister(false); // Menja formu na Login
                // Resetujemo polja
                setName("");
                setLastName("");
                setPassword("");
                setConfirmPassword("");
            } else {
                // AKO JE LOGIN: Prebaci na dashboard ili početnu
                alert("Uspešan login!");
                router.push("/dashboard"); // Promeni putanju po želji
            }

        } catch (err) {
            console.error("FETCH ERROR:", err);
            alert("Greška: " + err);
        }
    }

    return (
        <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-black z-50">
            <div className="absolute -top-10 -right-10 text-7xl opacity-20">🐝</div>

            <h1 className="text-2xl font-bold text-center text-yellow-600 mb-6">
                {isRegister ? "Registracija pčelara" : "Prijava na sistem"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {isRegister && (
                    <>
                        <AuthInput label="Ime" value={name} onChange={setName} className="text-black" />
                        <AuthInput label="Prezime" value={lastName} onChange={setLastName} className="text-black" />
                    </>
                )}

                <AuthInput label="Email" type="email" value={email} onChange={setEmail} className="text-black" />
                <AuthInput label="Lozinka" type="password" value={password} onChange={setPassword} className="text-black" />

                {isRegister && (
                    <AuthInput label="Potvrdi lozinku" type="password" value={confirmPassword} onChange={setConfirmPassword} className="text-black" />
                )}

                <AuthButton>
                    {isRegister ? "Registruj se" : "Prijavi se"}
                </AuthButton>
            </form>

            <p className="text-center text-sm mt-4 text-gray-600">
                {isRegister ? "Već imaš nalog?" : "Nemaš nalog?"}{" "}
                <button
                    type="button"
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-yellow-600 font-semibold hover:underline"
                >
                    {isRegister ? "Prijava" : "Registracija"}
                </button>
            </p>
        </div>
    );
}

