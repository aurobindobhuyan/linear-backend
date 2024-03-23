import express from "express";
import * as notes from "../controllers/notes/notesController";
import * as validator from "../controllers/notes/notesValidator";
import verifyJWT from "../controllers/verifyJWT";

const router = express.Router();

router
  .route("/")
  .get(verifyJWT, notes.getAllNotes)
  .post(validator.createNote, notes.createNote);

router
  .route("/:noteId")
  .get(validator.getOneNote, verifyJWT, notes.getOneNote)
  .put(validator.updateNote, notes.updateNote)
  .patch(validator.assignUser, notes.assignUser)
  .delete(validator.deleteNote, notes.deleteNote);

export default router;
