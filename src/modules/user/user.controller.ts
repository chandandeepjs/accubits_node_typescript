import * as Interfaces from '@interfaces';
import * as express from 'express';
import * as Helpers from '../../helpers';
import * as Middlewares from '../../middlewares';
import UserHelper from './user.helper';
import {
   UserValidation,
} from './user.validation';
 import {upload} from '../../helpers/common/file_upload'
const setResponse = Helpers.ResponseHelper;

class AdminCoinController implements Interfaces.Controller {
   public path = '/api';

   public router = express.Router();

   constructor() {
      this.initializeRoutes();
   }
   private initializeRoutes() {
      this.router
       .all(`${this.path}/*`)
         .post(
         `${this.path}/user`, // upload.single('image'),
          Middlewares.validationMiddleware(UserValidation),
           this.createUser
         )
         
   }

   private createUser = async (
      request: express.Request,
      response: express.Response
   ) => {
     
      const res = await UserHelper.addUser(request.body);
      return setResponse.responseHandler(response, res)
   };

  
}

export default AdminCoinController;
