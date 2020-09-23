const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
        firstName: { type: String, required: true}, 
        lastName: { type: String, required: true},
        email: {type: String, required: true},
        password: { type: String, required: true},
        userId:{type:String, required:true}
    },
    { timestamps: true}
)

const user = mongoose.model('users_lists' , userSchema)

module.exports = user