package jspbook.tsd;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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
import com.google.gson.Gson;

@WebServlet("/servlet1/*")
public class someservlet1 extends HttpServlet implements ServletContextListener {
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
	private static final long serialVersionUID = 1L;
	//String dbURL = someservlet.dbURL;
	@Override
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		      
		String id=request.getParameter("id");
		String townxx =request.getParameter("x");
		List<User2> products = getAllUsers(id);
	    String json = new Gson().toJson(products);
	    //response.setCharacterEncoding("UTF-8");
	    response.setContentType("text/html;charset=UTF-8");
	    response.getWriter().write(json);
	    
	   System.out.println(townxx);
	}
	public void doPost (HttpServletRequest _req, HttpServletResponse _res)
		    throws ServletException, IOException {
		String serial_no =_req.getParameter("serial_no");
		String lat =_req.getParameter("lat");
		String lon =_req.getParameter("lon");
		update(serial_no,lat,lon);
		System.out.println("Operation done successfully");
	}
	public void update(String serial_no,String lat,String lon) {
		System.out.println(serial_no+","+lat+"/"+lon);
		
		 Connection dbCon = null;
		 String query = "UPDATE TOWNS SET  lat="+lat+", lon="+lon+" WHERE serial_no='"+serial_no+"'";
		    try {
		       //Class.forName("org.postgresql.Driver");
		       //dbCon = DriverManager.getConnection(dbURL);
		       dbCon=DatabaseConnection.getInstance().getConnection();
		       PreparedStatement stmt = dbCon.prepareStatement(query);
		       stmt.executeUpdate(); //DONT FORGET THIS ONE
		       stmt.close();
		       //dbCon.close();
		 
		    } catch ( Exception e ) {
		    	 System.err.println( e.getClass().getName()+": "+ e.getMessage() );
		         //System.exit(0);
			      }
		    
	}
	 public List<User2> getAllUsers(String id){ 
		  	
		    List<User2> userList = new ArrayList<>();
		    //List<> userList = new Gson().fromJSON(jsonPerson, new TypeToken<List<Person>>() {}getType());
		    Connection dbCon = null;
		    try {
		       //Class.forName("org.postgresql.Driver");
		       //dbCon = DriverManager.getConnection(dbURL);
		       dbCon=DatabaseConnection.getInstance().getConnection();
		       Statement stmt = dbCon.createStatement();
		       //System.out.println("Opened database successfully");
		       //ResultSet rs =null;
		       
		       if (id==null){
		       rs = stmt.executeQuery( "SELECT * FROM TOWNS ORDER BY id ASC");
		       }
		       	User2 p1 = new User2(); //0
		  		p1.setID("0");
		  		p1.setSerial("00");
		  		p1.setCategory("town");
		  		p1.setValue("Select Town");
		  		p1.setLat("10.67140447");
		  		p1.setLon("122.3787689");
		  		userList.add(p1);
		  		
		  		User2 p3 = new User2();//1
		  		p3.setID("0");
		  		p3.setSerial("00");
		  		p3.setCategory("barangay");
		  		p3.setValue("Select Brgy");
		  		p3.setLat("0.0");
		  		p3.setLon("0.0");
		  		userList.add(p3);
		  		
		  		User2 p4 = new User2();//2
		  		p4.setID("0");
		  		p4.setSerial("00");
		  		p4.setCategory("crew");
		  		p4.setValue("Select Crew");
		  		p4.setLat("");
		  		p4.setLon("");
		  		userList.add(p4);
		  		
		  		User2 p5 = new User2();//3
		  		p5.setID("0");
		  		p5.setSerial("00");
		  		p5.setCategory("status");
		  		p5.setValue("Select Status");
		  		p5.setLat("");
		  		p5.setLon("");
		  		userList.add(p5);
		  		
		  		  		
		  		User2 pa = new User2();//4
		  		pa.setID("0");
		  		pa.setSerial("00");
		  		pa.setCategory("substation");
		  		pa.setValue("Substation");
		  		pa.setLat("");
		  		pa.setLon("");
		  		userList.add(pa);
		  		
		  		User2 pb = new User2();//5
		  		pb.setID("0");
		  		pb.setSerial("00");
		  		pb.setCategory("feeder");
		  		pb.setValue("Feeder");
		  		pb.setLat("");
		  		pb.setLon("");
		  		userList.add(pb);
		  		
		  		User2 pc = new User2();//6
		  		pc.setID("0");
		  		pc.setSerial("00");
		  		pc.setCategory("category");
		  		pc.setValue("Category");
		  		pc.setLat("");
		  		pc.setLon("");
		  		userList.add(pc);
		  		
		  		User2 pd = new User2();//7
		  		pd.setID("0");
		  		pd.setSerial("00");
		  		pd.setCategory("equipment");
		  		pd.setValue("Equipment");
		  		pd.setLat("");
		  		pd.setLon("");
		  		userList.add(pd);
		  		
		  		User2 pe = new User2();//8
		  		pe.setID("0");
		  		pe.setSerial("00");
		  		pe.setCategory("cause");
		  		pe.setValue("Select One");
		  		pe.setLat("");
		  		pe.setLon("");
		  		userList.add(pe);
		  		
		       while ( rs.next() ) {
		          String uid = rs.getString("id");
		          String serial_no =  rs.getString("serial_no");
		          String category =  rs.getString("category");
		          String value =  rs.getString("description");
		          String lat =  rs.getString("lat");
		          String lon =  rs.getString("lon");
		          
		          
		          //System.out.println(assignedto);
		        User2 p2 = new User2();
		  		p2.setID(uid);
		  		p2.setSerial(serial_no);
		  		p2.setCategory(category);
		  		p2.setValue(value);
		  		p2.setLat(lat);
		  		p2.setLon(lon);

		  		userList.add(p2);
		       }
		      
		       //System.out.println(userList);
		       rs.close();
		       stmt.close();
		       //dbCon.close();
		 
		    } catch ( Exception e ) {
		    	 System.err.println("Someservlet1-"+ e.getClass().getName()+": "+ e.getMessage() );
		         //System.exit(0);
			      }
			      return userList;
			      
	 }
	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}  
}
