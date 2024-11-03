import { Rol } from "./role.interface";

export interface User{
    id?: number;
    name?:string;
    username?:string;
    passwordA?:string;
    password?:string;
    password2?:string;
    iperfil?:string;
    createdOn?:string;
    lastUpdatedOn?:string;
    roles?:Rol[];
}

export interface UserResponse{
    status?:string;
    msg:string;
    code:number;
    redirect:string;
}