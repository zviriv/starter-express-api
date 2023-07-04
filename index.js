const axios = require('axios');
const express = require('express');
const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}); 

app.all('/', (req, res) => {
    console.log('data', req.data);
    console.log('params', req.params);
    console.log('body', req.body);
    
    res.send('Yo!');
});
app.listen(process.env.PORT || 3000);
