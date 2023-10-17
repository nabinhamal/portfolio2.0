import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  education: [
    {
      degree: String,
      school: String,
      year: String,
    }
  ],
  skills: [
    {
      skill: String,
      pre: String,
      color: String
    }
  ],
});

export default mongoose.model("qualification", qualificationSchema);
