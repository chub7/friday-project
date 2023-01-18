import React, {ChangeEvent, useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import TextField from "@mui/material/TextField";
import styles from '../../login.module.css'
import {useAppDispatch, useAppSelector} from '../../../../app/store';
import {getInstructionThunk, setError} from '../password-slice';
import {GeneralButton} from '../../../../utils/StyleForMUI/StyleForMUI';
import {CircularProgress} from "@mui/material";
import {getEmailSelector, passwordErrorSelector, passwordLoadingSelector} from "./password-selector";
import { UniversalSnackbar } from '../../../../components/SnackBar/Snackbar';


export const RecoveryPassword = () => {
    const [emailValue, setEmailValue] = useState<string>('')
    const [errorValue, setErrorValue] = useState<string>('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const email = useAppSelector(getEmailSelector)
    const isLoading = useAppSelector(passwordLoadingSelector)
    const error = useAppSelector(passwordErrorSelector)

    const onClickHandler = () => {
        dispatch(getInstructionThunk(emailValue))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.currentTarget.value.trim()) {
            setErrorValue('')
            setEmailValue(e.currentTarget.value)
        } else {
            setErrorValue('Field is required')
        }
    }

    useEffect(() => {
        if (email) {
            navigate('/checkEmail')
        }
    }, [email])

    return (
        <div className={styles.wholeForm}>
            {!isLoading ?
                <form /*onSubmit={handleSubmit}*/ className={styles.form}>
                    <h3 className={styles.formName}>Forgot your password?</h3>

                    <TextField
                        error={!!errorValue}
                        id="standard-error-helper-text"
                        label={errorValue ? "Error" : "Email"}
                        defaultValue={''}
                        helperText={errorValue ? errorValue : ""}
                        variant="standard"
                        onChange={onChangeHandler}
                        className={styles.recoveryInput}
                    />
                    <p className={styles.textForm}>Enter your email address and we will send you further
                        instructions </p>
                    <GeneralButton value={'blue'} sx={{mt: 2}} onClick={onClickHandler}>Send instruction</GeneralButton>
                    <p className={styles.boldText}>Did you remember your password?</p>
                    <NavLink to={'login'} className={styles.linkForm}>Try logging in</NavLink>
                    {error != null && <UniversalSnackbar error={error} changeError={setError} />}
                </form>
                : <CircularProgress/>}

        </div>
    );
};

