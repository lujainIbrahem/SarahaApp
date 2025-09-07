import mongoose from 'mongoose';

 const revokeToken = new mongoose.Schema({

 tokenId:{
    type:String,
    required:true
 },
 exp:{
    type:String,
    required:true
 }

},{
    timestamps:true
});


 const RevokeToken = mongoose.models.Message ||  mongoose.model('Revoke',revokeToken);

export default RevokeToken