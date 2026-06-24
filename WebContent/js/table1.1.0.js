	        	
   	 		var app=angular.module('firstAPP',[]);
	   	 	
				app.controller('myCtrl1',function($scope,$http,$q,$interval,$timeout,$filter)
				{
					$scope.colours = ['#F1C40F','#72C02C', '#3498DB', '#717984'];
					
					//var dte = Date("2-2-2019");
					//$scope.myDate = dte.getMonth(); 
					$interval(function(){
				
						$scope.myDate = $filter("date")(Date(),"dd-MM-yyyy");
						//var dte= Date();
						//$scope.myDate = dte.getMonth();
					},1000,0,true);// set 0 as default to infinity, 1000=1s
					
								
					
					$scope.users= [ { name: "jo #" },
									{ name: "unique_id" },
									{ name: "creator" },
									{ name: "created"},
									{ name: "follower"},
									{ name: "followed"},
									{ name: "reported by"},
									{ name: "town"},
									{ name: "brgy"},
									{ name: "landmark"},
									{ name: "from-town"},		
									{ name: "from-brgy"},
									{ name: "to-town"},
									{ name: "to-brgy"},
									{ name: "assigned_to"},
									{ name: "status"},		
									{ name: "substation"},
									{ name: "feeder"},
									{ name: "section"},
									{ name: "equipment"},
									{ name: "type"},		
									{ name: "cause/finding/details"},
									{ name: "notes"},									
									{ name: "phone"},
									{ name: "location"},
									{ name: "latitude"},		
									{ name: "longitude"},
									{ name: "team/members"},
									{ name: "other information"} ];
					
						var t=[];
						t.push("Select Month");
						var tempDateObj = new Date();
						var mNow=tempDateObj.getMonth();
						for(h=0;h<12;h++){
							var date = new Date(tempDateObj);  // 2009-11-10
							var month = date.toLocaleString('default', { month: 'long' });
							t.push(month);
							
							if(tempDateObj.getMonth) {
								tempDateObj.setMonth(tempDateObj.getMonth() - 1);
							} else {
								tempDateObj.setYear(tempDateObj.getYear() - 1);
								tempDateObj.setMonth(12);
							}
	
							
						}
						$scope.Date=new Date();
						$scope.Month1= t;
						$scope.Months="1";
						$scope.Monthsx=(new Date()).getDate();
						
						var t1=[];
						t1.push("Day");
						for(d=1;d<=31;d++){
							t1.push(d);
						}
						$scope.Day1= t1;
						$scope.Days= (new Date()).getDate().toString();
						
						
						var tx=[];
						tx.push("Select Year");
						var tempDateObj1 = new Date();
						var year= tempDateObj1.getFullYear()+1;
						for(hx=0;hx<20;hx++){
						
							tx.push(year-hx);
						}
						$scope.Year1= tx;
						$scope.Years=$scope.Year1[2];
						$scope.Period1=['Daily', 'Monthly', 'Yearly'];
						$scope.Period=$scope.Period1[0];
						//var t1 = new Date();
						//$scope.Years= t1.getFullYear();	
							
							
						var x= [];
						$scope.initialize=function (){ 
							$scope.instDate=moment();
							$http.get('Main?uname='+localStorage.getItem("str_name")).then(function mySuccs(response){
								$scope.Creator=JSON.parse(JSON.stringify(response.data))[0].phone;
							})
							$scope.Unique_id=$scope.Creator+$scope.instDate.format("YYMMDDHHmmss");
							$scope.Created=$scope.instDate.format("MM/DD/YY  hh:mm:ss A");
							$scope.Follower=$scope.Creator;
							$scope.Followed1=new Date($scope.instDate);//new $scope.instDate.format("MM/DD/YYYY");
							$scope.Time1=moment().second(0).milliseconds(0).toDate();//new $scope.instDate.format("MM/DD/YYYY");
							$scope.Followed=$scope.instDate.format("MM/DD/YY  hh:mm:ss A");
							$scope.Spinners="1020030400506007008090100200300400";
								
							
							$scope.Name="";
							$scope.Landmark="";
							$scope.Phone="";
							$scope.Notes="";
							$scope.Location="";
							$scope.Gps="0.0","0.0";
							$scope.Lat="0.0";
							$scope.Lon="0.0";
							$scope.ActionTaken="";
							$scope.getType="high";
							//$scope.resultxx=$scope.getType;
							$scope.newType = function(x) {
								return (x.category === 'cause'& (x.serial_no.substr(0,3) === '101'||x.serial_no==="00"));	
							}
							
							$scope.newTown= $scope.test1[0];
							$scope.newBrgys= $scope.test1[1];
							$scope.Towns1= $scope.test1[0];
							$scope.Towns2= $scope.test1[0];
							$scope.Brgys1= $scope.test1[1];
							$scope.Brgys2= $scope.test1[1];
							$scope.Crews1= $scope.test1[2];
							$scope.Status1= $scope.test1[3];
							$scope.Substation= $scope.test1[4];
							$scope.Feeder= $scope.test1[5];
							$scope.Category= $scope.test1[6];
							$scope.Equipment= $scope.test1[7];
							$scope.Cause= $scope.test1[8];
						}
				//$http.get('someservlet1')
						//.then(function mySuccs(response){
							
						$scope.test1 = JSON.parse(localStorage.getItem("dTails"));
						$scope.result111=$filter('filter')($scope.test1,{category:"town"});
						$scope.result110=$filter('filter')($scope.test1,{category:"barangay"});
					
						
						$scope.Towns= $scope.test1[0];
						$scope.Brgys= $scope.test1[1];
						$scope.Crews= $scope.test1[2];
						$scope.Status= $scope.test1[3];
						var f=8 //plus item no.
						if(localStorage.hasOwnProperty('Towns')){
							var Towns=$filter('filter')($scope.test1,function(x){return x.category == 'town'&& x.value==JSON.parse(localStorage.getItem("Towns")).value})
							if(Towns[0].serial_no!="00"){$scope.Towns= $scope.test1[parseFloat(Towns[0].unique_id)+f]};
						}
						if(localStorage.hasOwnProperty('Status')){
							var Status=$filter('filter')($scope.test1,function(x){return x.category == 'status'&& x.value==JSON.parse(localStorage.getItem("Status")).value})
							if(Status[0].serial_no!="00"){$scope.Status= $scope.test1[parseFloat(Status[0].unique_id)+f]};
						}
						$scope.initialize();
				//});	
						
			$scope.checkUncheckAll = function (){ 
									
				if ($scope.checkall) { $scope.checkall = true;
					x= [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
					} else { $scope.checkall = false;
					x= [];
				} 
				angular.forEach($scope.users, function (user){
					user.checked = $scope.checkall;
				}) 
				//alert("response.data");	
				$scope.sortColumn = 'followed';
				$scope.reverseSort = true;
				$scope.sortData = function (columnIndex) {
					$scope.reverseSort = ($scope.sortColumn == $scope.users[columnIndex]) ? !$scope.reverseSort : true;
					$scope.sortColumn = $scope.users[columnIndex];
				}
			}; 
			
			var y0=null;var y1=null;var y2=null;var y3=null;var y4=$scope.Crews.value;var dte=null;										
																			
			$scope.testRun=function (xd,idx){ 
				localStorage.setItem("Towns",JSON.stringify($scope.Towns));
				localStorage.setItem("Status",JSON.stringify($scope.Status));

				$scope.newType = function(x) {
				return (x.category === 'cause'& (x.serial_no.substr(0,3) === $scope.Type||x.serial_no==="00"));	
				}
				$scope.newBrgy = function(x) {
					return (x.category === 'barangay'& (x.serial_no.substr(0,2) === ($scope.newTown.serial_no)||x.serial_no==="00"));	
				}
				$scope.newBrgy1 = function(x) {
					return (x.category === 'barangay'& (x.serial_no.substr(0,2) === ($scope.Towns1.serial_no)||x.serial_no==="00"));	
				}
				$scope.newBrgy2 = function(x) {
					return (x.category === 'barangay'& (x.serial_no.substr(0,2) === ($scope.Towns2.serial_no)||x.serial_no==="00"));	
				}
				$scope.newFeeder = function(x) {
					return (x.category === 'feeder'& (x.serial_no.substr(0,2) === ($scope.Substation.serial_no)||x.serial_no==="00"));	
				}
				
				if(xd==0){y0=$scope.Towns.value;y1=null;$scope.Brgys= $scope.test1[1];}
				if(xd!=0){y0=$scope.Towns.value;y1=$scope.Brgys.value;}
				y4=$scope.Crews.value;
				if(y0=='Select Town'){y0=null}else{y0='"'+y0+'"'}
				if(y1=='Select Brgy' || y1==null){y1=null}else{y1='"'+y1+'"'}
				if(y4=='Select Crew'){y4=null}else{y4='"'+y4+'"'}				
				y2=moment($scope.Date).format('M');
				y3=moment($scope.Date).format('YYYY');
				y5=moment($scope.Date).format('D');
				dte=moment($scope.Date).format('YYYY-MM-D');
				if($scope.Period=='Monthly'){y5="Day";}
				if($scope.Period=='Yearly'){y2="Month";}
				console.log(y2 +','+y5);
				//var sexy21;
				$http.get('/Joblist/iGIS',{params:{table:'converter.get_table0('+y0+','+y1+','+y4+', "'+dte+'",  "'+$scope.Period+'")',where:'true',limit:500}})
				//$http.get('someservlet?x='+y0+'&y='+y1+'&z='+y3+'&z1='+y2+'&z2='+y4+'&z3='+y5)
						.then(function mySuccs(response){
						//console.log('table:'+JSON.stringify(response.data));
							var sexy21 = JSON.parse(JSON.stringify(response.data));
							sexy21 = sexy21.map(obj => reorderKeys(obj, customOrder));
							sexy21 = transformJson(sexy21);
							//console.log('table:'+JSON.stringify(sexy21));
							sexy21.sort(function(a, b) {
							    return parseFloat(moment(a.followed,"MM/DD/YY hh:mm:ss A").unix()) - parseFloat(moment(b.followed,"MM/DD/YY hh:mm:ss A").unix());
							});
							$scope.testy = sexy21;
							
							var hashesFound2 = {};
							
							sexy21.forEach(function(o2){
							    	hashesFound2[o2.unique_id] = o2;
							})
							
							$scope.sexy2x = Object.keys(hashesFound2).map(function(k2){
							    return hashesFound2[k2];
							})
							
							if($scope.Status.value=="Select Status"){	
								$scope.sexy2=$filter('filter')(sexy21,function(x){return x.status==''|| x.status=='Select Status'|| x.status=='STATUS'})
							}
							if($scope.Status.value!="Select Status"){	 
								$scope.sexy2=$filter('filter')(sexy21,{status:$scope.Status.value})
							}
							
						}
				)
				
			}	
			
			const customOrder = ["jo","unique_id","creator","created","follower","followed","name","town0","brgy0","landmark","town","brgy","town2","brgy2","assignedto","status","subs","feeder","section","equip","type","cause","notes","phone","location","latitude","longitude","members","actiontaken"];
			function transformJson(json) {
			  return json.map(item => {
			    // Create a new object by copying properties from the original item
			    let newItem = Object.assign({}, item);
			    
			    // Modify the type property based on its current value
			    newItem.type = item.type === "high" ? "Power Interruption" :
			                   item.type === "medium" ? "O & M" :
			                   "Inspection/Verification";
			    
			    return newItem;
			  });
			}
			function reorderKeys(obj, customOrder) {
			    const orderedObj = {};
			    customOrder.forEach(key => {
			        if (obj.hasOwnProperty(key)) {
			            orderedObj[key] = obj[key];
			        }
			    });
			    // Include any remaining keys not in customOrder
			    Object.keys(obj).forEach(key => {
			        if (!orderedObj.hasOwnProperty(key)) {
			            orderedObj[key] = obj[key];
			        }
			    });
			    return orderedObj;
			}					
											
			$scope.highLighted=function(event){
			  var contents = document.getElementsByClassName("active");
			  for (i = 0; i < contents.length; i++) {
				    contents[i].className = contents[i].className.replace("active", "inactive");
			  }
				var element = angular.element(event.target);
			      //Old Class
			      console.log(element.attr('class'));
			      element.removeClass('inactive').addClass("active");
			      //New Class
			      console.log(element.attr('class'));
			}			
					/////////////modal			
			$scope.selectItem=function(id,jo){ 
				//var i=1;
				console.log(id);
				localStorage.setItem("unique_id",id);
				
				$scope.open();
				//var id=localStorage.getItem("unique_id");
				 $http.get('someservlet6?id='+id)
					.then(function mySuccs(responsex){
						//$scope.resultxx=id;
						var sexy21 = JSON.parse(JSON.stringify(responsex.data));
						
						sexy21.sort(function(b, a) {
						    return parseFloat(moment(a.followed,"MM/DD/YY hh:mm:ss A").unix()) - parseFloat(moment(b.followed,"MM/DD/YY hh:mm:ss A").unix());
						});
						$scope.sexy2a=sexy21;
						//$scope.resultxx=sexy21;
					$scope.Item(0,jo);
						//$scope.Creator=$scope.sexy2[0].creator;
					})
			}
			$scope.showModal=false
			$scope.open = function(){
				$scope.initialize();
				
				if ($scope.showModal==false){$scope.showModal=true}
				else{$scope.showModal=false}
				
			}
			
			
			$scope.Item=function (i,jo){
				$scope.newTown= $scope.test1[0];
				$scope.newBrgys= $scope.test1[1];
				$scope.Towns1= $scope.test1[0];
				$scope.Towns2= $scope.test1[0];
				$scope.Brgys1= $scope.test1[1];
				$scope.Brgys2= $scope.test1[1];
				$scope.Crews1= $scope.test1[2];
				$scope.Status1= $scope.test1[3];
				$scope.Substation= $scope.test1[4];
				$scope.Feeder= $scope.test1[5];
				$scope.Category= $scope.test1[6];
				$scope.Equipment= $scope.test1[7];
				$scope.Cause= $scope.test1[8];
				console.log($scope.test1);
				var f=8 //plus item no.
				
				var newTown=$filter('filter')($scope.test1,function(x){return x.category == 'town'&& x.serial_no ==parseFloat($scope.sexy2a[i].spinners.substr(0,2)).toString()})
				var newBrgys=$filter('filter')($scope.test1,function(x){return x.category == 'barangay'&& x.serial_no ==parseFloat($scope.sexy2a[i].spinners.substr(0,5)).toString()})
				var Towns1=$filter('filter')($scope.test1,function(x){return x.category == 'town'&& x.serial_no ==parseFloat($scope.sexy2a[i].spinners.substr(5,2)-20).toString()})
				var Brgys1=$filter('filter')($scope.test1,function(x){return x.category == 'barangay'&& x.serial_no ==parseFloat($scope.sexy2a[i].spinners.substr(5,5)-20200).toString()})
				var Towns2=$filter('filter')($scope.test1,function(x){return x.category == 'town'&& x.serial_no ==parseFloat($scope.sexy2a[i].spinners.substr(10,2)-40).toString()})
				var Brgys2=$filter('filter')($scope.test1,function(x){return x.category == 'barangay'&& x.serial_no ==parseFloat($scope.sexy2a[i].spinners.substr(10,5)-40400).toString()})
				var Crews1=$filter('filter')($scope.test1,function(x){return x.category == 'crew'&& x.serial_no ==parseFloat($scope.sexy2a[i].spinners.substr(15,3)).toString()})
				var Status1=$filter('filter')($scope.test1,function(x){return x.category == 'status'&& x.serial_no ==parseFloat($scope.sexy2a[i].spinners.substr(18,2)).toString()})
				var Substation=$filter('filter')($scope.test1,function(x){return x.category == 'substation'&& x.serial_no ==parseFloat($scope.sexy2a[i].spinners.substr(20,2)).toString()})
				var Feeder=$filter('filter')($scope.test1,function(x){return x.category == 'feeder'&& x.serial_no ==parseFloat($scope.sexy2a[i].spinners.substr(20,5)).toString()})
				var Category=$filter('filter')($scope.test1,function(x){return x.category == 'category'&& x.serial_no ==parseFloat($scope.sexy2a[i].spinners.substr(25,3)).toString()})
				var Equipment=$filter('filter')($scope.test1,function(x){return x.category == 'equipment'&& x.serial_no ==parseFloat($scope.sexy2a[i].spinners.substr(31,3)).toString()})
				
				//$scope.resultxx=$scope.sexy2[i].status;
				$scope.Creator=$scope.sexy2a[i].creator;
				var Type="101";if($scope.sexy2a[i].type.toString()=="medium"){Type="102"};if($scope.sexy2a[i].type.toString()=="low"){Type="103"}
				$scope.Type=Type;
				var Cause=$filter('filter')($scope.test1,function(x){return x.category == 'cause'&& x.serial_no ==Type+parseFloat($scope.sexy2a[i].spinners.substr(28,3)).toString()})
			
				$scope.getType=$scope.sexy2a[i].type.toString();
				$scope.newType = function(x) {
					return (x.category === 'cause'& (x.serial_no.substr(0,3) === $scope.Type||x.serial_no==="00"));	
				}
				
				if(Cause!=""){$scope.Cause= $scope.test1[parseFloat(Cause[0].unique_id)+f]};
				
				console.log($scope.sexy2a[i]);
				$scope.Unique_id=$scope.sexy2a[i].unique_id;
				$scope.Jo=jo;
				$scope.Members=$scope.sexy2a[i].members;
				$scope.Created=$scope.sexy2a[i].created;
				$scope.Follower=$scope.sexy2a[i].follower;;
				$scope.Followed1=moment($scope.sexy2a[i].followed,"MM/DD/YY hh:mm:ss A").toDate();
				$scope.Time1=moment($scope.sexy2a[i].followed,"MM/DD/YY hh:mmh:mm:ss A").second(0).milliseconds(0).toDate();//new $scope.instDate.format("MM/DD/YYYY");
				//$scope.Time1="06:33 AM";
				$scope.Followed=$scope.sexy2a[i].followed;
				//$scope.resultxx=moment($scope.Followed1,"MM/DD/YYYY").format("MM/DD/YY HH:mm A");
				//$scope.resultxx=moment($scope.sexy2[i].followed,"MM/DD/YY hh:mm A").format("hh:mm A");
				$scope.Name=$scope.sexy2a[i].name;
				$scope.Landmark=$scope.sexy2a[i].landmark;
				$scope.Phone=$scope.sexy2a[i].phone;
				$scope.Notes=$scope.sexy2a[i].notes;
				$scope.Location=$scope.sexy2a[i].location;
				$scope.Gps=$scope.markerLat+ ","+$scope.markerLng;
				if(!$scope.markerStat){
					$scope.Gps=$scope.sexy2a[i].latitude+","+$scope.sexy2a[i].longitude;
				}
				$scope.markerStat=false;
				$scope.Lat=$scope.sexy2a[i].latitude;
				$scope.Lon=$scope.sexy2a[i].longitude;
				//$scope.Lat=$scope.markerLat;
				//$scope.Lon=$scope.markerLng;
				$scope.ActionTaken=$scope.sexy2a[i].actiontaken;
				
				//localStorage.setItem("unique_id",$scope.Unique_id);
				//localStorage.setItem("gps_lat",$scope.Lat);
				//localStorage.setItem("gps_lon",$scope.Lon);
				
				if(newTown[0]!=null){$scope.newTown= $scope.test1[parseFloat(newTown[0].unique_id)+f]};
				if(newBrgys[0]!=null){$scope.newBrgys= $scope.test1[parseFloat(newBrgys[0].unique_id)+f]};
				if(Towns1[0]!=null){$scope.Towns1= $scope.test1[parseFloat(Towns1[0].unique_id)+f]};
				if(Brgys1[0]!=null){$scope.Brgys1= $scope.test1[parseFloat(Brgys1[0].unique_id)+f]};
				if(Towns2[0]!=null){$scope.Towns2= $scope.test1[parseFloat(Towns2[0].unique_id)+f]};
				if(Brgys2[0]!=null){$scope.Brgys2= $scope.test1[parseFloat(Brgys2[0].unique_id)+f]};
				if(Crews1[0]!=null){$scope.Crews1= $scope.test1[parseFloat(Crews1[0].unique_id)+f]};
				if(Status1[0]!=null){$scope.Status1= $scope.test1[parseFloat(Status1[0].unique_id)+f]};
				if(Substation[0]!=null){$scope.Substation= $scope.test1[parseFloat(Substation[0].unique_id)+f]};
				if(Feeder[0]!=null){$scope.Feeder= $scope.test1[parseFloat(Feeder[0].unique_id)+f]};
				if(Category[0]!=null){$scope.Category= $scope.test1[parseFloat(Category[0].unique_id)+f]};
				if(Equipment[0]!=null){$scope.Equipment= $scope.test1[parseFloat(Equipment[0].unique_id)+f]};		
						
			}
			$scope.gpsChange=function(id){
				$scope.itemChange(id);
				/**/
				$scope.result112=$filter('filter')($scope.result110,$scope.newBrgys);
				if ($scope.newTown.value!="Select Town"){
                	 $scope.Lat= parseFloat($filter('filter')($scope.result111,{value:$scope.newTown.value})[0].lat);
                	 $scope.Lon= parseFloat($filter('filter')($scope.result111,{value:$scope.newTown.value})[0].lon);
                  }
                if ($scope.newBrgys.value!="Select Brgy"){
                	 $scope.Lat= parseFloat($filter('filter')($scope.result112,{value:$scope.newBrgys.value})[0].lat);
                	 $scope.Lon= parseFloat($filter('filter')($scope.result112,{value:$scope.newBrgys.value})[0].lon);
                  }
				$scope.Gps=$scope.Lat+","+$scope.Lon;
				/**/
			}	
			$scope.itemChange=function (id){ 
				//$scope.resultxx=$scope.getType;
			
				if(id==1){$scope.newBrgys= $scope.test1[1];}
				if(id==2){$scope.Cause= $scope.test1[8];}
				if(id==3){$scope.Feeder= $scope.test1[5];}
				if(id==4){$scope.Brgys1= $scope.test1[1];}
				if(id==5){$scope.Brgys2= $scope.test1[1];}
				var _newTown=$scope.newTown.serial_no;if($scope.newTown.serial_no=="00"){_newTown="10"}
				var _newBrgys=$scope.newBrgys.serial_no;if($scope.newBrgys.serial_no=="00"){_newBrgys=_newTown+"200"}
				var _Towns1=$scope.Towns1.serial_no;if($scope.Towns1.serial_no=="00"){_Towns1="10"}
				var _Brgys1=$scope.Brgys1.serial_no;if($scope.Brgys1.serial_no=="00"){_Brgys1=_Towns1+"200"}
					_Brgys1=parseFloat(_Brgys1)+20200;
				var _Towns2=$scope.Towns2.serial_no;if($scope.Towns2.serial_no=="00"){_Towns2="10"}
				var _Brgys2=$scope.Brgys2.serial_no;if($scope.Brgys2.serial_no=="00"){_Brgys2=_Towns2+"200"}
					_Brgys2=parseFloat(_Brgys2)+40400;
				var _Crews1=$scope.Crews1.serial_no;if($scope.Crews1.serial_no=="00"){_Crews1="700"}
				var _Status1=$scope.Status1.serial_no;if($scope.Status1.serial_no=="00"){_Status1="80"}
				var _Substation=$scope.Substation.serial_no;if($scope.Substation.serial_no=="00"){_Substation="90"}
				var _Feeder=$scope.Feeder.serial_no;if($scope.Feeder.serial_no=="00"){_Feeder=_Substation+"100"}
				var _Category=$scope.Category.serial_no;if($scope.Category.serial_no=="00"){_Category="200"}
				var _Cause=$scope.Cause.serial_no.substr(3,3);if($scope.Cause.serial_no=="00"){_Cause="300"}
				var _Equipment=$scope.Equipment.serial_no;if($scope.Equipment.serial_no=="00"){_Equipment="400"}
				var Type="101" ;if($scope.getType=="medium"){Type="102"};if($scope.getType=="low"){Type="103"}
				$scope.Type=Type;
				
				$scope.Followed=moment($scope.Followed1).format("MM/DD/YY")+"  "+moment($scope.Time1).format("hh:mm:ss A");
				$http.get('Main?uname='+localStorage.getItem("str_name")).then(function mySuccs(response){
					$scope.Follower=JSON.parse(JSON.stringify(response.data))[0].phone;
				})
				 	
				
		 		$scope.Spinners=_newBrgys+_Brgys1+_Brgys2+_Crews1+_Status1+_Feeder+_Category+_Cause+_Equipment;
		 	//$scope.resultxx=moment($scope.Followed1).format("MM/DD/YY");
				$scope.Spinners = (_newBrgys || (_newTown || "10")+"200") + (_Brgys1 || (_Towns1|| "10")+"200") + (_Brgys2 || (_Towns2|| "10")+"200") + 
      							  (_Crews1 || "700") + (_Status1 || "80") + (_Feeder || (_Substation || "90")+"100") + 
      							  (_Category || "200") + (_Cause || "300") + (_Equipment || "400");
				console.log($scope.Spinners);
			//$scope.resultxx=$scope.Spinners;
			}
			var t=0;
			$scope.Hist=function (x){
				if(x==0){t=t+1}
				if(x==1){t=t-1}
				if(t<0){t=0}
				if(t>=$scope.sexy2a.length){t=$scope.sexy2a.length-1}
				//$scope.resultxx=$scope.sexy2.length+"-"+t;
				$scope.Item(t,$scope.Jo);
				
			}
			$scope.postRun=function (){ 
				$scope.itemChange(0);
				$http.post('someservlet6',{"unique_id":localStorage.getItem("unique_id"),"creator":$scope.Creator,"created":$scope.Created,
					"follower":$scope.Follower,"followed":$scope.Followed,"name":$scope.Name,"spinners":$scope.Spinners,
					"town0":$scope.newTown.value,"brgy0":$scope.newBrgys.value,"town":$scope.Towns1.value,"brgy":$scope.Brgys1.value,
					"town2":$scope.Towns2.value,"brgy2":$scope.Brgys2.value,"assignedto":$scope.Crews1.value,
					"status":$scope.Status1.value,"subs":$scope.Substation.value,"feeder":$scope.Feeder.value,
					"section":$scope.Category.value,"equip":$scope.Equipment.value,"type":$scope.getType,
					"cause":$scope.Cause.value,"notes":$scope.Notes,"landmark":$scope.Landmark,
					"phone":$scope.Phone,"location":$scope.Location,"latitude":$scope.Lat,"longitude":$scope.Lon,"actiontaken":$scope.ActionTaken})
				.then(function mySuccs(response){
					$scope.open();
					$scope.testRun(0,0);
				})
				
			}
			$scope.deLete=function (){ 
				$scope.Status1={
			    "unique_id": "120",
			    "serial_no": "82",
			    "category": "status",
			    "value": "Cancelled",
			    "$$hashKey": "object:5"
				}
			$scope.itemChange(0);
				
				$http.post('someservlet7?action=delete',{"unique_id":localStorage.getItem("unique_id"),"spinners":$scope.Spinners})
				.then(function mySuccs(response){
					$scope.open();
					$scope.testRun(0,0);
				})
				
			}
/////////////modal
							
												
						var y= 0;
						
						$scope.updateCheckall = function($index,stat){ 
						
						var userTotal = $scope.users.length; var count = 0; 
							angular.forEach($scope.users, function (item) { 
								if(item.checked){ 
								count++; 
								y=$index;} 
							});

						if(stat==true){x.push(y)}
						else{if(x.indexOf($index) >-1 ){x.splice(x.indexOf($index),1)}};
						
						
						if(userTotal == count){
						$scope.checkall = true}
						else{$scope.checkall = false}
					};
					
					$scope.IsVisible = function(index2){
						if (x.indexOf(index2) > -1){ 
							return true;}
						else{return false;
						}
						
					};
					
					$scope.hideAll = function(){
						$scope.hide=true;					
					};

					$scope.showAll = function(){
						$scope.hide=false;					
					};

					//$scope.selectItem = function(id){
						//var popup="scvvsvv";
						//popup.classList.toggle('show');
						//alert(id)
                        //};
                    
								
					$scope.myBrgy = function(x) {
						//$scope.Brgys=null;
					return (x.category === 'barangay'& (x.serial_no.substr(0,2) === ($scope.Towns.serial_no)||x.serial_no==="00"));	
					
					}	
					
					$scope.myCrew = function(x) {
						//$scope.Brgys=null;
					return (x.category === 'crew');	
					}
					const box = document.getElementById('modals');
				
				    let isDragging = false;
				    let offsetX, offsetY;
				
				    box.addEventListener('mousedown', (e) => {
				        isDragging = true;
				        offsetX = e.clientX - box.getBoundingClientRect().left;
				        offsetY = e.clientY - box.getBoundingClientRect().top;
				        box.classList.add('dragging');
				    });
				
				    document.addEventListener('mousemove', (e) => {
				        if (!isDragging) return;
				
				        const x = e.clientX - offsetX;
				        const y = e.clientY - offsetY;
				
				        box.style.left = `${x}px`;
				        box.style.top = `${y}px`;
				    });
				
				    document.addEventListener('mouseup', () => {
				        isDragging = false;
				        box.classList.remove('dragging');
				    });
				 					
					$scope.navMap=function(){						
						parent.document.getElementById("map").click();
						parent.document.getElementById('Map').contentWindow.updatedata(
							[$scope.Followed1,$scope.Lat,$scope.Lon,$scope.Status1,$scope.newTown,$scope.newBrgys, $scope.Crews1]);
						parent.document.getElementById('Map').contentWindow.updateAsPlan();  
					}
					$scope.navMap=function(){
						console.log($scope.Lat);				
						parent.document.getElementById("map").click();
						parent.document.getElementById('Map').contentWindow.updatedata(
							[$scope.Followed1,$scope.Lat,$scope.Lon,$scope.Status1,$scope.newTown,$scope.newBrgys, $scope.Crews1]);
						parent.document.getElementById('Map').contentWindow.updateAsPlan();  
					}
					window.updatedata = function(data) {
			          	$scope.$apply(function(){
							if(data!=null){$scope.Date= data;}		            
							if(moment($scope.Date).format("YYYY-MM-DD")==moment(new Date()).format("YYYY-MM-DD")){$scope.testRun(0,0)}
							//$scope.checkall=true;
							//$scope.checkUncheckAll();
							console.log(data);
					     });
	        		};
					
			});
				
   	 	
    	           
				
			
					   

		              	
		             	        
		       