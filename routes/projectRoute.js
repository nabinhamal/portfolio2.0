import express from "express";
import formidable from "express-formidable"
import {  requireSignIn } from './../helpers/authMiddleware.js';
import { createProjectsController, deleteProjectsController, getProjectsController, updateProjectsController } from "../controllers/projectController.js";
;



const router = express.Router();

//create detail route
router.post("/create-project",requireSignIn,formidable(),createProjectsController)
router.put("/update-project/:_id",requireSignIn,formidable(),updateProjectsController)


router.get("/get-project/:_id",getProjectsController)

//get bt type
//router.get("/get-detail/:type",getDetailsByTypeController)

router.delete("/delete-project/:_id", requireSignIn, deleteProjectsController);

export default router;