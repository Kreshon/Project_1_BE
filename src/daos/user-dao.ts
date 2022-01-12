import { User } from "../entities/user";
import { readFile, writeFile } from 'fs/promises'
import { v4 } from "uuid";
import { CosmosClient } from "@azure/cosmos";

export class UserDao{
    
   
    // private user = new CosmosClient(process.env.COSMOS_CONNECTION)
    // private database = this.user.database('project')
    // private container = this.database.container('user-credentials')

    // constructor(private userDao: UserDao){}

    async getUserByUsername(username: string): Promise<User> {
        const file = await readFile('//Users//nickkreshon//Desktop//project_1_be//localusers.json');
        const text: string = await file.toString();
        const users:User[] = JSON.parse(text);
        const user = users.find(user => user.username === username);
        return user;
    }

    async getUserById(userId: string): Promise<User> {
        const file = await readFile('//Users//nickkreshon//Desktop//project_1_be//localusers.json');
        const text: string = await file.toString();
        const users:User[] = JSON.parse(text);
        const user = users.find(user => user.id === userId);
        // if(!user){
        //     throw new Error(`The User with id ${userId} was not found`);
        // }
        return user;
    }

    async updateUser(updatedUser: User): Promise<User> {
        const users = await this.getAllUsers();
        users[users.findIndex(element => element.id === updatedUser.id)] = updatedUser
        await writeFile('//Users//nickkreshon//Desktop//project_1_be//localusers.json', JSON.stringify(users));
        return updatedUser
    }

    async createUser(user: User): Promise<User> {
        const file = await readFile('//Users//nickkreshon//Desktop//project_1_be//localusers.json');
        const text: string = await file.toString();
        const users:User[] = JSON.parse(text);
        user.id = v4();
        users.push(user);
        await writeFile('//Users//nickkreshon//Desktop//project_1_be//localusers.json', JSON.stringify(users))
        return user;
    }

    async getAllUsers(): Promise<User[]> {
        const file = await readFile('//Users//nickkreshon//Desktop//project_1_be//localusers.json');
        const text: string = await file.toString();
        const users:User[] = JSON.parse(text);
        return users;
    }

    async deleteUserById(userId: string): Promise<boolean>{
        const users = await this.getAllUsers();
        const filteredUsers = users.filter(user => user.id !== userId)
        await writeFile('//Users//nickkreshon//Desktop//project_1_be//localusers.json', JSON.stringify(filteredUsers))
        return true
    }

}