import { IRequestResponse } from '@interfaces';
import { IUserPayload, IUserReturn } from './user.interface';
import { User } from '../../model/user.model';
import { upload } from '../../helpers/common/file_upload';
import { userInfo } from 'os';
import * as path from 'path';
import * as fs from 'fs';
import * as csv from 'fast-csv';
import MailHelper from '../../helpers/common/mail.helper'



class UserHelper {
   /**
    * 
    * @param data
    */
   
   addUser(data: IUserPayload): Promise<IRequestResponse<IUserReturn>> {
      return new Promise(async (resolve) => {
        
         try {
          const userExist = await User.findOne({where:{email:data.email}});
          if(userExist) throw "user already exists";
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
   processCsv(data:any): Promise<IRequestResponse<IUserReturn>> {
      return new Promise(async (resolve) => {
         try {

            if (!data || data === undefined)  throw "Please upload a CSV file!";

            let csvData:any = [];
            const filePath = path.join(__dirname, `../../../uploads/${data.filename}`);
        fs.createReadStream(filePath)
            .pipe(csv.parse({ headers: true }))
            .on("error", (error) => {
                throw error.message;
            })
            .on("data", (row) => {
                csvData.push(row);
            })
            .on("end",async () => {

               csvData.forEach(async(element:any) => {
               
                  const userdetails = await User.findOne({where:{email:element.email},raw:true});
                  if(userdetails){
                     
                     console.log("userdetails",userdetails)
                     const contentStx = `${userdetails.firstname} ${userdetails.lastname} ${element.content}`
                     MailHelper.sendEmail(userdetails.email,"Dummy Subject",contentStx)

                  }
                
               });
                   await fs.promises.unlink(filePath);
                   console.log("fileremoved from uploads dir")
                   resolve({
                     error: false,
                     message: "Csv processed and email sent to users",
                     data: null,
                  });
            });

         } catch (err) {
            console.log(err, 'err errr');
            resolve({ error: true, message: err });
         }
      });
   }
   
}

export default new UserHelper();
