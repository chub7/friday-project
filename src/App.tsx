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
import {PacksList} from "./features/studies-page/packs/PacksList";
import {CardsContainer} from "./features/studies-page/cards/CardsContainer";
import {SingIn} from "./features/login/sing-in/SingIn";
import {Layout} from "./common/components/routes/layout/Layout";
import {RequireAuth} from "./common/components/routes/RequireAuth";
import {ProtectedAfterAuth} from "./common/components/routes/ProtectedAfterAuth";
import { LearnPage } from "./features/studies-page/learn/LearnPage";


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
        <Routes>
            <Route path="/" element={<Layout/>}>

                {/*public routes*/}
                <Route element={<ProtectedAfterAuth/>}>
                    <Route path="/login" element={<SingIn/>}/>
                    <Route path="/" element={<SingIn/>}/>
                    <Route path="/register" element={<SingUp/>}/>
                    <Route path="/recoverypass" element={<RecoveryPassword/>}/>
                    <Route path="/checkEmail" element={<CheckEmail/>}/>
                    <Route path="/newpass/:token" element={<EnterNewPassword/>}/>
                </Route>

                {/*private routes*/}
                <Route element={<RequireAuth/>}>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/packs" element={<PacksList/>}/>
                    {/*<Route path="/cards-pack" element={<CardsContainer/>}/>*/}
                    <Route path="/cards-pack/:id" element={<CardsContainer/>}/>
                    <Route path="/learn/:packId" element={<LearnPage/>}/>
                </Route>

                {/*catch miss*/}
                <Route path="*" element={<Page404/>}/>
            </Route>
        </Routes>
    );
}

export default App;