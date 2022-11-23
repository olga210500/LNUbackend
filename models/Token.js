import mongoose from "mongoose";
const tokenSchema = new mongoose.Schema({
  user:{type: mongoose.Schema.Types.ObjectId,ref:"User"},
  refreshToken: { type: String, required: true },
}, { versionKey: false });


const Token = mongoose.model("Token", tokenSchema);
export default Token;
