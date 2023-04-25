/**
 * 12345线上帮办咨询
 */

const mongoose = require('mongoose')

const onlineHelpSchema = mongoose.Schema({
  numId: String,
  name: String,
  phoneNum: String,
  content: String,
  result: String,
  hasReply:{
    type:Number,
    default:0
  },
  itemType:String,
  createTime: String,
  recorder:String
})

module.exports = mongoose.model("onlineHelp",onlineHelpSchema,"onlineHelp")


