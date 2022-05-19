import fs from "fs"
import process from "process"
import VError from "verror"

export type Config = {
  cognitoAwsRegion: string
  cognitoClientId: string
  accessKeyId: string
  secretAccessKey: string
  region: string
  cognitoUserPoolId: string
  dbHost: string
  dbName: string
  dbUsername: string
  dbPassword: string
  jwtSecret: string
  port: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getField = <T = string>(obj: Record<string, any>, key: string): T => {
  const val = obj[key]

  if (val === undefined) {
    throw new VError("missing key: %s", key)
  }

  return val
}

export const configFromEnv = (): Config => {
  const json = JSON.parse(fs.readFileSync(getField(process.env, "CONFIG_FILEPATH")).toString())

  return {
    cognitoAwsRegion: getField(json, "cognitoAwsRegion"),
    cognitoClientId: getField(json, "cognitoClientId"),
    cognitoUserPoolId: getField(json, "cognitoUserPoolId"),
    dbHost: getField(json, "dbHost"),
    dbName: getField(json, "dbName"),
    dbPassword: getField(json, "dbPassword"),
    dbUsername: getField(json, "dbUsername"),
    jwtSecret: getField(json, "jwtSecret"),
    port: getField<number>(json, "port"),
    accessKeyId: getField(json, "accessKeyId"),
    secretAccessKey: getField(json, "secretAccessKey"),
    region: getField(json, "region"),
  }
}
