const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const postsRoute = require('./routes/posts');
const approvalRoute = require('./routes/Approval');
const searchRoute = require('./routes/Users');
app.use(cors());
app.use(bodyParser.json());
app.use('/posts',postsRoute);
app.use('/approval',approvalRoute);
app.use('/users',searchRoute);
//Routes
app.get('/',(req,res)=>{
    res.send("Welcome to vcomply!!");
})

mongoose.connect(process.env.DB_CONNECTION,
                 { useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log('done success!!!');
});
app.listen(process.env.PORT || 3000);