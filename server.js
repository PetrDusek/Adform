var request = require('request').defaults({ jar: false });
var et = require('elementtree');
var fs = require('fs')
var Promise = require('es6-promise').Promise;

/*
var login = function(username, password, callback) {
    var body = {
        'UserName': 'RS-remecz',
        'Password': 'A3S4MpjSzx9H'
    };
    var uri = 'https://api.adform.com/Services/SecurityService.svc/JSON/Login';

    request.post({
            'json': true,
            'body': body,
            'uri': uri,
            'headers': {
                'content-length': body.length
            }
        },
        function(err, res, ticket) {
          uploadFile(ticket)
        }
    );
};

var uploadFile = function(ticket){

  fs.createReadStream('myfile.txt').pipe(request.post({
          'uri': 'http://api.adform.com/dsp/v1/upload/cookies',
          'headers': {
              'ticket': ticket
          }
      }, function (err, resp, body) {
    if (err) {
      console.log('Error!');
    } else {
      console.log('URL: ' + body);
    }
  }))
} */

var loginPromise = new Promise(function(resolve, reject){
  var body = {
      'UserName': 'RS-remecz',
      'Password': 'A3S4MpjSzx9H'
  };
  var uri = 'https://api.adform.com/Services/SecurityService.svc/JSON/Login';

  request.post({
          'json': true,
          'body': body,
          'uri': uri,
          'headers': {
              'content-length': body.length
          }
      },
      function(err, res, ticket) {
        if(err){
          reject(err)
        }else{
          resolve(ticket)
        }
      }
  );
}).then(function(ticket){
  fs.createReadStream('myfile.txt').pipe(request.post({
          'uri': 'http://api.adform.com/dsp/v1/upload/cookies',
          'headers': {
              'ticket': ticket
          }
      }, function (err, resp, body) {
    if (err) {
      console.log('Error!');
    } else {
      console.log('URL: ' + body);
    }
  }))
},
function(err){
  console.log(err)
})


//loginPromise();
