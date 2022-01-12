import { User } from "../src/entities/user";
import { UserDao } from "../src/daos/user-dao";

describe("User DAO Tests", ()=>{

    const userDao: UserDao = new UserDao();
    let testUser: User = {fname: "Nick", lname:"Kreshon", id:"", username:"", password:"", isManager: true};

    it("Should create a user", async ()=>{
        let returnedUser: User = await userDao.createUser(testUser);
        expect(returnedUser.id).toBeTruthy();
        testUser = returnedUser;
    })
    
    it("Should get all users",  async ()=>{
                const user:User[] = await userDao.getAllUsers();
        expect(user.length).toBeGreaterThan(0);
    })

    it("Should update a user", async ()=>{
        testUser.username = "sampleUsername";
        await userDao.updateUser(testUser);
        let updatedTestUser = await userDao.getUserById(testUser.id);
        expect(updatedTestUser.username).toBe("sampleUsername");
    });

    it("Should delete a user", async ()=>{
        const response = await userDao.deleteUserById(testUser.id)
        expect(response).toBe(true);
    });
    
});