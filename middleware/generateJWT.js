const jwt = require('jsonwebtoken')

const generateJWT = (uid = String) => {
    return new Promise((resolve,reject)=>{
        const payload = {uid}

        jwt.sign(payload,`${process.env.SECRET_KEY}`,{
            expiresIn: '100h'
        },(err,token) =>{
            if (err) {
                console.log(err);
                reject("No se pudo generar el token")
            }else{
                resolve(token)
            }
        })
    })
}

module.exports = generateJWT