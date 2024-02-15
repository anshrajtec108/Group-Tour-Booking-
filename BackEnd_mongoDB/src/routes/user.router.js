import { loginUser, logout, registerUser} from "../controllers/user.controllers.js";
import { Router } from "express";
import multer from "multer";
import { verifyJWT } from "../middlewares/auth.middleware.js";
 const router=Router();
 const storage=multer.memoryStorage()
 const upload=multer({storage:storage})

 router.post('/registerUser',upload.single('profilePhoto'),(req,res,next)=>{
    registerUser(req,res,next)
    
 })
//write the route like this because it give all the req method (err,req,res,next)
router.route("/loginUser").post(loginUser)

//verified  route
router.route("/logout").post(verifyJWT,logout)
 export default router