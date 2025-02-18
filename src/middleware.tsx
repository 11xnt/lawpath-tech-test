import { withAuth } from 'next-auth/middleware'

export const config = { matcher: ["/dashboard/:path*", "/api/proxy/:path*"] }
export default withAuth({})