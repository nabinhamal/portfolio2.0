import express from "express";
import formidable from "express-formidable"
import { createDetailsController, deleteDetailsController, getDetailsByTypeController, getDetailsController, getDetailsOfSingleController, updateDetailsController} from "../controllers/detailsController.js";
import {  requireSignIn } from './../helpers/authMiddleware.js';
;



const router = express.Router();

//create detail route
router.post("/create-detail",requireSignIn,formidable(),createDetailsController)
router.put("/update-detail/:_id",requireSignIn,formidable(),updateDetailsController)


router.get("/get-detail",getDetailsController)
router.get("/get-detail/:type",getDetailsOfSingleController)


//get bt type
router.get("/get-photo-detail/:type",getDetailsByTypeController)

router.delete("/delete-detail/:_id", requireSignIn, deleteDetailsController);

export default router;