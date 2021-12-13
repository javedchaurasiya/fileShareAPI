require("dotenv").config()
const mongoose=require("mongoose")

function connectDB()
{
    mongoose.connect("mongodb+srv://shareApp:9525087591a@cluster0.zbcwz.mongodb.net/shareapp?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology:true})
    const connection=mongoose.connection

    connection
    .once('open', function () {
      console.log('MongoDB running');
    })
    .on('error', function (err) {
      console.log("Error mongodb");
    });
}

module.exports=connectDB; 