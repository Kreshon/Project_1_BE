import { User } from "../src/entities/user";
import { UserDao } from "../src/daos/user-dao";
import { UserDaoLocal } from "../src/daos/user-dao-impl-local";

describe("User DAO Tests", ()=>{

    const userDao: UserDao = new UserDaoLocal();
    let testUser: User = {fname: "Nick", lname:"Kreshon", id:"", username:"", password:"", isManager: true} 

    it("Should create a user", async ()=>{
        const returnedUser: User = await userDao.createUser(testUser);
        expect(returnedUser.id).toBeTruthy();
    })
// Can I remove lines 16-21 now that they are already created?
    it("Should get all users",  async ()=>{
        const user1: User = {fname: "Farell", lname:"Thompson", id:"", username:"", password:"", isManager: true}
        const user2: User = {fname: "Matt", lname:"Krut", id:"", username:"", password:"", isManager: false}
        const user3: User = {fname: "Devin", lname:"Patterson", id:"", username:"", password:"", isManager: false}
        await userDao.createUser(user1);
        await userDao.createUser(user2);
        await userDao.createUser(user3);

        const user:User[] = await userDao.getAllUsers();
        expect(user.length).toBeGreaterThan(3);
    })

    //update
    // Again do I specify now a difference between employee and manager?
    // Or am I going to implement that later on after setting up more of the front end stuff?
    it("Should update a user", async ()=>{

    });

    //delete
    it("Should delete a user", async ()=>{

    });
    
});