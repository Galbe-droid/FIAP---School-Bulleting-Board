import {useAuth} from "../contexts/AuthContext.tsx";
import {Navigate, Outlet} from "react-router-dom";
import type {ReactNode} from "react";

interface ProtectedRouteProps {
    children?: ReactNode;
    allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { authenticated, user, loading } = useAuth();

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role ?? '')) {
        return <Navigate to="/" replace />;
    }

    return children ? <>{children}</> : <Outlet />;
}