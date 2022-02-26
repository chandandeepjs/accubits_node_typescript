import * as Joi from 'joi';
export const UserValidation = Joi.object({
   firstname: Joi.string().lowercase().trim().required(),
   lastname: Joi.string().lowercase().trim().required(),
   email: Joi.string().trim().required(),
   age: Joi.number(),
  
});

