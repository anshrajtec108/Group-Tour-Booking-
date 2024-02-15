import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


export const verifyJWT=asyncHandler(async(req,_,next)=>{
    try {
        const token=req.cookies?.accessToken
        if (!token){
            throw new ApiError(401,"Unauthorized request")
        }
        const decodeedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findById(decodeedToken?._id).select("-password -profilePhoto")
        
        if(!user){
            throw new ApiError(401,"Invaild Access Token")
        }  
        req.user=user;
        next()
    } catch (error) {
        throw new ApiError(401,error.message||"invalid access token")
    }
})

