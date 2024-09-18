
import { getToken } from 'next-auth/jwt';

import { NextResponse } from 'next/server';

import type { NextFetchEvent, NextRequest } from 'next/server';

import { CustomMiddleware } from './chain';


export function withAuthMiddleware(middleware: CustomMiddleware): CustomMiddleware {

  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {

    const token = await getToken({ req: request, secret:process.env.SECRET_KEY });

let pathname:string[]=request.nextUrl.pathname.split("/");
// console.log(token?.exp as number>Math.floor(Date.now() / 1000))
    if (pathname[2]=="dashboard" &&!(token?.role=="Admin"||token?.role=="SuperAdmin")) {

      return NextResponse.redirect(new URL('/', request.url));

    }
    if ((pathname[3]=="login"||
      pathname[3]=="register"||
      pathname[3]=="forgotpassword"||
      pathname[3]=="emailconfirmed"
    )&&token) {
      return NextResponse.redirect(new URL('/', request.url));
    }



return middleware(request, event, response);


};

}
