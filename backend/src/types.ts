import { Request } from "express"
import { ParamsDictionary } from "express-serve-static-core"

// TODO(michael-sriram): is there any way to specify type parameters directly
// [https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express/index.d.ts]
// [https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-serve-static-core/index.d.ts]
export type RequestWithParams<P> = Request<P>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestWithQueryParams<ReqQuery> = Request<ParamsDictionary, any, any, ReqQuery>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestWithBody<ReqBody> = Request<ParamsDictionary, any, ReqBody>
