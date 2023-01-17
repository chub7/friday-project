import React, {useEffect} from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import {Authorization} from "./features/Login/authorization/authorization";
import {Registration} from "./features/Login/registeration/registration";
import {RecoveryPassword} from "./features/Login/PasswordTroubles/PasswordRecovery/recovery-password";
import {EnterNewPassword} from "./features/Login/PasswordTroubles/EnterNewPassword/enter-new-password";
import {Page404} from "./features/404/404";
import {useAppDispatch, useAppSelector} from "./app/store";
import {authMe} from "./app/app-slice";
import {CircularProgress} from "@mui/material";
import {CheckEmail} from "./features/Login/PasswordTroubles/CheckEmail/check-email";
import {appStatusSelector} from "./app/app-selector";
import {Profile} from "./features/Profile/profile";
import {Header} from "./features/Header/header";
import {PackList} from "./features/studies-page/pack-list/PackList";
import {CardList} from "./features/studies-page/cards-list/CardList";
import {PrivateRoute} from "./components/private-route/private-route";


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
                    <Route path="/packs" element={<PackList/>}/>
                    <Route path="/cards-pack" element={<CardList/>}/>
                    <Route path="/cards-pack/:id" element={<CardList/>}/>
                </Route>
                <Route path="/login" element={<Authorization/>}/>
                <Route path="/register" element={<Registration/>}/>
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

