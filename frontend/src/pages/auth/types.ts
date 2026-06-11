export interface propsdata
{
    type:string,
    onsubmit:(data:userdatatype)=>void
}

export interface userdatatype
{
    email:string,
    password:string,
    username:string
}

export interface userlogintype
{
    email:string,
    password:string
}