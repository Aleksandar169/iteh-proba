"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    useCallback,
} from "react";

export type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
};

type AuthState =
    | { status: "loading"; user: null }
    | { status: "unauthenticated"; user: null }
    | { status: "authenticated"; user: User };

type AuthContextType = AuthState & {
    refresh: () => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>({
        status: "loading",
        user: null,
    });


    const refresh = useCallback(async () => {
        try {
            setState({ status: "loading", user: null });

            const res = await fetch("/api/auth/me", {
                credentials: "include",
            });

            if (!res.ok) {
                setState({ status: "unauthenticated", user: null });
                return;
            }

            const data = await res.json();

            if (data.user) {
                setState({ status: "authenticated", user: data.user });
            } else {
                setState({ status: "unauthenticated", user: null });
            }
        } catch {
            setState({ status: "unauthenticated", user: null });
        }
    }, []);


    const logout = useCallback(async () => {
        await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        setState({ status: "unauthenticated", user: null });
    }, []);


    useEffect(() => {
        refresh();
    }, [refresh]);

    const value = useMemo<AuthContextType>(
        () => ({
            ...state,
            refresh,
            logout,
        }),
        [state, refresh, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx;
}
