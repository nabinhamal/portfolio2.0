import detailModel from "../models/detailModel.js";
import userModel from "../models/userModel.js";
import fs from 'fs';

export const createDetailsController = async (req, res) => {
    try {
        const { user, about, exp, username ,abouthome } = req.fields;
        const { profilehome, profileabout, cv } = req.files;

      

        const userExists = await userModel.findById(user);
        if (!userExists) {
            return res.status(404).send({ error: "User not found" });
        }

        const details = new detailModel({
            user: user,
            about,
            abouthome,
        
            exp: JSON.parse(exp),
            username,
        });

        if (profilehome) {
            details.profilehome = {
                data: fs.readFileSync(profilehome.path),
                contentType: profilehome.type
            }
        }

        if (profileabout) {
            details.profileabout = {
                data: fs.readFileSync(profileabout.path),
                contentType: profileabout.type
            }
        }

        if (cv) {
            details.cv = {
                data: fs.readFileSync(cv.path),
                contentType: cv.type
            }
        }

        await details.save();

        res.status(201).send({
            success: true,
            message: "Details registered successfully",
            details,
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


export const updateDetailsController = async (req, res) => {
  try {
    const { user } = req.params;
    const { about, exp, username, abouthome } = req.fields;
    const { profilehome, profileabout, cv } = req.files;

    const details = await detailModel.findOne({user});

    if (!details) {
      return res.status(404).send({ error: "Details not found" });
    }


    details.about = about;
    details.abouthome = abouthome;
    details.exp = JSON.parse(exp);
    details.username = username;

    if (profilehome) {
      details.profilehome = {
        data: fs.readFileSync(profilehome.path),
        contentType: profilehome.type
      };
    }

    if (profileabout) {
      details.profileabout = {
        data: fs.readFileSync(profileabout.path),
        contentType: profileabout.type
      };
    }

    if (cv) {
      details.cv = {
        data: fs.readFileSync(cv.path),
        contentType: cv.type
      };
    }

    await details.save();

    res.status(200).send({
      success: true,
      message: "Details updated successfully",
      details,
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


export const getDetailsController = async (req, res) => {
  try {
      const details = await detailModel.find({});

      if (!details) {
          return res.status(404).send({ error: "Details not found" });
      }

      res.status(200).send({
          success: true,
          details,
      });
  } catch (error) {
      console.error(error);
      res.status(500).send({
          success: false,
          message: "Error fetching details",
          error,
      });
  }
};



export const deleteDetailsController = async (req, res) => {
  try {
      const { user } = req.params;
      const details = await detailModel.findByIdAndDelete(user);

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


export const getDetailsByTypeController = async (req, res) => {
  try {
    const { type } = req.params;
    const details = await detailModel.findOne();

    if (!details) {
      return res.status(404).send({ error: "Details not found" });
    }

    let data;
    let contentType;

    switch (type) {
      case 'profileabout':
        data = details.profileabout;
        contentType = 'image/jpeg'; // Assuming it's an image
        break;
      case 'profilehome':
        data = details.profilehome;
        contentType = 'image/jpeg'; // Assuming it's an image
        break;
      case 'cv':
        data = details.cv;
        contentType = 'application/pdf'; // Assuming it's a PDF
        break;
      default:
        return res.status(400).send({ error: "Invalid type" });
    }

    if (!data || !data.data) {
      return res.status(404).send({ error: "Data not found" });
    }

    // Set the Content-Type header correctly
    res.set('Content-Type', contentType);

    // Send the data
    res.send(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching data",
      error,
    });
  }
};


//single detail
// Assuming you have a route set up
export const getDetailsOfSingleController = async (req, res) => {
    try {
      const { type } = req.params;
      const details = await detailModel.findOne();
  
      if (!details) {
        return res.status(404).json({ error: 'Detail not found' });
      }
  
      let data;
  
      switch (type) {
        case 'exp':
          data = details.exp;
          break;
        case 'about':
          data = details.about;
          break;
        case 'aboutHome':
          data = details.abouthome;
          break;
        default:
          return res.status(400).send({ error: "Invalid type" });
      }
  
      if (!data) {
        return res.status(404).send({ error: "Data not found" });
      }
  
      res.status(200).json({ success: true, details: data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error fetching detail', error });
    }
  };
  
  