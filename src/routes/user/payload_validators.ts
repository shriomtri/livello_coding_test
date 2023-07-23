import Joi from '@hapi/joi';
import {JoiAuthBearer} from '../../helpers/validator';

export default {
    create_user_body: Joi.object()
        .keys({
            name: Joi.string().alphanum().min(3).max(30).required()
        }),
    delete_user_body: Joi.object()
        .keys({
            id: Joi.string().required()
        }),
    get_user_with_hobbies: Joi.object()
        .keys({
            user_id: Joi.string().required()
        })

};
