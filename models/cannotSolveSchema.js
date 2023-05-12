/**
 * 办不成事schema
 */

const mongoose = require('mongoose')

const cannotSolveSchema = mongoose.Schema({
  numId: String,
  name: String,
  phoneNum: String,
  content: String,
  result: String,
  channel:String,
  hasReply:{
    type:Number,
    default:0
  },
  replyContent:String,
  itemType:String,
  createTime: Date,
  recorder:String
})

module.exports = mongoose.model("cannotSolve",cannotSolveSchema,"cannotSolve")


