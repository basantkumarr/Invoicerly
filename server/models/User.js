const mongoose=require('mongoose')


const useschema=new mongoose.Schema({
    bname:"String",
    address:"string",
    contact:"number",
    img:"string",
})
const user = mongoose.model('user', useschema);

module.exports = user;