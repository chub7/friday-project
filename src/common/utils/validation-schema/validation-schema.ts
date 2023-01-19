import * as yup from "yup"



export const validationSignUP = yup.object().shape({
    email: yup.string().email("Enter valid email").required("Email is required"),
    password: yup
        .string()
        .min(8)
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'),null],'Passwords must match')
        .required("Required")
})


export const validationSignIn = yup.object({
    email: yup
        .string()
        .required("Email is required")
        .email("Enter a valid email"),
    password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
});


export const validationNewPassword = yup.object({
    password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
});