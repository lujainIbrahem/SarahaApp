import { Router } from "express";
import * as MS from "./message.service.js";
import * as MV from "./message.validation.js"
import { validation } from "../../middleware/validation.js";
import { authentication } from "../../middleware/authentication.js";

const messageRouter = Router({caseSensitive:true , strict:true })

messageRouter.post("/createMessage",validation(MV.createMessageSchema),MS.createMessage)

messageRouter.get("/getAllMessage",authentication,MS.getAllMessage)

messageRouter.get("/getOneMessage/:id",validation(MV.getOneMessageSchema),authentication,MS.getOneMessage)

export default messageRouter