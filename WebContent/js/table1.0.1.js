	        	
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
					
								
					
					$scope.users= [ { name: "unique_id" },
									{ name: "creator" },
									{ name: "created"},
									{ name: "follower"},
									{ name: "followed"},
									{ name: "reported by"},
									{ name: "spinners"},
									{ name: "town"},
									{ name: "brgy"},
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
									{ name: "landmark"},
									{ name: "phone"},
									{ name: "location"},
									{ name: "latitude"},		
									{ name: "longitude"},
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
						//var t1 = new Date();
						//$scope.Years= t1.getFullYear();	
							
							
						var x= [];
				
						$q.all([ $http.get('someservlet?x=Town&y=Brgy&z2=Crew&z3=Day'),$http.get('someservlet1')])
				        
							.then(function mySuccs(response){

								$scope.test1 = JSON.parse(JSON.stringify(response[1].data));
								
								var sexy21 = JSON.parse(JSON.stringify(response[0].data));
								sexy21.sort(function(a, b) {
								    return parseFloat(moment(a.followed,"MM/DD/YY hh:mm A").unix()) - parseFloat(moment(b.followed,"MM/DD/YY hh:mm A").unix());
								});
								var hashesFound2 = {};
								
								sexy21.forEach(function(o2){
								    	hashesFound2[o2.unique_id] = o2;
								})
								
								var results101 = Object.keys(hashesFound2).map(function(k2){
								    return hashesFound2[k2];
								})
								$scope.sexy3 = results101;
								var results102=$filter('filter')($scope.sexy3,{status:'Accomplished'})
								
								$scope.sexy2 = results102;
								
								
								$scope.Towns= $scope.test1[0];
								$scope.Brgys= $scope.test1[1];
								$scope.Crews= $scope.test1[2];
								$scope.Status= $scope.test1[3];
								
																
								$scope.checkUncheckAll = function (){ 
									
									if ($scope.checkall) { $scope.checkall = true;
										x= [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]
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
								
								var y0=null;var y1=null;var y2=null;var y3=null;											
								$scope.testRun=function (xd,idx){ 
									var nNow=mNow-$scope.Months+2;if(nNow<=0){nNow=12+nNow};//alert(nNow);
									if($scope.Months=="0"){nNow="null"};
									if(xd==0){y0=$scope.Towns.value;y1=null;y2=nNow;y3=$scope.Years;$scope.Brgys= $scope.test1[1];}
									if(xd!=0){y0=$scope.Towns.value;y1=$scope.Brgys.value;y2=nNow;y3=$scope.Years}
									y4=$scope.Crews.value;
									y5=$scope.Days;
								
									$http.get('someservlet?x='+y0+'&y='+y1+'&z='+y3+'&z1='+y2+'&z2='+y4+'&z3='+y5)
											.then(function mySuccs(response){
											//alert(response.data);
												$scope.sexy2 = JSON.parse(JSON.stringify(response.data));
												sexy21.sort(function(a, b) {
												    return parseFloat(moment(a.followed,"MM/DD/YY hh:mm A").unix()) - parseFloat(moment(b.followed,"MM/DD/YY hh:mm A").unix());
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
													$scope.sexy2=$filter('filter')($scope.sexy2,function(x){return x.status==''|| x.status=='Select Status'})
												}
												if($scope.Status.value!="Select Status"){	 
													$scope.sexy2=$filter('filter')($scope.sexy2,{status:$scope.Status.value})
												}
												
											}
									)
									
								}	
								
								$scope.statuscode = response[0].status;
								$scope.testRun(0,0);
						});	
						
					
												
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

					$scope.selectItem = function(id){
						//var popup="scvvsvv";
						//popup.classList.toggle('show');
						alert(id)
                        };
                    
								
					$scope.myBrgy = function(x) {
						//$scope.Brgys=null;
					return (x.category === 'barangay'& (x.serial_no.substr(0,2) === ($scope.Towns.serial_no)||x.serial_no==="00"));	
					
					}	
					
					$scope.myCrew = function(x) {
						//$scope.Brgys=null;
					return (x.category === 'crew');	
					}
					
					
			});
				
   	 	
    	           
				
			
					   

		              	
		             	        
		       