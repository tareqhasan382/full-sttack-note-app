import { Model, Types } from "mongoose";

export type INote = {
  _id?: string;
  title: string;
  note: string;
  userId: Types.ObjectId;
};
export type INoteModel = Model<INote, Record<string, unknown>>;
