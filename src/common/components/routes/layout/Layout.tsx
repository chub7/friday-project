import {Header} from "../../../../features/header/Header";
import {Outlet} from "react-router-dom";
import React from "react";

export const Layout = () => {
    return (
        <div className="App">
            <Header/>
            <Outlet/>
        </div>
    )
}