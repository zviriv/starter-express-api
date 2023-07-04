const axios = require('axios');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}); 

app.post('/', async (req, res) => {
    let body = req.body;
    console.log('body', body);

    if(!body.url) res.send('{"error":"missing url"}'); return;
    console.log('url', body.url || 'missing body.url');
 /*   
    let data = await axios({
        url: body.url,
        method: body.method || 'get',
        responseType: body.responseType || 'json'
    });
    console.log(data);

    if(body.responseType === 'arraybuffer')
        res.send(data.data.toString('base64'));
    else
        res.send(data.data);
  */  
    res.send('Yo!');
});
app.listen(process.env.PORT || 3000);
