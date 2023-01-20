import {useAppSelector} from "../../../app/store";
import {isAuthSelector} from "../../../app/app-selector";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import React from "react";

export const ProtectedAfterAuth = () => {
    const auth = useAppSelector(isAuthSelector);
    const location = useLocation()
    return (
        auth
            ? <Navigate to={"/profile"} state={{from: location}} replace/>
            : <Outlet/>
    )
}