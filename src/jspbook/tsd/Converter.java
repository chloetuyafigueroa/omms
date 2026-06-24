package jspbook.tsd;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.StringTokenizer;



public class Converter  {
	static String url = "jdbc:postgresql://localhost:5432/joblist";
    static String user = "postgres";
    static String password = "03_0431A";//ileco1_amfm//
    


    public static void main(String[] args){
    	Connection c = null;
        Statement stmt = null;
        try {
           Class.forName("org.postgresql.Driver");
           c = DriverManager
              .getConnection(url,
              user, password);
           c.setAutoCommit(false);
           //System.out.println("Opened database successfully");

           stmt = c.createStatement();
           ResultSet rs = stmt.executeQuery( "SELECT * FROM a0119;" );
          
           //insert("tsd.ileco1.omms\\09778200641190202111711190202111711\\*guard miagao s/s\\1020038504586087168397101204301404\\high\\*brown out single phasing\\*\\*\\*cut out in malagyan\\0.0\\0.0\\*fuse trip off (field side)","SAVCJHASCH9778582402");
           /**/while ( rs.next() ) {
              int id = rs.getInt("id");
              String  phone = rs.getString("phone");
              String  message = rs.getString("message");
              insert(message,phone);
              System.out.println(id);
           }/**/
           
           
           rs.close();
           stmt.close();
           c.close();
     
        } catch ( Exception e ) {
    	         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
    	        
    	      }
	   
   }	

   public static void insert(String Msg, String Addrs) {
	    try{
	    StringTokenizer st=new StringTokenizer(Msg,"\\");
	    String filter = st.nextToken();
	    String complete_id = st.nextToken();
	    String unique_id = complete_id.substring(0, 23);
	    String creator = complete_id.substring(0, 11);
	    String created = complete_id.substring(11, 23);
	    String follower = Addrs;//"0"+ Addrs.substring(3,13);
	    String followed = complete_id.substring(23, 35);

	    //Toast.makeText(getBaseContext(),createdDate1,Toast.LENGTH_SHORT).show(); //inserted
	    Date createdDate2 = null;
	    Date followedDate2 = null;
	    SimpleDateFormat df = new SimpleDateFormat("yyMMddHHmmss");
	    try {
	        createdDate2 = df.parse(created);
	        followedDate2 = df.parse(followed);
	    } catch (ParseException e) {
	        e.printStackTrace();
	    }
	    SimpleDateFormat dateFormat= new SimpleDateFormat("MM/dd/yy  h:mm:ss a");
	    created= dateFormat.format(createdDate2);
	    followed= dateFormat.format(followedDate2);
	    
	   //System.out.println("Opened database successfully");
	    
	    
	        String name = st.nextToken();
	            name = name.substring(1, name.length());
	        String spinners = st.nextToken();
	        String town0 = converter(spinners.substring(0, 2));
	        String brgy0= converter(spinners.substring(0, 5));//1
	        String town= converter(String.valueOf(Integer.valueOf(spinners.substring(5, 7))-20));//6
	        String brgy= converter(String.valueOf(Integer.valueOf(spinners.substring(5, 10))-20200));//8
	        String town2= converter(String.valueOf(Integer.valueOf(spinners.substring(10, 12))-40));//7
	        String brgy2= converter(String.valueOf(Integer.valueOf(spinners.substring(10, 15))-40400));//9
	        String assignedto= converter(spinners.substring(15, 18));//12
	        String status= converter(spinners.substring(18, 20));//13
	        String subs= converter(spinners.substring(20, 22));//2
	        String feeder= converter(spinners.substring(20, 25));//3
	        String section= converter(spinners.substring(25, 28));//4
	        //String O= cause_msg(Integer.valueOf(spinners.substring(27, 30)) - 300, type);//10
	        String equip= converter(spinners.substring(31, 34));//5                                                          //4
	        String message= Msg;
	        //String location= "";                                                //11
			String type = st.nextToken();
				
				String typeref= "101";
				if (type.equals("high")){
					typeref= "101";
				}else	if (type.equals("medium")){
					typeref= "102";
				}else	if (type.equals("low")){
					typeref= "103";
				}
	    
	        String cause= converter(typeref + spinners.substring(28, 31));//10
	    String notes = st.nextToken();
	        notes = notes.substring(1, notes.length());
	    String landmark= st.nextToken();    //16
	        landmark = landmark.substring(1, landmark.length());
	    String phone= st.nextToken();
	       phone = phone.substring(1, phone.length());
	           String location= st.nextToken(); //activate if corrected
	        location = location.substring(1, location.length());
	    String latitude= st.nextToken();                                             //15
	    String longitude= st.nextToken();
	    String actiontaken= st.nextToken();    //14
	        actiontaken = actiontaken.substring(1, actiontaken.length());

	 
	        
	       
	        String query2 = "INSERT INTO CONVERSE(unique_id, creator, created, follower, followed, name, spinners, town0, brgy0, town, brgy, town2, brgy2, assignedto, status, subs, feeder, section, cause, equip, type, notes, landmark, phone, location, latitude, longitude, actiontaken)" + 
	        		"	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	        
	        try (Connection con = DriverManager.getConnection(url, user, password);
	             PreparedStatement pst = con.prepareStatement(query2)) {
	            
	            //pst.setInt(1, id);
	            pst.setString(1, unique_id);
	            pst.setString(2, creator);
	            pst.setString(3, created);
	            pst.setString(4, follower);
	            pst.setString(5, followed);
	            pst.setString(6, name);
	            pst.setString(7, spinners);
	            pst.setString(8, town0);
	            pst.setString(9, brgy0);
	            pst.setString(10, town);
	            pst.setString(11, brgy);
	            pst.setString(12, town2);
	            pst.setString(13, brgy2);
	            pst.setString(14, assignedto);
	            pst.setString(15, status);
	            pst.setString(16, subs);
	            pst.setString(17, feeder);
	            pst.setString(18, section);
	            pst.setString(19, cause);
	            pst.setString(20, equip);
	            pst.setString(21, type);
	            pst.setString(22, notes);
	            pst.setString(23, landmark);
	            pst.setString(24, phone);
	            pst.setString(25, location);
	            pst.setString(26, latitude);
	            pst.setString(27, longitude);
	            pst.setString(28, actiontaken);
	            pst.executeUpdate();

	        } catch (SQLException e) {

	        	 System.err.println( e.getClass().getName()+": "+ e.getMessage() );
    	         
	        }
	       
	        
	        
	    }catch (Exception c){return;};
	    
	}

	public static String converter(String i) {
		List<User> userList = new ArrayList<>();
	    Connection c = null;
	    Statement stmt = null;
	    
	    String  description = null;
	    String converted=null;
	    try {
	       Class.forName("org.postgresql.Driver");
	       c = DriverManager
	          .getConnection(url,
	          user, password);
	       c.setAutoCommit(false);
	       //System.out.println("Opened database successfully");

	       stmt = c.createStatement();
	       
	       ResultSet rs = stmt.executeQuery( "SELECT * FROM TOWNS;" );
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
	       c.close();
	 
	    } catch ( Exception e ) {
		         System.err.println("Converter-"+ e.getClass().getName()+": "+ e.getMessage() );
		         //System.exit(0);
		      }
		      
		     // System.out.println("Operation done successfully");

		return converted;}

}