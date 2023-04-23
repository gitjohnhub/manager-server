/**
 *
 */

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  "userId":Number,
  "userName":String,
  "userPwd":String,
  "userAccount":String,
  "mobile":String,
  "sex":Number,
  "deptId":[],
  "job":String,
  "state":{
    type:Number,
    default:1
  },
  "role":{
    type:Number,
    default:1
  },
  "roleList":[],
  "createTime":{
    type:Date,
    default:Date.now()+ 8 * 60 * 60 * 1000
  },
  "lastLoginTime":{
    type:Date,
    default:Date.now() + 8 * 60 * 60 * 1000
  }
})

module.exports = mongoose.model("users",userSchema,"users")