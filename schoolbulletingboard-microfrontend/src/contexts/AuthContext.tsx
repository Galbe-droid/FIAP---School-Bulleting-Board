import type {AuthUser, LoginRequest} from "../types/Auth/Auth.ts";
import {createContext, type ReactNode, useContext, useState} from "react";
import {login} from "../api/auth.ts";

interface AuthContextData {
    user: AuthUser | null;
    authenticated: boolean;
    loading: boolean;
    signIn: (credentials: LoginRequest) => Promise<void>;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function decodedToken(token: string): AuthUser {
    const payload = token.split('.')[1];

    const decoded = JSON.parse(
        atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    )

    if (!decoded.userId || !['TEACHER', 'STUDENT'].includes(decoded.role)) {
        throw new Error('Token inválido');
    }

    return {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        username: decoded.username,
    };
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(() => {
        const token = sessionStorage.getItem('token')
        if(!token) return null

        try{
            const decoded = decodedToken(token)
            const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))

            if(payload.exp * 1000 <= Date.now()){
                sessionStorage.removeItem('token')
                return null
            }

            return decoded
        } catch {
            sessionStorage.removeItem('token')
            return null
        }
    });

    const [loading, setLoading] = useState(false)

    const signIn = async(credentials: LoginRequest) => {
        setLoading(true);

        try {
            const response = await login(credentials)
            const decodedUser = decodedToken(response.token)
            console.log(decodedUser)
            sessionStorage.setItem('token', response.token)
            setUser(decodedUser)
        } finally {
            setLoading(false)
        }
    }

    const signOut = () => {
        sessionStorage.removeItem('token')
        setUser(null)
    }

    return(
        <AuthContext.Provider
            value={{
                user,
                authenticated: !!user,
                loading,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}