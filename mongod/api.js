var Thread=require('thread.js');
var Post=require('post.js');

exports.post=(req,res)=>{
    new Thred({name:req.body.name,age:req.body.age,work:req.body.work,company:req.body.company}).save();

}
exports.list=()=>{
    Thread.find((err,threads)=>{
        res.send(threads);
    });
}
exports.show=((req,res)=>{
    Thred.findOne({name:req.params.title},(err,thread)=>{
var posts=Post.find({thread:thread._id},(err,posts)=>{
    res.send([{thread:thread,post:posts}]);
});
    })
});