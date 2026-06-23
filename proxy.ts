import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/add-recipe'];
const publicRoutes = ['/auth/login', '/auth/register'];

function routeMatches(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const sessionId = cookieStore.get('sessionId')?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    routeMatches(pathname, route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    routeMatches(pathname, route)
  );

  const isAuthenticated = Boolean(accessToken);
  const hasSessionCookie = Boolean(refreshToken || sessionId);

  if (!isAuthenticated && hasSessionCookie) {
    try {
      const data = await checkServerSession();
      const setCookie = data.headers['set-cookie'];

      const updatedAccessToken = cookieStore.get('accessToken')?.value;
      const isNowAuthenticated = Boolean(updatedAccessToken);

      const response =
        isPublicRoute && isNowAuthenticated
          ? NextResponse.redirect(new URL('/', request.url))
          : NextResponse.next();

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path || parsed.path || '/',
            maxAge: Number(parsed['Max-Age']) || undefined,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          };

          if (parsed.accessToken)
            response.cookies.set('accessToken', parsed.accessToken, options);
          if (parsed.refreshToken)
            response.cookies.set('refreshToken', parsed.refreshToken, options);
          if (parsed.sessionId)
            response.cookies.set('sessionId', parsed.sessionId, options);
        }
      }

      return response;
    } catch (error) {
      console.error('Middleware automatic session refresh error:', error);
    }
  }

  if (!isAuthenticated) {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/recipes/:path*',
    '/add-recipe',
    '/auth/login',
    '/auth/register',
  ],
};
