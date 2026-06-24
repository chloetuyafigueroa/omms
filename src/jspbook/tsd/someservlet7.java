package jspbook.tsd;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.concurrent.TimeUnit;

import javax.json.Json;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Path;

import org.postgresql.core.Query;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/servlet7/*")
public class someservlet7 extends HttpServlet implements ServletContextListener {
    public void contextDestroyed(ServletContextEvent sce) {
        try {
            DriverManager.deregisterDriver(DriverManager.getDriver("jdbc:postgresql://"));
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }   
	/**
	 * 
	 * 
	 */
	public static Connection dbCon = null;
	public static ResultSet rs =null;
	private static final long serialVersionUID = 1L;
	//public static String dbURL = someservlet.dbURL;
	
	@Override
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String id=request.getParameter("id");
	    
	}
	
	public void doPost (HttpServletRequest _req, HttpServletResponse _res)
		    throws ServletException, IOException {
		String action = _req.getParameter("action");
		JsonParser parser = new JsonParser();
		JsonObject obj = (JsonObject) parser.parse(_req.getReader());
		update(obj);
		if (action.equals("update")) {
			_res.setContentType("text/html;charset=UTF-8");
			_res.getWriter().write(obj.toString());
		
		}
		else if (action.equals("delete")) {
			 //delete(obj);
			 update2(obj);
		 }
        
	}
		 public static void update(JsonObject obj) {
			 System.out.println(obj.toString());
		        String query1 = "SELECT DISTINCT ON (UNIQUE_ID)*,followed::TIMESTAMP WITHOUT TIME ZONE followed1 FROM CONVERTED "+
		        				"WHERE UNIQUE_ID='"+obj.get("unique_id").getAsString()+"'"+
		        				"ORDER BY UNIQUE_ID, FOLLOWED DESC";
		        String query2 = "UPDATE  CONVERTED "+
		        				"SET FOLLOWED=? "+
		        				"WHERE UNIQUE_ID=? AND FOLLOWED=?";
		        Connection dbCon = null;
				   try {
				       //Class.forName("org.postgresql.Driver");
				       //dbCon = DriverManager.getConnection(dbURL);
				       dbCon=DatabaseConnection.getInstance().getConnection();
				       Statement stmt = dbCon.createStatement();
				       ResultSet rx = stmt.executeQuery(query1);
				       while ( rx.next() ) { 
				    	  
				    		Date followed_new = null;
				    		Date followed_old = rx.getTimestamp("followed1");
				    		Calendar cal=Calendar.getInstance();
					  	    SimpleDateFormat df = new SimpleDateFormat("MM/dd/yy  hh:mm:ss a");
					  	    try {
					  	    	followed_new = df.parse(obj.get("followed").getAsString());
					  	    	//followed_old =  df.parse(rx.getString("followed"));
					  	    } catch (ParseException e) {
					  	        e.printStackTrace();
					  	    }
					    
					  	    cal.setTime(followed_new);
					  	
				    	   PreparedStatement pst = dbCon.prepareStatement(query2);
					       pst.setString(1, df.format(cal.getTime()));
					       pst.setString(2, obj.get("unique_id").getAsString());
					       //pst.setString(3, obj.get("followed").getAsString());
					       
					       pst.setString(3, rx.getString("followed"));
					       pst.executeUpdate();
					       
/**/						double hour1=((double)getDateDiff(followed_old,followed_new,TimeUnit.MINUTES))/60;
							double deci_hour=hour1-(long)hour1;
							if(deci_hour!=0) {cal.add(Calendar.MINUTE, -1);}
/**/							System.out.println(df.format(cal.getTime()));
				       }
				       
			           
				        
			       rs.close();
			       stmt.close();
			      
			 
			    } catch ( Exception e ) {
				         //System.err.println( e.getClass().getName()+": "+ e.getMessage() );
				         //System.exit(0);
				      }
		    
		}
		 public static void update2(JsonObject obj) {
			 System.out.println("delete!"+obj);
		        String query1 = "SELECT UNIQUE_ID FROM CONVERTED "+
		        				"WHERE UNIQUE_ID='"+obj.get("unique_id").getAsString()+"'";
		        String query2 = "UPDATE converted c " +
				                "SET followed = TO_CHAR('2020-01-01 06:00:00'::timestamp + (n.rn-1) * interval '1 second','MM/DD/YY HH12:MI:SS AM'), " +
				                "    status   = ?, " +
				                "    spinners = ? " +
				                "FROM ( " +
				                "    SELECT ctid, ROW_NUMBER() OVER (PARTITION BY unique_id ORDER BY followed) AS rn " +
				                "    FROM converted " +
				                "    WHERE unique_id = ? " +
				                ") n " +
				                "WHERE c.ctid = n.ctid;";
		        Connection dbCon = null;
				   try {
				       //Class.forName("org.postgresql.Driver");
				       //dbCon = DriverManager.getConnection(dbURL);
				       dbCon=DatabaseConnection.getInstance().getConnection();
				       Statement stmt = dbCon.createStatement();
				       ResultSet rx = stmt.executeQuery(query1);
				       System.out.println(query1);
				       while ( rx.next() ) { 
				    	  
					  	
				    	   PreparedStatement pst = dbCon.prepareStatement(query2);
					       //pst.setString(3, obj.get("followed").getAsString());
				    	   //System.out.println("afsgfgg"+rx.getString("followed"));
					       
					       pst.setString(1, "Cancelled");
					       pst.setString(2, obj.get("spinners").getAsString());
					       pst.setString(3, obj.get("unique_id").getAsString());
					       System.out.println(query2);
					       pst.executeUpdate();
					       
/**/						
				       }
				       
			           
				        
			       rs.close();
			       stmt.close();
			      
			 
			    } catch ( Exception e ) {
				         //System.err.println( e.getClass().getName()+": "+ e.getMessage() );
				         //System.exit(0);
				      }
		    
		}
		 public static long getDateDiff(Date date1, Date date2, TimeUnit timeUnit) {
			    long diffInMillies = date2.getTime() - date1.getTime();
			    return timeUnit.convert(diffInMillies,TimeUnit.MILLISECONDS);
			}
		 public static void delete(JsonObject obj) {
			 	//System.out.println(obj.toString());
			        String query2 = "DELETE FROM  CONVERTED "+
			        				"WHERE UNIQUE_ID=?";
			        Connection dbCon = null;
					   try {
					       //Class.forName("org.postgresql.Driver");
					       //dbCon = DriverManager.getConnection(dbURL);
					       dbCon=DatabaseConnection.getInstance().getConnection();
					       Statement stmt = dbCon.createStatement();
					       PreparedStatement pst = dbCon.prepareStatement(query2);
					 
					       pst.setString(1, obj.get("unique_id").getAsString());
					       pst.executeUpdate();
				           
					        
				       rs.close();
				       stmt.close();
				      
				 
				    } catch ( Exception e ) {
					         System.err.println( "Someservlet7-"+e.getClass().getName()+": "+ e.getMessage() );
					         //System.exit(0);
					      }
			    
			}

		@Override
		public void contextInitialized(ServletContextEvent arg0) {
			// TODO Auto-generated method stub
			
		}

}
