/**
 * 12345线上帮办咨询
 */

const mongoose = require('mongoose')

const goodbadReviewSchema = mongoose.Schema({
  numId: String,
  name: String,
  phoneNum: String,
  content: String,
  result: String,
  hasReply:{
    type:Number,
    default:0
  },
  replyContent:String,
  itemType:String,
  createTime: Date,
  recorder:String
})

module.exports = mongoose.model("goodbadReview",goodbadReviewSchema,"goodbadReview")


