require('dotenv').config()
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt') // for incrypting passwords

//get all users
//route GET /users
//access private

const getAllUsers= asyncHandler(async(req,res)=>{
    const {username, password, id} = req.query;
    console.log(id)
    if(username){
        if(!password)
            return res.status(400).json({message: "you should enter the password"})
        const user= await User.findOne({ username: username }).lean()
        if(user){
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if(isPasswordMatch){
                const { password, ...userWithoutPassword } = user;
                const userWithToken = {...userWithoutPassword, accessToken: user.accessToken}
                res.json(userWithoutPassword)
            }
            else
                return res.status(400).json({message: "password is wrong"})
        }
        else
            return res.status(400).json({message: `no user with username: ${username}`})
    }
    else if(id){
        const authHeader=req.headers['authorization'] //token send through the autherization field in postman
        const token = authHeader && authHeader.split(' ')[1] //take off the word "Bearer" from the token
        if(token ==null) 
            return res.status(401).json({message: "There is no ACCESS_TOKEN"})
        jwt.verify(token, process.env.ACCESS_TOKEN, (err,user)=>{
            if(err)
                return res.status(403).json({message: "ACCESS_TOKEN not valid"})
        })
        const user = await User.findById(id).exec()
        if(!user)
            return res.status(400).json({message:'id not found'})
        res.json(user);
    }
    // else{
    //     const users= await User.find().select('-password').lean()
    //     if(!users?.length){
    //         return res.status(400).json({message: 'no users found'})
    //     }
    //     res.json(users)
    // }

})

const createNewUser= asyncHandler(async(req,res)=>{
    const {username, password, email, age, courses, history, accessToken} = req.body

    if(!username || !password ||!email.length){
        return res.status(400).json({message:'all fields are required'})
    }

    const duplicate = await User.findOne({username}).lean().exec()
    if(duplicate){
        return res.status(400).json({message:"duplicate username"})
    }

    //hash password
    const hashed = await bcrypt.hash(password, 10)
    const theuser = {name:username}
    const newAccessToken = jwt.sign(theuser,process.env.ACCESS_TOKEN)
    const userObj = {username,'password': hashed, email, age, courses, history, 'accessToken':newAccessToken }

    const user = await User.create(userObj)
    if(user){
        res.status(201).json({message:"user created"})
    }else{
        res.status(400).json({message:'invalid user data'})
    }
})

const updateUser= asyncHandler(async(req,res)=>{

        const {id,username, courses, history, age, password, oldPassword, email}= req.body
        if(!id)
        {
            return res.status(400).json({message:'missing fields'})
        }
        const user = await User.findById(id).exec()

        if(!user){
            return res.status(400).json({message:'user not found'})
        }
        //check for duplicate 
        const duplicate = await User.findOne({username}).lean().exec()
        if(duplicate && duplicate?._id.toString() !==id){
            return res.status(409).json({message:'duplicate username'})
        }
        if(username){
            user.username=username
        }
        if(email){
            user.email=email
        }
        if(courses){
            user.courses= courses
        }
        if(history){
            user.history= history
        }
        if(age){
            user.age= age
        }
        if(password){
            if(!oldPassword)
                return res.status(409).json({message:'Enter the old password'})

            const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
            if(isPasswordMatch)
                user.password = await bcrypt.hash(password, 10)
            else
                return res.status(409).json({message:'wrong password'})
        }
        const updatedUser = await user.save()
        res.json({message:'updated user done!', username: username, email: email})
    })

const deleteUser= asyncHandler(async(req,res)=>{
    const {id}= req.body
    if(!id){
        return res.status(400).json({message:'user id required'})
    }
    //if you are deleting a user => all their data in other collections
    //must be deleted as well! or restrict this delete

    const user = await User.findById(id).exec()
    if(!user){
        return res.status(400).json({message:'user not found'})

    }
    const result = await user.deleteOne()
    res.json({message:`user ${result._id} deleted `})
})

module.exports= {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}


function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization'] //token send through the autherization field in postman
    const token = authHeader && authHeader.split(' ')[1] //take off the word "Bearer" from the token
    if(token ==null) 
        return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN, (err,user)=>{
        if(err)
            return res.sendStatus(403)
        req.user = user
        next()
    })
}