import express from "express";
import {  requireSignIn } from './../helpers/authMiddleware.js';
import { createQualificationController, deleteQualificationController, getAllQualificationsController, getQualificationByIdController, updateQualificationController } from "../controllers/qualificationController.js";
;



const router = express.Router();

//create detail route
router.post("/create-qualification",requireSignIn,createQualificationController)
router.put("/update-qualification/:_id",requireSignIn,updateQualificationController)

//by id
router.get("/get-qualification/:_id",requireSignIn,getQualificationByIdController)

//get all
router.get("/get-all",getAllQualificationsController)

router.delete("/delete-qualification/:_id", requireSignIn,deleteQualificationController);

export default router;