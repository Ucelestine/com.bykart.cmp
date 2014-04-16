package com.bykart.dao;

import java.sql.Connection;
import java.sql.DriverManager;

import javax.naming.Context;
import javax.naming.InitialContext;

public class CmpPostgres {
	
	private static DriverManager CmpPostgres = null;
	private static Context context = null;
	
	
	public static DriverManager CmpPostgresConn() throws Exception {
		
		if (CmpPostgres != null) {
			return CmpPostgres;
		}
		
		 try {
			 
			 if (context == null) {
				 context = new InitialContext();
			 }
			 CmpPostgres = (DriverManager) context.lookup("CmpPostgres");
		 }
		 catch (Exception ex) {
			 ex.printStackTrace();
			 
		 }
		 return CmpPostgres;
		 
		
	}
	protected static Connection cmpMessagesConnection() {
		Connection conn = null;
		
		try {
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/Mobile", "postgres", "teamred");
			return conn;
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		return conn;
		
		
	}

}
