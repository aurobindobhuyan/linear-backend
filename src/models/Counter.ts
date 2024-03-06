import { Types, Schema, model, Document, LeanDocument } from "mongoose";

interface ICollection {
   noteId: Types.ObjectId;
   counter: number;
}

export interface CollectionModel extends Document, ICollection { };
export type LeanedCollectionDocument = LeanDocument<CollectionModel>;

const counterSchema = new Schema({
   noteId: {
      type: Types.ObjectId,
      ref: "Notes",
      required: true,
   },
   counter: {
      type: Number,
      default: 100,
   },
}, { timestamps: false });

const Counter = model<CollectionModel>("Counter", counterSchema);

export default Counter;
