interface AuthButtonProps {
    children: React.ReactNode;
}

export default function AuthButton({ children }: AuthButtonProps) {
    return (
        // <button
        //     type="submit"
        //     className="w-full mt-4 bg-yellow-400 text-white font-semibold
        //          py-2 rounded-md hover:bg-yellow-500 transition"
        // >
        //     {children}
        // </button>
        <button className="w-full mt-4 bg-yellow-400 text-white font-semibold py-2 rounded-md hover:bg-yellow-500">
            {children}
        </button>
    );
}
