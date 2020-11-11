  
  const express =require('express');

  const cors =require('cors');
  const mongoose = require('mongoose');

  require('dotenv').config();


  const app= express();
  const port=process.env.PORT || 5000;

  // process.env.PORT is used so that your server listen to any avialiable server on the web server

  app.use(cors());
  app.use(express.json());

  app.use((req , res ,next ) => {
    res.setHeader ('Access-Control-Allow-Origin','*');
    res.setHeader (
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-Width, Content-Type, Accept, Authorization'

    );
    res.setHeader (
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
  });

  const uri=process.env.ATLAS_URI;
  mongoose.connect(uri , { useNewUrlParser: true , useCreateIndex: true ,useUnifiedTopology: true }
    );
  const connection =mongoose.connection;
  connection.once( 'open', ()=>{
    console.log("MongoDB  is connected succesfully")
  })

  const exercisesRouter = require('./routes/exercises');
  const usersRouter = require('./routes/users');

  app.use('/exercises', exercisesRouter);
  app.use('/users',usersRouter);
 


  app.listen(port,()=> {
      console.log('server is ruuning on the port ');
  });

