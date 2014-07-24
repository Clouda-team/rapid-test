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
//
//server = sockjs.createServer({
//	prefix:"/services"
//});
//
//var fakeError = {
//		onMsg : function(){
//			//setTimeout(function(){
//				throw new Error("this is the error");
//			//},0)
//		}
//}
//
//var httpd = http.createServer(function(req,res){
//	res.end("nothing");
//});
//
//server.installHandlers(httpd);
//
//server.on("connection", function(conn) {
//	console.log("connection..");
//	var domain = Domain.create();
//	
//	domain.on("error",function(err){
//		// 致命错误..关闭连接.
//		console.log("error...\n %s" + err.stack);
//		//conn.write();
//		//setImmediate(function(){
//			/**
//			 * 防止一个莫明奇妙的错误.
//			 * buffer.js:184
//        	 * 		this.length = +subject.length > 0 ? Math.ceil(subject.length) : 0;
//			 */
//			conn.end(err.stack);
//		//});
//	});
//	
//	
//	//domain.add(conn);
//		conn.on("data",function(originMsg){
//			domain.run(function(){
//				fakeError.onMsg(originMsg);
//			});
//		});
//		
//		conn.on("error",function(err){
//			console.log("on error ");
//			console.log(arguments);
//		});
//		
//		conn.on("close",function(){
//			console.log("dispost domain");
//			domain.dispose();
//		});
//	
//});
//
//httpd.listen(8088,function(){
//	console.log("http on.");
//});


// ------------------------

var ClientPrototype = {
		parseMsg : function(msg){
			var spliceStr = "\n\n", index;
			
			if((index = this.__receiveStr.lastIndexOf(spliceStr)) == -1){
				// waiting next
				return;
			}
			
			// 能完整解析的内容
			var parseStr = this.__receiveStr.substring(0,index);
			
			// 剩余的
			this.__receiveStr = this.__receiveStr.substring(index + 2);
			
			var parseArr = parseStr.split(spliceStr);
			
			var msgs = [];
			
			parseArr.forEach(function(str){
				var decodeStr = decodeURI(str);
				var msg = JSON.parse(decodeStr);
				msgs.push(msg);
			});
			
			console.log(msgs);
		},
		write:function(msg){
			this.__receiveStr += msg;
			this.parseMsg();
		}
};

var Client = function(){
	var me = domain.create();
	
		me.__receiveStr = "";
	
	for(var key in ClientPrototype){
		me[key] = ClientPrototype[key];
	}
	
	return  me;
}

var c = new Client();

var objStr = "" , objStrIndex = 0;

var randomStr =function(_len){
    for(var str = "" , len = _len || 10 ; str.length < len ; str += (~~(Math.random() * 36)).toString(36));
    return str;
};
//
//for(var i = 0 ; i < 1000 ; i ++){
//	objStr  += JSON.stringify({
//		name:randomStr(),
//		num : i ,
//		content : randomStr(~~(Math.random() * 200))
//	}) + "\n\n";
//}
//
////c.receiveMsg(objStr);
//
//var testTimer = setInterval(function(){
//	
//	if(objStrIndex > objStr.length){
//		clearInterval(testTimer);
//		return;
//	}
//	
//	var str = objStr.substr(objStrIndex, 2000);
//	
//	objStrIndex += 2000;
//	
//	console.log("write : %s \n----------------" , str);
//	
//	c.receiveMsg( str);
//},200);
//
//console.log(c);


var arr = [1,2,3,4,5];
arr.forEach(function(item){
	console.log(this);
},{name:"me"});

