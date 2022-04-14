import bcrypt from 'bcrypt';

export const encryptOption={
    encrypt:function(password){
        return bcrypt.hash(password, bcrypt.genSalt(10));
    },
    comparePassword:function(password,hash){
        return bcrypt.compare(password, hash);
    }
}