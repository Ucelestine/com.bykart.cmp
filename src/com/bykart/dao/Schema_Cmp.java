package com.bykart.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import org.codehaus.jettison.json.JSONArray;

import com.bykart.util.ToJSON;



public class Schema_Cmp extends CmpPostgres {
	
	public int insert_into_message(String user_id, String message_body, String thread_id, String priority_id, String recieved_date, String sender_id, boolean flag_id, boolean message_status_id) throws Exception {
		
		PreparedStatement query = null;
		Connection conn = null;
		
		try {
			
			CmpPostgres.CmpPostgresConn();
			conn = cmpMessagesConnection();
			query = conn.prepareStatement("INSERT INTO messages " +
									"(user_id, message_body, thread_id, priority_id, recieved_date, sender_id, flag_id, message_status_id)" +
									"VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
			
			query.setString(1, user_id);
			query.setString(2, message_body);
			
			int thrd_id = Integer.parseInt(thread_id);
			query.setInt(3, thrd_id);
			
			int prty_id = Integer.parseInt(priority_id);
			query.setInt(4, prty_id);
			
			Timestamp rd  = Timestamp.valueOf(recieved_date);
			query.setTimestamp(5, rd);
			query.setString(6, sender_id);
			
			boolean f_id = false;
			query.setBoolean(2, f_id);
			
			boolean ms_id = false;
			query.setBoolean(8, ms_id);
			
			query.executeUpdate();
			
		}
		catch (SQLException sqlError) {
			sqlError.printStackTrace();
			return 500;
		}
		catch (Exception ex) {
			ex.printStackTrace();
			return 500;
			
		}
		return 200;
	}
	
	
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
	
	
 public JSONArray queryReturnSpecMessages(String userid, int id) throws Exception {
		
		PreparedStatement query = null;
		Connection conn = null;
		
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
		
		try {
			CmpPostgres.CmpPostgresConn();
			conn = cmpMessagesConnection();
			query = conn.prepareStatement("SELECT id, user_id, message_body, thread_id, priority_id, recieved_date, sender_id, flag_id, message_status_id " +
											" FROM messages" +
											" WHERE UPPER(user_id) = ?" +
											" AND id = ? ");
			
			query.setString(1, userid.toUpperCase());
			query.setInt(2, id);
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


}
