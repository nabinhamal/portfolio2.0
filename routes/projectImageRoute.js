import express from "express";
import formidable from "express-formidable"
import {  requireSignIn } from './../helpers/authMiddleware.js';
import { createImageController} from "../controllers/projectImageController.js";

const router = express.Router();
router.post("/create-image",formidable(),createImageController)








export default router;