// import { } from '../../model/loans.model';
import { Loan } from '../../model/loan.model';
import { Plan } from '../../model/plan.model';
import { AdminConfig } from '../../model/admin_config';

class TestCases {
   public async deleteWalletEntry(loans_id: string) {
      try {
         await Loan.destroy({
            where: {
               id: loans_id,
            },
         });

         return true;
      } catch (error) {
         console.log('ERROR :: ', error);

         return error;
      }
   }
   public async deletePlanEntry(id: string) {
      try {
         await Plan.destroy({
            where: {
               id: id,
            },
         });

         return true;
      } catch (error) {
         console.log('ERROR :: ', error);

         return error;
      }
   }

   public async deleteLoanEntry(id: string) {
      try {
         await Plan.destroy({
            where: {
               id: id,
            },
         });

         return true;
      } catch (error) {
         console.log('ERROR :: ', error);

         return error;
      }
   }
   public async deleteAdminConfigEntry(loans_id: string) {
      try {
         await AdminConfig.destroy({
            where: {
               id: loans_id,
            },
         });

         return true;
      } catch (error) {
         console.log('ERROR :: ', error);

         return error;
      }
   }
}
export default new TestCases();
