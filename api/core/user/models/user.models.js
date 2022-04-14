import fs from 'fs';

export class UserJsonFileModel{
    constructor(user){
        this._model = user;
        this._dataPath = './db/userdb.json';
    }

    readJsonFile(){
        let fileContents = fs.readFileSync(this._dataPath, 'utf8');
        if(fileContents){
            return JSON.parse(fileContents);
        }
        return [];
    }

    writeJsonFile(data){
        let jsonData = JSON.stringify(data,null,'');
        fs.writeFileSync(this._dataPath, jsonData);
    }

    generateId(){
        let data = this.readJsonFile();
        let lastItem = data.pop();
        if(lastItem){
            return ++lastItem._id;
        }
        return 1;
    }

    save(item){
        try {
            let newUser = new this._model(item);
            let data = this.readJsonFile();
            newUser._id = this.generateId();
            data.push(newUser);
            this.writeJsonFile(data);
            return newUser;
        } catch (error) {
            return null;
        }
    }

    all(){
        return this.readJsonFile();
    }

    findById(id){
        let data = this.readJsonFile();
        return data.find(item => item._id == parseInt(id));
    }

    update(id,user){
        console.log(id);
        console.log(user);
        let data = this.readJsonFile();
        let updateItems = data.map(item => {
            if(item._id == parseInt(id)){
                item = new this._model(user);
                item._id = parseInt(id)
                return item 
            }
            return item;
            }
        );
        this.writeJsonFile(updateItems);
        return id;
    }
}