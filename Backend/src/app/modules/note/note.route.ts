import express from "express";
import { authVerify } from "../../middlewares/authVerify";
import { ENUM_ROLE } from "../user/user.interface";
import { NoteController } from "./note.controller";

const router = express.Router();
router.post("/addNote", authVerify(ENUM_ROLE.USER), NoteController.createNote);
router.get("/notes", authVerify(ENUM_ROLE.USER), NoteController.getNotes);
router.get("/note/:noteId", authVerify(ENUM_ROLE.USER), NoteController.getNote);
router.patch(
  "/editNote/:noteId",
  authVerify(ENUM_ROLE.USER),
  NoteController.updateNote
);
router.delete(
  "/deleteNote/:noteId",
  authVerify(ENUM_ROLE.USER),
  NoteController.deleteNote
);
//   router.get('/user/:id', UserController.getUser),
//   router.patch('/user/:id', UserController.updateUser)
export const NoteRoute = router;
