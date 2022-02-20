// import express from 'express';
const express = require('express')
const app = express();

app.get('/', (req, res)=>{
    console.log('Welcome heorku ');
    res.send({bye : 'bro'})
});

const PORT = process.env.PORT || 5000;
app.listen(PORT)