import { NextResponse } from 'next/server'
export const authConfig = {
  pages: {
    signIn: "/signin",
    // signUp: "/signup",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin ?? false;
      }
      // console.log(session)
      return session;
    },
    authorized({ auth, request }) {
      // console.log(auth)
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/dashboard");
      const sellProduct = request.nextUrl?.pathname.startsWith("/sell");
      const isOnSigninPage = request.nextUrl?.pathname.startsWith("/signin");
      const isOnSignupPage = request.nextUrl?.pathname.startsWith("/signup");

      // ONLY ADMIN CAN REACH ADMIN DASHBOARD
      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }
      //ONLY UNAUTHINTICATD USERS CAN REACH THE LOGIN PAGE
      if (isOnSigninPage && user) {
        return NextResponse.redirect(new URL('/', request.url))
        // return Response.redirect(new URL("/", request.nextUrl));
        // return false
      }
      if (sellProduct && !user) {
        return NextResponse.redirect(new URL('/', request.url))
        // return Response.redirect(new URL("/", request.nextUrl));
        // return false
      }

      //ONLY UNAUTHINTICATD USERS CAN REACH THE SIGNUP PAGE
      if (isOnSignupPage && user) {
        return NextResponse.redirect(new URL('/', request.url))
        // return Response.redirect(new URL("/", request.nextUrl));
        //   return false
      }
      return true;
    },
  },
};
