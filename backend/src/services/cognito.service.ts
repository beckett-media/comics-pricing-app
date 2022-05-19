import axios from "axios"
import querystring from "querystring"
import { config } from "../loader"
import AWS from "aws-sdk"
import process from "process"
import { getField } from "../config"
import VError from "verror"
import { HttpCode } from "../constants/httpCode"

AWS.config.loadFromPath(getField(process.env, "CONFIG_FILEPATH"))
AWS.config.update({ region: "us-east-1" })
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider()

const COGNITO_API_URL = "https://comics.auth.us-east-1.amazoncognito.com/oauth2/token"


export function verifyUser(code: string): Promise<{ access_token: string }> {
  return axios.post<{ access_token: string }>(
    COGNITO_API_URL,
    querystring.stringify({
      grant_type: "authorization_code",
      client_id: config.cognitoClientId,
      code,
      // TODO(michael-sriram): can we just say /api/user/login here? or how do we populate with the server's url
      redirect_uri: "http://localhost:9000/api/user/login/",
    }),
  ).then(res => res.data)
}


export async function createUser(username: string, email: string) {
  const params = {
    UserPoolId: config.cognitoUserPoolId,
    Username: username,
    DesiredDeliveryMediums: [
      "EMAIL",
    ],
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "custom:admin",
        Value: "false",
      },
    ],
  }
  try {
    return cognitoIdentityServiceProvider.adminCreateUser(params).promise()
  } catch (err) {
    throw new VError(
      {
        name: "Cognito Error",
        info: { code: HttpCode.BAD_REQUEST },
        cause: err as Error,
      },
      "Failed to sign up user",
    )
  }
}
