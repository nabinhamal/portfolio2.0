
import projectModel from "../models/projectModel.js";
import userModel from "../models/userModel.js";
import fs from 'fs';

export const createProjectsController = async (req, res) => {
    try {
        const { user, pname } = req.fields;
        const { imgSrc } = req.files;

        // Validation...
        if (!user || !ptitle   || !gitUrl  ) {
            return res.status(400).send({ error: "All fields are required" });
        }

        const userExists = await userModel.findById(user);
        if (!userExists) {
            return res.status(404).send({ error: "User not found" });
        }

        const projects = new projectModel({
            user: user,
        pname: {dataArray : pname},
        });

        if (imgSrc) {
            projects.imgSrc = {
                data: fs.readFileSync(imgSrc.path),
                contentType: imgSrc.type
            }
        }

        await projects.save();

        res.status(201).send({
            success: true,
            message: "Details registered successfully",
            projects,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in details",
            error,
        });
    }
};


export const getProjectsController = async (req, res) => {
    try {
        const { _id } = req.params;
        const projects = await projectModel.findById({_id});
  
        if (!projects) {
            return res.status(404).send({ error: "projects not found" });
        }
  
        res.status(200).send({
            success: true,
            projects,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error fetching projects",
            error,
        });
    }
  };
  export const deleteProjectsController = async (req, res) => {
    try {
        const { _id } = req.params;
        const details = await projectModel.findByIdAndDelete(_id);
  
        if (!details) {
            return res.status(404).send({ error: "Details not found" });
        }
  
        res.status(200).send({
            success: true,
            message: "Details deleted successfully",
            details,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error deleting details",
            error,
        });
    }
  };
  export const updateProjectsController = async (req, res) => {
    try {
        const { _id } = req.params;
        const {  pname } = req.fields;
        const { imgSrc } = req.files;
  
        // Find the existing details
        const projects = await projectModel.findById(_id);
  
        if (!projects) {
            return res.status(404).send({ error: "projects not found" });
        }
  
        // Update fields
       
       
        projects.pname = { dataArray:pname };
      
  
        // Update profile images if provided
        if (imgSrc) {
            projects.imgSrc = {
                data: fs.readFileSync(imgSrc.path),
                contentType: imgSrc.type
            };
        }
  
      
  
       
  
        await projects.save();
  
        res.status(200).send({
            success: true,
            message: "projects updated successfully",
            projects,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error updating details",
            error,
        });
    }
  };