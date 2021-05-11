const router = require('express').Router();
const register = require('../controller/registerController')
const login = require('../controller/loginController')
const getAllUsers= require('../controller/getAllusers')
const getSingleUser= require('../controller/getSingleUser')
const authenticate = require('../authenticate')

router.post('/register',register)
router.post('/login',login)
router.get('/',authenticate,getAllUsers)
router.get('/:id',authenticate, getSingleUser)
module.exports = router;