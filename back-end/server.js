const express = require('express');
const app = express();
// const https = require('https')
// const querystring = require('querystring')
const request = require('request');

// Uses localhost:5000 as default
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/check_tokens', (req, res) => {
    console.log(localStorage.getItem('access_token'));
    console.log(localStorage.getItem('refresh_token'));
});

app.get('/login', function(req, res) {
    var my_client_id = 'dd376697df114ad4be9bfa8c54428c27'

    var redirect_uri = 'http://localhost:5000/callback';
    var scopes = 'user-read-private user-read-email';
    // Later: Create a random state and add to res.redirect url
    console.log(scopes)
    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + my_client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes):'') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

app.get('/callback', function(req, res) {
    var grant_type = 'authorization_code';
    var code = req.query.code;

    var my_client_id = 'dd376697df114ad4be9bfa8c54428c27';
    var my_client_secret = '548828f42c9b411c9cd76e4bf5fe43ac';

    var redirect_uri = encodeURIComponent('http://localhost:5000/callback');
    var authorization = "Basic " + Buffer.from(my_client_id + ":" + my_client_secret).toString('base64');

    var headers = {
        'Authorization': authorization,
        'Content-Type': "application/x-www-form-urlencoded"
    };

    var dataString = 'grant_type='+ grant_type + '&code=' + code + '&redirect_uri=' + redirect_uri;

    var options = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: headers,
        body: dataString
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
            var bodyObject = JSON.parse(body)
            console.log(bodyObject.access_token)
            console.log(bodyObject.refresh_token)
            res.send(body)
        }
    }

    request(options, callback);
});

// app.get('/authorized', function(req, res) {
//
// });



app.listen(port, () => console.log('Listening on port ') + port);
