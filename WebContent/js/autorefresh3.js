				var sam="CHLOE";
   	 			var app=angular.module('firstAPP',[]);
				app.controller('myCtrl1',function($scope,$http,$q)
				{
					$scope.types=["Power Interruption","O&M","Inspection/Verification"];			
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
                        
						var x= [];
						
						var y= 0;
						$scope.checkUncheckAll = function (){ 
							
							if ($scope.checkall) { $scope.checkall = true;
								x= [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
								//$scope.reverseSort = true;
							} else { $scope.checkall = false;
								x= [];
							} 
							angular.forEach($scope.users, function (user){
								user.checked = $scope.checkall;
							}) 
						}; 

						
						
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

					$scope.selectItem = function($index){
						var popup=$index + "scvvsvv";
						popup.classList.toggle('show');
						
                        };
                    $scope.test100 = 'sam';
                    
					$scope.sortColumn = 'created';
					$scope.reverseSort = true;
					$scope.sortData = function (columnIndex) {
						//$scope.reverseSort = ($scope.sortColumn == $scope.users[columnIndex]) ? !$scope.reverseSort : false;
						//$scope.reverseSort = true;
						$scope.sortColumn = $scope.users[columnIndex];
					}

				

				
					$scope.myBrgy = function(x) {
					return (x.category === 'barangay'& x.serial_no.substr(0,2) === $scope.Towns.serial_no);
					}
							 
					$q.all([ $http.get('someservlet'),$http.get('someservlet1')])
        
					.then(function mySucc(response){
						$scope.sexy = JSON.parse(JSON.stringify(response[0].data));
						$scope.test1 = JSON.parse(JSON.stringify(response[1].data));
						$scope.statuscode = response[0].status;
						
			      
					});
				});

				angular.bootstrap(document.getElementById("ID1"),['firstAPP']);
   	 			
				//console.log("Hello Javascript");
				//alert(testt)
				//alert(response)
	        	
    	        var auto_refresh1 = setInterval(
		        function ()
		        {
		        	var test3= Date();
		        	$("#somediv").text(test3);
		        	
		        
		        }, 1000); // autorefresh the content of the div after
	 	              //every 1000 milliseconds(1sec)   
				
			
					   

		              	
		             	        
		       