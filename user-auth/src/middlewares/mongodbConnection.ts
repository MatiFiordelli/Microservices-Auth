import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { NextFunction, Response } from 'express'
import { CustomRequest } from '../interfaces/CustomRequest.js'

dotenv.config()

export const mongodbConnection = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const URI = process.env.MONGO_URI

        if (!URI) {
            const error = new Error('Mongodb URI is not defined')
            error.name = 'MongodbUriNotDefined'
            throw error
        }

        await mongoose.connect(URI)
        console.log('MongoDB connected successfully');

        const database = mongoose.connection.db

        if(!database){
            const error = new Error('Database is undefined')
            error.name = 'DatabaseIsUndefined'
            throw error
        }
        req.db = database

        next()

    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongodbUriNotDefined' || error.name === 'DatabaseIsUndefined') { 
                console.error('Error: ', error.message); 
            } else { 
                console.error('Error connecting to MongoDB: ', error.message); 
            }
            next(error)
        } else {
            next(new Error('Unknown error'))
        }        
    }
}