package com.bykart.cmp.messages;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

import com.bykart.dao.Schema_Cmp;


@Path("/v2/messages")
public class V2_messages {
	
	JSONObject jsonobject;
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response messages(
			@QueryParam("userid") String userid)
	throws Exception {
		
		JSONArray json = new JSONArray();
		
		
		try {
			
			if(userid==null || userid == "") {
						Response.status(400).entity("Error: Please enter a userid").build();
			}
			
			Schema_Cmp dao = new Schema_Cmp();
			
			json.put(dao.queryReturnMessages(userid));
			
			
		}
		catch (Exception ex) {
			ex.printStackTrace();
			return Response.status(500).entity("Server was not able to process your requerst").build();
		}
		return Response.ok(json).build();
	}
	
	@Path("/specific")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response messages(
			@QueryParam("userid") String userid,
			@QueryParam("id") int threadid)
	throws Exception {
		
		JSONArray json = new JSONArray();
		
		try {
			
			if((userid==null || userid == "") && (threadid == 0 )) {
				
						Response.status(400).entity("Error: Please enter a userid").build();
			}
			
			Schema_Cmp dao = new Schema_Cmp();
			
			json.put(dao.queryReturnSpecMessages(userid, threadid));
			
		}
		catch (Exception ex) {
			ex.printStackTrace();
			return Response.status(500).entity("Server was not able to process your requerst").build();
		}
		return Response.ok(json).build();
	}
	
	
	@Path("/{userid}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response message_byid(
			@PathParam("userid") String userid)
	throws Exception {
		String returnString = null;
		JSONArray json = new JSONArray();	
		
		try {
			
			Schema_Cmp dao = new Schema_Cmp();
			
			json = dao.queryReturnMessages(userid);
			returnString = json.toString();
			
		}
		catch (Exception ex) {
			ex.printStackTrace();
			return Response.status(500).entity("Server was not able to process your requerst").build();
		}
		return Response.ok(returnString).build();
	}
	
	
	@Path("/{userid}/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response specifc_message_byid(
			@PathParam("userid") String userid,
			@PathParam("id") int id)
	throws Exception {
		
		String returnString = null;
		JSONArray json = new JSONArray();
		
		try {
						
			Schema_Cmp dao = new Schema_Cmp();
			
			json = dao.queryReturnSpecMessages(userid, id);
			returnString = json.toString();
			
		}
		catch (Exception ex) {
			ex.printStackTrace();
			return Response.status(500).entity("Server was not able to process your requerst").build();
		}
		return Response.ok(returnString).build();
	}
	
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response add_messages(String incomingData) {
	
		String returnString = null;
		JSONArray jsonArray = new JSONArray();
		Schema_Cmp dao = new Schema_Cmp();
		
		try {
			System.out.println("incomingData: " + incomingData);
			ObjectMapper mapper = new ObjectMapper();
			message_entry itemEntry = mapper.readValue(incomingData, message_entry.class);
			
			int http_code = dao.insert_into_message(itemEntry.user_id,
													itemEntry.message_body,
													itemEntry.thread_id, 
													itemEntry.priority_id, 
													itemEntry.subject,
													itemEntry.recieved_date, 
													itemEntry.sender_id 
													);
			
			if (http_code == 200) {
				returnString = jsonArray.toString();
			} else {
				return Response.status(500).entity("Unable to process data").build();
			}
		}
		catch (Exception ex) {
			ex.printStackTrace();
			return Response.status(500).entity("Server was unable to process your request").build();
		}
		return Response.ok(returnString).build();
		
	}

}

class message_entry {
	public String user_id;
	public String message_body;
	public String thread_id;
	public String subject;
	public String priority_id;
	public String recieved_date;
	public String sender_id;
	
}