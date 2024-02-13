/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { NoteService } from "./note.service";
import { INote } from "./note.interface";

const createNote = catchAsync(async (req: Request, res: Response) => {
  if (req.user) {
    const { userId } = req.user;
    const data = req.body;
    const noteData = {
      userId: userId,
      title: data.title,
      note: data.note,
    };
    const result = await NoteService.createNote(noteData);

    return res.status(200).json({
      status: "true",
      message: "Note Created successfully",
      data: result,
    });
  }
});
const getNotes = catchAsync(async (req: Request, res: Response) => {
  // const id = req.params
  console.log("Test");
  try {
    if (req.user) {
      const { userId } = req.user;
      //  console.log("userId:", userId);
      const result = await NoteService.getNotes(userId);

      return res.status(200).json({
        status: "true",
        message: "Note retrive successfully",
        data: result,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "false",
      message: "Something went to wrong",
      data: error,
    });
  }
});
const getNote = catchAsync(async (req: Request, res: Response) => {
  // const id = req.params
  try {
    const noteId = req.params.noteId;
    // console.log("noteId:", noteId);
    const result = await NoteService.getNote(noteId);

    return res.status(200).json({
      status: "true",
      message: "Note retrive successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: "false",
      message: "Something went to wrong",
      data: error,
    });
  }
});

const updateNote = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.noteId;
  const payload = req.body;
  // "/editNote/:noteId",
  // console.log("id:", id);
  // console.log("payload:", payload);
  try {
    const updatedUser = await NoteService.updateNote(id, payload);
    if (updatedUser) {
      return res.status(201).json({
        status: "true",
        message: "Note update in successfully!",
        data: updateNote,
      });
    } else {
      return res.status(404).json({
        status: "false",
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Internal Server Error",
    });
  }
});
const deleteNote = catchAsync(async (req: Request, res: Response) => {
  //"/deleteNote/:noteId",
  const noteId: any = req.params.noteId;
  console.log("payload:", noteId);
  const result = await NoteService.deleteNote(noteId);

  return res.status(201).json({
    status: "true",
    message: "Delete successfully!",
    data: result,
  });
});
export const NoteController = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};
