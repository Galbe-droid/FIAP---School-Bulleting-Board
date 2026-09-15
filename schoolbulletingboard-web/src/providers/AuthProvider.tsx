import {AuthContext, getRoleFromToken} from "../context/AuthContext";
import {type ReactNode, useState} from "react";

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    const [role, setRole] = useState<string | null>(
        getRoleFromToken(localStorage.getItem("token"))
    );

    console.log("AUTH CONTEXT:", {
        token,
        role,
        isAuthenticated: !!token,
    });

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);

        setToken(newToken);
        setRole(getRoleFromToken(newToken));
    };

    const logout = () => {
        localStorage.removeItem("token");

        setToken(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                isAuthenticated: !!token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}