/**
 * 遗失物品sql
 */

const mongoose = require('mongoose')

const lostFoundSchema = mongoose.Schema({
  "pickUpDate":{
    type:Date,
    default:Date.now() + 8 * 60 * 60 * 1000
  },
  "itemType":String,
  "withName":String,
  "IdNum":String,
  "hasDraw":{
    type:Number,
    default:0
  },
  "note":String,
  "createTime":{
    type:Date,
    default:Date.now() + 8 * 60 * 60 * 1000
  },
  "recorder":String,
  "confirmer":String

})

module.exports = mongoose.model("lostFound",lostFoundSchema,"lostFound")