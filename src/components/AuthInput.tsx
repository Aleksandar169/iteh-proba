
import { Dispatch, SetStateAction } from "react";

// 1. Dodajemo className u definiciju tipova
interface AuthInputProps {
    label: string;
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
    type?: string;      // Opciono (default je text)
    className?: string; // Opciono polje za stilove
}

export default function AuthInput({
    label,
    value,
    onChange,
    type = "text",
    className = ""
}: AuthInputProps) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                // 2. Ovde primenjujemo prosleđeni className i dodajemo text-black
                className={`border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-yellow-500 text-black bg-white ${className}`}
            />
        </div>
    );
}