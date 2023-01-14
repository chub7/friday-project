import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import styles from "./header.module.css";
import logo from "../../assets/logo.svg";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {appStatusSelector, isAuthSelector} from "../../app/app-selector";
import {logOutThunk} from "../Profile/profile-slice";
import {GeneralButton} from "../../utils/StyleForMUI/StyleForMUI";

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isInProgress = useAppSelector(appStatusSelector);
    const isAuth = useAppSelector(isAuthSelector);
    const logOutHandler = () => {
        dispatch(logOutThunk());
        navigate(`login`)
    };
    return (
        <div className={styles.header}>
            <img src={logo} alt="logo image" className={styles.logo}/>
            <NavLink to={"/login"}>Home</NavLink>
            <NavLink to={"/register"}> Register</NavLink>
            <NavLink to={"/recoverypass"}> Forgot pass</NavLink>
            <NavLink to={"/profile"}> profile</NavLink>
            <NavLink to={"/newpass"}> NewPass</NavLink>
            <NavLink to={"/404"}> PageNotFound</NavLink>
            <NavLink to={"/packs"}>Cards List</NavLink>

            <GeneralButton value={'blue'} sx={{width:'130px'}} onClick={logOutHandler} disabled={isInProgress}>
                {isAuth ? 'Logout' : 'Sign in'}
            </GeneralButton>

        </div>
    );
};
