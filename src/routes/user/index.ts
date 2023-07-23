import express, { NextFunction, Request, Response } from 'express';
import validator, { ValidationSource } from '../../helpers/validator';
import user_validation_schema from './payload_validators';
import asyncHandler from '../../helpers/asyncHandler';
import UserRepo from '../../database/repository/user_repository';
import { SuccessResponse } from '../../core/api_response';

const router = express.Router();

// Route to get all users
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const users = await UserRepo.getUsers();
    new SuccessResponse('SUCCESS', [...users]).send(res);
  })
);

// Route to get a user with their hobbies by user_id
router.get(
  '/:user_id/hobbies',
  validator(user_validation_schema.get_user_with_hobbies, ValidationSource.PARAM),
  asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const userWithHobbie = await UserRepo.getUserWithHobbies(req.params.user_id);
    new SuccessResponse('SUCCESS', userWithHobbie).send(res);
  })
);

// Route to create a new user
router.post(
  '/',
  validator(user_validation_schema.create_user_body, ValidationSource.BODY),
  asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const user = await UserRepo.createUser(req.body.name);
    new SuccessResponse('user_created', user).send(res);
  })
);

// Route to delete a user by id
router.delete(
  '/',
  validator(user_validation_schema.delete_user_body, ValidationSource.BODY),
  asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    await UserRepo.deleteUser(req.body.id);
    new SuccessResponse('user_deleted', null).send(res);
  })
);

export default router;
