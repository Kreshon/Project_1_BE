import { User } from "../src/entities/user";


export interface UserService{

    getUserById(userId: string): Promise<User>

    updateUser(user: User): Promise<User>
    
    retrieveAllUser(): Promise<User[]>
    
    createUser(user:User): Promise<User>

    deleteUserById(userId: string): Promise<boolean>

}