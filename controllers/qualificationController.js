import userModel from '../models/userModel.js';
import qualificationModel from '../models/qualificationModel.js';

// Create a new qualification record
export const createQualificationController = async (req, res) => {
  try {
    const { user, education, skills } = req.body;
      // Validation...
      if (!user || !education || !skills) {
        return res.status(400).send({ error: "All fields are required" });
    }

    const existingUser = await userModel.findById(user);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const records = new qualificationModel({
      user,
      education,
      skills,
    });

   await records.save();

    res.status(201).send({
      success: true,
      message: "records saved successfully",
      records,
    });
  } catch (error) {
    console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in records",
            error,
        });
  }
};

// Get a list of all qualification records
export const getAllQualificationsController = async (req, res) => {
  try {
    const records = await qualificationModel.find({});
    if (!records ) {
      return res.status(404).send({ error: "Records not found" });
  }
  res.status(200).send({
    success: true,
    records ,
});
} catch (error) {
console.error(error);
res.status(500).send({
    success: false,
    message: "Error fetching records",
    error,
});
}
};



// Update a qualification record by ID
export const updateQualificationController = async (req, res) => {
  try {
    const { _id } = req.params;
    const { education, skills } = req.body;
  

    // Find the existing records
    const records  = await qualificationModel.findById(_id);

    if (!records ) {
        return res.status(404).send({ error: "Records not found" });
    }

    // Update fields
    
    records .skills = skills;
    records .education = education;

    await records.save();

    res.status(200).send({
        success: true,
        message: "Records updated successfully",
        records ,
    });
} catch (error) {
    console.error(error);
    res.status(500).send({
        success: false,
        message: "Error updating records",
        error,
    });
}
};

// Get a specific qualification record by ID
export const getQualificationByIdController = async (req, res) => {
  try {
    const records = await qualificationModel.findById(req.params.id);
    if (!records ) {
      return res.status(404).json({ message: "records  not found" });
    }
    res.json(records );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a qualification record by ID
export const deleteQualificationController = async (req, res) => {
  try {
    const records  = await qualificationModel.findById(req.params.id);

    if (!records ) {
      return res.status(404).json({ message: "records  not found" });
    }

    await records.remove();

    res.json({ message: "records  deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


