import { Reimbursement } from "../entities/reimbursement";


export interface ReimbursementDao{
    updateReimbursement(reimbursement: Reimbursement): Promise<Reimbursement>;

    createReimbursement(reimbursement:Reimbursement): Promise<Reimbursement>

    getAllReimbursements(): Promise<Reimbursement[]>
    
    getReimbursementById(id: string): Promise<Reimbursement>

}