var mongoose =require('mongoose'),
    Schema=mongoose.Schema,
    ObjectId=Schema.ObjectId;

    var postSchema=new Schema({
        thread:ObjectId,
        name:String,
        work:{type:String,default:'programmer'}
        company:String
    });
    module.exports=mongoose.model('Post',postSchema);