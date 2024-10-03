import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCode, customerDetails } from '../../../../domain/entities/commonTypes';

// * Extend Express session to include user data
declare module 'express-session' {
    interface SessionData {
        UserData: customerDetails;
        WorkerData: customerDetails;
    }
}

// * Middleware to verify user or worker based on role
export const customeVerify = (req: Request, res: Response, next: NextFunction) => {
    try {
        const verifyRole = req.headers['role'];
        console.log(`verifyRole`,verifyRole)
        if (verifyRole === 'user') {
            UserJWT(req, res, next);
        } else if (verifyRole === 'worker') {
            console.log(verifyRole)
            WorkerJWT(req, res, next);
        } else {
            return res.status(StatusCode.Unauthorized).json({ message: 'In JWT Invalid role specified' });
        }
        next()
    } catch (err) {
        console.error(err);
        next(err);
    }
};

//* User token verification
export const UserJWT = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userAccessToken = req.cookies.accessToken;
        
        if (!userAccessToken) {
            // * Attempt to renew token if access token is not present
            if (await renewToken(req, res)) {
                return next();
            }
            return res.status(StatusCode.Unauthorized).json({ message: 'Access token is missing and renewal failed' });
        }

        const UserData = jwt.verify(userAccessToken, String(process.env.ACCESS_TOKEN_SECRET)) as customerDetails;
        req.session.UserData = UserData;
        next();
        
    } catch (error) {
        console.error(error);
        return res.status(StatusCode.Unauthorized).json({ message: 'Invalid access token' });
    }
};

// * Worker token verification
export const WorkerJWT = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workerAccessToken = req.cookies.accessToken;
        console.log(`accesstoker\n ${workerAccessToken}`)
        if (!workerAccessToken) {
            // * Attempt to renew token if access token is not present
            if (await renewToken(req, res)) {
                return next();
            }
            return res.status(StatusCode.Unauthorized).json({ message: 'Access token is missing and renewal failed' });
        }

        const WorkerData = jwt.verify(workerAccessToken, String(process.env.ACCESS_TOKEN_SECRET)) as customerDetails;
        req.session.WorkerData = WorkerData;
        next();

    } catch (error) {
        console.error(error);
        return res.status(StatusCode.Unauthorized).json({ message: 'Invalid access token' });
    }
};

//*  Token renewal function
export const renewToken = async (req: Request, res: Response): Promise<boolean> => {
    try {
        console.log(`Request entered renewToken`);

        if(req.headers['role']=='user'){

            const refreshToken = req.cookies.userToken;
            
            if (!refreshToken) {
                return false; // No refresh token present
            }
    
            let userRefreshTokenData;
            
            try {
                userRefreshTokenData = jwt.verify(refreshToken, String(process.env.REFRESH_TOKEN_SECRET));
            } catch (error) {
                console.error('Invalid refresh token:', error);
                return false; // Invalid refresh token
            }
    
            const { customerId, customerName, customerEmail, role } = userRefreshTokenData as customerDetails;
    
            // Generate new access token
            const accessToken = jwt.sign(
                { customerId, customerName, customerEmail, role },
                String(process.env.ACCESS_TOKEN_SECRET),
                { expiresIn: '15m' }
            );
            
                    // Set new access token in cookies
                    res.cookie('accessToken', accessToken, { maxAge: 2 * 60 * 1000 });
        }else if(req.headers['role']=='worker'){
            const refreshToken = req.cookies.workerToken;
            
            if (!refreshToken) {
                return false; // No refresh token present
            }
    
            let workerRefreshTokenData;
            
            try {
                workerRefreshTokenData = jwt.verify(refreshToken, String(process.env.REFRESH_TOKEN_SECRET));
            } catch (error) {
                console.error('Invalid refresh token:', error);
                return false; // Invalid refresh token
            }
    
            const { customerId, customerName, customerEmail, role } = workerRefreshTokenData as customerDetails;
    
            // * Generate new access token
            const accessToken = jwt.sign(
                { customerId, customerName, customerEmail, role },
                String(process.env.ACCESS_TOKEN_SECRET),
                { expiresIn: '15m' }
            );
            
            // * Set new access token in cookies
            res.cookie('accessToken', accessToken, { maxAge: 2 * 60 * 1000 });
        }
  

        return true; // Token renewal successful

    } catch (error) {
        console.error(error);
        return false; // An error occurred during renewal
    }
};