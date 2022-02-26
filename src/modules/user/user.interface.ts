export interface IImage {
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
export interface IUser {
   id?: string;
   firstname: string;
   lastname: string;
   age: number;
   email:string;
}

export interface IUserPayload extends IUser{
   file: IImage;
}

export interface IUserReturn extends IUser {
   created_at?: string;
   updated_at?: string;
}
