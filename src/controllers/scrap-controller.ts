import { IRegres } from "../entitites/services/regres-service-i";
import fs from 'fs';
import { User } from "../entitites/user";
import cron, { ScheduledTask } from 'node-cron';

export class ScrapController{
    constructor(private readonly regresService:IRegres){
    }

    private currentPageId:number = 1; // to make it right we need to store currentPageId outside service
    private task:ScheduledTask;

    public start(){
        if(!this.task){
            console.log('cron init..');
            this.task = cron.schedule('* * * * *', () => {
                console.log('cron execute');
                this.updateUsers();
            });
        }
    }

    public stop(){
        if(!this.task){
            this.task.destroy();
            this.task = null;
            console.log('cron stopped');
        }
    }

    private async updateUsers(){
        let existingInformation: any[] = [];
        const users:User[] = await this.regresService.getUsers(this.currentPageId);

        const path = 'users.json';
        if(fs.existsSync(path)){
            // read existing file
            const file =  await new Promise((resolve) =>{
                fs.readFile(path, (error, data) => {
                    return resolve(data);
                });
            });
            existingInformation = JSON.parse(file.toString());
        } 

        // save updated file
        await new Promise((resolve) => {
            fs.writeFile(path, JSON.stringify(existingInformation.concat(users)), 'utf8', ()=> {
                resolve();
            });
        });
        console.log('users updated');
        // increase pageId
        this.currentPageId++;
    }


    public async getUsers(pageId: number):Promise<User[]>{
        return this.regresService.getUsers(pageId);
    }
}