import mongoose from "mongoose";
// const userSchema = new mongoose.Schema({
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   roles: [{ type: String, ref: "Role" }],
// }, { versionKey: false });
const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },  
    firstName:{ type: String, required: true },
    lastName: { type: String, required: true },
    roles: [
      {
        type:String,
        ref: "Role",
      },
    ],
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);
export default User;
