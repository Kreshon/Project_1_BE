import { Reimbursement } from "../src/entities/reimbursement";
import { ReimbursementDao } from "../src/daos/reimbursement-dao";

describe("Reimbursement DAO Tests", ()=>{

    const reimbursementDao: ReimbursementDao = new ReimbursementDao();
    let testReimbursement: Reimbursement = {id: "", employeeId: "", amount: 50, status: "pending", commentEmployee: "", commentManager: "", file: ""}

    it("Should create a reimbursement", async ()=>{
        let returnedReimbursement: Reimbursement = await reimbursementDao.createReimbursement(testReimbursement);
        expect(returnedReimbursement.id).toBeTruthy();
        testReimbursement = returnedReimbursement;
    })
    
    it("Should get all reimbursements",  async ()=>{
                const reimbursement:Reimbursement[] = await reimbursementDao.getAllReimbursements();
        expect(reimbursement.length).toBeGreaterThan(0);
    })

    it("Should update a reimbursement", async ()=>{
        testReimbursement.status = "approved";
        await reimbursementDao.updateReimbursement(testReimbursement);
        let updatedTestReimbursement = await reimbursementDao.getReimbursementById(testReimbursement.id);
        expect(updatedTestReimbursement.status).toBe("approved");
    });

    it("Should delete a reimbursement", async ()=>{
        const response = await reimbursementDao.deleteReimbursementById(testReimbursement.id)
        expect(response).toBe(true);
    });
    
})