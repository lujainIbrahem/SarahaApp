import { Router } from "express";
import * as US from "./user.service.js";
import * as UV from "./user.validation.js"
import { MulterHost ,validation ,authentication, allowedExtension} from "../../middleware/index.js";


const userRouter =Router({caseSensitive:true , strict:true })

userRouter.post("/signUp",
    MulterHost({customExtension : [...allowedExtension.image]}).single("attchmen"),
    validation(UV.signUpSchema),
    US.signUp)

userRouter.get("/confirmed/:token",US.confirmed)

userRouter.post("/signIn",validation(UV.signInSchema),US.signIn)

userRouter.post("/loginWithGmail",US.loginWithGmail)


userRouter.get("/profile",authentication,US.getProfile)

userRouter.post("/logout",authentication,US.logOut)

userRouter.patch("/updateProfile",validation(UV.updateProfileSchema),authentication,US.updateProfile)



userRouter.patch("/updateProfileImage",
    authentication,
    MulterHost({customExtension : [...allowedExtension.image]}).single("attchmen"),
    validation(UV.updateProfileImageSchema),
    US.updateProfileImage)


userRouter.get("/getProfileData/:id",US.getProfileData)

userRouter.patch("/updatePassword",validation(UV.updatePasswordSchema),authentication,US.updatePassword)

userRouter.patch("/forgetPassword",validation(UV.forgetPasswordSchema),US.forgetPassword)

userRouter.patch("/resetPassword",validation(UV.resetPasswordSchema),US.resetPassword)

userRouter.post("/refreshToken",US.refreshToken)

userRouter.delete("/freeze/{:id}",validation(UV.freezeSchema),authentication,US.freeze)

userRouter.delete("/unfreeze/{:id}",validation(UV.unfreezeSchema),authentication,US.unfreeze)

export default userRouter