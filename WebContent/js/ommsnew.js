	        	
   	 		var app=angular.module('firstAPP',["chart.js"]);
	   	 	
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
						$scope.Months="0";
						//$scope.Months.choice=$scope.Month1[0];
						//var t1 = new Date();
						//$scope.Months= t1.toLocaleString('default', { month: 'long' });
						
						var tx=[];
						tx.push("Select Year");
						var tempDateObj1 = new Date();
						var year= tempDateObj1.getFullYear()
						for(hx=0;hx<20;hx++){
						
							tx.push(year-hx);
						}
						$scope.Year1= tx;
						$scope.Years=$scope.Year1[0];
						//var t1 = new Date();
						//$scope.Years= t1.getFullYear();	
							
							
						var x= [];
				
						$q.all([ $http.get('someservlet'),$http.get('someservlet1'),$http.get('someservlet2')])
				        
							.then(function mySuccs(response){
								var sexy = JSON.parse(JSON.stringify(response[0].data));
								
								var hashesFound = {};
								
								sexy.forEach(function(o){
								    	hashesFound[o.unique_id] = o;
								})
								
								var results = Object.keys(hashesFound).map(function(k){
								    return hashesFound[k];
								})
								$scope.sexy = results;
								sexy.sort(function(a, b) {
								    return parseFloat(a.followed) - parseFloat(b.followed);
								});
								$scope.test1 = JSON.parse(JSON.stringify(response[1].data));
								
								var sexy2 = JSON.parse(JSON.stringify(response[2].data));
								sexy2.sort(function(a, b) {
								    return parseFloat(a.followed) - parseFloat(b.followed);
								});
								var hashesFound2 = {};
								
								sexy2.forEach(function(o2){
								    	hashesFound2[o2.unique_id] = o2;
								})
								
								var results101 = Object.keys(hashesFound2).map(function(k2){
								    return hashesFound2[k2];
								})
								$scope.sexy2 = results101;
								
								
								
								
								$scope.Towns= $scope.test1[0];
								$scope.Brgys= $scope.test1[1];
								
								$scope.data1=$filter('filter')($scope.sexy2,{type:'Inspection/Verification'}).length;
								$scope.data2=$filter('filter')($scope.sexy2,{type:'O & M'}).length;
								$scope.data3=$filter('filter')($scope.sexy2,{type:'Power Interruption'}).length;
								
								$scope.data4=$filter('filter')($scope.sexy2,{type:'O & M'}).length;
								
								
								$scope.labels = ["Inspection/Verification", "O & M", "Power Interruption"];
								$scope.data = [$scope.data1, $scope.data2, $scope.data3];
								
	
								var om = $scope.sexy2.reduce( (a,b) => {
							        a[b.town0] = a[b.town0] || [];
							        a[b.town0].push(b.type);
							        return a;
							    }, {});
								
							    var xb = Object.keys(om).map(function(k) {
							    	return k;
							    });
							    var yb = Object.keys(om).map(function(l) {
							        return om[l];    
							    });
							    
								 var yy = [];
								 for(var i = 0; i < yb.length; i++) {
									var r= yb[i].filter(function(value){
								        return value == 'Inspection/Verification';
								    }).length; 
									var s= yb[i].filter(function(value){
								        return value == 'O & M';
								    }).length;
									var t= yb[i].filter(function(value){
								        return value == 'Power Interruption';
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
								 
								$scope.result1=om;
								$scope.result2=yy;
								$scope.result3=ys;
			
								$scope.options_bar = { legend: { display: true } };
							    $scope.labels_bar = xb;
							    $scope.series_bar = ["Inspection/Verification", "O & M", "Power Interruption"];
							    $scope.data_bar = [yr,ys,yt];
																
								$scope.checkUncheckAll = function (){ 
									
									if ($scope.checkall) { $scope.checkall = true;
										x= [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
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
									if(xd==0){y0=$scope.Towns.value;y1=null;y2=nNow;y3=$scope.Years}
									if(xd!=0){y0=$scope.Towns.value;y1=$scope.Brgys.value;y2=nNow;y3=$scope.Years}
									
									
									//$scope.x=$scope.Towns.value;
									$http.get('someservlet?x='+y0+'&y='+y1+'&z='+y3+'&z1='+y2)
											.then(function mySuccs(response){
											//alert(response.data);
												var sexy = JSON.parse(JSON.stringify(response.data));
												sexy.sort(function(a, b) {
												    return parseFloat(a.followed) - parseFloat(b.followed);
												});
												var hashesFound = {};
	
												sexy.forEach(function(o){
												    	hashesFound[o.unique_id] = o;
												})
												
												var results = Object.keys(hashesFound).map(function(k){
												    return hashesFound[k];
												})
												$scope.sexy = results;
											}
									)
									$http.get('someservlet2?x='+y0+'&y='+y1+'&z='+y3+'&z1='+y2)
											.then(function mySuccs(response2){
											//alert(response.data);
											var sexy2 = JSON.parse(JSON.stringify(response2.data));
											sexy2.sort(function(a, b) {
											    return parseFloat(a.followed) - parseFloat(b.followed);
											});
											var hashesFound2 = {};
											
											sexy2.forEach(function(o2){
											    	hashesFound2[o2.unique_id] = o2;
											})
											
											var results101 = Object.keys(hashesFound2).map(function(k2){
											    return hashesFound2[k2];
											})
											$scope.sexy2 = results101;
											
											$scope.data1=$filter('filter')($scope.sexy2,{type:'Inspection/Verification'}).length;
											$scope.data2=$filter('filter')($scope.sexy2,{type:'O & M'}).length;
											$scope.data3=$filter('filter')($scope.sexy2,{type:'Power Interruption'}).length;
											
											$scope.labels = ["Inspection/Verification", "O & M", "Power Interruption"];
											$scope.data = [$scope.data1, $scope.data2, $scope.data3];
											
											var om = $scope.sexy2.reduce( (a,b) => {
										        a[b.town0] = a[b.town0] || [];
										        a[b.town0].push(b.type);
										        return a;
										    }, {});
											
										    var xb = Object.keys(om).map(function(k) {
										    	return k;
										    });
										    var yb = Object.keys(om).map(function(l) {
										        return om[l];    
										    });
										    
											 var yy = [];
											 for(var i = 0; i < yb.length; i++) {
												var r= yb[i].filter(function(value){
											        return value == 'Inspection/Verification';
											    }).length; 
												var s= yb[i].filter(function(value){
											        return value == 'O & M';
											    }).length;
												var t= yb[i].filter(function(value){
											        return value == 'Power Interruption';
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
											 
											$scope.result1=om;
											$scope.result2=yy;
											$scope.result3=ys;
						
											$scope.options_bar = { legend: { display: true } };
										    $scope.labels_bar = xb;
										    $scope.series_bar = ["Inspection/Verification", "O & M", "Power Interruption"];
										    $scope.data_bar = [yr,ys,yt];
											}
									)
								}	
								
								$scope.statuscode = response[0].status;
								
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
					
					
					
					
			});
				
   	 	
    	           
				
			
					   

		              	
		             	        
		       