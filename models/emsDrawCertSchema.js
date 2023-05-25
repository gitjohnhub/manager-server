/**
 * EMS一业一证取证
 */

const mongoose = require('mongoose')

const emsDrawCertSchema = mongoose.Schema({
  companyName: String,
  code: String,
  legalPerson: String,
  licenseCode: String,
  licenseItems: Array,
  industryCategory: Array,
  drawName:String,
  drawDate:String,
  userName:String,
  note:String,
  createTime:String
})

module.exports = mongoose.model("emsDrawCert",emsDrawCertSchema,"emsDrawCert")


