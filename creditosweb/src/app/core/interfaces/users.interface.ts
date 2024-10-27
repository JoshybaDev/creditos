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
    rol?:string;
}

export interface UserResponse{
    status?:string;
    msg:string;
    code:number;
    redirect:string;
}