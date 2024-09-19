


import { User } from "../entities/User";


export interface CustomerRepository {
    UserGoogleLogin(user:User): Promise<any>;
}