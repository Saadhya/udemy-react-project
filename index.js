// import express from 'express';
const express = require('express')
const app = express();

app.get('/', (req, res)=>{
    console.log('Welcome heorku ');
    res.send({hi : 'there'})
});

app.listen(5000)