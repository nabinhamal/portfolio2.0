// projectController.js

import fs from 'fs';
import projectModel from '../models/projectModel.js';
import userModel from '../models/userModel.js';

// ...

export const createProjectsController = async (req, res) => {
    try {
       
        
        const pname= req.fields.pname;
        const ptitle = req.fields.ptitle;
        const gitUrl = req.fields.gitUrl;
        const pimage = req.files.pimage;


        const projects = new projectModel({
       pname,
            ptitle,
            gitUrl
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

export const updateProjectsController = async (req, res) => {
    try {
        const { id } = req.params;
        const ptitle = req.fields.ptitle;
        const gitUrl = req.fields.gitUrl;
        const pimage = req.files.pimage;
        console.log(req.body);
        // Find the existing projects
        const projects = await projectModel.findByIdAndUpdate({ id });

        if (!projects) {
            return res.status(404).send({ error: "Projects not found" });
        }

        // Update fields
        projects.ptitle = ptitle;
        projects.gitUrl = gitUrl;

       
    if (pimage) {
        projects.pimage = {
          data: fs.readFileSync(pimage.path),
          contentType: pimage.type
        };
      }
      console.log(req.body);
        await projects.save();

        res.status(200).send({
            success: true,
            message: "Projects updated successfully",
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

// ...


export const getProjectsController = async (req, res) => {
  try {
    const projects = await projectModel.find({});

    if (!projects) {
      return res.status(404).send({ error: 'Projects not found' });
    }

    res.status(200).send({
      success: true,
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error fetching projects',
      error,
    });
  }
};

export const deleteProjectsController = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await projectModel.findByIdAndDelete(id);

    if (!projects) {
      return res.status(404).send({ error: 'Projects not found' });
    }

    res.status(200).send({
      success: true,
      message: 'Projects deleted successfully',
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error deleting projects',
      error,
    });
  }
};


