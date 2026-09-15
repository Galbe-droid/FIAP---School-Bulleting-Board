import useAuth from "../hook/useAuth.ts";
import {Navigate} from "react-router-dom";
import type {ReactNode} from "react";

interface PrivateRouteProps {
    children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
    const { isAuthenticated, token, role } = useAuth();

    console.log("PROTECTED ROUTE:", {
        isAuthenticated,
        token,
        role,
    });

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}


export default PrivateRoute;