const bodyParser = require('body-parser')
const express = require('express')
const fs = require('fs')

const app = express()

app.use(bodyParser.json())

app.use(express.static('./public'))


app.post('/savecode',(req,res)=>{
    fs.writeFileSync('/mnt/d/A.cpp',req.body['data']);
    res.end();
    
})
app.post('/saveinput',(req,res)=>{
    fs.writeFileSync('/mnt/d/A.txt',req.body['data']);
    res.end();
})
app.get('/getinput',(req,res)=>{
   const result = fs.readFileSync('/mnt/d/A.txt',"utf-8");
   const tosend = {
      data : result, 
   }
   res.json(JSON.stringify(tosend));
    res.end();
})
app.get('/getcode',(req,res)=>{
   const result = fs.readFileSync('/mnt/d/A.cpp',"utf-8");
   const tosend = {
       data : result,
   }
   res.json(JSON.stringify(tosend));
   res.end();
})

app.listen(5000,()=>{
    console.log("Listening to 5000");
})