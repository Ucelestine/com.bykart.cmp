/**
 * @author CELESTINE
 */

/*Create database*/

function createTables () {
	//create table if it does not exist
	db.transaction(function (tx) {
		
		tx.executeSql("CREATE TABLE IF NOT EXISTS users ("
			+ " id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
			+ " userName VARCHAR(30) NOT NULL,"
			+ " firstName VARCHAR(30) NOT NULL,"
			+ " lastName VARCHAR(30) NOT NULL)"
			+ " ", [], null, errorHandler);
		
		
		tx.executeSql("CREATE TABLE IF NOT EXISTS messages ("
			+ " id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
			+ " userName VARCHAR(30) NOT NULL,"
			+ " thread_id INTEGER NOT NULL,"
			+ " senderId VARCHAR(30) NOT NULL,"
			+ " messageBody TEXT,"
			+ " received_date DATE,"
			+ " flagId INTEGER NOT NULL,"
			+ " statusId INTEGER NOT NULL,"
			+ " priorityId INTEGER NOT NULL)"
			+ " ", [], null, errorHandler);
			
		tx.executeSql("CREATE TABLE IF NOT EXISTS thread ("
			+ " thread_id INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT,"
			+ " subject VARCHAR(80) NOT NULL)"
			+ " ", [], null, errorHandler);
			
			tx.executeSql("CREATE TABLE IF NOT EXISTS priority ("
			+ " priority_id INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT,"
			+ " description VARCHAR(30) NOT NULL)"
			+ " ", [], null, errorHandler);
			
			tx.executeSql("CREATE TABLE IF NOT EXISTS status ("
			+ " MgsStatus_id INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT,"
			+ " MgsStatus VARCHAR(80) NOT NULL)"
			+ " ", [], null, errorHandler);			
			
		tx.executeSql("INSERT INTO priority (description) VALUES('Normal')", [], null, errorHandler);
		tx.executeSql("INSERT INTO priority (description) VALUES('Low')", [], null, errorHandler);
		tx.executeSql("INSERT INTO priority (description) VALUES('High')", [], null, errorHandler);
		
		tx.executeSql("INSERT INTO status (MgsStatus) VALUES('Unread')", [], null, errorHandler);
		tx.executeSql("INSERT INTO status (MgsStatus) VALUES('Read')", [], null, errorHandler);
		
		//get_uetype();
		
		//get_uereview();
		
	}, errorHandler);
	
}

/*Drop table  uetype from database*/
function dropTables() {
    try {
        db.transaction(function (tx) {
            tx.executeSql("DROP TABLE priority", [], null, errorHandler);
            tx.executeSql("DROP TABLE status", [], null, errorHandler);
        }, errorHandler);
    }
    catch (e) {
        alert("Error: Unable to drop table " + e + ".");
        return;
    }
}