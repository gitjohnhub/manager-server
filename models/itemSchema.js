/**
 * 服务台电话咨询
 */

const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
  item: String,
  dept: String,
  code: String,
  accessCode: String,
})

module.exports = mongoose.model("item",itemSchema,"item")