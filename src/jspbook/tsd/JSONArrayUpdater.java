package jspbook.tsd;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Comparator;
import java.util.Map;

public class JSONArrayUpdater {
    public static void main(String[] args) {
        // Original JSON data
        String jsonData = "[{\"id\":1,\"type\":\"a\",\"item\":100},{\"id\":2,\"type\":\"a\",\"item\":101},{\"id\":1,\"type\":\"b\",\"item\":102}]";
        String newItemJson = "{\"id\":1,\"type\":\"a\",\"item\":103}";
        upsertGPS(new JSONArray(jsonData),new JSONObject(newItemJson));
    
    }
    public static JSONArray upsertGPS(JSONArray jsonArray,JSONObject newItem) {
    	// Update IDs of existing items with the same type
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject item = jsonArray.getJSONObject(i);
            if (item.getString("type").equals(newItem.getString("type")) && item.getInt("id") >= newItem.getInt("id")) {
                item.put("id", item.getInt("id") + 1);            }
        }

       newItem.put("id", 1);

        // Insert the new item at the beginning of the array
        JSONArray updatedArray = new JSONArray();
        updatedArray.put(newItem);
        for (int i = 0; i < jsonArray.length(); i++) {
            updatedArray.put(jsonArray.getJSONObject(i));
        }

        // Sort items by ID
        JSONArray sortedArray = new JSONArray();
        updatedArray.toList().stream()
            .map(obj -> new JSONObject((Map<?, ?>) obj))
            .sorted(Comparator.comparingInt(o -> o.getInt("id")))
            .forEach(sortedArray::put);

        // Output the result
        System.out.println(sortedArray.toString());
    	
    	return sortedArray;
    }
}
