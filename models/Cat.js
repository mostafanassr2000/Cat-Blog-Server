const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2')

//User Schema (Class)
const CatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },

    color: {
        type: String,
        required: true,
    }
})

CatSchema.plugin(mongoosePaginate)

const Cat = mongoose.model("Cat", CatSchema)

//Exports Cat Class
module.exports = Cat