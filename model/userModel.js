const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    userName: {
        type: String,
        require: [true, `must include name`]
    },
    email: {
        type: String,
        require: [true, `must include email`]
    },
    password: {
        type: String,
        require: [true, `must include password`]
    },
    role: {
        type: String,
        require: true
    },
    friends: {
        users: [
            {
                profile: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    require: true
                }
            }
        ]
    },
    requestOfFriend: {
        users: [
            {
                profile: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    require: true
                }
            }
        ]
    }
})

module.exports = model('User', UserSchema)