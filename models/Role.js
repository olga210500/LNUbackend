import mongoose from "mongoose";
const roleSchema = mongoose.Schema({
  value: { type: String, unique: true, default: "USER" },
}, { versionKey: false });
const Role = mongoose.model("Role", roleSchema);
export default Role;
