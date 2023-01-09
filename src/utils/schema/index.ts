import * as yup from "yup"

const passwordRules = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;

export const basicSchema = yup.object().shape({
    email: yup.string().email("Enter valid email").required("Required"),
    password: yup
        .string()
        .min(5)
        .matches(passwordRules, {message: `Minimum 5 characters, at least one letter and one number`})
        .required("Required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'),null],'Passwords must match')
        .required("Required")
})