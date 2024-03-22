import { Request, Response, NextFunction } from "express";

import Joi from "joi";
import JoiObjectId from "joi-objectid";

import { ValidationFailed } from "../../utils/helper/errorInstances";

const JoiMongoObjectId = JoiObjectId(Joi);

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object()
    .keys({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
    .unknown(true);

  const { error } = schema.validate(req.body);
  if (error) {
    throw new ValidationFailed(
      undefined,
      `Kindly check your body. ${error.details[0].message}`
    );
  }
  next();
};

export const getOneUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    userId: JoiMongoObjectId().required(),
  });

  const { error } = schema.validate(req.params);
  if (error)
    throw new ValidationFailed(
      undefined,
      `Kindly check your parameters. ${error.details[0].message}`
    );
  next();
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const paramSchema = Joi.object().keys({
    userId: JoiMongoObjectId().required(),
  });
  const bodySchema = Joi.object().keys({
    username: Joi.string(),
    roles: Joi.string(),
    active: Joi.boolean(),
  });

  const { error: paramError } = paramSchema.validate(req.params);
  const { error: bodyError } = bodySchema.validate(req.body);

  if (paramError) {
    throw new ValidationFailed(
      undefined,
      `Check your parameter. ${paramError?.details[0]?.message}`
    );
  }
  if (bodyError) {
    throw new ValidationFailed(
      undefined,
      `Check your body. ${bodyError?.details[0]?.message}`
    );
  }
  next();
};

export const assignUser = (req: Request, res: Response, next: NextFunction) => {
  const paramSchema = Joi.object().keys({
    noteId: JoiMongoObjectId().required(),
  });
  const querySchema = Joi.object().keys({
    kind: Joi.string().valid("assignUser", "removeUser").required(),
  });
  const bodySchema = Joi.object().keys({
    userId: JoiMongoObjectId().required(),
  });

  const { error: paramError } = paramSchema.validate(req.params);
  const { error: queryError } = querySchema.validate(req.query);
  const { error: bodyError } = bodySchema.validate(req.body);

  if (paramError) {
    throw new ValidationFailed(
      undefined,
      `Check your parameter. ${paramError?.details[0]?.message}`
    );
  }
  if (queryError) {
    throw new ValidationFailed(
      undefined,
      `Check your query parameter. ${queryError?.details[0]?.message}`
    );
  }
  if (bodyError) {
    throw new ValidationFailed(
      undefined,
      `Check your body. ${bodyError?.details[0]?.message}`
    );
  }

  next();
};

export const deleteNote = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    noteId: JoiMongoObjectId().required(),
  });

  const { error } = schema.validate(req.params);
  if (error) {
    throw new ValidationFailed(undefined, error.details[0]?.message);
  }
  next();
};
