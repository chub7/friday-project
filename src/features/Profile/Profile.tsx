import React, { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { changeProfileDataThunk, logOutThunk } from "./profile-slice";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import LocalSeeOutlinedIcon from "@mui/icons-material/LocalSeeOutlined";
import style from "./Profile.module.css";
import logoutIcon from "./logout.svg";
import { Navigate } from "react-router-dom";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.app.isAuth);
  const profileData = useAppSelector((state) => state.profile.profile);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [userName, setUserName] = useState<string>(profileData.name);

  // useEffect(() => {
  //   dispatch(authMe());
  // }, []);
  //
console.log(isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

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
    <div className={style.profileContainer}>
      <h1 className={style.profileTitle}>Personal information</h1>
      <div className={style.profileAvatar}>
        <img src={avatar} alt="Yours avatar" />
        <IconButton>
          <LocalSeeOutlinedIcon fontSize="small" className={style.photoIcon} />
        </IconButton>
      </div>
      {isEditMode ? (
        <div className={style.profileInputContainer}>
          <TextField
            error={!!error}
            id="standard-error-helper-text"
            label={error ? "error" : "nick name"}
            defaultValue={profileData.name}
            helperText={error ? error : ""}
            variant="standard"
            onChange={onChangeHandler}
            className={style.inputName}
          />
          <button
            disabled={!!error}
            className={style.saveButton}
            onClick={onClickHandler}
          >
            SAVE
          </button>
        </div>
      ) : (
        <div className={style.profileNameContainer}>
          <div
            onDoubleClick={() => setEditMode(true)}
            className={style.profileName}
          >
            {profileData.name}
          </div>
          <IconButton onClick={() => setEditMode(true)}>
            <BorderColorOutlinedIcon fontSize="small" />
          </IconButton>
        </div>
      )}
      <div className={style.profileEmail}>{profileData.email}</div>
      <button
        onClick={() => {
          dispatch(logOutThunk());
        }}
        className={style.logOutButton}
      >
        <img src={logoutIcon} alt="" />
        Log out
      </button>
      {/* <button onClick={() => { dispatch(registarationThunk()) }} >Registartion</button>
            <button onClick={() => { dispatch(loginThunk()) }} >Login</button> */}
    </div>
  );
};
