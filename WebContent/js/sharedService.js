var app = angular.module("firstAPP");
app.config(function ($provide) {
	 		$provide.decorator('$exceptionHandler', function ($delegate) {
		   	 	
		 			return function (exception, cause) {
		 				//$log.debug("Modified exception handler");
		 				//$http.post("/api/clientExceptionLogge",exception);
		 				$delegate(exception, cause);
		 				console.log(exception+"-"+cause);
		 			};
			});
			
		});

app.factory("SharedService", function($http,$q) {

    console.log("from SharedService!");


			var getDropdownValues = function() {

			    var tDetailsFromLS = localStorage.getItem('dTails');
			
			    return $http.get(
			        window.APP_CONFIG.API_BASE_URL +
			        '/Joblist/iGIS?table=converter.get_towns_version()&where=true&limit=500'
			    )
			
			    .then(function(result) {
			
			        var response = result.data;
			
			        if (!Array.isArray(response) || response.length === 0) {
			            throw new Error("Invalid towns version response");
			        }
			
			        var town_version = response[0].get_towns_version;
			
			        console.log("Towns version:", town_version);
			
			        var ls_version = 0;
			        var cachedData = null;
			
			        // Read existing localStorage data
			        if (tDetailsFromLS) {
			
			            try {
			
			                cachedData = JSON.parse(tDetailsFromLS);
			
			                if (Array.isArray(cachedData)) {
			
			                    var versionRecord = cachedData.find(function(obj) {
			                        return obj && obj.category === 'version';
			                    });
			
			                    if (versionRecord) {
			                        ls_version = versionRecord.serial_no;
			                    }
			
			                }
			
			            } catch (error) {
			
			                console.warn("Invalid cached towns data:", error);
			
			                cachedData = null;
			
			            }
			
			        }
			
			        console.log("LS Version:", ls_version);
			
			        // Use localStorage if versions match
			        if (
			            Array.isArray(cachedData) &&
			            String(town_version) === String(ls_version)
			        ) {
			
			            console.log("Using cached towns data.");
			
			            return cachedData;
			
			        }
			
			        // Download updated towns data
			        console.log("Downloading updated towns data...");
			
			        return $http.get('someservlet1')
			
			            .then(function(result) {
			
			                var data = result.data;
			
			                if (!Array.isArray(data)) {
			                    throw new Error("Invalid towns dropdown response");
			                }
			
			                localStorage.setItem(
			                    'dTails',
			                    JSON.stringify(data)
			                );
			
			                console.log("Towns data successfully updated.");
			
			                return data;
			
			            })
			
			            .catch(function(error) {
			
			                console.error("Failed to download towns data:", error);
			
			                return $q.reject(error);
			
			            });
			
			    })
			
			    .catch(function(error) {
			
			        console.error("getDropdownValues failed:", error);
			
			        return $q.reject(error);
			
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
				     	$http.get(window.APP_CONFIG.API_BASE_URL +'/Joblist/iGIS?table=pole_details&where=true&limit=500').success(function(response) {
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
				     	$http.get(window.APP_CONFIG.API_BASE_URL +'/Joblist/iGIS?table=pole_class&where=true&limit=500').success(function(response) {
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
				     	$http.get(window.APP_CONFIG.API_BASE_URL +'/Joblist/iGIS?table=conductor&where=true&limit=500').success(function(response) {
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
				     	$http.get(window.APP_CONFIG.API_BASE_URL +'/Joblist/iGIS?table=customer_type&where=true&limit=500').success(function(response) {
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
				     	$http.get(window.APP_CONFIG.API_BASE_URL +'/Joblist/iGIS?table=meter_type&where=true&limit=500').success(function(response) {
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
			
			function selectAPI() {
				window.APP_CONFIG = window.APP_CONFIG || {};
			    var remoteURL = window.APP_CONFIG.API_BASE_URL;
			    var localURL  = "http://localhost:8080";
			
			    return $http.get(
			        remoteURL + '/Joblist/iGIS?table=converter.get_towns_version()&where=true&limit=1',
			        { timeout: 3000 }
			    )
			    .then(function() {
					localStorage.setItem("API_BASE_URL", remoteURL);
			        console.log("Using remote API: " + remoteURL);
			
			        return remoteURL;
			
			    })
			    .catch(function() {
			
			        console.warn("Remote unavailable. Checking localhost...");
			
			        return $http.get(
			            localURL + '/Joblist/iGIS?table=converter.get_towns_version()&where=true&limit=1',
			            { timeout: 3000 }
			        )
			        .then(function() {
			
			            window.APP_CONFIG.API_BASE_URL = localURL;
						localStorage.setItem("API_BASE_URL", localURL);
			            console.log("Using local API: " + localURL);
			
			            return localURL;
			        });
			
			    });
			}					
				//console.log(localStorage.getItem("dTails"));	
				

   		var initializationPromise = null;

		return {
		
		    selectAPI: function() {
		
		        // Avoid duplicate initialization
		        if (initializationPromise) {
		            return initializationPromise;
		        }
		
		        window.loginReady = false;
		
		        initializationPromise = selectAPI()
		
		            .then(function(apiURL) {
		
		                console.log("Selected API:", apiURL);
		
		                return $q.all([
		                    getDropdownValues(),
		                    getPoleDropdownValues(),
		                    getPoleClass(),
		                    getCustClass(),
		                    getMeters(),
		                    getWireDropdownValues()
		                ]).then(function() {
		                    return apiURL;
		                });
		
		            })
		
		            .then(function(apiURL) {
		
		                console.log("All dropdown values loaded successfully.");
		
		                window.loginReady = true;
		
		                // Notify map1.0.1.js
		                window.dispatchEvent(new Event("loginReady"));
		
		                return apiURL;
		
		            })
		
		            .catch(function(error) {
		
		                window.loginReady = false;
		
		                // Allow retry after failure
		                initializationPromise = null;
		
		                console.error("Joblist initialization failed:", error);
		
		                return $q.reject(error);
		
		            });
		
		        return initializationPromise;
		
		    }
		
		};

});