import Controller from './controller.interface';

export { Controller };

export interface IRequestResponse<T = void> {
   status?: number;
   error: boolean;
   message: string;
   data?: T;
}
export interface IError<T = void> {
   status: number;
   error: boolean;
   message: T;
}
