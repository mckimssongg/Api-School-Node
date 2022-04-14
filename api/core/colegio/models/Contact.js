export class Contact{
    constructor(contact){
        this._id = 0;
        this._name = contact.name;
        this._lastname = contact._lastname;
        this._age = contact.age;
        this._address = contact.address;
        this._job = contact._job;
        this._skills = [];
    }
}