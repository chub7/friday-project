import styles from "../../../features/profile/profile.module.css";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import React, {ChangeEvent, useState} from "react";
import {changeProfileDataThunk} from "../../../features/profile/profile-slice";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {getProfileNameSelector} from "../../../features/profile/profile-selectors";

export const EditableSpan = () =>{
    const dispatch = useAppDispatch();
    const profileDataName = useAppSelector(getProfileNameSelector);
    const [isEditMode, setEditMode] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [userName, setUserName] = useState<string>(profileDataName);

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
    return isEditMode ? (
        <div className={styles.profileInputContainer}>
            <TextField
                error={!!error}
                id="standard-error-helper-text"
                label={error ? "error" : "nick name"}
                defaultValue={profileDataName}
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
                {profileDataName}
            </div>
            <IconButton onClick={() => setEditMode(true)}>
                <BorderColorOutlinedIcon/>
            </IconButton>
        </div>
    )
}