import { model, Schema, Document, LeanDocument } from "mongoose";

interface IUserSchema {
  username: string;
  password: string;
  email: string;
  isActive: boolean;
  roles: string;
}

export interface UserDocument extends Document, IUserSchema {}
export type LeanedUserDocument = LeanDocument<UserDocument>;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    roles: {
      type: String,
      enum: ["admin", "manager", "employee"],
      default: "employee",
    },
  },
  { timestamps: true }
);

const User = model<UserDocument>("User", userSchema);
export default User;
