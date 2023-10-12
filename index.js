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


app.get('/oref', async (req, res) => {
    
    const https = require('follow-redirects').https;
    const fs = require('fs');
    
    let options = {
      'method': 'GET',
      'hostname': 'www.oref.org.il',
      'path': '/WarningMessages/alert/alerts.json',
      'headers': {
        'Referer': 'https://www.oref.org.il/12481-he/Pakar.aspx',
        'X-Requested-With': 'XMLHttpRequest'
      },
      'maxRedirects': 20
    };
    
    const _req = https.request(options, (res) => {
      let chunks = [];
    
      res.on("data", (chunk) => {
        chunks.push(chunk);
      });
    
      res.on("end", (chunk) => {
        let body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    
      res.on("error", (error) => {
        console.error(error);
      });
    });
    
    _req.end();

    
});
app.post('/proxy/', async (req, res) => {
    let body = req.body;
    console.log('body', body);

    //console.log('url', body.url || 'missing body.url');
    if(!body.url) { res.send('{"error":"missing url"}'); return; }    
    
    let data, err;
    try{
        data = await axios({
            url: body.url,
            method: body.method || 'get',
            headers: body.headers || {},
            responseType: body.responseType || 'json'
        });
        console.log('data', data);
    } catch(ex){ err = ex; console.log('axios fetch error: ' + ex); }
    
    if(!data) { res.send(`{"error": "${err}"}`); return; }    
    
    if(body.responseType === 'arraybuffer')
        res.send(data.data.toString('base64'));
    else
        res.send(data.data);
    
    //res.send('Yo!');
});
app.listen(process.env.PORT || 3000);
