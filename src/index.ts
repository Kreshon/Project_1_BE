import express from 'express';
import { UserDao } from './daos/user-dao';
import { UserDaoLocal } from './daos/user-dao-impl-local';
import { UserService } from '../services/user-service'
import { UserServiceImpl } from '../services/user-service-impl'
import { User } from './entities/user';


const app = express();
app.use(express.json());

const userDao: UserDao = new UserDaoLocal();
const userService: UserService = new UserServiceImpl(userDao);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.post("/users", async (req,res)=>{
    const user: User = req.body;
    const savedUser: User = await userService.createUser(user);
    res.status(201);
    res.send(savedUser);
})

app.get("/users", async (req,res)=>{
    const users:User[] = await userService.retrieveAllUser();
    res.status(200);
    res.send(users);
})

app.put("/users/:id", async (req,res)=>{
    const updatedUser: User = req.body;
    const patchedUser: User = await userService.updateUser(updatedUser);
    res.status(200);
    res.send(patchedUser);
})

app.get("/users/:id", async (req,res)=>{
    const userId: string = req.body;
    const selectedUser: User = await userService.getUserById(userId);
    res.status(200);
    res.send(selectedUser)
})

app.delete("/users/:id", async (req,res)=>{
    const userID: string = req.body;
    const removedUser: boolean = await userService.deleteUserById(userID);
    res.status(200);
    res.send(removedUser)
})

app.listen(4444,()=>console.log("Reimbursement Application Started"));