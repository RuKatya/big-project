const User = require('../model/userModel')
const colors = require('colors');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const { regValidation } = require('../utils/validation/regValidation');
const { loginValidation } = require('../utils/validation/loginValidation');

exports.addNewUser = async (req, res) => {
    try {
        const { userName, email, password, repeatPass } = req.body

        const { error } = regValidation.validate({ userName, email, password, repeatPass })

        if (!error) {
            const existUser = await User.findOne({ email })

            if (!existUser) {
                if (password === repeatPass) {
                    const hashPass = await bcrypt.hash(password, 10)

                    const newUser = new User({
                        userName, email, password: hashPass, role: 'user'
                    })

                    await newUser.save();

                    if (newUser) {

                        res.send({ newUserReg: true })
                        console.log(`new user of ${userName} created`.bgCyan)
                    } else {
                        res.send({ newUserReg: false, message: "Try again" })
                    }
                } else {
                    res.error({ message: "The password and confirm password not the same" })
                    res.send({ newUserReg: false })
                }
            } else {
                res.send({ newUserReg: false, message: "User alredy exist" })
            }
        } else {
            res.send({ newUserReg: false, message: error.details[0].message })
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const { error } = loginValidation.validate({ email, password })

        if (!error) {
            const existUser = await User.findOne({ email })

            if (existUser) {
                const passSame = await bcrypt.compare(password, existUser.password)

                if (passSame) {
                    const secret = process.env.SECRET

                    const payload = {
                        userName: existUser.userName,
                        id: existUser._id,
                        role: existUser.role
                    }

                    const token = jwt.encode(payload, secret)

                    res.cookie("userInfo", token, { maxAge: 60 * 60 * 3 * 1000 }, { httpOnly: true })
                    res.send({ login: true })
                    console.log(`user ${existUser.userName} loged`.bgCyan)
                } else {
                    res.send({ login: false, message: "The password not correct" })
                }
            } else {
                res.send({ login: false, message: "User not exist" })
            }
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

exports.checkCookieUser = async (req, res) => {
    try {
        const secret = process.env.SECRET
        const { userInfo } = req.cookies

        if (!userInfo) {
            res.send({ login: false, alert: "Need to login" })
        } else {
            const userDecodedInfo = jwt.decode(userInfo, secret);
            res.send({ login: true, userName: userDecodedInfo.userName })
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie("userInfo")
        res.send({ login: false, alert: "Need to login" })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


