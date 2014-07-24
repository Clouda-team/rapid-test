/**
 * New node file
 */
(function(window){
	var ol = document.querySelector("#doTest");
	var list = null;
	
	var xhr = new XMLHttpRequest();
	xhr.open("get","./getTestList",true);
	xhr.onloadend = function(){
		var rs = null;
		switch(this.getResponseHeader("Content-Type")){
			case  "application/json" :
				rs = JSON.parse(this.response);
				
				if(rs.error == 0){
					rs = rs.content;
					
					rs.forEach(function(item){
						var li = document.createElement("li");
						var a = document.createElement("a");
						var descripton = document.createElement("div");
						
						
						li.appendChild(a);
						li.appendChild(descripton);
						
						
						a.href = item.url;
						a.innerHTML = item.title;
						
						descripton.className = item.description ? "description" : "description none"
						descripton.innerHTML = item.description || "None";
						
						ol.appendChild(li);
						
					});
				}
				
				break;
			default:
				rs = this.response;
		}
		console.log(rs);
	};

	xhr.send();
	console.log("123123");
	
})(window);