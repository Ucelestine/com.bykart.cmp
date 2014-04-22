package com.bykart.cmp.messages;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

import com.bykart.dao.Schema_Cmp;

@Path("/v3/messages")
public class V3_messages {
	
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response add_message(String incomingData) throws Exception {
		
		String returnString = null;
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObject = new JSONObject();
		Schema_Cmp dao = new Schema_Cmp();
		
		try {
			JSONObject messageData = new JSONObject(incomingData);
			System.out.println("jsonData: " + messageData.toString());
			
			int http_code = dao.insert_into_message(messageData.optString("user_id"),
														messageData.optString("message_body"),
														messageData.optString("thread_id"), 
														messageData.optString("priority_id"),
														messageData.optString("subject"),
														messageData.optString("recieved_date"), 
														messageData.optString("sender_id") 
														);
			if (http_code == 200) {
				jsonObject.put("HTTP_CODE", "200");
				jsonObject.put("MSG", "Message has been sent sucessfully, Version 3");
				returnString = jsonArray.put(jsonObject).toString();
			}else {
				return Response.status(500).entity("Unable to send message").build();
			}
			System.out.println("returnString: " + returnString );
		}
		catch (Exception ex) {
			ex.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		
		return Response.ok(returnString).build();
	}
	
	
	@PUT
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response update_message(String incomingData) throws Exception {
		
		String returnString = null;
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObject = new JSONObject();
		Schema_Cmp dao = new Schema_Cmp();
		
		try {
			JSONObject messageData = new JSONObject(incomingData);
			System.out.println("jsonData: " + messageData.toString());
			
			int http_code = dao.update_message(messageData.optString("id"),
														messageData.optString("user_id"),
														messageData.optString("flag_id"), 
														messageData.optString("message_status_id") 
														);
			
			if (http_code == 200) {
				jsonObject.put("HTTP_CODE", "200");
				jsonObject.put("MSG", "Message has been sent sucessfully, Version 3");
				returnString = jsonArray.put(jsonObject).toString();
			}else {
				return Response.status(500).entity("Unable to send message").build();
			}
			System.out.println("returnString: " + returnString );
		}
		catch (Exception ex) {
			ex.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		
		return Response.ok(returnString).build();
		
	}
	
	@Path("/reply")
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response add_reply_message(String incomingData) throws Exception {
		
		String returnString = null;
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObject = new JSONObject();
		Schema_Cmp dao = new Schema_Cmp();
		
		try {
			JSONObject messageData = new JSONObject(incomingData);
			System.out.println("jsonData: " + messageData.toString());
			
			int http_code = dao.reply_to_message(messageData.optString("user_id"),
														messageData.optString("message_body1"),
														messageData.optString("thread_id"), 
														messageData.optString("priority_id1"),
														messageData.optString("subject"),
														messageData.optString("recieved_date"), 
														messageData.optString("sender_id") 
														);
			
			if (http_code == 200) {
				jsonObject.put("HTTP_CODE", "200");
				jsonObject.put("MSG", "Message has been sent sucessfully, Version 3");
				returnString = jsonArray.put(jsonObject).toString();
			}else {
				return Response.status(500).entity("Unable to send message").build();
			}
			System.out.println("returnString: " + returnString );
		}
		catch (Exception ex) {
			ex.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}
		
		return Response.ok(returnString).build();
		
	}
}
