import React, {ChangeEvent, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import TextField from "@mui/material/TextField";
import style from './recoveryPassword.module.css'
import {useAppDispatch, useAppSelector} from '../../../../app/store';
import {getInstructionThunk} from '../password-slice';
import {CssButton} from '../../../../components/CustomComponent/CssComponent';
import {ErrorSnackbar} from '../../../../components/ErrorSnackBar/ErrorSnackbar';
import {CircularProgress} from "@mui/material";


export const RecoveryPassword = () => {
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<string>('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const emailFromState = useAppSelector(state => state.passwordData.email)
    const isLoading = useAppSelector(state => state.passwordData.isLoading)

    const onClickHandler = () => {
        dispatch(getInstructionThunk(email))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.currentTarget.value.trim()) {
            setError('')
            setEmail(e.currentTarget.value)
        } else {
            setError('Field is required')
        }
    }


    if (emailFromState) {
        navigate ('/checkEmail')
    }
    return (
        <div className={style.recoveryContainer}>
            {!isLoading ?
                <div>
                    <h1 className={style.recoveryTitle}>Forgot your password?</h1>
                    <TextField
                        error={!!error}
                        id="standard-error-helper-text"
                        label={error ? "error" : "email"}
                        defaultValue={''}
                        helperText={error ? error : ""}
                        variant="standard"
                        onChange={onChangeHandler}
                        className={style.recoveryInput}
                    />
                    <p className={style.recoveryHelperText1}>Enter your email address and we will send you further instructions </p>
                    <CssButton value={'blue'} disabled={!!error} onClick={onClickHandler}>Send instruction</CssButton>
                    <p className={style.recoveryHelperText}>Did you remember your password?</p>
                    <NavLink to={'login'} className={style.recoveryLink}>Try logging in</NavLink>
                    <ErrorSnackbar />
                </div>
                : <CircularProgress />}

        </div>
    );
};

