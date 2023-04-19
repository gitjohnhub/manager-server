/**
 * 遗失物品sql
 */

const mongoose = require('mongoose')

const leaveOfAbsenceSchema = mongoose.Schema({
  "leaveDate":{
    type:Array,
    // default:Date.now()
  },
  "note":String,
  "dayType":String,
  "leaveType":String,
  "halfDay":String,
  "createTime":{
    type:Date,
  },
  "userName":String,
  "approve":{
    type:Number,
    default:0
  }
})

module.exports = mongoose.model("leaveOfAbsence",leaveOfAbsenceSchema,"leaveOfAbsence")