import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Verifique se a requisição possui cookies de sessão
  const sessionCookie = req.cookies.get('__Secure-next-auth.session-token');
  const signInUrl = new URL('/', req.url); 
  const dashboardUrl = new URL('dashboard', req.url);

  /**Se eu não tiver token de sessão ->
   * caso eu esteja tentando acessar a pagina de login next();
   * caso não seja ela redireciona para ela
   */

  /**Se eu tiver um token ->
   *  caso o usuario tenha um token e tente acessar a pagina de login redirecionado para dashboard até fazer loagout
   *  outras rotas privadas estão liberadas
   */
  if (!sessionCookie) {

    if(req.nextUrl.pathname === '/')
    {
      return NextResponse.next();
    }
    
    return NextResponse.redirect(signInUrl);
  }

  if(req.nextUrl.pathname === '/') {
    return NextResponse.redirect(dashboardUrl)
  }
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
