window.GISJobList = function($scope) {
	

	var isMobile = window.matchMedia(
							    "screen and (max-width: 768px)"
							).matches;
				
	$scope.menuVisible = isMobile;
	$scope.toggleMenu = function() {
		console.log("menuVisible")
	    $scope.menuVisible = !$scope.menuVisible;
	};
	$scope.filterVisible = !isMobile;
	$scope.toggleFilter = function() {
		console.log("filterVisible")
	    $scope.filterVisible = !$scope.filterVisible;
	};
	function openMap() {
	    window.location.href = "Maps.html";
	}
	
	function newJobOrder() {
	    window.location.href = "NewJobOrder.html";
	}
	
	function openNotifications() {
	    alert("Notifications");
	}
	
	function navigate(page, element) {
	    document.querySelectorAll(".nav-item")
	        .forEach(function(item) {
	            item.classList.remove("active");
	        });
	
	    element.classList.add("active");
	
	    switch (page) {
	        case "home":
	            window.location.href = "mobile.html";
	            break;
	        case "jobs":
	            window.location.href = "Jobs.html";
	            break;
	        case "map":
	            openMap();
	            break;
	        case "profile":
	            window.location.href = "Profile.html";
	            break;
	    }
	}
	
	// Update statistics using actual database values.
	function updateDashboard(data) {
	
	    if (!data) {
	        console.error("Dashboard data is empty");
	        return;
	    }
	
	    function setValue(id, value, formatted) {
	        var element = document.getElementById(id);
	
	        if (element) {
	            var result = (value !== null && value !== undefined)
	                ? value : 0;
	
	            element.textContent = formatted
	                ? Number(result).toLocaleString()
	                : result;
	        } else {
	            console.warn("Element not found: " + id);
	        }
	    }
	
	    setValue("pendingJobs", data.pendingJobs, false);
	    setValue("completedJobs", data.completedJobs, false);
	    setValue("fieldCrews", data.fieldCrews, false);
	    setValue("mapAssets", data.mapAssets, true);
	
	}
};