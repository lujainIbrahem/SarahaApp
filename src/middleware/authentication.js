import RevokeToken from '../Db/models/revokeToken.model.js';
import userModel from '../Db/models/user.model.js';
import { verifyToken } from '../utils/index.js';

export const authentication =async(req,res,next)=>{
  
const { authentication }= req.headers
var [prefix,token ] =authentication.split(" ") || [] 
if(!prefix || !token){
  throw new Error("token not exit", {cause :404});
}

var signature = ""
if (prefix == "user"){
signature = process.env.ACCESS_TOKEN_USER
}

else if(prefix =="admin"){
  signature = process.env.ACCESS_TOKEN_ADMIN
}

else{
return res.status(404).json({message:"invalidd",message:error.message,stack:error.stack})
}


const decoded =await verifyToken({token, SIGNATURE: signature});


const revoke = await RevokeToken.findOne({tokenId: decoded.jti})
if(revoke){
  throw new Error("try login again", {cause :400});
}
const user = await userModel.findOne({email: decoded.email})

if(!user){
  throw new Error("user not exit", {cause :401});
}

req.user = user
req.decoded =decoded
return next()
}
