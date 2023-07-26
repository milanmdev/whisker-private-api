import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { HttpError } from "./utils/utils";

import controllers from "./controllers";
const app = express();

/* Launch */
app.listen(8080, () =>
  console.log(
    `[LAUNCHED] Whisker Private API launched at http://localhost:8080`
  )
);

/* Middlewares */
app.use(express.json());
app.use(cors());
app.use(controllers);

app.use((err: any, _req: Request, res: Response, _next: Function) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      error: true,
      message: err.errMessage,
      code: err.statusCode,
    });
  } else {
    res.status(500).json({
      error: true,
      message: err.message || "5xx server error",
      code: 500,
    });
  }
});

export default app;
