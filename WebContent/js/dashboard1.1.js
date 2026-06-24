	        	
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
					
					//localStorage.setItem("str", "fooTAY");//TEST
									
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
						$scope.Date=new Date();
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
						$scope.Period1=['Daily', 'Monthly', 'Yearly'];
						$scope.Period=$scope.Period1[0];
							
						var x= [];
				//$http.get('someservlet1')
						//.then(function mySuccs(response){
							
						$scope.test1 = JSON.parse(localStorage.getItem("dTails"));
						$scope.result111=$filter('filter')($scope.test1,{category:"town"});
						$scope.result110=$filter('filter')($scope.test1,{category:"barangay"});
						//console.log($scope.test1);
						
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
						//$scope.initialize();
				//});	
						/** $q.all([ $http.get('someservlet3?x=Town&y=Brgy&z2=Select Crew&z3=Day'),$http.get('someservlet1')])
				        
							.then(function mySuccs(response){
							
								$scope.test1 = JSON.parse(JSON.stringify(response[1].data));
			
									
								//$scope.testRun(0,0);
						});	**/
					
					$scope.testRun=function (xd,idx){ 
			//if(localStorage.hasOwnProperty('Status')){
								//var f=8 //plus item no.
								/**if(localStorage.getItem("Towns").value!=null){
									console.log("hello there!");
									var Towns=$filter('filter')($scope.test1,function(x){return x.category == 'town'&& x.value==JSON.parse(localStorage.getItem("Towns")).value})
									if(Towns[0].serial_no!="00"){$scope.Towns= $scope.test1[parseFloat(Towns[0].unique_id)+f]};
									console.log(Towns[0].serial_no);
								}
								if(localStorage.getItem("Status").value!=null){
									var Status=$filter('filter')($scope.test1,function(x){return x.category == 'status'&& x.value==JSON.parse(localStorage.getItem("Status")).value})
									if(Status[0].serial_no!="00"){$scope.Status= $scope.test1[parseFloat(Status[0].unique_id)+f]};
								} /**/
								var y0=null;var y1=null;var y2=null;var y3=null;var y4=$scope.Crews.value;var dte=null;										
								$scope.runDate=function(){console.log(moment($scope.Date).format('D'))}
								
									localStorage.setItem("Towns",JSON.stringify($scope.Towns));
									localStorage.setItem("Status",JSON.stringify($scope.Status));
							
									$scope.ShowSpinnerStatus = true;
									$scope.ShowCharts = false;
									
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
									//console.log('date:'+$scope.Date);
									if($scope.Period=='Monthly'){y5="Day";}
									if($scope.Period=='Yearly'){y2="Month";}
									$http.get('/Joblist/iGIS',{params:{table:'converter.get_dashboard('+y0+','+y1+','+y4+', "'+dte+'",  "'+$scope.Period+'")',where:'true',limit:500}})
									//$http.get('someservlet3?x='+y0+'&y='+y1+'&z='+y3+'&z1='+y2+'&z2='+y4+'&z3='+y5)
											.then(function mySuccs(response2){
											//console.log('line:'+JSON.stringify(response2.data));
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
											//console.log($scope.sexy2);
											
											//$scope.resultxx=$scope.sexy2;
											if($scope.Status.value=="Select Status"){	
												//$scope.sexy2=$filter('filter')($scope.sexy2,{status:''},true)
												$scope.sexy2=$filter('filter')($scope.sexy2,function(x){return x.status==''|| x.status=='Select Status'|| x.status=='STATUS'})
												
											}
											if($scope.Status.value!="Select Status"){	 
												$scope.sexy2=$filter('filter')($scope.sexy2,{status:$scope.Status.value})
											}
											sexy21=$filter('filter')(sexy21,function(x){return x.status==''|| x.status=='Select Status'})
											
											$scope.testy = $scope.sexy2;
											
											
											//bar & pie
											$scope.data1=$filter('filter')($scope.sexy2,{type:'low'}).length;
											$scope.data2=$filter('filter')($scope.sexy2,{type:'medium'}).length;
											$scope.data3=$filter('filter')($scope.sexy2,{type:'high'}).length;
											
											$scope.labels = ["Inspection/Verification", "O & M", "Power Interruption"];
											$scope.data = [$scope.data1, $scope.data2, $scope.data3];
											
											$scope.result1=$scope.Towns.value;
											$scope.result2=idx;
										
											var om = $scope.sexy2.reduce( (a,b) => {
										        a[b.town0] = a[b.town0] || [];
										        a[b.town0].push(b.type);
										        return a;
										    }, {});
											
											if($scope.Towns.value!="Select Town"){
												var om = $scope.sexy2.reduce( (a,b) => {
											        a[b.brgy0] = a[b.brgy0] || [];
											        a[b.brgy0].push(b.type);
											        return a;
											    }, {});
											}
											
										    var xb = Object.keys(om).map(function(k) {
										    	return k;
										    });
										    var yb = Object.keys(om).map(function(l) {
										        return om[l];    
										    });
										   
											 var yy = [];
											 for(var i = 0; i < yb.length; i++) {
												if(i==(yb.length-1)){$scope.ShowSpinnerStatus = false;$scope.ShowCharts = true;};
												var r= yb[i].filter(function(value){
											        return value == 'low';
											    }).length; 
												var s= yb[i].filter(function(value){
											        return value == 'medium';
											    }).length;
												var t= yb[i].filter(function(value){
											        return value == 'high';
											    }).length;
											    yy.push([r,s,t]);
											   
											 }
											 
											 var yr = Object.keys(yy).map(function(l) {
											        return yy[l][0];    
											    });
											 var ys = Object.keys(yy).map(function(l) {
											        return yy[l][1];    
											    });
											 var yt = Object.keys(yy).map(function(l) {
											        return yy[l][2];    
											    });
											 
											
											$scope.result3=ys;
						
											$scope.options_bar = { legend: { display: true } };
										    $scope.labels_bar = xb;
										    $scope.series_bar = ["Inspection/Verification", "O & M", "Power Interruption"];
										    $scope.data_bar = [yr,ys,yt];
						
											//line
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
		
					$scope.selectItem = function(id){
						
						alert(id)
                        };
                    
								
					$scope.myBrgy = function(x) {
						
					return (x.category === 'barangay'& (x.serial_no.substr(0,2) === ($scope.Towns.serial_no)||x.serial_no==="00"));	
					
					}	
					
					$scope.myCrew = function(x) {
						//$scope.Brgys=null;
					return (x.category === 'crew');	
					}
					window.updatedata = function(data) {
			          	$scope.$apply(function(){
							if(data!=null){$scope.Date= data;}		            
							if(moment($scope.Date).format("YYYY-MM-DD")==moment(new Date()).format("YYYY-MM-DD")){
								setTimeout(function() {$scope.testRun(0,0)}, 1000);}
					     });
	        		};
					
					
			});
				
   	 	
    	           
				
			
					   

		              	
		             	        
		       