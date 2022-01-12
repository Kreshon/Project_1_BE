import { ReimbursementDao } from "../src/daos/reimbursement-dao";
import { Reimbursement } from "../src/entities/reimbursement";

export class ReimbursementService{

    private reimbursementDao:ReimbursementDao;
    constructor(reimbursementDao:ReimbursementDao){
        this.reimbursementDao = reimbursementDao;
    }

    getReimbursementById(reimbursementId: string): Promise<Reimbursement> {
        return this.reimbursementDao.getReimbursementById(reimbursementId);
    }

    updateReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
        return this.reimbursementDao.updateReimbursement(reimbursement);
    }

    retrieveAllReimbursement(): Promise<Reimbursement[]> {
        return this.reimbursementDao.getAllReimbursements();
    }

    createReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
        return this.reimbursementDao.createReimbursement(reimbursement);
    }

    deleteReimbursementById(userId: string): Promise<boolean> {
        return this.reimbursementDao.deleteReimbursementById(userId)
    }

}