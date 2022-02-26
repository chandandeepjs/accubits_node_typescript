import * as Interfaces from '@interfaces';
import * as express from 'express';
import * as Helpers from '../../helpers';
import * as Middlewares from '../../middlewares';
import CoinHelper from './coin.helper';
import {
   CoinValidation,
   UpdateCoinValidation,
   UpdateStatusCoinValidation,
} from './coin.validation';
 import {upload} from '../../helpers/common/file_upload'
const setResponse = Helpers.ResponseHelper;

class AdminCoinController implements Interfaces.Controller {
   public path = '/admin';

   public router = express.Router();

   constructor() {
      this.initializeRoutes();
   }
   private initializeRoutes() {
      this.router
       .all(`${this.path}/*`, Middlewares.adminValidateToken)
         .post(
         `${this.path}/coin`, // upload.single('image'),
          Middlewares.validationMiddleware(CoinValidation),
           this.createCoin
         )
         
   }

   private createCoin = async (
      request: express.Request,
      response: express.Response
   ) => {
     
      const res = await CoinHelper.coinDataAdd(request.body);
      return setResponse.responseHandler(response, res)
   };

  
}

export default AdminCoinController;
