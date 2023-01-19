import React, {useEffect} from "react";
import styles from "../login.module.css";
import {useFormik} from "formik";
import {PasswordInput} from "../../../components/PasswordInput/PasswordInput";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {registration, setErrorSingUp, singUp} from "../login-slice";
import {NavLink, useNavigate} from "react-router-dom";
import { validationSignUP} from "../../../utils/validationSchema/validationSchema";
import CircularProgress from "@mui/material/CircularProgress";
import {GeneralButton} from "../../../utils/StyleForMUI/StyleForMUI";
import {TextField} from "@mui/material";
import { UniversalSnackbar} from "../../../components/SnackBar/Snackbar";
import {loginIsInProgressSelector, signUpErrorSelector, signUpResultSelector} from "../login-selectors";

type FormInitialValuesType = {
    email: string;
    password: string;
    confirmPassword: string;
};

export const Registration = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isInProgress = useAppSelector(loginIsInProgressSelector)
    const error = useAppSelector(signUpErrorSelector)
    const result = useAppSelector(signUpResultSelector)

    const {handleSubmit, errors, touched, handleChange, values} = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: ""
        } as FormInitialValuesType,


        validationSchema: validationSignUP,
        onSubmit: (values, actions) => {
            dispatch(singUp(values.email, values.password));
            actions.resetForm();
        },
    });

    useEffect(() => {
        if (result === "Created") {
            dispatch(registration(false));
            navigate("/login");
        }
    }, [result])
    console.log(error)
    return (

        <div className={styles.wholeForm}>

            {!isInProgress ? (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.formName}>Sign Up</label>
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

                    <PasswordInput
                        handleChange={handleChange}
                        inputValue={values.confirmPassword}
                        name={"confirmPassword"}
                        placeHolder={`Confirm password`}
                        touched={touched.confirmPassword}
                        error={errors.confirmPassword}
                    />

                    <GeneralButton
                        value={"blue"}
                        type="submit"
                        sx={{mt:5}}
                        className={styles.submitBtn}>
                        Sign Up
                    </GeneralButton>

                    <p className={styles.boldText}>Already have an account?</p>
                    <NavLink to="/login" className={styles.linkForm}>
                        Sign In
                    </NavLink>

                    {error != null && <UniversalSnackbar error={error} changeError={setErrorSingUp}/>}

                </form>) : <CircularProgress/>}
        </div>
    );
};
