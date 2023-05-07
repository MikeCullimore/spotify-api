import * as dotenv from 'dotenv'
dotenv.config()

export const getClientId = () => {
    return process.env.CLIENT_ID;
}

export const getClientSecret = () => {
    return process.env.CLIENT_SECRET;
}