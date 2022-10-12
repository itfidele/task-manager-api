import { Request } from "express"

export interface User{
    id:number
    username:string,
    password:string
}
export interface UserAuthInfoRequest extends Request {
  user?: User // or any other type
}