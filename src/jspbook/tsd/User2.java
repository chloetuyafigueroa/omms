package jspbook.tsd;

import java.io.Serializable;  
import javax.xml.bind.annotation.XmlElement; 
import javax.xml.bind.annotation.XmlRootElement; 
@XmlRootElement(name = "user") 

public class User2 implements Serializable {  
   private static final long serialVersionUID = 1L;  
   private String unique_id;
   private String serial_no;
   private String category;
   private String value;
   private String lat;
   private String lon;
   
   public User2(){} 
    
   public User2(String unique_id, String serial_no,String category,String value,String lat,String lon){  
	   
	   this.unique_id= unique_id;
	   this.serial_no= serial_no;
	   this.category= category;
	   this.value= value;
	   this.lat= lat;
	   this.lon= lon;

   }  
   public String getID() { return unique_id; } @XmlElement public void setID(String unique_id) {this.unique_id = unique_id;} 
   public String getSerial() { return serial_no; } @XmlElement public void setSerial(String serial_no) {this.serial_no =serial_no;}
   public String getCategory() { return category; } @XmlElement public void setCategory(String category) {this.category =category;}
   public String getValue() { return value; } @XmlElement public void setValue(String value) {this.value =value;}
   public String getLat() { return lat; } @XmlElement public void setLat(String lat) {this.lat =lat;}
   public String getLon() { return lon; } @XmlElement public void setLon(String lon) {this.lon =lon;}
   
  
   
} 