var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const multer = require("multer")
const path = require('node:path');

const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extented : true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

var Storage = multer.diskStorage({
    destination:"./public/upload/",filename:(req,Image,cb)=>{
        cb(null,Image.fieldname+"_"+Date.now()+path.extname(Image.originalname));
        
    }
})

var upload = multer({
    storage:Storage
}).single('Image');

app.post("/",upload,(req,res)=>{
    var ProductName = req.body.ProductName;
    var Category = req.body.Category;
    var Quantity = req.body.Quantity;
    var Description = req.body.Description;
   // var Image = req.body.Image;
    var Image = req.file.filename;
    

    var data = {
        "ProductName":ProductName,
        "Category":Category,
        "Quantity":Quantity,
        "Description":Description,
        "Image":Image
    }

    db.collection("users").insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('public/display.html')

})


app.get("/",(req,res)=>{
    res.set({
            "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('updates.html');
    
}).listen(3000);

console.log("Listening to port 3000");


