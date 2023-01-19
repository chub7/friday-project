import React, {useEffect} from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";

import {SingUp} from "./features/login/sing-up/SingUp";
import {RecoveryPassword} from "./features/login/password-troubles/password-recovery/RecoveryPassword";
import {EnterNewPassword} from "./features/login/password-troubles/enter-new-password/EnterNewPassword";
import {Page404} from "./common/components/404/404";
import {useAppDispatch, useAppSelector} from "./app/store";
import {authMe} from "./app/app-slice";
import {CircularProgress} from "@mui/material";
import {CheckEmail} from "./features/login/password-troubles/check-email/check-email";
import {appStatusSelector} from "./app/app-selector";
import {Profile} from "./features/profile/Profile";
import {Header} from "./features/header/Header";
import {PacksList} from "./features/studies-page/packs/PacksList";

import {PrivateRoute} from "./common/components/private-route/private-route";
import {CardsContainer} from "./features/studies-page/cards/CardsContainer";
import { SingIn } from "./features/login/sing-in/SingIn";


function App() {
    const dispatch = useAppDispatch();
    const appStatus = useAppSelector(appStatusSelector);

    useEffect(() => {
        dispatch(authMe());
    }, [dispatch]);

    if (appStatus) {
        return <div className={'progress'}><CircularProgress/></div>;
    }

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route element={<PrivateRoute/>}>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/packs" element={<PacksList/>}/>
                    <Route path="/cards-pack" element={<CardsContainer/>}/>
                    <Route path="/cards-pack/:id" element={<CardsContainer/>}/>
                </Route>
                <Route path="/login" element={<SingIn/>}/>
                <Route path="/register" element={<SingUp/>}/>
                <Route path="/recoverypass" element={<RecoveryPassword/>}/>
                <Route path="/checkEmail" element={<CheckEmail/>}/>
                <Route path="/newpass/:token" element={<EnterNewPassword/>}/>
                {/*<Route path="/*" element={<Navigate to={"/404"}/>}/>*/}
                <Route path="/404" element={<Page404/>}/>
            </Routes>
        </div>
    );
}

export default App;

