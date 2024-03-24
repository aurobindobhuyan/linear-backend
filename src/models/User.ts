import { HydratedDocument, model, Schema } from "mongoose";

interface IUserSchema {
  username: string;
  password: string;
  email: string;
  isActive: boolean;
  roles: string;
}

const userSchema = new Schema<IUserSchema>(
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

const User = model<IUserSchema>("User", userSchema);

export type HydratedUserDocument = HydratedDocument<IUserSchema>;

export default User;
