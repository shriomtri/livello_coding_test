import Joi from '@hapi/joi';
import { EHobbiePassion } from '../../database/enum';

export default {
  // Validation schema for POST '/'
  create_hobbie_body: Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    passion_lvl: Joi.string().valid(...[
      EHobbiePassion.LOW,
      EHobbiePassion.MEDIUM,
      EHobbiePassion.HIGH,
      EHobbiePassion.VERY_HIGH,
    ]),
  }),

  // Validation schema for POST '/'
  create_hobbie_param: Joi.object().keys({
    user_id: Joi.string().required(),
  }),

  // Validation schema for DELETE '/'
  delete_hobbie_body: Joi.object().keys({
    user_id: Joi.string().required(),
    hobbie_id: Joi.string().required(),
  }),
};
