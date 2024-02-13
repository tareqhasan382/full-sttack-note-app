/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { INote } from "./note.interface";
import NoteModel from "./note.model";

const createNote = async (payload: INote): Promise<INote | null> => {
  // console.log("Data service:", payload);
  const createdUser = await NoteModel.create(payload);
  // jodi user create na hoy
  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Field to create Gellery!");
  }
  return createdUser;
};

const getNotes = async (userId: string): Promise<INote[] | null> => {
  // console.log('payload:', userId)
  const result = await NoteModel.find({ userId: userId });
  // console.log("result:", result);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Field to retrive Notes!");
  }
  return result;
};
const getNote = async (noteId: string): Promise<INote | null> => {
  const result = await NoteModel.findById({ _id: noteId });
  // console.log("result:", result);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Field to retrive Notes!");
  }
  return result;
};

const updateNote = async (
  id: any,
  payload: Partial<INote>
): Promise<INote | null> => {
  try {
    const updatedUser: any = await NoteModel.updateOne({ _id: id }, payload, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    // console.error("Error updating user:", error);
    return null;
  }
};
const deleteNote = async (noteId: string): Promise<INote | null> => {
  // console.log("payload:", payload);
  try {
    const response: any = await NoteModel.deleteOne({ _id: noteId });
    return response;
  } catch (error) {
    console.error("Error delete user:", error);
    return null;
  }
};
export const NoteService = {
  createNote,
  updateNote,
  getNote,
  getNotes,
  deleteNote,
};
