'use strict';
var fs = require('fs');
var pdf = require('html-pdf');

var http = require('http');
var options = {
    hostname: 'www.protractortest.org',
    port: 80,
    path: '/',
    method: 'GET'
};
var arr1 = [];
var arr2;
var req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        arr1.push(chunk);
    });
    res.on('end', () => {
        var arr3 = arr1.join('');
        console.log(arr3);
        var options = { format: 'Letter' };
        pdf.create(arr3).toFile('asdf.pdf',function(err, res){
            console.log(res.filename);
        });
        pdf.create(arr3).toBuffer(function(err, buffer){
            console.log(buffer);
            arr2 = buffer;
        });
    });
});

req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
});
//req.write(arr2);
req.end();
