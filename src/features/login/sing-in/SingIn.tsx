import React from "react";
import styles from "../login.module.css";
import {Checkbox, CircularProgress, FormControlLabel, TextField,} from "@mui/material";
import {useFormik} from "formik";
import {PasswordInput} from "../../../common/components/password-input/PasswordInput";
import {Navigate, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {setErrorSingUp, setSuccessLogin, signInThunk} from "../login-slice";
import {GeneralButton} from "../../../common/utils/style-for-mui/style-for-mui";
import {validationSignIn} from "../../../common/utils/validation-schema/validation-schema";
import {loginIsInProgressSelector, signUpErrorSelector, successSelector} from "../login-selectors";
import {isAuthSelector} from "../../../app/app-selector";
import {UniversalSnackbar} from "../../../common/components/snack-bar/Snackbar";


export const SingIn = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(signUpErrorSelector)
    const successForSnackBar = useAppSelector(successSelector)
    const isInProgress = useAppSelector(loginIsInProgressSelector)
    const auth = useAppSelector(isAuthSelector);
    const open = error !== null || !!successForSnackBar

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validationSchema: validationSignIn,
        onSubmit: (values, {setSubmitting}) => {
            const {email, password, rememberMe} = values;
            dispatch(signInThunk(email, password, rememberMe));
            setSubmitting(false);
        },
    });
    const {handleSubmit, errors, touched, handleChange, values} = formik;


    if (auth) {
        return <Navigate to={"/profile"}/>
    }
    return (
        <div className={styles.wholeForm}>
            {!isInProgress ? (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h3 className={styles.formName}>Sign In</h3>
                    <TextField
                        sx={{background: "transparent"}}
                        id="email"
                        name="email"
                        label={"Email"}
                        onChange={handleChange}
                        value={values.email}
                        error={touched.email && Boolean(errors.email)}
                        variant="standard"
                        helperText={touched.email && errors.email}
                    />

                    <PasswordInput
                        handleChange={handleChange}
                        inputValue={values.password}
                        name={"password"}
                        placeHolder={`Password`}
                        touched={touched.password}
                        error={errors.password}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="rememberMe"
                                checked={values.rememberMe}
                                onChange={handleChange}
                            />
                        }
                        label="Remember me"
                    />
                    <NavLink className={styles.link} to={"/recoverypass"}>Forgot password?</NavLink>

                    <GeneralButton value={"blue"} type="submit">Sign In</GeneralButton>

                    <p className={styles.boldText}>Already have an account?</p>

                    <NavLink className={styles.linkForm} to={"/register"}>Sign Up</NavLink>
                    {open && <UniversalSnackbar error={error} changeError={setErrorSingUp}
                                                success={successForSnackBar} changeSuccess={setSuccessLogin}/>}
                    <p className={styles.info}>

                        Test account<br/>
                        Email: accounttest@gmail.com<br/>
                        Password: accounttest
                    </p>

                </form>
            ) : (
                <CircularProgress/>
            )}
        </div>
    );
};
