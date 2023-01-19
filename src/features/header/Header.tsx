import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./header.module.css";
import logo from "../../common/assets/logo.svg";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {appStatusSelector, isAuthSelector} from "../../app/app-selector";
import {GeneralButton} from "../../common/utils/style-for-mui/style-for-mui";
import {logOutThunk} from "../login/login-slice";
import {ProfileNavigation} from "./profile-navigation/ProfileNavigation";
import {usePopUpProfileMenuField} from "../../common/components/pop-up-menu/hooks/usePopUpProfileMenuField";


export const Header = () => {
    const dispatch = useAppDispatch();
    const isInProgress = useAppSelector(appStatusSelector);
    const isAuth = useAppSelector(isAuthSelector);
    const data = usePopUpProfileMenuField()
    const logOutHandler = () => {
        dispatch(logOutThunk());
    };

    return (
        <div className={styles.header}>
            <img src={logo} alt="logo" className={styles.logo}/>
            <NavLink to={"/login"}>Home</NavLink>
            <NavLink to={"/register"}> Register</NavLink>
            <NavLink to={"/recoverypass"}> Forgot pass</NavLink>
            <NavLink to={"/profile"}> profile</NavLink>
            <NavLink to={"/newpass"}> NewPass</NavLink>
            <NavLink to={"/404"}> PageNotFound</NavLink>
            <NavLink to={"/packs"}>Packs List</NavLink>
            <NavLink to={"/cards-pack"}>Cards List</NavLink>

            {isAuth
                ?<ProfileNavigation popUpProfileMenuField={data}/>
                : <GeneralButton value={'blue'} sx={{width: '130px'}}
                                 onClick={logOutHandler}
                                 disabled={isInProgress}> Sing In
                </GeneralButton>

            }
        </div>
    );
};