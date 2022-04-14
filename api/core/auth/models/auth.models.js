import fs from 'fs';

export class AuthJsonModel{
    constructor(){
        this._dataPath = './db/userdb.json'; 
    }
    
    readJsonFile(){
        let fileContents = fs.readFileSync(this._dataPath,'utf8');
        if(fileContents){
            return JSON.parse(fileContents);
        }
        return [];
    }

    writeJsonFile(data){
        let fileContents = JSON.stringify(data);
        fs.writeFileSync(this._dataPath,fileContents,'utf8');
    }

    getUserByUsername(username){
        let data = this.readJsonFile();
        let user = data.find(user => user.username === username);
        return user;
    }

    gerUserByEmail(email){
        let data = this.readJsonFile();
        let user = data.find(user => user.email === email);
        return user;
    }
}   


