import * as cron from 'cron';
const { CronJob } = cron;
class CronService {
   isProcessingCronA = false;
   isProcessingCronB = false;
   constructor() {
      console.log('cron service running...');
      
   }

   // public testCron() {
   //    new CronJob(
   //       '*/60 * * * * *',
   //       async () => {
            
   //       },
   //       null,
   //       true,
   //       'America/Los_Angeles'
   //    );
   // }
   
}
export default new CronService();
