import joi from "joi"
import { userGender } from "../../Db/models/user.model.js"
import { generalRules } from "../../utils/generalRules/index.js"




export const signUpSchema = {
    body :joi.object({
        name:joi.string().min(3).max(15).required(),
        email:generalRules.email.required(),
        password:generalRules.password.required(),
        cPassword:joi.string().valid(joi.ref("password")).required(),
        age:joi.number().min(14).max(60).required(),
        gender:joi.string().valid(userGender.male,userGender.female).required(),
        phone:joi.string().required()
    }).required(),
   //file:generalRules.file
}


export const signInSchema = {
    body :joi.object({
        email:generalRules.email.required(),
        password:generalRules.password.required(),
    }).required(),
}



export const updatePasswordSchema = {
    body :joi.object({
        oldPassword:generalRules.password.required(),
        newPassword:generalRules.password.required(),
        cPassword:joi.string().valid(joi.ref("newPassword")).required(),
    }).required(),
}



export const forgetPasswordSchema = {
    body :joi.object({
    email:generalRules.email.required()

    }).required(),
}


export const resetPasswordSchema = {
    body :joi.object({
    email:generalRules.email.required(),
    otp:joi.string().length(4).required(),
    newPassword:generalRules.password.required(),
    cPassword:joi.string().valid(joi.ref("newPassword")).required(),
    }).required(),
}



export const updateProfileSchema = {
    body :joi.object({
        name:joi.string().min(3).max(15),
        email:generalRules.email,
        age:joi.number().min(14).max(60),
        gender:joi.string().valid(userGender.male,userGender.female),
        phone:joi.string()
    }),
}


export const freezeSchema = {
    params :joi.object({
       id:generalRules.id
    })
}
    
export const unfreezeSchema = freezeSchema

export const updateProfileImageSchema = {

   file:generalRules.file.required()
}