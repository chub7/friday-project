import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { setError, setSuccessStatusForSnackBar } from "./profile-slice";
import IconButton from "@mui/material/IconButton";
import LocalSeeOutlinedIcon from "@mui/icons-material/LocalSeeOutlined";
import styles from "./profile.module.css";
import logoutIcon from "../../assets/logout.svg";
import { GeneralButton } from "../../utils/StyleForMUI/StyleForMUI";
import { getErrorSelector, getIsLoading, getProfileAvatarSelector, getProfileEmailSelector, successStatusForSnackBarSelector } from "./profile-selectors";
import { BackToPackLink } from "../../components/BackLink/BackToPackLink";
import { EditableSpan } from "../../components/editable-span/editable-span";
import { UniversalSnackbar } from "../../components/SnackBar/Snackbar";
import {CircularProgress} from "@mui/material";
import {logOutThunk, setSuccessLogin} from "../Login/login-slice";
import {successSelector} from "../Login/login-selectors";

export const Profile = () => {
    const dispatch = useAppDispatch();
    const profileDataAvatar = useAppSelector(getProfileAvatarSelector);
    const profileDataEmail = useAppSelector(getProfileEmailSelector);
    const error = useAppSelector(getErrorSelector)
    const successChangeNameProfile = useAppSelector(successStatusForSnackBarSelector)
    const successLogin=useAppSelector(successSelector)
    const isLoading = useAppSelector(getIsLoading) 
    const open = error !== null || !!successChangeNameProfile


    const avatar = profileDataAvatar
        ? profileDataAvatar
        : "https://static.thenounproject.com/png/707608-200.png";


    return (
        <div className={styles.wholeForm}>
            <BackToPackLink />
            <div className={styles.form}>
                <h1 className={styles.formName}>Personal information</h1>
                <div className={styles.profileAvatar}>
                    <img src={avatar} alt="Yours avatar" />
                    <div className={styles.buttonPhoto}>
                        <IconButton>
                            <LocalSeeOutlinedIcon className={styles.photoIcon} />
                        </IconButton>
                    </div>
                </div>
                {isLoading ? <CircularProgress/> :  <EditableSpan /> }
               
                <div className={styles.profileEmail}>{profileDataEmail}</div>
                <GeneralButton value={"white"} sx={{ width: '150px' }} onClick={() => {
                    dispatch(logOutThunk())
                }}>
                    <img src={logoutIcon} alt="" />
                    Log out
                </GeneralButton>
            </div>
            {open && <UniversalSnackbar error={error} changeError={setError} success={successChangeNameProfile} changeSuccess={setSuccessStatusForSnackBar} />}
            {successLogin!='' && <UniversalSnackbar success={successLogin} changeSuccess={setSuccessLogin} />}
        </div>

    );
};
