const express=require('express');
const routes=require('./src/routes');
const app=express();
app.use(express.json());  
app.use('/',routes);
app.listen(4000,()=>console.log(`Server is running on port ${4000} `));
