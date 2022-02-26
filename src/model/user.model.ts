import { IUserReturn } from '@modules/user/user.interface';
import { DataTypes, UUIDV4, Model, Optional } from 'sequelize';
import sequelize from './db';

// We recommend you declare an interface for the attributes, for stricter typechecking

// Some fields are optional when calling UserModel.create() or UserModel.build()
type CoinCreationAttributes = Optional<IUserReturn, 'id'>;

// We need to declare an interface for our model that is basically what our class would be
export interface UserInstance
   extends Model<IUserReturn, CoinCreationAttributes>,
      IUserReturn {}

export const User = sequelize.define<UserInstance>('coin', {

   id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
   },
   firstname: {
      type: DataTypes.STRING
   },
   lastname: {
      type: DataTypes.STRING
   },
   email: {
      type: DataTypes.STRING
   },
   age: {
      type: DataTypes.INTEGER
   }
});
