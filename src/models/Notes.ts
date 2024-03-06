import { model, Schema, Document, Types, LeanDocument } from "mongoose";

interface INotesSchema {
   title: string,
   body: string,
   completed: boolean,
   createdUserId: Types.ObjectId,
   assignedUser: Types.ObjectId[],
   ticket: number,
}

export interface NotesModel extends Document, INotesSchema { };
export type LeanedNotesDocument = LeanDocument<NotesModel>;

const notesSchema = new Schema({
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
      type: Types.ObjectId,
      ref: "User",
      required: true,
   },
   assignedUser: [{
      type: Types.ObjectId,
      ref: "User",
   }],
   ticket: {
      type: Number,
   }
}, { timestamps: true });

const Notes = model<NotesModel>("Notes", notesSchema);
export default Notes;
