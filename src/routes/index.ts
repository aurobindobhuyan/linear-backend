import * as userRouter from "./userRoute";

const prefix = "/v1";

export default (app) => {
  app.use(`${prefix}/user`, userRouter);
};
