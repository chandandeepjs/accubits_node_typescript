
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
   USER: 'new_user',
   QUEUE: 'webhooks',
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
   VALIDATION:{
      ERROR:"Invalid Response"
   }
};

export const MIDDLEWARE_RESPONSE = {
   JWTERROR: 'Session has been expired',
   PERMISSION_DENIED: 'Permission denied for this user.',
   ONLY_LOGIN_WORKS: 'The feature is temporarily disabled.',
};



export enum SOCKET_EVENTS {}

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




export const IS_TEST_ENV = process.env.NODE_ENV === 'test';

export const KAFKA_CONFIG = {
   GROUP_ID: 'test_api',
   BROKER:  process.env.KAFKA_BROKER,
   BROKER_PORT: process.env.KAFKA_PORT,
   EMAIL_TOPIC:"email_topic"
};


export const ENV_VARIABLE = {
   NODE_ENV:  process.env.NODE_ENV,
   PORT: process.env.PORT,
   ENCDECRYPTKEY: process.env.ENCDECRYPTKEY,
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
 
   GET_USER_DETAIL_URL:
      process.env.GET_USER_DETAIL_URL,
   ADMIN_ID:  process.env.ADMIN_ID,
  
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
export const ENDPOINT={
   PRICE_CONVERT_PATH:""
}
export const VALIDATION={
   ERROR:"Invalid Response"
}