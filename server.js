const express=require("express")
const path=require("path")
const app=express()
require("dotenv").config()
// const hbs=require("handlebars")

const PORT=process.env.PORT||3000

require('./config/db')

app.use(express.json())
app.set('views',path.join(__dirname,"/views"))
app.set('view engine','ejs')

//demo
app.get("/",(req,res)=>
{
    res.send(`hello ${process.env.MONGO_CONNECTION_URL}`)
})
app.use('/api/files',require("./routes/files"))
app.use('/files',require("./routes/show"))
app.use('/files/download',require('./routes/download'))

app.listen(PORT,()=>
{
    console.log(`listening on port ${PORT}`)
})

