package com.bykart.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Format_date {
	
	private static Date reDat;

	public static void main(String fmat) {
		
		Date dNow = new Date();
		SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		try {
			setReDat(new Date());
			setReDat(ft.parse(ft.format(dNow)));
		} catch (ParseException ex) {
			ex.printStackTrace();
		}
		
		
		
	}

	public static Date getReDat() {
		return reDat;
	}

	public static void setReDat(Date reDat) {
		Format_date.reDat = reDat;
	}

}
