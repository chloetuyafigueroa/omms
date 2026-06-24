 var app = angular.module("firstAPP", ["leaflet-directive"]);
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
	var result111;
	var map;
	var center;
	var sdipole=null;
	var lastpole = null;
	var currentpole = null;
	var currentpoleLayer = null; 
	var blinkInterval = null;
	var lastpoleLayer = null; 
	var l_frompole=null;
	var l_topole=null;
	var e_lastpole=null;
	var e_currentpole=null;
	var polenoLayerMap = {};
	
	var e_prevpole = null;
	var prevpole = null;
	var prevpoleLayer = null;
	var prevBlinkInterval = null;
	var polenoFeatureMap = {};
	var currentLength=0;
	var latt=0;
	var lngg=0;
	



				app.directive('longPress', ['$timeout', function($timeout) {
				    return {
				        restrict: 'A',
				        link: function(scope, element, attrs) {
				            var pressTimer;
				            var longPressDuration = 5000; // Duration in milliseconds
				            var clickDetected = false;

				            element.on('mousedown touchstart', function(event) {
				                clickDetected = false;
				                pressTimer = $timeout(function() {
				                    clickDetected = true;
				                    scope.$apply(attrs.longPress);
				                }, longPressDuration);
				            });
				
				            element.on('mouseup touchend mouseleave', function(event) {
				                if (pressTimer) {
				                    $timeout.cancel(pressTimer);
				                    if (!clickDetected) {
				                        scope.$apply(attrs.click);
				                    }
				                }
				            });
				
				            // Clean up on scope destroy
				            scope.$on('$destroy', function() {
				                $timeout.cancel(pressTimer);
				            });
				        }
				    };
				}]);
				       
			 app.controller('GISController',function($scope,$http,$q,$rootScope,$filter,$interval,leafletMarkerEvents, leafletMapEvents, leafletData){
          
			leafletData.getMap('map').then(function(map){		
				map=map;
				center = map.getCenter();
				console.log('center27:'+center);		
				map.createPane('prilines').style.zIndex = 650;
				map.createPane('seclines').style.zIndex = 550;
				map.createPane('sdilines').style.zIndex = 500;
				map.createPane('poles').style.zIndex = 680;	
				map.createPane('crew').style.zIndex = 700;				
				
			});
		 	
			$scope.$on('leafletDirectiveMap.map.zoomend', function(event, args){
		        var map1 = args.leafletEvent.target;
			    var center = map1.getCenter();
				//console.log(map.getZoom()+':'+center);
				
				
		    });



			var start = Date.now();	
			var orig=start;	
			var distance;	
			$scope.$on('leafletDirectiveMap.map.moveend', function(event, args){
		        var map1 = args.leafletEvent.target;
			    var center1 = map1.getCenter();
				var end= Date.now();
				if(center!=null){center.lat}else{center=center1};
				distance=center.distanceTo(center1)
				console.log('center:'+center);
				console.log('center1:'+center1);
				console.log('distance:'+distance);
				console.log('orig:'+orig);
				console.log('start:'+start);
				console.log('end:'+end);
				console.log(end-start);
				if(distance>1000){
					//$scope.addSynergi(center1);
					center=center1;				
				}
				if(end-start>5000){
					//$scope.asPlanAPI(localStorage.getItem("unique_id"),0);//09569652335220221212420
					//$scope.addSynergi();
				}
				if(orig-start<2){
					//
					console.log('test');
					//$scope.asPlanAPI(localStorage.getItem("unique_id"),0);//09569652335220221212420					
				}
				if(end-start>1000){
					//delete $scope.layers.overlays.sdilines
					//$scope.asPlanAPI(localStorage.getItem("unique_id"),1);//09569652335220221212420
					//move();
				}
				start=end;
			});
			$scope.latt= 10.7505782;
           	$scope.lngg= 122.3866134;
           	$scope.zoomm=11;
			var objectBearing=0;
			$scope.objectProp={};
		    $scope.markerRclick=false;
			$scope.$on('leafletDirectiveMarker.map.contextmenu', function(event, args){
		        console.log(args.model);
				$scope.latt=args.model.lat;
				$scope.lngg=args.model.lng;
				//$scope.markerRclick=true;				
		    });
 		 	$scope.markerLat=10;
			$scope.marketLng=120;
			$scope.markerStat=false;
			$scope.$on("leafletDirectiveMarker.map.dragend", function(event, args){
                console.log(args.model);
                $scope.markerLat=args.model.lat.toFixed(7);
				$scope.markerLng=args.model.lng.toFixed(7);
				$scope.markerStat=true;
            });
			$scope.$on("leafletDirectiveMarker.map.mouseover", function(event, args){
                  console.log(args.model);
				    var popup = L.popup({ offset: L.point(0, -28)})
				                .setLatLng([args.model.lat, args.model.lng])
				                .setContent(args.model.message)
				    leafletData.getMap('map').then(function(map) {
						if(args.model.type=='gps'){
					      popup.openOn(map);
						}
    				});   
             
            });
		   
			
			/**if(localStorage.getItem("unique_id")!='undefined'){
				$scope.latt = parseFloat(localStorage.getItem("gps_lat"));
	    	 	$scope.lngg = parseFloat(localStorage.getItem("gps_lon"));
				$scope.zoomm=15;
			 }; */
		
        	 var startlat = 10.6762294;
        	 var startlon = 122.3866134;

			
        	angular.extend($scope,{
                headquarter: {
                    lat: $scope.latt,
                    lng: $scope.lngg,
                    zoom: 17
                }, 
				
                markers: {}				
            });

			angular.extend($scope, {
				layers: {
	                baselayers: {
	                    osm: {
	                        name: 'StreetMap',
	                        //url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	                       	url: 'https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmlndWVyb2FlYyIsImEiOiJjbDNzMHQ4NTgxbjV3M2JwNzR2ZWgxeG16In0.Xu9JLfq3MZAyCy6M8sHrhQ',
							type: 'xyz',
							layerParams: {id: 'streets-v11', tileSize: 512, zoomOffset: -1}
	                      },
						streets: {
	                        name: 'Satellite',
	                        url: 'https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmlndWVyb2FlYyIsImEiOiJjbDNzMHQ4NTgxbjV3M2JwNzR2ZWgxeG16In0.Xu9JLfq3MZAyCy6M8sHrhQ',
							type: 'xyz',
							layerParams: {id: 'satellite-streets-v11', tileSize: 512, zoomOffset: -1}
	                        },
						grayscale: {
	                        name: 'Grayscale',
	                        url: 'https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmlndWVyb2FlYyIsImEiOiJjbDNzMHQ4NTgxbjV3M2JwNzR2ZWgxeG16In0.Xu9JLfq3MZAyCy6M8sHrhQ',
							type: 'xyz',
							layerParams: {id: 'light-v9', tileSize: 512, zoomOffset: -1}
	                        }       
					},
					overlays:{}
	                    
	             }
			});
				$scope.defaults={
					    maxZoom: 18,
					    minZoom: 1,
					    doubleClickZoom: true,
					    scrollWheelZoom: true,
					    attributionControl: true,
						tileSize: 256,
						zoomOffset: 0,
	
					    tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
					    tileLayerOptions: {
					        //attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
							
					    },
					    icon: {
					        url: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-icon.png',
					        retinaUrl: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-icon@2x.png',
					        size: [25, 41],
					        anchor: [12, 40],
					        popup: [0, -40],
					        shadow: {
					            url: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-shadow.png',
					            retinaUrl: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-shadow.png',
					            size: [41, 41],
					            anchor: [12, 40]
					        }
					    },
					    path: {
					        weight: 10,
					        opacity: 1,
					        color: '#0000ff'
					    },
					    center: {
					        lat: 0,
					        lng: 0,
					        zoom: 10
					    },
				}
					
        	 
        	 $scope.lat = startlat;
        	 $scope.lon = startlon;
        	
        	
			
        				
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
				//if (localStorage.getItem("Cal")){console.log(localStorage.getItem("Cal"))}
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
				//$scope.Days= "5";
				
				//$scope.result1=(new Date()).getDate();
				
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
				
			function updateTime() {
                $scope.Start=moment(new Date()).add(-3,'hours').second(0).milliseconds(0).toDate();
				$scope.End=moment(new Date()).second(0).milliseconds(0).toDate();
            }	
			updateTime(); // Set initial value
            $interval(updateTime, 60000*15); // Update every second
			
			$scope.getTime=function(){
				console.log('Start:'+$scope.Start);
				console.log('End:'+$scope.End);
				if($scope.Start>=$scope.End){$scope.Start=moment($scope.End).add(-1,'hours').second(0).milliseconds(0).toDate();}
				$scope.testRun(2,3);
			}
				var x= [];
				var marketx={
                 	headquarter: {},
                 	markers: {}
				 }
				//$q.all([ $http.get('someservlet2?x=Town&y=Brgy&z2=Crew&z3=Day'),$http.get('someservlet1')])
		        
					//.then(function mySuccs(response){
						$scope.test1 = JSON.parse(localStorage.getItem("dTails"));
						$scope.pDetails = JSON.parse(localStorage.getItem("pDtails"));
						$scope.wDetails = JSON.parse(localStorage.getItem("wDtails"));
						$scope.mDetails = JSON.parse(localStorage.getItem("mDtails"));
						$scope.mBrand = [...new Set($scope.mDetails.map(item => item.brand))];
						$scope.mModel = [...new Set($scope.mDetails.map(item => item.model))];
						$scope.mRating = [...new Set($scope.mDetails.map(item => item.rating))];
						$scope.cClass = JSON.parse(localStorage.getItem("cClass"));
						$scope.cCategory = [...new Set($scope.cClass.map(item => item.category))];
						$scope.cType = [...new Set($scope.cClass.map(item => item.type))];
						$scope.pQty=[1,2,3,4,5,6,7,8,9,10];
						$scope.pPhases = ['1P','2P','3P'];
						$scope.pType = ['Concrete','Steel','Wood'];
						$scope.pHeight = ['25ft','30ft','35ft','40ft','45ft','50ft','55ft','60ft','65ft','75ft','80ft','90ft'];
						$scope.pClass = JSON.parse(localStorage.getItem("pClass"));
						$scope.pCategory = [...new Set($scope.pDetails.map(item => item.category))];
						
						if ($scope.pType && $scope.pType.length > 0) {
						  $scope.ptype = $scope.pType[1];
						}
						if ($scope.pHeight && $scope.pHeight.length > 0) {
						  $scope.pheight = $scope.pHeight[2];
						}
						var filteredList = $filter('filter')($scope.pClass, { type: $scope.ptype });
						if (filteredList.length >= 2) {
						  $scope.pclass = filteredList[2]; // second item (index 1)
						}
						
						if ($scope.pPhases && $scope.pPhases.length > 0) {
						  $scope.Phases = $scope.pPhases[0];
						}
						if ($scope.pQty && $scope.pQty.length > 0) {
						  $scope.Qty = $scope.pQty[0];
						}
						if ($scope.pCategory && $scope.pCategory.length > 0) {
						  $scope.Category = $scope.pCategory[0];
						}
						if ($scope.pDetails && $scope.pDetails.length > 0) {
						  $scope.pDtails = $scope.pDetails[0];
						}
						if ($scope.cDetails && $scope.cDetails.length > 0) {
						  $scope.cDtails = $scope.cDetails[0];
						}
						if ($scope.mDetails && $scope.mDetails.length > 0) {
						  $scope.mDtails = $scope.mDetails[0];
						}
						if ($scope.wDetails && $scope.wDetails.length > 0) {
						  $scope.priSize = $scope.wDetails[13];
						  $scope.secSize = $scope.wDetails[13];
						  $scope.neuSize = $scope.wDetails[13];
						}
						

						//$scope.filteredPhases = angular.copy($scope.pPhases); 
						//$scope.phaseSelected = function() {
						  // When a valid phase is selected, remove "Select Phase"
						  //if ($scope.Phases) {
						    // Do nothing — ng-options won't include <option value=""> anyway
						  //}
						//};
						
						
						$scope.categoryPhaseFilter = function(item) {
						  if (!item) return false;
						  if (item.category !== $scope.Category) {
						    return false;
						  }
						  if ($scope.Category === "primary" && $scope.Phases) {
						    return item.phase === $scope.Phases;
						  }
							return true;
						};
						
						result111=$filter('filter')($scope.test1,{category:"town"});
						var result110=$filter('filter')($scope.test1,{category:"barangay"});
																	
						/**var sexy21 = JSON.parse(JSON.stringify(response[0].data));
						
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
						
						$scope.sexy2 = results102;**/
	
						$scope.Towns= $scope.test1[0];
						$scope.Brgys= $scope.test1[1];
						$scope.Crews= $scope.test1[2];
						$scope.Status= $scope.test1[3];
						
						$scope.phoneGPS='omms';
						var f=8 //plus item no.
						if(localStorage.hasOwnProperty('Towns')){
							var Towns=$filter('filter')($scope.test1,function(x){return x.category == 'town'&& x.value==JSON.parse(localStorage.getItem("Towns")).value})
							if(Towns[0].serial_no!="00"){$scope.Towns= $scope.test1[parseFloat(Towns[0].unique_id)+f]};
						}
						if(localStorage.hasOwnProperty('Status')){
							var Status=$filter('filter')($scope.test1,function(x){return x.category == 'status'&& x.value==JSON.parse(localStorage.getItem("Status")).value})
							if(Status[0].serial_no!="00"){$scope.Status= $scope.test1[parseFloat(Status[0].unique_id)+f]};
						}			 
			        	/**$scope.data1=$filter('filter')($scope.sexy2,{type:'low'}).length;
						$scope.data2=$filter('filter')($scope.sexy2,{type:'medium'}).length;
						$scope.data3=$filter('filter')($scope.sexy2,{type:'high'}).length;
						
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
						 
						//$scope.result1=om;
						$scope.result2=yy;
						$scope.result3=ys;
	
						$scope.options_bar = { legend: { display: true } };
					    $scope.labels_bar = xb;
					    $scope.series_bar = ["Inspection/Verification", "O & M", "Power Interruption"];
					    $scope.data_bar = [yr,ys,yt];
						**/
					    var y0=null;var y1=null;var y2=null;var y3=null;var y4=$scope.Crews.value;var y5=$scope.Days;var dte=null;											
						
						$scope.testRun=function (xd,idx){ 							
							var nNow=mNow-$scope.Months+2;if(nNow<=0){nNow=12+nNow};//alert(nNow);
							if($scope.Months=="0"){nNow="null"};
							if(xd==0){y0=$scope.Towns.value;y1=null;y2=nNow;y3=$scope.Years;$scope.Brgys= $scope.test1[1];}
							if(xd!=0){y0=$scope.Towns.value;y1=$scope.Brgys.value;y2=nNow;y3=$scope.Years}
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
							
							localStorage.setItem("Towns",JSON.stringify($scope.Towns));
							localStorage.setItem("Status",JSON.stringify($scope.Status));
													
							$http.get('/Joblist/iGIS',{params:{table:'converter.get_map('+y0+','+y1+','+y4+', "'+dte+'",  "'+$scope.Period+'")',where:'true',limit:500}})
							//$http.get('someservlet2?x='+y0+'&y='+y1+'&z='+y3+'&z1='+y2+'&z2='+y4+'&z3='+y5)
									.then(function mySuccs(response2){
									var sexy21 = JSON.parse(JSON.stringify(response2.data));
									sexy21.sort(function(a, b) {
									    return parseFloat(moment(a.followed,"MM/DD/YY hh:mm:ss A").unix()) - parseFloat(moment(b.followed,"MM/DD/YY hh:mm:ss A").unix());
									});
								
									//if (!isNaN("0.0")){$scope.resultxxx="success";}
									
									var hashesFound2 = {};
									
									sexy21.forEach(function(o2){
									    	hashesFound2[o2.unique_id] = o2;
									})
									$scope.sexy2 = Object.keys(hashesFound2).map(function(k2){
									    return hashesFound2[k2];
									})
									console.log($scope.sexy2);
									
									if($scope.Status.value=="Select Status"){	
										$scope.sexy2=$filter('filter')($scope.sexy2,function(x){return x.status==''|| x.status=='Select Status'|| x.status=='STATUS'|| x.status==null})
									}
									if($scope.Status.value!="Select Status"){	 
										$scope.sexy2=$filter('filter')($scope.sexy2,{status:$scope.Status.value})
									}
									
									console.log($scope.sexy2);
							
								    var zb = Object.keys($scope.sexy2).map(function(l) { //test for map
								        return {
												unique_id: $scope.sexy2[l].unique_id,
												jo: $scope.sexy2[l].jo,
												members: $scope.sexy2[l].members,
								        		lat: $scope.sexy2[l].lat,
								        		lng: $scope.sexy2[l].lng,
								        		hour: $scope.sexy2[l].hour,
								        		name: $scope.sexy2[l].name,
								        		created: $scope.sexy2[l].created,
								        		followed: $scope.sexy2[l].followed,
								        		town0: $scope.sexy2[l].town0,
								        		brgy0: $scope.sexy2[l].brgy0,
								        		type: $scope.sexy2[l].type,
								        		cause: $scope.sexy2[l].cause,
								        		status: $scope.sexy2[l].status,
								        		section: $scope.sexy2[l].section,
								        		equip: $scope.sexy2[l].equip,
								        		notes: $scope.sexy2[l].notes,
								        		actiontaken: $scope.sexy2[l].actiontaken,
								        		draggable: true
								        		};    
								        		
								    });
								    
									
								     var result112=$filter('filter')(result110,$scope.myBrgy);
									 console.log(idx);
								
									 								 							
				                     if(idx==0){
										 if ($scope.Towns.value!="Select Town"){
					                    	 $scope.latt= parseFloat($filter('filter')(result111,{value:$scope.Towns.value})[0].lat);
					                    	 $scope.lngg= parseFloat($filter('filter')(result111,{value:$scope.Towns.value})[0].lon);
					                    	 $scope.zoomm=13;
					                     }
					                     if ($scope.Brgys.value!="Select Brgy"){
					                    	 $scope.latt= parseFloat($filter('filter')(result112,{value:$scope.Brgys.value})[0].lat);
					                    	 $scope.lngg= parseFloat($filter('filter')(result112,{value:$scope.Brgys.value})[0].lon);
					                    	 $scope.zoomm=15;
					                     }
											 //marketx={
					                         $scope.headquarter= {
					                             lat: $scope.latt,
					                             lng: $scope.lngg,
					                             zoom: $scope.zoomm
					                         };//,
					                         //markers: {}
											//}					 
 									} 
								 	
									
									 if(idx==2){
											
											 marketx={
					                         headquarter: {
					                             lat: $scope.latt,
					                             lng: $scope.lngg,
					                             zoom: $scope.zoomm
					                         },
					                         markers: {}
											}	
										 
 									}	
									 
								
									if(xd==2 && idx==3){$scope.crewGPS();
									$scope.phoneGPS=$scope.Crews.value.replace(/ and /g, "").replace(/\./g, "").replace(/ /g, "").replace(/&/g, "");
									if($scope.Crews.value=='Select Crew'){$scope.phoneGPS='omms'}
									}
						            
						             $scope.removeMarkers = function() {
						              	 scope.markers = {};
						             }
									 $scope.markers = {};
						             $scope.addMarkers(zb, marketx,result111,result110);
									 
						   				
								}
							  )
							
							 
						    }	
				//});	
				
				$scope.crewGPS2=function(){
					console.log("From crewGPS2","sadkhfjf");
					//if(y4=='Select Crew'){y4=null}else{y4='"'+y4+'"'}
					$http.get('/Joblist/iGIS',{params:{table:'converter.get_gps('+y4+',"'+dte+'",'+1000+')',where:'true',limit:5000}}).then(function mySuccs(response){
						var gisData=JSON.parse(JSON.stringify(response.data))
						console.log(gisData);
						for (var j = 0; j< gisData.length; j++) {
							addCrewMarker(gisData[j],j);
						}
				       	 //angular.extend($scope, marketx);  
							console.log("markers:"+JSON.stringify($scope.markers));              
					});
					
				}
				$scope.crewGPS=function(){
					console.log("From crewGPS","sadkhfjf");
					//if(y4=='Select Crew'){y4=null}else{y4='"'+y4+'"'}
					$http.get('/Joblist/iGIS',{params:{table:'converter.get_gps('+y4+',"'+dte+'","'+moment($scope.Start).format('HH:mm:ss')+'","'+moment($scope.End).format('HH:mm:ss')+'",'+1000+')',where:'true',limit:5000}}).then(function mySuccs(response){
						var gisData=JSON.parse(JSON.stringify(response.data))
						console.log(gisData);
						for (var j = 0; j< gisData.length; j++) {
							addCrewMarker(gisData[j],j);
						}
				       	 //angular.extend($scope, marketx);  
							console.log("markers:"+JSON.stringify($scope.markers));              
					});
					
				}
				$scope.updateIconProperty=function(){
					updateIconProperty(filterGpsMarkers($scope.markers, "Alimodian"));
					console.log("markers:"+JSON.stringify($scope.markers));    
				}
				$scope.upsertnewGPS=function(){
					var gpsData={"date":"08/05/24 08:25:30 PM","phone":"09778572409","message":"location\10.7563646;122.3596981\240805202530\Alimodian\100","geom":"POINT (429992.78085957037 1189113.7764250527)","battery":100,"updated":0,"crew":"Alimodian"};
					 
					var jObj={};
					jObj.geom=addSridToPoint(Terraformer.geojsonToWKT(convertCRS(Terraformer.wktToGeoJSON(gpsData.geom.replace("T (","T("))))).replace("T (","T(");
					jObj.date=gpsData.date;
					jObj.crew=gpsData.crew;
					jObj.rank=1;
					jObj.phone=gpsData.phone;
					console.log("new_markers:"+JSON.stringify(jObj)); 
					addCrewMarker(jObj,0);   
				}
				function addCrewMarker(jObj,j) {
					var icon0='../Omms/img/crew.png';
					var icon1='../Omms/img/tracker.png';						
				    var gPS=jObj.geom;
					var crew=jObj.crew;
					var battery=jObj.battery;
					var members=jObj.members;
					var phone=jObj.phone.slice(-4)
					var lat=getLatLngFromGeomString(gPS).lat;
					var lon=getLatLngFromGeomString(gPS).lng;
					var icon = (jObj.rank == "1") ? icon0 : icon1;
					var iconSize = (jObj.rank == "1") ? [50, 50] : [10, 10];
					var zIndex = (jObj.rank == "1") ? 1000 : 800;
					//console.log(moment(gisData[j].date,"MM/DD/YY  h:mm A").subtract((15-iTem/30),"minute"));
					var date=getTimeFromTimestamp(jObj.date);
					//console.log(lat+":"+lon);
					var xx1= 'gps'+gethhMMssFromTimestamp(jObj.date)+phone;
				 	$scope.markers[xx1] = {lat: parseFloat(lat),lng: parseFloat(lon)						
						,draggable: true, message:date+'<br>'+crew+'<br>'+members+'<br>'+battery+'% battery', crew:crew,
    			  		id: j, type:'gps', icon: {iconUrl: icon,iconSize: iconSize}, opacity:100,zIndexOffset: zIndex
                   };
				}
				
				function upsertGPS(gpsData) {
					console.log("upsertGPS1:"+gpsData);
					//gpsData={"date":"08/07/24 08:25:30 PM","phone":"09778572409","message":"location\10.7563646;122.3596981\240805202530\Alimodian\100","geom":"POINT (429992.78085957037 1189113.7764250527)","battery":100,"updated":0,"crew":"Alimodian"};
					try{
					gpsData=JSON.parse(gpsData);
				    console.log("upsertGPS2:"+gpsData);
					console.log("crew:"+gpsData.crew);
					updateIconProperty(filterGpsMarkers($scope.markers, gpsData.crew));
					//var gpsData={"date":"08/05/24 08:25:30 PM","phone":"09778572409","message":"location\10.7563646;122.3596981\240805202530\Alimodian\100","geom":"POINT (429992.78085957037 1189113.7764250527)","battery":100,"updated":0,"crew":"Alimodian"};
					var jObj={};
					jObj.geom=addSridToPoint(Terraformer.geojsonToWKT(convertCRS(Terraformer.wktToGeoJSON(gpsData.geom.replace("T (","T("))))).replace("T (","T(");
					jObj.date=gpsData.date;
					jObj.crew=gpsData.crew;
					jObj.members=gpsData.members;
					jObj.battery=gpsData.battery;
					jObj.rank=1;
					jObj.phone=gpsData.phone;
					console.log("new_markers:"+JSON.stringify(jObj)); 
					if((gpsData.crew==$scope.Crews.value||$scope.Crews.value=='Select Crew')&& (moment($scope.Date).format("YYYY-MM-DD")!=moment(new Date()).format("YYYY-MM-DD"))){addCrewMarker(jObj,0);}
					}catch(e) {console.log(e);}
				}
				function filterGpsMarkers (markers, crew) {
					  return Object.keys(markers)
					    .filter(key => key.startsWith('gps') && markers[key].crew === crew)
					    .reduce((obj, key) => {
					      obj[key] = markers[key];
					      return obj;
					    }, {});
				}
				function updateIconProperty(markers) {
					var icon='../Omms/img/tracker.png';
					 Object.keys(markers).forEach(key => {					   
					      $scope.markers[key].icon = {iconUrl: icon,iconSize: [10, 10]};
						  $scope.markers[key].zIndexOffset = 800;					    
					  });
				}
				$scope.updateGPS=function(b,s,t,d){
					console.log("From updateGPS","running...."+b);
					$http.get('/Omms/FCMServlet',{params:{topic:$scope.phoneGPS.replace(/"/g, ""),online:b,command:'gps',distance:s,time:t,monitor_time:d}}).then(function mySuccs(response){
						console.log(response.data);
						               
					});
					
				}						
				
				
				const baseUrl = window.location.origin; // Gets the base URL of your app
				const socketUrl = `${baseUrl}/Joblist/notifications`;
				 var ws = new WebSocket(socketUrl);
					ws.onopen = function() {
					    console.log('WebSocket connection opened.');
					    ws.send('Hello, Server!');
					};
					ws.onmessage = function(event) {
						console.log(event);
					    console.log('Message from server:', event.data);
						upsertGPS(event.data);
						$scope.message=event.data;
					};
					ws.onclose = function() {
					    console.log('WebSocket connection closed.');
					};
		
					$scope.sendSocket=function(message){
					if (ws.readyState === WebSocket.OPEN) {
		            ws.send(message);
		            console.log('Message sent:', message);
			        } else {
			            console.log('WebSocket is not open. Message not sent.');
			        }
				}
				
				function parseDateToTimestamp(dateString) { 
				    // Convert the date string to a format that JavaScript Date can understand
				    const [month, day, year, time, period] = dateString.split(/[\s/:]+/);
				
				    // Adjust year to full year format
				    const fullYear = `20${year}`;
				
				    // Create a date object
				    const date = new Date(`${fullYear}-${month}-${day}T${time} ${period}`);
				
				    // Return the timestamp
				    return date.getTime();
				}
				function addSridToPoint(point, srid = 4326) {
				    // Ensure the POINT string starts correctly
				    const regex = /^POINT \(([^ ]+) ([^ )]+)\)$/;
				    const matches = point.match(regex);
				    
				    if (!matches) {
				        throw new Error('Invalid POINT format');
				    }
				    
				    const [_, lon, lat] = matches;
				    
				    // Format the new POINT with SRID
				    const newPoint = `SRID=${srid};POINT (${lon} ${lat})`;
				    
				    return newPoint;
				}
				function getTimeFromTimestamp(timestamp) {
				  // Parse the timestamp to create a Date object
				  const date = new Date(timestamp);
				
				  // Extract hours, minutes, and seconds
				  let hours = date.getHours();
				  const minutes = String(date.getMinutes()).padStart(2, '0');
				  const seconds = String(date.getSeconds()).padStart(2, '0');
				  const ampm = hours >= 12 ? 'PM' : 'AM';
				
				  // Convert 24-hour format to 12-hour format
				  hours = hours % 12;
				  hours = hours ? hours : 12; // the hour '0' should be '12'
				  hours = String(hours).padStart(2, '0');
				
				  // Format the time as hh:MM:SS AM/PM
				  const time = `${hours}:${minutes}:${seconds} ${ampm}`;
				
				  return time;
				}
				function gethhMMssFromTimestamp(timestamp) {
				  // Parse the timestamp to create a Date object
				  const date = new Date(timestamp);
				
				  // Extract hours, minutes, and seconds
				  let hours = String(date.getHours()).padStart(2, '0');
				  const minutes = String(date.getMinutes()).padStart(2, '0');
				  const seconds = String(date.getSeconds()).padStart(2, '0');				  
				
				  // Format the time as hh:MM:SS AM/PM
				  const time = hours+minutes+seconds;
				
				  return time;
				}

				function getLatLngFromGeomString(geomString) {
				    // Define a regular expression to match the POINT coordinates
				    const regex = /POINT\(([^ ]+) ([^)]+)\)/;
				    const match = geomString.match(regex);
				    
				    if (match) {
				        const lng = parseFloat(match[1]);
				        const lat = parseFloat(match[2]);
				        return { lat: lat, lng: lng };
				    } else {
				        throw new Error("Invalid geometry string format");
				    }
				}
				function upsertItem(array, newItem, key) {
				  const existingItemIndex = array.findIndex(item => item[key] === newItem[key]);
				
				  if (existingItemIndex !== -1) {
				    // If the item already exists, replace it with the new item
				    array[existingItemIndex] = newItem;
				  } else {
				    // If the item doesn't exist, add it to the array
				    array.push(newItem);
				  }
				}
				var nodes=[];
				
				//layers={overlays:{}};
				var overlays={};
				//var overlays={'poles':{},'buildings':{},'prilines':{},'seclines':{},'sdilines':{}, 'guy':{},'transformer':{},'dead_end':{},'jumper':{}};
				$scope.asPlanAPI=function (created){ 				
					$http.get('/Joblist/iGIS',{params:{table:'poles',where:'created="'+created+'"',limit:50}}).then(function mySuccs(response){								
							if (response.data!=''){
								var asplanWKT=JSON.parse(JSON.stringify(response.data));//'created="'+created+'"'
								var GeoJSON;					
									var data ={"type":"FeatureCollection","features":[]}
								for (var i = 0; i < asplanWKT.length; i++) {
									GeoJSON=convertCRS(Terraformer.wktToGeoJSON(asplanWKT[i].geom));
									var features={"type":"Feature","id": asplanWKT[i]._id,"properties":{"name":'poles',"poleno":asplanWKT[i].poleno,"oldpoleno":asplanWKT[i].oldpoleno,"priassembly":asplanWKT[i].priassembly,"secassembly":asplanWKT[i].secassembly,"miscellaneous":asplanWKT[i].miscellaneous,"ptype":asplanWKT[i].ptype,"pheight":asplanWKT[i].pheight,"pclass":asplanWKT[i].pclass,"remarks":asplanWKT[i].remarks,"existing":asplanWKT[i].existing},"geometry":GeoJSON}
									data.features.push(features);
									localStorage.setItem(asplanWKT[i].poleno,JSON.stringify(asplanWKT[i].geom));										
									upsertItem(nodes, {'nodeid':asplanWKT[i].poleno,'geom':asplanWKT[i].geom}, 'nodeid');											
									//console.log(asplanWKT[i].existing);
								}
									
								if(data.features.length>0){
									 overlays['poles'] = createOverlays(data);
									localStorage.setItem('overlays',JSON.stringify(overlays));	
								}
											
							}
					}).finally(function () {
						var tables=['buildings','prilines','seclines','sdilines', 'guy','transformer','dead_end','jumper'];
						for(var t=0;t<tables.length;t++){
							const table=tables[t];
							
							//console.log(overlays[table].data)
							$http.get('/Joblist/iGIS',{params:{table:table,where:'created="'+created+'"',limit:50}}).then(function mySuccs(response){								
								if (response.data!=''){
									var asplanWKT=JSON.parse(JSON.stringify(response.data));//'created="'+created+'"'
									console.log(asplanWKT);
									var GeoJSON;					
										var data ={"type":"FeatureCollection","features":[]}
									for (var i = 0; i < asplanWKT.length; i++) {
										switch(table){
											case 'guy':
												const id=asplanWKT[i]._id;
												const plN=asplanWKT[i].poleno;
												const tYpe=asplanWKT[i].type;
												const bearing1=asplanWKT[i].bearing1;
												const bearing2=asplanWKT[i].bearing2;
												const geom1=asplanWKT[i].geom1;
												const geom2=asplanWKT[i].geom2;
												const code=asplanWKT[i].code;
														const points=[];
														//var PolesArray=JSON.parse(localStorage.getItem(plN));	
														var PolesArray=nodes.filter(obj => obj.nodeid === plN)[0];
														console.log(PolesArray);
													//if(PolesArray){
														points.push(getLatlng(convertCRS(Terraformer.wktToGeoJSON(PolesArray.geom))));	
													//}
													if(tYpe==1){
														GeoJSON=convertCRS(Terraformer.wktToGeoJSON(geom1));
														var features1={"type":"Feature","id": id,"properties":{"name":table,"bearing":bearing1,"type":1,"poleno":plN},"geometry":GeoJSON}
														points.push(getLatlng(GeoJSON));
													}if(tYpe==2){
														GeoJSON=convertCRS(Terraformer.wktToGeoJSON(geom1));
														var features2={"type":"Feature","id": id,"properties":{"name":table,"bearing":bearing1,"type":2,"poleno":plN},"geometry":GeoJSON}
														points.push(getLatlng(GeoJSON));
											
														GeoJSON=convertCRS(Terraformer.wktToGeoJSON(geom2));
														var features3={"type":"Feature","id": id,"properties":{"name":table,"bearing":bearing2,"type":1,"poleno":plN},"geometry":GeoJSON}
														points.push(getLatlng(GeoJSON));
													}	
												var features4={"type":"Feature","id": id,"properties":{"name":table,"poleno":plN,"code":code,"gtype":tYpe},"geometry":multiline(points)}
												data.features.push(features4);	
												if(tYpe==1){
														data.features.push(features1);
												}if(tYpe==2){
														data.features.push(features2);
														data.features.push(features3);
												}	
												
												break;
											case 'transformer':	
												var PolesArray=nodes.filter(obj => obj.nodeid === asplanWKT[i].poleno)[0];	
												var geom=convertCRS(Terraformer.wktToGeoJSON(PolesArray.geom));
												console.log(geom);
												var features={"type":"Feature","id": asplanWKT[i]._id,"properties":{"name":table,"poleno":asplanWKT[i].poleno,"bearing":asplanWKT[i].bearing,"qty":1,"rating":asplanWKT[i].size},"geometry":geom}
												data.features.push(features);	
														
											break;
											case 'dead_end':	
												const polenos=[asplanWKT[i].poleno,asplanWKT[i].prevpole];
												var pArray={};												
												var bearingI=0;	
												//const typeI=(parseInt(asplanWKT[i].type)+1).toString();	
												const typeI=asplanWKT[i].type;	
													
												for (var j = 0; j < polenos.length; j++) {
													const jD=j;	
														//var PolesArray=JSON.parse(localStorage.getItem(polenos[jD]));
														var PolesArray=nodes.filter(obj => obj.nodeid === polenos[jD])[0];	
														var geom=getLatlng(convertCRS(Terraformer.wktToGeoJSON(PolesArray.geom)));
														pArray[polenos[jD]]=geom;
														if(typeof pArray[polenos[0]] !== 'undefined' && typeof pArray[polenos[1]] !== 'undefined'){
															if(jD+1==polenos.length){
																bearingI= bearing(pArray[polenos[0]], pArray[polenos[1]]);
																GeoJSON=getPointGeoJSON(getPoint(15, bearingI, getPointGeoJSON(pArray[polenos[0]])));
																var features={"type":"Feature","id": asplanWKT[i]._id,"properties":{"name":table,"poleno":asplanWKT[i].poleno,"prevpole":asplanWKT[i].prevpole,"bearing":bearingI,"type":typeI,"code":asplanWKT[i].code},"geometry":GeoJSON}
																data.features.push(features);
																
															} 
														}
													
												}
												break;
											
											case 'jumper':												
												const polenosJ=[asplanWKT[i].poleno,asplanWKT[i].prevpole,asplanWKT[i].b4prevpole];
												var pArray={};												
												var bearingJ1=0;
												var bearingJ2=0;	
												//const typeJ=(parseInt(asplanWKT[i].type)+1).toString();	
												const typeJ=asplanWKT[i].type;	
												//const code=asplanWKT[i].code;
												for (var j = 0; j < polenosJ.length; j++) {
													const jD=j;	
													//var PolesArray=JSON.parse(localStorage.getItem(polenosJ[jD]));
													var PolesArray=nodes.filter(obj => obj.nodeid === polenosJ[jD])[0];															
													var geom=getLatlng(convertCRS(Terraformer.wktToGeoJSON(PolesArray.geom)));
														pArray[polenosJ[jD]]=geom;
														if(typeof pArray[polenosJ[0]] !== 'undefined' && typeof pArray[polenosJ[1]] !== 'undefined' && typeof pArray[polenosJ[2]] !== 'undefined'){
															if(jD+1==polenosJ.length){
																bearingJ1= bearing(pArray[polenosJ[0]], pArray[polenosJ[1]]);
																bearingJ2= bearing(pArray[polenosJ[0]], pArray[polenosJ[2]]);
																
																var delta;var echo;
															if (bearingJ1-bearingJ2>0){
													            delta=bearingJ2;
													            echo=bearingJ1;
													        }else{
													            delta=bearingJ1;
													            echo=bearingJ2;
													        }
															var foxtrot=echo-delta;
															if(foxtrot>180) {				
																foxtrot=360-echo+delta;
															} 
															const div=3;
											        		//const dist=10+10*asplanWKT[i]._id;
															const dist=10+10*getRank(asplanWKT,asplanWKT[i]._id);
													
																GeoJSON=arc(getPointGeoJSON(pArray[polenosJ[0]]),bearingJ1,bearingJ2,dist);
																var features={"type":"Feature","id": asplanWKT[i]._id,"properties":{"name":table,"poleno":asplanWKT[i].poleno,"prevpole":asplanWKT[i].prevpole,"b4prevpole":asplanWKT[i].b4prevpole,"type":typeJ,"dist":dist,"code":asplanWKT[i].code},"geometry":GeoJSON}
																data.features.push(features);
																
																GeoJSON=getPointGeoJSON(getPoint(dist, bearingJ1, getPointGeoJSON(pArray[polenosJ[0]])));
																var features={"type":"Feature","id": asplanWKT[i]._id,"properties":{"name":table,"poleno":asplanWKT[i].poleno,"prevpole":asplanWKT[i].prevpole,"b4prevpole":asplanWKT[i].b4prevpole,"type":typeJ,"dist":dist},"geometry":GeoJSON}
																data.features.push(features);
																
																GeoJSON=getPointGeoJSON(getPoint(dist, bearingJ2, getPointGeoJSON(pArray[polenosJ[0]])));
																var features={"type":"Feature","id": asplanWKT[i]._id,"properties":{"name":table,"poleno":asplanWKT[i].poleno,"prevpole":asplanWKT[i].prevpole,"b4prevpole":asplanWKT[i].b4prevpole,"type":typeJ,"dist":dist},"geometry":GeoJSON}
																data.features.push(features);
																
															} 
														}
												}
																									
											break;
											case 'prilines':
											case 'seclines':
											case 'sdilines':
												//GeoJSON=convertCRS(Terraformer.wktToGeoJSON(asplanWKT[i].geom));
												//console.log(nodes);
												var p1=convertCRS(Terraformer.wktToGeoJSON(nodes.filter(obj => obj.nodeid === asplanWKT[i].frompole)[0].geom));
												var p2=convertCRS(Terraformer.wktToGeoJSON(nodes.filter(obj => obj.nodeid === asplanWKT[i].topole)[0].geom));
												GeoJSON=geoJsonMLineString([[[p1.coordinates[0],p1.coordinates[1]],[p2.coordinates[0],p2.coordinates[1]]]]);						
						
												//if(cvjson==1){console.log('sacsacs');GeoJSON={type: 'MultiLineString', coordinates: [[[122.47264083595012, 10.72072409851215],[0,0]]]};}
											
												var features={"type":"Feature","id": asplanWKT[i]._id,"properties":{"name":table,"created":asplanWKT[i].created,"length":asplanWKT[i].length,"bearing":180, "topole":asplanWKT[i].topole,"frompole":asplanWKT[i].frompole, "topole":asplanWKT[i].topole,"phase":asplanWKT[i].phase, "topole":asplanWKT[i].topole,"size":asplanWKT[i].size, "neutral":asplanWKT[i].neutral,"inclination":asplanWKT[i].inclination,"existing":asplanWKT[i].existing},"geometry":GeoJSON}
												data.features.push(features);
												break;
											
											case 'buildings':
												GeoJSON=convertCRS(Terraformer.wktToGeoJSON(asplanWKT[i].geom));
												var features={"type":"Feature","id": asplanWKT[i]._id,"properties":{"name":table,"bearing":asplanWKT[i].bearing, "poleno":asplanWKT[i].bldgno},"geometry":GeoJSON}
												data.features.push(features);
												//console.log(asplanWKT[i]);	
												localStorage.setItem(asplanWKT[i].bldgno,JSON.stringify(asplanWKT[i].geom));
												upsertItem(nodes, {'nodeid':asplanWKT[i].bldgno,'geom':asplanWKT[i].geom}, 'nodeid');											
												break;								
											default:					
											
											break;							
										}
										
									}	
									if(data.features.length>0){
										 overlays[table] = createOverlays(data);
									
										localStorage.setItem('overlays',JSON.stringify(overlays));	
									}
									 
								
								}
							})									
							
						}
						console.log(overlays);	
					});				 
									
					
					Overlays();	
					
								
				}
				function dragg(feature) {
					//console.log(feature.properties.name)
	               	var drag;
					switch(feature.properties.name){
						case 'dead_end':
						case 'jumper':
						drag=false;
						break;
						default:
						drag=true;
						break;							
					}
					return drag;
				}
				function style(feature) {
					//console.log(feature.properties.name)
	               	var color;
					var weight=10;
					switch(feature.properties.name){
						case 'prilines':
						case 'guy':
						color='black';
						weight=4;
						break;
						case 'seclines':
						weight=10;
						color='magenta';
						break;
						case 'sdilines':
						weight=4;
						color='yellow';
						break;
						case 'jumper':	
						case 'dead_end':					
						if(feature.properties.type==0)
							{weight=10;color='magenta';}
						else{weight=4;color='black';}
						break;
						default:					
						color='black';
						weight=5;
						break;							
					}
					//console.log('color:'+color)
                    return {fillColor: color,
		                    weight: weight,
		                    opacity: 1,
		                    color: color,
		                    dashArray: '3',
						    fillOpacity: 0.7}
	            }
				
				var getIcon=function(feature){
					var Url;
					switch(feature.properties.name){
						case 'poles':
						case 'syn_pole':
						Url= '../Omms/img/new_pole.png'
						break;
						case 'guy':
						if(feature.properties.type==2)
							{Url= '../Omms/img/ohpole.png'}
						else{Url= '../Omms/img/guy.png'}
						break;
						case 'transformer':
						Url= '../Omms/img/dt.png'
						break;
						case 'buildings':
						Url= '../Omms/img/new_building.png'
						break;
						case 'dead_end':
						if(feature.properties.type==0)
							{Url= '../Omms/img/deadend_sec.png'}
						else{Url= '../Omms/img/dead_end.png'}
						break;
						case 'jumper':
						if(feature.properties.type==0)
							{Url= '../Omms/img/connector_sec.png'}
						else{Url= '../Omms/img/connector.png'}
						break;
						default:					
						Url= '../Omms/img/leaf-green.png'
						break;							
					}
					return Url;
				}	
				var getPane=function(prop){
					var Pane;
					switch(prop.name){
						case 'prilines':
						Pane= 'prilines';
						break;
						case 'seclines':
						Pane= 'seclines';
						break;	
						case 'poles':
						case 'guy':
						case 'transformer':
						Pane= 'poles';
						break;	
						case 'jumper':	
						case 'dead_end':					
						if(prop.type==="0"){Pane= 'seclines';}
						if(prop.type==="1"){Pane= 'prilines';}
						break;								
						default:					
						Pane= 'markerPane';
						break;							
					}
					return Pane;
				}	
				var getIconAnchor=function(feature){
					var Anchor;
					switch(feature.properties.name){
						case 'guy':
						Anchor= [10, 10];
						break;
						case 'transformer':
						Anchor= [15, 0];
						break;								
						default:					
						Anchor= [15, 15];
						break;							
					}
					return Anchor;
				}
				var getIconSize=function(feature){
					var Anchor;
					switch(feature.properties.name){
						case 'guy':
						Anchor= [20, 20];
						break;
						case 'transformer':
						Anchor= [30, 30];
						break;
						case 'dead_end':
						Anchor= [30, 25];
						break;								
						default:					
						Anchor= [30, 30];
						break;							
					}
					return Anchor;
				}		
				var getRotationAngle=function(feature){
					var RotationAngle;
					switch(feature.properties.name){
						case 'guy':
						RotationAngle= 360-feature.properties.bearing;
						break;
						case 'dead_end':
						RotationAngle= 180+feature.properties.bearing;
						break;
						case 'transformer':
						RotationAngle= 360-feature.properties.bearing;
						break;								
						default:					
						RotationAngle= feature.properties.bearing;
						break;							
					}
					return RotationAngle;
				}	
				// Predefine your icons
				var defaultIcon = function(feature) {
				    return L.icon({
				        iconSize: getIconSize(feature),
				        iconAnchor: getIconAnchor(feature),
				        popupAnchor: [1, -24],
				        iconUrl: '../Omms/img/new_pole.png'
				    });
				};
				var enlargedIcon = function(x) {
				    return L.icon({
				        iconSize: [40, 40],
				        iconAnchor: [20, 20],
				        popupAnchor: [1, -24],
				        iconUrl: '../Omms/img/new_pole.png'
				    });
				};
				
				var blinkingIcon = function(feature) {
				    return L.icon({
				        iconSize: getIconSize(feature),
				        iconAnchor: getIconAnchor(feature),
				        popupAnchor: [1, -24],
				        iconUrl: '../Omms/img/last_pole.png'
				    });
				};
				
				var createOverlays = function (data){
					
		            return  {
	                            name: data.features[0].properties.name,
	                            type: 'geoJSONShape',
	                            data: data,
								visible: true,
								doRefresh: true,									
								layerOptions: {
									//pane: getPane(data.features[0].properties),
									//zIndex : getZIndex(data.features[0].properties.name),
	                                pointToLayer: function (feature, latlng) {
	                                    var smallIcon = L.icon({
							                      iconSize: getIconSize(feature),
							                      iconAnchor: getIconAnchor(feature),
							                      popupAnchor:  [1, -24],
												  iconUrl: getIcon(feature)
									   });
																			
									   return L.marker(latlng, {icon: smallIcon, rotationAngle:getRotationAngle(feature),draggable: dragg(feature),pane: getPane(feature.properties)});
			                       },
								   style: function (feature) {
						                var baseStyle = style(feature); // assuming style is a function
						                // Add pane dynamically to style object
						                baseStyle.pane = getPane(feature.properties);
						                return baseStyle;
						            },
								   onEachFeature : function(feature, layer) {
									var del="angular.element(document.getElementById('ID1')).scope().deleteAss("+ feature.id+ ",'" + feature.properties.name+"')";
									//var details='JO #:'+'testing'+'<br>' + '<button id="submit" onclick=' +onclick+'>Edit</button>';
									switch(feature.properties.name){
										case 'prilines':
										case 'seclines':
										case 'sdilines':
											layer.bindPopup("Section ID:"+feature.properties.topole);
										break;
										case 'guy':
										case 'jumper':
										case 'dead_end':
										layer.bindPopup(feature.properties.name+" ID:"+feature.id+'<br>'+
											" qty: 1"+
											" code:"+feature.properties.code+'<br>'+
											"<button onclick=\"" + del + "\">delete</button>");
										break;
										case 'transformer':
											layer.bindPopup(feature.properties.name+" ID:"+feature.id+'<br>'+
											" qty:"+feature.properties.qty+'<br>'+
											" rating:"+feature.properties.rating+'<br>'+
											"<button onclick=\"" + del + "\">delete</button>");
										break;
										default:
											layer.bindPopup("Pole ID:"+feature.properties.poleno);
										break;
										}
										 //myFeaturesMap[feature.properties.objectID] = layer;
									if (feature.geometry.type === "Point" && feature.properties.name==='poles') {
										polenoLayerMap[feature.properties.poleno] = layer;
										polenoFeatureMap[feature.properties.poleno] = feature;
										}
							
										layer.on('click', function(e) {
						                   console.log(layer.options.pane)
											//$scope.open();
											var id=localStorage.getItem("unique_id");
											if (feature.geometry.type === "Point") {
												latt=e.target._latlng.lat;
												lngg=e.target._latlng.lng;
											}
									    });
										layer.on('dblclick', function(e) {
										    $scope.objectProp=e.target.feature.properties;
											$scope.markerRclick=true;
											if (feature.geometry.type === "Point") {
												latt=e.target._latlng.lat;
												lngg=e.target._latlng.lng;
											}
									    });
										layer.on('contextmenu', function(e) {
											console.log(e);
											 e.originalEvent.preventDefault();
											if (feature.geometry.type === "MultiLineString") {
												currentLength = Math.round(getMultiLineLength(e.target.feature)*100)/100;
												console.log("Total length (meters):", currentLength);
												//$scope.conLength=currentLength;
												$scope.currentSectionid='S'+feature.properties.topole;
												l_frompole=feature.properties.frompole;
												l_topole=feature.properties.topole;
												console.log("feature.properties.name:", feature.properties.name);
												switch (feature.properties.name) {	
													case  'prilines':
													$scope.openDtails('line');
													break;
													case  'seclines':
													$scope.openDtails('line');
													break;
													case  'sdilines':
													$scope.openDtails('sdi');
													break;
												}	
											}	
											if (feature.geometry.type === "Point") {
							                   
											   
												//alert("mousemove to rotate object, then click")
												if(feature.properties.name==='poles'){$scope.openDtails('pole');}
												if(feature.properties.name==='buildings'){$scope.openDtails('cust');}
												
												
											}
									    });
										layer.on('mouseover', function(e) {
									    if (feature.geometry.type === "Point") {
												latt=e.target._latlng.lat;
												lngg=e.target._latlng.lng;
												console.log(latt+":"+lngg);
											}
									    var id = localStorage.getItem("unique_id");
										switch (feature.properties.name) {
											case  'prilines':
											case  'seclines':
												$scope.poleno=feature.properties.topole;
												console.log($scope.poleno);
												if (feature.geometry.type === "MultiLineString") {
												var newCurrentPole = feature.properties.topole;
												var newLastPole = feature.properties.frompole;
												
													// Reset previous layers:
											    if (currentpoleLayer instanceof L.Marker && currentpole) {
											        var currentFeature = polenoFeatureMap[currentpole];
											        if (currentFeature) {
											            currentpoleLayer.setIcon(defaultIcon(currentFeature));
											        }
											    }
												    
												}
											    // Stop previous blinkers:
											    if (prevBlinkInterval) {
											        clearInterval(prevBlinkInterval);
											        prevBlinkInterval = null;
											    }
											    if (blinkInterval) {
											        clearInterval(blinkInterval);
											        blinkInterval = null;
											    }
											
											    
							
												
											    // Set new layers:
											    lastpoleLayer = polenoLayerMap[newLastPole];
												currentpoleLayer = polenoLayerMap[newCurrentPole];
											
											    
											
											    // Start blinking lastpoleLayer:
											    if (lastpoleLayer instanceof L.Marker && lastpole) {
											        var lastFeature = polenoFeatureMap[lastpole];
											        if (lastFeature) {
											            var visibleLast = true;
											            blinkInterval = setInterval(function() {
											                if (visibleLast) {
											                    lastpoleLayer.setIcon(blinkingIcon(lastFeature));
											                } else {
											                    lastpoleLayer.setIcon(defaultIcon(lastFeature));
											                }
											                visibleLast = !visibleLast;
											            }, 500);
											        }
											    }
												if (currentpoleLayer instanceof L.Marker && newCurrentPole) {
											        var currentFeature = polenoFeatureMap[newCurrentPole];
											        if (currentFeature) {
											            currentpoleLayer.setIcon(enlargedIcon(currentFeature));
											        }
											    }	
												
											break;
											case  'buildings':
												console.log(feature.properties);
												sdipole=feature.properties.poleno;
											break;
											case  'poles':
												$scope.poleno=feature.properties.poleno;
												if (feature.geometry.type === "Point") {
												var newCurrentPole = feature.properties.poleno;
													
												    // If already hovering on this pole → do nothing
												    if (currentpole === newCurrentPole) {
														currentpole = newCurrentPole;
												    	e_currentpole = e;
												        console.log("Hovering again on same pole, skipping update.");
												        return;
												    }
													
												    // Shift poles:
												    prevpole = lastpole;
												    e_prevpole = e_lastpole;
												
												    lastpole = currentpole;
												    e_lastpole = e_currentpole;
												
												    currentpole = newCurrentPole;
												    e_currentpole = e;
												
												    console.log(prevpole + ":" + lastpole + ":" + currentpole);
												}
											    // Stop previous blinkers:
											    if (prevBlinkInterval) {
											        clearInterval(prevBlinkInterval);
											        prevBlinkInterval = null;
											    }
											    if (blinkInterval) {
											        clearInterval(blinkInterval);
											        blinkInterval = null;
											    }
											
											    // Reset previous layers:
											    if (prevpoleLayer instanceof L.Marker && prevpole) {
											        var prevFeature = polenoFeatureMap[prevpole];
											        if (prevFeature) {
											            prevpoleLayer.setIcon(defaultIcon(prevFeature));
											        }
											    }
											
											    if (lastpoleLayer instanceof L.Marker && lastpole) {
											        var lastFeature = polenoFeatureMap[lastpole];
											        if (lastFeature) {
											            lastpoleLayer.setIcon(defaultIcon(lastFeature));
											        }
											    }
							
												
											    // Set new layers:
											    prevpoleLayer = polenoLayerMap[prevpole];
											    lastpoleLayer = polenoLayerMap[lastpole];
												currentpoleLayer = polenoLayerMap[newCurrentPole];
											
											    // Start blinking prevpoleLayer:
											    if (prevpoleLayer instanceof L.Marker && prevpole) {
											        var prevFeature = polenoFeatureMap[prevpole];
											        if (prevFeature) {
											            var visiblePrev = true;
											            prevBlinkInterval = setInterval(function() {
											                if (visiblePrev) {
											                    prevpoleLayer.setIcon(blinkingIcon(prevFeature));
											                } else {
											                    prevpoleLayer.setIcon(defaultIcon(prevFeature));
											                }
											                visiblePrev = !visiblePrev;
											            }, 3000);
											        }
											    }
											
											    // Start blinking lastpoleLayer:
											    if (lastpoleLayer instanceof L.Marker && lastpole) {
											        var lastFeature = polenoFeatureMap[lastpole];
											        if (lastFeature) {
											            var visibleLast = true;
											            blinkInterval = setInterval(function() {
											                if (visibleLast) {
											                    lastpoleLayer.setIcon(blinkingIcon(lastFeature));
											                } else {
											                    lastpoleLayer.setIcon(defaultIcon(lastFeature));
											                }
											                visibleLast = !visibleLast;
											            }, 500);
											        }
											    }
												if (currentpoleLayer instanceof L.Marker && newCurrentPole) {
											        var currentFeature = polenoFeatureMap[newCurrentPole];
											        if (currentFeature) {
											            currentpoleLayer.setIcon(enlargedIcon(currentFeature));
											        }
											    }	
												
												break;
										}
										
									
									});
										var startLatLng;
										layer.on('dragstart', function(e) {
										    startLatLng = e.target.getLatLng(); // store original position
										});
										layer.on('dragend', function(e) {
										  var poleno=e.target.feature.properties.poleno;
										  //var pdtls=JSON.parse(localStorage.getItem(poleno));
											//console.log(nodes);
										  //var pdtls=nodes.filter(obj => obj.nodeid === poleno)[0];	
											//console.log("test:"+pdtls.geom);		
										 // var orgPoint=convertCRS(Terraformer.wktToGeoJSON(pdtls.geom));
						              	   /**/
											console.log(overlays);
									 //UpdatePoleCoord(e,'prilines',orgPoint);
										  UpdatePoleCoord(e,'transformer',startLatLng);
						 				  UpdatePoleCoord(e,'seclines',startLatLng);
										  UpdatePoleCoord(e,'prilines',startLatLng);
									  	  UpdatePoleCoord(e,'sdilines',startLatLng);
										  UpdatePoleCoord(e,'poles',startLatLng);
										  UpdatePoleCoord(e,'buildings',startLatLng);
						 				  UpdatePoleCoord(e,'guy',startLatLng);
										  UpdatePoleCoord(e,'dead_end',startLatLng);
										  UpdatePoleCoord(e,'jumper',startLatLng);	
											/**/
											//console.log(JSON.stringify(overlays));	
																			  
										});
										
						           }                         
								}
						}
    				 
		     };	
			function Overlays(){	
				$scope.layers.overlays=overlays;				
				
			}
			
			leafletData.getMap().then(function(map) {
				//var overLays=JSON.parse(localStorage.getItem('overlays'));
				//localStorage.setItem('overlays',JSON.stringify(overlays));
					//data.features.push(features);
					
                  map.on('click', function (e) {  
					if($scope.table!=null){
						AddObject(e,$scope.table)
					}
					console.log(overlays);
					
					$scope.markerRclick=false;	
					//latt=e.target._latlng.lat;
					//lngg=e.target._latlng.lng;
                  });
				  map.on('dblclick', function (e) {  
					
					//latt=e.target._latlng.lat;
					//lngg=e.target._latlng.lng;
                  });
				 map.on('mouseover', function (e) {  
					//console.log(e);
					//latt=e.target._latlng.lat;
					//lngg=e.target._latlng.lng;
                  });	
				 
				 
              	 map.on('mousemove', function (e) { 
					
					if($scope.markerRclick && $scope.objectProp.name=='buildings'){
						
						objectBearing= bearing([latt,lngg],[e.latlng.lat,e.latlng.lng]);
							console.log(objectBearing);	
							UpdateBearing('buildings');			
					}
					if($scope.markerRclick && $scope.objectProp.name=='transformer'){
						
						objectBearing= ((bearing([latt,lngg],[e.latlng.lat,e.latlng.lng]))*-1)-270;
							console.log(objectBearing);	
							UpdateBearing('transformer');			
					}
                  });
					
           	});



/////////////modal			
			$scope.selectItem=function(id,jo){ 
				//var i=1;
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
						$scope.sexy2=sexy21;
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
			$scope.showPoleDetails=false;
			$scope.showLineDetails=false;
			$scope.showCustDetails=false;
			$scope.showSdiDetails=false;
			$scope.openDtails = function(x){
				console.log(x);
				switch (x){
					case 'pole':
						if ($scope.showPoleDetails==false){$scope.showPoleDetails=true}
						else{$scope.showPoleDetails=false;}
						pDtails();
					break;
					case 'line':
						if ($scope.showLineDetails==false){$scope.showLineDetails=true}
						else{$scope.showLineDetails=false;}
						lDtails();
					break;
					case 'cust':
						if ($scope.showCustDetails==false){$scope.showCustDetails=true}
						else{$scope.showCustDetails=false;}
						cDtails();
					break;
					case 'sdi':
						if ($scope.showSdiDetails==false){$scope.showSdiDetails=true}
						else{$scope.showSdiDetails=false;}
						sdiDtails();
					break;
				}
				
				
				
			}
			$scope.existPole=false;
			$scope.savePole = function(){
				overlays['poles'].data.features[findIndexByPoleno(overlays['poles'],currentpole)].properties.existing=$scope.existPole;
				var created=localStorage.getItem("unique_id");
				var jo = {}; jo[created] = [{ 'poles': [],'prilines':[],'seclines':[],'guy':[],'jumper':[],'dead_end':[],'transformer':[]  }];
				var tables=['poles','buildings','prilines','seclines','sdilines','guy','transformer','dead_end','jumper','transformer'];
					for(var t=0;t<tables.length;t++){
						const table=tables[t];
						if(table in overlays){
							var id0=10000;
							var id1=0;
							var len=overlays[table].data.features.length;
							for(var i=0;i<len;i++){
								id1=overlays[table].data.features[i].id;
								if(id0!=id1){
									console.log(table+':'+id0+':'+id1);
									id0=id1;
								 switch(table){
									case 'poles':
										var poleObj={//'_id':overlays['poles'].data.features[i].id
										'poleno':overlays[table].data.features[i].properties.poleno
										,'oldpoleno':overlays[table].data.features[i].properties.oldpoleno
										,'geom':geoJSONToWKT(overlays[table].data.features[i].geometry)
										,'priassembly':overlays[table].data.features[i].properties.priassembly
										,'secassembly':overlays[table].data.features[i].properties.secassembly
										,'miscellaneous':overlays[table].data.features[i].properties.miscellaneous
										,'ptype':overlays[table].data.features[i].properties.ptype
										,'pheight':overlays[table].data.features[i].properties.pheight
										,'pclass':overlays[table].data.features[i].properties.pclass
										,'remarks':overlays[table].data.features[i].properties.remarks
										,'existing':overlays[table].data.features[i].properties.existing
										}
										jo[created][0][table].push(poleObj)
									break;
									case 'buildings':
										var poleObj={//'_id':overlays['poles'].data.features[i].id
										'poleno':overlays[table].data.features[i].properties.poleno
										,'oldpoleno':overlays[table].data.features[i].properties.oldpoleno
										,'geom':geoJSONToWKT(overlays[table].data.features[i].geometry)
										,'priassembly':overlays[table].data.features[i].properties.priassembly
										,'secassembly':overlays[table].data.features[i].properties.secassembly
										,'miscellaneous':overlays[table].data.features[i].properties.miscellaneous
										,'ptype':overlays[table].data.features[i].properties.ptype
										,'pheight':overlays[table].data.features[i].properties.pheight
										,'pclass':overlays[table].data.features[i].properties.pclass
										,'remarks':overlays[table].data.features[i].properties.remarks
										,'existing':overlays[table].data.features[i].properties.existing
										}
										jo[created][0][table].push(poleObj)
									break;
									case 'prilines':
									case 'seclines':
										var lineObj={//'_id':overlays['poles'].data.features[i].id
										'frompole':overlays[table].data.features[i].properties.frompole
										,'topole':overlays[table].data.features[i].properties.topole
										,'size':overlays[table].data.features[i].properties.size
										,'neutral':overlays[table].data.features[i].properties.neutral
										,'phase':overlays[table].data.features[i].properties.phase
										,'length':overlays[table].data.features[i].properties.length
										,'inclination':overlays[table].data.features[i].properties.inclination
										,'geom':geoJSONToWKT(overlays[table].data.features[i].geometry)
										,'existing':overlays[table].data.features[i].properties.existing
										}
										jo[created][0][table].push(lineObj)
									break;
									case 'sdilines':
										var lineObj={//'_id':overlays['poles'].data.features[i].id
										'frompole':overlays[table].data.features[i].properties.frompole
										,'topole':overlays[table].data.features[i].properties.topole
										,'size':overlays[table].data.features[i].properties.size
										,'neutral':overlays[table].data.features[i].properties.neutral
										,'phase':overlays[table].data.features[i].properties.phase
										,'length':overlays[table].data.features[i].properties.length
										,'inclination':overlays[table].data.features[i].properties.inclination
										,'geom':geoJSONToWKT(overlays[table].data.features[i].geometry)
										,'existing':overlays[table].data.features[i].properties.existing
										}
										jo[created][0][table].push(lineObj)
									break;
									case 'guy':
										var geom1=geoJSONToWKT({coordinates:overlays[table].data.features[i].geometry.coordinates[1],type:'Point'});
										var gtype=overlays[table].data.features[i].properties.gtype
										var geom2=geoJSONToWKT({coordinates:overlays[table].data.features[i].geometry.coordinates[1],type:'Point'});
										var bearing1=180-bearing(overlays[table].data.features[i].geometry.coordinates[0],overlays[table].data.features[i].geometry.coordinates[1]);
										var bearing2=0;
										if(gtype=='2'){geom2=geoJSONToWKT({coordinates:overlays[table].data.features[i].geometry.coordinates[2],type:'Point'});
											bearing2=180-bearing(overlays[table].data.features[i].geometry.coordinates[1],overlays[table].data.features[i].geometry.coordinates[2]);
										};
										var guyObj={'_id':overlays[table].data.features[i].id
										,'poleno':overlays[table].data.features[i].properties.poleno
										,'type':overlays[table].data.features[i].properties.gtype
										,'geom1':geom1
										,'geom2':geom2
										,'bearing1':bearing1
										,'bearing2':bearing2
										,'code':overlays[table].data.features[i].properties.code
										}
										console.log(guyObj);
										jo[created][0][table].push(guyObj)
									break;
									case 'jumper':
									var jumpObj={'_id':overlays[table].data.features[i].id
										,'poleno':overlays[table].data.features[i].properties.poleno
										,'type':overlays[table].data.features[i].properties.type
										,'b4prevpole':overlays[table].data.features[i].properties.b4prevpole
										,'prevpole':overlays[table].data.features[i].properties.prevpole
										,'code':overlays[table].data.features[i].properties.code
										}
										console.log(jumpObj);
										jo[created][0][table].push(jumpObj)
									break;
									case 'dead_end':
									var deadObj={'_id':overlays[table].data.features[i].id
										,'poleno':overlays[table].data.features[i].properties.poleno
										,'type':overlays[table].data.features[i].properties.type
										,'prevpole':overlays[table].data.features[i].properties.prevpole
										,'code':overlays[table].data.features[i].properties.code
										}
										console.log(deadObj);
										jo[created][0][table].push(deadObj)
									break;
									case 'transformer':
									var xfoObj={'_id':overlays[table].data.features[i].id
										,'poleno':overlays[table].data.features[i].properties.poleno
										,'bearing':overlays[table].data.features[i].properties.bearing
										,'phase':overlays[table].data.features[i].properties.qty+'P'
										,'size':overlays[table].data.features[i].properties.rating
										,'code':'('+overlays[table].data.features[i].properties.qty+')'+overlays[table].data.features[i].properties.rating
										}
										console.log(xfoObj);
										jo[created][0][table].push(xfoObj)
									break;
						
								}
							}
							}
						}
					}
				//console.log(jo);
				console.log(overlays);	
				$http.post('/Joblist/iGIS?table=asplan',jo)
				.then(function mySuccs(response){
					console.log(response);
				})
			}
			$scope.catChange = function(){
				var filteredList = $filter('filter')($scope.pDetails, { category: $scope.Category });
				
				if (filteredList.length >= 2) {
				  $scope.pDtails  = filteredList[0]; // second item (index 1)				  
				}
			}
			$scope.existPri=false;
			$scope.existSec=false;
			$scope.lineexistChange = function() {
			  
			  var pID=getID('prilines',l_frompole,l_topole);
			  var sID=getID('seclines',l_frompole,l_topole);
			  if(pID!=null){
				overlays['prilines'].data.features[pID].properties.existing=$scope.existPri;
			  }
			  if(sID!=null){
			  	overlays['seclines'].data.features[sID].properties.existing=$scope.existSec;
			  }
			};
			
			var priPhase='';
			$scope.priPhChange = function() {
			  priPhase = '';
			  if ($scope.chkPh1) priPhase += 'A';
			  if ($scope.chkPh2) priPhase += 'B';
			  if ($scope.chkPh3) priPhase += 'C';
			  priPhase += 'N';
			  var pID=getID('prilines',l_frompole,l_topole);
			  overlays['prilines'].data.features[pID].properties.phase=priPhase;
			};
			
			$scope.linetype="C";
			$scope.linetypeChange = function(){
				lastpole=l_frompole;
				currentpole=l_topole;
				var pID=getID('prilines',l_frompole,l_topole);
				var sID=getID('seclines',l_frompole,l_topole);
				switch($scope.linetype){
						case 'A': //PUB   $scope.AddLine('prilines')
						if(pID==null){$scope.AddLine('prilines');overlays['prilines'].data.features[pID].properties.existing=$scope.existPri;}
						if(sID==null){$scope.AddLine('seclines');overlays['seclines'].data.features[pID].properties.existing=$scope.existSec;}
						break;
						case 'B'://SS
						if(pID!=null){
							removeFeatureById('prilines',pID);
							if(sID==null){$scope.AddLine('seclines');overlays['seclines'].data.features[pID].properties.existing=$scope.existSec;}
						
						}
						break;
						case 'C'://Primary only
						if(sID!=null){
							removeFeatureById('seclines',sID);
							if(pID==null){$scope.AddLine('prilines');overlays['prilines'].data.features[pID].properties.existing=$scope.existPri;}
						
						}
						break;
						
					}
				
			}
			$scope.priChange = function(){
				var pID=getID('prilines',l_frompole,l_topole);
				overlays['prilines'].data.features[pID].properties.size=$scope.priSize.wire_size;
			}
			
			$scope.secChange = function(){
				var sID=getID('seclines',l_frompole,l_topole);
				overlays['seclines'].data.features[sID].properties.size=$scope.secSize.wire_size;
				
			}
			$scope.neuChange = function(){
				var pID=getID('prilines',l_frompole,l_topole);
				var sID=getID('seclines',l_frompole,l_topole);
				if(pID!=null){
					overlays['prilines'].data.features[pID].properties.neutral=$scope.neuSize.wire_size;
				}
				if(sID!=null){
					overlays['seclines'].data.features[sID].properties.neutral=$scope.neuSize.wire_size;
				}
				
			}
			
			$scope.anglechange=0;
			$scope.angleChange = function(){
				//console.log("Angle:",$scope.anglechange)
				$scope.conLength=Math.round(currentLength*100/Math.cos(toRadians($scope.anglechange)))/100;
				var pID=getID('prilines',l_frompole,l_topole);
				var sID=getID('seclines',l_frompole,l_topole);
				if(pID!=null){
					overlays['prilines'].data.features[pID].properties.inclination=$scope.anglechange;
					overlays['prilines'].data.features[pID].properties.length=$scope.conLength;
				}
				if(sID!=null){
					overlays['seclines'].data.features[sID].properties.inclination=$scope.anglechange;
					overlays['seclines'].data.features[sID].properties.length=$scope.conLength;
				}
			}
			$scope.oldpolenoChange = function(){
				overlays['poles'].data.features[findIndexByPoleno(overlays['poles'],currentpole)].properties.oldpoleno=$scope.oldPoleno;
			}
			$scope.typeChange = function(){
				overlays['poles'].data.features[findIndexByPoleno(overlays['poles'],currentpole)].properties.ptype=$scope.ptype;
				var filteredList = $filter('filter')($scope.pClass, { type: $scope.ptype });
						if (filteredList.length >= 2) {
						  $scope.pclass = filteredList[2]; // second item (index 1)
						}
			}
			$scope.heightChange = function(){
				overlays['poles'].data.features[findIndexByPoleno(overlays['poles'],currentpole)].properties.pheight=$scope.pheight;
			}
			$scope.classChange = function(){
				overlays['poles'].data.features[findIndexByPoleno(overlays['poles'],currentpole)].properties.pclass=$scope.pclass.class;
			}
			$scope.premChange = function(){
				overlays['poles'].data.features[findIndexByPoleno(overlays['poles'],currentpole)].properties.remarks=$scope.pRemarks;
			}
			$scope.existChange = function(){
				overlays['poles'].data.features[findIndexByPoleno(overlays['poles'],currentpole)].properties.existing=$scope.existPole;
			}
			
			$scope.existAssy = false;
			$scope.addDtails = function() {
			    // helper to format based on Existing flag
			    function qtyWrap(qty) {
			        return $scope.existAssy ? `[${qty}]` : `(${qty})`;
			    }
			
			    switch ($scope.Category) {
			        case 'primary':
			            if (!$scope.priassembly) $scope.priassembly = "";
			            if ($scope.priassembly.length > 0) $scope.priassembly += ",";
			            
			            $scope.priassembly += qtyWrap($scope.Qty) + $scope.pDtails.code;
			            $scope.priassembly = summarizeEntries($scope.priassembly);
			
			            overlays['poles'].data.features[
			                findIndexByPoleno(overlays['poles'], currentpole)
			            ].properties.priassembly = $scope.priassembly;
			            break;
			
			        case 'secondary':
			            if (!$scope.secassembly) $scope.secassembly = "";
			            if ($scope.secassembly.length > 0) $scope.secassembly += ",";
			            
			            $scope.secassembly += qtyWrap($scope.Qty) + $scope.pDtails.code;
			            $scope.secassembly = summarizeEntries($scope.secassembly);
			
			            overlays['poles'].data.features[
			                findIndexByPoleno(overlays['poles'], currentpole)
			            ].properties.secassembly = $scope.secassembly;
			            break;
			
			        case 'dead-end':
			            if (!$scope.misc) $scope.misc = "";
			            if ($scope.misc.length > 0) $scope.misc += ",";
			
			            let deCode = ($scope.pDtails.phase === '1') ? 'pde' : 'sde';
			            $scope.misc += qtyWrap($scope.Qty) + deCode;
			
			            addDeadend();
			            break;
			
			        case 'jumper':
			            if (!$scope.misc) $scope.misc = "";
			            if ($scope.misc.length > 0) $scope.misc += ",";
			
			            let jmpCode = ($scope.pDtails.phase === '1') ? 'pjmp' : 'sjmp';
			            $scope.misc += qtyWrap($scope.Qty) + jmpCode;
			
			            addJumper();
			            break;
			
			        default:
			            if (!$scope.misc) $scope.misc = "";
			            if ($scope.misc.length > 0) $scope.misc += ",";
			
			            $scope.misc += qtyWrap($scope.Qty) + $scope.pDtails.code;
			
			            switch ($scope.Category) {
			                case 'guy':
			                    addGuy();
			                    break;
			                case 'transformer':
			                    addXfo($scope.Qty, $scope.pDtails.code);
			                    break;
			            }
			            break;
			    }
			
			    // always summarize misc at the end
			    $scope.misc = summarizeEntries($scope.misc);
			
			    overlays['poles'].data.features[
			        findIndexByPoleno(overlays['poles'], currentpole)
			    ].properties.miscellaneous = $scope.misc;
			};

			var pDtails=function(){
				$scope.misc= "";
				var misc="";
				$scope.priassembly="";
				$scope.secassembly="";
				var e_poleno=e_currentpole.target.feature.properties.poleno;
				console.log(e_poleno);
				var tables=['poles','guy','transformer','dead_end','jumper'];
					for(var t=0;t<tables.length;t++){
						const table=tables[t];
						if(table in overlays){
							console.log(table);
							var len=overlays[table].data.features.length;
							//var count=0;
							var code;
							var qty;
							var id=-1;
							for(var i=0;i<len;i++){
								if(overlays[table].data.features[i].properties.poleno===e_poleno){
									console.log(id);
									console.log(overlays[table].data.features[i]);
									if(id!=overlays[table].data.features[i].id){
										id=overlays[table].data.features[i].id;
										console.log(id);
										console.log(overlays[table].data.features[i]);
										switch(table){
											case 'guy':
											case 'jumper':
											case 'dead_end':
											code=overlays[table].data.features[i].properties.code;
											if (misc.length > 0) {
											  misc = misc+",";
											}
											//misc += '('+1+')'+ code;
											break;
											case 'poles':
											$scope.oldPoleno=overlays[table].data.features[i].properties.oldpoleno;
											$scope.priassembly=overlays[table].data.features[i].properties.priassembly;
											$scope.secassembly=overlays[table].data.features[i].properties.secassembly;
											$scope.pRemarks=overlays[table].data.features[i].properties.remarks;
											$scope.ptype=overlays[table].data.features[i].properties.ptype;
											$scope.pheight=overlays[table].data.features[i].properties.pheight;
											$scope.existPole=overlays[table].data.features[i].properties.existing;
											
											var filteredList = $filter('filter')($scope.pClass, { type: $scope.ptype });
											if (filteredList.length >= 2) {//
											  var idx=filteredList.findIndex(item => item.class === overlays[table].data.features[i].properties.pclass)
											//console.log(filteredList);
											  $scope.pclass = filteredList[idx]; // second item (index 1)
											}
											
											if (misc.length > 0) {
											  misc = misc+",";
											}
											misc +=overlays[table].data.features[i].properties.miscellaneous;
											break;
											case 'transformer':
											code=overlays[table].data.features[i].properties.rating;
											qty=overlays[table].data.features[i].properties.qty;
											if (misc.length > 0) {
											  misc = misc+",";
											}
											//misc += '('+qty+')'+ code;
											break;
											default:
											break;
										}
										//count++;
									}
								}
								
							}
							//console.log('qty:'+count+'-'+'code:'+code);
							
						}
						
					}
					$scope.misc=summarizeEntries(misc);
			}
			
			var lDtails=function(){
				lastpole=l_frompole;
				currentpole=l_topole;
				var pID=getID('prilines',l_frompole,l_topole);
				var sID=getID('seclines',l_frompole,l_topole);
				if(pID!=null && sID!=null){$scope.linetype="A";}
				if(pID==null && sID!=null){$scope.linetype="B";$scope.existPri =false;}
				if(pID!=null && sID==null){$scope.linetype="C";$scope.existSec =false;}
				if(pID!=null){
					$scope.conLength= parseFloat(overlays['prilines'].data.features[pID].properties.length);
					$scope.priSize = $scope.wDetails[getWireIndexBySize($scope.wDetails, overlays['prilines'].data.features[pID].properties.size)];
					$scope.neuSize = $scope.wDetails[getWireIndexBySize($scope.wDetails, overlays['prilines'].data.features[pID].properties.neutral)];
					$scope.anglechange= overlays['prilines'].data.features[pID].properties.inclination;
					var phase =overlays['prilines'].data.features[pID].properties.phase;
					$scope.chkPh1 = phase.includes('A');
					$scope.chkPh2 = phase.includes('B');
					$scope.chkPh3 = phase.includes('C');
					$scope.existPri = overlays['prilines'].data.features[pID].properties.existing;
				}
				if(sID!=null){
					$scope.secSize = $scope.wDetails[getWireIndexBySize($scope.wDetails, overlays['seclines'].data.features[sID].properties.size)];
					$scope.conLength= parseFloat(overlays['seclines'].data.features[sID].properties.length);
					$scope.neuSize = $scope.wDetails[getWireIndexBySize($scope.wDetails, overlays['seclines'].data.features[sID].properties.neutral)];
					$scope.anglechange= overlays['seclines'].data.features[sID].properties.inclination;
					$scope.existSec = overlays['seclines'].data.features[sID].properties.existing;
				}
			}
			var cDtails=function(){
				$scope.cWire = $scope.wDetails[0];
					
			}
			var sdiDtails=function(){
					
			}
			function summarizeEntries(input) {
			    if (typeof input !== 'string') {
			        console.warn('summarizeEntries() called with invalid input:', input);
			        return '';
			    }
			
			    const items = input.split(',').map(i => i.trim());
			    const countsParen = {}; // (x) group
			    const countsBracket = {}; // [x] group
			    const orderParen = [];
			    const orderBracket = [];
			
			    for (const item of items) {
			        let matchParen = item.match(/\((\d+)\)(.+)/);
			        let matchBracket = item.match(/\[(\d+)\](.+)/);
			
			        if (matchParen) {
			            const quantity = parseInt(matchParen[1], 10);
			            const label = matchParen[2].trim();
			            if (!countsParen[label]) orderParen.push(label);
			            countsParen[label] = (countsParen[label] || 0) + quantity;
			        } 
			        else if (matchBracket) {
			            const quantity = parseInt(matchBracket[1], 10);
			            const label = matchBracket[2].trim();
			            if (!countsBracket[label]) orderBracket.push(label);
			            countsBracket[label] = (countsBracket[label] || 0) + quantity;
			        }
			    }
			
			    const parenPart = orderParen.map(label => `(${countsParen[label]})${label}`).join(',');
			    const bracketPart = orderBracket.map(label => `[${countsBracket[label]}]${label}`).join(',');
			
			    return [parenPart, bracketPart].filter(Boolean).join(',');
			}


			var addXfo=function(qty,rating){
				console.log(e_currentpole.target.feature.properties.poleno);
				var e_poleno=e_currentpole.target.feature.properties.poleno;
					
					var created=localStorage.getItem("unique_id");
					var _id=1;
					var features={"type":"Feature","id": _id,"properties":{"name":'transformer',"poleno":e_poleno,"bearing":0,"qty":qty,"rating":rating},"geometry":{type: 'Point', coordinates: [e_currentpole.latlng.lng,e_currentpole.latlng.lat]}};
					var data ={"type":"FeatureCollection","features":[]}
					if(overlays['transformer']!=null){
						_id=getMax(overlays['transformer'].data.features, 'id')+1;
						features={"type":"Feature","id": _id,"properties":{"name":'transformer',"poleno":e_poleno,"bearing":0,"qty":qty,"rating":rating},"geometry":{type: 'Point', coordinates: [e_currentpole.latlng.lng,e_currentpole.latlng.lat]}};
						overlays['transformer'].data.features.push(features);
					}else{
						data.features.push(features);
						overlays['transformer'] =createOverlays(data);	
					}
					
					console.log(overlays);
					localStorage.setItem('overlays',JSON.stringify(overlays));
						
					UpdateOverlays('transformer');
					Overlays();
					//console.log(overlays);
			}
			var addGuy=function(){
				var calcLatlng1=calculateDerivedPosition(e_currentpole.latlng,10,180);
				console.log(e_currentpole.target.feature.properties.poleno);
				var e_poleno=e_currentpole.target.feature.properties.poleno;
				var geojson;
				var geojson1=geoJsonLineString([[e_currentpole.latlng.lng,e_currentpole.latlng.lat],[calcLatlng1.lng,calcLatlng1.lat]]);	
				var calcLatlng2=calculateDerivedPosition(e_currentpole.latlng,20,180);
				var geojson2=geoJsonLineString([[e_currentpole.latlng.lng,e_currentpole.latlng.lat],[calcLatlng1.lng,calcLatlng1.lat],[calcLatlng2.lng,calcLatlng2.lat]]);					
					
					var created=localStorage.getItem("unique_id");
					var _id=1;
					var gType=$scope.pDtails.phase;
					if(gType==1){geojson=geojson1;}else{geojson=geojson2;}
					
					var lfeatures={"type":"Feature","id": _id,"properties":{"name":'guy',"poleno":e_poleno,"created":created,"code":$scope.pDtails.code,'gtype':gType},"geometry":geojson};
					var p1features={"type":"Feature","id": _id,"properties":{"name":'guy',"poleno":e_poleno,"bearing":0,"type": gType == 1 ? 1 : 2},"geometry":{type: 'Point', coordinates: [calcLatlng1.lng,calcLatlng1.lat]}};
					var p2features={"type":"Feature","id": _id,"properties":{"name":'guy',"poleno":e_poleno,"bearing":0,"type":1},"geometry":{type: 'Point', coordinates: [calcLatlng2.lng,calcLatlng2.lat]}};
					var data ={"type":"FeatureCollection","features":[]}
					if(overlays['guy']!=null){
						_id=getMax(overlays['guy'].data.features, 'id')+1;
						lfeatures={"type":"Feature","id": _id,"properties":{"name":'guy',"poleno":e_poleno,"created":created,"code":$scope.pDtails.code,'gtype':gType},"geometry":geojson};
						p1features={"type":"Feature","id": _id,"properties":{"name":'guy',"poleno":e_poleno,"bearing":0,"type":gType == 1 ? 1 : 2},"geometry":{type: 'Point', coordinates: [calcLatlng1.lng,calcLatlng1.lat]}};
						p2features={"type":"Feature","id": _id,"properties":{"name":'guy',"poleno":e_poleno,"bearing":0,"type":1},"geometry":{type: 'Point', coordinates: [calcLatlng2.lng,calcLatlng2.lat]}};
						overlays['guy'].data.features.push(lfeatures);
						overlays['guy'].data.features.push(p1features);
						if(gType==2){overlays['guy'].data.features.push(p2features)};
					}else{
						data.features.push(lfeatures);
						data.features.push(p1features);
						if(gType==2){data.features.push(p2features)};
						overlays['guy'] =createOverlays(data);	
					}
					
					console.log(overlays);
					localStorage.setItem('overlays',JSON.stringify(overlays));
						
					UpdateOverlays('guy');
					Overlays();
					//console.log(overlays);
			}
			var addJumper=function(){
				/**/
				const polenosJ=[currentpole,lastpole,prevpole];
				var _id=1;
				var created=localStorage.getItem("unique_id");
				var pArray={};												
				var bearingJ1=0;
				var bearingJ2=0;
				
				const typeJ=$scope.pDtails.phase;
				console.log('typeJ:'+typeJ);
				var code;
					if(typeJ==='1'){
						code='pjmp';
					}else{code='sjmp'}	
				for (var j = 0; j < polenosJ.length; j++) {
					//const jD=j;	
					//var PolesArray=JSON.parse(localStorage.getItem(polenosJ[jD]));
					var PolesArray=nodes.filter(obj => obj.nodeid === polenosJ[j])[0];															
					var geom=getLatlng(convertCRS(Terraformer.wktToGeoJSON(PolesArray.geom)));
						pArray[polenosJ[j]]=geom;
				}
				if(typeof pArray[polenosJ[0]] !== 'undefined' && typeof pArray[polenosJ[1]] !== 'undefined' && typeof pArray[polenosJ[2]] !== 'undefined'){
					//if(jD+1==polenosJ.length){
						bearingJ1= bearing(pArray[polenosJ[0]], pArray[polenosJ[1]]);
						bearingJ2= bearing(pArray[polenosJ[0]], pArray[polenosJ[2]]);
						
						var delta;var echo;
					if (bearingJ1-bearingJ2>0){
			            delta=bearingJ2;
			            echo=bearingJ1;
			        }else{
			            delta=bearingJ1;
			            echo=bearingJ2;
			        }
					var foxtrot=echo-delta;
					if(foxtrot>180) {				
						foxtrot=360-echo+delta;
					} 
					const div=10;
	        		//const dist=(echo+foxtrot)/div;
					var dist=20;
			
						GeoJSON1=arc(getPointGeoJSON(pArray[polenosJ[0]]),bearingJ1,bearingJ2,dist);
						GeoJSON2=getPointGeoJSON(getPoint(dist, bearingJ1, getPointGeoJSON(pArray[polenosJ[0]])));
						GeoJSON3=getPointGeoJSON(getPoint(dist, bearingJ2, getPointGeoJSON(pArray[polenosJ[0]])));
						var features1={"type":"Feature","id": _id,"properties":{"name":'jumper',"poleno":currentpole,"prevpole":lastpole,"b4prevpole":prevpole,"type":typeJ,"dist":dist,"created":created,"code":code},"geometry":GeoJSON1}
						var features2={"type":"Feature","id": _id,"properties":{"name":'jumper',"poleno":currentpole,"prevpole":lastpole,"b4prevpole":prevpole,"type":typeJ,"dist":dist},"geometry":GeoJSON2}
						var features3={"type":"Feature","id": _id,"properties":{"name":'jumper',"poleno":currentpole,"prevpole":lastpole,"b4prevpole":prevpole,"type":typeJ,"dist":dist},"geometry":GeoJSON3}
						var data ={"type":"FeatureCollection","features":[]}
						if(overlays['jumper']!=null){
							_id=getMax(overlays['jumper'].data.features, 'id');
							dist=10+10*(getMaxRank(overlays['jumper'].data.features,typeJ,currentpole)+1);
							console.log(getMaxRank(overlays['jumper'].data.features,typeJ,currentpole))
							GeoJSON1=arc(getPointGeoJSON(pArray[polenosJ[0]]),bearingJ1,bearingJ2,dist);
							GeoJSON2=getPointGeoJSON(getPoint(dist, bearingJ1, getPointGeoJSON(pArray[polenosJ[0]])));
							GeoJSON3=getPointGeoJSON(getPoint(dist, bearingJ2, getPointGeoJSON(pArray[polenosJ[0]])));
							features1={"type":"Feature","id": _id+1,"properties":{"name":'jumper',"poleno":currentpole,"prevpole":lastpole,"b4prevpole":prevpole,"type":typeJ,"dist":dist,"created":created,"code":code},"geometry":GeoJSON1}
							features2={"type":"Feature","id": _id+1,"properties":{"name":'jumper',"poleno":currentpole,"prevpole":lastpole,"b4prevpole":prevpole,"type":typeJ,"dist":dist},"geometry":GeoJSON2}
							features3={"type":"Feature","id": _id+1,"properties":{"name":'jumper',"poleno":currentpole,"prevpole":lastpole,"b4prevpole":prevpole,"type":typeJ,"dist":dist},"geometry":GeoJSON3}
							overlays['jumper'].data.features.push(features1);
							overlays['jumper'].data.features.push(features2);
							overlays['jumper'].data.features.push(features3);
						}else{
							data.features.push(features1);
							data.features.push(features2);
							data.features.push(features3);
							overlays['jumper'] =createOverlays(data);	
						}
						//console.log(_id+1);		
							//} 
						//} 
						}/**/
						
						
						
				console.log(overlays);
				localStorage.setItem('overlays',JSON.stringify(overlays));
					
				UpdateOverlays('jumper');
				Overlays();
				//console.log(overlays);
			}
			var addDeadend=function(){
				//console.log(e_currentpole.target.feature.properties.poleno);
				var e_poleno=e_currentpole.target.feature.properties.poleno;
				var created=localStorage.getItem("unique_id");
				var _id=1;
				//const dType = String(Number($scope.pDtails.phase) + 1);
				const dType = $scope.pDtails.phase;
				const code = (dType === '1') ? 'pde' : 'sde';
				if(e_lastpole){bearingI= bearing([e_currentpole.latlng.lng,e_currentpole.latlng.lat],[e_lastpole.latlng.lng,e_lastpole.latlng.lat])};
				var GeoJSON=getPointGeoJSON(getPoint(15, bearingI, getPointGeoJSON([e_currentpole.latlng.lng,e_currentpole.latlng.lat])));
				var features={"type":"Feature","id": _id,"properties":{"name":'dead_end',"poleno":e_poleno,"prevpole":lastpole,"bearing":bearingI,"type":dType,"created":created,"code":code},"geometry":GeoJSON};
				var data ={"type":"FeatureCollection","features":[]}
				if(overlays['dead_end']!=null){
					_id=getMax(overlays['dead_end'].data.features, 'id')+1;
					features={"type":"Feature","id": _id,"properties":{"name":'dead_end',"poleno":e_poleno,"prevpole":lastpole,"bearing":bearingI,"type":dType,"created":created,"code":code},"geometry":GeoJSON};
					overlays['dead_end'].data.features.push(features);
				}else{
					data.features.push(features);
					overlays['dead_end'] =createOverlays(data);	
				}
				
				
				console.log(overlays);
				localStorage.setItem('overlays',JSON.stringify(overlays));
					
				UpdateOverlays('dead_end');
				Overlays();
				//console.log(overlays);
			}
			function calculateDerivedPosition(latlng, distanceMeters, bearingDegrees) {
			    const R = 6371000; // Radius of Earth in meters
			    const lat1 = latlng.lat * Math.PI / 180; // convert to radians
			    const lon1 = latlng.lng * Math.PI / 180;
			    const bearing = bearingDegrees * Math.PI / 180;
			
			    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(distanceMeters / R) +
			                  Math.cos(lat1) * Math.sin(distanceMeters / R) * Math.cos(bearing));
			
			    const lon2 = lon1 + Math.atan2(Math.sin(bearing) * Math.sin(distanceMeters / R) * Math.cos(lat1),
			                                   Math.cos(distanceMeters / R) - Math.sin(lat1) * Math.sin(lat2));
			
			    // convert back to degrees
			    return {
			        lat: lat2 * 180 / Math.PI,
			        lng: lon2 * 180 / Math.PI
			    };
			}

			$scope.clearDtails = function(){
				$scope.priassembly = "";
				$scope.secassembly = "";
				$scope.misc = "";
			}
			$scope.initialize=function (){ 
				$scope.instDate=moment();
				$http.get('Main?uname='+localStorage.getItem("str_name")).then(function mySuccs(response){
					$scope.Creator=JSON.parse(JSON.stringify(response.data))[0].phone;
				})
				$scope.Unique_id=$scope.Creator+$scope.instDate.format("YYMMDDHHmmss");
				$scope.Jo=$scope.instDate.format("YYMMDDHH")+'...';
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
			$scope.Item=function (i,jo){
				console.log(jo);
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
				
				
				$scope.Unique_id=$scope.sexy2[i].unique_id;
				$scope.Jo=jo;
				$scope.Members=$scope.sexy2[i].members;
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
				$scope.Gps=$scope.markerLat+ ","+$scope.markerLng;
				if(!$scope.markerStat){
					$scope.Gps=$scope.sexy2[i].latitude+","+$scope.sexy2[i].longitude;
				}
				$scope.markerStat=false;
				//$scope.Lat=$scope.sexy2[i].latitude;
				//$scope.Lon=$scope.sexy2[i].longitude;
				$scope.Lat=$scope.markerLat;
				$scope.Lon=$scope.markerLng;
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
				
				
				
				$scope.newType = function(x) {
					return (x.category === 'cause'& (x.serial_no.substr(0,3) === $scope.Type||x.serial_no==="00"));	
				}
			
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
				
		 		//$scope.Spinners=_newBrgys+_Brgys1+_Brgys2+_Crews1+_Status1+_Feeder+_Category+_Cause+_Equipment;
		 		//$scope.resultxx=$scope.Spinners;
			//$scope.resultxx=moment($scope.Followed1).format("MM/DD/YY");
			$scope.Spinners = (_newBrgys || (_newTown || "10")+"200") + (_Brgys1 || (_Towns1|| "10")+"200") + (_Brgys2 || (_Towns2|| "10")+"200") + 
  							  (_Crews1 || "700") + (_Status1 || "80") + (_Feeder || (_Substation || "90")+"100") + 
  							  (_Category || "200") + (_Cause || "300") + (_Equipment || "400");

			}
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
				$http.post('someservlet6',{"unique_id":$scope.Unique_id,"creator":$scope.Creator,"created":$scope.Created,
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
				$http.post('someservlet7?action=delete',{"unique_id":localStorage.getItem("unique_id"),"spinners":$scope.Spinners})
				.then(function mySuccs(response){
					$scope.open();
					$scope.testRun(0,0);
				})
				
			}
			$scope.deletePole=function (){ 
				$http.post('/Joblist/iGIS?table=deletePole',$scope.poleno)
				.then(function mySuccs(response){
					console.log(response);
					removeFeatureById('poles',getPoleID('poles',$scope.poleno))
					removeFeatureById('transformer',getPoleID('transformer',$scope.poleno))
					removeFeatureById('jumper',getPoleID('jumper',$scope.poleno))
					removeFeatureById('guy',getPoleID('guy',$scope.poleno))
					removeFeatureById('dead_end',getPoleID('dead_end',$scope.poleno))
					removeFeatureById('sdilines',getPoleID('sdilines',$scope.poleno))
				})
				
			}
			$scope.deleteLine=function (){ 
				
				$http.post('/Joblist/iGIS?table=deleteLine',$scope.poleno)
				.then(function mySuccs(response){
					console.log(response);
					var pID=getID('prilines',l_frompole,l_topole);
					var sID=getID('seclines',l_frompole,l_topole);
					if(pID!=null){removeFeatureById('prilines',[pID])}
					if(sID!=null){removeFeatureById('seclines',[sID])}
				})
				
			}
			$scope.deleteAss=function (id,table){ 
				console.log("feature:"+id+":"+table);
				/**/$http.post('/Joblist/iGIS?table=deleteAss',{id:id,table:table})
				.then(function mySuccs(response){
					console.log(getAssID(table,id));
					removeFeatureById(table,getAssID(table,id))
				})/**/
				
			}
/////////////modal

			$scope.table=null;
			var checkedPole=false;
			$scope.addPole=function(){
				setColor('addbuilding', 'white')
				if (!checkedPole){
				checkedPole=true;
				checkedBuilding=false;
				$scope.table='poles';
				setColor('addpole', 'green')
				}else{
				checkedPole=false;
				$scope.table=null;
				setColor('addpole', 'white')
				}
			}
			var checkedBuilding=false;
			$scope.addBuilding=function(){
				setColor('addpole', 'white')
				if (!checkedBuilding){
				checkedBuilding=true;
				checkedPole=false;
				$scope.table='buildings';
				setColor('addbuilding', 'green')
				}else{
				checkedBuilding=false;
				$scope.table=null;
				setColor('addbuilding', 'white')
				}
				//$scope.addSynergi();
			}
			$scope.addSynergi=function(center){	
				console.log('latitude:'+center.lat)	;
				console.log('longitude:'+center.lng);	
				overlays["syn_pole"] ={};	
				overlays["syn_line"] ={};					
				//const aliceDescendants = getDescendants("Alice" , familyTree,"Null" );//Charlie
				//console.log(aliceDescendants);
				//const table101 = 'converter.transcale_node("f1","F1T-CA1098", ST_GeomFromText("POINT(122.49662990086685 10.93847585419593)"), ST_GeomFromText("POINT(.00001 .00001)"))';
					const table1001 = 'converter.cad_upsert(ST_GeomFromText("POINT('+center.lng+' '+center.lat+')"), 1000)';
					//$http.get('/Joblist/iGIS',{params:{table:table1001,where:'false',limit:2000}}).then(function mySuccs(response){
					
					//});
					const table101 = 'converter.get_linegeometry(ST_GeomFromText("POINT('+center.lng+' '+center.lat+')"), 1000)';
					$http.get('/Joblist/iGIS',{params:{table:table101,where:'true',limit:2000}}).then(function mySuccs(response){
					if (response.data!=''){
						var asplanWKT=JSON.parse(JSON.stringify(response.data));
						
							var data ={"type":"FeatureCollection","features":[]}
							console.log(asplanWKT);								
						for (var i = 0; i < asplanWKT.length; i++) {
							//console.log(asplanWKT[i].pt.split(";")[1]);
							//GeoJSON=convertCRS(Terraformer.wktToGeoJSON(asplanWKT[i].geom.split(";")[1]));
							GeoJSON=Terraformer.wktToGeoJSON(asplanWKT[i].geom.split(";")[1]);
							var features={"type":"Feature","id": i,"properties":{"name":"syn_priline","poleno":asplanWKT[i].tonodeid},"geometry":GeoJSON}
							data.features.push(features);
							upsertItem(nodes, {'nodeid':asplanWKT[i].tonodeid,'geom':asplanWKT[i].geom.split(";")[1]}, 'nodeid');											
																
						}
						overlays["syn_line"] = createOverlays(data);
						console.log(overlays);
					}
					});
					const table102 = 'converter.get_gps(ST_GeomFromText("POINT('+center.lng+' '+center.lat+')"), 1000)';
					$http.get('/Joblist/iGIS',{params:{table:table102,where:'true',limit:2000}}).then(function mySuccs(response){
					if (response.data!=''){
						var asplanWKT=JSON.parse(JSON.stringify(response.data));
						
							var data ={"type":"FeatureCollection","features":[]}
							console.log(asplanWKT);								
						for (var i = 0; i < asplanWKT.length; i++) {
							//console.log(asplanWKT[i].pt.split(";")[1]);
							//GeoJSON=convertCRS(Terraformer.wktToGeoJSON(asplanWKT[i].geom.split(";")[1]));
							GeoJSON=Terraformer.wktToGeoJSON(asplanWKT[i].geom.split(";")[1]);
							var features={"type":"Feature","id": i,"properties":{"name":"syn_pole","poleno":asplanWKT[i].tonodeid},"geometry":GeoJSON}
							data.features.push(features);
							upsertItem(nodes, {'nodeid':asplanWKT[i].tonodeid,'geom':asplanWKT[i].geom.split(";")[1]}, 'nodeid');											
																
						}
						overlays["syn_nodes"] = createOverlays(data);
						console.log(overlays);
					}
					});
					
			}
function getDescendants(parent, children, target) {
  let descendants = [];

  children.forEach(child => {
    if (child.mother === parent || child.father === parent) {
      let descendant = {child };

      if (target && child.mother === target) {
        return;
      }

      descendant.children = getDescendants(child.name, children, target);

      descendants.push(descendant);
    }
  });

  return descendants;
}


const familyTree = [
  {
    name: "Alice",
    mother: null
  },
  {
    name: "Bob",
    mother: "Alice"
  },
  {
    name: "Charlie",
    mother: "Bob"
  },
  {
    name: "Dave",
    mother: "Bob"
  },
  {
    name: "Eve",
    mother: "Alice"
  },
  {
    name: "Frank",
    mother: "Charlie"
  }
];
		



			$scope.clearLat=function(){
				localStorage.setItem('unique_id',null);
				localStorage.setItem('gps_lat',null);
				localStorage.setItem('gps_lon',null);
			}
			function setColor(btn, color) {
		        var property = document.getElementById(btn);
		       
		            property.style.backgroundColor = color;
		        
		    }
			function bearing(start, dest){
			  var startLat = toRadians(start[1]);
			  var startLng = toRadians(start[0]);
			  var destLat = toRadians(dest[1]);
			  var destLng = toRadians(dest[0]);
			
			  y = Math.sin(destLng - startLng) * Math.cos(destLat);
			  x = Math.cos(startLat) * Math.sin(destLat) -
			        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
			  brng = Math.atan2(y, x);
			  brng = toDegrees(brng);
			  return (brng + 360) % 360;
			}
			function AddObject(e,table){
				var lat=(e.latlng.lat-10)*1000000;
        			var lng=(e.latlng.lng-122)*1000000;
					var poleno=''+Math.trunc(lat)+Math.trunc(lng);
					var created=localStorage.getItem("unique_id");
					var _id=1;
					switch (table){
						case 'poles':
							var features={"type":"Feature","id": _id,"properties":{"name":table,"poleno":poleno,"oldpoleno":"","created":created,"priassembly":"","secassembly":"","ptype":"Steel","pclass":"Bare-3.5mm","pheight":"35ft","existing":false},"geometry":{type: 'Point', coordinates: [e.latlng.lng, e.latlng.lat]}}
							var data ={"type":"FeatureCollection","features":[]}
							if(overlays[table]!=null){
								_id=getMax(overlays[table].data.features, 'id')+1;
								features={"type":"Feature","id": _id,"properties":{"name":table,"poleno":poleno,"oldpoleno":"","created":created,"priassembly":"","secassembly":"","ptype":"Steel","pclass":"Bare-3.5mm","pheight":"35ft","existing":false},"geometry":{type: 'Point', coordinates: [e.latlng.lng, e.latlng.lat]}}
								overlays[table].data.features.push(features);
							}else{
								data.features.push(features);
								overlays[table] =createOverlays(data);	
							}
						break;
						case 'buildings':
							var features={"type":"Feature","id": _id,"properties":{"name":table,"poleno":poleno,"created":created},"geometry":{type: 'Point', coordinates: [e.latlng.lng, e.latlng.lat]}}
							var data ={"type":"FeatureCollection","features":[]}
							if(overlays[table]!=null){
								_id=getMax(overlays[table].data.features, 'id')+1;
								features={"type":"Feature","id": _id,"properties":{"name":table,"poleno":poleno,"created":created},"geometry":{type: 'Point', coordinates: [e.latlng.lng, e.latlng.lat]}}
								overlays[table].data.features.push(features);
							}else{
								data.features.push(features);
								overlays[table] =createOverlays(data);	
							}
						break;
					}
					var geojson=invert([e.latlng.lng,e.latlng.lat]);
					var asplanWKT={"miscellaneous":" ","poleno":poleno,"created":created,"_id":_id,"geom":'POINT('+geojson[0]+' '+geojson[1]+')',"secassembly":"","priassembly":""}
							
					upsertItem(nodes, {'nodeid':poleno,'geom':asplanWKT.geom}, 'nodeid');											
											
					//localStorage.setItem(poleno,JSON.stringify(asplanWKT));					
					localStorage.setItem('overlays',JSON.stringify(overlays));
						
					UpdateOverlays(table);
					Overlays();
					console.log(nodes);
			}
			function getPoleID(table, poleno) {
			    const results = [];
			
			    if (table in overlays &&
			    overlays[table] &&
			    overlays[table].data &&
			    overlays[table].data.features) {
			
			    	for (var i = 0; i < overlays[table].data.features.length; i++) {
			        var feature = overlays[table].data.features[i];
			
				        if (feature &&
				            feature.properties &&
				            feature.properties.poleno === poleno) {
				
				            results.push(i);
				        }
				    }
				}

			
			    return results; // empty array if none found
			}

			function getAssID(table, id) {
			    const results = [];
			
			    if (table in overlays &&
			    overlays[table] &&
			    overlays[table].data &&
			    overlays[table].data.features) {
			
			    	for (var i = 0; i < overlays[table].data.features.length; i++) {
				console.log("xxxx");
			        var feature = overlays[table].data.features[i];
			console.log(i);
				        if (feature &&
				            feature.id === id) {
				
				            results.push(i);
				        }
				    }
				}

			
			    return results; // empty array if none found
			}

			function getID(table, frompole,topole) {
				if (table in overlays){
					for (let i = 0; i < overlays[table].data.features.length; i++) {
				        const feature = overlays[table].data.features[i];
				        if (feature.properties && feature.properties.frompole === frompole && feature.properties.topole === topole) {
				            return i;
				        }
						if (feature.properties && feature.properties.frompole === topole && feature.properties.topole === frompole) {
				            return i;
				        }
					}
			    }
				return null;
			}
			function getWireIndexBySize(arr, wireSize) {
			    return arr.findIndex(item => item.wire_size === wireSize);
			}
			

			function getRankOverlay(arr, id) {
			    const item = arr.find(o => o.id === id);
			    if (!item) return 0;
			
			    const filtered = arr
			        .filter(o => o.properties.type === item.properties.type && o.properties.poleno === item.properties.poleno)
			        .sort((a, b) => a.id - b.id);
			
			    return (filtered.findIndex(o => o.id === id)/3)+1;
			}
			function getRank(arr, id) {
			    const item = arr.find(o => o._id === id);
			    if (!item) return 0;
			
			    const filtered = arr
			        .filter(o => o.type === item.type && o.poleno === item.poleno)
			        .sort((a, b) => a._id - b._id);
			
			    return filtered.findIndex(o => o._id === id) + 1;
			}
			function getMaxRank(features, typeVal, polenoVal) {
			    return features.filter(f => 
		        f.properties.type === String(typeVal) &&
		        f.properties.poleno === String(polenoVal)
		    	).length/3;
			}


			function getMax(arr, prop) {
			    var max;
			    for (var i=0 ; i<arr.length ; i++) {
			        if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
			            max = arr[i];
			    }
			    return max[prop];
			}
			function findIndexByPoleno(geoJsonData, targetPoleno) {
			    if (!geoJsonData || !geoJsonData.data || !geoJsonData.data.features) {
			        return -1; // invalid data
			    }
			
			    return geoJsonData.data.features.findIndex(feature => feature.properties.poleno === targetPoleno);
			}


			function getMaxIdByType(arr, prop, type) {
			    var max;
				var maxid=0;
			    for (var i = 0; i < arr.length; i++) {
				console.log(arr[i].properties.type);
			        if (arr[i].properties.type === type) {
			            if (max == null ||parseInt(arr[i][prop]) > parseInt(max[prop])) {
			                max = arr[i];
							maxid=max[prop];
			            }
			        }
			    }
				console.log(maxid);
			    return maxid;
			}

			function PointToLayer(feature, latlng) {
                var smallIcon = L.icon({
	                      iconSize: getIconSize(feature),
	                      iconAnchor: getIconAnchor(feature),
	                      popupAnchor:  [1, -24],
						  iconUrl: getIcon(feature)
			   });
													
			   return L.marker(latlng, {icon: smallIcon, rotationAngle:getRotationAngle(feature),draggable: 'true'});
           }
			function UpdateBearing(table){
				var len=overlays[table].data.features.length;
				
				for(var i=0;i<len;i++){
					var poleno=overlays[table].data.features[i].properties.poleno;
					if(poleno==$scope.objectProp.poleno){
						overlays[table].data.features[i].properties.bearing=objectBearing;
					}
				 									
				}
				//console.log(overlays);
				localStorage.setItem('overlays',JSON.stringify(overlays));
				UpdateOverlays(table);
				Overlays();
			}
			$scope.existLine=false;
			$scope.AddLine=function(table){
					var pdtls0=nodes.filter(obj => obj.nodeid === currentpole)[0];															
					var point0=convertCRS(Terraformer.wktToGeoJSON(pdtls0.geom));
					if(table!='sdilines'){
						var pdtls1=nodes.filter(obj => obj.nodeid === lastpole)[0];															
						var point1=convertCRS(Terraformer.wktToGeoJSON(pdtls1.geom));
						var geojson=geoJsonMLineString([[[point0.coordinates[0],point0.coordinates[1]],[point1.coordinates[0],point1.coordinates[1]]]]);						
						var S=Math.round(getDistance(point0.coordinates,point1.coordinates)*100)/100;
					}else{
						geojson=geoJsonMLineString([[[lngg,latt],[point0.coordinates[0],point0.coordinates[1]]]]);
						S=Math.round(getDistance(point0.coordinates,[lngg,latt])*100)/100;
					}
					//var geojson=geoJsonMLineString([[[e_lastpole.latlng.lng,e_lastpole.latlng.lat],[e_currentpole.latlng.lng,e_currentpole.latlng.lat]]]);						
					var created=localStorage.getItem("unique_id");
					var _id=1;
					switch(table){
						case 'prilines':
							var features={"type":"Feature","id": _id,"properties":{"name":table,"bearing":180, "topole":currentpole,"frompole":lastpole,"created":created,"size":"2/0 ACSR","neutral":"2/0 ACSR","length":S,"phase":"ABCN","inclination":0,"existing":$scope.existLine},"geometry":geojson}
							var data ={"type":"FeatureCollection","features":[]}
							if(overlays[table]!=null){
								_id=getMax(overlays[table].data.features, 'id')+1;
								features={"type":"Feature","id": _id,"properties":{"name":table,"bearing":180, "topole":currentpole,"frompole":lastpole,"created":created,"size":"2/0 ACSR","neutral":"2/0 ACSR","length":S,"phase":"ABCN","inclination":0,"existing":$scope.existLine},"geometry":geojson}
								overlays[table].data.features.push(features);
							}else{
								data.features.push(features);
								overlays[table] =createOverlays(data);	
							}
						break;
						case 'seclines':
							var features={"type":"Feature","id": _id,"properties":{"name":table,"bearing":180, "topole":currentpole,"frompole":lastpole,"created":created,"size":"2/0 ACSR","neutral":"2/0 ACSR","length":S,"phase":"ABCN","inclination":0,"existing":$scope.existLine},"geometry":geojson}
							var data ={"type":"FeatureCollection","features":[]}
							if(overlays[table]!=null){
								_id=getMax(overlays[table].data.features, 'id')+1;
								features={"type":"Feature","id": _id,"properties":{"name":table,"bearing":180, "topole":currentpole,"frompole":lastpole,"created":created,"size":"2/0 ACSR","neutral":"2/0 ACSR","length":S,"phase":"ABCN","inclination":0,"existing":$scope.existLine},"geometry":geojson}
								overlays[table].data.features.push(features);
							}else{
								data.features.push(features);
								overlays[table] =createOverlays(data);	
							}
						break;
						case 'sdilines':
							var features={"type":"Feature","id": _id,"properties":{"name":table,"bearing":180, "topole":sdipole,"frompole":currentpole,"created":created,"size":$scope.cWire,"phase":"ABCN","inclination":0,"existing":$scope.existLine},"geometry":geojson}
							var data ={"type":"FeatureCollection","features":[]}
							if(overlays[table]!=null){
								_id=getMax(overlays[table].data.features, 'id')+1;
								features={"type":"Feature","id": _id,"properties":{"name":table,"bearing":180, "topole":sdipole,"frompole":currentpole,"created":created,"size":$scope.cWire,"phase":"ABCN","inclination":0,"existing":$scope.existLine},"geometry":geojson}
								overlays[table].data.features.push(features);
							}else{
								data.features.push(features);
								overlays[table] =createOverlays(data);	
							}
						break;
					}
					
					console.log(overlays);
					localStorage.setItem('overlays',JSON.stringify(overlays));
						
					UpdateOverlays(table);
					Overlays();
					console.log(overlays);
			}
			var tableName;
			var poleno0;
			var jsw=0;
			function UpdatePoleCoord(e, table, startLatLng){
				
				//console.log(e);
				if(table in overlays){
					var len=overlays[table].data.features.length;
					var frompole;
					var topole;
					var guyType;
					var guyArray;
					var j;
					tableName=e.target.feature.properties.name;
					var gId=e.target.feature.id;
					poleno0=e.target.feature.properties.poleno;
					var guybearing;								
							
					if(tableName=='guy'){
						guyArray=overlays['guy'].data.features;					
						guyType=e.target.feature.properties.type;
						j=guyArray.findIndex(obj => obj.properties.type === 1 && obj.properties.poleno===poleno0 && obj.id===gId);
						console.log("j:"+j);
						//console.log('sfsf::'+guyArray.findIndex(obj => obj.properties.type === 1 ||obj.properties.poleno===poleno0));
					}
					
					if(tableName!='guy'){
					var pdtls0=nodes.filter(obj => obj.nodeid === poleno0)[0];
					var geojson=invert([e.target._latlng.lng,e.target._latlng.lat]);
							pdtls0['geom']='POINT('+geojson[0]+' '+geojson[1]+')';
						upsertItem(nodes, {'nodeid':pdtls0.nodeid,'geom':pdtls0.geom}, 'nodeid');		
					}
					//var pdtls0=JSON.parse(localStorage.getItem(poleno0));
					var distx=startLatLng.lng-e.target._latlng.lng;
					var disty=startLatLng.lat-e.target._latlng.lat;
					for(var i=0;i<len;i++){
						//console.log(overlays[table].data.features[i].properties);
						frompole=overlays[table].data.features[i].properties.frompole;
						topole=overlays[table].data.features[i].properties.topole;
						poleno=overlays[table].data.features[i].properties.poleno;		
						//console.log('frompole:'+frompole+':topole:'+topole+':poleno:'+poleno);	
						var point;
					    var pdtls;
						
						if(frompole==poleno0 && (tableName=='poles'||tableName=='buildings')||tableName=='transformer'){
							//pdtls=JSON.parse(localStorage.getItem(topole));
							pdtls=nodes.filter(obj => obj.nodeid === topole)[0];															
							//console.log(pdtls);						
						    point=convertCRS(Terraformer.wktToGeoJSON(pdtls.geom));
							overlays[table].data.features[i].geometry.coordinates=[[[e.target._latlng.lng,e.target._latlng.lat],[point.coordinates[0],point.coordinates[1]]]]
																			
							}
						
						if(topole==poleno0 && (tableName=='poles'||tableName=='buildings')||tableName=='transformer'){
							//pdtls=JSON.parse(localStorage.getItem(frompole));
							pdtls=nodes.filter(obj => obj.nodeid === frompole)[0];
							point=convertCRS(Terraformer.wktToGeoJSON(pdtls.geom));						
							overlays[table].data.features[i].geometry.coordinates=[[[point.coordinates[0],point.coordinates[1]],[e.target._latlng.lng,e.target._latlng.lat]]]
																
							
						}
						//pdtls0=JSON.parse(localStorage.getItem(poleno0));
						/**/
						//pdtls0=nodes.filter(obj => obj.nodeid === poleno0)[0];					    
						//point0=convertCRS(Terraformer.wktToGeoJSON(pdtls0.geom));					
						var affectedPoles=false;
						if (poleno0==poleno||poleno0==overlays[table].data.features[i].properties.prevpole||poleno0==overlays[table].data.features[i].properties.b4prevpole){
							affectedPoles=true;
						}
						if(overlays[table].name=='prilines'||overlays[table].name=='seclines'||overlays[table].name=='sdilines'||poleno0==frompole||poleno0==topole){	
							var fromdtls=nodes.filter(obj => obj.nodeid === frompole)[0];
							var frompoint=convertCRS(Terraformer.wktToGeoJSON(fromdtls.geom));
							var todtls=nodes.filter(obj => obj.nodeid === topole)[0];
							var topoint=convertCRS(Terraformer.wktToGeoJSON(todtls.geom));	
							var x=getDistance(frompoint.coordinates,topoint.coordinates)
							var a=overlays[table].data.features[i].properties.inclination;
							
							console.log(overlays[table].data.features[i].properties.inclination);
							overlays[table].data.features[i].properties.length=Math.round(x*100/Math.cos(toRadians(a)))/100;
						}
						//console.log(affectedPoles);
						   if(affectedPoles){
							
							if((overlays[table].name=='poles'||overlays[table].name=='transformer'||overlays[table].name=='buildings') && overlays[table].data.features[i].properties.poleno==poleno0 && (tableName == 'poles'||tableName == 'transformer'||tableName == 'buildings')){// 								
								overlays[table].data.features[i].geometry.coordinates=[e.target._latlng.lng,e.target._latlng.lat];	//[ln-distx,lt-disty];//							
									//var pdtls={};	
									var ln=overlays[table].data.features[i].geometry.coordinates[0];
									var lt=overlays[table].data.features[i].geometry.coordinates[1];
								    var geojson=invert([ln-distx,lt-disty]);//					
									//pdtls['geom']='POINT('+geojson[0]+' '+geojson[1]+')';
									//upsertItem(nodes, {'nodeid':poleno,'geom':pdtls.geom}, 'nodeid');
							}
							if(overlays[table].name=='guy' && overlays[table].data.features[i].properties.poleno==poleno0)	{
								   
									//overlays[table].data.features[i].geometry.coordinates=[ln-distx,lt-disty];//							
								switch(guyType){
									case 1:
										if(overlays[table].data.features[i].geometry.type=='Point' && overlays[table].data.features[i].properties.type==1 && overlays[table].data.features[i].id===gId){							
											
											overlays[table].data.features[i].geometry.coordinates=[e.target._latlng.lng,e.target._latlng.lat];		
										}
										if(overlays[table].data.features[i].geometry.type=='LineString' && overlays[table].data.features[i].id===gId){
											var lnn=overlays[table].data.features[i].geometry.coordinates.length;
											
											if(lnn==2){
												var ln0=overlays[table].data.features[i].geometry.coordinates[0][0];
												var lt0=overlays[table].data.features[i].geometry.coordinates[0][1];
												var ln1=overlays[table].data.features[i].geometry.coordinates[1][0];
												var lt1=overlays[table].data.features[i].geometry.coordinates[1][1];
												overlays[table].data.features[i].geometry.coordinates=[[ln0,lt0],[e.target._latlng.lng,e.target._latlng.lat]];
												guybearing=bearing([ln0,lt0],[e.target._latlng.lng,e.target._latlng.lat]);
											console.log('case1 ln2:'+guybearing);	
											}
											if(lnn==3){
												var ln0=overlays[table].data.features[i].geometry.coordinates[0][0];
												var lt0=overlays[table].data.features[i].geometry.coordinates[0][1];
												var ln1=overlays[table].data.features[i].geometry.coordinates[1][0];
												var lt1=overlays[table].data.features[i].geometry.coordinates[1][1];
												var ln2=overlays[table].data.features[i].geometry.coordinates[2][0];
												var lt2=overlays[table].data.features[i].geometry.coordinates[2][1];
												overlays[table].data.features[i].geometry.coordinates=[[ln0,lt0],[ln1,lt1],[e.target._latlng.lng,e.target._latlng.lat]];
												guybearing=bearing([ln1,lt1],[e.target._latlng.lng,e.target._latlng.lat]);
											console.log('case1 ln3:'+guybearing);	
											}	
										}
									break;
									case 2:
										if(overlays[table].data.features[i].geometry.type=='Point' && overlays[table].data.features[i].properties.type==2 && overlays[table].data.features[i].id===gId){							
											overlays[table].data.features[i].geometry.coordinates=[e.target._latlng.lng,e.target._latlng.lat];	
										}
										if(overlays[table].data.features[i].geometry.type=='LineString' && overlays[table].data.features[i].id===gId){
											var lnn=overlays[table].data.features[i].geometry.coordinates.length;
											
											if(lnn==2){
												var ln0=overlays[table].data.features[i].geometry.coordinates[0][0];
												var lt0=overlays[table].data.features[i].geometry.coordinates[0][1];
												var ln1=overlays[table].data.features[i].geometry.coordinates[1][0];
												var lt1=overlays[table].data.features[i].geometry.coordinates[1][1];
												overlays[table].data.features[i].geometry.coordinates=[[ln0,lt0],[ln1,lt1]];
												guybearing=bearing([e.target._latlng.lng,e.target._latlng.lat],[ln1,lt1]);
											console.log('case2 ln2:'+guybearing);	
											}
											if(lnn==3){
												var ln0=overlays[table].data.features[i].geometry.coordinates[0][0];
												var lt0=overlays[table].data.features[i].geometry.coordinates[0][1];
												var ln1=overlays[table].data.features[i].geometry.coordinates[1][0];
												var lt1=overlays[table].data.features[i].geometry.coordinates[1][1];
												var ln2=overlays[table].data.features[i].geometry.coordinates[2][0];
												var lt2=overlays[table].data.features[i].geometry.coordinates[2][1];
												overlays[table].data.features[i].geometry.coordinates=[[ln0,lt0],[e.target._latlng.lng,e.target._latlng.lat],[ln2,lt2]];
												guybearing=bearing([e.target._latlng.lng,e.target._latlng.lat],[ln2,lt2]);
											console.log('case2 ln3:'+guybearing);	
											}	
										}
									break;
									default:
										if(overlays[table].data.features[i].geometry.type=='Point'){							
											
											var ln=overlays[table].data.features[i].geometry.coordinates[0];
											var lt=overlays[table].data.features[i].geometry.coordinates[1];
											overlays[table].data.features[i].geometry.coordinates=[ln-distx,lt-disty];								
										}
										if(overlays[table].data.features[i].geometry.type=='LineString'){
											var lnn=overlays[table].data.features[i].geometry.coordinates.length;
											
											if(lnn==2){
												var ln0=overlays[table].data.features[i].geometry.coordinates[0][0];
												var lt0=overlays[table].data.features[i].geometry.coordinates[0][1];
												var ln1=overlays[table].data.features[i].geometry.coordinates[1][0];
												var lt1=overlays[table].data.features[i].geometry.coordinates[1][1];
												overlays[table].data.features[i].geometry.coordinates=[[ln0-distx,lt0-disty],[ln1-distx,lt1-disty]];
											}
											if(lnn==3){
												var ln0=overlays[table].data.features[i].geometry.coordinates[0][0];
												var lt0=overlays[table].data.features[i].geometry.coordinates[0][1];
												var ln1=overlays[table].data.features[i].geometry.coordinates[1][0];
												var lt1=overlays[table].data.features[i].geometry.coordinates[1][1];
												var ln2=overlays[table].data.features[i].geometry.coordinates[2][0];
												var lt2=overlays[table].data.features[i].geometry.coordinates[2][1];
												overlays[table].data.features[i].geometry.coordinates=[[ln0-distx,lt0-disty],[ln1-distx,lt1-disty],[ln2-distx,lt2-disty]];
											}	
										}
									break;
									
								}
								console.log(guybearing);									
							}
							if(tableName=='guy' && table=='guy'){
								console.log('jjjjj:'+j);
								console.log('bearing:'+guybearing);
								overlays['guy'].data.features[j].properties.bearing=180-guybearing;											
							}
							if(overlays[table].name=='dead_end')	{ //&& overlays[table].data.features[i].properties.poleno==poleno
								if(overlays[table].data.features[i].geometry.type=='Point'){	
									//var pdtls=JSON.parse(localStorage.getItem(poleno));
									var pdtls=nodes.filter(obj => obj.nodeid === poleno)[0];
							    	var point=convertCRS(Terraformer.wktToGeoJSON(pdtls.geom));	
									//var pdtls1=JSON.parse(localStorage.getItem(overlays[table].data.features[i].properties.prevpole));
							    	var pdtls1=nodes.filter(obj => obj.nodeid === overlays[table].data.features[i].properties.prevpole)[0];
									var point1=convertCRS(Terraformer.wktToGeoJSON(pdtls1.geom));		
									
									var bearingI= bearing([point.coordinates[0],point.coordinates[1]],[point1.coordinates[0],point1.coordinates[1]]);
									var GeoJSON=getPointGeoJSON(getPoint(15, bearingI, getPointGeoJSON([point.coordinates[0],point.coordinates[1]])));
										overlays[table].data.features[i].geometry.coordinates=GeoJSON.coordinates;								
										overlays[table].data.features[i].properties.bearing=bearingI;								
								}
								
							}
							//var sw=0;
							//var jId1=0;
							if(overlays[table].name=='jumper')	{//&& overlays[table].data.features[i].properties.poleno==poleno0
								console.log('i:'+i);
								var jId2=overlays[table].data.features[i].id;
								//var pdtls=JSON.parse(localStorage.getItem(poleno));
								var pdtls=nodes.filter(obj => obj.nodeid === poleno)[0];
							    	
							    var point=convertCRS(Terraformer.wktToGeoJSON(pdtls.geom));								
								//var pdtls1=JSON.parse(localStorage.getItem(overlays[table].data.features[i].properties.prevpole));
						    	var pdtls1=nodes.filter(obj => obj.nodeid === overlays[table].data.features[i].properties.prevpole)[0];
							    var point1=convertCRS(Terraformer.wktToGeoJSON(pdtls1.geom));		
								var bearingI1= bearing([point.coordinates[0],point.coordinates[1]],[point1.coordinates[0],point1.coordinates[1]]);
								//var pdtls2=JSON.parse(localStorage.getItem(overlays[table].data.features[i].properties.b4prevpole));
						    	var pdtls2=nodes.filter(obj => obj.nodeid === overlays[table].data.features[i].properties.b4prevpole)[0];
							    var point2=convertCRS(Terraformer.wktToGeoJSON(pdtls2.geom));		
								var bearingI2= bearing([point.coordinates[0],point.coordinates[1]],[point2.coordinates[0],point2.coordinates[1]]);
								//var dist=overlays[table].data.features[i].properties.dist;
								var delta;var echo;
								if (bearingI1-bearingI2>0){
						            delta=bearingI2;
						            echo=bearingI1;
						        }else{
						            delta=bearingI1;
						            echo=bearingI2;
						        }
								var foxtrot=echo-delta;
								if(foxtrot>180) {				
									foxtrot=360-echo+delta;
								} 
								const div=3;
				        		//const dist=(echo+foxtrot)/div;
								//const dist=10+10*jId2;
								const dist=10+10*getRankOverlay(overlays[table].data.features,jId2);
								console.log(getRankOverlay(overlays[table].data.features,jId2));
								//if(jId2==jId1){
								jsw=jsw+1;
								//} else{sw=1;}
								//jId1=jId2;
								//console.log(sw);
								switch(jsw){
									case 1:
										if(overlays[table].data.features[i].geometry.type=='LineString'){	
																			
											var GeoJSON=arc(getPointGeoJSON([point.coordinates[0],point.coordinates[1]]),bearingI1,bearingI2,dist);//console.log(overlays[table].data);
											overlays[table].data.features[i].geometry.coordinates=GeoJSON.coordinates;								
										}
										break;
									case 2:
										if(overlays[table].data.features[i].geometry.type=='Point'){	
											var GeoJSON=getPointGeoJSON(getPoint(dist, bearingI1, getPointGeoJSON([point.coordinates[0],point.coordinates[1]])));
											//console.log(overlays[table].data);
											overlays[table].data.features[i].geometry.coordinates=GeoJSON.coordinates;								
										}
										break;
									case 3:
										if(overlays[table].data.features[i].geometry.type=='Point'){	
												
											var GeoJSON=getPointGeoJSON(getPoint(dist, bearingI2, getPointGeoJSON([point.coordinates[0],point.coordinates[1]])));
											//console.log(overlays[table].data);
											overlays[table].data.features[i].geometry.coordinates=GeoJSON.coordinates;								
										}
										break;
									
								}
								if (jsw==3){jsw=0};
							}
						
						}	
						/**/				
					}
					
					//console.log(overlays);
					localStorage.setItem('overlays',JSON.stringify(overlays));
					UpdateOverlays(table);
					Overlays();
				}
			}
			proj4.defs("EPSG:32651","+proj=utm +zone=51 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ");
			var invert = function(geojson){
			  	var point = proj4('EPSG:4326','EPSG:32651').forward(geojson);
					geojson = [point[0], point[1]];
			 	return geojson;
			}
			function geoJSONToWKT(geometry) {
			    // Define projection
			    const sourceCRS = "EPSG:4326";
			    const targetCRS = "+proj=utm +zone=51 +datum=WGS84 +units=m +no_defs";
			
			    // Project a single coordinate
			    const projectCoord = ([lon, lat]) => {
			        const [x, y] = proj4(sourceCRS, targetCRS, [lon, lat]);
			        return [x.toFixed(8), y.toFixed(8)];
			    };
			
			    // Format a projected coordinate
			    const formatCoord = (coord) => projectCoord(coord).join(' ');
			
			    // Format arrays
			    const formatCoords = (coords) => coords.map(formatCoord).join(', ');
			    const formatNestedCoords = (nested) => nested.map(ring => `(${formatCoords(ring)})`).join(', ');
			    const formatMultiNestedCoords = (multi) => multi.map(polygon => `(${formatNestedCoords(polygon)})`).join(', ');
			
			    switch (geometry.type) {
			        case 'Point':
			            return `POINT(${formatCoord(geometry.coordinates)})`;
			
			        case 'MultiPoint':
			            return `MULTIPOINT(${geometry.coordinates.map(c => `(${formatCoord(c)})`).join(', ')})`;
			
			        case 'LineString':
			            return `LINESTRING(${formatCoords(geometry.coordinates)})`;
			
			        case 'MultiLineString':
			            return `MULTILINESTRING(${geometry.coordinates.map(line => `(${formatCoords(line)})`).join(', ')})`;
			
			        case 'Polygon':
			            return `POLYGON(${formatNestedCoords(geometry.coordinates)})`;
			
			        case 'MultiPolygon':
			            return `MULTIPOLYGON(${formatMultiNestedCoords(geometry.coordinates)})`;
			
			        case 'GeometryCollection':
			            return `GEOMETRYCOLLECTION(${geometry.geometries.map(geoJSONToWKTProjected).join(', ')})`;
			
			        default:
			            throw new Error(`Unsupported geometry type: ${geometry.type}`);
			    }
			}

			var geoJsonMLineString = function(geojsonLineString) {
			    // No need to modify the structure unless transforming coordinates
			    return {
			        type: "MultiLineString",
			        coordinates: geojsonLineString
			    };
			};
			var geoJsonLineString = function(geojsonLineString) {
			    // No need to modify the structure unless transforming coordinates
			    return {
			        type: "LineString",
			        coordinates: geojsonLineString
			    };
			};


			function UpdateOverlays(table){	
				//delete $scope.layers.overlays[table];
				var overLays=JSON.parse(localStorage.getItem('overlays'));
				//$http.get('/Joblist/iGIS',{params:{table:'poles',where:'true',limit:1}}).then(function mySuccs(response){								
					overlays[table] = createOverlays(overLays[table].data);						
				//});
				//$scope.layers.overlays[table].doRefresh=true;
			}
			function removeFeatureById(table, ids) {
			    console.log(table + ":", ids);
			
			    if (!Array.isArray(ids) ||
				    !overlays[table] ||
				    !overlays[table].data ||
				    !overlays[table].data.features) {
				    return;
				}

			
			    const features = overlays[table].data.features;
			
			    // Sort descending to avoid index shifting
			    ids.sort((a, b) => b - a);
			
			    ids.forEach(id => {
			        if (id >= 0 && id < features.length) {
			            features.splice(id, 1);
			        }
			    });
			
			    // If no features left, remove the whole overlay
			    if (features.length === 0) {
			        delete overlays[table];
			    } else {
			        overlays[table].doRefresh = true;
			    }
			
			    console.log(overlays);
			}


			function sleep(ms) {
				  return new Promise(resolve => setTimeout(resolve, ms));
			}
			
			// Converts from degrees to radians.
			function toRadians(degrees) {
			  return degrees * Math.PI / 180;
			};
			 
			// Converts from radians to degrees.
			function toDegrees(radians) {
			  return radians * 180 / Math.PI;
			}
			function getDistance(coord1, coord2) {
			  const R = 6371000; // Radius of Earth in meters
			  const toRad = deg => deg * Math.PI / 180;
			
			  const lat1 = toRad(coord1[1]);
			  const lon1 = toRad(coord1[0]);
			  const lat2 = toRad(coord2[1]);
			  const lon2 = toRad(coord2[0]);
			
			  var dLat = lat2 - lat1;
			  var dLon = lon2 - lon1;
			
			  var a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dLon / 2), 2);
			
			  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			
			  return R * c; // Distance in meters
			}

			
			function getMultiLineLength(feature) {
			  if (feature.geometry.type !== "MultiLineString") return 0;
			
			  let total = 0;
			  for (const line of feature.geometry.coordinates) {
			    for (let i = 0; i < line.length - 1; i++) {
			      total += getDistance(line[i], line[i + 1]);
			    }
			  }
			  return total;
			}
			
			var multiline = function(points) {				
			   return {"type": "LineString", "coordinates": points};
			}
			var getLatlng = function(geojson) {				
			   return [geojson.coordinates[0], geojson.coordinates[1]]; 
			}
			var getPointGeoJSON = function(latlng) {				
			   return {
					     "type": "Point",
					     "coordinates": [latlng[0], latlng[1]]
					  }
			}
			var arc = function(geom,alpha,beta,dist) {
				var geomCircle=[];
				var delta;
				var echo;
				if (alpha-beta>0){
		            delta=beta;
		            echo=alpha;
		        }else{
		            delta=alpha;
		            echo=beta;
		        }
				var foxtrot=echo-delta;
        		if(foxtrot<=180) {				
					 for (var i=delta; i <= echo; i++) {
						//geomCircle.push(getPoint((echo+foxtrot)/div,i,geom));
						geomCircle.push(getPoint(dist,i,geom));
					 }
				} else{
            		foxtrot=360-echo+delta;
					for (var i=echo; i <= 360; i++) {
						//geomCircle.push(getPoint((echo+foxtrot)/div,i,geom));
						geomCircle.push(getPoint(dist,i,geom));
					}
					for (var i=0; i <= delta; i++) {
						//geomCircle.push(getPoint((echo+foxtrot)/div,i,geom));
						geomCircle.push(getPoint(dist,i,geom));
					}
				}
			   return {"type": "LineString", "coordinates": geomCircle};
			}
			
			var getPoint =function (d, bearing, center) {
				
			    var R = 6371000;   
				var lat1=center.coordinates[1]*(Math.PI / 180);
				var lon1=center.coordinates[0]*(Math.PI / 180);
				var angularDistance = d / R;
				var trueCourse = bearing*(Math.PI / 180);
				
		        var lat2 = Math.asin( Math.sin(lat1) * Math.cos(angularDistance) + Math.cos(lat1) * Math.sin(angularDistance)* Math.cos(trueCourse));
				var dlon = Math.atan2(Math.sin(trueCourse) * Math.sin(angularDistance)* Math.cos(lat1),Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2));
		        
				var lon2= ((lon1 + dlon + Math.PI) % (Math.PI * 2)) - Math.PI;
      		   		
			
				return [lon2*(180/Math.PI), lat2*(180/Math.PI)]; 
			};	
			var convertCRS = function(asplanWKT) {
				if (!asplanWKT || !asplanWKT.coordinates) {
					console.warn("Invalid geometry passed to convertCRS:", asplanWKT);
					return null;
				}
			
				proj4.defs("EPSG:32651", "+proj=utm +zone=51 +ellps=WGS84 +datum=WGS84 +units=m +no_defs");
			
				var convert1 = function(geojson) {
					var point = proj4('EPSG:32651', 'EPSG:4326').forward(geojson);
					return [point[0], point[1]];
				};
			
				var convert2 = function(geojson) {
					return geojson.map(coord => {
						var point = proj4('EPSG:32651', 'EPSG:4326').forward(coord);
						return [point[0], point[1]];
					});
				};
			
				var convert3 = function(geojson) {
					return geojson.map(ring => ring.map(coord => {
						var point = proj4('EPSG:32651', 'EPSG:4326').forward(coord);
						return [point[0], point[1]];
					}));
				};
			
				if (!isNaN(asplanWKT.coordinates[0])) {
					asplanWKT.coordinates = convert1(asplanWKT.coordinates);
				} else if (!isNaN(asplanWKT.coordinates[0][0])) {
					asplanWKT.coordinates = convert2(asplanWKT.coordinates);
				} else if (!isNaN(asplanWKT.coordinates[0][0][0])) {
					asplanWKT.coordinates = convert3(asplanWKT.coordinates);
				} else {
					console.warn("Unrecognized GeoJSON structure in convertCRS:", asplanWKT);
				}
			
				return asplanWKT;
			};

					
			$scope.addMarkers = function(zb, marketx,result111,result110) {
				console.log(zb);
            	  for(var i = 0; i < zb.length; i++) {
                	 var xx1= 'm'+i; var type=zb[i].type;
                	 var itype="";
                	 var jtype="";
                	 var icones="";
                	 var type_color="";   		
                	 var cause=zb[i].cause;
                	 if(type=="high"){type_color='e85141';jtype="Power Interruption"};
                	 if(type=="medium"){type_color='2ecc71';jtype="O & M"};
                	 if(type=="low"){type_color='abcdef';jtype="Inspection/ Verification"};
                	 var myDate= moment(zb[i].followed, 'MM/DD/YY  h:mm:ss a');//.format('MMMM Do YYYY, h:mm a');//  h:mm a
					                 
				          	 
                	 var hdm=parseFloat(myDate.hour());
                	 if($scope.Period=='Monthly'){	
                		 hdm=parseFloat(myDate.date());
                		 }
                	 if($scope.Period=='Yearly'){	
                		 hdm=parseFloat(myDate.month()+1);
                		 }
                	 var value_town=[{"unique_id":"858","serial_no":"24","category":"town","value":"Tigbauan","lat":"10.67140447","lon":"122.3787689"}];
                	 var value_brgy="";
						
					
					
                	 if(zb[i].town0!=""){
                		 value_town= $filter('filter')(result111,{value:zb[i].town0});
		                }
                	 var result110a= $filter('filter')(result110,function(x){return x.serial_no.indexOf(value_town[0].serial_no)===0});
                	 //var value_brgy=result110a;
					               	
                	 if(zb[i].brgy0!=""){
                		 value_brgy= $filter('filter')(result110a,function(x){return x.value===zb[i].brgy0});
	                	}
                	 var lat= 10.7505782;
                	 var lng= 122.3866134;
 					//console.log("test:"+value_brgy[0].value)	
                	  if(value_town!=""){ 
	                	 
	                		 lat=$filter('filter')(result111,function(x){return (x.serial_no === value_town[0].serial_no )})[0].lat;
		                	 lng=$filter('filter')(result111,function(x){return (x.serial_no === value_town[0].serial_no )})[0].lon;
	               	 }
                	  if(value_brgy!=""){
          
	                	  	lat= $filter('filter')(result110a,function(x){return (x.serial_no === value_brgy[0].serial_no )})[0].lat;
	                	  	lng= $filter('filter')(result110a,function(x){return (x.serial_no === value_brgy[0].serial_no )})[0].lon;
                	 }	  
	             
                	 if(value_town[0].serial_no=='00'){
	                	 lat= 10.7505782;
	                	 lng= 122.3866134;
                	 }
				                	 
                	 if (!isNaN(lat)){lat= parseFloat(lat);}
                	 if (!isNaN(lng)){lng= parseFloat(lng);}
                	 var lat1=0;
            		 var lng1=0;
            		 if (!isNaN(zb[i].lat)){lat1=parseFloat(zb[i].lat);}
            		 if(!isNaN(zb[i].lng)){lng1=parseFloat(zb[i].lng);}
            		 
            		 var dist=Math.hypot((lat-lat1),(lng-lng1))*111.120; //1 degree = 60 * 1852 meters = 111.120 kilometers
                	//console.log(zb[i])
					 var id=zb[i].unique_id;
					 var jo=zb[i].jo;
					 var onclick="angular.element(document.getElementById('ID1')).scope().selectItem('"+ id +"'"+","+"'"+jo+"')";
					 //var lat=angular.element(document.getElementById('ID1')).scope().markerLat;
				
					 var details=
	                	 'JO #:'+zb[i].jo+'<br>' +
						 'DETAILS:'+zb[i].cause+'<br>' +
	                	 'REPORTED/CREATED BY:'+zb[i].name+'<br>' +
	                	 'CREATED:'+zb[i].created  +'<br>' +
	                	 'UPDATED:'+zb[i].followed  +'<br>'+
	                	 'ADDRESS:'+zb[i].brgy0 +','+ zb[i].town0 +'<br>' +
	                	 'SECTION:'+zb[i].section  +'<br>'+
	                	 'EQUIPMENT:'+zb[i].equip  +'<br>'+
	                	 'NOTES:'+zb[i].notes  +'<br>'+
	                	 'ACTION TAKEN:'+zb[i].actiontaken  +'<br>'+
	                	 'STATUS:'+zb[i].status+'<br>'+
						 'GPS:'+zb[i].lat+','+zb[i].lng+'<br>'+ 
	                	 '<button id="submit" onclick=' +onclick+'>Edit</button>';

						//$scope.selectItem(localStorage.getItem("unique_id"))
                	 //var icon1='http://chart.apis.google.com/chart?chst=d_map_xpin_letter_withshadow&chld=pin_sleft|'+hdm+'|'+type_color+'&chf=a,s,ee00FFFF';
                	 var icon2='http://chart.apis.google.com/chart?chst=d_map_pin_letter_withshadow&chld='+hdm+'|'+type_color+'&chf=a,s,ee00FFFF';
                	 var xdc=true;
					var icon1='../Omms/img/tracker.png';
                	 
                	 if(dist<=3){
                		lat=lat1;
                		lng=lng1;
                		 xdc=false;
                		 //icon1=icon2;
                	 }
					 console.log("lat:"+lat)
                	 console.log("lat1:"+lat1)
				
					 /**/ $scope.markers[xx1] = {lat: lat,lng: lng,
                			  draggable: true,
							  id: id, type: 'jo',
                             icon: {
				                	className: 'custom-icon',
									type:'div',
									html: 	'<div class="location-'+type+'">'+
											  '<div class="hole">'+
											    '<div class="number-label">'+hdm+'</div>'+
											  '</div>'+
											'</div>',
				                	iconSize:     [45, 45]
				                 },
                             opacity: 20,
                            message:  details
                               };

					
							//angular.extend($scope, marketx);
							/**/
                	  	 
	                }
				/**leafletData.getMap('map').then(function(map){		
				map=map;
					var myIcon = L.divIcon({
					    className: 'custom-icon',
					    html: '<div style="position:relative;"><img src="../Omms/img/tracker.png" style="width: 45px; height: 45px;"><div class="icon-text" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);">'+hdm +'</div></div>',
					    iconSize: [45, 45] // Adjust the size based on your icon
					});
				
			 L.marker([lat, lng], { icon: myIcon,draggable: true,id: id, type: 'jo',opacity: 20,message:  details }).addTo(map);
				});  /**/         
	                 
	        };
						
			$scope.myBrgy = function(x) {
				return (x.category === 'barangay'& (x.serial_no.substr(0,2) === ($scope.Towns.serial_no)||x.serial_no==="00"));	
			}	
						
			$scope.myCrew = function(x) {
				return (x.category === 'crew');	
			}
			
	
////////////////////////////////////////////////////////map
	 
        	 $scope.addr_search = function (){	 
        	  var inp =  $scope.addrey;  
        	  var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + inp+", Iloilo";
        	
        	  $http.get(url).then(function mySuccs(responseText){
        		 //$scope.result1=responseText.data[0].lat;
        	     $scope.lat = responseText.data[0].lat;
            	 $scope.lon = responseText.data[0].lon;
            	 var xx1= 'm'+1;
            	 var headquarterx={
                         headquarter: {
                             lat: parseFloat(responseText.data[0].lat),
                             lng: parseFloat(responseText.data[0].lon),
                             zoom: 13
                         },
                         markers: {}
						

                     }
            	 headquarterx.markers[xx1] = {
                    	 lat: parseFloat(responseText.data[0].lat),
                         lng: parseFloat(responseText.data[0].lon),
                         draggable:true
                     }
             	angular.extend($scope,headquarterx );
        	  });

        	 }
        	 $scope.addr_search2 = function (){	 
	        	   
	        	  var url = "https://nominatim.openstreetmap.org/reverse.php?format=json&lat="+$scope.lat+"&lon="+$scope.lon+"&zoom=15";
	        	
	        	  $http.get(url).then(function mySuccs(responseText){
	        		  //$scope.result10=responseText;
	        		  $scope.addrey=responseText.data.display_name;
	        		  //$scope.result1=responseText;
	        	  });
	        	  
	        	 }
        	
			////////////////////////////////////////////////////////map
        	 $scope.addr_search3 = function (){	 
        		  var town00=$scope.Towns.value;
        		  var brgy00= "";
        		  var zoom00=13;
        		  if ($scope.Brgys.value!="Select Brgy"){brgy00= $scope.Brgys.value+",";zoom00=16;};
	        	  var inp =  brgy00+town00;  
	        	  //var inp =  $scope.addrey; 
	        	  var url2 = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + inp+", Iloilo";
	        	  var headquarterx={
	                         headquarter: {
	                             lat: parseFloat($filter('filter')(result111,{value:$scope.Towns.value})[0].lat),
	                             lng: parseFloat($filter('filter')(result111,{value:$scope.Towns.value})[0].lon),
	                             zoom: 13
	                         },
	                         markers: {m1: {
	                        	 lat: parseFloat($filter('filter')(result111,{value:$scope.Towns.value})[0].lat),
			                     lng: parseFloat($filter('filter')(result111,{value:$scope.Towns.value})[0].lon),
			                     draggable:true}
	                         }
	                     }
	        	 
	        	  angular.extend($scope,headquarterx );
	        	 
	        	  $http.get(url2).then(function mySuccs(responseText){
	        	     $scope.lat = responseText.data[0].lat;
	            	 $scope.lon = responseText.data[0].lon;
	            	 //$scope.result1=responseText;
	            	 
	            	 var xx1= 'm'+1;
	            	 var headquarterx={
	                         headquarter: {
	                             lat: parseFloat(responseText.data[0].lat),
	                             lng: parseFloat(responseText.data[0].lon),
	                             zoom: zoom00
	                         },
	                         markers: {}
	                     }
	            	 headquarterx.markers[xx1] = {
	                    	 lat: parseFloat(responseText.data[0].lat),
	                         lng: parseFloat(responseText.data[0].lon),
	                         draggable:true
	                     }
	             	angular.extend($scope,headquarterx );
	        	  });
	        	 
	        	 }
      		////////////////////////////////////////////map
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
				
				// Enable dragging for all 3 modals
				makeDraggable('modals');
				makeDraggable('polemodals');
				makeDraggable('linemodals');
				makeDraggable('custmodals');
				makeDraggable('sdimodals');

			$scope.navMap=function(){						
				parent.document.getElementById("map").click();
				parent.document.getElementById('Map').contentWindow.updatedata(
					[$scope.Followed1,$scope.Lat,$scope.Lon,$scope.Status1,$scope.newTown,$scope.newBrgys, $scope.Crews1]);
				parent.document.getElementById('Map').contentWindow.updateAsPlan();  
			}
        	 $scope.addr_save = function (){	 
        		
        		  var serial_no= $scope.Towns.serial_no;
        		  if ($scope.Brgys.value!="Select Brgy"){serial_no= $scope.Brgys.serial_no};
	        	  
        		 // $scope.result1=serial_no; 
	            	 $http.post('someservlet1?serial_no='+serial_no+'&lat='+ $scope.lat+'&lon='+$scope.lon)
						.then(function mySuccs(response2){
							//$scope.result1=response2;
						});
	            
	            	
	        	 }
			window.updatedata = function(data) {
	          	$scope.$apply(function(){
					if(data!=null){
						 var f=8 //plus item no.
						 $scope.Date= data[0];						
	                     $scope.latt= parseFloat(data[1]);
	                     $scope.lngg= parseFloat(data[2]);
						 var Status=$filter('filter')($scope.test1,function(x){return x.category == 'status'&& x.value==data[3].value})
						 var Towns=$filter('filter')($scope.test1,function(x){return x.category == 'town'&& x.value==data[4].value})
						 if(data[3].serial_no!="00"){$scope.Status= $scope.test1[parseFloat(Status[0].unique_id)+f]};
						 if(data[4].serial_no!="00"){$scope.Towns= $scope.test1[parseFloat(Towns[0].unique_id)+f]};
						 	
						 console.log(data[3]);
						 console.log(data[4]);
	                     $scope.zoomm=15;
						 $scope.testRun(1,2);	
					}else{
						if(moment($scope.Date).format("YYYY-MM-DD")==moment(new Date()).format("YYYY-MM-DD")){$scope.testRun(0,1)}
					}	            
					
			     });
				localStorage.removeItem('overlays');
				var keys = Object.keys($scope.layers.overlays);
				for(h=0;h<keys.length;h++){
					delete $scope.layers.overlays[keys[h]];
				}
				nodes=[];
	        };
			window.updateAsPlan = function() {
	          	$scope.$apply(function(){
					$scope.asPlanAPI(localStorage.getItem("unique_id"),0);
			     });
	        };
			
	     
        	 ////////////////////////////////////////////
	
            
            
    	});
		    
    	
		