	        	
   	 		var app=angular.module('firstAPP',["chart.js"]);
	   	 	
				app.controller('myCtrl1',function($scope,$http,$q,$interval,$timeout,$filter)
				{
					$scope.colours = ['#2962FF','#4CAF50','#D50000'];
					
					//var dte = Date("2-2-2019");
					//$scope.myDate = dte.getMonth(); 
					$interval(function(){
				
						$scope.myDate = (new Date()).toLocaleString('default');
						//var dte= Date();
						//$scope.myDate = dte.getMonth();
						},1000,0,true);// set 0 as default to infinity, 1000=1s
				
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
						
						//$scope.Months.choice=$scope.Month1[0];
						//var t1 = new Date();
						//$scope.Months= t1.toLocaleString('default', { month: 'long' });
						
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
				
						
						$q.all([ $http.get('someservlet3?x=Town&y=Brgy&z2=Crew&z3=Day'),$http.get('someservlet1')])
				        
							.then(function mySuccs(response){
							
								
								$scope.test1 = JSON.parse(JSON.stringify(response[1].data));
								
								var sexy2 = JSON.parse(JSON.stringify(response[0].data));
								sexy2.sort(function(a, b) {
								    return parseFloat(moment(a.followed,"MM/DD/YY hh:mm A").unix()) - parseFloat(moment(b.followed,"MM/DD/YY hh:mm A").unix());
								});
								var hashesFound2 = {};
								
								sexy2.forEach(function(o2){
								    	hashesFound2[o2.unique_id] = o2;
								})
								
								var results101 = Object.keys(hashesFound2).map(function(k2){
								    return hashesFound2[k2];
								})
								$scope.sexy3 = results102;
								var results102=$filter('filter')($scope.sexy3,{status:'Accomplished'})
								
								$scope.sexy2 = results101;
			
								$scope.Towns= $scope.test1[0];
								$scope.Brgys= $scope.test1[1];
								$scope.Crews= $scope.test1[2];
								$scope.Status= $scope.test1[3];
								
								var f=8 //plus item no.
								var Towns=$filter('filter')($scope.test1,function(x){return x.category == 'town'&& x.value==localStorage.getItem("Towns")})
								var Brgys=$filter('filter')($scope.test1,function(x){return x.category == 'barangay'&& x.value==localStorage.getItem("Brgys")})
								var Crews=$filter('filter')($scope.test1,function(x){return x.category == 'crew'&& x.value==localStorage.getItem("Crews")})
								var Status=$filter('filter')($scope.test1,function(x){return x.category == 'status'&& x.value==localStorage.getItem("Status")})
								if(localStorage.getItem("Towns")!=null){		
								if(Towns[0].serial_no!="00"){$scope.Towns= $scope.test1[parseFloat(Towns[0].unique_id)+f]};
								if(Brgys[0].serial_no!="00"){$scope.Brgys= $scope.test1[parseFloat(Brgys[0].unique_id)+f]};
								if(Crews[0].serial_no!="00"){$scope.Crews= $scope.test1[parseFloat(Crews[0].unique_id)+f]};
								}
								if(localStorage.getItem("Status")!=null){
								if(Status[0].serial_no!="00"){$scope.Status= $scope.test1[parseFloat(Status[0].unique_id)+f]};
								}			
																					
								
								var y0=null;var y1=null;var y2=null;var y3=null;var y4=$scope.Crews.value;var y5=$scope.Days;											
								
								
								$scope.testRun=function (xd,idx){ 
									localStorage.setItem("Towns",$scope.Towns.value);
									localStorage.setItem("Brgys",$scope.Brgys.value);
									localStorage.setItem("Crews",$scope.Crews.value);
									//localStorage.setItem("Status",$scope.Status.value);
							
									var nNow=mNow-$scope.Months+2;if(nNow<=0){nNow=12+nNow};//alert(nNow);
									if($scope.Months=="0"){nNow="null"};
									if(xd==0){y0=$scope.Towns.value;y1=null;y2=nNow;y3=$scope.Years;$scope.Brgys= $scope.test1[1];}
									if(xd!=0){y0=$scope.Towns.value;y1=$scope.Brgys.value;y2=nNow;y3=$scope.Years}
									y4=$scope.Crews.value;
									y5=$scope.Days;
									$scope.ShowSpinnerStatus = true;
									$scope.ShowCharts = false;
									$http.get('someservlet3?x='+y0+'&y='+y1+'&z='+y3+'&z1='+y2+'&z2='+y4+'&z3='+y5)
											.then(function mySuccs(response2){
											
												
												var sexy21 = JSON.parse(JSON.stringify(response2.data));
												sexy21.sort(function(a, b) {
												    return parseFloat(moment(a.followed,"MM/DD/YY hh:mm A").unix()) - parseFloat(moment(b.followed,"MM/DD/YY hh:mm A").unix());
												});
											
												
												var hashesFound2 = {};
												
												sexy21.forEach(function(o2){
												    	hashesFound2[o2.unique_id] = o2;
												})
												
												$scope.sexy2 = Object.keys(hashesFound2).map(function(k2){
												    return hashesFound2[k2];
												})
												
												if($scope.Status.value=="Select Status"){	
													$scope.sexy2=$filter('filter')($scope.sexy2,function(x){return x.status==''|| x.status=='Select Status'})
												}
												if($scope.Status.value!="Select Status"){	 
													$scope.sexy2=$filter('filter')($scope.sexy2,{status:$scope.Status.value})
												}
												
												$scope.testy = $scope.sexy2;
											
										
											var hr =[];
											hr = $scope.sexy2.reduce( (a,b) => { //hour
										        a[b.hour] = a[b.hour] || [];
										        a[b.hour].push(b.type);
										        return a;
										    }, {});
											
											var j=0;
											var yy1 = [];
											var hri = Object.keys(hr).map(function(k) {return k});
											
											
											for(var i = 0; i < 24; i++) {	//hour
												
												if(i==23){$scope.ShowSpinnerStatus = false;$scope.ShowCharts = true;};
												 var hrl= hri.filter(function(value){return value == i}).length;
												
												 if (hrl==0){yy1.push([0,0,0])} 
												 if	(hrl==1){
													  	var r1= hr[i].filter(function(value){
													        return value == 'low';
													    }).length; 
														var s1= hr[i].filter(function(value){
													        return value == 'medium';
													    }).length;
														
												  		var rtest= hr[i].filter(function(value){
											        		return value == 'high';
											    		}).length;
												  	
													    yy1.push([r1,s1,rtest]);
													
												  }
												  
											}
											
											var yr1 =[];
											var ys1 =[];
											var yt1 =[];
											yr1 = Object.keys(yy1).map(function(l1) {//hour
											        return yy1[l1][0];    
											    });
											ys1 = Object.keys(yy1).map(function(l1) {
											        return yy1[l1][1];    
											    });
											yt1 = Object.keys(yy1).map(function(l1) {
											        return yy1[l1][2];    
											    });
											// var cvf= hr.filter(function(value){return value == 3}).length;
											
										        
											
											$scope.result2=hr[0];
											$scope.result3=yy1;
						
											$scope.ShowSpinnerStatus = false;
										    
										    $scope.labels_line = ['1AM','2AM','3AM','4AM','5AM','6AM','7AM','8AM','9AM','10AM','11AM','12NN','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM','12MN'];
										    $scope.series_line = ["Inspection/Verification", "O & M", "Power Interruption"];
										    $scope.data_line = [yr1,ys1,yt1];
										    
										    
											}
									)
									
								}	
								
								$scope.testRun(0,0);
						});	
						
					
												
		
					$scope.selectItem = function(id){
						
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
				
   	 	
    	           
				
			
					   

		              	
		             	        
		       