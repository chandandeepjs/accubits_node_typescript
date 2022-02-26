import * as amqp from 'amqplib/callback_api';
import { RABITMQ,ENV_VARIABLE  } from '../../constant/response';
class RabbitMq {
   public channel: amqp.Channel;

   // constructor() {
   //    // console.log(
   //    //    'Rabbit mq working here for credential',
   //    //   ENV_VARIABLE.RabbitMq
   //    // );
   //   // this.startServer();
   // }

   public async startServer() {
      try {
         console.log(
            'Rabbit mq working here for credential',
           ENV_VARIABLE.RabbitMq
         );
         await this.connect()
            .then(
               (res: amqp.Channel) => {
                  this.channel = res;
                  console.log('Connection sucessfuly created');

                  res.assertQueue(RABITMQ.USER, { durable: false });

                  res.assertQueue(RABITMQ.QUEUE, { durable: false });
                  this.channel.prefetch(1);
                  this.consumeDeposits();
               },
               (error) => {
                  console.log('Error of rabbit queue', error);
                  return error;
               }
            )
            .catch((err) => {
               console.log('The err of rb is ', err);
            });
      } catch (error) {
         console.log('Error of rb is ', error);
      }
   }

   public connect(): Promise<amqp.Channel> {
      try {
         return new Promise((resolve, reject) => {
            amqp.connect(ENV_VARIABLE.RabbitMq, (err, conn) => {
               if (err) {
                  console.log('the rabbit error', err);
                  reject(err);
               }
               conn?.createChannel((eror, ch) => {
                  if (eror) {
                     console.log('the error is ', eror);
                     reject(eror);
                  }
                  resolve(ch);
               });
            });
         });
      } catch (error) {
         console.log('error while connecting rabbit', error);
      }
   }

   public assertQueue(queue: string) {
      this.channel.assertQueue(queue, { durable: false });
   }

   public consumeQueue(queue: string) {
      return new Promise((resolve) => {
         this.channel.consume(
            queue,
            (msg: amqp.Message) => {
               const data = JSON.parse(msg.content.toString());
               this.channel.ack(msg);
               resolve(data);
            },
            { noAck: false }
         );
      });
   }

   public consumeDeposits(): void {
      this.channel.consume(
         RABITMQ.QUEUE,
         (msg: amqp.Message) => {
            const data = JSON.parse(msg.content.toString());
            console.log(' consumeDeposits : data ', data);

            //Here your logic
            this.channel.ack(msg);
         },
         { noAck: false }
      );
   }

   public createQueue(queue: string, data: string): boolean {
      try {
         console.log(typeof data, ' createQueue data received : ', data);

         this.channel.sendToQueue(queue, Buffer.from(data));
         return true;
      } catch (error) {
         console.log('rabbit create queue error is ', error);
         return false;
      }
   }
}
export default new RabbitMq();
