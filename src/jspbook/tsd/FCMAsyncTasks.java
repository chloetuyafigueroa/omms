package jspbook.tsd;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletException;

import org.json.JSONObject;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class FCMAsyncTasks {

    private static ConcurrentHashMap<String, CompletableFuture<String>> responseMap = new ConcurrentHashMap<>();
    static String jsonString = "{\"title\":\"FCM\", \"body\":\"This is a custom notification body.\"}";
    static JSONObject jObb= new JSONObject(jsonString);
    public static String message="omms\\09778572405230630093941230630093955\\*ecf_chloe\\1120130400506007018090100200300400\\high\\*\\*\\*\\*\\10.85926957\\122.3694992\\*";
    public static String phone="09778562402";
    static String sp="COM4";
    public static void main(String[] args) throws IllegalAccessException, InterruptedException,  IOException, ServletException {
    	ruN("omms",jObb,runnable);
    	
    }
    public static void ruN2() {ruN("omms",jObb,runnable);}
	public static void ruN(String topic,JSONObject data,Runnable function) {
    	//data=jObb;
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, String> map = new HashMap<>();
		 
        try {
        	Map<String, Object> tempMap = objectMapper.readValue(data.toString(), new TypeReference<Map<String, Object>>() {});
            for (Map.Entry<String, Object> entry : tempMap.entrySet()) {
                map.put(entry.getKey(), entry.getValue() == null ? "" : entry.getValue().toString());
            }
            System.out.println("map:"+map);
        } catch (IOException e) {
            e.printStackTrace();
        }
    	CompletableFuture<String> fcmNotification = sendFCMNotification(topic,map);

    	 CompletableFuture<Void> task1 = fcmNotification
                 .thenCompose(notId -> waitForAndroidResponse(notId))
                 .handle((response, throwable) -> {
                     if (throwable != null) {
                         // Timeout or other exception occurred
                         System.out.println("Timeout occurred, proceeding with the fallback task...");
                         implementFallbackTask(function);
                     } else {
                         // Response received within time limit
                         System.out.println("Response received, proceeding with the third task...");
                         //implementThirdTask();
                     }
                     return null;
                 });/**/
    	 /**  .thenCompose(response -> {
             // Step 3: Implement the third task if successfully received
             System.out.println("Response received, proceeding with the third task...");
             return implementThirdTask();
         });/**/

         // Simulate the reception of the response for demonstration
         /**fcmNotification.thenAccept(notId -> {
             new Thread(() -> notifyResponse(notId, "success")).start();
         });/**/

        // Wait for all tasks to complete
        task1.join();
    }
    private static CompletableFuture<Void> implementThirdTask() {
        // Implementation of the third task
    	return CompletableFuture.runAsync(() -> System.out.println("Third task executed"));
    }

    private static void implementFallbackTask(Runnable function) {
        // Implementation of the fallback task
    	function.run();
        System.out.println("Fallback task executed");
    }
    public static CompletableFuture<String> sendFCMNotification(String topic,Map<String, String> map) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                runFCM(topic,map);
            } catch (IOException | ServletException e) {
                e.printStackTrace();
            } // Simulate delay
            return map.get("unique_id"); // Return notification ID
        });
    }

    public static CompletableFuture<String> waitForAndroidResponse(String notificationId) {
        System.out.println("Waiting for response for notificationId: " + notificationId);
        CompletableFuture<String> responseFuture = new CompletableFuture<>();
        responseMap.put(notificationId, responseFuture);
        return responseFuture;
    }

    public static void notifyResponse(String notificationId, String response) {
        System.out.println("notificationId: " + notificationId);
        CompletableFuture<String> responseFuture = responseMap.get(notificationId);
        if (responseFuture != null) {
            responseFuture.complete(response);
            System.out.println("Response received for notificationId: " + notificationId + ", response: " + response);
        }
    }

    
    public static Runnable runnable = new Runnable() {
        @Override
        public void run() {
            System.out.println("Hello from the Runnable!");
        }
    };
    
    public static void runFCM(String topic,Map<String, String> map) throws IOException, ServletException {
    	FCMServlet servlet = new FCMServlet();
        //servlet.initializeFirebase();
        String absolutePath = "WebContent/google-services.json";
        servlet.initializeFirebase(absolutePath);
        
        FCMServlet.sendNotification(topic, map);
    }
    
}
