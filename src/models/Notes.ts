import { model, Schema } from "mongoose";

interface INotesSchema {
  title: string;
  body: string;
  completed: boolean;
  createdUserId: Schema.Types.ObjectId;
  assignedUser: Schema.Types.ObjectId[];
  ticket: number;
}

const notesSchema = new Schema<INotesSchema>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedUser: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    ticket: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Notes = model<INotesSchema>("Notes", notesSchema);
export default Notes;
