import express from 'express';
import * as controllers from "../controllers/user/userController"
import * as validator from "../controllers/user/validator";
import verifyJWT from '../controllers/verifyJWT';

const router = express.Router();

router
   .route("/")
   // .get(verifyJWT, controllers.getAllUser)
   .get(verifyJWT, controllers.listAll)
   .post(validator.createUser, controllers.createUser);

router
   .route("/:userId")
   .get(validator.getOneUser, controllers.getOneUser)
   .patch(validator.updateUser, controllers.updateUser)
   .delete(validator.getOneUser, controllers.deleteUser)

export default router;
