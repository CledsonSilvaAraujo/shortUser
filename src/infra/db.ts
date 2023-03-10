import mongoose from 'mongoose';
import utilLogger from '../library/Logger';
import { config } from '../config/config';
import User from '../models/User';
mongoose.set("strictQuery", false);

const connect = async () => {
  mongoose
  .connect(config.mongo.url, { w: 'majority', retryWrites: true })
  .then(() => {
    // utilLogger.Log('connected');
    console.log('connected')
  })
  .catch((error) => {
    console.log('unable to connect')
    console.log(error)
    // utilLogger.Log('unable to connect');
    // utilLogger.Log(error);
  });
}
const cleanDatabase = async () => {
  await User.deleteMany().then(function() {
    console.log("Data deleted"); 
  }).catch(function(error){
    console.log(error); 
  });
}
 
const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
}


export default {
  connect,
  closeDatabase,
  cleanDatabase,
}