import { EventEmitter } from "events";
import { generateToken } from "../token/generateToken.js";
import { sendEmail } from "../../service/sendEmail.js";

export const eventEmiiter = new EventEmitter()

 eventEmiiter.on("sendEmail",async(data)=>{
const { email } = data
var token =await generateToken({ payload:{ email } ,
    SIGNATURE:process.env.SIGNATURE ,
     options:{ expiresIn : 60 * 3  }
    });

const link = `http://localhost:3000/users/confirmed/${token}`

const isSend =await sendEmail({
   to:email ,
   html:`<a href='${link}'>confirmed</a>`})
   
if (!isSend){
    throw new Error("message not send to email", {cause :400});
}    
 })


 eventEmiiter.on("forgetPassword",async(data)=>{
const { email , otp } = data



const isSend = await sendEmail({
   to:email ,
   subject:"forgetPassword",
   html:`<h1>${otp}</h1>`})
   
if (!isSend){
    throw new Error("message not send to email", {cause :400});
}    
 })