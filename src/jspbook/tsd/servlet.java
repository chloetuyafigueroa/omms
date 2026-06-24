package jspbook.tsd;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import javax.naming.*;
import javax.sql.*;

import com.google.gson.Gson;

import jspbook.tsd.CustomerBean;
import jspbook.tsd.User;

@WebServlet("/servlet")
public class servlet extends HttpServlet {

	 /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	Connection dbCon;
	  //DataSource ds;
	  HttpSession session;
	  String dbURL = "jdbc:postgresql:joblist?user=postgres&password=03_0431A";//ileco1_amfm
  /* Initialize servlet. Use JNDI to look up a DataSource */


  public void doPost (HttpServletRequest _req, HttpServletResponse response)
    throws ServletException, IOException {
	  String text = "some text saxvjbhsame";

	    response.setContentType("text/plain");  // Set content type of the response so that jQuery knows what it can expect.
	    response.setCharacterEncoding("UTF-8"); // You want world domination, huh?
	    response.getWriter().write(text);

  }

  /* Send request to a different page */
 
  
  public List<User> getAllUsers(){ 
	  	
	    List<User> userList = new ArrayList<>();
	    //List<> userList = new Gson().fromJSON(jsonPerson, new TypeToken<List<Person>>() {}getType());
	    Connection dbCon = null;
	    try {
	       Class.forName("org.postgresql.Driver");
	       dbCon = DriverManager.getConnection(dbURL);
	       Statement stmt = dbCon.createStatement();
	       System.out.println("Opened database successfully");
	       ResultSet rs = stmt.executeQuery( "SELECT * FROM CONVERTED;" );
	       
	     
	       while ( rs.next() ) {
	          String unique_id = rs.getString("unique_id");
	          String creator =  rs.getString("creator");
	          String created =  rs.getString("created");
	          String follower =  rs.getString("follower");
	          String followed =  rs.getString("followed");
	          String name =  rs.getString("name");
	          String spinners =  rs.getString("spinners");
	          String town0 =  rs.getString("town0");
	          String brgy0=  rs.getString("brgy0");
	          String town=  rs.getString("town");
	          String brgy= rs.getString("brgy");
	          String town2= rs.getString("town2");
	          String brgy2= rs.getString("brgy2");
	          String assignedto= rs.getString("assignedto");
	          String status= rs.getString("status");
	          String subs= rs.getString("subs");
	          String feeder= rs.getString("feeder");
	          String section= rs.getString("section");
	          String equip= rs.getString("equip");                                              //4                                           //11
	          String type = rs.getString("type");
	          String cause= rs.getString("cause");
	          String notes = rs.getString("notes");
	          String landmark= rs.getString("landmark");
	          String phone= rs.getString("phone");
	          String latitude= rs.getString("latitude");                                            //15
	          String longitude= rs.getString("longitude");
	          String actiontaken= rs.getString("actiontaken");
	        
	          
	        User p1 = new User();
	  		p1.setID(unique_id);
	  		p1.setCreator(creator);
	  		p1.setCreated(created);
	  		p1.setFollower(follower);
	  		p1.setFollowed(followed);
	  		p1.setName(name);
	  		p1.setSpinners(spinners);
	  		p1.setTown0(town0);
	  		p1.setBrgy0(brgy0);
	  		p1.setTown(town);
	  		p1.setBrgy(brgy);
	  		p1.setTown2(town2);
	  		p1.setBrgy2(brgy2);
	  		p1.setAssignedto(assignedto);
	  		p1.setStatus(status);
	  		p1.setSubs(subs);
	  		p1.setFeeder(feeder);
	  		p1.setSection(section);
	  		p1.setEquip(equip);                                              //4                                           //11
	  		p1.setType(type);
	  		p1.setCause(cause);
	  		p1.setNotes(notes);
	  		p1.setLandmark(landmark);
	  		p1.setPhone(phone);
	  		p1.setLatitude(latitude);                                            //15
	  		p1.setLongitude(longitude);
	  		p1.setActiontaken(actiontaken);

	  		userList.add(p1);
	       }
	       
	       rs.close();
	       stmt.close();
	       dbCon.close();
	       	       
	 
	    } catch ( Exception e ) {
		         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
		         System.exit(0);
		      }
		      
		      System.out.println("success");
			return userList;
	    
	 }
	

}
