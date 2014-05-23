package com.bykart.cmp.status;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/v1/status")
public class V1_status {
	
	private static final String api_version = "00.01.00";
	
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String returnTitle() {
		return "<p>Conestoga Mobile Project</p>";
	}
	
	@Path("/version")
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String returnVersion() {
		return "<p>Version:</p>" + api_version;
	}
	
	@Path("/users")
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String returnDatabaseStatus() throws Exception {
		PreparedStatement query = null;
		String myString = null;
		String returnString = null;
		Connection conn = null; 
		
		try {
			conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/Mobile", "postgres", "teamred");
			query = conn.prepareStatement("SELECT * FROM messages");
			ResultSet rs = query.executeQuery();
			
			while (rs.next()) {
				myString = rs.getString("userId");
			}
			query.close();
			
			returnString = "<p>Database Status</P>" + "<p>UserId return: " + myString + "</p>";
			
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		finally {
			if (conn != null) conn.close();
		}
		
		return returnString;
		}
		
	

}
