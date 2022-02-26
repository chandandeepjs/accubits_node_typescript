import { ICoinReturn } from '@modules/coin/coin.interface';
import { DataTypes, UUIDV4, Model, Optional } from 'sequelize';
import sequelize from './db';

// We recommend you declare an interface for the attributes, for stricter typechecking

// Some fields are optional when calling UserModel.create() or UserModel.build()
type CoinCreationAttributes = Optional<ICoinReturn, 'id'>;

// We need to declare an interface for our model that is basically what our class would be
export interface CoinInstance
   extends Model<ICoinReturn, CoinCreationAttributes>,
      ICoinReturn {}

export const Coin = sequelize.define<CoinInstance>('coin', {
   id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
   },
   name: {
      type: DataTypes.STRING,
   },
   symbol: {
      type: DataTypes.STRING,
      unique: true,
   },
   image: {
      type: DataTypes.STRING,
   },
   status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
   },
   is_token: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
   },
   withdraw_limit: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
   },
   transaction_fee: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
   },
   decimal: {
      type: DataTypes.STRING,
   },
   usd_price: {
      type: DataTypes.BIGINT,
   },
   wallet_id: {
      type: DataTypes.STRING,
   },
});
