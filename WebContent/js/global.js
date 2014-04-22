/**
 * @author CELESTINE
 */

var CMPdatabase;
// what is happen
function errorHandler(transaction, error) {
    alert("SQL error: " + error.message);
}

$(document).ready(function() {
	
	//Open the database
	//db = openDatabase('CMPdatabase', '1.0', 'Conestoga MP DB', 2 * 1024 * 1024);
	
	// drop tables if exists
	//dropTables();
	
	//create tables if exists.
	//createTables();
	
	/*$('.listitem').each(function(){
		
		$(this).click(function(e) {
			e.preventDefault;
			var lis = this.getAttribute("value");
			$('#message_body').val(lis);
		});

	});
	
	$(".DefMsgAdd").each(function() {
		$(this).on('tap', (function(e) {
			e.preventDefault;
			var k = this.getAttribute("id");
			$('#message_body').text(k);
			})
			);
		});
	*/
	$('.listitem1').each(function(){
		
		$(this).click(function(e) {
			e.preventDefault;
			var list = $(this).attr("value");
			$('#message_body1').val(list);
			
		});

	});
	
	$('#btnlogin').on('tap',
			check_user
			);
	
	$('#btnSend').on('tap',
			function(e) {
		
		var $create_form = $('#create_form');
		e.preventDefault();
		var jsObj = $create_form.serializeObject();
		send_msg(jsObj);
		var user = localStorage.getItem('userId');
		$('#create_form').refresh;
		$('#create_form').clear;
		get_messages(user);
	});
	
	$('#btnBackToMsg').tap(
			function(e) {
				e.preventDefault;
			var user = localStorage.getItem('userId');
			get_messages(user);
	});
	
	$('#btnSendReply').on('tap',
			function(e) {
		
		var $reply_form = $('#reply_form');
		e.preventDefault(); //cancel form submit 
		var jsObj = $reply_form.serializeObject();
		reply_message(jsObj);
		var user = localStorage.getItem('userId');
		var thr_id = localStorage.getItem('threadId');
		$('#reply_form').refresh;
		$('#reply_form').clear;
		get_spec_message(user, thr_id);
	});
	
	
	$('#btnCancelReply').on('tap',
			function() {
		//e.preventDefault;
		var user = localStorage.getItem('userId');
		//var Id = localStorage.getItem('rowId');
		var thr_id = localStorage.getItem('threadId');
		$('#message_body1').val("");
		$("#replym").hide();
		
		get_spec_message(user, thr_id);
	});
	
	$("#flg_id").on('tap',
		function(e) {
			e.preventDefault;
			var user = localStorage.getItem('userId');
			var Id = localStorage.getItem('rowid');
			var stat = localStorage.getItem('status');
			var f_Id = localStorage.getItem('flagId');
			var thr_id = localStorage.getItem('threadId');
			
			if(f_Id == "false") {
				
				f_Id = true;
				$(this).attr('data-theme', 'b');
				update_msg(user, Id, stat, f_Id);
			}
			else {
				f_Id = false;
				$(this).attr('data-theme', 'a');
				update_msg(user, Id, stat, f_Id);
			}
			get_spec_message(user, thr_id);
		});
	
});
