require('./models/User')//This is done because mongoose expects to see the code  mongoose.model('User',userSchema)
//only once .
require('./models/Track')
const express=require('express');
const mongoose=require('mongoose');

const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser=require('body-parser');
var fs = require('fs'); 
var path = require('path'); 
const requireAuth=require('./middlewares/requireAuth')
let port = process.env.PORT;
const app=express()

app.use(bodyParser.json())//This is used for parsing the json information so that the api undestands 
//the json object that is sent to it!
app.use(authRoutes)
app.use(trackRoutes)

const MongoURI='mongodb+srv://admin:passwordpassword@react-native-db.omouh.mongodb.net/track-app?retryWrites=true&w=majority'

mongoose.connect(MongoURI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false 
})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongoose instance")
 })

mongoose.connection.on('error',(err)=>{
    console.log("error connection to mongo:",err)
})


app.get('/',(req,res)=>{
    // res.send(`Your email : ${req.user.email}`)
    res.send('hey')
})


if (port == null || port == "") {
    port = 8000;
  }
app.listen(port,()=>{
    console.log("Listening on prot 8000")
})



