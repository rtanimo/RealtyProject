import express from 'express';
import ejs from 'ejs';
import {getAllProperty} from './database.js';

const app = express();
app.set('view engine', 'ejs');



app.get("/", async (req, res)=>{
    res.send(await getAllProperty());
});

app.listen(3000, ()=>{
    console.log("Server listening on port 3000");
});