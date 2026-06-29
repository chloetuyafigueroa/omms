package jspbook.tsd;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.AndroidConfig;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.TopicManagementResponse;

import okhttp3.*;


@SuppressWarnings("unused")
@WebServlet("/FCMServlet/*")
public class FCMServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    public void init() throws ServletException {
        super.init();
        //String relativePath = "/google-services.json";
        //String absolutePath = getServletContext().getRealPath(relativePath);
        initializeFirebase();
    }
    @SuppressWarnings("deprecation")
    public static void initializeFirebase() {
        if (!FirebaseApp.getApps().isEmpty()) {
            return;
        }

        try {
            String firebaseJson = System.getenv("FIREBASE_SERVICE_ACCOUNT_JSON");

            if (firebaseJson == null || firebaseJson.trim().isEmpty()) {
                throw new RuntimeException("FIREBASE_SERVICE_ACCOUNT_JSON is not set");
            }

            GoogleCredentials credentials = GoogleCredentials.fromStream(
                new ByteArrayInputStream(firebaseJson.getBytes(StandardCharsets.UTF_8))
            );

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(credentials)
                    .setDatabaseUrl("https://omms-cdce8.firebaseio.com")
                    .build();

            FirebaseApp.initializeApp(options);

        } catch (IOException e) {
            throw new RuntimeException("Failed to initialize Firebase", e);
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    	String command = req.getParameter("command");
         if (command.equals("gps")) {
        	 Map<String, String> data = new HashMap<>();
        	 data.put("command", "gps");
        	 data.put("distance", req.getParameter("distance"));
             data.put("time",req.getParameter("time"));
             data.put("monitor_time", req.getParameter("monitor_time"));
             System.out.println(data);
             String response=sendFCMGPS(Boolean.valueOf(req.getParameter("online")),req.getParameter("topic"),data);
             
             resp.setContentType("text/html;charset=UTF-8");
             resp.getWriter().write(response);
        }
         if (command.equals("phone")) {
 	    	String phone=req.getParameter("value");
 	    	System.out.println(phone);
 	    	String OTP=OTPGenerator.generateOTP();
 	    	System.out.println("OTP No.:"+OTP);
 	    	try {
				testSendRequest(phone,OTP);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
 	    	resp.getWriter().write(OTP);	   	 	
 	      }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        StringBuilder sb = new StringBuilder();
	    String line;
	    while ((line = request.getReader().readLine()) != null) {
	        sb.append(line);
	    }
	    JSONArray jArr=new JSONArray(sb.toString());
		JSONObject msg= new JSONObject(jArr.getJSONObject(0).toString());
		if (msg.has("topic")) {
            String topic = msg.getString("topic");
            new Thread(() -> {
				FCMAsyncTasks.notifyResponse(topic,"success");				      
	        }).start();
        } else {
            // Handle the case where the "topic" key is missing
            System.out.println("Topic key is missing");
        }				
		
		
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().write("success");
    }

    public static void main(String[] args) throws IOException {
        // This method is mainly for testing purposes
        //FCMServlet servlet = new FCMServlet();
        //servlet.initializeFirebase();
        //String absolutePath = "WebContent/google-services.json";
        initializeFirebase();
        Map<String, String> data = new HashMap<>();
        data.put("title", "FCM");
        data.put("body", "This is a custom notification body.");

        sendNotification("omms", data);
    }

    public static void sendNotification(String topic, Map<String, String> data) {
        Message message = Message.builder()
        		.setTopic("online_"+topic)
                .putAllData(data)
                .setAndroidConfig(AndroidConfig.builder()
                        .setPriority(AndroidConfig.Priority.HIGH)
                        .build())
                .build();

        try {
            String response = FirebaseMessaging.getInstance().send(message);
            System.out.println("Successfully sent message: " + response);
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
        }
    }
    public String sendFCMGPS(boolean online,String topic,Map data) throws IOException, ServletException {                
        	
            String topicon = topic;
            if(online) {topicon="online_"+topic;}
            Message message = Message.builder()
                    //.setCondition(condition)
                    .setTopic(topicon)
                    .putAllData(data)
                    .setAndroidConfig(AndroidConfig.builder()
                            .setPriority(AndroidConfig.Priority.NORMAL) // NORMAL priority to avoid sound or vibration
                            .build())
                    .build();

            try {
                String response = FirebaseMessaging.getInstance().send(message);
                System.out.println("Successfully sent message: " + response);
                return response;
            } catch (FirebaseMessagingException e) {
            	 e.printStackTrace();
            	 return "Failed!";
            }
           
      }
     public void testSendRequest(String phone,String message) throws Exception {
    	 OkHttpClient client = new OkHttpClient();

         // Define the URL to send the POST request to
         String url = "http://localhost:8080/Joblist/FCMServlet";
    	 RequestBody requestBody = new FormBody.Builder()
    			 	.add("command", "sms")
    	            .add("phone",phone)
    	            .add("message", message)
    	            .build();

    	        // Create the POST request
    	        Request request = new Request.Builder()
    	            .url(url)
    	            .post(requestBody)
    	            .build();

    	        // Execute the request and handle the response
    	        client.newCall(request).enqueue(new Callback() {
    	            @Override
    	            public void onFailure(Call call, IOException e) {
    	                e.printStackTrace();
    	            }

    	            @Override
    	            public void onResponse(Call call, Response response) throws IOException {
    	                if (!response.isSuccessful()) {
    	                    throw new IOException("Unexpected code " + response);
    	                }

    	                // Print the response body
    	                System.out.println("Response Code: " + response.code());
    	                System.out.println("Response Body: " + response.body().string());
    	            }
    	        });
    }
    
}

