import dotenv from 'dotenv';


const env = dotenv.config();
export const config={
    api:{
        hostname: process.env.HOST || '127.0.0.1',
        port: process.env.PORT || 3000,
        name: process.env.NAME || 'api'
    },
    jwt:{
        secret: process.env.JWT_SECRET || 'secret!',
    },
    doc:{
        definition:{
          openapi: "3.0.0",
          info:{
            title:process.env.NAME || 'Api-Contact',
            version:"1.0.0"
          },
          server:[
            {
                url:"http://localhost:4000"
            }
            ]
        },
        apis:[`api/contact/routes/*.js`],
    },
    mongodb:{
        host: process.env.MONGODB_URI,
    }

}