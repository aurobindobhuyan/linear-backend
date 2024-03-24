import * as userRouter from "./userRoute";
import { default as notesRoute } from "./notesRoute";
import { default as apiRoute } from "./authRouter";

const prefix = "/v1";

export default (app) => {
  app.use(`${prefix}/user`, userRouter.default);
  app.use(`${prefix}/note`, notesRoute);
  app.use(`${prefix}/auth`, apiRoute);
};
