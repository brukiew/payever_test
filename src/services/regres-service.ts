import { IRegres } from "../entitites/services/regres-service-i";
import { User } from "../entitites/user";
import request from 'request-promise';

export class RegresService implements IRegres{

    /**
     * Get user
     */
    async getUser(userId: number): Promise<User> {
        try{ 
            const result = await request.get(`https://reqres.in/api/users/${userId}`);
            const {data} = JSON.parse(result);
            return new User(data);
        } catch(error){
            return null;
        }
    }
    

    /**
     * Get user avatar
     * @param userId 
     */
    async getAvatar(userId: number): Promise<Buffer>{
        const user:User = await this.getUser(userId);
        if(!user){
            return null;
        }
        const result = await request.get({url: user.avatar, encoding: 'binary'});
        return result;
    }

    /**
     * Retrieves paginated users
     * @param pageId 
     */
    async getUsers(pageId: number): Promise<User[]> {
        const result = await request.get(`https://reqres.in/api/users?page=${pageId}`);
        const {data} = JSON.parse(result);
        return data.map((user: any) => new User(user));
    }
}