import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";


export const regController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation...
    if (!email || !password) {
      return res.status(400).send({ error: "All fields are required" });
    }

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
      
      email,
      password: hashedPassword,
    
    });

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


export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Compare passwords
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password",
      });
    }

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};





export const getUserController = async (req, res) => {
  try {
    const { _id } = req.params;
    
    // Check if the user with the provided ID exists...
    const user = await userModel.findById(_id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const { email } = user;

    res.status(200).send({
      success: true,
      user: {email},
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving user information",
      error,
    });
  }
};
;



export const updateController = async (req, res) => {
  try {
    const { _id } = req.params;
    const { email, password } = req.body;

    // Check if the user with the provided ID exists...
    const user = await userModel.findById(_id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Update user information
    user.email = email;
    user.password = await hashPassword(password); // You might want to add additional checks for password updates

    await user.save();

    res.status(200).send({
      success: true,
      message: "User information updated successfully",
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in updating user information",
      error,
    });
  }
};

export const deleteController = async (req, res) => {
  try {
    const { _id } = req.params;

    // Check if the user with the provided ID exists...
    const user = await userModel.findById(_id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Delete user
    await userModel.findByIdAndDelete(_id);

    res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting user",
      error,
    });
  }
};
