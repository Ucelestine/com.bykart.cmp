

$(document).ready(function() {
	//console.log("ready");
	
	var $test_form = $('#test_form');
	
	var $compose_form = $('#compose_form');
	
	/*
	 * This is for Submit button
	 * it trigger an ajax Post call to: api/v2/message
	 * This will submit a item entry to our message datebase
	 */
	$('#btnSubmit1').click(function(e) {
		//console.log("submit button has been clicked");
		e.preventDefault(); //cancel form submit
		//string subject = "Market";
		//user = localStorage.getItem('user');
		//$test_form['subject'] = subject; 
		
		var jsObj = $test_form.serializeObject(),
				ajaxObj = {};
		
		//console.log(jsObj);
		
		ajaxObj = {
				type: "POST",
				url: "http://localhost:8080/com.bykart.cmp/api/v2/messages/",
				data: JSON.stringify(jsObj),
				contentType:"application/json",
				error: function(jqXHR, textStatus, errorThrown) {
					console.log("Error" + jqXHR.getAllResponseHeaders() + " " + errorThrown);
				},
				success: function(data) {
					//console.log(data);
					if (data[0].HTTP_CODE == 200) {
						$('#div_ajaxResponse').text(data[0].MSG);
					}
				},
				complete: function(XMLHttpRequest) {
					//console.log(XMLHttpRequest.getAllResponseHeaders() );
				},
				dataType: "json" //request JSON
		};
		
		$.ajax(ajaxObj);
	});
	/*
	 * This is for v2
	 * 
	 * 
	 */
	$('#btnSubmit').click(function(e) {
		//console.log("submit button has been clicked");
		e.preventDefault(); //cancel form submit
		
		//string user = "123457js";
		//user = localStorage.getItem('user');
		//$test_form['user_id'] = user; 
	
	var jsObj = $test_form.serializeObject(),
		ajaxObj = {};
	
	//console.log(jsObj);
	
	ajaxObj = {
			type: "POST",
			url: "http://localhost:8080/com.bykart.cmp/api/v3/messages/",
			data: JSON.stringify(jsObj),
			contentType: "application/json",
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error " + jqXHR.getAllResponseHeaders() + " " + errorThrown);
			},
			success: function(data) {
				//console.log(data);
				if(data[0].HTTP_CODE == 200) {
					$('#div_ajaxResponse').text( data[0].MSG );
				}
			},
			complete: function(XMLHttpRequest) {
				//console.log(XMLHttpRequest.getAllResponseHeaders() );
			},
			dataType: "json"  //request JSON
		};
		$.ajax(ajaxObj);
	});
	
	
	$('#btnSend').click(function(e) {
		e.preventDefault();
		
		var jsObj = $compose_form.serializeObject(),
			ajaxObj = {};
		
		ajaxObj = {
				type: "POST",
				url: "http://localhost:8080/com.bykart.cmp/api/v3/messages/",
				data: JSON.stringify(jsObj),
				contentType: "application/json",
				error: function(jqXHR, textStatus, errorThrown) {
					console.log("Error" + jqXHR.getAllResponseHeaders() + " " + errorThrown);
				},
				success: function(data) {
					if(data[0].HTTP_CODE == 200) {
						$('#div_ajaxResponse').text(data[0].MSG );
					}
				},
				complete: function(XMLHttpRequest) {
					
				},
				dataType: "json"
		};
		$.ajax(ajaxObj);

	});
	
	$('#btnDisplay').tap(function(e) {
		e.preventDefault();
		ajaxObj = {};
		
		
		ajaxObj = {
			 type: "GET",
			 url: "http://localhost:8080/com.bykart.cmp/api/v2/messages",
			 contentType: "application/json",
			 data: {'userid':'123457js'},
			 error: function(jqXHR, textStatus, errorThrown) {
				 alert("server fail to connect");
				 },
				 success: function(data) {
						// $('#div_ajaxResponse').text(JSON.stringify(data[0]));
						 process_data(JSON.stringify(data[0]));
				 }
				 /*complete: function(XNLHttpRequest) {
					 
				 },*/
				 //dataType: "json
		 };
		
		$.ajax(ajaxObj);
	});
	
});  


function process_data(data) {
	
	var result = JSON.parse(data);
	var code = "";
	
	
	
	for (var i= 0; i < result.length; i++ ) {
		
		if(result.hasOwnProperty(i)) {
			//alert(result[i].id);
			var row_id = result[i].id;
			var user = result[i].user_id;
			var topic = result[i].subject;
			var rdate = result[i].recieved_date;
			var now = new Date().toJSON().slice(0,10);
			
			if( (now - rdate) < 1) {
				code = '<li data-role="list-divider">Todays Messages<span class="ui-li-count">1</span></li>';
			} else if( !(now - rdate > 2)) {
				code = '<li data-role="list-divider">yesterday messages<span class="ui-li-count">1</span></li>';
			} else {
				
			}
			code = code + '<li rowid="'+row_id+'"><a href="#mbody"><h3>'+user+'</h3><p><strong>'+topic+'</strong></p><p>'
			+result[i].message_body+'</p><p class="ui-li-aside"><strong>'+rdate+'</strong></p></a></li>';
			
		}
		
		
		
	}
	 $('#div_ajaxResponse').html(code);
	 $('#div_ajaxResponse').listview();

	 $('#div_ajaxResponse').listview('refresh');
}
	
	/*var entry;
	var name;
	var count;
	for(var i= 0; i< result.length; i++) {
	entry = result;
	
	display(entry["id"], entry["user_id"], message_body, sender_id, entry["thread_id"], entry["recieved_date"], entry["priority_id"], entry["message_status_id"], entry["flag_id"]);
	count = 0;
	
	for (name in entry) {
		display(name);
	
		// = code + '<li data-role="list-divider">Date:'+result[count]["recieved_date"]+' </li><li><a href="#mbody"><p>'
		//+result["message_body"]+ '</p></a></li>';
		
		count++;
	}
	console.log(display("keys:" + count));
	
	}
	$('#msbody').html(code);*/




/*function ajaxCallSucceed(response) {

    var products = eval('(' + response.d + ')');

    for (var i = 0; i < products.length; i++) {
        //do something
    }
}*/