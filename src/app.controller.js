import checkConnectionDb from "./Db/app.connection.js"
import { globalErrorHandling } from "./middleware/index.js"
import messageRouter from "./modules/messages/message.controller.js"
import userRouter from "./modules/users/user.controller.js"
import cors from 'cors'
import helmet from "helmet"

import { rateLimit } from 'express-rate-limit'

var whitelist = [process.env.FRONT_ORIGIN , undefined]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


const bootstrap = ({app,express})=>{

const limiter = rateLimit({
	windowMs:  60 * 1000, 
	limit: 10, 
    handler:(req,res,next,optional)=>{
        res.status(400).json({error:"game over"})
    },
	legacyHeaders: false, 
	
})

app.use(cors(corsOptions))
app.use(limiter)
app.use(helmet())

app.use(express.json())


checkConnectionDb()

app.use("/users",userRouter)
app.use("/messages",messageRouter)

app.use("/uploads",express.static("uploads"))
app.use("{/*demo}",(req,res,next)=>{
    res.status(404).json({message:`server not found ${req.originalUrl}`})
})

app.use(globalErrorHandling)
}

export default bootstrap