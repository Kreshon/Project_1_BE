import { User } from "../entities/user";

export interface UserDao{

    createUser(user: User): Promise<User>

    getAllUsers(): Promise<User[]>
    
    getUserById(userId: string): Promise<User>

    updateUser(user: User): Promise<User>

    deleteUserById(userId: string): Promise<boolean>

}