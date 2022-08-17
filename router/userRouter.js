const { Router } = require('express')
const router = Router()
const { getAllUsers } = require('../controllers/userControllers')

router
    .get('/get-all-users', getAllUsers)

module.exports = router