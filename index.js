const axios = require('axios');
const express = require('express');
const app = express();
app.all('/', (req, res) => {
    console.log(req);
    
    res.send('Yo!');
});
app.listen(process.env.PORT || 3000);
