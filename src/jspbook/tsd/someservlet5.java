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
import javax.sql.DataSource;
import javax.ws.rs.Path;

import org.postgresql.core.Query;

import com.google.gson.Gson;

@WebServlet("/servlet5/*")
public class someservlet5 extends HttpServlet implements ServletContextListener {
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
	public static ResultSet rs0 =null;
	public static ResultSet rs =null;
	private static final long serialVersionUID = 1L;
	//public static String dbURL = someservlet.dbURL;
	public static String townxx = "Town"; 
	public static String brgyxx = "Brgy";
	public static String yearxx = null;
	public static String monthxx = null;
	public static String crewxx = "Select Crew";
	public static String dayxx = null;
	public static String startDate = null;
	public static String endDate = null;
	public static String xz1="";
	public static String xz2="";
	public static String xz3="";
	public static String xz4="";
	public static String xz5="";
	public static String xz6="";
	
	public static Integer pz1=0;
	public static Integer pz2=0;
	public static Integer pz3=0;
	public static Integer pz4=0;
	
	public static Integer limit=100;
	public static DataSource dataSource = DataSourceConfig.getDataSource();
	public static Connection con=getConnection();
	public static Connection getConnection() {
		try {
			return dataSource.getConnection();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	@Override
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		pz1=1;
		pz2=1;
		pz3=1;
		pz4=1;
		
		String id=request.getParameter("id");
		
		townxx = request.getParameter("x");
		brgyxx = request.getParameter("y");	
		yearxx = request.getParameter("z");
		startDate = request.getParameter("z1");
		crewxx = request.getParameter("z2");
		endDate = request.getParameter("z3");
//		
		//System.out.println(townxx+","+brgyxx+","+yearxx+","+monthxx+","+dayxx+","+crewxx);
		
		if (townxx!=null && townxx.contains("Town")) {townxx = null;pz1=0;limit=5;}
		if (brgyxx!=null && brgyxx.contains("Brgy")) {brgyxx =null;pz2=0;}
		if (crewxx!=null && crewxx.contains("Select Crew")) {crewxx =null;pz3=0;}
		
		
		List<User3> products = getAllUsers(id,townxx,brgyxx,yearxx,startDate,endDate,crewxx);
	    String json = new Gson().toJson(products);
	    System.out.println("someservelet5"+json);
	    response.setContentType("text/html;charset=UTF-8");
	    response.getWriter().write(json);
	    //System.out.println(pz1+pz2+pz3+pz4+"s");
	    
		    
	}
	
	public void doPost (HttpServletRequest _req, HttpServletResponse _res)
		    throws ServletException, IOException {
		//String townxx =_req.getParameter("Townx");
		//System.out.println(townxx);
	}
	 public List<User3> getAllUsers(String id,String townxx,String brgyxx,String yearxx,String monthxx,String dayxx,String crewxx){ 
	
		   List<User3> userList = new ArrayList<>();
		   //Connection dbCon0 = null;
		   //Connection dbCon = null;
	   
			String cpz1="WHERE";
			String cpz2="AND";;
			String cpz3="WHERE";if(pz1==1) {cpz3="AND";};
			String cpz4="WHERE";if(pz1+pz3>=1) {cpz4="AND";};
			
			
		   	  	
		       xz1=cpz1+ " c.town0= '"+ townxx+"'";
		       xz2=cpz2+ " c.brgy0= '"+ brgyxx+"'";
		       xz3=cpz3+ " c.assignedto= '"+ crewxx+"'";
		       xz4=cpz4+ " subquery.row_num <= "+ limit;
	
		     
				
			    	
		       xz5=" WHERE status NOT LIKE 'Accomplished' AND CAST(followed AS DATE) BETWEEN '"+startDate+"' AND '"+endDate+"'";  
		       xz6=" AND c.status NOT LIKE 'Accomplished' AND CAST(c.followed AS DATE) BETWEEN '"+startDate+"' AND '"+endDate+"'";  
		       if(xz1.contains("null")) {xz1="";};
		       if(xz2.contains("null")) {xz2="";};
		       if(xz3.contains("null")) {xz3="";};
		       System.out.println("SELECT DISTINCT ON (c.UNIQUE_ID) * FROM (SELECT *,ROW_NUMBER() OVER (PARTITION BY unique_id ORDER BY followed) AS row_num FROM converted "+xz5+") subquery "
		    		   +"INNER JOIN converted c on subquery.unique_id=c.unique_id "	+ xz1 + xz2 + xz3 + xz4+ xz6
			    		+ "  ORDER BY c.UNIQUE_ID, c.FOLLOWED::TIMESTAMP WITHOUT TIME ZONE DESC");  
		    try {
		       DatabaseConnection.getInstance();
			//Class.forName("org.postgresql.Driver");
		       //dbCon = DriverManager.getConnection(dbURL);
		       //dbCon=DatabaseConnection.getConnection();
		       Statement stmt =con.createStatement();
		       rs = stmt.executeQuery("SELECT DISTINCT ON (c.UNIQUE_ID) c.unique_id,c.name,c.type,c.status,c.town0,c.brgy0,c.cause,c.followed,c.followed::TIMESTAMP WITHOUT TIME ZONE followed1 FROM (SELECT unique_id,name,type,status,town0,brgy0,cause,followed,ROW_NUMBER() OVER (PARTITION BY unique_id ORDER BY followed) AS row_num FROM converted "+xz5+") subquery "
		       	+"INNER JOIN converted c on subquery.unique_id=c.unique_id "	+ xz1 + xz2 + xz3 + xz4+ xz6
				    		+ " ORDER BY c.UNIQUE_ID, c.FOLLOWED::TIMESTAMP WITHOUT TIME ZONE DESC");  
		      List<String> drt=new ArrayList<String>();
		       
		       while ( rs.next() ) {
		    	   		 String unique_id = rs.getString("unique_id");
				          //String created =  rs.getString("created");
				          String followed =  rs.getString("followed");
				          Date followed1=rs.getTimestamp("followed1");
				          String town0 =  rs.getString("town0");
				          String brgy0=  rs.getString("brgy0");
				          //String crew=  rs.getString("assignedto");
				          String name =  rs.getString("name");//
				          //String notes = rs.getString("notes");//
				          //String section= rs.getString("section");//
				          //String equip= rs.getString("equip"); //                                             //4                                           //11
				          
				          //String actiontaken= rs.getString("actiontaken");//
				          String status= rs.getString("status");
				                                                                                            //11
				          String type = rs.getString("type");
				          String cause= rs.getString("cause");
				          //String lat= rs.getString("latitude");                                            //15
				          //String lng= rs.getString("longitude");
				          //drt.add(name+"-"+followed);
				          
				          
				          	//System.out.println(startDate+"-"+endDate);
				          	Date followedDate=new Date();
				          	Date endDate2=new Date();
					        SimpleDateFormat df = new SimpleDateFormat("MM/dd/yy  hh:mm:ss a");
					        SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
					        try {
					            //followedDate = df.parse(String.valueOf(followed));
					            endDate2 = df2.parse(String.valueOf(endDate));
					           
					        } catch (ParseException e) {
					            e.printStackTrace();
					        }
					        Calendar cal7 = Calendar.getInstance(); // creates a new calendar instance
					        Calendar cal8 = Calendar.getInstance(); // creates a new calendar instance
					        cal7.setTime(followed1);   // assigns calendar to given date 
					        cal8.setTime(endDate2);   // assigns calendar to given date 
					        cal8.add(Calendar.DATE, 1);
					        if(followed1.before(cal8.getTime())) {
						        User3 p1 = new User3();
						  		p1.setID(unique_id);
						  		//p1.setCreated(created);
						  		p1.setFollowed(followed);
						  		p1.setHour(String.valueOf(cal7.get(Calendar.HOUR_OF_DAY)));
						  		p1.setTown0(town0);if(town0==null) {p1.setTown0("");}
						  		p1.setBrgy0(brgy0);if(brgy0==null) {p1.setBrgy0("");}
						  		//p1.setCrew(crew);if(crew==null) {p1.setCrew("");}
						  		p1.setStatus(status);if(status==null) {p1.setStatus("");}
						  		p1.setType(type);
						  		p1.setCause(cause); if(cause==null) {p1.setCause("");}
						  		//p1.setLatitude(lat); if(lat==null) {p1.setLatitude("");}                                            //15
						  		//p1.setLongitude(lng);if(lng==null) {p1.setLongitude("");} 
						  		p1.setName(name);if(name==null) {p1.setName("");} 
						  		//p1.setNotes(notes);if(notes==null) {p1.setNotes("");}
						  		//p1.setActiontaken(actiontaken);if(actiontaken==null) {p1.setActiontaken("");} 
						  		//p1.setSection(section);if(section==null) {p1.setSection("");}
						  		//p1.setEquip(equip);   if(equip==null) {p1.setEquip("");}                                           //4                                           //11
					  		
						  		userList.add(p1); // search for add and/or update???
					        }
				       
				       
			      
		       }
		       
		       //System.out.println("etazsgcfjfjkc");
		        
		       rs.close();
		       
		       stmt.close();
		       //dbCon.close();
		 
		    } catch ( Exception e ) {
			         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
			         //System.exit(0);
			      }
		    
		    
		    //NOTE: CREATE LOOP USING DRT???
		    
		    
		   
		    
		    
			      return userList;
			      
	 }

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}  
}
