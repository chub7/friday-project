import {useAppSelector} from "../../app/store";
import {isAuthSelector} from "../../app/app-selector";
import {Navigate, Outlet} from "react-router-dom";
import React from "react";

export const PrivateRoute = () => {
    const isLoginIn = useAppSelector(isAuthSelector)
    return (
        isLoginIn ? <Outlet/> : <Navigate to={`/login`}/>
    )
}