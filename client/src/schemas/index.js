import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;


export const loginSchema = yup.object().shape({
    username:yup
    .string()
    .required("Requis"),
    password:yup
    .string()
    .min(8)
    .matches(passwordRules, {message: "Utilisez un mot de passe plus robuste"})
    .required("Requis"),
    confirmPassword:yup
    .string()
    .oneOf([yup.ref("password"), null], "Le mot de passe doit correspondre")
    .required("Veuillez confirmez le mot de passe")

})

export const registerSchema = yup.object().shape({
    username:yup
    .string()
    .required("Requis"),
    password:yup
    .string()
    .min(8)
    .matches(passwordRules, {message: "Utilisez un mot de passe plus robuste"})
    .required("Requis"),
    role:yup
    .string()
    .required("Requis")
})


export const createThemeSchema = yup.object().shape({
    name:yup
    .string()
    .required("Requis"),
    media:yup
    .string()
    .required("Requis"),
    userOwner:yup
    .string()
    .required("Requis"),
})