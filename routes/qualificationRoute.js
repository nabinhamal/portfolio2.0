import express from "express";
import {  requireSignIn } from './../helpers/authMiddleware.js';
import { createQualificationController, deleteQualificationController, getAllQualificationsController, getQualificationByIdController, updateQualificationController } from "../controllers/qualificationController.js";
;



const router = express.Router();

//create detail route
router.post("/create-qualification",createQualificationController)
router.put("/update-qualification/:user",updateQualificationController)

//by id
router.get("/get-qualification/:user",getQualificationByIdController)

//get all
router.get("/get-all",getAllQualificationsController)

router.delete("/delete-qualification/:user",deleteQualificationController);

export default router;