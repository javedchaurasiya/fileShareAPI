const File=require('./models/file')
const fs=require('fs')
require('./config/db')

async function fetchdata()
{
    const pastdate=new Date(Date.now()-24*60*60*1000)
    const files=await File.find({createdAt:{$lt:pastdate}})
    // const files=await File.find()
    if(files.length)
    {
        for(const file of files)
        {
            try {
                fs.unlinkSync(file.path)
                await file.remove();
                console.log(`successfully deleted ${file.filename}`);
            } catch (error) {
                console.log(`Error while deleting file ${error}`);
            }
        }
        console.log('Done');
    }
}

fetchdata().then(process.exit)