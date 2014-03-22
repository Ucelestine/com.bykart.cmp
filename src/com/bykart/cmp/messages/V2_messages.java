package com.bykart.cmp.messages;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONArray;


@Path("/v2/messages")
public class V2_messages {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response messageThread(
			@QueryParam("thread") String thread)
	throws Exception {
		String returnString = null;
		JSONArray json = new JSONArray();
		
		try {
			
		}
		catch (Exception ex) {
			ex.printStackTrace();
			return Response.status(500).entity("Server was not able to process your requerst").build();
		}
		return Response.ok(returnString).build();
	}
	

}
