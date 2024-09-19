import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { StatusCode } from '../../../../domain/entities/commonTypes'
// JWT



export const verify = (req:Request,res:Response,next:NextFunction)=>{
    try{
        
        const adminAccessToken = req.cookies.accessToken
        console.log(`Request reached middleware`,adminAccessToken)
        
        if(!adminAccessToken){
           if(renewToken(req,res,next)){
            next()
           }
        }else{
           const AdminData =  jwt.verify(adminAccessToken,String(process.env.ACCESS_TOKEN_SECRET))
           console.log(AdminData)
           if(AdminData){
            req.body.AdminData = AdminData
            next()
           }
            // jwt.varify(adminAccessToken,'secret_key',(err,decode)=>{
            //     if(err){
            //     return res.json({valide:false,message:'Invalid Token'})
            //     }else{
            //         req.email = decode.email
            //         next()
            //     }
            // })
        }
        
    }catch (err){
        console.log(err)
        next(err)
    }
}


export const renewToken = (req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log(`req Enter renewtoken`)
        const refreshToken = req.cookies.adminToken
        let exist = false
        if(!refreshToken){
            return res.status(StatusCode.Unauthorized).json({valid:false,message:'no refresh Token'})
        }else{
             const AdminRefreshToken = jwt.verify(refreshToken,String(process.env.REFRESH_TOKEN_SECRET)) 
             console.log(AdminRefreshToken)
             if(AdminRefreshToken){
                const accessToken = jwt.sign({adminEmail:process.env.ADMIN_EMAIL},String(process.env.ACCESS_TOKEN_SECRET), { expiresIn:'15m' }); 
                res.cookie('accessToken',accessToken,{
                    maxAge: 2 * 60 * 1000
                })
                exist = true
             }else{
                return res.status(StatusCode.Unauthorized).json({valid:false,message:'Invalid refresh token'})
             }
            // jwt.verify(refreshToken,'secret_key',(err,decode)=>{
            //     if(err){
            //         return res.json({valid:false,message:'Invalid refresh token'})
            //     }else{
            //         const accessToken = jwt.sign({adminEmail: process.env.ACCESS_TOKEN_SECRET},String(process.env.REFRESH_TOKEN_SECRET), { expiresIn:'15m' })
            //         res.cookie('accessToken',accessToken,{maxAge:6000})
            //         exist = true
            //     }
            // }
                
            // const workerAccessToken = jwt.sign()
        }
        return exist
    }catch(error){
        console.log(error)
        next(error)
    }
}





