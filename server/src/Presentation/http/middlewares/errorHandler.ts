

import {Request, Response,NextFunction} from 'express'


export const errorHandles = (err:any,req:Request,res:Response,next:NextFunction)=>{

    let errorMessage = err.message || 'An unexpected error';
    console.log('error Handles\n',errorMessage.message);
    res.status(404).send({errorMessage,success:false})
}