/**
 * New node file
 */
var path =require("path");
var httpd = rapid.use("plugin.rapid-httpserver");

httpd.defineAction("getList",function(){
	var content = JSON.stringify({
		error:0,
		content:[{
			url:"#",
			title:"if you seen this page, the mean is the static resource is working!",
			description:"this response by the default action 'resource'"
		},{
			url:"/redirect?to=" + encodeURI("http://www.taobao.com"),
			title:"redirect to big taobao",
			description:"this response by the default action 'redirect'"
		},{
			url:"/get_img",
			title:"get the picture for a cat"
		},{
			url:"/forward",
			title:"forward to that picture for a cat",
			description:"this response by the default action 'forward'"
		},{
			url:"/async_error",
			title:"you can get an error after 2 seconds!",
			description:"the error throws on a different I/O event by timer , <br /> and the response by the action name is 'error', you can redefine this action, try it [7 replace_error]"
		},{
			url:"/sync_error",
			title:"you can get an error immediate",
			description : "the error throws by action self "
		},{
			url:"/replace_error",
			title:"replace the error handle to use the JSON response",
			description:"Warning: you can replace any action at any time and any where, but nevery go back to the default,  so DO NOT replace that default actions [http_status, resource, forward , redirect] "
		},{
			url:"/testcookie",
			title:"add cookie a = a++,b:Date.now() from server",
			description:"this is to use the default extension 'cookie' , render by swig."
		},{
			url:"/removecookie",
			title:"remove the cookie a and b",
			description:"this is to use the default extension 'cookie'"
		},{
			url:"javascript:alert(document.cookie)",
			title:"alert the document.cookie"
		}]
	})
	this.send(content,200,"application/json");
});