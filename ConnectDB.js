const mongoose = require("mongoose")

const mongo_url = process.env.MONGO_URL

exports.mongoDBconnect = () => {
    try {
        mongoose.connect(mongo_url, () => {
            console.log(`DB connected`.blue)
        })
    } catch (error) {
        console.log(error)
    }
}