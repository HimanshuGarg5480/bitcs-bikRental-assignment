import { Role } from "src/user/user.entity";

export type CreateUserParm = {
    username: string;
    email: string;
    password: string;
    role?:Role;
}

export type LoginUserParm = {
    email: string;
    password: string;
}