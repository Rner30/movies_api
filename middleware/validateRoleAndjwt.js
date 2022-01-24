const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const validateRoleAndjwt = async (req = request,res = response,next) => {
    const token = req.header('x-token')

    try {
        const {uid} = jwt.verify(token,`${process.env.SECRET_KEY}`)

        const existsUser = await User.findById(uid)

        if (!existsUser) {
            return res.status(401).json({
                msg: 'Token no valido -Usuario no existente'
            }) 
        }
        
        if (existsUser.role == "admin") {
            req.user = existsUser
            return next()              
        }

        return res.status(401).json({
            msg: 'You doesnt have permission for this action, please talk with an admin'
        })

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        })
    }

}

module.exports = validateRoleAndjwt