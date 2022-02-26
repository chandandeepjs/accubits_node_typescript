import { RESPONSES, RES_MSG } from '../../constant/response';
import { Response } from 'express';
interface IResponseData<T> {
   status?: number,
   error: boolean,
   message: string,
   data?: T
}
class ResponseHelper {
   public success<T = void>(response: Response, responseData: T) {

      return response.status(RESPONSES.SUCCESS).send({ response: responseData } || {});
   }

   public error<T = void>(response: Response, responseData: T) {


      return response.status(RESPONSES.BADREQUEST).send({ response: responseData } || {});
   }
   public custom<T = void>(
      statusCode: number,
      response: Response,
      responseData: T
   ) {
      return response.status(statusCode).send({ response: responseData } || {});
   }
   public responseHandler<T>(
      response: Response,
      data: IResponseData<T>
   ) {
      const statusCode = data.status;

      if (statusCode) {
         if (data.error) {
            data.data = [{ name: RES_MSG.VALIDATION.ERROR, message: data.message }] as unknown as T
         }
         return this.custom(statusCode, response, data)
      } else {
         if (data.error) {


            data.data = [{ name: RES_MSG.VALIDATION.ERROR, message: data.message }] as unknown as T
            data.status = RESPONSES.BADREQUEST;

            return this.error(response, data)
         } else {
            data.status = RESPONSES.SUCCESS;
            return this.success(response, data)
         }
      }
   }

}
export default new ResponseHelper();
