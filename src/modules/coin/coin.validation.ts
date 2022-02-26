import * as Joi from 'joi';
export const CoinValidation = Joi.object({
   name: Joi.string().min(3).max(35).trim().required(),
   symbol: Joi.string().lowercase().trim().required(),
   decimal: Joi.string().trim().required(),
   status: Joi.number(),
   withdraw_limit: Joi.number().required(),
   transaction_fee: Joi.number().min(0).max(100).required(),
   is_token: Joi.number(),
   usd_price: Joi.number().required(),
   // wallet_id: Joi.string().trim().required(),
});
export const UpdateStatusCoinValidation = Joi.object({
   id: Joi.string().trim().required(),
   status: Joi.number().valid(0, 1).required(),
});
export const UpdateCoinValidation = Joi.object({
   id: Joi.string().required(),
   name: Joi.string().min(3).max(35).trim().required(),
   symbol: Joi.string().lowercase().trim().required(),
   image: Joi.string().trim().required(),
   decimal: Joi.string().trim().required(),
   status: Joi.number().required(),
   withdraw_limit: Joi.number().required(),

   is_token: Joi.number().required(),
   usd_price: Joi.number().required(),
   //  wallet_id: Joi.string().trim().required(),
});
