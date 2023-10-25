import { authMiddleware } from '@kinde-oss/kinde-auth-nextjs/server'

export const config = {
  matcher: ['/dashboard/:path*', '/wallet','/cart','/merchant/:path*'],
}

export default authMiddleware