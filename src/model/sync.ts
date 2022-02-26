import {

   Coin,
} from '.';
import sequelize from './db';

export async function syncAll(force = false): Promise<void> {
   try {
      await sequelize.sync({ force });
      await Coin.findOne();

   } catch (err) {
      console.log('Error while syncing models', err);
   }
}

//syncAll();
