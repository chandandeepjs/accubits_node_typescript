import * as redis from 'redis';
import {ENV_VARIABLE} from '../../constant/response';
class RedisHelper {
   public client: redis.RedisClient;

   private host: string =ENV_VARIABLE.REDIS_HOSTNAME;

   private port: string =ENV_VARIABLE.REDIS_PORT;

   private auth: string =ENV_VARIABLE.REDIS_AUTH;

   //private redisObj: any = redis;

   constructor() {
      console.log('Redis client');
      this.client = redis.createClient(+this.port, this.host);
      // this.client.auth(this.auth);
      this.client.on('connect', () => {
         console.log('Redis Connected');
      });
   }

   // Set String value for given key
   // Note expires time secounds
   public setString(key: string, value: string, expires = 0, database = '') {
      if (database !== '') {
         this.client.select(database);
      }
      return new Promise((resolve, reject) => {
         this.client.set(key, value, (err, reply) => {
            if (err) {
               return reject(err);
            }
            // Add Expire Time if provided
            if (expires !== 0) {
               this.client.expire(key, expires * 60);
            }
            resolve(reply);
         });
      });
   }

   // Get String value for given key
   public getString(key: string, database = '') {
      if (database !== '') {
         this.client.select(database);
      }
      return new Promise((resolve, reject) => {
         this.client.get(key, (err, reply) => {
            if (err) {
               return reject(err);
            }
            resolve(reply);
         });
      });
   }

   public destroyDb(dbKey: string) {
      return new Promise((resolve) => {
         this.client.del(dbKey, (err, response) => {
            if (response === 1) {
               resolve(true);
            } else {
               resolve(false);
            }
         });
      });
   }
}
export default new RedisHelper();
