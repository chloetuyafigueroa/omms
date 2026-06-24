//function OpenURI(address, type){
  var address="jamog, tigbuan, iloilo";
  var type="json"
  var uri = "http://nominatim.openstreetmap.org/search?q=";
  var format = "%26format=" + type; 
  var details = "%26addressdetails=1";
  //address = FormatAddress(address);
  // NOTE: &'s dont pass good to php file_get_contents($uri) dont use "&polygon=1&addressdetails=1";
  if(type == "xml"){
    uri = uri + address + "%26format=" + type + "%26addressdetails=1";
  } else { // default to json
    uri = uri + address + "%26format=" + "json" + "%26addressdetails=1";
  } 
  //return uri; 
//}