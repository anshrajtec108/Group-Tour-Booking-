import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    
    email: {
      type:String,
      required:true,
      unique:true,
      lowecase:true,
      trim:true,
   },
   firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
    
      trim: true,
    },
    phoneNumber: {
      type: Number,
      trim: true,
      unique:true,
    },
    gender: {
      type: String,
      trim: true,
    },
    aadharNumber: {
      type: Number,
      trim: true,
    },
    profilePhoto: {
      name:String,
      data: Buffer,
      contentType:String
    },
    recentlyViewed: [
      {
        type: Schema.Types.ObjectId,//type of tour user viewed 
        ref: "recentlyViewed",
      },
    ],
    username: {
      type: String,
      unique: true,
      lowecase: true,
      trim: true,
      index: true,
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function(next) {
  if (!this.isModified("password") || !this.isNew) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.ispasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.genereteAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fristName:this.fristName,
            lastName:this.lastName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
   {
       _id:this._id,
   },
   process.env.REFRESH_TOKEN_SECRET,
   {
       expiresIn:process.env.REFRESH_TOKEN_EXPIRY
   }
)

}

export const User=mongoose.model("User",userSchema)


