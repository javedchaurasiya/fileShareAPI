require("dotenv").config()
const mongoose=require("mongoose")

function connectDB()
{
  mongoose.connect(process.env.MONGO_CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology:true})
  .then(()=>
  {
    console.log("DB connected");
  })
  .catch((error)=>
  {
    console.log("Connection Error");
  })
}

module.exports=connectDB;