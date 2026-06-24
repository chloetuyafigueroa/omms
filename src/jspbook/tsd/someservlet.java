package jspbook.tsd;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
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

@WebServlet("/servlet/*")
public class someservlet extends HttpServlet implements ServletContextListener {
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
	public static ResultSet rs =null;
	private static final long serialVersionUID = 1L;//jdbc:mysql://blablabla.rds.amazonaws.com/dbname?user=user&password=password
	public static String dbURL = "jdbc:postgresql://localhost/joblist?user=postgres&password=03_0431A"; //ileco1_amfm
	//public static String dbURL = "jdbc:postgresql://172.17.100.6/joblist?user=postgres&password=03_0431A"; //ileco1_amfm
	public static String townxx = "Town"; 
	public static String brgyxx = "Brgy";
	public static String yearxx = null;
	public static String monthxx = null;
	public static String crewxx = "Select Crew";
	public static String dayxx = "Day";
	public static String startDate = null;
	public static String endDate = null;
	public static String xz1="";
	public static String xz2="";
	public static String xz3="";
	public static String xz4="";
	
	public static Integer pz1=0;
	public static Integer pz2=0;
	public static Integer pz3=0;
	public static Integer pz4=0;
	@Override
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		pz1=1;
		pz2=1;
		pz3=1;
		pz4=1;
		//if (townxx!=null) {pz1=1;}
		//if (brgyxx!=null) {pz2=1;}
		//if (crewxx!=null) {pz3=1;}
		
		String id=request.getParameter("id");
		
		townxx = request.getParameter("x");
		brgyxx = request.getParameter("y");	
		yearxx = request.getParameter("z");
		monthxx = request.getParameter("z1");
		crewxx = request.getParameter("z2");
		dayxx = request.getParameter("z3");
		System.out.println("sample"+townxx+","+brgyxx+","+yearxx+","+monthxx+","+dayxx+","+crewxx);
		
		if (townxx!=null && townxx.contains("Town")) {townxx = null;pz1=0;}
		if (brgyxx!=null && brgyxx.contains("Brgy")) {brgyxx =null;pz2=0;}
		if (yearxx!=null && yearxx.contains("Year")) {yearxx = null;}
		if (monthxx!=null && monthxx.contains("Month")) {monthxx ="null";}
		if (crewxx!=null && crewxx.contains("Select Crew")) {crewxx =null;pz3=0;}
		if (dayxx!=null && dayxx.contains("Day")) {dayxx ="null";pz4=0;}
		
		System.out.println(pz1+","+pz2+","+pz3+","+pz4);
		
		
		
		List<User> products = getAllUsers(id,townxx,brgyxx,yearxx,monthxx);
		String json = new Gson().toJson(products);
	    response.setContentType("text/html;charset=UTF-8");
	    response.getWriter().write(json);
	    
	    System.out.println(json);
		
		 
	}
	
	public void doPost (HttpServletRequest _req, HttpServletResponse _res)
		    throws ServletException, IOException {
		JsonParser parser = new JsonParser();
		JsonObject obj = (JsonObject) parser.parse(_req.getReader());
		String name = obj.get("name").getAsString();
		System.out.println(name);
	}
	 public List<User> getAllUsers(String id,String townxx,String brgyxx,String yearxx,String monthxx){ 
	
		   List<User> userList = new ArrayList<>();
		   Connection dbCon = null;

		   String cpz1="WHERE";
			String cpz2="AND";;
			String cpz3="WHERE";if(pz1==1) {cpz3="AND";};
			String cpz4="WHERE";if(pz1+pz3>=1) {cpz4="AND";};
			
		   	  	
		       xz1=cpz1+ " town0= '"+ townxx+"'";
		       xz2=cpz2+ " brgy0= '"+ brgyxx+"'";
		       xz3=cpz3+ " assignedto= '"+ crewxx+"'";
	
		       	Date now = new Date(System.currentTimeMillis());
		       	
				Calendar cal1=Calendar.getInstance();
				Calendar cal2=Calendar.getInstance();
				Calendar cal2a=Calendar.getInstance();
				Calendar cal2b=Calendar.getInstance();
				cal1.setTime(now);
				cal1.add(Calendar.MONTH, 1);
				SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd");

				System.out.println(brgyxx+","+townxx+","+yearxx+","+monthxx);
				
				String monyear= monthxx +"-"+yearxx;
				StringTokenizer st=new StringTokenizer(monyear,"-");
				monthxx = st.nextToken();
				yearxx = st.nextToken();
				
				try {
					
					if(monthxx.equals("null") && yearxx.equals("null")) {
						//System.out.println("hello1");
						Date ended1=dateFormat.parse(cal1.get(Calendar.YEAR)+"-"+cal1.get(Calendar.MONTH)+"-1");
						cal2.setTime(ended1);
						cal2.add(Calendar.MONTH, 2);
						cal2.add(Calendar.DATE, -2);
						
					}
					if(monthxx.equals("null") && !yearxx.equals("null")) {
						//System.out.println("hello2");
						//monthxx="1";
					}
					if(yearxx.equals("null") && !monthxx.equals("null")) {
						//System.out.println("hello3");
						Date ended2=dateFormat.parse(cal1.get(Calendar.YEAR)+"-"+monthxx+"-1");
						cal2a.setTime(ended2);
						cal2a.add(Calendar.MONTH, 1);
						cal2a.add(Calendar.DATE, -1);
					}
					if(!yearxx.equals("null") && !monthxx.equals("null")) {
						//System.out.println("hello4");
						Date ended3=dateFormat.parse(yearxx+"-"+monthxx+"-1");
						cal2b.setTime(ended3);
						cal2b.add(Calendar.MONTH, 1);
						cal2b.add(Calendar.DATE, -1);
					}
	
					
				} catch (ParseException e) {
					e.printStackTrace();
				}	
				
		       	if(yearxx.equals("null") && monthxx.equals("null")) {
		       		//System.out.println("hi1");
		       		startDate = cal1.get(Calendar.YEAR)+"-"+cal1.get(Calendar.MONTH)+"-1";
				 	endDate = cal2.get(Calendar.YEAR)+"-"+cal2.get(Calendar.MONTH)+"-"+cal2.get(Calendar.DATE);
				 }
		       	if(!yearxx.equals("null") && monthxx.equals("null")) {
		       		//System.out.println("hi2");
		       		startDate = yearxx+"-1-1";
				 	endDate = yearxx+"-12-31";
		       	}
		       	if(yearxx.equals("null") && !monthxx.equals("null")) {
		       		//System.out.println("hi3");
		       		startDate = cal1.get(Calendar.YEAR)+"-"+monthxx+"-1";
				 	endDate = cal1.get(Calendar.YEAR)+"-"+monthxx+"-"+cal2a.get(Calendar.DATE);
		       	}
		     	if(!yearxx.equals("null") && !monthxx.equals("null")) {
		       		//System.out.println("hi4");
		       		startDate = yearxx+"-"+monthxx+"-1";
				 	endDate = yearxx+"-"+monthxx+"-"+cal2b.get(Calendar.DATE);
				   	if(!dayxx.equals("null")) {
				       	startDate = yearxx+"-"+monthxx+"-"+dayxx;
					 	endDate = yearxx+"-"+monthxx+"-"+dayxx;
			       	}
		       	}
			    	
		       xz4=cpz4+" CAST(followed AS DATE) BETWEEN '"+startDate+"' AND '"+endDate+"'";  
		       if(xz1.contains("null")) {xz1="";};
		       if(xz2.contains("null")) {xz2="";};
		       if(xz3.contains("null")) {xz3="";};
		       System.out.println("SELECT * FROM CONVERTED "
	       				+ xz1 + xz2 + xz3 + xz4
			    		+ " ORDER BY UNIQUE_ID, FOLLOWED::TIMESTAMP WITHOUT TIME ZONE DESC limit 10000");
		    try {
		      // Class.forName("org.postgresql.Driver");
		       //dbCon = DriverManager.getConnection(dbURL);
		       dbCon=DatabaseConnection.getInstance().getConnection();
		       Statement stmt = dbCon.createStatement();
		       //System.out.println("Opened database successfully");
		       //ResultSet rs =null;
		       
		      //String query3= "SELECT * FROM CONVERTED WHERE CAST(followed AS DATE) BETWEEN '2018-1-29' AND 'NOW()' ORDER BY followed ASC limit 10";
		   
		       //if (!brgyxx.equals(null)){ z2="";}
		       rs = stmt.executeQuery("SELECT DISTINCT ON (UNIQUE_ID)* FROM CONVERTED "
	       				+ xz1 + xz2 + xz3 + xz4
			    		+ " ORDER BY UNIQUE_ID, FOLLOWED::TIMESTAMP WITHOUT TIME ZONE DESC limit 30000");
		       
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
		          String location= rs.getString("location");
		          String latitude= rs.getString("latitude");                                            //15
		          String longitude= rs.getString("longitude");
		          String actiontaken= rs.getString("actiontaken");
		          
		          //System.out.println(assignedto);
		        User p1 = new User();
		  		p1.setID(unique_id);
		  		p1.setCreator(creator);
		  		p1.setCreated(created);
		  		p1.setFollower(follower);
		  		p1.setFollowed(followed);
		  		p1.setName(name);if(name==null) {p1.setName("");} 
		  		p1.setSpinners(spinners);if(spinners==null) {p1.setSpinners("");}
		  		p1.setTown0(town0);if(town0==null) {p1.setTown0("");}
		  		p1.setBrgy0(brgy0);if(brgy0==null) {p1.setBrgy0("");}
		  		p1.setTown(town); if(town==null) {p1.setTown("");}
		  		p1.setBrgy(brgy);if(brgy==null) {p1.setBrgy("");}
		  		p1.setTown2(town2);if(town2==null) {p1.setTown2("");}
		  		p1.setBrgy2(brgy2);if(brgy2==null) {p1.setBrgy2("");}
		  		p1.setAssignedto(assignedto);if(assignedto==null) {p1.setAssignedto("");}
		  		p1.setStatus(status);if(status==null) {p1.setStatus("");}
		  		p1.setSubs(subs);if(subs==null) {p1.setSubs("");}
		  		p1.setFeeder(feeder);if(feeder==null) {p1.setFeeder("");}
		  		p1.setSection(section);if(section==null) {p1.setSection("");}
		  		p1.setEquip(equip);   if(equip==null) {p1.setEquip("");}                                           //4                                           //11
		  		p1.setType(type);if(type.equals("high")){p1.setType("Power Interruption");}if(type.equals("medium")) {p1.setType("O & M");}if(type.equals("low")) {p1.setType("Inspection/Verification");}
		  		p1.setCause(cause); if(cause==null) {p1.setCause("");}   
		  		p1.setNotes(notes);if(notes==null) {p1.setNotes("");} 
		  		p1.setLandmark(landmark);if(landmark==null) {p1.setLandmark("");} 
		  		p1.setPhone(phone);if(phone==null) {p1.setPhone("");} 
		  		p1.setLocation(location);if(location==null) {p1.setLocation("");} 
		  		p1.setLatitude(latitude); if(latitude==null) {p1.setLatitude("");}                                            //15
		  		p1.setLongitude(longitude);if(longitude==null) {p1.setLongitude("");} 
		  		p1.setActiontaken(actiontaken);if(actiontaken==null) {p1.setActiontaken("");} 

		  		userList.add(p1);
		       }
		      
		       //System.out.println(userList);
		       rs.close();
		       stmt.close();
		       //dbCon.close();
		 
		    } catch ( Exception e ) {
			         System.err.println("Someservlet-"+ e.getClass().getName()+": "+ e.getMessage() );
			         //System.exit(0);
			      }
			      return userList;
			      
	 }

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}  
}
