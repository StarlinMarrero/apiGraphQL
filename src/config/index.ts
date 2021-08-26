import dotenv from 'dotenv'
import path from "path"
dotenv.config()

console.log({
    process: process.env.USERNAME
})

export default {
    port: process.env.PORT || 4000,
    db: {
        front: {
            type: process.env.DB_FRONT_TYPE,
            host: process.env.DB_FRONT_HOST,
            port: process.env.DB_FRONT_PORT,
            username: process.env.DB_FRONT_USERNAME,
            password: process.env.DB_FRONT_PASSWORD,
            database: process.env.DB_FRONT_DATABASE,
            entities: [path.join(__dirname, "../entities/**")],
            synchronize: true,
        }
    },
    cookie: {
        secret: process.env.SECRET_COOKIE
    }
}

