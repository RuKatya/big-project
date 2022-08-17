const { Router } = require('express')
const router = Router()
const { addNewUser, loginUser, checkCookieUser, logout } = require('../controllers/authControllers')

router
    .post('/add-new-user', addNewUser)
    .post('/login-user', loginUser)
    .get('/user-cookie', checkCookieUser)
    .get('/logout-user', logout)

module.exports = router