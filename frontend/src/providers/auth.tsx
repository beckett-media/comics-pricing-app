import * as React from "react";
import { Auth, Hub } from "aws-amplify";

type AuthData = {
  isLoggedIn: boolean;
  isAuthChecking: boolean;
  currentUser: any; // Not sure if this is worth it
}

const AuthContext = React.createContext({} as AuthData);

function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

function AuthProvider(props: any) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAuthChecking, setIsAuthChecking] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    Hub.listen("auth", (data) => {
      const { payload } = data;

      // Possible event values can be found at https://docs.amplify.aws/guides/authentication/listening-for-auth-events/q/platform/js/

      console.log('payload', payload);

      if (payload.event === "signIn") {
        // user sign in success
        setIsLoggedIn(true);
      }

      if (payload.event === "signOut") {
        // user sign out
        setIsLoggedIn(false);
      }

    });

    setIsAuthChecking(true);
    Auth.currentAuthenticatedUser({
      bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
    // Auth.currentUserInfo()
      .then((user) => {
        console.log('current user', user);
        if (user) {
          setIsLoggedIn(true);
          setCurrentUser(user);
        }
      })
      .catch((e) => {
        setIsLoggedIn(false);
        console.error(e);
      })
      .finally(() => {
        setIsAuthChecking(false);
      });

  }, []);
  
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAuthChecking,

        currentUser
      }}
      {...props}
    />
  );
}

export { AuthProvider, useAuth };
