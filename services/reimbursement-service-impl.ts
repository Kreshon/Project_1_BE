import { ReimbursementDao } from "../src/daos/reimbursement-dao";
import { Reimbursement } from "../src/entities/reimbursement";
import { ReimbursementService } from "./reimbursement-service"

export class ReimbursementServiceImpl implements ReimbursementService{

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

    registerReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
        return this.reimbursementDao.createReimbursement(reimbursement);
    }

}