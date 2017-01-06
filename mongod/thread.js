var mongoose=require('mongoose'),
Schema=mongoose.schema;
var threadSchema=new Schema({
    name:String,
    age:number,
    work:String,
    company:String
});
module.exports=mongoose.model('Thread',threadSchema);
