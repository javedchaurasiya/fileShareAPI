const router=require("express").Router();
const multer=require("multer")
const path=require("path")
const File=require("../models/file")
const {v4:uuid4}=require("uuid")


//defining storage destination.
let storage=multer.diskStorage({
    destination:(req,file,cb)=> cb(null,'uploads/'),

    filename :(req,file,cb)=>{
        const uniqueName=`${Date.now()}-${(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null,uniqueName)
    }
})


let upload=multer({
    storage,
    limit:{fileSize:1000000*100},
}).single('myfile')


router.post("/",(req,res)=>{
    

    //uploading
    upload(req,res,async (err)=>
    {
        try {
            //validateing req

            if(!req.file)return res.json({error:"All fiels are reqired"})
            
            if(err)
            {
                return res.status(500).send({error:err.message})
            }
            const file=new File({
                filename:req.file.filename,
                uuid:uuid4(),
                path:req.file.path,
                size:req.file.size
            })
            const response=await file.save()
            return res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`})
        } catch (error) {
            res.render(error)
        }
    })

})

router.post('/send', async (req,res)=>{

    try {
        const {uuid,emailto,emailfrom}=req.body
    console.log(`${uuid},${emailto},${emailfrom}`);
    if(!uuid||!emailto||!emailfrom)
    {
        res.status(422).send("Validation Error");
    }
    const file=await File.findOne({uuid:uuid})
    // if(file.sender)
    // {
    //     return res.status(422).send("Email Already Sent")
    // }
    file.sender=emailfrom
    file.receiver=emailto
    const response=await file.save()

    const sendmail=require('../services/emailservice')
    sendmail({
        from:emailfrom,
        to:emailto,
        subject:'File Shared Through File Share',
        text:`${emailfrom} shared a file`,
        html:require('../services/emailtemplate')({emailFrom: emailfrom,
            downloadLink:`${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size: parseInt(file.size/1000)+' KB',
            expires: '24 hrs'})
    })
    return res.send({success:true})
    } catch (error) {
        res.render('errorpage')
    }
})

module.exports=router;