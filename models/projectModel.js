import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    require: true,
  },

    ptitle:[{
        type: String,
        required: true,
       
      }],

      gitUrl:[{
        type: String
      
    }],
},{ timestamps: true });

export default mongoose.model("projects", projectSchema);
