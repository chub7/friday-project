import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppRootStateType, useAppDispatch, useAppSelector } from '../../app/store';
import { authMeThunk, changeNameThunk, loginThunk, logOutThunk, registarationThunk } from './profile-slice';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import LocalSeeOutlinedIcon from '@mui/icons-material/LocalSeeOutlined';
import style from './Profile.module.css'
import logoutIcon from './logout.svg'

export const Profile = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.profile.isLoggedIn)
    const profileData = useAppSelector(state => state.profile.profileData)
    const [isEditMode, setEditMode] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [userName, setUserName] = useState<string>(profileData.name)

    useEffect(() => {
        dispatch(authMeThunk())
    }, [])
    console.log(isLoggedIn);
    console.log(profileData);
    // if(!isLoggedIn){
    //     return <Navigate to='/login'/>
    // }
    const avatar = profileData.avatar ? profileData.avatar : 'https://static.thenounproject.com/png/707608-200.png'
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
        if (!e.currentTarget.value.trim()) {
            setError('requered')
        } else {
            setError('')
            setUserName(e.currentTarget.value)
        }
    }
    const onClickHandler = () => {
        setEditMode(false)
        dispatch(changeNameThunk(userName))
    }
    return (
        <div className={style.profileContainer}>
            <h1 className={style.profileTitle}>Personal information</h1>
            <div className={style.profileAvatar}>
                <img src={avatar} alt="Yours avatar" />
                <IconButton>
                <LocalSeeOutlinedIcon fontSize='small' className={style.photoIcon}/>
                </IconButton>
            </div>
            {isEditMode ? <div className={style.profileInputContainer}>
                <TextField
                    error={!!error}
                    id="standard-error-helper-text"
                    label={error ? 'error' : 'nick name'}
                    defaultValue={profileData.name}
                    helperText={error ? error : ''}
                    variant="standard"
                    onChange={onChangeHandler}
                    className={style.inputName}
                    onBlur={()=>setEditMode(false)}
                />
                <button onClick={onClickHandler} disabled={!!error} className={style.saveButton}>SAVE</button>
            </div> : 
            <div className={style.profileNameContainer} >
            <div onDoubleClick={() => setEditMode(true)} className={style.profileName}>{profileData.name}</div>
            <IconButton >
                <BorderColorOutlinedIcon fontSize='small' onClick={() => setEditMode(true)} />
            </IconButton>
        </div>}
            <div className={style.profileEmail}>{profileData.email}</div>
            <button onClick={() => { dispatch(logOutThunk()) }} className={style.logOutButton}>
                <img src={logoutIcon} alt="" />
                Log out
                </button>
            {/* <button onClick={() => { dispatch(registarationThunk()) }} >Registartion</button>
            <button onClick={() => { dispatch(loginThunk()) }} >Login</button> */}
            
            

        </div>
    );
};
