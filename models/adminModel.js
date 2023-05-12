import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export const Admin = mongoose.model("Admin", adminSchema);
