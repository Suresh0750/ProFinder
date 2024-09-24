

import {NextRequest,NextResponse} from 'next/server'
import { jwtVerify } from "jose";
import { isUserProtectedRoute } from './routes/routes';
import { cookies } from 'next/headers';

export async function middleware(req:NextRequest){
    console.log(`req reached middleware f`)
    const cookieStore = cookies();
    const pathname = req.nextUrl.pathname;
    console.log(req.url)
    // console.log(pathname)
    console.log(req.cookies)
  // Improved matcher for static assets
  if (pathname.startsWith("/_next/") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }
  
  const workerVerifyToken = await verifyToken("workerToken",req)
  const userVerifyToken = await verifyToken("userToken",req)

  // * product admin router
  console.log('pathname',pathname)
  console.log(pathname.includes('/admin'))
  if(pathname.includes('/admin')){
    const adminVerifyToken = await AdminVerifyToken("adminToken",req)
    console.log(adminVerifyToken)
  if (!adminVerifyToken && pathname!='/admin/login'){
      const loginUrl = new URL("/admin/login",req.url)
      return NextResponse.redirect(loginUrl)
    }else if(adminVerifyToken&& pathname=='/admin/login'){
      const loginUrl = new URL("/admin/dashboard",req.url)
      return NextResponse.redirect(loginUrl)
    }
   
    return NextResponse.next()
  }


  console.log("workerVerifyToken\n",workerVerifyToken)
  console.log("workerVerifyToken\n",userVerifyToken)
  
  if(req.url==='/'){
    const loginUrl = new URL("/homePage",req.url)
    return NextResponse.redirect(loginUrl)
  }
  
  if((workerVerifyToken && isUserProtectedRoute(pathname)) || (userVerifyToken && isUserProtectedRoute(pathname)) ){
    console.log('req redirect')
    const loginUrl = new URL("/homePage",req.url)
    return NextResponse.redirect(loginUrl)
  }else if((!workerVerifyToken && !isUserProtectedRoute(pathname) && req.url == '/homePage')||(!workerVerifyToken&& (req.url).includes("/worker/dashboard"))){
    console.log('req redirect')
    const loginUrl = new URL("/homePage",req.url)
    return NextResponse.redirect(loginUrl)
  }

  console.log(workerVerifyToken)

    return NextResponse.next() 
}


// * using for split the URL
export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
  };


async function verifyToken(
    workerToken: string,
    req: NextRequest
  ){
    const token = req.cookies.get(workerToken);
    
    console.log("token\n",token)
    if (!token?.value) {
      return false;
    }
  
    const secret = process.env.REFRESH_TOKEN_SECRET;
    console.log("secret",secret)
    
    if (!secret) {
      console.log("JWT secret not found in env");
      return false;
    }
  
    try {
      const { payload } = await jwtVerify(
        token.value,
        new TextEncoder().encode(secret)
      );
  
      if (payload) {
        console.log(payload);
        
      } else {
      }
      return Boolean(payload);
    } catch (err: any) {
      console.log(`failed to verify ${workerToken}`, err.message);
      return false;
    }
}


async function AdminVerifyToken(AdminToken:string,req:NextRequest){
  const token = req.cookies.get(AdminToken);
    
    console.log("admintoken\n",token)
    if (!token?.value) {
      return false;
    }
  
    const secret = process.env.REFRESH_TOKEN_SECRET;
    console.log("secret",secret)
    
    if (!secret) {
      console.log("JWT secret not found in env");
      return false;
    }
  
    try {
      const { payload } = await jwtVerify(
        token.value,
        new TextEncoder().encode(secret)
      );
  
      if (payload) {
        console.log(payload);
        
      } else {
      }
      return Boolean(payload);
    } catch (err: any) {
      console.log(`failed to verify ${AdminToken}`, err.message);
      return false;
    }
}