/**
 *记账
 */

const mongoose = require('mongoose')

const financeSchema = mongoose.Schema({
  buydate: String,
  item: String,
  category: String,
  price: String,
  method:String,
  subCategory:String,
  comingType:String,
  currency:String,
  ledger:String,
  tag:String,
  status:String,
  commission:String

})

module.exports = mongoose.model("finance",financeSchema,"finance")


