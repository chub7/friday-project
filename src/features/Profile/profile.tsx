import React, {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {changeProfileDataThunk, logOutThunk} from "./profile-slice";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import LocalSeeOutlinedIcon from "@mui/icons-material/LocalSeeOutlined";
import styles from "./profile.module.css";
import logoutIcon from "../../assets/logout.svg";
import {useNavigate} from "react-router-dom";
import {GeneralButton} from "../../utils/StyleForMUI/StyleForMUI";
import {getProfileSelector} from "./profile-selectors";
import {isAuthSelector} from "../../app/app-selector";
import {BackToPackLink} from "../../components/BackLink/BackToPackLink";

export const Profile = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(isAuthSelector);
    const profileData = useAppSelector(getProfileSelector);
    const [isEditMode, setEditMode] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [userName, setUserName] = useState<string>(profileData.name);


    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
    }, [isLoggedIn])

    const avatar = profileData.avatar
        ? profileData.avatar
        : "https://static.thenounproject.com/png/707608-200.png";

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value.trim()) {
            setError("required field");
        } else {
            setError("");
            setUserName(e.currentTarget.value);
        }
    };
    const onClickHandler = () => {
        setEditMode(false);
        dispatch(changeProfileDataThunk(userName));
    };

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
                {isEditMode ? (
                    <div className={styles.profileInputContainer}>
                        <TextField
                            error={!!error}
                            id="standard-error-helper-text"
                            label={error ? "error" : "nick name"}
                            defaultValue={profileData.name}
                            helperText={error ? error : ""}
                            variant="standard"
                            onChange={onChangeHandler}
                            className={styles.inputName}
                        />
                        <button
                            disabled={!!error}
                            className={styles.saveButton}
                            onClick={onClickHandler}>
                            SAVE
                        </button>
                    </div>
                ) : (
                    <div className={styles.profileNameContainer}>
                        <div
                            onDoubleClick={() => setEditMode(true)}
                            className={styles.profileName}>
                            {profileData.name}
                        </div>
                        <IconButton onClick={() => setEditMode(true)}>
                            <BorderColorOutlinedIcon/>
                        </IconButton>
                    </div>
                )}
                <div className={styles.profileEmail}>{profileData.email}</div>

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
