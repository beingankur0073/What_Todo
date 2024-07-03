import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import bcrypt, { genSalt } from 'bcrypt'
import User from '../models/user.models.js'
import Jwt from 'jsonwebtoken';


const Register=async (req,res)=>{
    const errors=validationResult(req);

    if(errors.isEmpty()){
        const {name,username,password,email}=req.body;

        const salt= await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt)

        const userExist=await User.findOne({$or:[{email:email},{username:username}]});
        if(userExist) return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"User or Email already exists",null))
        // save to db
        try{
            const result=await User.create({
                name:name,
                email:email,
                password:hashPassword,
                username:username,
            })
            const token=Jwt.sign({userId:result._id},process.env.JWT_TOKEN_SECRET);
            return res.json(jsonGenerate(StatusCode.SUCCESS,"Registration Successful",{userId:result._id,token:token}))
        }
        catch(error){

        }
    }

   return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error",errors))
}

export default Register;