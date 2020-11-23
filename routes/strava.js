var express = require('express');
var router = express.Router();
var async  = require('express-async-await')
var fetch = require('node-fetch')
require('dotenv').config()

/*Get main page*/
router.get('/', function(req, res, next) {
    res.send('Strava endpoints');
  });

/* Get User Token*/
router.get('/token/:userCode', async function(req, res, next) {
    const userCode = req.params.userCode;
    console.log('Looking for tokens for user code: ', userCode);
    try{
        fetch("https://www.strava.com/oauth/token?" + 
        new URLSearchParams(
        {client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: userCode,
        grant_type: 'authorization_code'
        }),{
        "method": "POST",
        "credentials": "include",
        "headers": {
            'Connection': 'close',
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
        },
    }
    ).then(response => response.json())
    .then(response => {
        console.log(response);
        res.send(response);
    })
}
    catch(error){
        console.log(error);
    }
});


module.exports = router;
