import { NextRequest, NextResponse } from "next/server";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
 
const locales = ['en-US', 'pt']

// Get the preferred locale, similar to the above or using a library
function getLocale() {
    const headers = { 'accept-language': 'en-US,en;q=0.5' }
    const languages = new Negotiator({ headers }).languages()
    const defaultLocale = 'en-US'
 
    return match(languages, locales, defaultLocale) // -> 'en-US'
}
 
export function middleware(request: NextRequest) {
  console.log("RUN MIDDLEWARE")
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return
 
  // Redirect if there is no locale
  const locale = getLocale()

  console.log("getLocale ->", getLocale)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    '/'
  ],
}