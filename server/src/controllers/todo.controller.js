import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import Todo from '../models/todo.models.js'
import User from '../models/user.models.js'

export const createTodo=async (req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Todo is required",error.mapped()))
    }

    try {
        const result=await Todo.create({
            userId:req.userId,
            desc:req.body.desc,
        })
        if(result){
            const user=await User.findOneAndUpdate({_id:req.userId},{$push:{todos:result}});
            return res.json(jsonGenerate(StatusCode.SUCCESS,"Todo created successfully",result))
        }

    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"Something went wrong",error))
    }
}