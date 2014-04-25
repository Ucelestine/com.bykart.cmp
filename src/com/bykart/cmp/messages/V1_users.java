package com.bykart.cmp.messages;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONArray;

import com.bykart.dao.Schema_Cmp;

@Path("/v1/users")
public class V1_users {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response users()	throws Exception {
		
		JSONArray json = new JSONArray();
		
		try {
			
			Schema_Cmp dao = new Schema_Cmp();
			
			json.put(dao.get_users());
			
		}
		catch (Exception ex) {
			ex.printStackTrace();
			return Response.status(500).entity("Server was not able to process your requerst").build();
		}
		return Response.ok(json).build();
	}

}
