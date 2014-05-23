package com.bykart.cmp.messages;

import javax.jws.WebService;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

import com.bykart.dao.Schema_Cmp;

@WebService
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