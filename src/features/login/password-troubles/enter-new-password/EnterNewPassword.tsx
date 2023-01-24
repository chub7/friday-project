import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../../app/store';
import {GeneralButton} from '../../../../common/utils/style-for-mui/style-for-mui';

import {PasswordInput} from '../../../../common/components/password-input/PasswordInput';
import {setError, setNewPasswordThunk, setSuccess} from '../password-slice';
import {useFormik} from 'formik';
import styles from '../../login.module.css'
import {CircularProgress} from "@mui/material";
import {validationNewPassword} from "../../../../common/utils/validation-schema/validation-schema";
import {
    isSuccessPasswordSelector,
    passwordErrorSelector,
    passwordLoadingSelector
} from "../password-recovery/password-selector";
import { UniversalSnackbar } from '../../../../common/components/snack-bar/Snackbar';


export const EnterNewPassword = () => {

    const dispatch = useAppDispatch()
    const isSuccess = useAppSelector(isSuccessPasswordSelector)
    const isLoading = useAppSelector(passwordLoadingSelector)
    const error = useAppSelector(passwordErrorSelector)

    const navigate = useNavigate()
    let params = useParams<{token:string}>()


    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: validationNewPassword,
        onSubmit: values => {
            dispatch(setNewPasswordThunk(values.password, params.token))
        },
    });

    const {handleSubmit, errors, touched, handleChange, values} = formik;

    if (isSuccess) {
        dispatch(setSuccess({status: false}))
        navigate('/login')
    }

    return (
        <div className={styles.wholeForm}>
            {!isLoading ?
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h1 className={styles.formName}>Create new password</h1>
                    <PasswordInput handleChange={handleChange} name={"password"} placeHolder={'Enter password'}
                                   inputValue={values.password} touched={touched.password} error={errors.password}/>
                    <p className={styles.textForm}>Create new password and we will send you further
                        instructions to email</p>
                    <GeneralButton value={'blue'} type={'submit'}>Create new
                        password</GeneralButton>

                </form>
                :
                <CircularProgress/>}
            {error != null && <UniversalSnackbar error={error} changeError={setError} />}

        </div>
    );
};



