import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import User from '../models/user.models.js'
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'


const Login=async (req,res)=>{
    const errors=validationResult(req);

    if(errors.isEmpty()){
        const {username,password}=req.body;
        const user=await User.findOne({username:username});
        
        if(!user){
           return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"Username or password is incorrect",null));
        }

        const verified=bcrypt.compareSync(password,user.password);
        if(!verified){
            return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"Username or password is incorrect",null));
        }

        const token=Jwt.sign({userId:user._id},process.env.JWT_TOKEN_SECRET);

        return res.json(jsonGenerate(StatusCode.SUCCESS,"Login successful",{userId:user._id,token:token}));

    }
}

export default Login;