const mongoose = require("mongoose");
const { Schema } = mongoose;

const userScheme = new Schema(
    {
       
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true,unique:true },
        password: { type: String, required: true },
        token: { type: String }
    }
)

const User = mongoose.model("User", userScheme);// collection or schema creation using model
module.exports = { User };
