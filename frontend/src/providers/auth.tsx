import * as React from "react"
import { Auth, Hub, Analytics } from "aws-amplify"

type AuthData = {
  isLoggedIn: boolean
  isAuthChecking: boolean
  currentUser: any
}

const AuthContext = React.createContext({} as AuthData)

function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

function AuthProvider(props: any) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [isAuthChecking, setIsAuthChecking] = React.useState(true)
  const [currentUser, setCurrentUser] = React.useState<any>(null)

  React.useEffect(() => {
    Hub.listen("auth", (data) => {
      const { payload } = data

      // Possible event values can be found at https://docs.amplify.aws/guides/authentication/listening-for-auth-events/q/platform/js/

      if (payload.event === "signIn") {
        // user sign in success
        setIsLoggedIn(true)
      }

      if (payload.event === "signOut") {
        // user sign out
        setIsLoggedIn(false)
      }
    })

    setIsAuthChecking(true)
    Auth.currentAuthenticatedUser({
      bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      // Auth.currentUserInfo()
      .then((user) => {
        if (user) {
          setIsLoggedIn(true)
          setCurrentUser(user)

          Analytics.autoTrack("pageView", {
            // REQUIRED, turn on/off the auto tracking
            enable: true,
            // OPTIONAL, the event name, by default is 'pageView'
            eventName: "pageView",
            // OPTIONAL, the attributes of the event, you can either pass an object or a function
            // which allows you to define dynamic attributes
            attributes: {
                attr: user.attributes.email,
            },
            // OPTIONAL, events you want to track, by default is 'click'
            events: ["click"],
            // OPTIONAL, the prefix of the selectors, by default is 'data-amplify-analytics-'
            // in order to avoid collision with the user agent, according to https://www.w3schools.com/tags/att_global_data.asp
            // always put 'data' as the first prefix
            selectorPrefix: "data-amplify-analytics-",
            // OPTIONAL, by default is 'multiPageApp'
            // you need to change it to 'SPA' if your app is a single-page app like React
            type: "SPA",
            // OPTIONAL, the service provider, by default is the Amazon Pinpoint
            provider: "AWSPinpoint",
            // OPTIONAL, to get the current page url
            getUrl: () => {
              // the default function
              return window.location.origin + window.location.pathname
            },
          })
        }
      })
      .catch((e) => {
        setIsLoggedIn(false)
        console.error(e)
      })
      .finally(() => {
        setIsAuthChecking(false)
      })
  }, [])

  

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAuthChecking,

        currentUser,
      }}
      {...props}
    />
  )
}

export { AuthProvider, useAuth }
