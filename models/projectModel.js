// projectModel.js

import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  pname:{
type:String,
required:true,
unique: true,
  },
  ptitle: {
    type: String,
    required: true,
  },
  gitUrl: {
    type: String,
    required: true,
  },
  pimage: {
    data: Buffer,
    contentType: String,
  },
}, { timestamps: true });

export default mongoose.model('projects', projectSchema);
