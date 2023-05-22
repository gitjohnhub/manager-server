/**
 *记账
 */

const mongoose = require('mongoose')

const financeSchema = mongoose.Schema({
  buydate: String,
  item: String,
  category: String,
  price: String,
  method:String

})

module.exports = mongoose.model("finance",financeSchema,"finance")


