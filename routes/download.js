const router=require('express').Router();
const File=require('../models/file')
require("dotenv").config()

router.get('/:uuid',async (req,res)=>
{
    try {
        const file=await File.findOne({uuid:req.params.uuid})
        if(!file)
        {
            return res.render('errorpage')
        }
        const filepath=`${__dirname}/../${file.path}`
        res.download(filepath)
    } catch (error) {
        return res.render('errorpage')
    }
})


module.exports=router;