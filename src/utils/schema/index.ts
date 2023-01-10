import * as yup from "yup"



export const basicSchema = yup.object().shape({
    email: yup.string().email("Enter valid email").required("Required"),
    password: yup
        .string()
        .min(5)
        .required("Required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'),null],'Passwords must match')
        .required("Required")
})


