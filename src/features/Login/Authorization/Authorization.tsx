import React, {useEffect} from "react";
import styles from "../login.module.css";
import {
    Checkbox,
    CircularProgress,
    FormControlLabel,
    TextField,
} from "@mui/material";
import {useFormik} from "formik";
import {PasswordInput} from "../../../components/PasswordInput/PasswordInput";
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {setErrorSingUp, signInThunk} from "../login-slice";
import { GeneralButton} from "../../../utils/StyleForMUI/StyleForMUI";
import {isAuthSelector} from "../../../app/app-selector";
import {ErrorSnackbar} from "../../../components/ErrorSnackBar/ErrorSnackbar";
import { validationSignIn } from "../../../utils/validationSchema/validationSchema";


export const Authorization = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {isInProgress, error} = useAppSelector(state => state.login)
    const isAuth = useAppSelector(isAuthSelector);

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

    useEffect(() => {
        if (isAuth) {
            navigate("/profile");
        }
    }, [isAuth])


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

                    <NavLink className={styles.link} to={"/recoverypass"}>
                        Forgot password?
                    </NavLink>

                    <GeneralButton value={"blue"} type="submit">
                        Sign In
                    </GeneralButton>

                    <p className={styles.boldText}>Already have an account?</p>

                    <NavLink className={styles.linkForm} to={"/register"}>
                        Sign Up
                    </NavLink>
                    {error != null && <ErrorSnackbar error={error} changeError={setErrorSingUp}/>}
                </form>
            ) : (
                <CircularProgress/>
            )}
        </div>
    );
};
