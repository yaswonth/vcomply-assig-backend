const mongoose = require('mongoose');


const Postschema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    totalLevels:{
        type:Number,
        required:true
    },
    currentlevel:{
        type:Number,
        default:1
    },
    dateOfCreation:{
        type:Date,
        default:Date.now()
    },
    updatedDate:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        default:"Active"
    },
    approvals:[mongoose.Schema.Types.Mixed],
    approvers:[String]
})

module.exports = mongoose.model('Posts',Postschema);