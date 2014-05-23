package com.bykart.dao;

import java.sql.Connection;
import java.sql.DriverManager;

public class CmpPostgres {
	
	//private static DriverManager CmpPostgres = null;
	//private static Context context = null;
	
	
	
	protected static Connection cmpMessagesConnection() {
		Connection conn = null;
		
		try {
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/CmpDb", "postgres", "teamred");
			return conn;
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		return conn;
		
		
	}

}
