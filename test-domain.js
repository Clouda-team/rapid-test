/**
 * New node file
 * 
 * @depends clouda-httpserver
 * 
 * 
 */
var sockjs = require("sockjs");
var http = require("http");
var domain = require("domain");
var objStr = "" , objStrIndex = 0;

var randomStr =function(_len){
    for(var str = "" , len = _len || 10 ; str.length < len ; str += (~~(Math.random() * 36)).toString(36));
    return str;
};

