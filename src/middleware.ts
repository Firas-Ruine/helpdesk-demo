import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import createIntlMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"
import { routesName } from "./interfaces/routeName.interface"

const ROUTES = {
  public: [routesName.login],
  protected: [routesName.dashboard],
  advisor: [routesName.advisor],
}

const intlMiddleware = createIntlMiddleware(routing)

function isPathInRoutes(pathname: string, routes: string[]): boolean {
  return routes.some((route) => pathname.includes(route))
}

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.includes("/_next") ||
    pathname.includes("/api") ||
    pathname.includes("/trpc") ||
    pathname.includes("/vercel") ||
    /\.(css|js|jpg|jpeg|png|svg|ico|json|woff|woff2|ttf|otf)$/.test(pathname)
  )
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (isStaticAsset(pathname)) {
    return NextResponse.next()
  }

  const token = request.cookies.get("token")?.value
  const isAuthenticated = !!token

  const isUser = false

  if (!isAuthenticated && isPathInRoutes(pathname, [...ROUTES.protected, ...ROUTES.advisor])) {
    return NextResponse.redirect(new URL(routesName.login, request.url))
  }

  if (isAuthenticated) {
    if (isPathInRoutes(pathname, ROUTES.public)) {
      return NextResponse.redirect(new URL(routesName.dashboard, request.url))
    }

    if (isUser) {
      if (isPathInRoutes(pathname, ROUTES.protected)) {
        return NextResponse.redirect(new URL(routesName.advisor, request.url))
      }
    } else {
      if (isPathInRoutes(pathname, ROUTES.advisor)) {
        return NextResponse.redirect(new URL(routesName.dashboard, request.url))
      }
    }
  }

  // If all checks pass, proceed with internationalization middleware
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    routesName.dashboard,
    routesName.login,
    routesName.advisor,
  ],
}

