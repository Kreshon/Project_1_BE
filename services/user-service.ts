import { User } from "../src/entities/user";


export interface UserService{

    getUserById(userId: string): Promise<User>

    updateUser(user: User): Promise<User>
    
    retrieveAllUser(): Promise<User[]>
    
    registerUser(user:User): Promise<User>

}