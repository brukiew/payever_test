import chai from 'chai';
import {expect, use} from 'chai';
import sinon from 'sinon'
import sinonChai from 'sinon-chai';
import {RegresService} from '../../src/services/regres-service';
import {UserController} from '../../src/controllers/user-controller';
import { IRegres } from '../../src/entitites/services/regres-service-i';
use(sinonChai);

let regresService:IRegres;
let userController:UserController;
beforeEach(()=>{
    regresService = new RegresService();
    const getUserStub = regresService.getUser = sinon.stub();
    getUserStub.withArgs(1).resolves({"id":1,"email":"george.bluth@reqres.in","firstName":"George","lastName":"Bluth","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"});
    getUserStub.withArgs(2).resolves(null);

    userController = new UserController(regresService);
});

describe('UserController ', () => {
    describe('getUser,', () => {
        it(' returns user, when exists', async() => {
            const result = await userController.getUser(1);
            chai.expect(result).to.be.deep.equal({id:1,email:"george.bluth@reqres.in",firstName:"George",lastName:"Bluth",avatar:"https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"});
            expect(regresService.getUser).to.have.been.calledOnceWith(1);
        });
        it(' returns null, when user doesnt exists', async() => {
            const result = await userController.getUser(2);
            chai.expect(result).to.be.equal(null);
            expect(regresService.getUser).to.have.been.calledOnceWith(2);
        });
    });

});