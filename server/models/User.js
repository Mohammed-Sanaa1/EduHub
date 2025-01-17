const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{ 
        type:String,
        required:true
    },
    email:{
        type:String
    },
    age:{
        type:Number,
        default:0
    },
    courses: [{
        type:Object
    }],
    history: [{
        type:Object
    }],
    accessToken:{
        type:String
    },
    refreshToken: String
})
userSchema.methods.toJSON = function () {
    let userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

module.exports= mongoose.model('User',userSchema)