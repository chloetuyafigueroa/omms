package jspbook.tsd;

import java.io.Serializable;  
import javax.xml.bind.annotation.XmlElement; 
import javax.xml.bind.annotation.XmlRootElement; 
@XmlRootElement(name = "user") 

public class User implements Serializable {  
   private static final long serialVersionUID = 1L;  
   private String jo;
   private String unique_id;
   private String creator;
   private String created;
   private String follower;
   private String followed;
   private String name;
   private String spinners;
   private String town0;
   private String brgy0;
   private String town;
   private String brgy;
   private String town2;
   private String brgy2;
   private String assignedto;
   private String status;
   private String subs;
   private String feeder;
   private String section;
   private String equip;                                              //4                                           //11
   private String type;
   private String cause;
   private String notes;
   private String landmark;
   private String phone;
   private String location;
   private String latitude;                                            //15
   private String longitude;
   private String actiontaken;
   private String members;
   public User(){} 
    
   public User(String jo,String unique_id, String creator,String created,
		   String follower,String followed,String name,
		   String spinners,String town0,String brgy0,
		   String town,String brgy,String town2,
		   String brgy2,String assignedto,String status,
		   String subs,String feeder,String	 section,
		   String equip,String type,String cause,
		   String notes,String landmark,String phone,String location,
		   String latitude,String longitude,String actiontaken,String members){  
	   
	   this.jo= jo;
	   this.unique_id= unique_id;
	   this.creator= creator;
	   this.created= created;
	   this.follower= follower;
	   this.followed= followed;
	   this.name= name;
	   this.spinners= spinners;
	   this.town0= town0;
	   this.brgy0= brgy0;
	   this.town= town;
	   this.brgy= brgy;
	   this.town2= town2;
	   this.brgy2= brgy2;
	   this.assignedto= assignedto;
	   this.status= status;
	   this.subs= subs;
	   this.feeder= feeder;
	   this.section= section;
	   this.equip= equip;
	   this.type= type;
	   this.cause= cause;
	   this.notes= notes;
	   this.landmark= landmark;
	   this.phone= phone;
	   this.location= location;
	   this.latitude= latitude;
	   this.longitude= longitude;
	   this.actiontaken= actiontaken;
	   this.members= members;

   } 
   public String getJO() { return jo; } @XmlElement public void setJO(String jo) {this.jo = jo;} 
   public String getID() { return unique_id; } @XmlElement public void setID(String unique_id) {this.unique_id = unique_id;} 
   public String getCreator() { return creator; } @XmlElement public void setCreator(String creator) {this.creator =creator;}
   public String getCreated() { return created; } @XmlElement public void setCreated(String created) {this.created =created;}
   public String getFollower() { return follower; } @XmlElement public void setFollower(String follower) {this.follower =follower;}
   public String getFollowed() { return followed; } @XmlElement public void setFollowed(String followed) {this.followed =followed;}
   public String getName() { return name; } @XmlElement public void setName(String name) {this.name =name;}
   public String getSpinners() { return spinners; } @XmlElement public void setSpinners(String spinners) {this.spinners =spinners;}
   public String getTown0() { return town0; } @XmlElement public void setTown0(String town0) {this.town0 =town0;}
   public String getBrgy0() { return brgy0; } @XmlElement public void setBrgy0(String brgy0) {this.brgy0 =brgy0;}
   public String getTown() { return town; } @XmlElement public void setTown(String town) {this.town =town;}
   public String getBrgy() { return brgy; } @XmlElement public void setBrgy(String brgy) {this.brgy =brgy;}
   public String getTown2() { return town2; } @XmlElement public void setTown2(String town2) {this.town2 =town2;}
   public String getBrgy2() { return brgy2; } @XmlElement public void setBrgy2(String brgy2) {this.brgy2 =brgy2;}
   public String getAssignedto() { return assignedto; } @XmlElement public void setAssignedto(String assignedto) {this.assignedto =assignedto;}
   public String getStatus() { return status; } @XmlElement public void setStatus(String status) {this.status =status;}
   public String getSubs() { return subs; } @XmlElement public void setSubs(String subs) {this.subs =subs;}
   public String getFeeder() { return feeder; } @XmlElement public void setFeeder(String feeder) {this.feeder =feeder;}
   public String getSection() { return section; } @XmlElement public void setSection(String section) {this.section =section;}
   public String getEquip() { return equip; } @XmlElement public void setEquip(String equip) {this.equip =equip;}
   public String getType() { return type; } @XmlElement public void setType(String type) {this.type =type;}
   public String getCause() { return cause; } @XmlElement public void setCause(String cause) {this.cause =cause;}
   public String getNotes() { return notes; } @XmlElement public void setNotes(String notes) {this.notes =notes;}
   public String getLandmark() { return landmark; } @XmlElement public void setLandmark(String landmark) {this.landmark =landmark;}
   public String getPhone() { return phone; } @XmlElement public void setPhone(String phone) {this.phone =phone;}
   public String getLocation() { return location; } @XmlElement public void setLocation(String location) {this.location =location;}
   public String getLatitude() { return latitude; } @XmlElement public void setLatitude(String latitude) {this.latitude =latitude;}
   public String getLongitude() { return longitude; } @XmlElement public void setLongitude(String longitude) {this.longitude =longitude;}
   public String getActiontaken() { return actiontaken; } @XmlElement public void setActiontaken(String actiontaken) {this.actiontaken =actiontaken;}
   public String getMembers() { return actiontaken; } @XmlElement public void setMembers(String members) {this.members =members;}

  
   
} 