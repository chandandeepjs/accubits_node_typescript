import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as path from 'path';
import * as swaggerUi from 'swagger-ui-express';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import * as Helper from './helpers/index';
import { Controller } from './interfaces';
import * as swaggerDocument from './swagger.json';
import SocketHelper from './helpers/common/socket.heper';
import { Server } from 'http';
import KafkaService from '../src/services/kafka.service';
import {
   ENV_VARIABLE
  
} from './constant/response';
// import { syncAll } from './model/db';

const mailHelper = Helper.MailHelper;

declare global {
   // eslint-disable-next-line @typescript-eslint/no-namespace
   namespace NodeJS {
      interface Global {
         socket?: Socket;
      }
   }
}
const globalData = global;
class App {
   public app: express.Application;

   constructor(controllers: Controller[]) {
      this.app = express();
      this.getProcessInfo();

      this.initializeMiddlewares();
      this.initializeControllers(controllers);
   }

   public listen(): Server {
      const instance: Server = this.app.listen(
        ENV_VARIABLE.PORT ?ENV_VARIABLE.PORT : 8082,
         async () => {
            console.log(
               `App listening on the port ${ENV_VARIABLE.PORT ?ENV_VARIABLE.PORT : 8082
               }`
            );
            // syncAll();
            await KafkaService.consumeEmailDataAndSendmail()

         }
      );
      return instance;
   }

   public getServer(): express.Application {
      return this.app;
   }

   private initializeMiddlewares() {
      // this.app.use(ConfigHelper.loanService);
      this.app.use(bodyParser.json());
      this.app.use(cookieParser());
      this.app.use(logger('tiny'));
      this.app.set('views', path.join(__dirname, 'views'));
      this.app.set('view engine', 'ejs');

      this.app.use(cors());
      this.app.use(
         '/v1/acc/swagger',
         swaggerUi.serve,
         swaggerUi.setup(swaggerDocument)
      );
      this.app.use(helmet());
   }

   private initializeControllers(controllers: Controller[]) {
      controllers.forEach((controller) => {
         this.app.use('/v1', controller.router);
      });
      this.app.get('/v1/user/status', (req, res) => {
         console.log('Status Route called');
         return res.send({ status: 'success' });
      });
   }

   private getProcessInfo() {
      this.app.use((req, res, next) => {
         mailHelper.appObject = res;
         next();
      });
   }

   private socketConnect(serverInstance: Server) {
      /*eslint-disable */
      const io: NodeJS.Socket = require('socket.io')(serverInstance, {
         cors: {
            origin: [
               'https://socket.io',
               'http://127.0.0.1:5500',
               'http://localhost:3000',
            ],
            credentials: true,
         },
         path: '/loans-socket',
         allowEIO3: true,
      });

      //globalData = { socket: io };
      global = globalData;
      new SocketHelper(io);
   }

}
export default App;
