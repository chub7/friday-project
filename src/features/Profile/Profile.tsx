import React from 'react';
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../app/store";
import {isAuthSelector} from "../Login/login-selectors";

export const Profile = () => {
    const isAuth = useAppSelector(isAuthSelector)
    if(!isAuth){
        return <Navigate to={'/login'} />
    }
    return (
        <div>
            Profile page
        </div>
    );
};
