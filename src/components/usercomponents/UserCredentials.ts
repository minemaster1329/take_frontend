export enum UserRole {
    User,
    Admin
}

export type NewUser = {
    name: string,
    password:string,
    role: string
}

export type UserCredentials = {
    name: string
    password: string
}