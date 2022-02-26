import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import {
   MIDDLEWARE_RESPONSE,
   RESPONSES,
   ENV_VARIABLE,
} from '../constant/response';
import { IRequestUser } from './jwt.middleware';

declare module 'express' {
   interface Request {
      userInfo: IRequestUser;
   }
}

// eslint-disable-next-line max-lines-per-function
function adminValidateToken(
   request: Request,
   response: Response,
   next: NextFunction
): Response | void {
   // const { redisUserTokenDb } =ENV_VARIABLE;

   const token =
      request.body.accessToken ||
      request.query.accessToken ||
      request.headers['api-access-token'];

   jwt.verify(
      token,
      ENV_VARIABLE.JWTADMINSECRET,
      (
         err: jwt.VerifyErrors,
         decoded: {
            email: string;
            adminId: string;
            role: string;
            accessRole: number;
         }
      ) => {
         if (err) {
            return response.status(RESPONSES.UN_AUTHORIZED).json({
               response: {
                  status: RESPONSES.UN_AUTHORIZED,
                  message: err.message,
                  data: [
                     {
                        name: 'Jwt error',
                        message: MIDDLEWARE_RESPONSE.JWTERROR,
                     },
                  ],

                  error: true,
               },
            });
         }

         try {
            // if (
            //    +decoded.accessRole !== 0 &&
            //    +decoded.accessRole !== 1 &&
            //    +decoded.accessRole !== 2
            // ) {
            //    return setResponse.error(
            //       response,
            //       MIDDLEWARE_RESPONSE.PERMISSION_DENIED
            //    );
            // }
            // const exist = await Helpers.RedisHelper.getString(
            //    'jwt_token_' + decoded.adminId
            // );

            //  if (exist) {

            request.userInfo = {
               jwtData: decoded.adminId,
               email: decoded.email,
            };

            next();
            // } else {
            //    return setResponse.error(response, MIDDLEWARE_RESPONSE.JWTERROR);
            // }
         } catch (error) {
            console.log('Admin jwt error', error);

            return response.status(RESPONSES.UN_AUTHORIZED).json({
               response: {
                  status: RESPONSES.UN_AUTHORIZED,
                  message: MIDDLEWARE_RESPONSE.JWTERROR,
                  error: true,
                  data: [
                     {
                        name: 'Jwt error',
                        message: MIDDLEWARE_RESPONSE.JWTERROR,
                     },
                  ],
               },
            });
         }
      }
   );
}

export default adminValidateToken;
