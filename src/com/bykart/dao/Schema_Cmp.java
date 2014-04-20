package com.bykart.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.codehaus.jettison.json.JSONArray;

import com.bykart.util.ToJSON;



public class Schema_Cmp extends CmpPostgres {
	
	public int insert_into_message(String user_id, 
									String message_body, 
									String thread_id, 
									String priority_id,
									String subject,
									String recieved_date,
									String sender_id 
									)
								throws Exception {
		
		PreparedStatement query = null;
		Connection conn = null;
		
		try {
			
			//CmpPostgres.CmpPostgresConn();
			conn = cmpMessagesConnection();
			
			query = conn.prepareStatement("INSERT INTO thread (subject) VALUES ( ? )" );
			query.setString(1, subject);
			
			query.executeUpdate();
			
			query = conn.prepareStatement("SELECT id, subject FROM thread WHERE subject = ? " );
			query.setString(1, subject);
			ResultSet res = query.executeQuery();
			
			int th_id = 0;
			while(res.next()) {
				th_id = res.getInt("id");
			}
			
			query = conn.prepareStatement("INSERT INTO messages " +
									"(user_id, message_body, thread_id, priority_id, recieved_date, sender_id, flag_id, message_status_id)" +
									"VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
			
			query.setString(1, user_id);
			query.setString(2, message_body);
			
			query.setInt(3, th_id);
			
			int prty_id = Integer.parseInt(priority_id);
			query.setInt(4, prty_id);
			
			java.util.Date utilDate = new java.util.Date();
			java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
			query.setDate(5, sqlDate);
			
			query.setString(6, sender_id);
			
			Boolean f_id =  false;
			query.setBoolean(7, f_id);
			
			Boolean ms_id = false;
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
	
	
	public int reply_to_message(String user_id, 
								String message_body1, 
								String thread_id, 
								String priority_id1,
								String subject,
								String recieved_date,
								String sender_id 
								)
							throws Exception {

		PreparedStatement query = null;
		Connection conn = null;
		
		try {
		
		//CmpPostgres.CmpPostgresConn();
		conn = cmpMessagesConnection();
		
		
		query = conn.prepareStatement("INSERT INTO messages " +
					"(user_id, message_body, thread_id, priority_id, recieved_date, sender_id, flag_id, message_status_id)" +
					"VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
		
		query.setString(1, user_id);
		query.setString(2, message_body1);
		
		int th_id = Integer.parseInt(thread_id);
		query.setInt(3, th_id);
		
		int prty_id = Integer.parseInt(priority_id1);
		query.setInt(4, prty_id);
		
		java.util.Date utilDate = new java.util.Date();
		java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
		query.setDate(5, sqlDate);
		
		query.setString(6, sender_id);
		
		Boolean f_id =  false;
		query.setBoolean(7, f_id);
		
		Boolean ms_id = false;
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
	
	
	public JSONArray query_users(String userId) throws Exception {
		PreparedStatement query = null;
		Connection conn = null;
		
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
		
		try {
			conn = cmpMessagesConnection();
			query = conn.prepareStatement("SELECT * FROM users WHERE id = ?");
			query.setString(1, userId);
			ResultSet rs = query.executeQuery();
			if(rs == null) {
				//return json;
			} else {
				json = converter.toJSONArray(rs);
				query.close(); //close connection
			}
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
	
	public JSONArray queryReturnMessages(String userid) throws Exception {
		
		PreparedStatement query = null;
		Connection conn = null;
		
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
		
		try {
			//CmpPostgres.CmpPostgresConn();
			conn = cmpMessagesConnection();
			query = conn.prepareStatement("SELECT m.id, m.user_id, m.message_body, m.thread_id, m.priority_id, m.recieved_date, m.sender_id, m.flag_id, m.message_status_id, t.subject " +
											" FROM messages m, thread t" +
											" WHERE m.thread_id = t.id " +
											" AND UPPER(m.user_id) = ? " +
											" OR UPPER(m.sender_id) = ?" +
											" ORDER BY m.recieved_date DESC ");
			
			query.setString(1, userid.toUpperCase());
			query.setString(2, userid.toUpperCase());
			
			ResultSet rs = query.executeQuery();
			
			if (rs==null) {
				
			} else {
			
			json = converter.toJSONArray(rs);
			query.close(); //close connection
			}
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
		}		return json;
		
	}
	
	
 public JSONArray queryReturnSpecMessages(String userid, int threadid) throws Exception {
		
		PreparedStatement query = null;
		Connection conn = null;
		
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();
		
		try {
			//CmpPostgres.CmpPostgresConn();
			conn = cmpMessagesConnection();
			query = conn.prepareStatement("SELECT m.id, m.user_id, m.message_body, m.thread_id, m.priority_id, m.recieved_date, m.sender_id, m.flag_id, m.message_status_id, t.subject " +
											" FROM messages m, thread t" +
											" WHERE UPPER(user_id) = ?" +
											" OR UPPER(sender_id) = ?" +
											" AND m.thread_id = ? " +
											" AND m.thread_id = t.id" +
											" ORDER BY m.recieved_date DESC");
			
			query.setString(1, userid.toUpperCase());
			query.setString(2, userid.toUpperCase());
			query.setInt(3, threadid);
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
 	 
 
	 public int update_message(String id, 
								String user_id, 
								String flag_id, 
								String message_status_id
								)
							throws Exception {
	
	PreparedStatement query = null;
	Connection conn = null;
	
	try {
	
	//CmpPostgres.CmpPostgresConn();
	conn = cmpMessagesConnection();
	
	query = conn.prepareStatement("UPDATE messages SET flag_id = ?, message_status_id = ? WHERE id = ? AND user_id = ? ");
	
	Boolean f_id =  false;
	Boolean ms_id = false;
	if(Boolean.parseBoolean(flag_id) == true) {
		f_id = true;
	}
	query.setBoolean(1, f_id);
	
	if(Boolean.parseBoolean(message_status_id) == true ) {
		ms_id = true;
	}
	query.setBoolean(2, ms_id);
	
	int Id = Integer.parseInt(id);
	query.setInt(3, Id);
	
	query.setString(4, user_id);	
	
	
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
 
 }
