/**
 * 遗失物品sql
 */

const mongoose = require('mongoose')

const generalWindowContactSchema = mongoose.Schema({
  dept: String,
  item: String,
  itemCategory:String,
  note: String,
  contactPerson: String,
  contactNum: String,
})

module.exports = mongoose.model("generalWindowContact",generalWindowContactSchema,"generalWindowContact")