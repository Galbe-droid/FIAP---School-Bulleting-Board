import {createContext} from "react";

interface AuthContextProp {
    token: string | null;
    role: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProp | undefined>(undefined);

export function getRoleFromToken(token: string | null): string | null {
    if (!token) {
        return null;
    }

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        return payload.role ?? null;
    } catch {
        return null;
    }
}


