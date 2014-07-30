/**
 * New node file
 */
var path =require("path");
var httpd = rapid.use("plugin.rapid-httpserver");

httpd.defineFilter("whatFilter",function(){
	this.setHeader({"x-set-by-filter-what":"whatisthis"});
	this.next();
});

httpd.defineFilter("whoFilter",function(){
	this.setHeader({"x-set-by-filter-who":"whoisthis"});
	this.next();
});

httpd.defineFilter("howFilter",['default_request'],function(req){
	
	this.setHeader({"x-set-by-filter-how":"howdothis"});
	this.setHeader(
		"x-request-headers-count", Object.keys(req.headers).length
	);
	
	this.next();
});

httpd.defineAction("replace_error",['default_response'],function(res){
	httpd.defineAction("error",function(){
		this.send(JSON.stringify(this.params) , 500 , "application/json");
	});
	res.end("ok! back and clieck 5 or 6");
});

httpd.defineAction("simpleEcho",['default_response'],function(res){
	this.parseParams(function(err,params){
		res.end(params.msg);
	})
});

httpd.defineAction("forwardImg",function(){
	this.forward("sendImg");
});

httpd.defineAction("sendImg",function(){
	this.sendFile(path.join(ROOT_DIR,"/app/img.jpg"));
});

httpd.defineAction("redirectTo",function(){
	this.parseParams(function(err,params){
		var url = params.to || "http://www.baidu.com";
		this.redirect(url);
	});
});

httpd.defineAction("redirectTo",function(){
	this.parseParams(function(err,params){
		var url = params.to || "http://www.baidu.com";
		this.redirect(url);
	});
});

httpd.defineAction("testcookie",["cookie"],function(cookie){
	var a = cookie.get("a") || 0;
	var lastB = cookie.get("b") || "never be set" ;
	
	var tpl = "<html><body>" +
				"get values : <br /> a : {{a}}, <br /> b : {{b}}"
			"</body></html>";
	
	cookie.set("a",++a);
	cookie.set("b",Date.now());
	
	var content = this.renderStr("setcookie",{a:a,b:lastB});
	
	this.send(content);
});

httpd.defineAction("removecookie",["cookie"],function(cookie){
	cookie.set("a",null,{expires:new Date(Date.now() - 100000)});
	cookie.set("b",null,{expires:new Date(Date.now() - 100000)});
	this.send('remove cooke done! check result to the <a href="/">index.html</a>');
});