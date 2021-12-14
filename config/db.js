require("dotenv").config()
const mongoose=require("mongoose")

mongoose.connect(process.env.MONGO_CONNECTION_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    // useCreateIndex:true
}).then(()=>{
    console.log("connected db")
}).catch((err)=>{
    console.log("connectio error db")
})