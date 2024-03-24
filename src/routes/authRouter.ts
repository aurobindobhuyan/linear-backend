import express from "express";

import * as auth from "../controllers/auth/authController";

const router = express.Router();

router.route("/").post(auth.login);

router.route("/refresh").get(auth.refresh);

router.route("/logout").post(auth.logout);

export default router;
