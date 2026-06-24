package jspbook.tsd;

import java.io.Serializable;  
import javax.xml.bind.annotation.XmlElement; 
import javax.xml.bind.annotation.XmlRootElement; 
@XmlRootElement(name = "user") 

public class User_contacts implements Serializable {  
   private static final long serialVersionUID = 1L; 
   private String name;
   private String crew;
   private String phone; 
   private Boolean status; 
   private String lat;  
   private String lon; 
   public User_contacts(){} 
    
   public User_contacts(String name, String crew, String phone, Boolean status, String lat, String lon){  
      this.name = name; 
      this.crew = crew;
      this.phone = phone; 
      this.status = status; 
      this.lat = lat;
      this.lon = lon; 
   }  
   public String getName() { 
      return name; 
   }  
   @XmlElement 
   public void setName(String name) { 
      this.name = name; 
   } 
   public String getCrew() { 
      return crew; 
   } 
   @XmlElement
   public void setCrew(String crew) { 
      this.crew = crew; 
   } 
   public String getPhone() { 
	      return phone; 
	   } 
   @XmlElement
   public void setPhone(String phone) { 
      this.phone = phone; 
   }
 
   public Boolean getStatus() { 
      return status; 
   } 
   @XmlElement 
   public void setStatus(Boolean status) { 
      this.status = status; 
   } 
   public String getLat() { 
	      return lat; 
	   } 
	@XmlElement
	public void setLat(String lat) { 
	   this.lat = lat; 
	}
	 public String getLon() { 
	      return lon; 
	   } 
	@XmlElement
	public void setLon(String lon) { 
	   this.lon = lon; 
	}
} 