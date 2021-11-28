const _ =require("lodash");
const mongoose=require("mongoose");
const {Schema} =require("mongoose")
const {validationResult}=require("express-validator")
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";



const blogSchema= new Schema({
  title:String,
  content:String
})
const blog=mongoose.model('Blog',blogSchema);

//-----home----
module.exports.homeMiddleware=async(req,res)=>{
  const data=await blog.find({});
  //console.log(data);
  res.render('home',{homeStartingContent,arr:data});
};


//----about-----
module.exports.aboutMiddleware = (req,res)=>{
  res.render('about',{aboutContent})
};


//----contact-----
module.exports.contactMiddleware=(req,res)=>{
  res.render('contact',{contactContent});};


  //----compose(GET)-----
module.exports.composeMiddleware=(req,res)=>{
  res.render("compose");
};



//-------Find----
module.exports.idMiddleware=async(req,res)=>{
  const id=req.params.id;
  const obj=await blog.findById(id);
  //console.log(obj);
    if(obj)
    {
      return res.render('post',{post:obj});
    }
  res.redirect("/");

};

//-------compose(POST)----
module.exports.composePost=async(req,res)=>{
  const errors=validationResult(req);
  if (!errors.isEmpty()) {
    const arr=errors.array().map(ele=>ele.msg);
    //console.log(arr);
    return res.render('error',{arr});
  }
  const obj=new blog(req.body);
  const hell=await obj.save();
   //console.log(hell);
  res.redirect("/");
};


//-----delete--------
module.exports.deleteMiddleware=async(req,res)=>{
const id=req.params.id;
//console.log(id);
const obj=await blog.findByIdAndDelete(id);
//console.log(obj);
res.redirect("/");
};