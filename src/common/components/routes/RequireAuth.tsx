import {useAppSelector} from "../../../app/store";
import {isAuthSelector} from "../../../app/app-selector";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import React from "react";

export const RequireAuth = () => {
    const auth = useAppSelector(isAuthSelector);
    const location = useLocation()
    return (
        auth
            ? <Outlet/>
            : <Navigate to={"/login"} state={{from: location}} replace/>
    )
}