import mongoose from 'mongoose';


const checkConnectionDb = async ()=>{

    await mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("success to connect db");  
    }).catch((error)=>{
        console.log("failed to connect db",error);
    })


}

export default checkConnectionDb