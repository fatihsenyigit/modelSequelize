
"use strict";


const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

// alttaki kodun anlami, accept json and convert to object
app.use(express.json());

require("express-async-errors");

// app.all('/', (req, res)=> {
//     res.send('welcome to todo app')
// })



// routes



app.use(require('./app/routes/todo.router'));



app.use(require('./app/middlewares/errorHandler'));

app.listen(PORT, () => console.log("running: http://127.0.0.1:" + PORT));
