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
    //console.log('data', req.data);
    //console.log('params', req.params);
    let body = req.body;
    console.log('body', req.body);
    //console.log('payload', req.payload);
    //console.log('req', req);

    if(!body.url) res.send('{"error":"missing url"}'); return;
    
    let data = await axios({
        url: body.url,
        method: body.method || 'get',
        responseType: body.responseType || 'json'
    });

    if(body.responseType === 'arraybuffer')
        res.send(data.data.toString('base64'));
    else
        res.send(data.data);
    
    //res.send('Yo!');
});
app.listen(process.env.PORT || 3000);
