import React, {useState} from 'react';
import styles from '../login.module.css'
import {Button, Checkbox, CircularProgress, FormControlLabel, IconButton, styled, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from 'yup';

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import {PasswordInput} from "../../../components/inputPassword/passwordInput";
import {NavLink, useNavigate} from "react-router-dom";
import {basicSchema} from "../../../utils/schema";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {setInProgressStatus, signInThunk} from "../login-slice";
import {isProgressSelector} from "../login-selectors";
import {getProfile} from "../../Profile/profile-selectors";


const validationSchema = yup.object({
    email: yup
        .string()
        .required('Email is required')
        .email('Enter a valid email'),

    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});


export const CssButton = styled(Button)(({value}) => ({

    background: value === 'blue' ? '#366EFF' : value === 'white' ? 'white' : '#FF3636',
    borderRadius: 20,
    color: value === 'white' ? 'black' : 'white',
    fontFamily: 'Montserrat',
    boxShadow: `0px 4px 18px ${value === 'blue' ? '#acbaf6' : value === 'white' ? '#eae9e9' : '#f6a0a0'}`,
    ':hover': {
        background: value === 'blue' ? '#0b38c7' : value === 'white' ? '#f4f4f4' : '#a82929',
    },
    ':disabled': {
        background: 'rgba(145, 158, 171, 0.08)'

    }


}))
export const Authorization = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const progress = useAppSelector(isProgressSelector)
    const profile = useAppSelector(getProfile)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: validationSchema,
        onSubmit: (values, {setSubmitting, setStatus}) => {
            dispatch(signInThunk(values, setStatus))
        },
    });
    const {handleSubmit, errors, touched, handleChange, values, status} = formik

    if (profile) {
        navigate('/profile')
    }

    return (
        <div className={styles.wholeForm}>

            {!progress ?
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h3 className={styles.formName}>Sign In</h3>
                    <TextField
                        sx={{background: 'transparent'}}
                            id="email"
                            name="email"
                            label={'Email'}
                            onChange={handleChange}
                            value={values.email}
                            error={touched.email && Boolean(errors.email)}
                            variant="standard"
                            helperText={formik.touched.email && formik.errors.email}
                            />


                            <PasswordInput handleChange={handleChange} inputValue={values.password} name={'password'}
                            placeHolder={`Password`}/>

                            <FormControlLabel control={<Checkbox
                            name="rememberMe"
                            checked={values.rememberMe}
                            onChange={handleChange}
                            />} label="Remember me"/>
                            <NavLink className={styles.link} to={'/recoverypass'}>Forgot password?</NavLink>
                        {status!= undefined && status.message}
                            <CssButton value={'blue'} fullWidth type="submit">Sign In</CssButton>
                            <p className={styles.boldText}>Already have an account?</p>
                            <NavLink className={styles.linkForm} to={'/register'}>Sign Up</NavLink>

                            </form> : <CircularProgress/>}


                </div>
                );
            };

