import mongoose from 'mongoose';

 const messageSchema = new mongoose.Schema({

 contant:{
    type:String,
    require:true
 },
 userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
 }

},{
    timestamps:true
});


 const messageModel = mongoose.models.Message ||  mongoose.model('Message',messageSchema);

export default messageModel