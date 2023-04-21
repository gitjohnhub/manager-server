/**
 * 遗失物品sql
 */

const mongoose = require('mongoose')

const phoneConsultationSchema = mongoose.Schema({
  dept: String,
  item: Array,
  result: String,
  createTime: String,
  note: String,
  userName: String
})

module.exports = mongoose.model("phoneConsultation",phoneConsultationSchema,"phoneConsultation")


