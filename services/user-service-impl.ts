import { UserDao } from "../src/daos/user-dao";
import { User } from "../src/entities/user";
import { UserService } from "./user-service"

export class UserServiceImpl implements UserService{

    private userDao:UserDao;
    constructor(userDao:UserDao){
        this.userDao = userDao;
    }

    getUserById(userId: string): Promise<User> {
        return this.userDao.getUserById(userId);
    }

    updateUser(user: User): Promise<User> {
        return this.userDao.updateUser(user);
    }

    retrieveAllUser(): Promise<User[]> {
        return this.userDao.getAllUsers();
    }

    registerUser(user: User): Promise<User> {
        return this.userDao.createUser(user);
    }

}