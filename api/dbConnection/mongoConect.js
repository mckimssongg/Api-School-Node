import mongoose from 'mongoose';
import {config} from '../config/default.js';


export const mongodb = {
    connect: () => {
        mongoose.connect(config.mongodb.host, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });
        mongoose.connection.on('error', (err) => {
            console.log(err);
        });
        mongoose.connection.on('open', () => {
            console.log('MongoDB Connected');
        });
    }
}


// export const mongodb = async () => {
//     try {
//         await mongoose.connect(config.mongodb.host, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB connected');
//     } catch (error) {
//         console.log(error);
//     }
// };