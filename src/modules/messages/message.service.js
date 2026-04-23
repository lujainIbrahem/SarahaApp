import messageModel from "../../Db/models/message.model.js";
import userModel from "../../Db/models/user.model.js"


//======================== createMessage =====================
export const createMessage = async(req,res,next)=>{


const {userId,content}=req.body
if ( !await userModel.findOne({_id:userId ,isDeleted:{ $exists:false}})){
    throw new Error("user not exit ");
}
const messages = await messageModel.create({ content,userId})

    return res.status(201).json({message:"done",messages})

}



//======================== getAllMessage =====================
export const getAllMessage = async(req,res,next)=>{


const messages = await messageModel.find({ userId: req?.user?._id}).populate([
    {
        path:"userId"
    }
])

    return res.status(201).json({message:"done",messages})

}



//======================== getOneMessage =====================
export const getOneMessage = async(req,res,next)=>{

    const {id}=req.params

const messages = await messageModel.findOne({ userId: req?.user?._id , _id : id })

    return res.status(201).json({message:"done",messages})

}


