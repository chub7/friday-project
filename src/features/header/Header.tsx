import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import styles from "./header.module.css";
import logo from "../../common/assets/logo.svg";
import {useAppSelector} from "../../app/store";
import {appStatusSelector, isAuthSelector} from "../../app/app-selector";
import {GeneralButton} from "../../common/utils/style-for-mui/style-for-mui";
import {ProfileNavigation} from "./profile-navigation/ProfileNavigation";
import {usePopUpProfileMenuField} from "../../common/components/pop-up-menu/hooks/usePopUpProfileMenuField";


export const Header = () => {
    const navigate = useNavigate()
    const isInProgress = useAppSelector(appStatusSelector);
    const isAuth = useAppSelector(isAuthSelector);
    const data = usePopUpProfileMenuField()
    const onClickHandler = () => {
        navigate(`/login`)
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

            {isAuth
                ?<ProfileNavigation popUpProfileMenuField={data}/>
                : <GeneralButton value={'blue'} sx={{width: '130px'}}
                                 onClick={onClickHandler}
                                 disabled={isInProgress}> Sing In
                </GeneralButton>

            }
        </div>
    );
};
