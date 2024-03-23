import { Schema, model } from "mongoose";

interface ICollection {
  noteId: Schema.Types.ObjectId;
  counter: number;
}

const counterSchema = new Schema<ICollection>(
  {
    noteId: {
      type: Schema.Types.ObjectId,
      ref: "Notes",
      required: true,
    },
    counter: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: false }
);

const Counter = model<ICollection>("Counter", counterSchema);

export default Counter;
