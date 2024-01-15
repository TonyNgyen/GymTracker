export const authConfig = {
    pages: {
      signIn: "/login",
    },
    providers: [],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.isAdmin = user.isAdmin;
          token.workouts = user.workouts;
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user.id = token.id;
          session.user.isAdmin = token.isAdmin;
          session.user.workouts = token.workouts;
        }
        return session;
      },
      authorized({ auth, request }) {
        const user = auth?.user;
        const isOnWorkoutsPage = request.nextUrl?.pathname.startsWith("/workouts");
        const isOnCreatePage = request.nextUrl?.pathname.startsWith("/create");
        const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
  
        // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
        if (isOnWorkoutsPage && (user == null)) {
          return Response.redirect(new URL("/create", request.nextUrl))
        }

        if (isOnCreatePage && user) {
          return Response.redirect(new URL("/", request.nextUrl))
        }
  
        // ONLY AUTHENTICATED USERS CAN REACH THE LOGIN PAGE
  
        if (isOnLoginPage && user) {
          return Response.redirect(new URL("/", request.nextUrl))
        }
  
        return true
  
      },
    },
  };
  