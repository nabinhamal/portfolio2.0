import mongoose from "mongoose";

const detailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  about: {
    type: String,
    require: true,
  },  
  abouthome: {
    type: String,
    require: true,
  }, 
  exp: [{
    type: String,
  }],
  profileabout: {
    data: Buffer,       
    contentType: String 
  },
  profilehome: {
    data: Buffer,       
    contentType: String 
  },
  cv: {
    data: Buffer,       
    contentType: String
  },
  username: {
    type: String,
   
  },

},
 { timestamps: true });
export default mongoose.model("details", detailSchema);