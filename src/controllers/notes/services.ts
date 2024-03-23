import mongoose from "mongoose";

import Notes from "../../models/Notes";
import Counter from "../../models/Counter";

import { generateMongooseId } from "../../utils/helper/generateId";
import {
  ActionFailedError,
  OperationalError,
} from "../../utils/helper/errorInstances";

// @desc Get all notes
// @route GET /notes
// @access Private
export const getAllNotes = async () => {
  const notes = await Notes.find().lean();

  if (!notes) {
    throw new ActionFailedError(400, "Notes not found");
  }
  return { success: "success", data: notes };
};

// @desc Get one note
// @route GET /:noteId
// @access Private
export const getOneNote = async ({ id }) => {
  const note = await Notes.findById(id).lean().exec();

  if (!note) {
    throw new ActionFailedError(400, "Can not find note with id: " + id);
  }
  return note;
};

// @desc Create new note
// @route POST /notes
// @access Private
export const createNote = async ({ createdUserId, body, title }) => {
  const session = await mongoose.startSession();

  const noteId = generateMongooseId();
  const lastCounter = await Counter.find({})
    .sort({ counter: -1 })
    .lean()
    .limit(1)
    .exec();

  // Increment the counter value based on the last counter
  const newCounterValue = lastCounter.length ? lastCounter[0].counter + 1 : 100;

  const newNote = await Notes.create(
    [
      {
        _id: noteId,
        createdUserId,
        body,
        title,
        ticket: newCounterValue,
      },
    ],
    { session }
  );

  // Create a new Counter with the incremented counter value and the manually set noteId
  await Counter.create([{ noteId, counter: newCounterValue }], { session });

  session.endSession();
  return { success: "success", data: newNote };
};

// @desc Edit new notes
// @route PUT /:noteId
// @access Private
export const updateNote = async ({ id, completed, body }) => {
  const updatedNote = await Notes.findByIdAndUpdate(
    id,
    { body, completed },
    { new: true, runValidators: true }
  ).exec();

  if (!updatedNote) {
    throw new OperationalError(400, "Cannot update note with id " + id);
  }

  return { success: "success", data: updatedNote };
};

// @desc Assign new user to a note
// @route PATCH /:notesId
// @access Private
export const assignUser = async ({ id, kind, userId }) => {
  const note = await Notes.findOne({ _id: id }).lean();
  if (!note) {
    throw new OperationalError(403, "Failed to assign a user to the note");
  }

  const check_duplicateUser = note.assignedUser
    .map((ele) => ele.valueOf())
    .includes(userId);

  if (kind === "assignUser") {
    if (check_duplicateUser) {
      throw new OperationalError(403, "User is already assigned to the note.");
    }

    const updatedNote = await Notes.findByIdAndUpdate(
      id,
      { $push: { assignedUser: userId } },
      { new: true, runValidators: true }
    ).exec();

    if (!updatedNote) {
      throw new OperationalError(500, "Something went wrong");
    }
    return { success: "success", data: updatedNote };
  } else if (kind === "removeUser") {
    if (!check_duplicateUser) {
      throw new OperationalError(403, "User is already removed from the note.");
    }
    const updatedNote = await Notes.findByIdAndUpdate(
      id,
      { $pull: { assignedUser: userId } },
      { new: true, runValidators: true }
    ).exec();

    if (!updatedNote) {
      console.log(updatedNote);
      throw new OperationalError(500, "Something went wrong");
    }
    return { success: "success", data: updatedNote };
  }
};

// @desc Delete the note
// @route DELETE /:notesId
// @access Private
export const deleteNote = async ({ id }) => {
  const session = await mongoose.startSession();

  const deletedNote = await Notes.findOneAndDelete(
    { _id: id },
    { new: true, runValidators: true, session }
  ).exec();

  await Counter.findByIdAndDelete(deletedNote._id, { session });

  session.endSession();
  return { success: "success", data: deletedNote };
};
