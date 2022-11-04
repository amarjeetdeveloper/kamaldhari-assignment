const mongoose = require("mongoose")

const CMS_userSchema = new mongoose.Schema(
    {
        
    name: {
        type: String,
        required:true,
        trim: true
    },

    email: {
        type: String,
        required:true,
        unique: true,
        lowercase:true,
        trim: true
    },
   
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },                

    role: {
        type: String,
        required:true,
        enum: ["SuperAdmin", 'Admin', "User"],
        default: "User",
      },
      status: {
        type: String,  
        default: "deactive",
      },

    password: {
        type: String,
        required: true,
        trim: true
    },                   
},
   { timestamps: true });


module.exports = mongoose.model('CMS_user', CMS_userSchema)