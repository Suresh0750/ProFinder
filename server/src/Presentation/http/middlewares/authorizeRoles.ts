
import {Request,Response, NextFunction } from "express";
import { StatusCode } from "../../../domain/entities/commonTypes";


export const authorizeRoles = (role:string) => {
    // console.log(`Req authorizeRoles`)
    
    return (req:Request, res:Response, next:NextFunction) => {
        const verifyRole = req.headers['role']; 
        // console.log(`Req authorizeRoles`)
        if(!verifyRole)  return res.status(StatusCode.Forbidden).json({success:false,message:'Role is Required'});
        // console.log(verifyRole)
        if (role!=verifyRole) {
            return res.status(StatusCode.Forbidden).json({success:false,message:'Access denied'});
        }
        next();
    };
};