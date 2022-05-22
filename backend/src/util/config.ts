import config from "config"

export type Config = {
  cognitoAwsRegion: string
  cognitoClientId: string
  cognitoUserPoolId: string
  dbHost: string
  dbName: string
  dbUsername: string
  dbPassword: string
  jwtSecret: string
  port: number
}

export const configFromEnv = (): Config => {
  return {
    cognitoAwsRegion: config.get("cognitoAwsRegion"),
    cognitoClientId: config.get("cognitoClientId"),
    cognitoUserPoolId: config.get("cognitoUserPoolId"),
    dbHost: config.get("dbHost"),
    dbName: config.get("dbName"),
    dbPassword: config.get("dbPassword"),
    dbUsername: config.get("dbUsername"),
    jwtSecret: config.get("jwtSecret"),
    port: Number.parseInt(config.get("port")),
  }
}
