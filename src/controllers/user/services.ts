import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../../models/User";
import Notes from "../../models/Notes";

import { OperationalError } from "../../utils/helper/errorInstances";

export const getAllUser = async () => {
  const users = await User.find().select("-password").lean();

  if (!users) throw new OperationalError(404, "Users not found");

  return { status: "success", data: users };
};

export const listAll = async ({ page, limit }) => {
  const skip = (page - 1) * limit;

  const count = await User.countDocuments();

  if (skip >= count) {
    throw new OperationalError(404, "Page not found");
  }

  const users = await User.find().skip(skip).limit(limit).lean().exec();

  // const [users, count] = await Promise.all([
  //   User.find().skip(skip).limit(limit).lean().exec(),
  //   User.countDocuments(),
  // ]);

  return { status: "success", data: { users, count } };
};

export const getOneUser = async ({ id }) => {
  const user = await User.findById(id).select("-password").lean().exec();

  if (!user) throw new OperationalError(404, "User not found with id: " + id);
  return { status: "success", data: user };
};

export const createUser = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const userObject = { username, email, password: hashedPassword };
  const user = await User.create(userObject);

  const { _id, isActive, roles } = user;
  return {
    status: "success",
    data: {
      username: user.username,
      email: user.email,
      ...{ _id, isActive, roles },
    },
  };
};

export const updateUser = async ({ id, username, roles, active: isActive }) => {
  const data = await User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        username,
        roles,
        isActive,
      },
    },
    { new: true, upsert: true, runValidators: true }
  )
    .select("-password")
    .exec();
  if (!data) {
    throw new OperationalError(undefined, "Error updating user");
  }

  return { status: "success", data };
};

export const deleteUser = async ({ id }) => {
  const session = await mongoose.startSession();

  const asignedNotes = await Notes.find({ assignedUser: id }).session(session);

  if (asignedNotes.length > 0) {
    await Notes.updateMany(
      { assignedUser: id },
      {
        $pull: {
          assignedUser: id,
        },
      }
    ).session(session);
  }

  const deletedUser = await User.findOneAndDelete(
    { _id: id },
    { new: true, runValidators: true }
  )
    .select("-password")
    .session(session)
    .exec();

  if (!deletedUser)
    throw new OperationalError(undefined, "User not found with id: " + id);

  session.endSession();
  return { status: "success", data: deletedUser };
};
