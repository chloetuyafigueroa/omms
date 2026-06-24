package jspbook.tsd;

import java.io.Serializable;  
import javax.xml.bind.annotation.XmlElement; 
import javax.xml.bind.annotation.XmlRootElement; 
@XmlRootElement(name = "user") 

public class User3 implements Serializable {  
   private static final long serialVersionUID = 1L;  
   private String unique_id;
  
   private String created;

   private String followed;
   private String hour;

   private String town0;
   private String brgy0;
   private String crew;
   private String status;
                                              //4                                           //11
   private String type;
   private String cause;
   private String lat;                                            //15
   private String lng;
   
   private String name;
   private String notes;
   private String actiontaken;
   private String section;
   private String equip;
  
   public User3(){} 
    
   public User3(String unique_id, String created,
		  String followed,String hour,String town0,String brgy0,
		  String crew,String status,
		   String type,String cause,
		   String lat,String lng,
		   String name,String notes,
		   String actiontaken,String section,String equip){  
	   
	   this.unique_id= unique_id;
	   this.created= created;
	   this.followed= followed;
	   this.followed= hour;
	   this.town0= town0;
	   this.brgy0= brgy0;
	   this.crew= crew;
	   this.status= status;
	   this.type= type;
	   this.cause= cause;
	   this.lat= lat;
	   this.lng= lng;
	   this.name= name;
	   this.section= section;
	   this.equip= equip;
	   this.notes= notes;
	   this.actiontaken= actiontaken;
	
   }  
   public String getID() { return unique_id; } @XmlElement public void setID(String unique_id) {this.unique_id = unique_id;} 
   public String getCreated() { return created; } @XmlElement public void setCreated(String created) {this.created =created;}
   public String getFollowed() { return followed; } @XmlElement public void setFollowed(String followed) {this.followed =followed;}
   public String getHour() { return hour; } @XmlElement public void setHour(String hour) {this.hour =hour;}
   public String getTown0() { return town0; } @XmlElement public void setTown0(String town0) {this.town0 =town0;}
   public String getBrgy0() { return brgy0; } @XmlElement public void setBrgy0(String brgy0) {this.brgy0 =brgy0;}
   public String getCrew() { return crew; } @XmlElement public void setCrew(String crew) {this.crew =crew;}   
   public String getStatus() { return status; } @XmlElement public void setStatus(String status) {this.status =status;}
   public String getType() { return type; } @XmlElement public void setType(String type) {this.type =type;}
   public String getCause() { return cause; } @XmlElement public void setCause(String cause) {this.cause =cause;}
   public String getLatitude() { return lat; } @XmlElement public void setLatitude(String lat) {this.lat =lat;}
   public String getLongitude() { return lng; } @XmlElement public void setLongitude(String lng) {this.lng =lng;}
   public String getName() { return name; } @XmlElement public void setName(String name) {this.name =name;}
   public String getSection() { return section; } @XmlElement public void setSection(String section) {this.section =section;}
   public String getEquip() { return equip; } @XmlElement public void setEquip(String equip) {this.equip =equip;}
   public String getNotes() { return notes; } @XmlElement public void setNotes(String notes) {this.notes =notes;}
   public String getActiontaken() { return actiontaken; } @XmlElement public void setActiontaken(String actiontaken) {this.actiontaken =actiontaken;}

  
   
} 