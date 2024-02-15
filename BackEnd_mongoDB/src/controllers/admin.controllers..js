import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";



async function getAlluser(req,res){

    const user= await User.find().sort({_id:-1})
    return res
    .status(201)
    .json(new ApiResponse(200, user, "User registered List"));
  }

export{getAlluser}