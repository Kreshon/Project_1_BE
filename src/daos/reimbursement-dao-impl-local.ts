import { Reimbursement } from "../entities/reimbursement";
import { ReimbursementDao } from "./reimbursement-dao";
import { readFile, writeFile } from 'fs/promises'
import { v4 } from "uuid";


export class ReimbursementDaoLocal implements ReimbursementDao{

    // private reimbursement = new CosmosUser(process.env.'//Users//nickkreshon//Desktop//project_1_be//localreimbursements.json')
    // private database = this.user.database('project_0')
    // private container = this.database.container('clients')

    // constructor(private reimbursementDao: ReimbursementDao){}

    async getReimbursementById(reimbursementId: string): Promise<Reimbursement> {
        const file = await readFile('//Users//nickkreshon//Desktop//project_1_be//localreimbursements.json');
        const text: string = await file.toString();
        const reimbursements:Reimbursement[] = JSON.parse(text);
        const reimbursement = reimbursements.find(reimbursement => reimbursement.id === reimbursementId);
        if(!reimbursement){
            throw new Error(`The Reimbursement with id ${reimbursementId} was not found`); 
        }
        return reimbursement;
    }

    async updateReimbursement(updatedReimbursement: Reimbursement): Promise<Reimbursement> {
        const reimbursements = await this.getAllReimbursements();
        reimbursements[reimbursements.findIndex(element => element.id === updatedReimbursement.id)] = updatedReimbursement
        writeFile('//Users//nickkreshon//Desktop//project_1_be//localreimbursements.json', JSON.stringify(reimbursements));
        return updatedReimbursement
    }

    async createReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
        const file = await readFile('//Users//nickkreshon//Desktop//project_1_be//localreimbursements.json');
        const text: string = await file.toString();
        const reimbursements:Reimbursement[] = JSON.parse(text);
        reimbursement.id = v4();
        reimbursements.push(reimbursement);
        writeFile('//Users//nickkreshon//Desktop//project_1_be//localreimbursements.json', JSON.stringify(reimbursements))
        return reimbursement;
    }

    async getAllReimbursements(): Promise<Reimbursement[]> {
        const file = await readFile('//Users//nickkreshon//Desktop//project_1_be//localreimbursements.json');
        const text: string = await file.toString();
        const reimbursements:Reimbursement[] = JSON.parse(text);
        return reimbursements;
    }

    async deleteReimbursementById(id: string): Promise<boolean>{
        const reimbursements = await this.getAllReimbursements();
        const filteredReimbursements = reimbursements.filter(reimbursement => reimbursement.id !== id)
        writeFile('//Users//nickkreshon//Desktop//project_1_be//localreimbursements.json', JSON.stringify(filteredReimbursements))
        return true
    }

}
