import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const initdb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected");
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}; export default initdb;