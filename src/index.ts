import { UserController } from './controllers/user-controller';
import { RegresService } from './services/regres-service';
import {Server} from './server/server';
import { ScrapController } from './controllers/scrap-controller';
import { IRegres } from './entitites/services/regres-service-i';
class App {
    constructor(){
        this.init();
    }

    private init(){
        const regresService:IRegres = new RegresService();

        const userController:UserController = new UserController(regresService);
        const scrapController:ScrapController = new ScrapController(regresService);
        const server:Server = new Server(userController, scrapController);
    }
}
export = new App();