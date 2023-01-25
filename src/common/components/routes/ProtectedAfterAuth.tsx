import {useAppSelector} from "../../../app/store";
import {isAuthSelector} from "../../../app/app-selector";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import React from "react";

export const ProtectedAfterAuth = () => {
    const auth = useAppSelector(isAuthSelector);
    //const location = useLocation()
    const {state} = useLocation()
    const pathBack = state?.from.pathname || `/profile`
    return (
        auth
            ? <Navigate to={pathBack} />
            //? <Navigate to={"/profile"} state={{from: location}} replace/>
            : <Outlet/>
    )
}