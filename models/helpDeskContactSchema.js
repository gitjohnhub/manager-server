/**
 * 服务台电话咨询
 */

const mongoose = require('mongoose')

const helpDeskContactSchema = mongoose.Schema({
  dept: String,
  dept_windows: String,
  address: String,
  contactNum: String,
  note: String
})

module.exports = mongoose.model("helpDeskContact",helpDeskContactSchema,"helpDeskContact")