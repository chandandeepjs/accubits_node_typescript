import { Sequelize } from 'sequelize';
import { ENV_VARIABLE } from '../constant/response';

export default new Sequelize(
   ENV_VARIABLE.DB_NAME || 'c32_wallet',
   ENV_VARIABLE.DB_USER || 'root',
   ENV_VARIABLE.DB_PASS || 'admin123',
   {
      dialectOptions: {
         connectTimeout: 60000,
      },
      host: ENV_VARIABLE.DB_HOST || 'localhost',
      dialect: 'mysql',
      define: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
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
