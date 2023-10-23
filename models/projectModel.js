import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },

  pdetail: [
    {
      ptitle: [String],
      gitUrl: [String],
      pimage: {
        data: Buffer,       
        contentType: String 
      },
    }]
},{ timestamps: true });

export default mongoose.model("projects", projectSchema);
