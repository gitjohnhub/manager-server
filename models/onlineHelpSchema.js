/**
 * 12345线上帮办咨询
 */

const mongoose = require('mongoose')

const onlineHelpSchema = mongoose.Schema({
  name: String,
  content: String,
  result: String,
  dept:String,
  itemType:String,
  createTime: Date,
  recorder:String
})

module.exports = mongoose.model("onlineHelp",onlineHelpSchema,"onlineHelp")


