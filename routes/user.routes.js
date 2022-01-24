const { Router } = require("express")
const { check } = require("express-validator")
const { changePassowrd, changeEmail, loginUser, createUser, deleteUser } = require("../controllers/user_Controller")
const validarJWT = require("../middleware/validar-jwt")
const validateFields = require("../middleware/validateFields")


const router = Router()

router.post('/',[
    check('email','Is necessary an email').not().isEmpty(),
    check('email','The email is wrong written').isEmail(),
    check('password','The password is necessary').not().isEmpty(),
    check('password','The password it has to have minimum 5 characters').isLength({min: 5}),
    check('name','Name is necessary').not().isEmpty(),
    validateFields
],createUser)

router.get('/',loginUser)

router.delete('/:user_id',[
    check('user_id','id is not a valid id').isMongoId(),
    validateFields
],deleteUser)

router.put('/change-password',validarJWT,changePassowrd)

router.put('/change-email',validarJWT,changeEmail)

module.exports = router