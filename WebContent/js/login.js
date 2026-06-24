			
	        	
   	 		var app=angular.module('firstAPP',[]);
	   	 		
				app.controller('myCtrl',function($scope,$http)
				{

					
					
					$scope.test7 = function(){				
						$http.post('tsd/Main?action=login',$scope.uname,$scope.pswd);				
					};
					
					
					
					
					
			});
				
   	 	
    	           
				
			
					   

		              	
		             	        
		       