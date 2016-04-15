var https = require("https");
var async = require("async");


var options = {
    host: 'api.imgur.com',
    path: '/3/gallery/search/time/all/0/?q_all=cat,dog',
    method: 'GET',
    headers: {
          'Authorization': 'Client-ID e416f3a8a84ae86'
        }
};

var str = '';

var req = https.request(options, function(res) {
    
    res.on('data', function(chunk) {
       str += chunk; 
    });
    
    res.on('end', function() {
        console.log(str);
    });
    
});
req.end();
