import { authMiddleware } from '@kinde-oss/kinde-auth-nextjs/server'

export const config = {
  matcher: ['/money/:path*','/merchant/:path*','/cart'],
}

export default authMiddleware