import { IRequestResponse } from '@interfaces';
import { IUserPayload, IUserReturn } from './user.interface';
import { User } from '../../model/user.model';
import { uploadS3 } from '../../helpers/common/file_upload';


class UserHelper {
   /**
    * 
    * @param data
    */
   addUser(data: IUserPayload): Promise<IRequestResponse<IUserReturn>> {
      return new Promise(async (resolve) => {
        
         try {

            User.create(data, {}).then(async (res:any) => {
               if (res) {
                  resolve({
                     error: false,
                     message: "USER CREATED SUCCESSFULLY",
                     data: res.toJSON() as IUserReturn,
                  });
               } else {
                  throw "USER NOT CREATED"
               }
            });
          
         } catch (err) {
            console.log(err, 'err errr');
            resolve({ error: true, message: err });
         }
      });
   }

}

export default new UserHelper();
