import React, {useEffect} from "react";
import "./App.css";
import {Navigate, Route, Routes} from "react-router-dom";
import {Authorization} from "./features/Login/authorization/authorization";
import {Registration} from "./features/Login/registeration/registration";
import {RecoveryPassword} from "./features/Login/PasswordTroubles/PasswordRecovery/recovery-password";
import {EnterNewPassword} from "./features/Login/PasswordTroubles/EnterNewPassword/enter-new-password";
import {Page404} from "./features/404/404";
import {useAppDispatch, useAppSelector} from "./app/store";
import {authMe, setAuthError} from "./app/app-slice";
import {CircularProgress} from "@mui/material";
import {CheckEmail} from "./features/Login/PasswordTroubles/CheckEmail/check-email";
import {appErrorSelector, appStatusSelector} from "./app/app-selector";
import {Profile} from "./features/Profile/profile";
import {Header} from "./features/Header/header";
import {ErrorSnackbar} from "./components/ErrorSnackBar/ErrorSnackbar";
import {PackList} from "./features/studies-page/pack-list/pack-list";
import {CardList} from "./features/studies-page/cards-list/CardList";


function App() {
    const dispatch = useAppDispatch();
    const appStatus = useAppSelector(appStatusSelector);
    const appError = useAppSelector(appErrorSelector);

    useEffect(() => {
        dispatch(authMe());
    }, []);

    if (appStatus) {
        return <div className={'progress'}><CircularProgress/></div>;
    }
/*
    {appError !== null && <ErrorSnackbar error={appError} changeError={setAuthError}/>}*/

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/*" element={<Navigate to={"/login"}/>}/>
                <Route path="/login" element={<Authorization/>}/>
                <Route path="/register" element={<Registration/>}/>
                <Route path="/packs" element={<PackList/>}/>
                <Route path="/cards-pack" element={<CardList/>}/>
                <Route path="/recoverypass" element={<RecoveryPassword/>}/>
                <Route path="/checkEmail" element={<CheckEmail/>}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/newpass/:token" element={<EnterNewPassword/>}/>
                <Route path="/404" element={<Page404/>}/>
            </Routes>
        </div>
    );
}

export default App;
