// import zookeeperConfig from '../services/zookeeper.service';
// console.log('HERERERER', zookeeperConfig);
export const RESPONSES = {
   SUCCESS: 200,
   CREATED: 201,
   ACCEPTED: 202,
   NOCONTENT: 204,
   BADREQUEST: 400,
   UN_AUTHORIZED: 401,
   FORBIDDEN: 403,
   NOTFOUND: 404,
   INVALID_REQUEST: 422,
   TIMEOUT: 408,
   TOOMANYREQ: 429,
   INTERNALSERVER: 500,
   BADGATEWAYS: 502,
   SERVICEUNAVILABLE: 503,
   GATEWAYTIMEOUT: 504,
};

export const RABITMQ = {
   LOANSUSER: 'loans_new_user',
   DEPOSIT_QUEUE: 'bitgo_loans_deposits_webhooks',
};
export const TRANSACTION_STATUS = {
   PENDING: 0,
   COMPLETE: 1,
   FAILED: 2,
};
export const LOAN = {
   PENDING: 0,
   APPROVED: 1,
   CLOSE: 2,
   LOAN_STATUS: {
      PENDING: 0,
      MARGIN: 1,
      LIQUIDITY: 2,
      OVERDUE: 3,
      PRE_CLOSURE: 4,
      LOAN_TENURE_OVERDUE: 5,
   },
   LOAN_AMOUNT: {
      INTEREST_PAID: 0,
   },
};
export const INTEREST = {
   PENDING: 1,
};
export const TRANSACTION_TYPE = {
   WITHDRAW: 'withdraw',
   DEPOSIT: 'deposit',
};

export const RES_MSG = {
   COIN: {
      COIN_LIST_ERROR: 'Error while fetch coin detail!',
      NOT_FOUND_ERROR: 'Coin not found',
   },
   WALLET: {
      WALLET_LIST_ERROR: 'Error while fetch wallet detail!',
      BALANCE_NOT_SUFFICIENT: 'You have insufficient balance in your wallet.',
      LOCK_BALANCE_ERROR: 'Error while lock the balance!',
   },
   TOPUP: {
      WALLET_LIST_ERROR: 'Error while fetch wallet detail!',
      BALANCE_NOT_SUFFICIENT: 'You have insufficient FUNDS.',
      LOCK_BALANCE_ERROR: 'Error while lock the balance!',
   },
   LOANS: {
      SUCCESS:
         'Your loan request under processing we will notify when its approved.',
      CLOSE_SUCCESS: 'Loan closed successfully.',
      ERROR: 'Error While Create Loan.',
      LOAN_LIST: 'Loan fetch successfully',
      LOAN_LIST_ERROR: 'Error while fetch the loan!',
      LOAN_DISABLE: 'Loan is disabled by admin',
   },
   LOANS_ADD: {
      SUCCESS:
         'Your loan request under processing we will notify when its approved.',
      ERROR: 'Error While Create Loan.',
      LOAN_LIST: 'Loan fetch successfully',
      LOAN_LIST_ERROR: 'Error while fetch the loan!',
      LOAN_WITHDRAW_ERROR: 'Error while closing loan!',
      COIN_CONVERT_SUCCESS: 'Convert the price successfully',
      COIN_CONVERT_ERROR: 'Error while convert price',
      LOAN_ELIGIBILITY: 'Sorry! You can apply the loan below ',
      LOAN_PLAN_VALUE: 'Loan amount should be  between',
      APPROVED: 'Your loan is approved',
      NOTIFICATION: {
         LOAN_OBJECT: 'Loan is approved',
      },
      LOAN_OVERDUE: '',
      LOAN_OVERDUE_ERROR: 'Sorry! You have to pay amount ',
      LOAN_STATUS_ERROR: 'Error while fetch the loan status!',
   },
   INTEREST_ADD: {
      SUCCESS:
         'Your emi request under proccessing, We will notify when its done.',
      ERROR: 'Error While pay the interest!.',
      SUBJECT: 'Paid loan interest',
      INTEREST_LIST: 'Loan interest fetch successfully',
      INTEREST_LIST_ERROR: 'Error while fetch the loan interest!',
   },
   TOPUP_ADD: {
      SUCCESS: 'Top up added successfully.',
      ERROR: 'Error While pay the TOP UP!.',
   },
   WITHDRAW_ADD: {
      SUCCESS:
         'We have initiated your loan withdraw request successfully. We will update you once its processed ',
      ERROR: 'Error While wihdrawing loan!.',
   },
   PLAN_ADD: {
      SUCCESS: 'Plan Created Successfully.',
      ERROR: 'Error While Create Plan.',
      PLAN_NOT_EXIST: 'Selected plan is not valid!',
      ERROR_ALREADY_EXIST: 'Plan already exists.',
   },
   PLAN_LIST: {
      SUCCESS: 'Plan List Fetched Successfully.',
      ERROR: 'Error While Fetching Plan List.',
   },
   PLAN_UPDATE: {
      SUCCESS: 'Plan Updated Successfully ',
      ERROR: 'Error While Updating Plan.',
      INVALID_PLAN: 'Invalid Plan Id',
   },
   PLAN_FETCH: {
      SUCCESS: 'Plan Details fetched Successfully ',
      ERROR: 'Error While Fetching Plan Details.',
   },
   VALIDATION: {
      ERROR: 'Invalid request.',
   },
   USER: {
      USER_EXIST: '',
      USER_EXIST_ERROR: 'User not found',
   },
   ADMIN_CONFIG_ADD: {
      SUCCESS: 'Admin Configration Created Successfully.',
      ERROR: 'Error While Create Admin Configration.',
      STATUS_ERROR: 'Type already exist.',
   },
   ADMIN_CONFIG_LIST: {
      SUCCESS: 'Admin Config List Fetched Successfully.',
      ERROR: 'Error While Fetching Admin Config List.',
   },
   ADMIN_CONFIG_UPDATE: {
      SUCCESS: 'Admin config Updated Successfully ',
      ERROR: 'Error While Updating admin config.',
      INVALID_CONFIG: 'Invalid admin config Id',
   },
   LOAN_PRE_CLOSE: {
      FIAT_INSUFFICIENT:
         'Please maintain AMOUNT to your account to process further action.',
   },
};

export const MIDDLEWARE_RESPONSE = {
   JWTERROR: 'Session has been expired',
   PERMISSION_DENIED: 'Permission denied for this user.',
   ONLY_LOGIN_WORKS: 'The feature is temporarily disabled.',
};

export const ENDPOINT = {
   COIN_MARKET_API:
       process.env.COIN_MARKET_API_PATH,
   COIN_MARKET_API_KEY:
      process.env.COIN_MARKET_API_KEY,
   WALLET_HOST:  process.env.GET_COIN_DATA,
   WALLET_PATH: '/user/coin/',
   USER_BY_ID: '/getUserDetail',
   USER_ACCOUNT: '/account/getBalances',
   USER_ACCOUNT_DETAILS: '/account',
   PRICE_CONVERT_PATH:
     process.env.COIN_CONVERT_PATH,
};

export enum SOCKET_EVENTS {}
export const REDIS_OPERATION_KEYS = {
   COIN_LIST: 'loans_coin_list',
   FIAT_CURRENCY: 'fiat_currency',
   LOAN_PLAN_LIST: 'loan_plan_list',
   ADMIN_CONFIG_LIST: 'admin_config_list',
   TIMEZONE: 'countries_timezone',
};
export const TWILIO_CONFIG = {
   accountSid:
     process.env.TWILIO_ACCOUNT_SID,
   apiKey: process.env.TWILIO_API_KEY,
   apiSecret:
      process.env.TWILIO_API_SECRET,
   chatServiceSid:
      process.env.TWILIO_CHAT_SERVICE_SID,
   pushCredentialSid:
    process.env.TWILIO_FCM_KEY,
};

export const EMAIL_TITLE = {};

export const SMALLEST_UNITS = 10 ** 8;

type IEnv = 'test' | 'dev' | 'prod';

export const BITGO_CONFIG = {
   ENVIRONMENT:
      (process.env.BITGO_ENVIRONMENT as IEnv),
   ACCESS_TOKEN:
     process.env.BITGO_ACCESS_TOKEN,
   LABEL: process.env.BITGO_LABEL,
   PASSPHRASE: process.env.BITGO_PASSPHRASE,
   BITGO_DEPOSIT_WEBHOOK_URL:
      process.env.BITGO_DEPOSIT_WEBHOOK_URL,
   RECEIVE_TXR: 'receive',
   SEND_TXR: 'send',
};
export const LOANS_QUERY_CONFIG = {
   LIMIT: 20,
};
export const BITGO_ADDRESS_POOL = {
   LIMIT:5,
};

export const IS_TEST_ENV = process.env.NODE_ENV === 'test';

export const KAFKA_CONFIG = {
   GROUP_ID: 'c32-crypto-loans',
   BROKER:  process.env.KAFKA_BROKER,
   BROKER_PORT: process.env.KAFKA_PORT,
};
export const LOAN_CONFIG = {
   PROCESS_LOAN: 'PROCESS_LOAN',
   OVER_DUE: 'OVER_DUE',
   EMI_DUE_DAYS: 2,
   OVER_DUE_DAYS: 1,
   EMI_DAY: 0,
   LOAN_TENURE_OVERDUE: 5,
};

export const ENV_VARIABLE = {
   NODE_ENV:  process.env.NODE_ENV,
   PORT: process.env.PORT,
   ENCDECRYPTKEY: process.env.ENCDECRYPTKEY,
   USER_BANKING_URL: process.env.USER_BANKING_URL,
   PROJECT_NAME:  process.env.PROJECT_NAME,
   DB_HOST:  process.env.DB_HOST,
   DB_PORT:  process.env.DB_PORT,
   DB_NAME:  process.env.DB_NAME,
   DB_USER:  process.env.DB_USER,
   DB_PASS: process.env.DB_PASS,
   CLUSTER: process.env.CLUSTER,
   JWTSECRET: process.env.JWTSECRET,
   JWTADMINSECRET: process.env.JWTADMINSECRET,
   REDIS_HOSTNAME: process.env.REDIS_HOSTNAME,
   REDIS_PORT:  process.env.REDIS_PORT,
   RabbitMq:  process.env.RabbitMq,
   GET_COIN_DATA:  process.env.GET_COIN_DATA,
   GET_USER_DETAIL_URL:
      process.env.GET_USER_DETAIL_URL,
   ADMIN_ID:  process.env.ADMIN_ID,
   COIN_CONVERT_PATH:
       process.env.COIN_CONVERT_PATH,
   HOST_NAME:  process.env.HOST_NAME,
   DBNAME:  process.env.DBNAME,
   USER_NAME:  process.env.USER_NAME,
   PASSWORD: process.env.PASSWORD,
   WRITE_NAME:  process.env.WRITE_NAME,
   WRITE_DBNAME: process.env.WRITE_DBNAME,
   WRITE_USER_NAME:
     process.env.WRITE_USER_NAME,
   WRITE_PASSWORD:  process.env.WRITE_PASSWORD,
   READ_HOST_NAME: process.env.READ_HOST_NAME,
   READ_DBNAME: process.env.READ_DBNAME,
   READ_USER_NAME:  process.env.READ_USER_NAME,
   READ_PASSWORD:  process.env.READ_PASSWORD,
   SMTP_FROM: process.env.CC_EMAIL,
   CC_EMAIL:  process.env.CC_EMAIL,
   SMTP_HOST:  process.env.SMTP_HOST,
   SMTP_USER:  process.env.SMTP_USER,
   SMTP_PASSWORD: process.env.SMTP_PASSWORD,
   REDIS_AUTH:  process.env.REDIS_AUTH,
};

export const LOAN_KAFKA_TOPICS = {
   LOAN_TOPUP: 'C32_BLOCKCHAIN_LOAN_TOPUP', //notification
   EMI_WITHDRAW_STATUS: 'C32_LOAN_EMI_WITHDRAW_STATUS', //notification consumer
};
export const KAFKA_TOPICS_USER = {
   APPROVE_EMAIL: 'C32_LOAN_REQUEST_APPROVE_EMAIL', //user
   LOAN_REQUEST: 'C32_CRYPTO_LOAN_REQUEST', //user
   LOAN_REQUEST_STATUS: 'C32_CRYPTO_LOAN_REQUEST_STATUS', //user consumer
   EMI_WITHDRAW: 'C32_LOAN_EMI_WITHDRAW', //user
   LOAN_WITHDRAW: 'C32_LOAN_WITHDRAW', //user
   LOAN_WITHDRAW_STATUS: 'C32_LOAN_WITHDRAW_STATUS', // user consumer
   APPROVED_LOAN: 'C32_LOAN_APPROVED', //user
   EMI_NOTIFY: 'C32_LOAN_EMI_NOTIFY', //old format user
};
export const KAFKA_TOPICS_BLOCKCHAIN = {
   BLOCKCHAIN_LOAN_REQUEST: 'C32_BLOCKCHAIN_CRYPTO_LOAN_REQUEST', //blokchain
   LOAN_WITHDRAW_BLOCKCHAIN: 'C32_BLOCKCHAIN_LOAN_WITHDRAW', //blockchain
};
export const NOTIFICATION_TOPIC = 'c32_notification_request';
export const INTEREST_KAFKA_TOPICS = {
   PAID_EMAIL: 'C32_INTEREST_PAID_EMAIL',
   PAID_SMS: 'C32_INTEREST_PAID_SMS',
   REJECT: 'C32_INTEREST_PAID_REJECT',
   DELIVERY_SUCCESS: 'C32_INTEREST_PAID_EMAIL_SUCCESS',
   DELIVERY_ERROR: 'C32_INTEREST_PAID_EMAIL_ERROR',
   INTEREST_DATA: 'C32_INTEREST_PAID_DATA',
};
export const ADMIN_DETAIL = {
   adminPayload: {
      email: 'antiersolutions@gmail.com',
      adminId: '1747e0ac-d86e-46e0-8ed8-3ab775062948',
      role: 'ADMIN',
      accessRole: 1,
   },
};
