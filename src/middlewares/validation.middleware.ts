import { RESPONSES, RES_MSG } from '../constant/response';
import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

export default function validateBody(schema: Schema) {
   return (request: Request, response: Response, next: NextFunction): void => {
      try {
         //   Validating User data
         const { error } = schema.validate(request.body);
         // Throwing error if failed to validate user
         if (error) {
            const errors = error.details.map((data) => ({
               message: data.message,
               name: data.context.label,
            }));
            response.status(RESPONSES.INVALID_REQUEST).json({
               response: {
                  status: RESPONSES.INVALID_REQUEST,
                  message: RES_MSG.VALIDATION.ERROR,
                  error: false,
                  data: errors,
               },
            });
         } else {
            next();
         }
      } catch (err) {
         console.log('Validation error', err);
         response.status(RESPONSES.INVALID_REQUEST).json({
            response: {
               status: RESPONSES.INVALID_REQUEST,
               message: RES_MSG.VALIDATION.ERROR,
               error: true,
               data: [
                  {
                     name: 'Validation error',
                     message: RES_MSG.VALIDATION.ERROR,
                  },
               ],
            },
         });
      }
   };
}
