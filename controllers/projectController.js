
import projectModel from "../models/projectModel.js";
import userModel from "../models/userModel.js";
import fs from 'fs';

export const createProjectsController = async (req, res) => {
    try {
        const { user, ptitle ,gitUrl } = req.fields;
        const { pimage} = req.files;

       

        const userExists = await userModel.findById(user);
        if (!userExists) {
            return res.status(404).send({ error: "User not found" });
        }

        const projects = new projectModel({
            user: user,
        ptitle,
        gitUrl,
        
        });
        if (pimage) {
            projects.pimage = {
                data: fs.readFileSync(pimage.path),
                contentType: pimage.type
            }
        }

        await projects.save();

        res.status(201).send({
            success: true,
            message: "projects registered successfully",
            projects,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in projects",
            error,
        });
    }
};


export const getProjectsController = async (req, res) => {
    try {
    
        const projects = await projectModel.find({});
  
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
        const { user } = req.params;
        const projects = await projectModel.findByIdAndDelete(user);
  
        if (!projects) {
            return res.status(404).send({ error: "projects not found" });
        }
  
        res.status(200).send({
            success: true,
            message: "projects deleted successfully",
           projects,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error deletingprojects",
            error,
        });
    }
  };
  export const updateProjectsController = async (req, res) => {
    try {
        const { user, ptitle ,gitUrl } = req.fields;
        const { pimage} = req.files;

      
  
        // Find the existingprojects
        const projects = await projectModel.find(user);
  
        if (!projects) {
            return res.status(404).send({ error: "projects not found" });
        }
  
        // Update fields
       
       projects.user= user;
        projects.ptitle = ptitle;
        projects.gitUrl = gitUrl;
        if (pimage) {
           projects.pimage = {
              data: fs.readFileSync(pimage.path),
              contentType: pimage.type
            };
          };
  
       
  
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
            message: "Error updating projects",
            error,
        });
    }
  };

 
  