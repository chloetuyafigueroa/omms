package jspbook.tsd;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class MainClass {
	
	public static void main(String[] args) 
	{ 
		  JSONArray seclines = new JSONArray();
		  JSONObject secID = new JSONObject();
		  secID.put("id", "test");
		  seclines.put(secID);
		  //seclines.remove(0);
		  secID.put("id", "lg");
		  seclines.put(secID);
		  System.out.println(SearchIndex(seclines,"lg"));
		  System.out.println(seclines);
	}
	public static Integer SearchIndex(JSONArray array, String searchValue){
	    int filtedArray =0;
	   for (int i = 0; i < array.length(); i++) {
	        JSONObject obj= null;

	        try {
	            obj = array.getJSONObject(i);
	            //System.out.print("SNF:"+obj.getString("id")+":"+searchValue+":");
	            //filtedArray =true;
	            if(obj.getString("id").equals(searchValue))
	            {
	                filtedArray=i;
	            }
	            //System.out.println(filtedArray);
	        } catch (JSONException e) {
	            e.printStackTrace();
	        }
	    }

	    return filtedArray;
	}
}

