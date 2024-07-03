import { json } from "express"
import { jsonGenerate } from "../utils/helpers.js"
import { StatusCode } from "../utils/constants.js"
import Jwt from 'jsonwebtoken'

const AuthMiddleware=(req,res,next)=>{

    if(req.headers['auth']===undefined){
        return res,json(jsonGenerate(StatusCode.AUTH_ERROR,"Access denied",null));
    }

    const token=req.headers['auth'];

    try{
        const decoded=Jwt.verify(token,process.env.JWT_TOKEN_SECRET);
        // console.log(decoded);

        req.userId=decoded.userId;
        return next();
    }
    catch(error){
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"Invalid token",null));
    }
}

export default AuthMiddleware;