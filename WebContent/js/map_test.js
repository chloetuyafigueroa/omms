 var app = angular.module("firstAPP", ["leaflet-directive"]);
 app.controller('GISController', function($scope,leafletData) {
		   angular.extend($scope,{
                center: {
                    lat: 10.6762294,
                    lng: 122.3866134,
                    zoom: 17
                }, 
				
                markers: {}			
            });
			$scope.layers= {
	                baselayers: {
	                    osm: {
	                        name: 'StreetMap',
	                        //url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	                       	url: 'https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmlndWVyb2FlYyIsImEiOiJjbDNzMHQ4NTgxbjV3M2JwNzR2ZWgxeG16In0.Xu9JLfq3MZAyCy6M8sHrhQ',
							type: 'xyz',
							layerParams: {id: 'streets-v11', tileSize: 512, zoomOffset: -1}
	                      }
					},
					overlays: {}
			}
    	   
			
			$scope.data ={"type":"FeatureCollection","features":[]}
			var GeoJSON1={
					     "type": "Point",
					     "coordinates": [122.3866134,10.6762294]
					  }
			var GeoJSON2={
					     "type": "Point",
					     "coordinates": [122.3896134,10.6802294]
					  }
			
			
			
///////////////////////////////////////////////////////////////////////
			
			var overlays= {
	                poles: {
	                    name: 'poles',
	                    type: 'geoJSONShape',
	                    data: $scope.data,
	                    visible: true,
	                    layerOptions: {
							pane: 'poles',
	                        style: {
	                                color: '#00D',
	                                fillColor: 'red',
	                                weight: 2.0,
	                                opacity: 0.6,
	                                fillOpacity: 0.2,
									draggable: 'true'
	                        		}, pointToLayer: function (feature, latlng) {                                    
																			
									   return L.marker(latlng, {draggable: 'true'});
			                       }
	                    }
	                }
	            };
				var Layers={
						layers: {
			                baselayers: {
			                    osm: {
			                        name: 'StreetMap',
			                        //url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			                       	url: 'https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmlndWVyb2FlYyIsImEiOiJjbDNzMHQ4NTgxbjV3M2JwNzR2ZWgxeG16In0.Xu9JLfq3MZAyCy6M8sHrhQ',
									type: 'xyz',
									layerParams: {id: 'streets-v11', tileSize: 512, zoomOffset: -1}
			                      }      
							},
							overlays: overlays
			                    
			             }
				}
			
			
			
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
				//delete $scope.layers.overlays.poles;
				/**/
				var features={"type":"Feature","id": "1","geometry":GeoJSON1}
			
				Layers.layers.overlays.poles.data.features.push(features);
				
				angular.extend($scope,Layers);
				console.log(Layers);
				/**/
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
				//delete $scope.layers.overlays.poles;				
				
				var features={"type":"Feature","id": "2","geometry":GeoJSON2}
			
				Layers.layers.overlays.poles.data.features.push(features);
				
				angular.extend($scope,Layers);
				console.log(Layers);
			}
			
			function setColor(btn, color) {
		        var property = document.getElementById(btn);
		       
		            property.style.backgroundColor = color;
		        
		    }
				
});