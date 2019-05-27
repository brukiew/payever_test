import express from 'express';
import { UserController } from '../controllers/user-controller';
import { ScrapController } from '../controllers/scrap-controller';
export class Server {
    constructor(private readonly userController:UserController, private readonly scrapController:ScrapController){
        this.init();
    }

    private init(){
        const app = express();

        app.get('/api/user/:userId', async (req, res) => {
            const {userId} = req.params;
            const result = await this.userController.getUser(userId);
            res.status(result ? 200 : 404).send(result);
        });

        app.get('/api/user/:userId/avatar' , async (req, res) => {
            const {userId} = req.params;
            const result = await this.userController.getAvatar(userId);
            res.status(result ? 200 : 404).send(result);
        });

        app.delete('/api/user/:userId' , (req, res) => {
            const {userId} = req.params;
            const success = this.userController.deleteAvatar(userId)
            res.status(success ? 204 : 404).send();
        });

         // endpoint to start scrapping
         app.get('/scrap/start', (req, res) => {
            this.scrapController.start();
            res.send();
        });

        app.get('/scrap/stop', (req, res) => {
            this.scrapController.stop();
            res.send();
        });

        app.listen(3000, () => console.log('Listening on port 3000!'));
    }
}

