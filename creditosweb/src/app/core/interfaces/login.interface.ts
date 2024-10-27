export interface LoginResponse{
    accessToken:string;
    status?:string;
    msg:string;
    code:number;
    redirect:string;
    name:string;
    iperfil:string;
    rol:string;
}

export interface loginRequest{
    username:string;
    password:string;
}

