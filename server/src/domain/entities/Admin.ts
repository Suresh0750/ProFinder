import { ReadStream } from 'fs';
import {ObjectCannedACL} from "@aws-sdk/client-s3"
export interface IMulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer; // For memory storage
    stream?: ReadStream; // Optional, used with disk storage
}


// * params for add image to s3 bucket
export interface paramsImage {
    Bucket: string;
    Key: string;
    Body: Buffer;
    ContentType: string;
    ACL ?: ObjectCannedACL ;
}


// * AddCategory schema types

export interface AddCategory{
    _id ?: string,
    categoryName : string,
    categoryDescription : string,
    categoryImage : string,
    isListed ? : Boolean,
    createAt? : string,
    updateAt? : string
    newImage ?: Boolean
}


export interface addCategoryData{
    _id ?: string,
    CategoryName:string,
    Description: string,
    categoryImage:string
}

// * Admin verify data

export interface AdminCredentials {
    adminEmail : string,
    adminPass : string
}



export interface filterSales {
    [key:string] : any
}