 const  mongoose=require('mongoose')

 const messageSchema = new mongoose.Schema({
  content: { type: String, required: true }, 
  replies: [{type: Object}] 
});
 const msgmodel=mongoose.model('MYDATA',messageSchema)
  module.exports=msgmodel