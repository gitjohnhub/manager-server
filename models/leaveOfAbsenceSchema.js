/**
 * 遗失物品sql
 */

const mongoose = require('mongoose')

const leaveOfAbsenceSchema = mongoose.Schema({
  "leaveDate":{
    type:Array,
    // default:Date.now() + 8 * 60 * 60 * 1000
  },
  "note":String,
  "dayType":String,
  "leaveType":String,
  "halfDay":String,
  "createTime":{
    type:Date,
    // default:Date.now() + 8 * 60 * 60 * 1000

  },
  "userName":String,
  "approve":{
    type:Number,
    default:0
  },
  "approveby":{
    type:String,
    default:''
  }
})

module.exports = mongoose.model("leaveOfAbsence",leaveOfAbsenceSchema,"leaveOfAbsence")