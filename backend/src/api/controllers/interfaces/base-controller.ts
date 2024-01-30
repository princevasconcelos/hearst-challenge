import { Request } from "express";

export interface BaseController<T> {
    handle: (req: Request) => Promise<T>
}