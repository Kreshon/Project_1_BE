import { Reimbursement } from "../src/entities/reimbursement";
import { ReimbursementDao } from "../src/daos/reimbursement-dao";
import { ReimbursementDaoLocal } from "../src/daos/reimbursement-dao-impl-local";

describe("Reimbursement DAO Tests", ()=>{

    const reimbursementDao: ReimbursementDao = new ReimbursementDaoLocal();
    let testReimbursement: Reimbursement = {id: "", employeeId: "", amount: 50, status: "", commentEmployee: "", commentManager: "", file: ""}

    it("Should create a reimbursement", async ()=>{
        const returnedReimbursement: Reimbursement = await reimbursementDao.createReimbursement(testReimbursement);
        expect(returnedReimbursement.id).toBeTruthy();
    });

    it("Should get all reimbursements",  async ()=>{
        const reimbursement1: Reimbursement = await {id: "2a90ae30-3994-41a0-a0a6-2dba69ae1295", employeeId: "2a90ae30-3994-41a0-a0a6-2dba69ae1295", amount: 50, status: "Approved", commentEmployee: "Lunch meeting", commentManager: "", file: ""};
        const reimbursement2: Reimbursement = await {id: "72d0a3ff-6734-487d-9c55-69c16562f4fd", employeeId: "72d0a3ff-6734-487d-9c55-69c16562f4fd", amount: 100, status: "Denied", commentEmployee: "Dinner meeting", commentManager: "", file: ""};
        const reimbursement3: Reimbursement = await {id: "8a0f977d-ab15-4ce5-ab02-715bdf1841ef", employeeId: "8a0f977d-ab15-4ce5-ab02-715bdf1841ef", amount: 150, status: "Approved", commentEmployee: "Dinner meeting", commentManager: "", file: ""};
        await reimbursementDao.createReimbursement(reimbursement1);
        await reimbursementDao.createReimbursement(reimbursement2);
        await reimbursementDao.createReimbursement(reimbursement3);

        const reimbursement:Reimbursement[] = await reimbursementDao.getAllReimbursements();
        expect(reimbursement.length).toBeGreaterThan(2);
    });

    //update
    //Do I need 
    it("Should update a reimbursement", async ()=>{

    });

    //delete
    it("Should delete a reimbursement", async ()=>{

    });

})