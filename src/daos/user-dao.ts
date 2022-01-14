import { User } from "../entities/user";
import { v4 } from "uuid";
import { CosmosClient } from "@azure/cosmos";
import Errors, { ResourceNotFoundError } from "../../error-handler/error-handler";

export class UserDao{
    
   
    private user = new CosmosClient(process.env.COSMOS_CONNECTION)
    private database = this.user.database('Project')
    private container = this.database.container('user-credentials')


    async getUserByUsername(psn: string): Promise<User> {
        const response = await this.container.items.query({
            query:"SELECT * from c WHERE c.username = @username",
            parameters:[{name:"@username",value:psn}]
        }).fetchAll();
        const {
            fname,
            lname,
            id,
            username,
            password,
            isManager,
        } = response.resources[0];
        if(!response){
            throw new ResourceNotFoundError(`The resource with the username ${username} was not found`)
        }
        return {
            fname,
            lname,
            id,
            username,
            password,
            isManager,
        };
    }

    async getUserById(userId: string): Promise<User> {
        const response = await this.container.item(userId, userId).read<User>();
        if(!response.resource){
            throw new ResourceNotFoundError(`The resource with id ${userId} was not found`)
        }
        return response.resource;
    }

    async updateUser(updatedUser: User): Promise<User> {
        
        await this.getUserById(updatedUser.id);
        const response = await this.container.items.upsert<User>(updatedUser)
        return updatedUser;
    }

    async createUser(user: User): Promise<User> {
        user.id = v4();
        const response = await this.container.items.create<User>(user)
        return (response.resource)
    }

    async getAllUsers(): Promise<User[]> {
        const response = await this.container.items.readAll<User>().fetchAll();
        return response.resources.map(x => ({fname: x.fname, lname: x.lname, id: x.id, username: x.username, password: x.password, isManager: x.isManager}))
    }

    async deleteUserById(userId: string): Promise<boolean>{
        await this.getAllUsers();
        const response = await this.container.item(userId,userId).delete();
        return true
    }

}
