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
    categoryName : String,
    categoryDescription : String,
    categoryImage : String,
    createAt? : string,
    updateAt? : string
}


export interface addCategoryData{
    CategoryName:string,
    Description: string,
    categoryImage:string
}

// * Admin verify data

export interface AdminCredentials {
    adminEmail : string,
    adminPass : string
}

