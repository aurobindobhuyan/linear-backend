import { Request, Response } from "express";
import { asyncErrorHandler } from "../../utils/helper/errorHandlers";
import * as services from "./services";

// @desc Get all notes
// @route GET /notes
// @access Private
export const getAllNotes = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const note = await services.getAllNotes();
    return res.json(note);
  }
);

// @desc Create new note
// @route POST /notes
// @access Private
export const createNote = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { createdUserId, title, body } = req.body;

    const note = await services.createNote({ createdUserId, title, body });
    return res.json(note);
  }
);

// @desc Get one note
// @route GET /:noteId
// @access Private
export const getOneNote = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { noteId: id } = req.params;

    const result = await services.getOneNote({ id });
    return res.json(result);
  }
);

// @desc Edit new notes
// @route PUT /:noteId
// @access Private
export const updateNote = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { noteId: id } = req.params;
    const { body, completed } = req.body;

    const result = await services.updateNote({ id, completed, body });
    return res.json(result);
  }
);

// @desc Assign new user to a note
// @route PATCH /:notesId
// @access Private
export const assignUser = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { noteId: id } = req.params;
    const { kind } = req.query;
    const { userId } = req.body;

    const result = await services.assignUser({ id, kind, userId });
    return res.json(result);
  }
);

// @desc Delete the note
// @route DELETE /:notesId
// @access Private
export const deleteNote = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { noteId } = req.params;

    const result = await services.deleteNote({ id: noteId });
    return res.json(result);
  }
);
