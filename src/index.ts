import express from 'express';
import { UserDao } from './daos/user-dao';
import { UserService } from '../services/user-service'
import { User } from './entities/user';
import { Reimbursement } from './entities/reimbursement';
import { ReimbursementService } from '../services/reimbursement-service'
import { ReimbursementDao } from './daos/reimbursement-dao';
import cors from 'cors'


const app = express();
app.use(express.json());
app.use(cors());

const userDao: UserDao = new UserDao();
const userService: UserService = new UserService(userDao);

const reimbursementDao: ReimbursementDao = new ReimbursementDao();
const reimbursementService: ReimbursementService = new ReimbursementService(reimbursementDao);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
  });

app.patch("/login", async (req,res) =>{
    console.log(req.body)
    const loginPayload:{username:string, password:string} = req.body;
    console.log(loginPayload)
    try {const user: User = await userService.getUserByUsername(loginPayload.username);
        if(loginPayload.password === user.password){
            console.log(user)
            res.status(200)
            res.send(user)
        }else{
            res.status(400)
            res.send("Unable to login, check that your password is correct")
        }}catch(error){
            res.status(418)
            res.send("Unable to login, check that your username is correct")
        }
})

app.post("/users", async (req,res)=>{
    console.log(req.body)
    const user: User = req.body.user;
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
    const updatedUser: User = req.body.user;
    const patchedUser: User = await userService.updateUser(updatedUser);
    res.status(200);
    res.send(patchedUser);
})

app.get("/users/:id", async (req,res)=>{
    const userId: string = req.params.id;
    const selectedUser: User = await userService.getUserById(userId);
    res.status(200);
    res.send(selectedUser)
})

app.delete("/users/:id", async (req,res)=>{
    const userID: string = req.body.id;
    const removedUser: boolean = await userService.deleteUserById(userID);
    res.status(200);
    res.send(removedUser)
})

app.post("/reimbursements", async (req,res)=>{
    const reimbursement: Reimbursement = req.body;
    const savedReimbursement: Reimbursement = await reimbursementService.createReimbursement(reimbursement);
    res.status(201);
    res.send(savedReimbursement);
})

app.get("/reimbursements", async (req,res)=>{
    const reimbursements:Reimbursement[] = await reimbursementService.retrieveAllReimbursement();
    res.status(200);
    res.send(reimbursements);
})

app.put("/reimbursements/:id", async (req,res)=>{
    console.log(req.body)
    const updatedReimbursement: Reimbursement = req.body;
    const patchedReimbursement: Reimbursement = await reimbursementService.updateReimbursement(updatedReimbursement);
    res.status(200);
    res.send(patchedReimbursement);
})

app.get("/reimbursements/:id", async (req,res)=>{
    const reimbursementId: string = req.params.id;
    const selectedReimbursement: Reimbursement = await reimbursementService.getReimbursementById(reimbursementId);
    res.status(200);
    res.send(selectedReimbursement)
})

app.delete("/reimbursements/:id", async (req,res)=>{
    const reimbursementID: string = req.body.id;
    const removedReimbursement: boolean = await reimbursementService.deleteReimbursementById(reimbursementID);
    res.status(200);
    res.send(removedReimbursement)
})

app.listen(process.env.PORT ?? 4444, ()=>{
    console.log("Reimbursement Application Started")
});