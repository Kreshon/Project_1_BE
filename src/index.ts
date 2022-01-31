import express from 'express';
import { UserDao } from './daos/user-dao';
import { UserService } from '../services/user-service'
import { User } from './entities/user';
import { Reimbursement } from './entities/reimbursement';
import { ReimbursementService } from '../services/reimbursement-service'
import { ReimbursementDao } from './daos/reimbursement-dao';
import cors from 'cors'
import winston from 'winston'
import logConfig from '../utils/logger'


const app = express();
app.use(express.json());
app.use(cors());

const userDao: UserDao = new UserDao();
const userService: UserService = new UserService(userDao);

const reimbursementDao: ReimbursementDao = new ReimbursementDao();
const reimbursementService: ReimbursementService = new ReimbursementService(reimbursementDao);


const logger = winston.createLogger(logConfig);


app.patch("/login", async (req,res) =>{
    console.log(req.body)
    const loginPayload:{username:string, password:string} = req.body;
    console.log(loginPayload)
    try {const user: User = await userService.getUserByUsername(loginPayload.username);
        if(loginPayload.password === user.password){
            res.status(200);
            res.send(user);
            logger.info("Login username and password matched");
        }else{
            res.status(400);
            res.send("Unable to login, check that your password is correct");
            logger.info("Password is imcorrect");
        }}catch(error){
            res.status(418);
            res.send("Unable to login, check that your username is correct");
            logger.info("Username is imcorrect");
        }
})

app.post("/users", async (req,res)=>{
    console.log(req.body)
    const user: User = req.body.user;
    const savedUser: User = await userService.createUser(user);
    res.status(201);
    res.send(savedUser);
    logger.info("New user was created");
})

app.get("/users", async (req,res)=>{
    const users:User[] = await userService.retrieveAllUser();
    res.status(200);
    res.send(users);
    logger.info("Got all users")
})

app.put("/users/:id", async (req,res)=>{
    const updatedUser: User = req.body.user;
    const patchedUser: User = await userService.updateUser(updatedUser);
    res.status(200);
    res.send(patchedUser);
    logger.info("Update to user")
})

app.get("/users/:id", async (req,res)=>{
    const userId: string = req.params.id;
    const selectedUser: User = await userService.getUserById(userId);
    res.status(200);
    res.send(selectedUser)
    logger.info("Selected user by ID")
})

app.delete("/users/:id", async (req,res)=>{
    const userID: string = req.body.id;
    const removedUser: boolean = await userService.deleteUserById(userID);
    res.status(200);
    res.send(removedUser)
    logger.info("Deleted user")
})

app.post("/reimbursements", async (req,res)=>{
    const reimbursement: Reimbursement = req.body;
    const savedReimbursement: Reimbursement = await reimbursementService.createReimbursement(reimbursement);
    res.status(201);
    res.send(savedReimbursement);
    logger.info("New reimbursement was created");
})

app.get("/reimbursements", async (req,res)=>{
    const reimbursements:Reimbursement[] = await reimbursementService.retrieveAllReimbursement();
    res.status(200);
    res.send(reimbursements);
    logger.info("Got all reimbursements");
})

app.put("/reimbursements/:id", async (req,res)=>{
    console.log(req.body)
    const updatedReimbursement: Reimbursement = req.body;
    const patchedReimbursement: Reimbursement = await reimbursementService.updateReimbursement(updatedReimbursement);
    res.status(200);
    res.send(patchedReimbursement);
    logger.info("Update to reimbursement")
})

app.get("/reimbursements/:id", async (req,res)=>{
    const reimbursementId: string = req.params.id;
    const selectedReimbursement: Reimbursement = await reimbursementService.getReimbursementById(reimbursementId);
    res.status(200);
    res.send(selectedReimbursement);
    logger.info("Selected reimbursement by ID");
})

app.delete("/reimbursements/:id", async (req,res)=>{
    const reimbursementID: string = req.body.id;
    const removedReimbursement: boolean = await reimbursementService.deleteReimbursementById(reimbursementID);
    res.status(200);
    res.send(removedReimbursement);
    logger.info("Deleted reimbursement")
})

app.listen(process.env.PORT ?? 4444, ()=>{
    console.log("Reimbursement Application Started")
});