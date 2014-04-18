/**
 * @author CELESTINE
 */
function toggleBox(a) {
	
	if ($(a).on(':click'))
	{
		$("#replym").show();
		$("#login_form").hide();
		$("#create_form").show();
		
	}
	else if($(a).on(':dblclick'))
	{
		$("#replym").hide();
	}
}

function check_user(e) {
	e.preventDefault;
	var user = $('#userName').val();
	if(user == null || user.trim() == "") {
		alert("Enter a valid username/id");
	} else {
		
		//var $user = $('user');
		//e.preventDefault;
		//var jsObj = $user.serializeObject();
		login(user);
	}
}

function send_msg(jsObj) {
	
	 //cancel form submit 

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
				//$('#div_ajaxResponse').text( data[0].MSG );
				alert("Message Sent");
				window.location.assign("#inbox");
			}
		},
		complete: function(XMLHttpRequest) {
			//console.log(XMLHttpRequest.getAllResponseHeaders() );
		},
		dataType: "json"  //request JSON
	};
	$.ajax(ajaxObj);
}


function update_msg(user, Id, stat, f_Id) {
	var jsObj = new Object();
	jsObj['message_status_id'] = stat;
	jsObj['flag_id'] = f_Id;
	jsObj['user_id'] = user;
	jsObj['id'] = Id;
	
	 //cancel form submit 

	ajaxObj = {};

	ajaxObj = {
		type: "PUT",
		url: "http://localhost:8080/com.bykart.cmp/api/v3/messages/",
		data: JSON.stringify(jsObj),
		contentType: "application/json",
		error: function(jqXHR, textStatus, errorThrown) {
			console.log("Error " + jqXHR.getAllResponseHeaders() + " " + errorThrown);
		},
		success: function(data) {
			
			if(data[0].HTTP_CODE == 200) {
				console.log("update successful");
			}
		},
		complete: function(XMLHttpRequest) {
			
		},
		dataType: "json"  //request JSON
	};
	$.ajax(ajaxObj);
}


function reply_message(jsObj) {
	var user = localStorage.getItem('userId');
	var sender = localStorage.getItem('senderId');
	var subj = localStorage.getItem('subject');
	var thrdId = localStorage.getItem('threadId');
	jsObj['sender_id'] = user;
	jsObj['subject'] = subj;
	jsObj['user_id'] = sender;
	jsObj['thread_id'] = thrdId;
	jsObj['message_body'] = $("#message_body1").val();
	jsObj['priority_id'] = $("priority_id1").val();
	
	ajaxObj = {};

	ajaxObj = {
		type: "POST",
		url: "http://localhost:8080/com.bykart.cmp/api/v3/messages/reply",
		data: JSON.stringify(jsObj),
		contentType: "application/json",
		error: function(jqXHR, textStatus, errorThrown) {
			console.log("Error " + jqXHR.getAllResponseHeaders() + " " + errorThrown);
		},
		success: function(data) {
			if(data[0].HTTP_CODE == 200) {
				alert(data[0].MSG);
			}
		},
		complete: function(XMLHttpRequest) {
		},
		dataType: "json"  //request JSON
	};
	$.ajax(ajaxObj);
}

function get_messages(user) {
	var userId = user;
	
	ajaxObj = {};
	
	
	ajaxObj = {
		 type: "GET",
		 url: "http://localhost:8080/com.bykart.cmp/api/v2/messages",
		 contentType: "application/json",
		 data: {'userid':userId},
		 error: function(jqXHR, textStatus, errorThrown) {
			 alert("server fail to connect");
			 },
			 success: function(data) {
					// $('#div_ajaxResponse').text(JSON.stringify(data[0]));
				 display_data(JSON.stringify(data[0]));
			 }
			 /*complete: function(XNLHttpRequest) {
				 
			 },*/
			 //dataType: "json
	 };
	
	$.ajax(ajaxObj);
}

function get_spec_message(user, Id) {
	
	ajaxObj = {};
	
	ajaxObj = {
		 type: "GET",
		 url: "http://localhost:8080/com.bykart.cmp/api/v2/messages/specific",
		 contentType: "application/json",
		 data: {'userid':user, 'id': Id},
		 error: function(jqXHR, textStatus, errorThrown) {
			 alert("server fail to connect");
			 },
			 success: function(data) {
				 process_data(JSON.stringify(data[0]));
			 }
			 /*complete: function(XNLHttpRequest) {
				 
			 },*/
			 //dataType: "json
	 };
	
	$.ajax(ajaxObj);
}

function login(user) { 
	
		ajaxObj = {};
		
		ajaxObj = {
			 type: "GET",
			 url: "http://localhost:8080/com.bykart.cmp/api/v1/login",
			 contentType: "application/json",
			 data: {'userid': user},
			 error: function(jqXHR, textStatus, errorThrown) {
				 alert("server fail to connect");
				 },
				 success: function(data) {
						
					 var result = data;
					 if (result.length == 0) {
						 alert("User id does not exit");
					 }
					 
					 for (var i= 0; i < result.length; i++ ) {
						 
					 if(result.hasOwnProperty(i)) {
						 var us = result[0].id;
						 
						 if(result[0].id == null || result[0].id == "") {
							 
							 alert("user id is not valid");
							 
						 } else {
							 
							 window.location.assign("#inbox");
							 get_messages(user);
							 
							 $('#sender_id').val(user);
							 localStorage.setItem('userId', user);
							
						 }
						 
					 }
				 }	 	 
			 }
		 };
		$.ajax(ajaxObj);
}

function display_data(data) {
	
	var result = JSON.parse(data);
	var code = "";
	var str = "";
	for (var i= 0; i < result.length; i++ ) {
		
		if(result.hasOwnProperty(i)) {
			var row_id = result[i].id;
			var sender = result[i].sender_id;
			var user = result[i].user_id;
			var topic = result[i].subject;
			var thrd_id = result[i].thread_id;
			var rdate =(new Date(result[i].recieved_date)).toJSON().slice(0,10);
			var now = new Date().toJSON().slice(0,10);
			var diff = moment(now) - moment(rdate);
			var maxD = 86400000;
			var maxD2 = 172800000;
			var status = result[i].message_status_id;
			var m = moment().subtract('days', 10).calendar();
			
			var fId = result[i].flag_id;
			
		
			if(diff <= maxD)
				{
					if(result[i].message_status_id == false) {
						if(result[i].priority_id == 2) {
							
							code = code + '<li class="msglistview" rowid="'+row_id+'" send_id="'+sender+'" sub="'+topic+'" thrd="'+thrd_id+'" flagid="'+fId+'" Stat="'+status+'" data-icon="alert">'
										+'<a href="#mbody"><h3>'+sender+'</h3><p style="color:blue"><strong>'+topic+'</strong></p><p>'
										+result[i].message_body+'</p><p class="ui-li-aside"><strong>'+rdate+'</strong></p></a></li>';
						} else {
							
							code = code + '<li class="msglistview" rowid="'+row_id+'" send_id="'+sender+'" sub="'+topic+'" thrd="'+thrd_id+'" flagid="'+fId+'" Stat="'+status+'" data-icon="false">'
										+'<a href="#mbody"><h3>'+sender+'</h3><p style="color:blue"><strong>'+topic+'</strong></p><p>'
										+result[i].message_body+'</p><p class="ui-li-aside"><strong>'+rdate+'</strong></p></a></li>';	
						}	
					} else {
						
						code = code + '<li class="msglistview" rowid="'+row_id+'" send_id="'+sender+'" sub="'+topic+'" thrd="'+thrd_id+'" flagid="'+fId+'" Stat="'+status+'" data-icon="false">'
									+'<a href="#mbody"><h3>'+sender+'</h3><p><strong>'+topic+'</strong></p><p>'
									+result[i].message_body+'</p><p class="ui-li-aside"><strong>'+rdate+'</strong></p></a></li>';
					}
				}
				else if( diff <= maxD2)
				{
					if(result[i].message_status_id == false) {
						if(result[i].priority_id == 2) {
							
							str = str + '<li class="msglistview" rowid="'+row_id+'" send_id="'+sender+'" sub="'+topic+'" thrd="'+thrd_id+'" flagid="'+fId+'" Stat="'+status+'" data-icon="alert">'
										+'<a href="#mbody"><h3>'+sender+'</h3><p style="color:blue"><strong>'+topic+'</strong></p><p>'
										+result[i].message_body+'</p><p class="ui-li-aside"><strong>'+rdate+'</strong></p></a></li>';
						} else {
							
							str = str + '<li class="msglistview" rowid="'+row_id+'" send_id="'+sender+'" sub="'+topic+'" thrd="'+thrd_id+'" flagid="'+fId+'" Stat="'+status+'" data-icon="false">'
										+'<a href="#mbody"><h3>'+sender+'</h3><p style="color:blue"><strong>'+topic+'</strong></p><p>'
										+result[i].message_body+'</p><p class="ui-li-aside"><strong>'+rdate+'</strong></p></a></li>';	
						}	
					} else {
						
						str = str + '<li class="msglistview" rowid="'+row_id+'" send_id="'+sender+'" sub="'+topic+'" thrd="'+thrd_id+'" flagid="'+fId+'" Stat="'+status+'" data-icon="false">'
									+'<a href="#mbody"><h3>'+sender+'</h3><p><strong>'+topic+'</strong></p><p>'
									+result[i].message_body+'</p><p class="ui-li-aside"><strong>'+rdate+'</strong></p></a></li>';
					}
					
					
				}
				else{}
		}
	}
	 $('#today_msg').html(code);
	 $('#yesterday_msg').html(str);
	 $('#today_msg').listview();
	 $('#yesterday_msg').listview();

	 $('#today_msg').listview('refresh');
	 $('#yesterday_msg').listview('refresh');
	 
	 $(".msglistview").tap(function() {
		 var Id = this.getAttribute('rowid');
		 localStorage.setItem('rowid', Id);
		 var sender = this.getAttribute('send_id');
		 var subj = this.getAttribute('sub');
		 var thr_Id = this.getAttribute('thrd');
		 
		 var stat = this.getAttribute('Stat');
		 var f_Id = this.getAttribute('flagid');
		 
		 var s = stat.toString();
		 
		 localStorage.setItem('senderId', sender);
		 localStorage.setItem('subject', subj);
		 localStorage.setItem('threadId', thr_Id);
		 localStorage.setItem('status', stat);
		 localStorage.setItem('flagId', f_Id);
		 
		 var user = localStorage.getItem('userId');
		 
		 get_spec_message(user, Id);
		 
		 if(s == "false") {
			 
			s = true;
			update_msg(user, Id, s, f_Id);
		 }
	 });
}

function process_data(data) {
	
	var result = JSON.parse(data);
	var htmlstr = "";
	
	if(result.hasOwnProperty(0)) {
		var row_id = result[0].id;
		var user = result[0].user_id;
		var topic = result[0].subject;
		var rdate = (new Date(result[0].recieved_date)).toJSON().slice(0,10);
		var now = new Date().toJSON().slice(0,10);
		
		var msg_status = result[0].message_status_id;
		var f_id = result[0].flag_id;
		localStorage.setItem('flagId', f_id);
		localStorage.setItem('status', msg_status);
		
		if(result[0].flag_id == true ) {
			$("#flg_id").attr('data-theme', 'e');
			
			htmlstr = htmlstr + '<p>Flaged for follow up.</p><h3>'+topic+'</h3><p>Date: '+rdate+'</p><li data-role="fieldcontain">'
								+'<label for="dspFrom">From:</label><input type="text" readonly="readonly" name="dspFrom" id="dspFrom" value="'+result[0].sender_id+
						        '"></li><li data-role="fieldcontain"><label for="dspTo">To:</label><input type="text" readonly="readonly" name="dspTo" id="dspTo" value="'+user+'"></li>';
		}
		else if(result[0].flag_id == false) {
			$("#flg_id").attr('data-theme', 'a');
			htmlstr = htmlstr + '<h3>'+topic+'</h3><p>Date: '+rdate+'</p><li data-role="fieldcontain">'
								+'<label for="dspFrom">From:</label><input type="text" readonly="readonly" name="dspFrom" id="dspFrom" value="'+result[0].sender_id+
								'"></li><li data-role="fieldcontain"><label for="dspTo">To:</label><input readonly="readonly" type="text" name="dspTo" id="dspTo" value="'+user+'"></li>';
		}	
	}
	$("#message_display").html(htmlstr);
	$("#msg_disp1").text(result[0].sender_id);
	$("#msg_disp").text(result[0].message_body);
	
	$('#message_display').refresh;
}