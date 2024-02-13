import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import { UserRoute } from "./app/modules/user/user.route";
import { NoteRoute } from "./app/modules/note/note.route";

const corsOptions = {
  origin: [
    "exp://192.168.0.106:8081",
    "https://sky-mart-frontend.vercel.app",
    "https://sky-mart-frontend.vercel.app/",
  ],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(cookieParser());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Applications route
app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: " Our server is Running 🚀" });
});
app.use("/api/v1", UserRoute);
app.use("/api/v1", NoteRoute);
// app.use('/api', AuthRoute)
//Testing Route
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error log')
// })

//  global error handling || next => Error 4 parameter ||
app.use(globalErrorHandler);

// route not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    messase: "Not Found",
    errorMessage: [
      {
        path: req.originalUrl,
        message: "API NOT FOUND!",
      },
    ],
  });
  next();
});

export default app;
