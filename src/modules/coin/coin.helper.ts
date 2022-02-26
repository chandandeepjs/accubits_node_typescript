import { IRequestResponse } from '@interfaces';
import {
   RES_MSG,
   REDIS_OPERATION_KEYS,
   SMALLEST_UNITS,
} from '../../constant/response';
import { RedisHelper as redis } from '../../helpers';
import UtilitiesHelper from '../../helpers/common/utilities.helper';
import { ICoinPayload, ICoinReturn } from './coin.interface';
import { Coin, CoinInstance } from '../../model/coin.model';
import { uploadS3 } from '../../helpers/common/file_upload';


class CoinHelper {
   /**
    * Add coin to add with bitgo wallet
    * @param data
    */
   coinDataAdd(data: ICoinPayload): Promise<IRequestResponse<ICoinReturn>> {
      return new Promise(async (resolve) => {
        

         try {

           
            Coin.create(data, {}).then(async (res:any) => {
               if (res) {
                  await redis.destroyDb(REDIS_OPERATION_KEYS.COIN_LIST);
                  resolve({
                     error: false,
                     message: "RES_MSG.COIN_ADD.SUCCESS",
                     data: res.toJSON() as ICoinReturn,
                  });
               } else {
                  throw "RES_MSG.COIN_ADD.ERROR"
               }
            });
          
         } catch (err) {
            console.log(err, 'err errr');
            resolve({ error: true, message: err });
         }
      });
   }

  
   
   

   

}

export default new CoinHelper();
