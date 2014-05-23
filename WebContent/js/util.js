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

function addDefMsg(val) {
	$('#message_body').text(val);	
}

function addDefMsg1(val) {
	$('#message_body1').text(val);	
}

function check_user(e) {
	e.preventDefault;
	var user = $('#userName').val();
	if(user == null || user.trim() == "") {
		alert("Enter a valid username/id");
	} else {
		login(user);
	}
}

function send_msg(jsObj) {
	
	 //cancel form submit 

	ajaxObj = {};

	ajaxObj = {
		type: "POST",
		url: "http://localhost:8080/com.bykart.cmp/api/v3/messages/",
		data: JSON.stringify(jsObj),
		contentType: "application/json",
		error: function(jqXHR, textStatus, errorThrown) {
			console.log("Error " + jqXHR.getAllResponseHeaders() + " " + errorThrown);
			alert("message failed to send due to invalid userid entered or server error");
		},
		success: function(data) {
			//console.log(data);
			if(data[0].HTTP_CODE == 200) {
				alert("Message Sent");
				window.location.assign("#inbox");
			}
		},
		complete: function(XMLHttpRequest) {
			 
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
				
				var thr_id = localStorage.getItem('threadId');
				get_spec_message(user, thr_id);
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

function get_users() {
	
	ajaxObj = {};
	
	ajaxObj = {
		 type: "GET",
		 url: "http://localhost:8080/com.bykart.cmp/api/v1/users",
		 contentType: "application/json",
		 data: "",
		 error: function(jqXHR, textStatus, errorThrown) {
			 alert("server fail to connect");
			 },
			 success: function(data) {
				 users_data(JSON.stringify(data[0]));
			 }
	 };
	
	$.ajax(ajaxObj);
}

function users_data(data) {
	var result = JSON.parse(data);
	var selStr = "";
	var len = result.length;
		
	for(var i = 0; i < len; i++) {
			
		if(result.hasOwnProperty(i)) { 
			
			selStr = selStr + '<option value="'+result[i].id+'">'+result[i].firstname+' '+result[i].lastname+'</option>'; 
			
		}
	}
	$('#user_id').html(selStr);
	$('#user_id').trigger('create');
}

function get_spec_message(user, thr_Id) {
	
	ajaxObj = {};
	
	ajaxObj = {
		 type: "GET",
		 url: "http://localhost:8080/com.bykart.cmp/api/v2/messages/specific",
		 contentType: "application/json",
		 data: {'userid':user, 'id': thr_Id},
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

function setFlagMsg(Id, f_Id) {
	var user = localStorage.getItem('userId');
	var stat = localStorage.getItem('status');
	
	
	if (f_Id == false) {
		f_Id = true;
		update_msg(user, Id, stat, f_Id);
	}
	else {
		f_Id = false;
		update_msg(user, Id, stat, f_Id);
	}
}

function logout() {
	localStorage.clear();
	window.location.href = "http://localhost:8080/com.bykart.cmp";
	
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
			var rdate =new Date(result[i].recieved_date).toUTCString();
			var now = new Date().toJSON();
			var diff = moment(now) - moment(rdate);
			var maxD = 86400000;
			var maxD2 = 172800000;
			var status = result[i].message_status_id;
			var m = moment().subtract('days', 10).calendar();
			
			var fId = result[i].flag_id;
			var col = "a";
			var icon = false;
			if (result[i].flag_id = true) {
				col = "b";
				icon = "info";
			}
			
		
			if(diff < maxD)
				{
					if(result[i].message_status_id == false) {
						if(result[i].priority_id == 2) {
							
							code = code + '<li class="msglistview" rowid="'+row_id+'" send_id="'+sender+'" sub="'+topic+'" thrd="'+thrd_id+'" flagid="'+fId+'" Stat="'+status+'" data-icon="alert">'
										+'<a href="#mbody"><h3>'+result[i].firstname+' '+result[i].lastname+'</h3><p style="color:blue"><strong>'+topic+'</strong></p><p>'
										+result[i].message_body+'</p><p class="ui-li-aside"><strong>'+rdate+'</strong></p></a></li>';
						} else {
							
							code = code + '<li class="msglistview" rowid="'+row_id+'" send_id="'+sender+'" sub="'+topic+'" thrd="'+thrd_id+'" flagid="'+fId+'" Stat="'+status+'" data-icon="false">'
										+'<a href="#mbody"><h3>'+result[i].firstname+' '+result[i].lastname+'</h3><p style="color:blue"><strong>'+topic+'</strong></p><p>'
										+result[i].message_body+'</p><p class="ui-li-aside"><strong>'+rdate+'</strong></p></a></li>';	
						}
					} else {
						
						code = code + '<li class="msglistview" rowid="'+row_id+'" send_id="'+sender+'" sub="'+topic+'" thrd="'+thrd_id+'" flagid="'+fId+'" Stat="'+status+'" data-icon="false">'
									+'<a href="#mbody"><h3>'+result[i].firstname+' '+result[i].lastname+'</h3><p><strong>'+topic+'</strong></p><p>'
									+result[i].message_body+'</p><p class="ui-li-aside"><strong>'+rdate+'</strong></p></a></li>';
					}
				}
				else if( diff < maxD2)
				{
					if(result[i].message_status_id == false) {
						if(result[i].priority_id == 2) {
							
							str = str + '<li class="msglistview" rowid="'+row_id+'" send_id="'+sender+'" sub="'+topic+'" thrd="'+thrd_id+'" flagid="'+fId+'" Stat="'+status+'" data-icon="alert">'
										+'<a href="#mbody"><h3>'+result[i].firstname+' '+result[i].lastname+'</h3><p style="color:blue"><strong>'+topic+'</strong></p><p>'
										+result[i].message_body+'</p><p class="ui-li-aside"><strong>'+rdate+'</strong></p></a></li>';
						} else {
							
							str = str + '<li class="msglistview" rowid="'+row_id+'" send_id="'+sender+'" sub="'+topic+'" thrd="'+thrd_id+'" flagid="'+fId+'" Stat="'+status+'" data-icon="false">'
										+'<a href="#mbody"><h3>'+result[i].firstname+' '+result[i].lastname+'</h3><p style="color:blue"><strong>'+topic+'</strong></p><p>'
										+result[i].message_body+'</p><p class="ui-li-aside"><strong>'+rdate+'</strong></p></a></li>';	
						}	
					} else {
						
						str = str + '<li class="msglistview" rowid="'+row_id+'" send_id="'+sender+'" sub="'+topic+'" thrd="'+thrd_id+'" flagid="'+fId+'" Stat="'+status+'" data-icon="false">'
									+'<a href="#mbody"><h3>'+result[i].firstname+' '+result[i].lastname+'</h3><p><strong>'+topic+'</strong></p><p>'
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
	 $("today_msg").trigger('create');
	 $("yesterday_msg").trigger('create');
	 
	 
	 $(".msglistview").tap(function() {
		 var Id = this.getAttribute('rowid');
		 localStorage.setItem('rowid', Id);
		 var sender = this.getAttribute('send_id');
		 var subj = this.getAttribute('sub');
		 var thr_Id = this.getAttribute('thrd');
		 
		 var stat = this.getAttribute('Stat');
		 var f_Id = this.getAttribute('flagid');
		 
		 //var s = stat.toString();
		 
		 localStorage.setItem('senderId', sender);
		 localStorage.setItem('subject', subj);
		 localStorage.setItem('threadId', thr_Id);
		 localStorage.setItem('status', stat);
		 localStorage.setItem('flagId', f_Id);
		 
		 var user = localStorage.getItem('userId');
		 
		 get_spec_message(user, thr_Id);
		 
		 if(stat.toString() == "false") {
			 
			stat = true;
			localStorage.setItem('status', stat);
			update_msg(user, Id, stat, f_Id);
		 }
		 else
			 stat = false;
	 });
}

function process_data(data) {
	
	var result = JSON.parse(data);
	var htmlstr = "";
	var hStr = "";
	var flg = "";
	var len = result.length;
	
		if(result.hasOwnProperty(0)) {
			var row_id = result[0].id;
			var user = result[0].user_id;
			var topic = result[0].subject;
			var rdate = (new Date(result[0].recieved_date)).toUTCString();
			var now = new Date().toJSON();
			
			var msg_status = result[0].message_status_id;
			var f_id = result[0].flag_id;
			localStorage.setItem('flagId', f_id);
			localStorage.setItem('status', msg_status);
				
			if(result[0].flag_id == true ) {
				$("#flg_id").attr('data-theme', 'a');
				
				
				htmlstr = htmlstr + '<p style="float:right">Flaged for follow up.</p><h3>'+topic+'</h3><p>Date: '+rdate+'</p>'
								  +'<li data-role="fieldcontain"><label for="dspFrom">From:</label>'
								  +'<input type="text" readonly="readonly" name="dspFrom" id="dspFrom" value="'+result[0].sender_id+'">'
								  +'</li><li data-role="fieldcontain"><label for="dspTo">To:</label>'
								  +'<input type="text" readonly="readonly" name="dspTo" id="dspTo" value="'+result[0].firstname+' '+result[0].lastname+'">'
								  +'</br><p>'+result[0].message_body+'</p><hr></hr></li>';
				
				
				for (var i = 1; i < result.length; i++)
					{
					
						hStr = hStr +'<a href="#" onclick="setFlagMsg('+result[i].id+', '+result[i].flag_id+'); return false;" data-role="button" data-iconpos="notext" data-inline="true" '
									+'class="ui-icon-shadow" style="float:right" data-icon="star" id="flg_id">Flag</a>'
									+'<li data-role="fieldcontain"><p style="float:right">Flaged for follow up.</p>'
									+'<p><span style="font-weight: bold">From:</span>'+result[i].sender_id+'</p>'
									+'<p><span style="font-weight: bold">Sent:</span>'+new Date(result[i].recieved_date).toUTCString()+'</p>'
									+'<p><span style="font-weight: bold">To:</span>'+result[i].firstname+' '+result[i].lastname+'</p>'
									+'<p><span style="font-weight: bold">Subject:</span>'+result[i].subject+'</p>'
									+'</br><p>'+result[i].message_body+'</p><hr></hr></li>';
					}
			}
			else if(result[0].flag_id == false) {
				$("#flg_id").attr('data-theme', 'b');
				
				htmlstr = htmlstr +'<h3>'+topic+'</h3><p>Date: '+rdate+'</p><li icon-diplay="false data-role="fieldcontain">'
								  +'<label for="dspFrom">From:</label><input type="text" readonly="readonly" name="dspFrom" id="dspFrom" value="'+result[0].sender_id+'">'
								  +'</li><li data-role="fieldcontain"><label for="dspTo">To:</label>'
								  +'<input readonly="readonly" type="text" name="dspTo" id="dspTo" value="'+result[0].firstname+' '+result[0].lastname+'">'
								  +'</br><p>'+result[0].message_body+'</p><hr></hr></li>';
				
				for (var i = 1; i < result.length; i++)
					{
					
						hStr = hStr +'<a href="#" onclick="setFlagMsg('+result[i].id+', '+result[i].flag_id+'); return false;" data-role="button" data-inline="true" class="ui-icon-shadow"'
									+' data-iconpos="notext" style="float:right" data-icon="star" id="flg_id">Flag</a>'
									+'<li data-role="fieldcontain"><p><span style="font-weight: bold">From: </span>'+result[i].sender_id+'</p>'
									+'<p><span style="font-weight: bold">Sent: </span>'+new Date(result[i].recieved_date).toUTCString()+'</p>'
									+'<p><span style="font-weight: bold">To: </span>'+result[i].firstname+' '+result[i].lastname+'</p>'
									+'<p><span style="font-weight: bold">Subject: </span>'+result[i].subject+'</p>'
									+'</br><p>'+result[i].message_body+'</p><hr></hr></li>';
					}
			}
	}

	$("#message_display").html(htmlstr);
	$("#message_display").listview();
	$('#message_display').listview('refresh');
	$('#disp_list').html(hStr);
	$('#disp_list').listview();
	$('#disp_list').listview('refresh');
	$("#message_display").trigger('create');
	$("#disp_list").trigger('create');
	
}

