	        
		
   	 		var app=angular.module('firstAPP',['ngPatternRestrict','gridster']);
   	 			app.config(function ($provide) {
		   	 		$provide.decorator('$exceptionHandler', function ($delegate) {
		   	 	
			   	 			return function (exception, cause) {
			   	 				//$log.debug("Modified exception handler");
			   	 				//$http.post("/api/clientExceptionLogge",exception);
			   	 				$delegate(exception, cause);
			   	 				alert(exception+"-"+cause);
			   	 			};
		   	 		});
		   	 		
		   	 	});
	   	 		app.directive('bufferedScroll', function ($parse) {
	   	 	    return function ($scope, element, attrs) {
	   	 	      var handler = $parse(attrs.bufferedScroll);
	   	 	      element.scroll(function (evt) {
	   	 	        var scrollTop    = element[0].scrollTop,
	   	 	            scrollHeight = element[0].scrollHeight,
	   	 	            offsetHeight = element[0].offsetHeight;
	   	 	        if (scrollTop === (scrollHeight - offsetHeight)) {
	   	 	          $scope.$apply(function () {
	   	 	            handler($scope);
	   	 	          });
	   	 	        }
	   	 	      });
	   	 	    };
	   	 	  });
	   	 		
	   	 		
				app.controller('myCtrl1',function($scope,$http,$q,$filter)
				{
								
					 $scope.increaseLimit = function () {
						    if ($scope.limit < $scope.items.length) {
						      $scope.limit += 8;
						    }
						  };
						  
					$scope.contacts_column= [ "NAME",
									"CREW",
									"PHONE"];		
					
					$scope.users= [ "BACK-LOGS",
									"SUN",
									"MON",
									"TUE",
									"WED",
									"THU",
									"FRI",
									"SAT"];
					
					
					$scope.daters= [moment().subtract(moment().day(),'day').add(-7,'day').format('MM/DD/YY')+"-"+moment().subtract(moment().day(),'day').add(-1,'day').format('MM/DD/YY'),
									moment().subtract(moment().day(),'day').add(0,'day').format('MM/DD/YYYY'),
									moment().subtract(moment().day(),'day').add(1,'day').format('MM/DD/YYYY'),
									moment().subtract(moment().day(),'day').add(2,'day').format('MM/DD/YYYY'),
									moment().subtract(moment().day(),'day').add(3,'day').format('MM/DD/YYYY'),
									moment().subtract(moment().day(),'day').add(4,'day').format('MM/DD/YYYY'),
									moment().subtract(moment().day(),'day').add(5,'day').format('MM/DD/YYYY'),
									moment().subtract(moment().day(),'day').add(6,'day').format('MM/DD/YYYY')];
					
						
						
						
						
						
						var t=[];
						
						var month=moment("01-20","MM-YY").format("MMMM");
						for(h=0;h<12;h++){
							t.push(month);
							month=moment(month,"MMMM").add(1,"month").format("MMMM");
						}
						
						$scope.Month1= t;
						$scope.Months=moment().month();
						$scope.Monthsx=(new Date()).getDate();
						
						var t1=[];
						t1.push("Week");
						for(d=1;d<=53;d++){
							t1.push("wk-"+d);
						}
						$scope.Date=new Date();
						$scope.Week1= t1;
						$scope.Weeks= moment().weekday(1).format("YYYY-MM-DD");
						$scope.Week_s=moment().weekday(1).week().toString();
						$scope.WeekLog=moment().weekday(1).format("YYYY-MM-DD");
					
						
					
						//$scope.resultxx=localStorage.getItem("str_name");
						
						
						$scope.startDate=moment().weekday(1).subtract(moment().day(),'day').add(-1,'day').format("YYYY-MM-DD");
						$scope.endDate=moment().weekday(1).subtract(moment().day(),'day').add(5,'day').format("YYYY-MM-DD");
						$scope.startLog=moment().weekday(1).subtract(moment().day(),'day').add(-8,'day').format("YYYY-MM-DD");
						$scope.endLog=moment().weekday(1).subtract(moment().day(),'day').add(-2,'day').format("YYYY-MM-DD");
						
						var tx=[];
						//var tempDateObj1 = new Date();
						//var year= tempDateObj1.getFullYear();
						var year= 2018;
						for(hx=0;hx<20;hx++){
						
							tx.push(year+hx);
						}
						$scope.Year1= tx;
						$scope.Years=new Date().getFullYear();
						//var t1 = new Date();
						//$scope.Years= t1.getFullYear();
						
						
						$scope.initialize=function (){ 							
							
							$scope.instDate=moment();
							$http.get('Main?uname='+localStorage.getItem("str_name")).then(function mySuccs(response){
								$scope.Creator=JSON.parse(JSON.stringify(response.data))[0].phone;
							})
							$scope.Unique_id=$scope.Creator+$scope.instDate.format("YYMMDDHHmmss");
							$scope.Jo=$scope.instDate.format("YYMMDD")+'...';
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
						$scope.test1 = JSON.parse(localStorage.getItem("dTails"));
						$scope.result111=$filter('filter')($scope.test1,{category:"town"});
						$scope.result110=$filter('filter')($scope.test1,{category:"barangay"});
						
						$scope.Towns= $scope.test1[0];
						$scope.Brgys= $scope.test1[1];
						$scope.Crews= $scope.test1[2];
						$scope.Contact_Crew= $scope.test1[2];
						//if(localStorage.getItem("Towns").value!=null){
						var f=8 //plus item no.
						if(localStorage.hasOwnProperty('Towns')){
							var Towns=$filter('filter')($scope.test1,function(x){return x.category == 'town'&& x.value==JSON.parse(localStorage.getItem("Towns")).value})
							if(Towns[0].serial_no!="00"){$scope.Towns= $scope.test1[parseFloat(Towns[0].unique_id)+f]};
							console.log(JSON.parse(localStorage.getItem("Towns")).value);
							console.log(Towns);
							console.log(Towns[0].serial_no);
							console.log($scope.Towns);
						}
						
						
						$scope.initialize(); /**/
						var t=0;
						$scope.Hist=function (x){
							if(x==0){t=t+1}
							if(x==1){t=t-1}
							if(t<0){t=0}
							if(t>=$scope.sexy2.length){t=$scope.sexy2.length-1}
							//$scope.resultxx=$scope.sexy2.length+"-"+t;
							$scope.Item(t,$scope.Jo);
							
						}
						$scope.postRun=function (){ 
							$scope.itemChange(0);
							console.log($scope.Phone);
							$http.post('someservlet6',{"jo":$scope.Jo && $scope.Jo.includes('.') ? null : $scope.Jo,"unique_id":$scope.Unique_id,"creator":$scope.Creator,"created":$scope.Created,
								"follower":$scope.Follower,"followed":$scope.Followed,"name":$scope.Name,"spinners":$scope.Spinners,
								"town0":$scope.newTown.value,"brgy0":$scope.newBrgys.value,"town":$scope.Towns1.value,"brgy":$scope.Brgys1.value,
								"town2":$scope.Towns2.value,"brgy2":$scope.Brgys2.value,"assignedto":$scope.Crews1.value,
								"status":$scope.Status1.value,"subs":$scope.Substation.value,"feeder":$scope.Feeder.value,
								"section":$scope.Category.value,"equip":$scope.Equipment.value,"type":$scope.getType,
								"cause":$scope.Cause.value,"notes":$scope.Notes,"landmark":$scope.Landmark,
								"phone":$scope.Phone,"location":$scope.Location,"latitude":$scope.Lat,"longitude":$scope.Lon,"actiontaken":$scope.ActionTaken})
							.then(function mySuccs(response){
								//$scope.open();
								$scope.testRun(0,0);
							})
							$scope.open();
							
						}
						$scope.save_contact=function (){ 
							if($scope.Contact_Name!=null){
								$http.post('Contacts?action=upsert',{"name":$scope.Contact_Name,"crew":$scope.Contact_Crew.value,"phone":$scope.Contact_Phone})
								.then(function mySuccs(response){
									$http.get('Contacts').then(function mySuccs(response){
										var contactx=JSON.parse(JSON.stringify(response.data));
										$scope.Contact_JSON=contactx;
										if($scope.Contact_Crew.value!='Select Crew'){
										$scope.Contact_JSON=$filter('filter')(contactx,function(x){return x.crew == $scope.Contact_Crew.value})
										//$scope.Contact_JSON=JSON.parse(JSON.stringify(response.data));
										}
									})
								})
							}
							
						}
						$scope.filterCrew=function (){ 
							$http.get('Contacts').then(function mySuccs(response){
								var contactx=JSON.parse(JSON.stringify(response.data));
								$scope.Contact_JSON=contactx;
								if($scope.Contact_Crew.value!='Select Crew'){
								$scope.Contact_JSON=$filter('filter')(contactx,function(x){return x.crew == $scope.Contact_Crew.value})
								//$scope.Contact_JSON=JSON.parse(JSON.stringify(response.data));
								}
							})
							
						}
						//$scope.makeTableScroll=function (){ 
							var maxRows = 10;

				            var table = document.getElementById('myTable');
				            var wrapper = table.parentNode;
				            var rowsInTable = table.rows.length;
				            var height = 0;
				            if (rowsInTable > maxRows) {
				                for (var i = 0; i < maxRows; i++) {
				                    height += table.rows[i].clientHeight;
				                }
				                wrapper.style.height = height + "px";
				            }
				     	//}
						
						$scope.selectContact=function (x,y){ 
							$http.get('Contacts?name='+x+'&crew='+y).then(function mySuccs(response){
								var selected=JSON.parse(JSON.stringify(response.data));
								$scope.Contact_Name=selected[0].name;
								var Contact_Crew=$filter('filter')($scope.test1,function(x){return x.category == 'crew'&& x.value ==selected[0].crew})
								//$scope.resultxx=Contact_Crew;
								if(Contact_Crew!=""){$scope.Contact_Crew= $scope.test1[parseFloat(Contact_Crew[0].unique_id)+8]};
								$scope.Contact_Phone=selected[0].phone;
							})
						}
						$scope.delete_contact=function (){ 
							if($scope.Contact_Name!=null){
								$http.post('Contacts?action=delete',{"name":$scope.Contact_Name,"crew":$scope.Contact_Crew.value})
								.then(function mySuccs(response){
									$http.get('Contacts').then(function mySuccs(response){
										var contactx=JSON.parse(JSON.stringify(response.data));
										$scope.Contact_JSON=contactx;
										if($scope.Contact_Crew.value!='Select Crew'){
										$scope.Contact_JSON=$filter('filter')(contactx,function(x){return x.crew == $scope.Contact_Crew.value})
										//$scope.Contact_JSON=JSON.parse(JSON.stringify(response.data));
										}
									})
								})
							}
							
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
						//////MODAL
					
						$scope.showModal=false
						$scope.open = function(){
							$scope.initialize();
							
							if ($scope.showModal==false){$scope.showModal=true}
							else{$scope.showModal=false}
							
						}
						
						$http.get('Contacts').then(function mySuccs(response){
							$scope.Contact_JSON=JSON.parse(JSON.stringify(response.data));
						})
						$scope.showContacts=false
						$scope.open2 = function(){
							if ($scope.showContacts==false){$scope.showContacts=true}
							else{$scope.showContacts=false}
						
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
							$scope.newType = function(x) {
								return (x.category === 'cause'& (x.serial_no.substr(0,3) === $scope.Type||x.serial_no==="00"));	
							}
							//$scope.resultxx=moment($scope.Followed1).format("MM/DD/YY");
							$scope.Spinners = (_newBrgys || (_newTown || "10")+"200") + (_Brgys1 || (_Towns1|| "10")+"200") + (_Brgys2 || (_Towns2|| "10")+"200") + 
                  							  (_Crews1 || "700") + (_Status1 || "80") + (_Feeder || (_Substation || "70")+"100") + 
                  							  (_Category || "200") + (_Cause || "300") + (_Equipment || "400");

					 		//$scope.Spinners=_newBrgys+_Brgys1+_Brgys2+_Crews1+_Status1+_Feeder+_Category+_Cause+_Equipment;
					 		console.log($scope.Spinners);
						}
						
					
						//var modal = document.getElementById ('modals'); 
						 window.onclick = function(event) { 
							 //$scope.resultxx=event;
							 if (event.target == $scope.showModal) 
					        { $scope.showModal=false; } } 
						//////MODAL

					var x= [];
						
						
						//})
					//}	
	        		var f=8 //plus item no.
								
					$scope.nWeeklog=function (){ 
						$scope.WeekLog=moment($scope.WeekLog,"YYYY-MM-DD").add(-1,'week').format("YYYY-MM-DD");
						$scope.testRun(0,0);
					}
					$scope.pWeeklog=function (){ 
						$scope.WeekLog=moment($scope.WeekLog,"YYYY-MM-DD").add(1,'week').format("YYYY-MM-DD");
						$scope.testRun(0,0);
					}
					
					$scope.nWeek=function (){ 
						$scope.Week_s=moment($scope.Weeks,"YYYY-MM-DD").add(-1,'week').week().toString();
						$scope.Weeks=moment($scope.Weeks,"YYYY-MM-DD").add(-1,'week').format("YYYY-MM-DD");
						$scope.testRun(0,0);
					}
					$scope.pWeek=function (){ 
						$scope.Week_s=moment($scope.Weeks,"YYYY-MM-DD").add(1,'week').week().toString();
						$scope.Weeks=moment($scope.Weeks,"YYYY-MM-DD").add(1,'week').format("YYYY-MM-DD");
						$scope.testRun(0,0);
					}
					
					$scope.We_eks=function(){
						//$scope.Weeks=moment($scope.Week_s+"-"+$scope.Years,"WW-YYYY").format("YYYY-MM-DD");
						$scope.Weeks=moment(moment($scope.Date).format('WW')+"-"+moment($scope.Date).format('YYYY'),"WW-YYYY").format("YYYY-MM-DD");							
						$scope.testRun(0,0);
					};
					
					$scope.Month_Year=function(){
						//$scope.Weeks=moment(parseInt($scope.Months)+1+"-"+$scope.Years,"MM-YYYY").weekday(6).format("YYYY-MM-DD");
						//$scope.resultxx=$scope.Weeks;
						$scope.Weeks=moment(moment($scope.Date).format('M')+"-"+moment($scope.Date).format('YYYY'),"MM-YYYY").weekday(6).format("YYYY-MM-DD");
						$scope.We_eks();
						$scope.testRun(0,0);
					};
					
					$scope.$watch('Weeks',function(){
						$scope.Week_s=moment($scope.Weeks,"YYYY-MM-DD").format("W").toString();
						$scope.Months=moment($scope.Weeks,"YYYY-MM-DD").weekday(6).month().toString();
						$scope.Years=moment($scope.Weeks,"YYYY-MM-DD").year();
						//$scope.resultxx=moment($scope.Weeks,"YYYY-MM-DD");
					});
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
					
					var f=8 //plus item no.
					//console.log($scope.sexy2[i]);
					var newTown=$filter('filter')($scope.test1,function(x){return x.category == 'town'&& x.serial_no ==parseFloat($scope.sexy2[i].spinners.substr(0,2)).toString()})
					var newBrgys=$filter('filter')($scope.test1,function(x){return x.category == 'barangay'&& x.serial_no ==parseFloat($scope.sexy2[i].spinners.substr(0,5)).toString()})
					var Towns1=$filter('filter')($scope.test1,function(x){return x.category == 'town'&& x.serial_no ==parseFloat($scope.sexy2[i].spinners.substr(5,2)-20).toString()})
					var Brgys1=$filter('filter')($scope.test1,function(x){return x.category == 'barangay'&& x.serial_no ==parseFloat($scope.sexy2[i].spinners.substr(5,5)-20200).toString()})
					var Towns2=$filter('filter')($scope.test1,function(x){return x.category == 'town'&& x.serial_no ==parseFloat($scope.sexy2[i].spinners.substr(10,2)-40).toString()})
					var Brgys2=$filter('filter')($scope.test1,function(x){return x.category == 'barangay'&& x.serial_no ==parseFloat($scope.sexy2[i].spinners.substr(10,5)-40400).toString()})
					var Crews1=$filter('filter')($scope.test1,function(x){return x.category == 'crew'&& x.serial_no ==parseFloat($scope.sexy2[i].spinners.substr(15,3)).toString()})
					var Status1=$filter('filter')($scope.test1,function(x){return x.category == 'status'&& x.serial_no ==parseFloat($scope.sexy2[i].spinners.substr(18,2)).toString()})
					var Substation=$filter('filter')($scope.test1,function(x){return x.category == 'substation'&& x.serial_no ==parseFloat($scope.sexy2[i].spinners.substr(20,2)).toString()})
					var Feeder=$filter('filter')($scope.test1,function(x){return x.category == 'feeder'&& x.serial_no ==parseFloat($scope.sexy2[i].spinners.substr(20,5)).toString()})
					var Category=$filter('filter')($scope.test1,function(x){return x.category == 'category'&& x.serial_no ==parseFloat($scope.sexy2[i].spinners.substr(25,3)).toString()})
					var Equipment=$filter('filter')($scope.test1,function(x){return x.category == 'equipment'&& x.serial_no ==parseFloat($scope.sexy2[i].spinners.substr(31,3)).toString()})
					
					//$scope.resultxx=$scope.sexy2[i].status;
					
					$scope.Creator=$scope.sexy2[i].creator;
					var Type="101";if($scope.sexy2[i].type.toString()=="medium"){Type="102"};if($scope.sexy2[i].type.toString()=="low"){Type="103"}
					$scope.Type=Type;
					var Cause=$filter('filter')($scope.test1,function(x){return x.category == 'cause'&& x.serial_no ==Type+parseFloat($scope.sexy2[i].spinners.substr(28,3)).toString()})
				
					$scope.getType=$scope.sexy2[i].type.toString();				
					$scope.newType = function(x) {
						return (x.category === 'cause'& (x.serial_no.substr(0,3) === $scope.Type||x.serial_no==="00"));	
					}
					if(Cause!=""){$scope.Cause= $scope.test1[parseFloat(Cause[0].unique_id)+f]};
						console.log($scope.Cause);
																									
					$scope.Unique_id=$scope.sexy2[i].unique_id;
					$scope.Jo=jo;
					$scope.Members=$scope.sexy2[i].members;
					console.log('Members:'+$scope.Member);
					$scope.Created=$scope.sexy2[i].created;
					$scope.Follower=$scope.sexy2[i].follower;;
					$scope.Followed1=moment($scope.sexy2[i].followed,"MM/DD/YY hh:mm:ss A").toDate();
					$scope.Time1=moment($scope.sexy2[i].followed,"MM/DD/YY hh:mm:ss A").second(0).milliseconds(0).toDate();//new $scope.instDate.format("MM/DD/YYYY");
					//$scope.Time1="06:33 AM";
					$scope.Followed=$scope.sexy2[i].followed;
					//$scope.resultxx=moment($scope.Followed1,"MM/DD/YYYY").format("MM/DD/YY HH:mm A");
					//$scope.resultxx=moment($scope.sexy2[i].followed,"MM/DD/YY hh:mm A").format("hh:mm A");
					$scope.Name=$scope.sexy2[i].name;
					$scope.Landmark=$scope.sexy2[i].landmark;
					$scope.Phone=$scope.sexy2[i].phone;
					$scope.Notes=$scope.sexy2[i].notes;
					$scope.Location=$scope.sexy2[i].location;
					$scope.Gps=$scope.sexy2[i].latitude+","+$scope.sexy2[i].longitude;
					$scope.Lat=$scope.sexy2[i].latitude;
					$scope.Lon=$scope.sexy2[i].longitude;
					$scope.ActionTaken=$scope.sexy2[i].actiontaken;
					
					//localStorage.setItem("unique_id",$scope.Unique_id);
					localStorage.setItem("gps_lat",$scope.Lat);
					localStorage.setItem("gps_lon",$scope.Lon);
					
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
				$scope.selectItem=function (id,jo){ 
					console.log(jo);
					localStorage.setItem("unique_id",id);
					$scope.open();
					
					 $http.get('someservlet6?id='+id)
						.then(function mySuccs(responsex){
							console.log(responsex.data);
							
							var sexy21 = JSON.parse(JSON.stringify(responsex.data));
							sexy21.sort(function(b, a) {
							    return parseFloat(moment(a.followed,"MM/DD/YY hh:mm:ss A").unix()) - parseFloat(moment(b.followed,"MM/DD/YY hh:mm:ss A").unix());
							});
							$scope.sexy2=sexy21;
							
						$scope.Item(0,jo);
							//$scope.Creator=$scope.sexy2[0].creator;
					})
					
					
				}
				var y0=null;var y1=null;var y2=null;var y3=null;var y4=null;var y5=null;
				$scope.testRun=function (xd,idx){ 
							console.log("From Test Run")
							console.log($scope.Towns)
					        localStorage.setItem("Towns",JSON.stringify($scope.Towns));
							localStorage.setItem("Cal",$scope.Date.value);
							$scope.myCrew = function(x) {											
							return (x.category === 'crew');	
							}
							$scope.myBrgy = function(x) {
								return (x.category === 'barangay'& (x.serial_no.substr(0,2) === ($scope.Towns.serial_no)||x.serial_no==="00"));	
							}
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
							
							$scope.startDate=moment($scope.Weeks,"YYYY-MM-DD").add(-1,'day').format("YYYY-MM-DD");
							$scope.endDate=moment($scope.Weeks,"YYYY-MM-DD").add(5,'day').format("YYYY-MM-DD");
							$scope.startLog=moment($scope.WeekLog,"YYYY-MM-DD").add(-8,'day').format("YYYY-MM-DD");
							$scope.endLog=moment($scope.WeekLog,"YYYY-MM-DD").add(-2,'day').format("YYYY-MM-DD");
							
							$scope.Week_Log=moment($scope.WeekLog,"YYYY-MM-DD").add(-1,'week').format("WW-YY");
							$scope.WeekS=moment($scope.Weeks,"YYYY-MM-DD").format("WW-YY");
							$scope.daters= [moment($scope.WeekLog,"YYYY-MM-DD").add(-8,'day').format('MM/DD/YY')+"-"+moment($scope.WeekLog,"YYYY-MM-DD").add(-2,'day').format('MM/DD/YY'),
								moment($scope.Weeks,"YYYY-MM-DD").add(-1,'day').format('MM/DD/YYYY'),
								moment($scope.Weeks,"YYYY-MM-DD").add(0,'day').format('MM/DD/YYYY'),
								moment($scope.Weeks,"YYYY-MM-DD").add(1,'day').format('MM/DD/YYYY'),
								moment($scope.Weeks,"YYYY-MM-DD").add(2,'day').format('MM/DD/YYYY'),
								moment($scope.Weeks,"YYYY-MM-DD").add(3,'day').format('MM/DD/YYYY'),
								moment($scope.Weeks,"YYYY-MM-DD").add(4,'day').format('MM/DD/YYYY'),
								moment($scope.Weeks,"YYYY-MM-DD").add(5,'day').format('MM/DD/YYYY')];
								
							//console.log($scope.Towns);
							//console.log($scope.Towns.value);
							console.log($scope.test1[1]);	
							if(xd==0){y0=$scope.Towns.value;y1=null;y2=$scope.startDate;y3=$scope.Years;$scope.Brgys= $scope.test1[1];}
							if(xd!=0){y0=$scope.Towns.value;y1=$scope.Brgys.value;y2=$scope.startDate;y3=$scope.Years}
							y4=$scope.Crews.value;
							y5=$scope.endDate;
							if(y0=='Select Town'){y0=null}else{y0='"'+y0+'"'}
							if(y1=='Select Brgy' || y1==null){y1=null}else{y1='"'+y1+'"'}
							if(y4=='Select Crew'){y4=null}else{y4='"'+y4+'"'}							
							var sample101=[];
							console.log("Town:"+y0);
							console.log("Brgy:"+y1);
							console.log("Crew:"+y4);
							$http.get(window.APP_CONFIG.API_BASE_URL +'/Joblist/iGIS',{params:{table:'converter.get_planner('+y0+','+y1+','+y4+',"'+$scope.startDate+'","'+$scope.endDate+'")',where:'true',limit:1000}})
							//$http.get('someservlet4?x='+y0+'&y='+y1+'&z='+y3+'&z1='+y2+'&z2='+y4+'&z3='+y5)
									.then(function mySuccs(response){										
										var sexy21 = JSON.parse(JSON.stringify(response.data));
										//console.log("planner:"+JSON.stringify(response.data));
										//sexy21=$filter('filter')(sexy21,function(x){return moment(x.followed, "MM/DD/YY hh:mm A").week() == $scope.Week_s})
										$scope.sexy2=sexy21;
										$scope.sexy2.forEach(function(s){
											sample101.push({sizeX: 1, sizeY: 1, row: 0, col: moment(s.followed, "MM/DD/YY hh:mm:ss A").day()+1,
												unique_id: s.unique_id, name: s.name, status: s.status, brgy: s.brgy0, town: s.town0, jo: s.jo,
												cause: s.cause, type: s.type, time: moment(s.followed, "MM/DD/YY hh:mm:ss A").format("hh:mm:ss A")});
										})
									}
									
							)
							var sample102=[];
							$http.get(window.APP_CONFIG.API_BASE_URL +'/Joblist/iGIS2',{params:{table:'converter.get_planner_log('+y0+','+y1+','+y4+',"'+$scope.startLog+'","'+$scope.endLog+'")',where:'true',limit:500}})
							//$http.get('someservlet5?x='+y0+'&y='+y1+'&z='+y3+'&z1='+$scope.startLog+'&z2='+y4+'&z3='+$scope.endLog)
									.then(function mySuccs(responsex){
										var sexy21 = JSON.parse(JSON.stringify(responsex.data));
										
										sexy21=$filter('filter')(sexy21,function(x){return moment(x.followed, "MM/DD/YY hh:mm:ss A").week() === moment($scope.WeekLog,"YYYY-MM-DD").add(-8,'day').week()})
										$scope.sexy2=sexy21;
										$scope.sexy2=$filter('filter')($scope.sexy2,function(x){return x.status != 'Accomplished'})
																					
										sample102=sample101;
										$scope.sexy2.forEach(function(s){
											sample102.push({sizeX: 1, sizeY: 1, row: 0, col: 0, unique_id: s.unique_id, name: s.name, status: s.status, 
												brgy: s.brgy0, town: s.town0, cause: s.cause, type: s.type, jo: s.jo,
												time: moment(s.followed, "MM/DD/YY hh:mm:ss A").format("hh:mm:ss A")});
										})
										$scope.standardItems =sample102;
										 //$scope.resultxx="$scope.standardItems";
									}
									
							)
						}			
					
					
					
					$scope.gridLocation =0;
					
					$scope.gridsterOpts = {
					        columns: 8,
					        rows: 20,
					        rowHeight: 70,
					        outerMargin: true,
					        margins: [1, 1],
					        mobileBreakPoint:50,
					        mobileModeEnabled: true,
					        resizable: {
					          enabled: false
					        },
					        draggable: {
					           enabled: true, 
					           start: function(event, $element, widget) {
					        	   $scope.gridLocation=widget.col;
					           }, 
					           drag: function(event, $element, widget) {
					             
					           }, 
					           stop: function(event, $element, widget) {
					             var uniqueid=widget.unique_id;
					             var followedate=moment($scope.Weeks,"YYYY-MM-DD").add(widget.col-2,'day').format("MM/DD/YY");
					             //$scope.resultxx=widget.col;
					             if(widget.col==0){followedate=moment($scope.WeekLog,"YYYY-MM-DD").add(widget.col-2,'day').format("MM/DD/YY")}
					             if($scope.gridLocation!=widget.col){
						             $http.post('someservlet7?action=update',{'unique_id':uniqueid,'followed':followedate+ "  06:00:00 AM"})
										.then(function mySuccs(response){
											//$scope.resultxx=JSON.parse(JSON.stringify(response.data));
											//$scope.resultxx=$scope.gridLocation +"-"+widget.col;
										}) 
					             }
					             
					           } 
					        }
					      }
					function makeDraggable(elementId) {
						  const el = document.getElementById(elementId);
						  if (!el) return;
						
						  let isDragging = false;
						  let offsetX = 0;
						  let offsetY = 0;
						
						  // Only start drag if clicked on non-interactive area
						  el.addEventListener('mousedown', (e) => {
						    const targetTag = e.target.tagName.toLowerCase();
						    const nonDraggable = ['input', 'select', 'button', 'textarea', 'option'];
						
						    if (nonDraggable.includes(targetTag)) {
						      return; // Skip dragging for form controls
						    }
						
						    isDragging = true;
						    offsetX = e.clientX - el.getBoundingClientRect().left;
						    offsetY = e.clientY - el.getBoundingClientRect().top;
						    el.classList.add('dragging');
						  });
						
						  document.addEventListener('mousemove', (e) => {
						    if (!isDragging) return;
						
						    const x = e.clientX - offsetX;
						    const y = e.clientY - offsetY;
						
						    el.style.left = `${x}px`;
						    el.style.top = `${y}px`;
						    el.style.position = 'absolute';
						  });
						
						  document.addEventListener('mouseup', () => {
						    if (isDragging) {
						      isDragging = false;
						      el.classList.remove('dragging');
						    }
						  });
					}
					
					makeDraggable('modals');
					makeDraggable('modals2');
				 
				 					
					$scope.navMap=function(){						
						parent.document.getElementById("map").click();
						parent.document.getElementById('Map').contentWindow.updatedata(
							[$scope.Followed1,$scope.Lat,$scope.Lon,$scope.Status1,$scope.newTown,$scope.newBrgys, $scope.Crews1]);
						parent.document.getElementById('Map').contentWindow.updateAsPlan();  
					}
					
					window.updatedata = function(data) {
						//console.log($scope.Towns);	
			          	$scope.$apply(function(){
										 			
							if(data!=null){$scope.Date= data;}	
							if(moment($scope.Date).format("YYYY-MM-DD")==moment(new Date()).format("YYYY-MM-DD")){$scope.testRun(0,0)}
					     });
	        		};
					
					 
			});
			
						       