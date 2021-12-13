const router=require("express").Router();
const File=require("../models/file")

router.get("/:uuid",async (req,res)=>
{
    try {
        
        const file=await File.findOne({uuid:req.params.uuid})
        if(!file)
        {
            return res.render('errorpage',{error:"Link is Expired"})
        }
        return res.render("download",{
            uuid:file.uuid,
            filename:file.filename,
            filesize:file.size,
            download:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        })

    } catch (error) {
        return res.render('errorpage',{error:"Something Went Wrong."})
    }
})

module.exports=router