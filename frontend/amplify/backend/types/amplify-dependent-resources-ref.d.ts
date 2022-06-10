export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "comicsfrontendffefd2ca": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "function": {
        "S3Trigger9ddabae6": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "apiFunction": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "AdminQueriese42f3901": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "storage": {
        "comicss3image": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "api": {
        "comicsapi": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "AdminQueries": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "watchlistApi": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "analytics": {
        "comicsfrontend": {
            "Region": "string",
            "Id": "string",
            "appName": "string"
        }
    }
}