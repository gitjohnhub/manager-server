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
  createTime:{
    type:Date,
    default:Date.now() + 8 * 60 * 60 * 1000
  },
})

module.exports = mongoose.model("receiveCertificate",receiveCertificateSchema,"receiveCertificate")