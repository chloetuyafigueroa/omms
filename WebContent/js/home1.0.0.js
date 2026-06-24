	        	
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
				
						$q.all([ $http.get('someservlet3?x=Town&y=Brgy&z2=Select Crew&z3=Day'),$http.get('someservlet1')])
				        
							.then(function mySuccs(response){
							
								$scope.test1 = JSON.parse(JSON.stringify(response[1].data));
			
								$scope.Towns= $scope.test1[0];
								$scope.Brgys= $scope.test1[1];
								$scope.Crews= $scope.test1[2];
								$scope.Status= $scope.test1[3];
			
							    var y0=null;var y1=null;var y2=null;var y3=null;var y4=$scope.Crews.value;										
								
								$scope.testRun=function (xd,idx){ 

									$scope.ShowSpinnerStatus = true;
									$scope.ShowCharts = false;
									var nNow=mNow-$scope.Months+2;if(nNow<=0){nNow=12+nNow};//alert(nNow);
									if($scope.Months=="0"){nNow="null"};
									if(xd==0){y0=$scope.Towns.value;y1=null;y2=nNow;y3=$scope.Years;$scope.Brgys= $scope.test1[1];}
									if(xd!=0){y0=$scope.Towns.value;y1=$scope.Brgys.value;y2=nNow;y3=$scope.Years}
									y4=$scope.Crews.value;
									y5=$scope.Days;
								
									$http.get('someservlet3?x='+y0+'&y='+y1+'&z='+y3+'&z1='+y2+'&z2='+y4+'&z3='+y5)
											.then(function mySuccs(response2){
											//alert(response.data);
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
											//$scope.resultxx=$scope.sexy2;
											if($scope.Status.value=="Select Status"){	
												//$scope.sexy2=$filter('filter')($scope.sexy2,{status:''},true)
												$scope.sexy2=$filter('filter')($scope.sexy2,function(x){return x.status==''|| x.status=='Select Status'})
												
											}
											if($scope.Status.value!="Select Status"){	 
												$scope.sexy2=$filter('filter')($scope.sexy2,{status:$scope.Status.value})
											}
											sexy21=$filter('filter')(sexy21,function(x){return x.status==''|| x.status=='Select Status'})
											
											$scope.testy = $scope.sexy2;
											
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
										}
									  )
									
									
								}	
								$scope.testRun(0,0);
						});	
						
					
												
		
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
					
					
					
			});
				
   	 	
    	           
				
			
					   

		              	
		             	        
		       