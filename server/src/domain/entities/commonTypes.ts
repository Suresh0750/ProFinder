
// * server status code

import { conversation } from "../../Presentation/http/controllers/UserController";
import {Types} from 'mongoose'


export enum StatusCode {
    Success = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    UnprocessableEntity = 422,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
 }


// * cookie

 export enum Cookie {
    Admin = "adminToken",
    Worker = "workerToken",
    User = "userToken",
 }


 // * JWT 

 export interface AdminDetails {
   adminEmail : string,
   iat : number,
   exp : number
 }

 // * user JWT

 export interface customerDetails{
   customerId : string,
   customerName :string,
   customerEmail : string,
   role : string,
   iat ? : number,
   exp ?: number
 }


// * category name type
export type getCategoryName = string[] | any


// * error status code

export interface CustomError extends Error {
  statusCode?: number;
}

export type conversationTypes = {
  userId : Types.ObjectId
  workerId:Types.ObjectId,
  lastMessage : string,
  createAt? : Date,
  updateAt? : Date
}

