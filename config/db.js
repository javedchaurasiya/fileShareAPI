require("dotenv").config()
const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://shareApp:9525087591a@cluster0.zbcwz.mongodb.net/shareapp?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
    // useCreateIndex:true
}).then(()=>{
    console.log("connected db")
}).catch((err)=>{
    console.log("connectio error db")
})