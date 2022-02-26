import { NextFunction, Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';
import {
   MIDDLEWARE_RESPONSE,
   RESPONSES,
   ENV_VARIABLE,
} from '../constant/response';

//import { RedisHelper } from '../helpers';

export interface IRequestUser {
   jwtData?: string;
   jwtToken?: string;
   email?: string;
}

declare module 'express' {
   interface Request {
      userInfo: IRequestUser;
      jwtToken: string;
   }
}

function validateToken(
   request: Request,
   response: Response,
   next: NextFunction
): void {
   const token =
      request.body.accessToken ||
      request.query.accessToken ||
      request.headers['api-access-token'];

   jwt.verify(
      token,
      ENV_VARIABLE.JWTSECRET,
      (err: jwt.VerifyErrors, decoded: { jwtData: string }) => {
         if (err) {
            return response.status(RESPONSES.UN_AUTHORIZED).json({
               message: err.message,
               error: true,
               data: [
                  {
                     name: 'Jwt error',
                     message: MIDDLEWARE_RESPONSE.JWTERROR,
                  },
               ],
            });
         }
         try {
            // const exist = await RedisHelper.getString(
            //    'jwt_token_' + decoded.jwtData
            // );

            //console.log(token, decoded);

            // check if token exist or not
            // if (exist !== null) {
            request.userInfo = { jwtData: decoded.jwtData, jwtToken: token };
            next();
            // } else {
            //    return response
            //       .status(RESPONSES.UN_AUTHORIZED)
            //       .send(MIDDLEWARE_RESPONSE.JWTERROR);
            // }
         } catch (error) {
            console.log('Jwt error', error);

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

export default validateToken;
