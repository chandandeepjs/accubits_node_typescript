import { Sequelize } from 'sequelize';
import { ENV_VARIABLE } from '../constant/response';

export default new Sequelize(
   ENV_VARIABLE.DB_NAME || 'accubits_user',
   ENV_VARIABLE.DB_USER || 'root',
   ENV_VARIABLE.DB_PASS || 'password',
   {
      dialectOptions: {
         connectTimeout: 60000,
      },
      host: ENV_VARIABLE.DB_HOST || 'localhost',
      dialect: 'mysql',
      define: {   
         underscored: true,
      },
      pool: {
         max: 5,
         min: 0,
         idle: 1000,
         acquire: 60000,
      },
   }
);
