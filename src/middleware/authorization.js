
export const authorization = (accessRules = [])=>{

    return (req ,res,next)=>{

    if (!accessRules?.includes(req?.user?.role)){
        throw new Error("user not authorized");
            
    }
        return next()
    }
}