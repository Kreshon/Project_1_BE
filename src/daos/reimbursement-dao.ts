import { Reimbursement } from "../entities/reimbursement"
import { v4 } from "uuid";
import { CosmosClient } from "@azure/cosmos";
import Errors, { ResourceNotFoundError } from "../../error-handler/error-handler";



export class ReimbursementDao{
    

    private reimbursement = new CosmosClient(process.env.COSMOS_CONNECTION)
    private database = this.reimbursement.database('Project')
    private container = this.database.container('reimbursements')


    async getReimbursementById(reimbursementId: string): Promise<Reimbursement> {
        const response = await this.container.item(reimbursementId, reimbursementId).read<Reimbursement>();
        if(!response.resource){
            throw new ResourceNotFoundError(`The resource with id ${reimbursementId} was not found`)
        }
        return response.resource;
    }

    async updateReimbursement(updatedReimbursement: Reimbursement): Promise<Reimbursement> {
        await this.getReimbursementById(updatedReimbursement.id);
        const response = await this.container.items.upsert<Reimbursement>(updatedReimbursement)
        return updatedReimbursement;
    }

    async createReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
        reimbursement.id = v4();
        const response = await this.container.items.create<Reimbursement>(reimbursement)
        return (response.resource)
    }

    async getAllReimbursements(): Promise<Reimbursement[]> {
        const response = await this.container.items.readAll<Reimbursement>().fetchAll();
        return response.resources.map(x => ({id: x.id, employeeId: x.employeeId, amount: x.amount, status: x.status, commentEmployee: x.commentEmployee, commentManager: x.commentManager, file: x.file}))
    }

    async deleteReimbursementById(id: string): Promise<boolean>{
        await this.getAllReimbursements();
        const response = await this.container.item(id,id).delete();
        return true
    }

}
