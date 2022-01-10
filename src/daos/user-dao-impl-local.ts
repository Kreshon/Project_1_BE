import { User } from "../entities/user";
import { UserDao } from "./user-dao";
import { readFile, writeFile } from 'fs/promises'
import { v4 } from "uuid";

export class UserDaoLocal implements UserDao{

    // private user = new CosmosUser(process.env.'//Users//nickkreshon//Desktop//project_1_be//localusers.json')
    // private database = this.user.database('project_0')
    // private container = this.database.container('clients')

    // constructor(private userDao: UserDao){}

    async getUserById(userId: string): Promise<User> {
        const file = await readFile('//Users//nickkreshon//Desktop//project_1_be//localusers.json');
        const text: string = await file.toString();
        const users:User[] = JSON.parse(text);
        const user = users.find(user => user.id === userId);
        if(!user){
            throw new Error(`The User with id ${userId} was not found`); 
        }
        return user;
    }

    async updateUser(updatedUser: User): Promise<User> {
        const users = await this.getAllUsers();
        users[users.findIndex(element => element.id === updatedUser.id)] = updatedUser
        writeFile('//Users//nickkreshon//Desktop//project_1_be//localusers.json', JSON.stringify(users));
        return updatedUser
    }

    async createUser(user: User): Promise<User> {
        const file = await readFile('//Users//nickkreshon//Desktop//project_1_be//localusers.json');
        const text: string = await file.toString();
        const users:User[] = JSON.parse(text);
        user.id = v4();
        users.push(user);
        writeFile('//Users//nickkreshon//Desktop//project_1_be//localusers.json', JSON.stringify(users))
        return user;
    }

    async getAllUsers(): Promise<User[]> {
        const file = await readFile('//Users//nickkreshon//Desktop//project_1_be//localusers.json');
        const text: string = await file.toString();
        const users:User[] = JSON.parse(text);
        return users;
    }

    async deleteUserById(id: string): Promise<boolean>{
        const users = await this.getAllUsers();
        const filteredUsers = users.filter(user => user.id !== id)
        writeFile('//Users//nickkreshon//Desktop//project_1_be//localusers.json', JSON.stringify(filteredUsers))
        return true
    }

}