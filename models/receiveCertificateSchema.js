/**
 * 遗失物品sql
 */

const mongoose = require('mongoose')

const receiveCertificateSchema = mongoose.Schema({
  companyName: String,
  drawName: String,
  drawId: String,
  drawContact: String,
  drawDate:String,
  hasDraw:Number,
  note:String,
  confirmer:String,
  createTime: String
})

module.exports = mongoose.model("receiveCertificate",receiveCertificateSchema,"receiveCertificate")