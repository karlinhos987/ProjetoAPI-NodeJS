import { MongoClient, Db } from 'mongodb'
import { Logger } from './Logger'

let mongoConnection: MongoClient | null = null

export const connectMongoDb = async (): Promise<Db> => {
    try{
        const uri = 'mongodb+srv://karlinhos987:naF2mqESxkfSIGBI@cluster0.1scce.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        
        if(!mongoConnection ){
            mongoConnection = await MongoClient.connect(uri) 
            Logger.info('MOGO_CONNECT_SUCESS', 'Mongo connected')
        }
        return mongoConnection.db()
    }catch(error){
        Logger.error('MONGO_CONNECTION_ERROR', 'Can\'t connect mongodb', error)
    }
}
