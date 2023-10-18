import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },

    pimage:[{
        data: Buffer,       
        contentType: String 
      }],
    
},{ timestamps: true });

export default mongoose.model("projectsImage", projectSchema);
