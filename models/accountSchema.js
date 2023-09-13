/**
 *记账
 */

const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
  name: String,
  balance:String
})

module.exports = mongoose.model("account",accountSchema,"account")


