export class Authentication{
    constructor(auth, id , username , token, role , message){
        this.auth = auth || false
        this.id = id || 0
        this.username = username || ''
        this.token = token || ''
        this.role = role || ''
        this.message = message || 'Invalid username or password'
    }
}