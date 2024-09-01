
import { getToken } from 'next-auth/jwt';

import { NextResponse } from 'next/server';

import type { NextFetchEvent, NextRequest } from 'next/server';

import { CustomMiddleware } from './chain';


export function withAuthMiddleware(middleware: CustomMiddleware): CustomMiddleware {

  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {

    const token = await getToken({ req: request, secret:process.env.SECRET_KEY });

let pathname:string[]=request.nextUrl.pathname.split("/");
pathname.forEach(i=>console.log(i))
    if (pathname[2]=="dashboard"&&token?.role!="admin") {

      return NextResponse.redirect(new URL('/auth/signin', request.url));

    }
    if (pathname[2]=="auth"&&token) {
      return NextResponse.redirect(new URL('/', request.url));
    }



return middleware(request, event, response);


};

}
