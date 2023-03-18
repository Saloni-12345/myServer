let express = require("express");
let app = express();
app.use(express.json());
app.use(function(req,res,next){
res.header("Access-Control-Allow-Origin","*");
res.header("Access-Control-Allow-Methods",
"GET,POST,PUT,DELETE,HEAD,OPTIONS,PATCH");
res.header("Access-Control-Allow-Headers",
"Origin,X-Requested-With,Content-Type,Accept");
next();
})
let port = process.env.PORT||2410;
app.listen(port,()=>console.log(`Node app listening on port ${port}!`));
let axios = require("axios");

app.post("/myserver",async function(req,res){
 let body = req.body;
 try{
  let response = await axios(body);
  console.log(response.data)
 res.json({
    "method":body.method,
    "url":body.url,
    "data":body.data
 });
}catch(err){
    if(err.response) res.status(err.response.status).send(err.response.data)
    else res.status(401).send("Can't fetch "+body.method+" request")
}
})