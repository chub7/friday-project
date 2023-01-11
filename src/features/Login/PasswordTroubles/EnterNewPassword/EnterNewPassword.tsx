import React, { ChangeEvent, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { CssButton } from '../../../../components/CustomComponent/CssComponent';
import { ErrorSnackbar } from '../../../../components/ErrorSnackBar/ErrorSnackbar';
import { PasswordInput } from '../../../../components/inputPassword/passwordInput';
import { setNewPasswordThunk, setSuccess } from '../password-slice';
import { useFormik } from 'formik';
import * as yup from "yup";
import style from './EnterNewPassword.module.css'
import { CircularProgress } from "@mui/material";


export const EnterNewPassword = () => {

    const dispatch = useAppDispatch()
    const isSuccess = useAppSelector(state => state.passwordData.isSuccess)
    const isLoading = useAppSelector(state=>state.passwordData.isLoading)
    const navigate = useNavigate()
    let params = useParams<string>()

    const validationSchema = yup.object({
        password: yup
          .string()
          .min(8, "Password should be of minimum 8 characters length")
          .required("Password is required"),
      });

    const formik = useFormik({
        initialValues: {
         password:'',

        },
        validationSchema:validationSchema,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

      const { handleSubmit, errors, touched, handleChange, values, status } = formik; 

    const onClickHandler = () => {
        console.log('!!!')
       dispatch(setNewPasswordThunk(values.password, params.token))
    }

    if (isSuccess) {
        dispatch(setSuccess({ status: false }))
        navigate('login')
    }
    return (
        <div className={style.newPasswordContainer}>
            {!isLoading?       <div>
            <h1 className={style.newPasswordTitle}>Create new password</h1>
            <form onSubmit={handleSubmit}>
            <PasswordInput handleChange={handleChange} name={"password"} placeHolder={'Enter password'} inputValue={values.password} touched={touched.password} error={errors.password} />
            <p className={style.newPasswordHelperText}>Create new password and we will send you further instructions to email</p>
            <CssButton value={'blue'} disabled={!!errors.password} onClick={onClickHandler}>Create new password</CssButton>
            </form>
            <ErrorSnackbar/>
            </div>
            :
            <CircularProgress /> }
      

        </div>
    );
};



