const bodyParser = require('body-parser')
const express = require('express')
const fs = require('fs')

const app = express()

app.use(bodyParser.json())

app.use(express.static('./public'))


app.post('/savecode',(req,res)=>{
    console.log("hello")
    fs.writeFileSync('/mnt/d/A.cpp',req.body.code);
    console.log('success!');
    console.log(req.body)
    res.end();
    
})

app.listen(5000,()=>{
    console.log("Listening to 5000");
})