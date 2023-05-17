/**
 * 服务台电话咨询
 */

const mongoose = require('mongoose')

const systemControlSchema = mongoose.Schema({
  name: String,
  address: String,
  account: String,
  password: String,
  charger: String,
  note:String
})

module.exports = mongoose.model("systemControl",systemControlSchema,"systemControl")