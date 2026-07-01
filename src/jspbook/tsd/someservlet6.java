package jspbook.tsd;

import java.io.IOException;
import java.sql.Array;
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
import javax.sql.DataSource;
import javax.ws.rs.Path;

import org.json.JSONObject;
import org.postgresql.core.Query;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/servlet6/*")
public class someservlet6 extends HttpServlet implements ServletContextListener {
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
    public static DataSource dataSource = DataSourceConfig.getDataSource();
	public static Connection con=getConnection();
	public static Connection con2=getConnection();
	public static Connection getConnection() {
		try {
			return dataSource.getConnection();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	//public static Connection dbCon = null;
	//public static Connection dbCon1 = null;
	public static ResultSet rs =null;
	private static final long serialVersionUID = 1L;
	//
	//public static String dbURL = someservlet.dbURL;
	
	@Override
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String id=request.getParameter("id");
		
		List<User> products = getAllUsers(id.toString());
	    String json = new Gson().toJson(products);
	    
	    response.setContentType("text/html;charset=UTF-8");
	    response.getWriter().write(json);
	    
	    System.out.println(json);
		
		    
	}
	
	public void doPost(HttpServletRequest _req, HttpServletResponse _res)
	        throws ServletException, IOException {

	    _res.setContentType("application/json");
	    _res.setCharacterEncoding("UTF-8");

	    try {
	        StringBuilder sb = new StringBuilder();
	        String line;

	        while ((line = _req.getReader().readLine()) != null) {
	            sb.append(line);
	        }

	        JSONObject obj = new JSONObject(sb.toString());

	        upsertReceiver(obj);
	        try {
	            upsertJO(obj);
	        } catch (Exception e) {
	            e.printStackTrace();
	            // upsertJO failure will NOT affect success response
	        }
	        boolean saved = upsertAllObj(obj);

	        if (!saved) {
	            _res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	            _res.getWriter().write("{\"success\":false,\"message\":\"upsertAllObj failed\"}");
	            return;
	        }
	        _res.setStatus(HttpServletResponse.SC_OK);
	        _res.getWriter().write("{\"success\":true,\"message\":\"saved successfully\"}");
	        _res.getWriter().flush();
	        
	        new Thread(() -> {
	            try {
	                Date date1 = null;
	                SimpleDateFormat df = new SimpleDateFormat("MM/dd/yy hh:mm:ss a");

	                try {
	                    date1 = df.parse(obj.get("followed").toString());
	                } catch (ParseException e) {
	                    e.printStackTrace();
	                }

	                if (date1 != null) {
	                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyMMddHHmmss");
	                    String followed = dateFormat.format(date1);

	                    Date now = new Date(System.currentTimeMillis());

	                    if (getDateDiff(now, date1, TimeUnit.HOURS) == 0) {
	                        postRun(obj, followed);
	                    }
	                }

	                upsertJO(obj);

	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }).start();

	    } catch (Exception e) {
	        e.printStackTrace();
	        _res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	        _res.getWriter().write("{\"success\":false,\"message\":\"server error\"}");
	    }
	}
	public static String JSONString="{\"unique_id\":\"09778572402240707193007\",\"creator\":\"09778572402\",\"created\":\"07/07/24  07:30:07 PM\",\"follower\":\"09778572402\",\"followed\":\"07/07/24  07:30:00 PM\",\"name\":\"sample\",\"spinners\":\"1520230400506007058090100200300400\",\"town0\":\"Leganes\",\"brgy0\":\"Bigke\",\"town\":\"Select Town\",\"brgy\":\"Select Brgy\",\"town2\":\"Select Town\",\"brgy2\":\"Select Brgy\",\"assignedto\":\"Leganes\",\"status\":\"Select Status\",\"subs\":\"Substation\",\"feeder\":\"Feeder\",\"section\":\"Category\",\"equip\":\"Equipment\",\"type\":\"high\",\"cause\":\"Select One\",\"notes\":\"\",\"landmark\":\"\",\"phone\":\"\",\"location\":\"\",\"latitude\":\"10.765937\",\"longitude\":\"122.6005424\",\"actiontaken\":\"\"}\r\n"
			+ "";
	public static void main(String[] args) throws IOException, ClassNotFoundException, SQLException {
		//postRun(new JSONObject(JSONString),"2240707193007");
		getAllUsers("09778572402250930152808");
	 }
	public static void postRun(JSONObject obj,String followed) throws Exception {
		System.out.println("obJ:"+obj);
		StringBuilder buf = new StringBuilder("omms\\");
		buf.append(obj.get("unique_id").toString()).append(followed).append("\\");            //followed
        buf.append("*").append(obj.get("name").toString()).append("\\");
        buf.append(obj.get("spinners").toString()).append("\\");
        buf.append(obj.get("type").toString()).append("\\");
        buf.append("*").append(obj.get("notes").toString()).append("\\");
        buf.append("*").append(obj.get("landmark").toString()).append("\\");
        buf.append("*").append(obj.get("phone").toString()).append("\\");
        buf.append("*").append(obj.get("location").toString()).append("\\");
        buf.append(obj.get("latitude").toString()).append("\\");
        buf.append(obj.get("longitude").toString()).append("\\");
        buf.append("*").append(obj.get("actiontaken").toString());
        
        //DatabaseConnection.getInstance();
		//dbCon1=DatabaseConnection.getConnection();
	       
          try {
		       //Class.forName("org.postgresql.Driver");
		        //dbCon1 = DriverManager.getConnection(dbURL);
		        Runnable runnable = new Runnable() {					         
		              @Override
		              public void run() {
		            	 
		            	  System.out.println("from someservlet6 runnable..sending sms command..");
		            	try {
		            		
		            		Statement stmt = con.createStatement();		    		        
		            		ResultSet rx = stmt.executeQuery( "SELECT  * FROM RECEIVERS WHERE UNIQUE_ID='"+obj.get("unique_id").toString()+"'"); //
				   		    while ( rx.next() ) {				        	
								insert(buf.toString(),rx.getString("phone"));	        	  						
							}
							rx.close();
							stmt.close();
						} catch (SQLException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}  
		            	 
				      }     	  
		       };
	          
		       
		       obj.put("command", "jo");obj.put("time", "100");obj.put("monitor_time", "10000");obj.put("distance", "0");
		       FCMAsyncTasks.ruN(obj.get("assignedto").toString().replace(" and ","")
						.replace(".","").replace(" ","")
						.replace("&",""),obj,runnable);
		       //FCMAsyncTasks.ruN2();
 
		    } catch ( Exception e ) {
		    	System.err.println( e.getClass().getName()+": "+ e.getMessage() );
			}
	}
	 public static List<User> getAllUsers(String id){ 
		 
		   List<User> userList = new ArrayList<>();
		   
		   try {
		       Class.forName("org.postgresql.Driver");
		       //dbCon = DriverManager.getConnection(dbURL);
		       //dbCon=DatabaseConnection.getInstance().getConnection();
		       Statement stmt = con.createStatement();
		        rs = stmt.executeQuery("SELECT c.*,COALESCE(m.members,'') AS members,COALESCE(m.jo,'') AS jo FROM CONVERTED c LEFT JOIN MEMBERS m ON c.UNIQUE_ID=m.UNIQUE_ID "+
		        						"WHERE c.unique_id='"+id+"'"+
		        						"ORDER BY c.UNIQUE_ID, c.FOLLOWED::TIMESTAMP WITHOUT TIME ZONE DESC");
	       	 
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
		          String members= rs.getString("members");
		          String jo= rs.getString("jo");
		          
		          
		          
		        System.out.println("dfsdf:"+members);
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
		  		p1.setType(type);//if(type.equals("high")){p1.setType("Power Interruption");}if(type.equals("medium")) {p1.setType("O & M");}if(type.equals("low")) {p1.setType("Inspection/Verification");}
		  		p1.setCause(cause); if(cause==null) {p1.setCause("");}   
		  		p1.setNotes(notes);if(notes==null) {p1.setNotes("");} 
		  		p1.setLandmark(landmark);if(landmark==null) {p1.setLandmark("");} 
		  		p1.setPhone(phone);if(phone==null) {p1.setPhone("");} 
		  		p1.setLocation(location);if(location==null) {p1.setLocation("");} 
		  		p1.setLatitude(latitude); if(latitude==null) {p1.setLatitude("");}                                            //15
		  		p1.setLongitude(longitude);if(longitude==null) {p1.setLongitude("");} 
		  		p1.setActiontaken(actiontaken);if(actiontaken==null) {p1.setActiontaken("");} 
		  		p1.setJO(jo);if(jo==null) {p1.setJO("");} 
		  		p1.setMembers(members);if(members==null) {p1.setMembers("");} 

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
	 public static void insert(String Msg, String Addrs) {
		   
		 	String query1 = "INSERT INTO SMS2(phone,message) VALUES(?, ?)";
		
	        //Connection dbCon1 = null;
	       // Connection dbCon2 = null;
	          try {
			       DatabaseConnection.getInstance();
				//Class.forName("org.postgresql.Driver");
			       con=DatabaseConnection.getConnection();
			       DatabaseConnection.getInstance();
				con2=DatabaseConnection.getConnection();
			       Statement stmt1 = con.createStatement();
			       PreparedStatement pst1 = con2.prepareStatement(query1);
			    
			  
		          ResultSet rx1 = stmt1.executeQuery( "SELECT COUNT(*) FROM SMS2 WHERE MESSAGE='"+Msg.toString()+"'" +" AND PHONE='"+Addrs.toString()+"'"); 
		          int count=0;
		          while ( rx1.next() ) { 
		        	  count=rx1.getInt("count");
		        	  
		          }
		          //System.out.println(count+"-"+Addrs);
		          if (count==0) {
		              //pst1.setInt(1, 1);
		 	          pst1.setString(1, Addrs);
		 	          pst1.setString(2, Msg.toString());
		 	          pst1.executeUpdate(); //DONT FORGET THIS ONE
			       
		          }
		           rx1.close();
				  
			       stmt1.close();
			       pst1.close();
			       //dbCon1.close();
			       ///dbCon2.close();
			       
		          
	        
		      
		 
		    } catch ( Exception e ) {
			         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
			         //System.exit(0);
			      }
		}
	 public static void upsertJO(JSONObject obj) throws Exception {
		 String query = 
				    "INSERT INTO members(unique_id, jo, followed) " +
				    "SELECT ?, COALESCE(?,TO_CHAR(?::date, 'YYMMDD')  || COALESCE(("+ 
				    "SELECT COUNT(DISTINCT unique_id) + 1 "+ 
				    "FROM members WHERE followed::date=TO_DATE(?, 'MM/DD/YY')"+ 
				    "),1)) AS jo,? ON CONFLICT (unique_id, followed) DO UPDATE"+ 
				    " SET jo = EXCLUDED.jo";

		   try {
			 //DatabaseConnection.getInstance();
			//dbCon=DatabaseConnection.getConnection();
		       	PreparedStatement pst = con.prepareStatement(query);
		       	pst.setString(1,obj.getString("unique_id"));
		       	if (obj.isNull("jo")) {
		       	    pst.setNull(2, java.sql.Types.VARCHAR);
		       	} else {
		       	    pst.setString(2, obj.getString("jo"));
		       	}
		    	pst.setString(3,obj.getString("created"));
		    	pst.setString(4,obj.getString("created"));
		       	pst.setString(5,obj.getString("followed"));
	            pst.executeUpdate();
	            pst.close();
	            //con.close();
	            System.out.println("test");
	        } catch (SQLException e) {

	        	 System.err.println( e.getClass().getName()+": "+ e.getMessage() );
 	         
	        }
	 }
	 public static void upsert(JsonObject obj) {
		 
		 System.out.println("from planner"+obj.get("notes").getAsString());
		 String query = "INSERT INTO CONVERTED(unique_id, creator, created, follower, followed, name, spinners, town0, brgy0, town, brgy, town2, brgy2, assignedto, status, subs, feeder, section, cause, equip, type, notes, landmark, phone, location, latitude, longitude, actiontaken)" + 
	        		"	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	        
	        //Connection dbCon = null;
	     	   try {
			       //Class.forName("org.postgresql.Driver");
		 
			       //DatabaseConnection.getInstance();
				//dbCon=DatabaseConnection.getConnection();
			       Statement stmt = con.createStatement();
			       
			       PreparedStatement pst = con.prepareStatement(query);
			       	
			       	pst.setString(1, obj.get("unique_id").getAsString());
		            pst.setString(2, obj.get("creator").getAsString());
		            pst.setString(3, obj.get("created").getAsString());
		            pst.setString(4, obj.get("follower").getAsString());
		            pst.setString(5, obj.get("followed").getAsString());
		            pst.setString(6, obj.get("name").getAsString());
		            pst.setString(7, obj.get("spinners").getAsString());
		            pst.setString(8, obj.get("town0").getAsString());
		            pst.setString(9, obj.get("brgy0").getAsString());
		            pst.setString(10, obj.get("town").getAsString());
		            pst.setString(11, obj.get("brgy").getAsString());
		            pst.setString(12, obj.get("town2").getAsString());
		            pst.setString(13, obj.get("brgy2").getAsString());
		            pst.setString(14, obj.get("assignedto").getAsString());
		            pst.setString(15, obj.get("status").getAsString());
		            pst.setString(16, obj.get("subs").getAsString());
		            pst.setString(17, obj.get("feeder").getAsString());
		            pst.setString(18, obj.get("section").getAsString());
		            pst.setString(19, obj.get("cause").getAsString());
		            pst.setString(20, obj.get("equip").getAsString());
		            pst.setString(21, obj.get("type").getAsString());
		            pst.setString(22, obj.get("notes").getAsString());
		            pst.setString(23, obj.get("landmark").getAsString());
		            pst.setString(24, obj.get("phone").getAsString());
		            pst.setString(25, obj.get("location").getAsString());
		            pst.setString(26, obj.get("latitude").getAsString());
		            pst.setString(27, obj.get("longitude").getAsString());
		            pst.setString(28, obj.get("actiontaken").getAsString());
		            pst.executeUpdate();
		       
			        
			        
			        
		       
		       //dbCon.close();    
		       pst.close();
		       stmt.close();
		      
		 
		    } catch ( Exception e ) {
			         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
			         //System.exit(0);
			      }
	    
	}
	 public static String sql =
			    "INSERT INTO converted (" +
			    "unique_id, creator, created, follower, followed, name, spinners, " +
			    "town0, brgy0, town, brgy, town2, brgy2, assignedto, status, subs, " +
			    "feeder, section, cause, equip, type, notes, landmark, phone, " +
			    "location, latitude, longitude, actiontaken) " +
			    "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) " +
			    "ON CONFLICT (unique_id,followed) DO UPDATE SET " +
			    "creator = EXCLUDED.creator, " +
			    "created = EXCLUDED.created, " +
			    "follower = EXCLUDED.follower, " +
			   // "followed = EXCLUDED.followed, " +
			    "name = EXCLUDED.name, " +
			    "spinners = EXCLUDED.spinners, " +
			    "town0 = EXCLUDED.town0, " +
			    "brgy0 = EXCLUDED.brgy0, " +
			    "town = EXCLUDED.town, " +
			    "brgy = EXCLUDED.brgy, " +
			    "town2 = EXCLUDED.town2, " +
			    "brgy2 = EXCLUDED.brgy2, " +
			    "assignedto = EXCLUDED.assignedto, " +
			    "status = EXCLUDED.status, " +
			    "subs = EXCLUDED.subs, " +
			    "feeder = EXCLUDED.feeder, " +
			    "section = EXCLUDED.section, " +
			    "cause = EXCLUDED.cause, " +
			    "equip = EXCLUDED.equip, " +
			    "type = EXCLUDED.type, " +
			    "notes = EXCLUDED.notes, " +
			    "landmark = EXCLUDED.landmark, " +
			    "phone = EXCLUDED.phone, " +
			    "location = EXCLUDED.location, " +
			    "latitude = EXCLUDED.latitude, " +
			    "longitude = EXCLUDED.longitude, " +
			    "actiontaken = EXCLUDED.actiontaken";
	 public static boolean upsertAllObj(JSONObject obj) {

		    System.out.println("from planner4 " + obj.get("notes"));

		    try (Connection con = DatabaseConnection.getConnection();
		         PreparedStatement pst = con.prepareStatement(sql)) {

		        pst.setString(1, obj.get("unique_id").toString());
		        pst.setString(2, obj.get("creator").toString());
		        pst.setString(3, obj.get("created").toString());
		        pst.setString(4, obj.get("follower").toString());
		        pst.setString(5, obj.get("followed").toString());
		        pst.setString(6, obj.get("name").toString());
		        pst.setString(7, obj.get("spinners").toString());
		        pst.setString(8, obj.get("town0").toString());
		        pst.setString(9, obj.get("brgy0").toString());
		        pst.setString(10, obj.get("town").toString());
		        pst.setString(11, obj.get("brgy").toString());
		        pst.setString(12, obj.get("town2").toString());
		        pst.setString(13, obj.get("brgy2").toString());
		        pst.setString(14, obj.get("assignedto").toString());
		        pst.setString(15, obj.get("status").toString());
		        pst.setString(16, obj.get("subs").toString());
		        pst.setString(17, obj.get("feeder").toString());
		        pst.setString(18, obj.get("section").toString());
		        pst.setString(19, obj.get("cause").toString());
		        pst.setString(20, obj.get("equip").toString());
		        pst.setString(21, obj.get("type").toString());
		        pst.setString(22, obj.get("notes").toString());
		        pst.setString(23, obj.get("landmark").toString());
		        pst.setString(24, obj.get("phone").toString());
		        pst.setString(25, obj.get("location").toString());
		        pst.setString(26, obj.get("latitude").toString());
		        pst.setString(27, obj.get("longitude").toString());
		        pst.setString(28, obj.get("actiontaken").toString());

		        pst.executeUpdate();
		        return true;

		    } catch (Exception e) {
		        System.err.println("upsertAllObj error: " + e.getMessage());
		        return false;
		    }
		}
	 public static void insertObj(JSONObject obj) {
		 
		 System.out.println("from planner"+obj.get("notes").toString());
		 String query = "INSERT INTO CONVERTED(unique_id, creator, created, follower, followed, name, spinners, town0, brgy0, town, brgy, town2, brgy2, assignedto, status, subs, feeder, section, cause, equip, type, notes, landmark, phone, location, latitude, longitude, actiontaken)" + 
	        		"	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	        
	        //Connection dbCon = null;
	     	   try {
			       //Class.forName("org.postgresql.Driver");
		 
			       //DatabaseConnection.getInstance();
				//dbCon=DatabaseConnection.getConnection();
			       Statement stmt = con.createStatement();
			       
			       PreparedStatement pst = con.prepareStatement(query);
			       	
			       	pst.setString(1, obj.get("unique_id").toString());
		            pst.setString(2, obj.get("creator").toString());
		            pst.setString(3, obj.get("created").toString());
		            pst.setString(4, obj.get("follower").toString());
		            pst.setString(5, obj.get("followed").toString());
		            pst.setString(6, obj.get("name").toString());
		            pst.setString(7, obj.get("spinners").toString());
		            pst.setString(8, obj.get("town0").toString());
		            pst.setString(9, obj.get("brgy0").toString());
		            pst.setString(10, obj.get("town").toString());
		            pst.setString(11, obj.get("brgy").toString());
		            pst.setString(12, obj.get("town2").toString());
		            pst.setString(13, obj.get("brgy2").toString());
		            pst.setString(14, obj.get("assignedto").toString());
		            pst.setString(15, obj.get("status").toString());
		            pst.setString(16, obj.get("subs").toString());
		            pst.setString(17, obj.get("feeder").toString());
		            pst.setString(18, obj.get("section").toString());
		            pst.setString(19, obj.get("cause").toString());
		            pst.setString(20, obj.get("equip").toString());
		            pst.setString(21, obj.get("type").toString());
		            pst.setString(22, obj.get("notes").toString());
		            pst.setString(23, obj.get("landmark").toString());
		            pst.setString(24, obj.get("phone").toString());
		            pst.setString(25, obj.get("location").toString());
		            pst.setString(26, obj.get("latitude").toString());
		            pst.setString(27, obj.get("longitude").toString());
		            pst.setString(28, obj.get("actiontaken").toString());
		            pst.executeUpdate();
		       
			        
			        
			        
		       
		       //dbCon.close();    
		       pst.close();
		       stmt.close();
		      
		 
		    } catch ( Exception e ) {
			         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
			         //System.exit(0);
			      }
	    
	}
	 public static void upsertObj(JSONObject obj) {

		    String sql =
		        "INSERT INTO converted (unique_id, followed) " +
		        "VALUES (?, ?) " +
		        "ON CONFLICT (unique_id) DO UPDATE " +
		        "SET followed = EXCLUDED.followed " +
		        "WHERE converted.followed >= EXCLUDED.followed";

		    try {
		        String uniqueId = obj.get("unique_id").toString();
		        String followed = obj.get("followed").toString();

		        SimpleDateFormat df = new SimpleDateFormat("MM/dd/yy hh:mm:ss a");

		        Date date = df.parse(followed);

		        Calendar cal = Calendar.getInstance();
		        cal.setTime(date);
		        cal.add(Calendar.MINUTE, -1);

		        String adjustedFollowed = df.format(cal.getTime());

		        try (Connection con = DatabaseConnection.getConnection();
		             PreparedStatement pst = con.prepareStatement(sql)) {

		            pst.setString(1, uniqueId);
		            pst.setString(2, adjustedFollowed);

		            pst.executeUpdate();
		        }

		    } catch (Exception e) {
		        System.err.println("upsertObj error: "
		                + e.getClass().getName() + ": " + e.getMessage());
		    }
		}
	 public static void updateObj(JSONObject obj) {
		 	
		        String query2 = "UPDATE  CONVERTED "+
		        				"SET FOLLOWED=? "+
		        				"WHERE UNIQUE_ID=? AND FOLLOWED>=?";
		        //Connection dbCon = null;
				   try {
				       //DatabaseConnection.getInstance();
					//Class.forName("org.postgresql.Driver");
				       //dbCon=DatabaseConnection.getConnection();//
				       Statement stmt = con.createStatement();
				       PreparedStatement pst = con.prepareStatement(query2);
				       
				       Date date = null;
				       Calendar cal=Calendar.getInstance();
				  	    SimpleDateFormat df = new SimpleDateFormat("MM/dd/yy  hh:mm:ss a");
				  	    try {
				  	    	date = df.parse(obj.get("followed").toString());
				  	    	cal.setTime(date);
				  	    	cal.add(Calendar.MINUTE, -1);
							//System.out.println(cal.getTime());
				  	    } catch (ParseException e) {
				  	        e.printStackTrace();
				  	    }
				  	   // String followed= df.format(date2);
				  	    
				  	   pst.setString(1, df.format(cal.getTime()));
				       pst.setString(2, obj.get("unique_id").toString());
				       pst.setString(3, obj.get("followed").toString());
			           pst.executeUpdate();
			           
				        
			       rs.close();
			       stmt.close();
			      
			 
			    } catch ( Exception e ) {
				         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
				         //System.exit(0);
				      }
		    
		}
	 
	 	public static long getDateDiff(Date date1, Date date2, TimeUnit timeUnit) {
		    long diffInMillies = date2.getTime() - date1.getTime();
		    return timeUnit.convert(diffInMillies,TimeUnit.MILLISECONDS);
		}

		public static String converter(String i) {
			 
		    
		    String  description = null;
		    String converted=null;
		    //Connection dbCon = null;
			   try {
			       //DatabaseConnection.getInstance();
				//Class.forName("org.postgresql.Driver");
			       //dbCon=DatabaseConnection.getConnection();
			       Statement stmt = con.createStatement();
			        rs = stmt.executeQuery("SELECT * FROM TOWNS");
			    
			       while ( rs.next() ) {
			          int id = rs.getInt("id");
			          String  serial_no = rs.getString("serial_no");
			          String  category = rs.getString("category");
			          description = rs.getString("description");
			          if(i.equals(serial_no)) {
			        	  converted=description;
			        	  }
			       }
		       
		       
		       rs.close();
		       stmt.close();
		       
		 
		    } catch ( Exception e ) {
			         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
			         //System.exit(0);
			      }
			      
			   
			return converted;
			}///
		public static  ArrayList<Object> getContacts(String crew) {
			 
		    
		    ArrayList<Object> contacts = new ArrayList<Object>();
		    //Connection dbCon = null;
			   try {
			       //DatabaseConnection.getInstance();
				//Class.forName("org.postgresql.Driver");
			       //dbCon=DatabaseConnection.getConnection();
			       Statement stmt = con.createStatement();
			        rs = stmt.executeQuery("SELECT * FROM CONTACTS WHERE CREW='"+crew+"'");
			    
			       while ( rs.next() ) {
			           String  phone = rs.getString("phone");
			           contacts.add(phone);
			       }
		       
		       
		       rs.close();
		       stmt.close();
		       
		 
		    } catch ( Exception e ) {
			         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
			         //System.exit(0);
			      }
			      
			   

			return contacts;
			}///
		public static void upsertReceiver(JSONObject obj) {

		    String sql =
		        "INSERT INTO receivers (unique_id, crew, phone, time_stamp) " +
		        "VALUES (?, ?, ?, ?) " +
		        "ON CONFLICT (unique_id, phone) DO NOTHING";

		    try {
		        ArrayList<Object> contacts = getContacts(obj.get("assignedto").toString());

		        String uniqueId = obj.get("unique_id").toString();
		        String crew = obj.get("assignedto").toString();

		        SimpleDateFormat df = new SimpleDateFormat("MM/dd/yy hh:mm:ss a");
		        String timeStamp = df.format(new Date());

		        try (Connection con = DatabaseConnection.getConnection();
		             PreparedStatement pst = con.prepareStatement(sql)) {

		            for (Object contact : contacts) {
		                pst.setString(1, uniqueId);
		                pst.setString(2, crew);
		                pst.setString(3, contact.toString());
		                pst.setString(4, timeStamp);

		                pst.addBatch();
		            }

		            pst.executeBatch();
		        }

		    } catch (Exception e) {
		        System.err.println("upsertReceiver error: " 
		            + e.getClass().getName() + ": " + e.getMessage());
		    }
		}
		 public static void upsertReceiver2(JSONObject obj) {
			 
				 String query1 = "INSERT INTO RECEIVERS(unique_id, crew, phone, time_stamp)" + 
			        		"	VALUES (?, ?, ?, ?)";
			
		        //Connection dbCon1 = null;
		        //Connection dbCon2 = null;
		        ArrayList<Object> contacts=getContacts(obj.get("assignedto").toString());
			      
		          try {
				       Class.forName("org.postgresql.Driver");
				       DatabaseConnection.getInstance();
					//dbCon1=DatabaseConnection.getConnection();
				   
				/**/  for (int i=0;i< contacts.size();i++){
					     
				   		
						   //DatabaseConnection.getInstance();
						//dbCon2=DatabaseConnection.getConnection();
					       Statement stmt1 = con2.createStatement();
					       ResultSet rx1 = stmt1.executeQuery( "SELECT COUNT(*) FROM RECEIVERS WHERE UNIQUE_ID='"+obj.get("unique_id").toString()+"'" +" AND PHONE='"+contacts.get(i).toString()+"'"); 
					          while ( rx1.next() ) { 
					        	  int count=rx1.getInt("count");
					        	  //System.out.println(count);
						          if (count==0) {
						        	  	PreparedStatement pst1 = con.prepareStatement(query1);
								        pst1.setString(1, obj.get("unique_id").toString());
							            pst1.setString(2, obj.get("assignedto").toString());
							            pst1.setString(3, contacts.get(i).toString());
							            
							            SimpleDateFormat df = new SimpleDateFormat("MM/dd/yy  hh:mm:ss a");
									    pst1.setString(4, df.format(new Date()).toString());
							            pst1.executeUpdate();
							            pst1.close();
						          }
						        
						         
					          }
					          rx1.close();
					          stmt1.close();
					   	}
				/**/ 
		 	           
				     
				       //dbCon1.close();
				       //dbCon2.close();
				       
			          
		        
			      
			 
			    } catch ( Exception e ) {
				         System.err.println( "Someservlet6-"+e.getClass().getName()+": "+ e.getMessage() );
				         //System.exit(0);
				      }
			}

		@Override
		public void contextInitialized(ServletContextEvent arg0) {
			// TODO Auto-generated method stub
			
		}	


}
