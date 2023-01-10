import React from 'react';
import styles from '../login.module.css'
import {Checkbox, CircularProgress, FormControlLabel, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from 'yup';
import {PasswordInput} from "../../../components/inputPassword/passwordInput";
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {signInThunk} from "../login-slice";
import {isProgressSelector} from "../login-selectors";
import {getProfile} from "../../Profile/profile-selectors";
import {CssButton} from '../../../components/CustomComponent/CssComponent';


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
            const {email, password, rememberMe} = values
            dispatch(signInThunk(email, password, rememberMe, setStatus))
            setSubmitting(false)
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

                    {status != undefined && status.message}
                    <CssButton value={'white'} type="submit">Sign In</CssButton>

                    <p className={styles.boldText}>Already have an account?</p>

                    <NavLink className={styles.linkForm} to={'/register'}>Sign Up</NavLink>

                </form> : <CircularProgress/>}


        </div>
    );
};

