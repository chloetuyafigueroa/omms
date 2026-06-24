package jspbook.tsd;

import java.io.IOException;
import java.sql.CallableStatement;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
//import java.util.logging.Level;
//import java.util.logging.Logger;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.JsonObject;



//@WebServlet("/Main/*")

public class Main extends HttpServlet implements ServletContextListener {
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
private static final long serialVersionUID = 1L;
public static String uid;
private static String pwd;

Connection dbCon;
  //DataSource ds;
  HttpSession session;
  String dbURL = someservlet.dbURL;
  public static ResultSet rs =null;
	//private static final long serialVersionUID = 1L;
	//public static String dbURL = "jdbc:postgresql:joblist?user=postgres&password=03_0431A"; //ileco1_amfm

  /* Initialize servlet. Use JNDI to look up a DataSource */
  public static void main(String[] args) throws IOException, ClassNotFoundException, SQLException {
	  postStrMsg("msg");
    }
	  
  public void init() {
	
	  ScheduledThreadPoolExecutor executor=new ScheduledThreadPoolExecutor(2);
  	  executor.scheduleAtFixedRate(new Runnable() {
  		  public void run() {
  			  			
  			  			try {
  			  			    //terminate_idle();
							postStrMsg("msg");
						} catch (ClassNotFoundException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						} catch (SQLException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						} catch (JSONException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
  			  		    System.out.println("From OMMS");
  						//System.out.println(us.getAllUsers().get(0).getMessage());		  						
  						
  			  	}
  		  
  		  } , 1, 30, TimeUnit.SECONDS);
  }

  public void doPost (HttpServletRequest _req, HttpServletResponse _res)
    throws ServletException, IOException {
	    
		  
	    /* Refresh session attributes */
	    session = _req.getSession();
	    session.removeAttribute("loginError");
	    session.removeAttribute("submitError");
	
	    String action = _req.getParameter("action");
	    //Storage storage = getStorage(); 
	    //System.out.println(action);    
	    
	    
	    // Authenticate user if request comes from login page
	    if (action.equals("login")) {
	    	 	uid = _req.getParameter("UID");
	    	    pwd = _req.getParameter("PWD");
	      if (authenticate(uid, pwd)) {
	        session.setAttribute("validUser", "y");
	        session.setAttribute("loginError", "n");
	        session.setAttribute("uid", uid);
	
	      _res.setContentType("text/html;charset=UTF-8");
	  	  
	 	  _res.getWriter().write(uid);
	 	   // System.out.println(uid);
	        gotoPage("/Nav.html", _req, _res);
	        }
	       else {
	        loginError(_req, _res);
	      }
	    }
	
	     else if (action.equals("logout")) {
	       
	       	 	gotoPage("/login.html", _req, _res);
	      }
	   
	    else if (action.equals("report")) {
	
	   	 	gotoPage("/test21.html", _req, _res);
	      }
	    
    
    }

    /* Send request to a different page */
    private void gotoPage(String _page, HttpServletRequest _req, HttpServletResponse _res)
      throws IOException, ServletException {

      RequestDispatcher dispatcher = _req.getRequestDispatcher(_page);
      if (dispatcher != null) {
         dispatcher.forward(_req, _res);}
      if (dispatcher != null) {
    	  System.out.println(_page);}
      
    }

    /* Set error attributes in session and return to Login page */
    private void loginError(HttpServletRequest _req, HttpServletResponse _res)
      throws IOException, ServletException {

      session.setAttribute("validUser", "n");
      session.setAttribute("loginError", "y");
      gotoPage("/login.html", _req, _res);

    }

    /* Check if the user is valid */
    private boolean authenticate(String _uid, String _pwd) {
    	System.out.println("tedgfhf");
	    
  	    Connection dbCon = null;
  	    ResultSet rs = null;
  	    //Connection c = null;
  	    //String dbURL = "jdbc:postgresql:joblist?user=postgres&password=03_0431A";
  	    try {
  	       //Class.forName("org.postgresql.Driver");
  	       //System.out.println("Opened database successfully");
  	       //dbCon = DriverManager.getConnection(dbURL);
  	       dbCon=DatabaseConnection.getInstance().getConnection();
  	  
  	      Statement s = dbCon.createStatement();
  	      rs = s.executeQuery("select * from users where id = '"
  	              + _uid + "' and pwd = '" + _pwd + "'");
  	      return (rs.next());
  	    }
      catch (java.sql.SQLException e) {
        System.out.println("A problem occurred while accessing the database.");
        System.out.println(e.toString());
      }
      
      return false;

    }

    /* Using the CustomerBean, record the data */
    public boolean recordSurvey(HttpServletRequest _req) {

     //dbCon = DriverManager.getConnection(dbURL);
	dbCon=DatabaseConnection.getInstance().getConnection();
	CustomerBean cBean = new CustomerBean();
	cBean.populateFromParms(_req);
	return cBean.submit(dbCon);
      
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	  
		String uname=request.getParameter("uname");
    	List<User4> uSEr = getUser(uname);
    	String json = new Gson().toJson(uSEr);
	    
	    response.setContentType("text/html;charset=UTF-8");
	    response.getWriter().write(json);
	    System.out.println(json);
	}
    
  
    public List<User4> getUser(String uname){ 
	  	
	    List<User4> user_data = new ArrayList<>();
	    //List<> userList = new Gson().fromJSON(jsonPerson, new TypeToken<List<Person>>() {}getType());
	    Connection dbCon = null;
	    try {
	       dbCon=DatabaseConnection.getInstance().getConnection();
	       Statement stmt = dbCon.createStatement();
	       
	       rs = stmt.executeQuery( "SELECT * FROM USERS WHERE ID='"+uname+"'"); //
	       while ( rs.next() ) {
		          String id = rs.getString("id");
		          String phone =  rs.getString("phone");
		          String role =  rs.getString("role");
		          
		
		        User4 p1 = new User4();
		  		p1.setID(id);
		  		p1.setPassword("****");
		  		p1.setPhone(phone);
		  		p1.setRole(role);
		  		user_data.add(p1);
		       }
	    
	       rs.close();
	       stmt.close();
	       //dbCon.close();
	     
	 
	    } catch ( Exception e ) {
		         System.err.println( "User.Main-"+e.getClass().getName()+": "+ e.getMessage() );
		         System.exit(0);
		      }
		return user_data;
		      
		      
 }  
  
    public static void postStrMsg(String msgx)  throws SQLException, ClassNotFoundException {
    	// System.out.println("successhljlkjllkk");
    /**/Date start = new Date(System.currentTimeMillis());
    	Calendar cal=Calendar.getInstance();
    	cal.setTime(start);
		cal.add(Calendar.DATE, 1);
    	SimpleDateFormat dateNow= new SimpleDateFormat("yyyy-MM-dd");
    	String startNow= dateNow.format(start).toString();
    	String endNow= dateNow.format(cal.getTime()).toString();
    	//System.out.println("SELECT DISTINCT ON (UNIQUE_ID) * FROM CONVERTED WHERE CAST(followed AS DATE) BETWEEN '"+startNow+"' AND '"+endNow+"' ORDER BY UNIQUE_ID, FOLLOWED DESC");/**/
		  
	    
    	String query1 = "INSERT INTO SMS2(phone,message) VALUES(?, ?)";
	 
        Connection dbCon1 = null;
        Connection dbCon2 = null;
          
          try {
        	   //Class.forName("org.postgresql.Driver"); 
        	   dbCon1=DatabaseConnection.getInstance().getConnection();
		       Statement stmt1 = dbCon1.createStatement();
		       
		     
		       ResultSet rx1 = stmt1.executeQuery("SELECT DISTINCT ON (UNIQUE_ID) *,followed::TIMESTAMP WITHOUT TIME ZONE followed1 FROM CONVERTED WHERE CAST(followed AS DATE) BETWEEN '"+startNow+"' AND '"+endNow+"' ORDER BY UNIQUE_ID, FOLLOWED DESC"); //
		       //SELECT * FROM CONVERTED WHERE CAST(followed AS DATE) BETWEEN '2020-5-1' AND '2020-5-31' ORDER 
		       
		       while ( rx1.next() ) {
			          //Integer id = 1;
			        		
			  		Date date1 = rx1.getTimestamp("followed1");
			  	    /**SimpleDateFormat df = new SimpleDateFormat("MM/dd/yy  h:mm:ss a");
			  	    try {
			  	    	date1 = df.parse(rx1.getString("followed"));
			  	    } catch (ParseException e) {
			  	        e.printStackTrace();
			  	    }/**/
			  	    SimpleDateFormat dateFormat= new SimpleDateFormat("yyMMddHHmmss");
			  	    String followed= dateFormat.format(date1);
			  	    String follower= rx1.getString("follower");
			  	    
			  	    Date now = new Date(System.currentTimeMillis());
			  	  	//System.out.println("Date Difference:"+getDateDiff(now,date1,TimeUnit.MINUTES));
				    if(getDateDiff(now,date1,TimeUnit.MINUTES)==5) {
				  		
				  		 StringBuilder buf = new StringBuilder("omms\\");
				  		  buf.append(rx1.getString("unique_id")).append(followed).append("\\");            //followed
				          buf.append("*").append(rx1.getString("name")).append("\\");
				          buf.append(rx1.getString("spinners")).append("\\");
				          buf.append(rx1.getString("type")).append("\\");
				          buf.append("*").append(rx1.getString("notes")).append("\\");
				          buf.append("*").append(rx1.getString("landmark")).append("\\");
				          buf.append("*").append(rx1.getString("phone")).append("\\");
				          buf.append("*").append(rx1.getString("location")).append("\\");
				          buf.append(rx1.getString("latitude")).append("\\");
				          buf.append(rx1.getString("longitude")).append("\\");
				          buf.append("*").append(rx1.getString("actiontaken"));
				          
				          dbCon2=DatabaseConnection.getInstance().getConnection();	
				          Statement stmt2 = dbCon2.createStatement();
				          PreparedStatement pst1 = dbCon2.prepareStatement(query1);
				          
				          Runnable runnable = new Runnable() {
				         
				              @Override
				              public void run() {
				            	  
							      try {
									
									  ResultSet rx2 = stmt2.executeQuery( "SELECT  * FROM RECEIVERS WHERE UNIQUE_ID='"+rx1.getString("unique_id")+"'"); //
									  while ( rx2.next() ) {
										  try {				              	
									    	  
									    	  //pst1.setInt(1, id);
									          pst1.setString(1, rx2.getString("phone"));
									          pst1.setString(2, buf.toString());
									          pst1.executeUpdate(); //DONT FORGET THIS ONE
									          pst1.close();
										  } catch ( Exception e ) {
									         System.err.println( "Main2-"+e.getClass().getName()+": "+ e.getMessage() );
									         //System.exit(0);
									      }
									  }
									  rx2.close();
								} catch (SQLException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}
				              }
				          };

						  stmt2.close();
				          FCMAsyncTasks.ruN("omms",new JSONObject(),runnable);
				          
				          //dbCon2.close();
						     
				    }
			   }
		    
		       rx1.close();
		       stmt1.close();
		       //dbCon1.close();
		       
		    } catch ( Exception e ) {
		         //System.err.println( "Main-"+e.getClass().getName()+": "+ e.getMessage() );
		         //System.exit(0);
		      }
        
 	       
       
    }
   
    public void terminate_idle() throws JSONException, IllegalAccessException, ClassNotFoundException, SQLException {
    	   Connection con = null;
        	Class.forName("org.postgresql.Driver");
        	 con = DriverManager.getConnection(dbURL);
        	 //con=DatabaseConnection.getInstance().getConnection();
        	CallableStatement stmt = con.prepareCall("{call _aaaterminate_idle()}");
        	stmt.execute();
        	
         
    }
	public static long getDateDiff(Date date1, Date date2, TimeUnit timeUnit) {
	    long diffInMillies = date2.getTime() - date1.getTime();
	    return timeUnit.convert(diffInMillies,TimeUnit.MILLISECONDS);
	}
    
    public void destroy() {}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

  

  

}
