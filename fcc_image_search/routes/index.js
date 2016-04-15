var express = require('express');
var router = express.Router();
var https = require("https");


var Search = require('../models/search.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/searches', function(req, res, next) {
    Search.find({}).limit(10).sort('-when').exec( function ( err, doc) {
        if(err) throw err;
        res.send(doc);    
    });
});


router.get('/images', function(req, response, next) {
    if(req.query.terms) {
        var search = new Search({term : req.query.terms});
        search.save();
        
        var page = req.query.page;
        
        if(!page) page = 0;
        
        
        var options = {
            host: 'api.imgur.com',
            path: '/3/gallery/search/time/all/' + page + '/?q_all=' + req.query.terms,
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
                var imgData = JSON.parse(str).data;
                
                var img = [];
                
                for( var i = 0; i < imgData.length; i++) {
                    var item = {
                        page : 'http://www.imgur.com/' + imgData[i].id,
                        link : imgData[i].link,
                        text : imgData[i].title
                    };
                    
                    img.push(item);
                    
                }
                
                response.send(JSON.stringify(img));
                
                
            });
            
        });
        req.end();

    } else {
        var resp = {message : "You must use the format '../images?terms=some,search,terms&page=1' even though 'undefined' image search has hilarious results."};
        response.send(JSON.stringify(resp));
    }

});

module.exports = router;
