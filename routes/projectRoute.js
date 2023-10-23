import express from "express";
import formidable from "express-formidable"
import {  requireSignIn } from './../helpers/authMiddleware.js';
import { createProjectsController, deleteProjectsController, getProjectsController, updateProjectsController } from "../controllers/projectController.js";
;



const router = express.Router();

//create detail route
router.post("/create-project",formidable(),createProjectsController)
router.put("/update-project/:id",formidable(),updateProjectsController)


router.get("/get-project",getProjectsController)



router.delete("/delete-project/:id", deleteProjectsController);

export default router;