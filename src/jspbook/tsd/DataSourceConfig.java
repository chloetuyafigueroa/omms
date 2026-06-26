package jspbook.tsd;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.DriverManager;
import java.sql.SQLException;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.sql.DataSource;

public class DataSourceConfig implements ServletContextListener {
    public void contextDestroyed(ServletContextEvent sce) {
        try {
            DriverManager.deregisterDriver(DriverManager.getDriver("jdbc:postgresql://"));
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }  
    private static HikariDataSource dataSource;

    static {
        HikariConfig config = new HikariConfig();
        try {
			Class.forName("org.postgresql.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        String url=System.getenv("DB_URL");
        String username = System.getenv("DB_USER");
   	 	String password = System.getenv("DB_PASSWORD");
        if (url == null || url.isEmpty()) {
            throw new RuntimeException("DATABASE_URL is not set");
        }
        config.setJdbcUrl(url);
        config.setUsername(username);
        config.setPassword(password);/**/
        config.setMaximumPoolSize(10); // Set the maximum pool size
        config.setMinimumIdle(2); // Set the minimum idle connections

        dataSource = new HikariDataSource(config);
    }

    public static DataSource getDataSource() {
        return dataSource;
    }

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}
}

