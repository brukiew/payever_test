import { IRegres } from "../entitites/services/regres-service-i";
import fs from 'fs';
import { User } from "../entitites/user";

export class UserController{
    constructor(private readonly regresService:IRegres){

    }

    /**
     * Get user by user id
     * @param userId 
     */
    public getUser(userId:number){
        return this.regresService.getUser(userId);
    }

    /**
     * Get user avatar by id
     * 1. call for user data
     * 2. call for user avatar
     * @param userId 
     */
    public async getAvatar(userId:number){
        const path:string = `file_user_id_${userId}.jpg`;
        if(fs.existsSync(path)){
            // read file from local storage
            return await new Promise((resolve) =>{
                fs.readFile(path, (error, data) => {
                    return resolve(data.toString('base64'));
                });
            });
            
        }
        // get file
        const avatar = await this.regresService.getAvatar(userId);
        if(!avatar){
            return null;
        }
        await new Promise((resolve) => {
            fs.writeFile(path, avatar, 'binary', ()=> {
                resolve();
            });
        });
        return Buffer.from(avatar).toString('base64');
    }

    /**
     * Delete avatar by userId
     * @param userId 
     */
    public deleteAvatar(userId:number):boolean{
        const path:string = `file_user_id_${userId}.jpg`;
        if(fs.existsSync(path)){
            fs.unlinkSync(path);
            return true;
        }
        return false;
    }

    public async getUsers(pageId: number):Promise<User[]>{
        return this.regresService.getUsers(pageId);
    }
}