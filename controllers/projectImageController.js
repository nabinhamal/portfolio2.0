import projectImageModel from "../models/projectImageModel.js";
import userModel from "../models/userModel.js";
import fs from 'fs';




export const createImageController = async (req, res) => {
    try {
        const { user } = req.fields;
        const { pimage } = req.files;

        if (!user || !pimage) {
            return res.status(400).send({ error: "User and pimage are required" });
        }

        const userExists = await userModel.findById(user);
        if (!userExists) {
            return res.status(404).send({ error: "User not found" });
        }

        const projects = new projectImageModel({
            user: user,
            pimage: pimage.map(file => ({
                data: fs.readFileSync(file.path),
                contentType: file.type
            }))
        });

        await projects.save();

        res.status(201).send({
            success: true,
            message: "Images uploaded successfully",
            projects,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in uploading images",
            error,
        });
    }
};

