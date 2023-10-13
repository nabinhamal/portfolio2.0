import detailModel from "../models/detailModel";
import fs from 'fs';

export const detailController = async (req, res) => {
  try {
    const { name, email, password, exp } = req.body;

    // Validation...
    if (!name || !email || !password || !exp) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const profile = req.files['profile'] ? req.files['profile'][0] : null;
    const cv = req.files['cv'] ? req.files['cv'][0] : null;

    // Check if the user already exists...
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered, please login",
      });
    }

    // Register the user...
    const hashedPassword = await hashPassword(password);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      exp: { dataArray: exp },
    });

    if (profile) {
      user.profile.data = fs.readFileSync(profile.path);
      user.profile.contentType = profile.mimetype;
    }

    if (cv) {
      user.cv.data = fs.readFileSync(cv.path);
      user.cv.contentType = cv.mimetype;
    }

    await user.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};
