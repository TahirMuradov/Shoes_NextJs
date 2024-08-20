
import { chain } from '@/middlewares/chain';

import { withI18nMiddleware } from '@/middlewares/withI18nMiddleware';

import { withAuthMiddleware } from '@/middlewares/withAuthMiddleware';

export default chain([withI18nMiddleware, withAuthMiddleware]);



export const config = {

  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],

};