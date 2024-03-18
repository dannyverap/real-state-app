import { Request } from "express";
import { payload } from "./payload.interface";

export interface RequestExt extends Request {
    payload?: payload
}
