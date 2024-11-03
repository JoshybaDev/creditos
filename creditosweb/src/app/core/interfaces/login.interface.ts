import { Rol } from "./role.interface";

export interface LoginResponse{
    accessToken:string;
    status?:string;
    msg:string;
    code:number;
    redirect:string;
    name:string;
    iperfil:string;
    roles:Rol[];
}


export interface LoginRequest{
    username:string;
    password:string;
}

