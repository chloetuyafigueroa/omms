package jspbook.tsd;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class DatabaseConnection implements ServletContextListener {
    public void contextDestroyed(ServletContextEvent sce) {
        try {
            DriverManager.deregisterDriver(DriverManager.getDriver("jdbc:postgresql://"));
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }  
    private static DatabaseConnection instance;
    private Connection connection;

    private DatabaseConnection() {
        // Private constructor to prevent direct instantiation
    }

    public static DatabaseConnection getInstance() {
        if (instance == null) {
            synchronized (DatabaseConnection.class) {
                if (instance == null) {
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }

     public static Connection getConnection() throws Exception {
    	 /**/ String url = System.getenv("DB_URL");
    	 	String username = System.getenv("DB_USER");
    	 	String password = System.getenv("DB_PASSWORD");

          if (url == null || url.isEmpty()) {
              throw new RuntimeException("DATABASE_URL is not set");
          }
          /** String url = "jdbc:postgresql://172.17.100.6:5432/joblist";
          String username = "postgres";
          String password = "03_0431A";//ileco1_amfm /**/
          Class.forName("org.postgresql.Driver");
          //return DriverManager.getConnection(url);
          return DriverManager.getConnection(url, username, password);
    }

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}
}
