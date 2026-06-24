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

@WebServlet("/Contacts/*")
public class Contacts extends HttpServlet implements ServletContextListener {
    public void contextDestroyed(ServletContextEvent sce) {
        try {
            DriverManager.deregisterDriver(DriverManager.getDriver("jdbc:postgresql://"));
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }  
	/**
	 * 
	 */
	public static Connection dbCon = null;
	public static ResultSet rs =null;
	private static final long serialVersionUID = 1L;
	//public static String dbURL = someservlet.dbURL;
	
	@Override
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String name = request.getParameter("name");
		String crew = request.getParameter("crew");
		List<User_contacts> products=null;
		 if (name==null) {
			 products = getAllUsers();
		 }
		 else {
			 products = getUser(name,crew);
		 }
		
	    String json = new Gson().toJson(products);
	    
	    response.setContentType("text/html;charset=UTF-8");
	    response.getWriter().write(json);
	    
	    
	    System.out.println(json);
		
		    
	}
	
	public void doPost (HttpServletRequest _req, HttpServletResponse _res)
		    throws ServletException, IOException {
		JsonParser parser = new JsonParser();
		JsonObject obj = (JsonObject) parser.parse(_req.getReader());
		
		String action = _req.getParameter("action");
		 if (action.equals("upsert")) {
			 System.out.println(obj);
			 upsert(obj);
		 }
		 
		 else if (action.equals("delete")) {
			 delete(obj);
		 }
	}
	
	 public List<User_contacts> getAllUsers(){ 
	
		   List<User_contacts> userList = new ArrayList<>();
		   
		   try {
		       ///Class.forName("org.postgresql.Driver");
		       //dbCon = DriverManager.getConnection(dbURL);
		       dbCon=DatabaseConnection.getInstance().getConnection();
		       Statement stmt = dbCon.createStatement();
		        rs = stmt.executeQuery("SELECT * FROM CONTACTS "+
		        						"ORDER BY CREW, NAME DESC");
	       	  
		       while ( rs.next() ) {
		          String name = rs.getString("name");
		          String crew =  rs.getString("crew");
		          String phone =  rs.getString("phone");
		          Boolean status =  rs.getBoolean("status");
		          String lat =  rs.getString("lat");
		          String lon =  rs.getString("lon");
		          
		          
		          //System.out.println(assignedto);
		        User_contacts p1 = new User_contacts();
		  		p1.setName(name);
		  		p1.setCrew(crew);
		  		p1.setPhone(phone);
		  		//p1.setStatus(status);
		  		//p1.setLat(lat);
		  		//p1.setLon(lon);
		  		 

		  		userList.add(p1);
		       }
		      
		       //System.out.println(userList);
		       rs.close();
		       stmt.close();
		       //dbCon.close();
		 
		    } catch ( Exception e ) {
			         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
			         //System.exit(0);
			      }
			      return userList;
			      
	 } 
	 public List<User_contacts> getUser(String Name, String Crew){ 
			
		   List<User_contacts> userList = new ArrayList<>();
		   
		   try {
		       //Class.forName("org.postgresql.Driver");
		       //dbCon = DriverManager.getConnection(dbURL);
		       dbCon=DatabaseConnection.getInstance().getConnection();
		       Statement stmt = dbCon.createStatement();
		        rs = stmt.executeQuery("SELECT * FROM CONTACTS "+
		        						"WHERE NAME='"+Name+"' AND CREW='"+Crew+"'");
	       	  
		       while ( rs.next() ) {
		          String name = rs.getString("name");
		          String crew =  rs.getString("crew");
		          String phone =  rs.getString("phone");
		          Boolean status =  rs.getBoolean("status");
		          String lat =  rs.getString("lat");
		          String lon =  rs.getString("lon");
		          
		          
		          //System.out.println(assignedto);
		        User_contacts p1 = new User_contacts();
		  		p1.setName(name);
		  		p1.setCrew(crew);
		  		p1.setPhone(phone);
		  		p1.setStatus(status);
		  		//p1.setLat(lat);
		  		//p1.setLon(lon);
		  		 

		  		userList.add(p1);
		       }
		      
		       //System.out.println(userList);
		       rs.close();
		       stmt.close();
		       //dbCon.close();
		 
		    } catch ( Exception e ) {
			         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
			         //System.exit(0);
			      }
			      return userList;
			      
	 } 
	 public static void insert(JsonObject obj) {
		 System.out.println(obj.get("crew").getAsString());
		 
	        String query2 = "INSERT INTO CONTACTS(name, crew, phone, status, lat, lon)" + 
	        		"	VALUES (?, ?, ?, ?, ?, ?)";
	        
	        Connection dbCon = null;
			   try {
			       //Class.forName("org.postgresql.Driver");
			       //dbCon = DriverManager.getConnection(dbURL);
			       dbCon=DatabaseConnection.getInstance().getConnection();
			       Statement stmt = dbCon.createStatement();
			       PreparedStatement pst = dbCon.prepareStatement(query2);
			    
			        pst.setString(1, obj.get("name").getAsString());
		            pst.setString(2, obj.get("crew").getAsString());
		            pst.setString(3, obj.get("phone").getAsString());
		            pst.setBoolean(4, true);
		            pst.setString(5, "0.0");
		            pst.setString(6, "0.0");
		           
		            pst.executeUpdate();
		       System.out.println(pst.toString());
		    		
		       pst.close();
		       stmt.close();
		      
		 
		    } catch ( Exception e ) {
			         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
			         //System.exit(0);
			      }
	    
	}
	 public static void update(JsonObject obj) {
		 	//System.out.println(obj.toString());
		        String query2 = "UPDATE  CONTACTS "+
		        				"PHONE=?,STATUS=?,LAT=?,LON=? "+
		        				"WHERE NAME=? AND CREW=?";
		        Connection dbCon = null;
				   try {
				       //Class.forName("org.postgresql.Driver");
				       //dbCon = DriverManager.getConnection(dbURL);
				       dbCon=DatabaseConnection.getInstance().getConnection();
				       Statement stmt = dbCon.createStatement();
				       PreparedStatement pst = dbCon.prepareStatement(query2);
				       
				      
				  	   pst.setString(1, obj.get("phone").getAsString());
				       pst.setBoolean(2, obj.get("status").getAsBoolean());
				       pst.setString(3, obj.get("lat").getAsString());
				       pst.setString(4, obj.get("lon").getAsString());
				       pst.setString(5, obj.get("name").getAsString());
				       pst.setString(6, obj.get("crew").getAsString());
				       pst.executeUpdate();
			           
				        
			       rs.close();
			       stmt.close();
			      
			 
			    } catch ( Exception e ) {
				         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
				         //System.exit(0);
				      }
		    
		}
	 public static void delete(JsonObject obj) {
		 	//System.out.println(obj.toString());
		        String query2 = "DELETE FROM  CONTACTS "+
		        				"WHERE NAME=? AND CREW=?";
		        Connection dbCon = null;
				   try {
				       //Class.forName("org.postgresql.Driver");
				       //dbCon = DriverManager.getConnection(dbURL);
				       dbCon=DatabaseConnection.getInstance().getConnection();
				       Statement stmt = dbCon.createStatement();
				       PreparedStatement pst = dbCon.prepareStatement(query2);
				 
				       pst.setString(1, obj.get("name").getAsString());
				       pst.setString(2, obj.get("crew").getAsString());
				       pst.executeUpdate();
			           
				        
			       rs.close();
			       stmt.close();
			      
			 
			    } catch ( Exception e ) {
				         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
				         //System.exit(0);
				      }
		    
		}
	 
	 public static void upsert(JsonObject obj) {
		   
		 	String query1 = "INSERT INTO CONTACTS(name, crew, phone, status, lat, lon)" + 
		 					" VALUES (?, ?, ?, ?, ?, ?)";
		 	String query2 = "UPDATE  CONTACTS "+
		 					"SET PHONE=?,STATUS=?,LAT=?,LON=? "+
		 					"WHERE NAME=? AND CREW=?";
	    
	        Connection dbCon1 = null;
	        Connection dbCon2 = null;
	          try {
			      // Class.forName("org.postgresql.Driver");
			       dbCon1=DatabaseConnection.getInstance().getConnection();
			       dbCon2=DatabaseConnection.getInstance().getConnection();
			       Statement stmt1 = dbCon1.createStatement();
			       PreparedStatement pst1 = dbCon2.prepareStatement(query1);
			       PreparedStatement pst2 = dbCon2.prepareStatement(query2);
			    
			  
		          ResultSet rx1 = stmt1.executeQuery( "SELECT COUNT(*) FROM CONTACTS WHERE NAME='"+obj.get("name").getAsString()+"'" +" AND CREW='"+obj.get("crew").getAsString()+"'"); 
		          while ( rx1.next() ) { 
		        	  int count=rx1.getInt("count");
		        	  //System.out.println(count);
			          if (count>0) {
				           pst2.setString(1, obj.get("phone").getAsString());
					       pst2.setBoolean(2, true);
					       pst2.setString(3, "0.0");
					       pst2.setString(4, "0.0");
					       pst2.setString(5, obj.get("name").getAsString());
					       pst2.setString(6, obj.get("crew").getAsString());
					       pst2.executeUpdate();
					       //System.out.println("pst2.toString()");
			          }
			         else  { 
				       
			        	   pst1.setString(1, obj.get("name").getAsString());
				           pst1.setString(2, obj.get("crew").getAsString());
				           pst1.setString(3, obj.get("phone").getAsString());
				           pst1.setBoolean(4, true);
				           pst1.setString(5, "0.0");
				           pst1.setString(6, "0.0");
				           pst1.executeUpdate(); //DONT FORGET THIS ONE
			         }
			         
		          }
		         
	 	           rx1.close();
				  
			       stmt1.close();
			     
			       //dbCon1.close();
			       //dbCon2.close();
			       
		          
	        
		      
		 
		    } catch ( Exception e ) {
			         System.err.println( "Contacts-"+e.getClass().getName()+": "+ e.getMessage() );
			         //System.exit(0);
			      }
		}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}	

}
