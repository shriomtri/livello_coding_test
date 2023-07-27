import mongoose from 'mongoose'
import Logger from "../core/logger";
import {db, environment} from "../config";

//Build the connection string
const developmentDBURI = `mongodb://127.0.0.1:27017/${db.name}`
const dbURI = `mongodb://${db.user}:${encodeURIComponent(db.password)}@${db.host}:${db.port}/${db.name}`

const options = {
    
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
};

Logger.debug(dbURI)

const DB_CONNECTION_STRING = (environment === 'development') ? developmentDBURI : dbURI;
console.log(DB_CONNECTION_STRING);
//Create the databse connection
mongoose
    .connect(DB_CONNECTION_STRING, options)
    .then(() => {
        Logger.info('Mongoose connection done')
    })
    .catch((e) => {
        Logger.info('Mongoose connection error')
        Logger.error(e)
    })

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
    Logger.info('Mongoose defalult connection open to ' + dbURI)
})

// If the connection thorows an error
mongoose.connection.on('error', (err) => {
    Logger.error('Mongoose default connection error: ' + err)
})

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
    Logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        Logger.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
