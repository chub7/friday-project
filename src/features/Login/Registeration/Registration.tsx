import React from 'react';
import styles from "./registration.module.css"
import {useFormik} from "formik";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {PasswordInput} from "../../../components/inputPassword/passwordInput";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {singUp} from "../login-slice";
import {NavLink, useNavigate} from "react-router-dom";
import {basicSchema} from "../../../utils/schema";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ButtonCustom from "../../../components/ButtonCustom/ButtonCustom";

export const Registration = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isInProgress = useAppSelector(state => state.login.isInProgress)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: basicSchema,
        onSubmit: (values, actions) => {
            dispatch(singUp(values.email, values.password))
                .then(() => {
                    navigate(`login`)
                })
            actions.resetForm()
        },
    });
    const {handleSubmit, errors, touched, handleChange, values} = formik


    return (
        <div className={styles.wholeForm}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.formName}>Sign Up</label>

                <FormControl sx={{width: "347px"}} variant="standard">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        id="email"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        disabled={isInProgress}
                    />
                </FormControl>
                {errors.email && touched.email ? <div>{errors.email}</div> : null}

                <PasswordInput handleChange={handleChange} inputValue={values.password}
                               name={'password'} placeHolder={`Password`}/>
                {errors.password && touched.password ? <div>{errors.password}</div> : null}
                <PasswordInput handleChange={handleChange} inputValue={values.confirmPassword} name={'confirmPassword'}
                               placeHolder={`Confirm password`}/>
                {errors.confirmPassword && touched.confirmPassword ? <div>{errors.confirmPassword}</div> : null}

                <Box className={styles.progress}>{isInProgress && <CircularProgress/>}</Box>

                <ButtonCustom disabled={isInProgress} type="submit" className={styles.submitBtn}> Sign Up</ButtonCustom>
                <div className={styles.bottomLinks}>
                    <p>Already have an account?</p>
                    <NavLink to="/login" className={styles.singInLink}>Sign In</NavLink>
                </div>
            </form>
        </div>
    );
};
