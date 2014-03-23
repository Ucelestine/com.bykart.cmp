package com.bykart.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.codehaus.jettison.json.JSONArray;

import com.bykart.util.ToJSON;


public class Schema_Cmp extends CmpPostgres {
	
	public JSONArray queryReturnMessages(String userid) throws Exception {
		
		PreparedStatement query = null;
		Connection conn = null;
		
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
		
		try {
			CmpPostgres.CmpPostgresConn();
			conn = cmpMessagesConnection();
			query = conn.prepareStatement("SELECT id, user_id, message_body, thread_id, priority_id, recieved_date, sender_id, flag_id, message_status_id " +
											" FROM messages" +
											" WHERE UPPER(user_id) = ? " );
			
			query.setString(1, userid.toUpperCase());
			ResultSet rs = query.executeQuery();
			
			json = converter.toJSONArray(rs);
			query.close(); //close connection
		}
		catch (SQLException sqlError) {
			sqlError.printStackTrace();
			return json;
		}
		catch (Exception ex) {
			ex.printStackTrace();
			return json;
		}
		finally {
			if (conn != null) conn.close();
		}
		return json;
	}
	
	/*public boolean ValidateUser(boolean isValid, String userid) throws Exception {
		
		PreparedStatement query = null;
		Connection conn = null;
		
		String returnString = null;
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
		boolean valid = false;
		
		try {
			CmpPostgres.CmpPostgresConn();
			conn = cmpMessagesConnection();
			query = conn.prepareStatement("SELECT id, username, firstname, lastname" +
											" FROM user" +
											" WHERE UPPER(user_id) = ? " );
			
			query.setString(1, userid.toUpperCase());
			ResultSet rs = query.executeQuery();
			
			if(rs == null)
				return valid;
			else
			{
				valid = true;
				json = queryReturnMessages(userid);
				returnString = json.toString();
				
			}
			
			
			query.close(); //close connection
		}
		catch (SQLException sqlError) {
			sqlError.printStackTrace();
			return json;
		}
		catch (Exception ex) {
			ex.printStackTrace();
			return json;
		}
		finally {
			if (conn != null) conn.close();
		}
		return json;
	}*/

}
