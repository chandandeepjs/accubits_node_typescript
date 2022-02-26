export interface ICoinImage {
   fieldname: string;
   originalname: string;
   encoding: string;
   mimetype: string;
   size: number;
   bucket: string;
   key: string;
   acl: string;
   contentType: string;
   contentDisposition: string;
   contentEncoding: string;
   storageClass: string;
   serverSideEncryption: string;
   metadata: string;
   location: string;
   etag: string;
   versionId: string;
}
export interface ICoin {
   id?: string;
   name: string;
   symbol: string;
   image: string;
   decimal: string;
   status: number;
   is_token: number;
   withdraw_limit: number;
   transaction_fee: number;
   usd_price: number;
   wallet_id: string;
}

export interface ICoinPayload extends ICoin {
   file: ICoinImage;
}

export interface ICoinReturn extends ICoin {
   is_token: number;
   created_at?: string;
   updated_at?: string;
}
