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

    public Connection getConnection() {
        if (connection == null) {
            try {
                // Register the PostgreSQL driver
                Class.forName("org.postgresql.Driver");

                // Establish the connection
                //String url = "jdbc:postgresql://172.17.100.6:5432/joblist";
                String url = "jdbc:postgresql://postgres:03_0431Achloe@db.pfonglwyrcfiigivcpoj.supabase.co:5432/postgres/ommscloud";
                String username = "postgres";
                String password = "03_0431Achloe";//ileco1_amfm
                connection = DriverManager.getConnection(url, username, password);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        
        return connection;
    }

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}
}
