const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/User");



const validarJWT = async (req = request , res = response, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {uid} = jwt.verify(token,`${process.env.SECRET_KEY}`)
    
        const existsUser = await User.findById(uid)

        if (!existsUser) {
            return res.status(401).json({
                msg: 'Token no valido -Usuario no existente'
            }) 
        }
        req.user = existsUser

        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        })
    }
}

module.exports = validarJWT