import { nanoid ,customAlphabet } from "nanoid";
import userModel, { userProvider,userRole } from "../../Db/models/user.model.js"
import {hashPass,comparePass, generateToken,verifyToken ,eventEmiiter, decryptPhone,encryptphone} from "../../utils/index.js";
import RevokeToken from "../../Db/models/revokeToken.model.js";
import cloudinary from "../../utils/cloudinary/index.js";
import {OAuth2Client} from 'google-auth-library' ;


//======================== signUp =====================
export const signUp = async(req,res,next)=>{


const {public_id,secure_url} = await cloudinary.uploader.upload(req?.file?.path)

const { name ,email,phone ,age,gender,password , cPassword }= req.body

//check email
    if(await userModel.findOne( {email} )){
        throw new Error("email already exit", {cause :409});
    }

  //hash password
const hashPassword =await hashPass({plainText:password, salt_round:process.env.SALT_ROUND});

// Encrypt
var encryptPhone =await encryptphone({plainText:phone,SECRET_KEY: process.env.ENCRYPT_PHONE});


//Confirmed
eventEmiiter.emit("sendEmail",{ email })

const user = await userModel.create({ 
    name , 
    email, 
    phone:encryptPhone ,
    age,
    gender,
    password:hashPassword ,
    profileImage:{public_id,secure_url}
    })

    return res.status(201).json({message:"created success",user})


}


//======================== confirm =====================
export const confirmed = async(req,res,next)=>{
try {
 
const {token}= req.params
if(!token){
    throw new Error("token failed", {cause :400});

}
const decoded =await verifyToken({ token ,SIGNATURE:process.env.SIGNATURE});

const user = await userModel.findOne({email: decoded.email,confirmed:false})
if(!user){
    throw new Error("user not exit", {cause :401});
    
}
user.confirmed = true
await user.save()



return res.status(200).json({message:"confirmed success"})
} catch (error) {
    throw new Error("failed to confirm", {cause :500});
}
}

//======================== signIn =====================
export const signIn = async(req,res,next)=>{

    
const { email,password }= req.body
//check email
const user = await userModel.findOne( {email,confirmed:true} )
if(!user){
    throw new Error("email not exit or not confirm", {cause :401});
}

//compare password
const match =await comparePass({plainText:password,salt_round: user.password}); // true
if (!match){
    throw new Error("password or email not match " , {cause :409});
    }

const access_token =await generateToken({
    payload:{ id:user._id ,email :user.email },
    SIGNATURE: user.role == userRole.admin? process.env.ACCESS_TOKEN_ADMIN : process.env.ACCESS_TOKEN_USER, 
    options:{  expiresIn : "1h" ,jwtid : nanoid() }
});

const refresh_token =await generateToken({
    payload:{ id:user._id , email :user.email },
    SIGNATURE: user.role == userRole.admin? process.env.REFRESH_TOKEN_ADMIN : process.env.REFRESH_TOKEN_USER,  
    options:{  expiresIn : "1y" ,jwtid : nanoid()  }
});

return res.status(201).json({ message:"created success" , access_token , refresh_token })
} 


//======================== loginWithGmail =====================
export const loginWithGmail = async(req,res,next)=>{

    
const { idToken }= req.body

const client = new OAuth2Client();
async function verify() {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.WEB_CLIENT_ID, 
  });
  const payload = ticket.getPayload();
 return payload
}
const {name,picture,email_verified,email} = await verify()

//check email
let user = await userModel.findOne( {email} )
if(!user){
   user =await userModel.create({
    name,
    email,
    image:picture,
    confirmed:email_verified,
    password:nanoid(),
    provider:userProvider.google
   })
}

if(user.provider !== userProvider.google){throw new Error("please login by system");}

const access_token =await generateToken({
    payload:{ id:user._id ,email :user.email },
    SIGNATURE: user.role == userRole.user? process.env.ACCESS_TOKEN_USER : process.env.ACCESS_TOKEN_ADMIN, 
    options:{  expiresIn : "1h" ,jwtid : nanoid() }
});

const refresh_token =await generateToken({
    payload:{ id:user._id , email :user.email },
    SIGNATURE: user.role == userRole.user? process.env.REFRESH_TOKEN_USER : process.env.REFRESH_TOKEN_ADMIN , 
    options:{  expiresIn : "1y" ,jwtid : nanoid()  }
});



return res.status(201).json({ message:"created success" , access_token , refresh_token })

}

//======================== getProfile =====================
export const getProfile = async(req,res,next)=>{
 

var phone  =await decryptPhone({plainText:req.user.phone,SECRET_KEY: process.env.ENCRYPT_PHONE});

req.user.phone = phone

return res.status(200).json({message:"created success",user :req.user})
}

//======================== logOut =====================
export const logOut = async(req,res,next)=>{

 
const revokeToken = await RevokeToken.create({
tokenId:req.decoded.jti,
    exp:req.decoded.exp
})


return res.status(200).json({message:" success",revokeToken})

}

//======================== refresh Token =====================
export const refreshToken = async(req,res,next)=>{
 
const { authentication }= req.headers
const [prefix,token ] =authentication.split(" ") || [] 
if(!prefix || !token){
  throw new Error("token not exit", {cause :404});
}
var signature = ""
if (prefix=="user"){
signature = process.env.REFRESH_TOKEN_USER
}
else if(prefix =="admin"){
  signature=  process.env.REFRESH_TOKEN_ADMIN
}

else{
  throw new Error("invalid", {cause :401});
}

var decoded =await verifyToken({token, SIGNATURE: signature});


const revoke = await RevokeToken.findOne({tokenId: decoded.jti})
if(revoke){
  throw new Error("try login again", {cause :400});
}

const user = await userModel.findOne({email: decoded.email})
if(!user){
  throw new Error("user not exit ,please signUp", {cause :401});
} 

var access_token =await generateToken({
    payload:{  id:user._id ,email :user.email},
    SIGNATURE: user.role == userRole.user? process.env.ACCESS_TOKEN_USER : process.env.ACCESS_TOKEN_ADMIN , 
    options:{  expiresIn : "1h" ,jwtid : nanoid() }
});

var refresh_token =await generateToken({
    payload:{  id:user._id ,email :user.email },
    SIGNATURE: user.role == userRole.user? process.env.REFRESH_TOKEN_USER : process.env.REFRESH_TOKEN_ADMIN , 
    options:{  expiresIn : "1y" ,jwtid : nanoid()  }
});

return res.status(201).json({ message:"created success" , access_token , refresh_token })
} 


//======================== update =====================
export const updatePassword = async(req,res,next)=>{
 

const {oldPassword,newPassword}=req.body

if(!await comparePass({plainText:oldPassword ,salt_round:req.user.password})){
throw new Error("invalid oldPassword");
    
}
const hash = await hashPass({plainText:newPassword});

req.user.password = hash
await req.user.save()

await RevokeToken.create({tokenId: req?.decoded?.jti,
    exp:req?.decoded?.exp
})



return res.status(200).json({message:"updated success",user:req.user})

} 


//======================== forget Password =====================
export const forgetPassword = async(req,res,next)=>{
 
const { email }= req.body

//check email
const user = await userModel.findOne({ email })
if(!user){
    throw new Error("email not exit ", {cause :401});   
}

const otp = customAlphabet("0123456789",4)()

//send Email
eventEmiiter.emit("forgetPassword",{ email,otp })
 
const hash = await hashPass({plainText:otp})
user.otp = hash
await user.save()

return res.status(200).json({message:" success"})

} 


//======================== reset Password =====================
export const resetPassword = async(req,res,next)=>{
 
const { email , otp ,newPassword }= req.body

//check email
const user = await userModel.findOne({ email ,otp :{$exists :true} })
if(!user){
    throw new Error("email not exit or otp is incorrect , please try to forgetPassword first ", {cause :401});   
}
 
if(!await comparePass({plainText:otp , salt_round:user?.otp})){
throw new Error(" otp invalid");
}

const hash = await hashPass({plainText:newPassword});
await userModel.updateOne({email},{
    password:hash ,
    $unset:{otp :""}
})

return res.status(200).json({message:" success"})

} 


//======================== updateProfile =====================
export const updateProfile = async(req,res,next)=>{
 const { name,email,age,gender,phone}= req.body
if(name) req.user.name = name
if(age) req.user.age = age
if(gender) req.user.gender = gender
if(phone) {
var encryptPhone =await encryptphone({plainText:phone,SECRET_KEY: process.env.ENCRYPT_PHONE});
req.user.phone = encryptPhone
}
if(email){
const user = await userModel.findOne({email})
if(user){
    throw new Error("email already exit", {cause :401});
}
eventEmiiter.emit("sendEmail",{ email })
req.user.email = email
req.user.confirmed = false
}

await req.user.save()


return res.status(200).json({message:"created success",user :req.user})
} 



//======================== getProfileData =====================
export const getProfileData = async(req,res,next)=>{

 
const {id}=req.params
const user = await userModel.findById(id).select("name age gender")
if(!user){
    throw new Error("user not exit", {cause :401});
    
}

return res.status(200).json({message:"created success",user})
} 



//======================== freeze =====================
export const freeze = async(req,res,next)=>{

 
const { id } = req.params
if (id && req.user.role !== userRole.admin){
    throw new Error("user can't do this operation");
}

const user = await userModel.updateOne(
    {
        _id:req.user._id || id,
        isDeleted:{$exists:false}
    },
    {
        isDeleted:true,
        deletedBy:req.user._id
    },
    {
        $inc:{__v :1 }
    }
)


user.matchedCount? res.status(200).json({message:"freezed success"}) :res.status(400).json({message:"freezed failed"})

}




//======================== unfreeze =====================
export const unfreeze = async(req,res,next)=>{

 
const { id } = req.params
if (id && req.user.role !== userRole.admin){
    throw new Error("user can't do this operation");
}

const user = await userModel.updateOne(
    {
        _id:req.user._id || id,
        isDeleted:{$exists:true}
    },
    {
        $unset:{isDeleted:"",deletedBy:""}
    }
)


user.matchedCount? res.status(200).json({message:"freezed success"}) :res.status(400).json({message:"unfreezed failed"})

}





//======================== updateProfileImage =====================
export const updateProfileImage = async(req,res,next)=>{

const {public_id,secure_url} = await cloudinary.uploader.upload(req?.file?.path)

const user = await userModel.findByIdAndUpdate({_id :req?.user?._id},
    {
 profileImage:{public_id,secure_url}},
)

await cloudinary.uploader.destroy(user?.profileImage?.public_id)
return res.status(200).json({message:"created success",user})
} 

