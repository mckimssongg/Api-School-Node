

export class UserController{
    constructor(model){
        this._model = model;
    }

    getAll(){
        return this._model.all();
    }

    getById(id){
        return this._model.findById(id);
    }

    create(user){
        return this._model.save(user);
    }

    update(id, user){
        return this._model.update(id, user);
    }

    delete(id){
        return this._model.delete(id);
    }
}