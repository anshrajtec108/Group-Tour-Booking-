import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const optionForCookies={
  httpOnly:true,
  secure:true
}

const generateAccessAndRefreshTokens=async (userId)=>{
  try {
    const user = await User.findById(userId)
    const accessToken= user.genereteAccessToken()
    const refreshToken=user.generateRefreshToken()
    // console.log("accessToken, 108 ",accessToken,"refreshToken",refreshToken )
    user.refreshToken=refreshToken
    // console.log(user)
    await user.save({validateBeforeSave:false})

    return{accessToken,refreshToken}

  }
  catch (error) {
    throw new ApiError(500,"Something went wrong while generating refresh and access token ")
  }
}
const registerUser = asyncHandler(async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    gender,
    aadharNumber,
    password,
    username,
  } = req.body;
  const profilePhoto = req.file;
  const profilePhotoinfo = {
    name: profilePhoto.originalname || "photo name ",
    data: profilePhoto.buffer,
    contentType: profilePhoto.mimetype,
  };

  // Check if any required fields are missing or empty
  if (
    ![email, firstName, lastName, phoneNumber, gender, password].every(Boolean)
  ) {
    throw new ApiError(400, "All the fields are required");
  }

  // Check if email is provided and not empty
  if (!email || email.trim() === "") {
    throw new ApiError(400, "Email is required");
  }

  // Use findOne instead of create for checking duplicate email
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new ApiError(409, "The email already exists, so just LOGIN");
  }

  const user = await User.create({
    email: email.toLowerCase(),
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    gender: gender,
    aadharNumber: aadharNumber,
    profilePhoto: profilePhotoinfo,
    username: username ? username.toLowerCase() : undefined,
    password: password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -profilePhoto"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser=asyncHandler(async(req,res)=>{

    const {phoneNo,email,password }=req.body;
    if(!phoneNo && !email){
      throw new ApiError(400,"Email OR phone number is requird ")
    }
    // const user=await User.findOne({$or:[{email},{phoneNo}]})
    const user=await User.findOne({email})
    if(!user){
      throw new ApiError(400,"user does not exist ")
    }

    const ispasswordvaild=await user.ispasswordCorrect(password)

    if(!ispasswordvaild){
      throw new ApiError(401,"Invalid user credentials // password")
    }

    const {accessToken,refreshToken}= await generateAccessAndRefreshTokens(user._id)
    // console.log("accessToken,refreshToken",accessToken,refreshToken)
    const loggedInUser=await User.findById(user._id).select("-password -profilePhoto -refreshToken")
    
  return res.status(200)
  .cookie("accessToken",accessToken,optionForCookies)
  .cookie("refreshToken",refreshToken,optionForCookies)
  .json(
    new ApiResponse(200,
      {
        user:loggedInUser
      },
      "User logged In Successfully"
      )
  )
  })


const logout =asyncHandler(async(req,res)=>{
     await User.findByIdAndUpdate(
      req.user._id,
      {
        $set:{
          refreshToken:undefined
        }
      },
      {
        new:true
      }
    )
    return res.status(200)
    .clearCookie("accessToken",optionForCookies)
    .clearCookie("refreshToken",optionForCookies)
    .json(new ApiResponse(200,{},"user logged out"))
})

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params

  if (!username?.trim()) {
    throw new ApiError(400, "username is missing")
  }

  const channel = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase()
      }
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers"
      }
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo"
      }
    },
    {
      $addFields: {
        subscribersCount: {
          $size: "$subscribers"
        },
        channelsSubscribedToCount: {
          $size: "$subscribedTo"
        },
        issubscribed: {
          $cond: {
            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
            then: true,
            else: false
          }
        }
      }
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        subscribersCount: 1,
        channelsSubscribedToCount: 1,
        issubscribed: 1,
        avatar: 1,
        coverImage: 1,
        email: 1
      }
    }
  ])
  // console.log(channel)
  if (!channel?.length) {
    throw new ApiError(404, "channel does not exists")
  }

  return res.status(200)
    .json(
      new ApiResponse(200, channel[0], "user channel fetched successfully")
    )
})


export { 
  registerUser,
  loginUser,
  logout
};
