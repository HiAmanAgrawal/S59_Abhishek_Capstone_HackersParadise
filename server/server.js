const express = require('express')
let app = express();
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const {connectDB, checkConnected}=require('./config/db.js')
const routes = require('./Routes/routes.js')
require('./cron');
let port = 8080;

connectDB()
app.use(cors())
app.get("/",(req,res)=>{
    if(checkConnected()){
        res.send("Data base connection successful!!")
    }
    else{
        res.send("Connection Failed")
    }
});
const limiter = rateLimit({
    max: parseInt(process.env.PULL_RATE),
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests. Try again after an hour'
  })

app.use(express.json());
app.use('/api', limiter, routes)

app.listen(port,()=>{
    console.log(`we are at port ${port}`)
})
module.exports= {app}
