import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { getPayload, Payload } from 'payload'
// import configPromise from '@payload-config'

// Define your route patterns
const AUTH_ROUTES = ['/login', '/signup', '/forgot-password']
const PUBLIC_ROUTES = ['/', '/about', '/contact']
const AUTHENTICATED_ROUTES = ['/dashboard']
const PAYLOAD_ADMIN_ROUTE = '/admin'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get authentication token from cookies
  const token = request.cookies.get('payload-token')?.value
  const isAuthenticated = !!token

  // === Payload Admin Protection ===
  if (pathname.startsWith(PAYLOAD_ADMIN_ROUTE)) {
    // Let Payload CMS handle its own authentication
    // Optionally add additional checks here
    return NextResponse.next()
  }

  // === Public Routes ===
  if (PUBLIC_ROUTES.includes(pathname)) return NextResponse.next()

  // === Auth Routes ===
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
  }

  // === Protected Routes ===
  if (AUTHENTICATED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // const payload: Payload = await getPayload({
    //   config: await configPromise,
    // })

    // const verifyResult = await payload.verifyEmail({
    //   collection: 'customers',
    //   token,
    // })

    // console.log({ verifyResult })

    return NextResponse.next()
  }

  return NextResponse.next()
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
