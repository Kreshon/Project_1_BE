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

app.post("/users", async (req,res)=>{
    const user:User = req.body;
    const savedUser: User = await userService.registerUser(user);
    res.status(200);
    res.send(savedUser);
})

app.get("/users", async (req,res)=>{
    const users:User[] = await userService.retrieveAllUser();
    res.status(200);
    res.send(users);
})

app.listen(4444,()=>console.log("Reimbursement Application Started"));