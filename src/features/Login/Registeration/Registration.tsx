import React from 'react';
import styles from "./registration.module.css"
import {useFormik} from "formik";
import Button from '@mui/material/Button';
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {PasswordInput} from "../../../components/inputPassword/passwordInput";
export const Registration = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <div className={styles.wholeForm}>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <label className={styles.formName}>Sign Up</label>
                <FormControl sx={{width: "347px"}} variant="standard">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </FormControl>
                <PasswordInput formik={formik} name={'password'} id={'password'}></PasswordInput>
                <PasswordInput formik={formik} name={'confirmPassword'} id={'confirmPassword'}></PasswordInput>

                <Button variant="contained" type="submit"
                        sx={{
                            backgroundColor: '#366EFF',
                            borderRadius: '30px',
                            width: '347px',
                            height: '36px'
                        }}>
                    Sign Up
                </Button>
                <div className={styles.bottomLinks}>
                    <div>Already have an account?</div>
                    <div className={styles.singInLink}>Sign In</div>
                </div>

            </form>
        </div>
    );
};
