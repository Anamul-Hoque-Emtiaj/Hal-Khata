const router = require('express').Router();
const register = require('../controller/registerController')
const login = require('../controller/loginController')

router.post('/register',register)
router.post('/login',login)
module.exports = router;