import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    require: true,
  },
pname:[{
    ptitle:{
        type: String,
        required: true,
       
      },
      imgSrc:{
        data: Buffer,       
        contentType: String 
      },
      gitUrl:{
        type: String
      },
    }],
},{ timestamps: true });

export default mongoose.model("projects", projectSchema);
