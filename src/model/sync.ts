import {

   User,
} from './user.model';
import sequelize from './db';

export async function syncAll(force = false): Promise<void> {
   try {
      await sequelize.sync({ force });
      await User.findOne();

   } catch (err) {
      console.log('Error while syncing models', err);
   }
}

//syncAll();
