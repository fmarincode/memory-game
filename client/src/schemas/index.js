import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.


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

export const createImageSchema = yup.object().shape({
    name:yup
    .string()
    .required("Requis"),
    titleFrom:yup
    .string()
    .required("Requis"),
    image:yup
    .string()
    .required("Requis"),
    userOwner:yup
    .string()
    .required("Requis"),
    imageSrc:yup
    .string()
    .required("Requis"),
    imageAuthor:yup
    .string()
    .required("Requis")
})