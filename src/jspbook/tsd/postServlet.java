package jspbook.tsd;

import java.util.Arrays;

import org.json.JSONArray;





public class postServlet {
		static String checkCodeSuffix = "160D";
	  	static String endChar = "68";
	    static String filler = "FEFEFEFE";
	    static String serialSuffix = "AA";
	    static String startChar = "68"; 
	    JSONArray aj;
	    
	    //static String string3 = reverseSerial("800963457");
	    //static String string4 = checkCode(startChar + string3 + serialSuffix + endChar + "110433343535");
	    
	public static void main(String args[]) {
		
	     //String xxx= filler + starxrtChar + string3 + serialSuffix + endChar + "110433343535" + string4 + checkCodeSuffix;
	     //readCurrent("800963457");  
	     //readEnergy("800963457");
	     //sendEnergyCommand("800963457");
	     //toHexString(sendEnergyCommand("800963457"), 21);
	     //SerialPortEvent.sendCurrent(sendCurrentCommand("800963457"));
	     SerialPortEvent.sendData(sendEnergyCommand("800963457"));
	     //SerialPortEvent.sendData(toHexString(sendEnergyCommand("800963457"), 21));
	    // SerialPortEvent.readData();
	     //System.out.println(sendEnergyCommand("800963457"));
	    /** try {
	    	 
			SerialHandler.getSerialPort();
			
		} catch (InvalidParameterException | SecurityException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}**/
	} 
	
	
	
	
	public static String readCurrent(String string2) {
	        String string3 = postServlet.reverseSerial(string2);
	        String string4 = checkCode(startChar + string3 + serialSuffix + endChar + "110433343535");
	 	    return filler + startChar + string3 + serialSuffix + endChar + "110433343535" + string4 + checkCodeSuffix;
		       
	}
	 private static String readEnergy(String string2) {
	        String string3 = postServlet.reverseSerial(string2);
	        String string4 = checkCode(startChar + string3 + serialSuffix + endChar + "110433323333");
	        System.out.println(filler + startChar + string3 + serialSuffix + endChar + "110433323333" + string4 + checkCodeSuffix );
	        return filler + startChar + string3 + serialSuffix + endChar + "110433323333" + string4 + checkCodeSuffix;
	        //return "FE FE FE FE 68 57 34 96 00 08 AA 68 11 04 33 32 33 33 83 16 0D";
	        
	        //return "FEFEFEFE685734960008AA6811043332333383160D";
	 }
    public static String reverseSerial(String string2) {
        if (!string2.startsWith("0")) {
            string2 = "0" + string2;
        }
        int n = -2 + string2.length();
        String string3 = "";
        for (int i = 0; i <= -1 + string2.length() / 2; ++i) {
            string3 = string3 + string2.substring(n, n + 2);
            n -= 2;
        }
        return string3;
    }
   
    public static String checkCode(String string2) {
    	
        int n = 0;
        int n2 = 0;
        System.out.println(string2);
       for (int i = 0; i <= -1 + string2.length() / 2; ++i) {
        	n =n+ Integer.parseInt((String)string2.substring(n2 , n2 + 2), (int)16);
        	
            if (n >= 256) {
            	n=n- 256;
            }
            n2= n2+2;
           
        }
        /**/
        String string3 = Integer.toHexString((int)n).toUpperCase();
        if (string3.length() == 1) {
            string3 = "0" + string3;
        }
        System.out.println(string3);
        return string3;
    }
    
    public static String toHexString(byte[] arrby, int n) {
        if (arrby == null || arrby.length < 1) {
            throw new IllegalArgumentException("this byteArray must not be null or empty");
        }
        StringBuilder stringBuilder = new StringBuilder(n * 2);
        for (int i = 0; i < n; ++i) {
            if ((255 & arrby[i]) < 16) {
                stringBuilder.append("0");
            }
            stringBuilder.append(Integer.toHexString((int)(255 & arrby[i])));
            if (i == -1 + arrby.length) continue;
            stringBuilder.append(" ");
        }
        return stringBuilder.toString().toUpperCase();
    }
    public static byte[] sendCurrentCommand(String string2) {
        return postServlet.hexStringToByteArray(postServlet.readCurrent(string2));
    }
    public static byte[] sendEnergyCommand(String string2) {
    	System.out.println((readEnergy(string2)));
        //return hexStringToByteArray(postServlet.readEnergy(string2));
        return hexStringToByteArray(postServlet.readEnergy(string2));
    }
    private static byte[] hexStringToByteArray(String string2) {
        int n = string2.length();
       // System.out.println(string2);
        byte[] arrby = new byte[n / 2];
        for (int i = 0; i < n; i += 2) {
            arrby[i / 2] = (byte)((Character.digit((char)string2.charAt(i), (int)16) << 4) + Character.digit((char)string2.charAt(i + 1), (int)16));
        }
        //ystem.out.println(toHexString(arrby, 21).split(" "));
        StringBuilder sb = new StringBuilder();
        for (byte b : arrby) {
            sb.append(String.format("%02X ", b));
        }
        System.out.println(sb);
        
        System.out.println(Arrays.toString(arrby));
        System.out.println("arrby:"+arrby);
        /**String[] arr = { };
        for (int i = 0; i < arrby.length; i++) {
            arr[i] = String.format("%02x", arrby[i]);
        }**/
        //System.out.println(java.util.Arrays.toString(arr));
        //return arrby;
        return arrby;
    }
 }