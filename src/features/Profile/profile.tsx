import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {logOutThunk} from "./profile-slice";
import IconButton from "@mui/material/IconButton";
import LocalSeeOutlinedIcon from "@mui/icons-material/LocalSeeOutlined";
import styles from "./profile.module.css";
import logoutIcon from "../../assets/logout.svg";
import {GeneralButton} from "../../utils/StyleForMUI/StyleForMUI";
import {getProfileAvatarSelector, getProfileEmailSelector} from "./profile-selectors";
import {BackToPackLink} from "../../components/BackLink/BackToPackLink";
import {EditableSpan} from "../../components/editable-span/editable-span";

export const Profile = () => {
    const dispatch = useAppDispatch();
    const profileDataAvatar = useAppSelector(getProfileAvatarSelector);
    const profileDataEmail = useAppSelector(getProfileEmailSelector);

    const avatar = profileDataAvatar
        ? profileDataAvatar
        : "https://static.thenounproject.com/png/707608-200.png";


    return (
        <div className={styles.wholeForm}>
            <BackToPackLink/>
            <div className={styles.form}>
                <h1 className={styles.formName}>Personal information</h1>
                <div className={styles.profileAvatar}>
                    <img src={avatar} alt="Yours avatar"/>
                    <div className={styles.buttonPhoto}>
                        <IconButton>
                            <LocalSeeOutlinedIcon className={styles.photoIcon}/>
                        </IconButton>
                    </div>
                </div>
                <EditableSpan/>
                <div className={styles.profileEmail}>{profileDataEmail}</div>
                <GeneralButton value={"white"} sx={{width: '150px'}} onClick={() => {
                    dispatch(logOutThunk())
                }}>
                    <img src={logoutIcon} alt=""/>
                    Log out
                </GeneralButton>
            </div>
        </div>

    );
};
