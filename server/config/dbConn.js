const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)// connect to the database through the mongoDB URI in ".env" file 
    }catch (err){
        console.log(err)
    }
}

module.exports = connectDB