import joi from "joi";
import { Types } from "mongoose";

let customId =(value,helper)=>{
  const result = Types.ObjectId.isValid(value)
  return result ? value : helper.message("Invalid Id")
}


export const generalRules= {
  id:joi.string().custom(customId),
    email:joi.string().email(),
    password:joi.string(),
    
      headers:joi.object({
        authentication:joi.string(),
        "content-type":joi.string().required(),
        "accept":joi.string().required(),
        "postman-token":joi.string().required(),
        host:joi.string().required(),
        "accept-encoding":joi.string().required(),
        "connection":joi.string().required(),
        "content-length":joi.string().required(),
        "user-agent":joi.string().required(),
    //  "cache-control":joi.string().required()
}),
file:joi.object({
  size: joi.number().positive().required(),
  path: joi.string().required(),
  filename: joi.string().required(),
  destination: joi.string().required(),
  mimetype: joi.string().required(),
  encoding: joi.string().required(),
  originalname: joi.string().required(),
  fieldname: joi.string().required()
}).messages({
  "any.required":"file is required"
})
    }
