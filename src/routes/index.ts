import * as userRouter from "./userRoute";
import { default as notesRoute } from "./notesRoute";

const prefix = "/v1";

export default (app) => {
  app.use(`${prefix}/user`, userRouter.default);
  app.use(`${prefix}/note`, notesRoute);
};
