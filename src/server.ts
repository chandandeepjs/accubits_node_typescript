import * as cluster from 'cluster';
import * as os from 'os';
import * as config from './config';


import { Server } from 'http';

// Loading Config
(async () => {
   await config.initiate();
})();
import App from './app';
import UserController from './modules/user/user.controller';

import {
   ENV_VARIABLE
} from './constant/response';

let instance: Server;
const clusterEnable = +ENV_VARIABLE.CLUSTER === 1;
console.log(`Cluster Mode ${clusterEnable}`);
if (cluster.isMaster && clusterEnable) {
   const numWorkers = os.cpus().length;
   console.log(`Master cluster setting up ${numWorkers} workers...`);
   for (let i = 0; i < numWorkers; i += 1) {
      cluster.fork();
   }
   cluster.on('online', (worker) => {
      console.log(`Worker ${worker.process.pid} is online`);
   });

   cluster.on('exit', (worker, code, signal) => {
      console.log(
         `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`
      );
      console.log('Starting a new worker');
      cluster.fork();
   });
} else {
   const app = new App([
      new UserController(),
   ]);
   instance = app.listen();
}

export default instance;
