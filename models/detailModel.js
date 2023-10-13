import mongoose from "mongoose";

const detailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  about: {
    content: String,
    image: String,
  },
  sectionDesc: {
    education: [
      {
        field: String,
        degree: String,
      }
    ],
    skills: [
      {
        name: String,
        percentage: Number,
        color: String,
      }
    ],
  },
  exp: {
    dataArray: {
      type: [String],
      required: true,
    },
  },
  profileabout: {
    data: Buffer,       // Store binary data (the image)
    contentType: String // Store the content type (e.g., 'image/jpeg')
  },
  profilehome: {
    data: Buffer,       // Store binary data (the image)
    contentType: String // Store the content type (e.g., 'image/jpeg')
  },
  cv: {
    data: Buffer,       // Store binary data (the image)
    contentType: String
  },
  name: {
    type: String,
    required: true,
  },

}, { timestamps: true });

export default mongoose.model("details", detailSchema);
