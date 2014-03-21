package com.bykart.cmp.messages;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.codehaus.jettison.json.JSONArray;

import com.bykart.dao.CmpPostgres;
import com.bykart.util.ToJSON;

@Path("/v1/messages")
public class V1_messages {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String returnUserMessages() throws Exception {
		
		PreparedStatement query = null;
		Connection conn = null;
		String returnString = null;
		int id = 1;
		
		try {
			
			CmpPostgres.CmpPostgresConn();
			conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/Mobile", "postgres", "teamred");
			query = conn.prepareStatement("SELECT * FROM messages WHERE id =" +id);
			
			ResultSet rs = query.executeQuery();
			
			ToJSON converter = new ToJSON();
			JSONArray json = new JSONArray();
			
			json = converter.toJSONArray(rs);
			query.close(); //close connection
			
			returnString = json.toString();
			
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		finally {
			if(conn != null) conn.close();
		}
		return returnString;
	}
	

}
