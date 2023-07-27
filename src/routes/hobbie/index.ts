import express, { NextFunction, Request, Response } from 'express';
import validator, { ValidationSource } from '../../helpers/validator';
import hobbie_validation_schema from './payload_validators';
import asyncHandler from '../../helpers/asyncHandler';
import UserRepo from '../../database/repository/user_repository';
import HobbieRepo from '../../database/repository/hobbie_repository';
import { SuccessResponse } from '../../core/api_response';

const router = express.Router();

// Route to create a new hobbie and associate it with a user
router.post(
  '/:user_id',
  validator(hobbie_validation_schema.create_hobbie_body, ValidationSource.BODY),
  validator(hobbie_validation_schema.create_hobbie_param, ValidationSource.PARAM),
  asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    // Create the new hobbie
    const hobbie = await HobbieRepo.createHobbie(req.body.name, req.body.passion_lvl);

    // Associate the hobbie with the user using user_id
    await UserRepo.pushHobbie(req.params.user_id, hobbie.id);

    // Send a success response with no data
    new SuccessResponse('hobbie_created', null).send(res);
  })
);

// Route to delete a hobbie and remove it from the associated user
router.delete(
  '/',
  validator(hobbie_validation_schema.delete_hobbie_body, ValidationSource.BODY),
  asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    // Delete the hobbie
    await HobbieRepo.deleteHobbie(req.body.hobbie_id);

    // Remove the hobbie from the associated user using user_id and hobbie_id
    await UserRepo.deleteUserHobbie(req.body.user_id, req.body.hobbie_id);

    // Send a success response with no data
    new SuccessResponse('hobbie_deleted', null).send(res);
  })
);

export default router;
