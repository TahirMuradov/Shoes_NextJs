
import { getToken } from 'next-auth/jwt';

import { NextResponse } from 'next/server';

import type { NextFetchEvent, NextRequest } from 'next/server';

import { CustomMiddleware } from './chain';
import { i18n } from '@/i18n-config';

export function withAuthMiddleware(middleware: CustomMiddleware): CustomMiddleware {

  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {

    const token = await getToken({ req: request, secret:process.env.SECRET_KEY });
 

    if (request.url.split("/")[4]=="dashboard"&&token?.role!="admin") {

      return NextResponse.redirect(new URL('/api/auth/signin', request.url));

    }
    if (request.url.split("/")[4]=="auth"&&token) {
      return NextResponse.redirect(new URL('/', request.url));
    }



return middleware(request, event, response);


};

}
