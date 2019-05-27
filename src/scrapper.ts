import request from 'request-promise';

class Scrapper {
    constructor(){
        request.get(`http://localhost:3000/scrap/start`);
    }
}

export = new Scrapper();