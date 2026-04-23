import mongoose from 'mongoose';

export const userGender = {
        male:"male",
        female:"female"
    }
export const userRole = {
   
   user :"user",
   admin :"admin"
}
export const userProvider = {
   
   system :"system",
   google :"google"
}

 const userSchema = new mongoose.Schema({

 name:{
    type:String,
    required:true,
    minLength:3

 },
 email:{
    type:String,
    required:true
 },
 password:{
    type:String,
    required:true,
 },
 phone:{
    type:String,
 },
 gender:{
    type:String,
    enum:Object.values(userGender),
    default:userGender.male
 },
 age:{
    type:Number,
    min:18,
    max:60
 },
 confirmed:{
    type:Boolean,
    default:false
 },
 profileImage:{
   public_id:{type: String},
   secure_url:{type: String}
 },
 coverImage:[String],
 role:{
   type:String,
   enum:Object.values(userRole),
   default:userRole.user
 },
  provider:{
   type:String,
   enum:Object.values(userProvider),
   default:userProvider.system
 },
 image:String,
 otp:String,
 isDeleted:Boolean,

 deletedBy:  { 
   type:mongoose.Schema.Types.ObjectId,
   ref:"User"
   }

},{
    timestamps:true
});


  const userModel = mongoose.models.User ||  mongoose.model('User',userSchema);

  export default userModel