package com.bykart.cmp.messages;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONArray;

import com.bykart.dao.Schema_Cmp;


@Path("/v2/messages")
public class V2_messages {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response messageThread(
			@QueryParam("userid") String userid)
	throws Exception {
		String returnString = null;
		JSONArray json = new JSONArray();
		
		
		try {
			
			if(userid==null || userid == "") {
				return Response.status(400).entity("Error: Please enter a userid").build();
			}
			
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
	

}
