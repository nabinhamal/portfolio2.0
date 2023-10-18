import express from "express";
import { deleteController, getUserController, loginController, regController, updateController } from "../controllers/authController.js";

//yo chai multer use gard areg,upload update ma adda garneupload.fields([{ name: 'profile', maxCount: 1 }, { name: 'cv', maxCount: 1 }]),

const router = express.Router();

// Use router.post() instead of app.post()
router.post("/register", regController);

//login 
router.post("/login",loginController)



//update
router.put("/update/:_id" ,updateController)

//delete
router.delete("/delete/:_id",deleteController)

//get user detail
router.get("/user", getUserController);

export default router;


