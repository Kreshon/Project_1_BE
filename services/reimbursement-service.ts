import { Reimbursement } from "../src/entities/reimbursement";


export interface ReimbursementService{

    getReimbursementById(reimbursementId: string): Promise<Reimbursement>

    updateReimbursement(reimbursement: Reimbursement): Promise<Reimbursement>
    
    retrieveAllReimbursement(): Promise<Reimbursement[]>
    
    registerReimbursement(reimbursement:Reimbursement): Promise<Reimbursement>

}