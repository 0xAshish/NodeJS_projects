var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/mySeconddb');
var schema=mongoose.Schema,
    objectId=Schema.ObjectId;

    var data=new Schema({
name:string,
age:number
work:string,
company:string
    });