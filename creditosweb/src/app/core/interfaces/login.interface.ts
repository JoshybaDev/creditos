import { Rol } from "./roles.interface";

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


export interface loginRequest{
    username:string;
    password:string;
}
