import { Schema, model } from "mongoose";

const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  score: Number,
});

playerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model("Player", playerSchema);
