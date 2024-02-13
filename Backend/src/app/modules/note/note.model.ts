import { Schema, model } from "mongoose";
import { INote, INoteModel } from "./note.interface";

const noteSchema = new Schema<INote>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    note: { type: String, required: true },
  },
  { timestamps: true }
);

const NoteModel = model<INote, INoteModel>("Notes", noteSchema);

export default NoteModel;
