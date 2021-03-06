// import { integer } from 'aws-sdk/clients/storagegateway';
// import * as twilio from 'twilio';
// import ENV_VARIABLE from '../../constant/response';

// class TwilioHelper {
//    public client: any;

//    private accountId: any =ENV_VARIABLE.TWILIO_ACCOUNT_ID;

//    private authToken: string =ENV_VARIABLE.TWILIO_AUTH_TOKEN;

//    private fromNumber: string =ENV_VARIABLE.TWILIO_FROM_NUMBER;

//    // private redisObj: any = redis;
//    constructor() {
//       this.client = twilio(this.accountId, this.authToken);
//    }

//    /* sending otp message on input phone number */
//    public sendOtp(phoneNumber: string, sentOtpCode: integer) {
//       return new Promise((resolve, reject) => {
//          this.client.messages
//             .create({
//                body: `${sentOtpCode} is the OTP to verify your mobile number on ${ENV_VARIABLE.PROJECT_NAME}. Generated OTP is valid for 5 minutes from the generated time.`,
//                to: phoneNumber,
//                from: this.fromNumber, // From a valid Twilio number
//             })
//             .then((response: any) => {
//                console.log('twilio sendOtp success resp.->', response);
//                resolve(sentOtpCode);
//             })
//             .catch((err: any) => {
//                console.log('twilio sendOtp error->', err);
//                reject(err);
//             });
//       });
//    }
// }
// End of class definition
// export default new TwilioHelper();
