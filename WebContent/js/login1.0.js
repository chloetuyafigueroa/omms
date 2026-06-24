	        	
   	 		var app=angular.module('firstAPP',[]);
	   	 	
				app.controller('myCtrl1',function($scope,$http,$q)
				{
					
					$scope.mTest="su";
					
					$scope.$watch('uname',function(){
						$scope.mTest=$scope.uname;
						localStorage.setItem("str_name",$scope.uname)
						
					});
				
				var getDropdownValues = function() {
					
					var tDetailsFromLS = localStorage.getItem('dTails');
					$http.get('/Joblist/iGIS?table=converter.get_towns_version()&where=true&limit=500').success(function(response) {
						var town_version=response[0].get_towns_version;
						console.log("Towns version:"+town_version);//
						var ls_version=0;
						if(tDetailsFromLS){
							ls_version=JSON.parse(tDetailsFromLS).filter(obj => obj.category === 'version')[0].serial_no;
						}
						console.log("LS Version:"+ls_version);
						
						var dfrd1 = $q.defer();
						if(tDetailsFromLS&&town_version==ls_version) {
					        dfrd1.resolve(localStorage.getItem('dTails'));	
						}
					    else {
					     	$http.get('someservlet1').success(function(response) {
						console.log(response);
					         	//$scope.test1 = JSON.parse(JSON.stringify(response));
								//console.log($scope.test1);
								localStorage.setItem('dTails', JSON.stringify(response));//.add() rather than .set() ?
					          	//upsert('dTails', plN);
								dfrd1.resolve(JSON.stringify(response));
					        }).error(function(error) {
					            //F1.common.error(data, function() {
					                dfrd1.reject(null);	
					           // });
							});
					    }			
					    return dfrd1.promise;
					    });
					
				   
			};	
			
			
			var getPoleDropdownValues = function() {
					
					var PoleDetailsFromLS = localStorage.getItem('pDtails');
					 var dfrd2 = $q.defer();
					//localStorage.removeItem(plN);
					
				   if(PoleDetailsFromLS) {
				        dfrd2.resolve(localStorage.getItem('pDtails'));	
						//upsert('dTails', plN);
				    }
				    else {
				     	$http.get('/Joblist/iGIS?table=pole_details&where=true&limit=500').success(function(response) {
					console.log(response);
				         	//$scope.test1 = JSON.parse(JSON.stringify(response));
							//console.log($scope.test1);
							localStorage.setItem('pDtails', JSON.stringify(response));//.add() rather than .set() ?
				          	//upsert('dTails', plN);
							dfrd2.resolve(JSON.stringify(response));
				        }).error(function(error) {
				            //F1.common.error(data, function() {
				                dfrd2.reject(null);	
				           // });
						});
				    }			
				    return dfrd2.promise;
			};
			var getPoleClass = function() {
					var PoleDetailsFromLS = localStorage.getItem('pClass');
				    var dfrd3 = $q.defer();
					//localStorage.removeItem(plN);
					
				   if(PoleDetailsFromLS) {
				        dfrd3.resolve(localStorage.getItem('pClass'));	
						//upsert('dTails', plN);
				    }
				    else {
				     	$http.get('/Joblist/iGIS?table=pole_class&where=true&limit=500').success(function(response) {
					console.log(response);
				         	//$scope.test1 = JSON.parse(JSON.stringify(response));
							//console.log($scope.test1);
							localStorage.setItem('pClass', JSON.stringify(response));//.add() rather than .set() ?
				          	//upsert('dTails', plN);
							dfrd3.resolve(JSON.stringify(response));
				        }).error(function(error) {
				            //F1.common.error(data, function() {
				                dfrd3.reject(null);	
				           // });
						});
				    }			
				    return dfrd3.promise;
			};
			
			var getWireDropdownValues = function() {
					
					var WireDetailsFromLS = localStorage.getItem('wDtails');
					 var dfrd4 = $q.defer();
					//localStorage.removeItem(plN);
					
				   if(WireDetailsFromLS) {
				        dfrd4.resolve(localStorage.getItem('wDtails'));	
						//upsert('dTails', plN);
				    }
				    else {
				     	$http.get('/Joblist/iGIS?table=conductor&where=true&limit=500').success(function(response) {
					console.log(response);
				         	//$scope.test1 = JSON.parse(JSON.stringify(response));
							//console.log($scope.test1);
							localStorage.setItem('wDtails', JSON.stringify(response));//.add() rather than .set() ?
				          	//upsert('dTails', plN);
							dfrd4.resolve(JSON.stringify(response));
				        }).error(function(error) {
				            //F1.common.error(data, function() {
				                dfrd4.reject(null);	
				           // });
						});
				    }			
				    return dfrd4.promise;
			};
			var getCustClass = function() {
					var CustDetailsFromLS = localStorage.getItem('cClass');
				    var dfrd5 = $q.defer();
					//localStorage.removeItem(plN);
					
				   if(CustDetailsFromLS) {
				        dfrd5.resolve(localStorage.getItem('cClass'));	
						//upsert('dTails', plN);
				    }
				    else {
				     	$http.get('/Joblist/iGIS?table=customer_type&where=true&limit=500').success(function(response) {
					console.log(response);
				         	//$scope.test1 = JSON.parse(JSON.stringify(response));
							//console.log($scope.test1);
							localStorage.setItem('cClass', JSON.stringify(response));//.add() rather than .set() ?
				          	//upsert('dTails', plN);
							dfrd5.resolve(JSON.stringify(response));
				        }).error(function(error) {
				            //F1.common.error(data, function() {
				                dfrd5.reject(null);	
				           // });
						});
				    }			
				    return dfrd5.promise;
			};
			var getMeters = function() {
					var meterDetailsFromLS = localStorage.getItem('mDtails');
				    var dfrd6 = $q.defer();
					//localStorage.removeItem(plN);
					
				   if(meterDetailsFromLS) {
				        dfrd6.resolve(localStorage.getItem('mDtails'));	
						//upsert('dTails', plN);
				    }
				    else {
				     	$http.get('/Joblist/iGIS?table=meter_type&where=true&limit=500').success(function(response) {
					console.log(response);
				         	//$scope.test1 = JSON.parse(JSON.stringify(response));
							//console.log($scope.test1);
							localStorage.setItem('mDtails', JSON.stringify(response));//.add() rather than .set() ?
				          	//upsert('dTails', plN);
							dfrd6.resolve(JSON.stringify(response));
				        }).error(function(error) {
				            //F1.common.error(data, function() {
				                dfrd6.reject(null);	
				           // });
						});
				    }			
				    return dfrd6.promise;
			};		
			function upsert(array, element) { 
				array.indexOf(element) === -1 ? array.push(element) : '';	
			}
									
				//console.log(localStorage.getItem("dTails"));	
				getDropdownValues();	
				getPoleDropdownValues();
				getPoleClass();
				getCustClass();
				getMeters();
				getWireDropdownValues();
					
			});
				             	        
		       