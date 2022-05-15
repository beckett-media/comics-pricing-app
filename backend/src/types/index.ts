import { Request } from "express"

export type RequestWithBody<Body> = Request<any, any, Body, any>
export type RequestWithParams<Params> = Request<Params, any, any, any>
export type RequestWithQueryParams<Params> = Request<any, any, Params, any>
