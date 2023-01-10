import React, {useEffect} from 'react';
import './App.css';
import {Stend} from "./features/testovich/stend";
import {Navigate, Route, Routes} from "react-router-dom";
import {Authorization} from "./features/Login/Authorization/Authorization";
import {Registration} from "./features/Login/Registeration/Registration";
import {RecoveryPassword} from "./features/Login/PasswordTroubles/PasswordRecovery/RecoveryPassword";
import {EnterNewPassword} from "./features/Login/PasswordTroubles/EnterNewPassword/EnterNewPassword";
import {Page404} from "./features/404/404";
import {Header} from "./features/Header/Header";
import {Profile} from "./features/Profile/Profile";
import {useAppDispatch, useAppSelector} from "./app/store";
import {authMe} from "./features/Login/login-slice";
import {appStatusSelector} from "./features/Login/login-selectors";
import {CircularProgress} from "@mui/material";

function App() {
    const dispatch = useAppDispatch()

    const appStatus = useAppSelector(appStatusSelector)
    useEffect(() => {
        dispatch(authMe())
    }, [])

    // if (appStatus === 'loading') {
    //     return <CircularProgress/>

    // }

    return (
        <div className='App'>
            <Header/>
            <Routes>
                <Route path='/*' element={<Navigate to={'/login'}/>}/>
                <Route path='/login' element={<Authorization/>}/>
                <Route path='/register' element={<Registration/>}/>
                <Route path='/recoverypass' element={<RecoveryPassword/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/newpass' element={<EnterNewPassword/>}/>
                <Route path='/testovich' element={<Stend/>}/>
                <Route path='/404' element={<Page404/>}/>
            </Routes>
        </div>
    );
}

export default App;
