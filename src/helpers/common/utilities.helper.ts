import * as bcrypt from 'bcrypt';
import { IRequestResponse } from '@interfaces';
import * as BigNumber from 'bignumber.js';
import * as CryptoJS from 'crypto-js';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import * as request from 'request';
import { SMALLEST_UNITS, ENDPOINT ,ENV_VARIABLE} from '../../constant/response';
import RedisHelper from './redis.helper';
import axios from 'axios';

const saltRounds = 10;
export type GenericObject = {
   [key: string]: string | number | Array<string | number | boolean> | boolean;
};

export interface ICurlResponse<T = string> {
   statusCode: number;
   response: T;
}

interface IAdminJwtPayload {
   email: string;
   adminId: string;
   role: string;
   accessRole: number;
}
class UtilitiesHelper {
   /* eslint-disable max-lines-per-function */
   public curlRequest(
      endpoint: string,
      header: GenericObject,
      data: GenericObject = {},
      rType = 'GET'
   ) {
      /* eslint-disable max-lines-per-function */
      return new Promise((resolve, reject) => {
         const options = {
            url: endpoint,
            // tslint:disable-next-line:object-shorthand-properties-first
            data,
            headers: header,
         };

         try {
            if (rType === 'GET') {
               request.get(options, (error, response, body) => {
                  if (error) {
                     reject(error);
                  }
                  const obj = {
                     statusCode: response ? response.statusCode : 0,
                     response: body,
                  };
                  resolve(obj);
               });
            }
            if (rType === 'POST') {
               const sendData = JSON.stringify(data);
               const options1 = {
                  url: endpoint,
                  // tslint:disable-next-line:object-shorthand-properties-first
                  body: sendData,
                  headers: header,
               };
               request.post(options1, (error, response, body) => {
                  if (error) {
                     console.log('post error', error);
                     reject(error);
                  }
                  const obj = {
                     statusCode: response ? response.statusCode : 0,
                     response: body,
                  };
                  resolve(obj);
               });
            }
         } catch (error) {
            console.log('error curl', error);
            reject(error);
         }
      });
   }

   public generateHash(password: string) {
      return new Promise((resolve, reject) => {
         bcrypt.genSalt(saltRounds, (error: Error, salt) => {
            if (error) {
               reject(error);
            } else {
               bcrypt.hash(password, salt, (err: Error, hash) => {
                  // Store hash in your password DB.
                  if (err) {
                     reject(err);
                  } else {
                     const obj = {
                        hashValue: hash,
                        saltValue: salt,
                     };
                     resolve(obj);
                  }
               });
            }
         });
      });
   }

   public async compareEncrption(input: string, hash: string) {
      return await bcrypt.compare(input, hash);
   }

   public generateJwt(jwtData: string) {
      return new Promise((resolve, reject) => {
         try {
            const JWT: string = jwt.sign({ jwtData },ENV_VARIABLE.JWTSECRET, {
               expiresIn: 86400,
            });
            // await RedisHelper.setString('jwt_token_' + jwtData, JWT);
            console.log(`JWT ${JWT}`);
            resolve(JWT);
         } catch (error) {
            console.log('error', error);
            reject(error);
         }
      });
   }

   public async generateToken(id: string) {
      const jwtToken = <string>await this.generateJwt(id);
      await RedisHelper.setString('jwt_token_' + id, jwtToken, 1440, '0');
      return jwtToken;
   }

   public adminGenerateJwt(jwtData: IAdminJwtPayload) {
      return new Promise((resolve, reject) => {
         try {
            const JWT = jwt.sign(jwtData,ENV_VARIABLE.JWTADMINSECRET, {
               expiresIn: 86400,
            });
            // await RedisHelper.setString(
            //    'jwt_token_' + jwtData.adminId,
            //    JWT,
            //    1440,
            //    '0'
            // );
            console.log(`adminJWT ${JWT}`);
            resolve(JWT);
         } catch (error) {
            console.log('error', error);
            reject(error);
         }
      });
   }

   public getDateTime() {
      const currentUTCDate = new Date()
         .toISOString()
         .replace(/T/, ' ')
         .replace(/\..+/, '');
      return currentUTCDate;
   }

   public randomString(length: number): string {
      let result = '';
      const characters =
         'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i += 1) {
         result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
         );
      }
      return result;
   }

   public encryptValue(data: string) {
      // tslint:disable-next-line: max-line-length
      // console.log('CryptoJS.AES.encrypt(data,ENV_VARIABLE.ENCDECRYPTKEY)', CryptoJS.AES.encrypt(data,ENV_VARIABLE.ENCDECRYPTKEY));
      return CryptoJS.AES.encrypt(data,ENV_VARIABLE.ENCDECRYPTKEY);
   }

   // public decryptValue(data: any) {
   //    const bytes = CryptoJS.AES.decrypt(
   //       data.toString(),
   //      ENV_VARIABLE.ENCDECRYPTKEY
   //    );
   //    return bytes.toString(CryptoJS.enc.Utf8);
   // }

   // public async replaceData(teplate: string, replaceData: any) {
   //    let tempData = teplate;
   //    for (const data of replaceData) {
   //       tempData = await tempData.replace(data.key, data.replaceWith);
   //    }
   //    return tempData;
   // }

   // public getWalletHost(coin: any) {
   //    let loansUrl: any = '';
   //    if (coin === 'ltc') {
   //       loansUrl = SERVER.LOANS_LTC;
   //    } else if (coin === 'btc') {
   //       loansUrl = SERVER.LOANS_BTC;
   //    } else if (coin === 'eth') {
   //       loansUrl = SERVER.LOANS_ETH;
   //    } else if (coin === 'bch') {
   //       loansUrl = SERVER.LOANS_BCH;
   //    } else {
   //       loansUrl = SERVER.LOANS_ETH;
   //    }
   //    return loansUrl;
   // }

   public bn_operations(
      firstParams: number | string,
      secondParams: number | string,
      operation: string
   ): string | boolean {
      const a: BigNumber.BigNumber = new BigNumber.default(
         firstParams.toString()
      );
      const b: BigNumber.BigNumber = new BigNumber.default(
         secondParams.toString()
      );
      switch (operation.toLowerCase()) {
         case '-':
            return a.minus(b).toString();
            break;
         case '+':
            return a.plus(b).toString();
            break;
         case '*':
         case 'x':
            return a.multipliedBy(b).toString();
            break;
         case '÷':
         case '/':
            return a.dividedBy(b).toString();
            break;
         case '>=':
            return a.isGreaterThanOrEqualTo(b);
            break;
         case '>':
            return a.isGreaterThan(b);
            break;
         case '<=':
            return a.isLessThanOrEqualTo(b);
            break;
         case '<':
            return a.isLessThan(b);
            break;
         case '%':
            return a.multipliedBy(b).dividedBy(100).toFixed(3).toString();
            break;
         case '==':
            return a.isEqualTo(b);
            break;
         default:
            break;
      }
   }

   public convert_to_bn(value: number) {
      const x = new BigNumber.default(value);
      const y = new BigNumber.default(SMALLEST_UNITS);
      return x.multipliedBy(y).toNumber();
   }

   public devideBySmallest(value: number | string) {
      return this.bn_operations(value, SMALLEST_UNITS, '/');
   }

   public getRandomNumber() {
      return Math.floor(100000 + Math.random() * 900000);
   }

   public isTimeElapsed(time: string, timestamp: string) {
      const relation = moment.utc(timestamp).add(time, 'minutes').fromNow();
      return !(relation.indexOf('ago') === -1);
   }

   public getInternalTxStatus(bitgoTxState: string) {
      switch (bitgoTxState) {
         case 'confirmed':
            return 1;
         case 'failed':
         case 'rejected':
         case 'removed':
            return 2;
         case 'unconfirmed':
         case 'pendingApproval':
         case 'signed':
         default:
            return 0;
      }
   }

   getConvertPrice(
      coin: string,
      fiat: string
   ): Promise<IRequestResponse<string>> {
      // return new Promise((resolve) => {
      // try {
      //    // const options = {
      //    //    uri:
      //    //       ENDPOINT.COIN_MARKET_API +
      //    //       `?ids=${coin}&vs_currencies=${fiat}`,
      //    // }; // CoinGecko create path
      //    // request.get(
      //    //    options,
      //    //    (
      //    //       error: request.Response,
      //    //       response: request.ResponseAsJSON,
      //    //       body: undefined
      //    //    ) => {
      //    //       if (error) {
      //    //          console.log(error, 'Error while get convert price');
      //    //          throw RES_MSG.LOANS_ADD.COIN_CONVERT_ERROR;
      //    //       } else {
      //    //          const convertPrice =
      //    //             typeof body === 'object' ? JSON.parse(body) : null;
      //    //          resolve({
      //    //             error: false,
      //    //             message: RES_MSG.LOANS_ADD.COIN_CONVERT_SUCCESS,
      //    //             data: convertPrice
      //    //                ? convertPrice[`${coin}`][`${fiat}`]
      //    //                : 50000,
      //    //          }); // 5000 static value while demo CoinGecko api dont response
      //    //       }
      //    //    }
      //    // ); // Convert coin into usd by coingecko

      // } catch (error) {
      //    console.log(error, 'Error while convert coin price');
      //    resolve({
      //       error: true,
      //       message: RES_MSG.LOANS_ADD.COIN_CONVERT_ERROR,
      //    });
      // }
      return new Promise((resolve) => {
         axios
            .get(`${ENDPOINT.PRICE_CONVERT_PATH}/user/price/${coin}/${fiat}`)
            .then(function (coinConvertRes) {
               console.log(
                  coinConvertRes.data.response,
                  'coinConvertRes.data.responsecoinConvertRes.data.responsecoinConvertRes.data.response'
               );
               resolve(coinConvertRes.data.response);
            })
            .catch(function (error) {
               resolve(error.response.data.response);
            });
      });
      // });
   }
}
export default new UtilitiesHelper();
