import { NextResponse } from 'next/server'
 
const PUBLIC_FILE = /\.(.*)$/
 
export async function middleware(request) {
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return
  }
 
  if (request.nextUrl.locale === 'default') {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en'
 
    return NextResponse.redirect(
      new URL(`/${locale}${request.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    )
  }
}