import { Request, Response } from 'express';

export interface IExpressRequest extends Request {
  user: any;
  session: any;
}

/* tslint:disable */
export interface IExpressResponse extends Response {}
