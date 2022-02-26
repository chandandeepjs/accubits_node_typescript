import {
   KAFKA_CONFIG,
} from '../constant/response';
import { Kafka, Producer, Consumer, EachMessagePayload } from 'kafkajs';
// import LoanHelper from '../modules/users/loans/loans.helper';
// import LoanService from './cron.service';

class KafkaService {
   private kafka: Kafka;

   private producer: Producer;

   private consumer: Consumer;

   constructor() {
      this.connect();
   }

   connect() {
      this.kafka = new Kafka({
         brokers: [`${KAFKA_CONFIG.BROKER}:${KAFKA_CONFIG.BROKER_PORT}`],
         clientId: KAFKA_CONFIG.GROUP_ID,
      });

      return this.kafka;
   }

   public async produceMessage<T>(topic: string, message: T): Promise<boolean> {
      try {
         await this.createTopic(topic);
         this.producer = this.kafka.producer();
         await this.producer.connect();
         await this.producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
         });
         console.log(
            '***Message Produced successfully***',
            topic,
            JSON.stringify(message)
         );
         return true;
      } catch (err) {
         console.log('Error while sending message to ', topic, ':', err);
         return false;
      }
   }

   // public async consumeLoanApprove() {
   //    try {
   //       await this.createTopic(KAFKA_TOPICS_USER.LOAN_REQUEST_STATUS);
   //       this.consumer = this.kafka.consumer({
   //          groupId: `C32_${Math.random()}_${
   //             KAFKA_TOPICS_USER.LOAN_REQUEST_STATUS
   //          }`,
   //       });
   //       await this.consumer.connect();
   //       await this.consumer.subscribe({
   //          topic: KAFKA_TOPICS_USER.LOAN_REQUEST_STATUS,
   //       });

   //       await this.consumer.run({
   //          eachMessage: async (payload: EachMessagePayload) => {
   //             const finalData = await JSON.parse(`${payload.message.value}`);
   //             console.log(
   //                finalData,
   //                'finalDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
   //             );
   //             await LoanHelper.updateLoanStatus({
   //                loan_id: finalData.loan_id,
   //                status: finalData.status
   //                   ? TRANSACTION_STATUS.COMPLETE
   //                   : TRANSACTION_STATUS.FAILED,
   //             });
   //          },
   //       });
   //    } catch (err) {
   //       console.log('Error while consuming deposits', err);
   //    }
   // }
   

   public async createTopic(topic: string) {
      const admin = this.kafka.admin();
      await admin.connect();
      const isExist = await admin.createTopics({
         topics: [
            {
               topic,
               numPartitions: 2,
               replicationFactor: 1,
            },
         ],
      });
      await admin.disconnect();
      return isExist;
   }
}

export default new KafkaService();
