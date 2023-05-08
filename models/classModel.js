import mongoose from "mongoose";

const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  category: { type: Array },
  students: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

export default mongoose.model("Class", classSchema);
