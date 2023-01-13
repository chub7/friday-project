import React, {useEffect} from "react";
import "./App.css";
import {Navigate, Route, Routes} from "react-router-dom";
import {Authorization} from "./features/Login/Authorization/Authorization";
import {Registration} from "./features/Login/Registeration/Registration";
import {RecoveryPassword} from "./features/Login/PasswordTroubles/PasswordRecovery/RecoveryPassword";
import {EnterNewPassword} from "./features/Login/PasswordTroubles/EnterNewPassword/EnterNewPassword";
import {Page404} from "./features/404/404";
import {Header} from "./features/Header/Header";
import {Profile} from "./features/Profile/Profile";
import {useAppDispatch, useAppSelector} from "./app/store";
import {authMe} from "./app/app-slice";
import {CircularProgress} from "@mui/material";
import {CheckEmail} from "./features/Login/PasswordTroubles/CheckEmail/CheckEmail";
import {appStatusSelector} from "./app/app-selector";

function App() {
    const dispatch = useAppDispatch();
    const appStatus = useAppSelector(appStatusSelector);


    useEffect(() => {
        dispatch(authMe());
    }, []);

    if (appStatus) {
        return <div className={'progress'}><CircularProgress/></div>;
    }

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/*" element={<Navigate to={"/login"}/>}/>
                <Route path="/login" element={<Authorization/>}/>
                <Route path="/register" element={<Registration/>}/>
                <Route path="/recoverypass" element={<RecoveryPassword/>}/>
                <Route path="/checkEmail" element={<CheckEmail/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/newpass/:token" element={<EnterNewPassword/>}/>
                <Route path="/404" element={<Page404/>}/>
            </Routes>
        </div>
    );
}

export default App;
