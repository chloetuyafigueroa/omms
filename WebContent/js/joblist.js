window.GISMenu = function($scope) {
	$scope.showModal=false
	$scope.open = function(){
		$scope.initialize();
		
		if ($scope.showModal==false){$scope.showModal=true}
		else{$scope.showModal=false}
		
	}
	$scope.jobVisible = false;
	$scope.toggleJoblist = function() {
		console.log($scope.jobs);
			    $scope.jobVisible = !$scope.jobVisible;
				$scope.menuVisible = !$scope.menuVisible;
	
			};
	$scope.toggleJoblist2 = function() {
		console.log($scope.jobs);
			    $scope.jobVisible = !$scope.jobVisible;
				
			};
	$scope.joblist=function(arr) {
		$scope.jobs= [];
	    populate(arr);
	}
	$scope.jobs= []
	function populate(data){
		data.forEach(function(s){
			if (s.jo == null || s.jo === "") {
			    jo = "0";
			} else {
			    jo = String(s.jo);
			    if (s.jo.length > 5) {
			        jo = s.jo.substring(6);
			    }
			
			    if (s.jo.indexOf(".") !== -1) {
			        jo = "0";
			    }
			}
			// Format as 3 digits
			jo = ("000" + jo).slice(-3);
			
			// Display vertically
			jo = jo.split("").join("\n");
			$scope.jobs.push({unique_id: s.unique_id,jo: jo,name: s.name, status: s.status, brgy0: s.brgy0, town0: s.town0, 
				type: s.type, date: moment(s.created, "MM/DD/YY hh:mm:ss A").format("MM/DD/YYYY"),
				time: moment(s.created, "MM/DD/YY hh:mm:ss A").format("hh:mm:ss A")});
		})
	}
	

  $scope.openJob = function(job) {
        console.log("Selected job:", job);
        // Add your existing OMMS job-detail handler here.
    };

};

	var currentModalPage = 0;

function changeModalPage(direction) {

    var pages = document.getElementById("modalPages");
    if (!pages) return;

    currentModalPage += direction;

    if (currentModalPage < 0) {
        currentModalPage = 0;
    }

    if (currentModalPage > 1) {
        currentModalPage = 1;
    }

    pages.scrollTo({
        left: currentModalPage * pages.clientWidth,
        behavior: "smooth"
    });

    updateModalIndicator();
}

function updateModalIndicator() {

    var indicator = document.getElementById("modalPageIndicator");

    if (indicator) {
        indicator.textContent = (currentModalPage + 1) + " / 2";
    }
}
function initializeModalSwipe() {

    var pages = document.getElementById("modalPages");

    if (!pages || pages.dataset.initialized === "true") return;

    pages.dataset.initialized = "true";

    var startX = 0;
    var startY = 0;

    pages.addEventListener("touchstart", function(e) {

        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;

    }, { passive: true });

    pages.addEventListener("touchend", function(e) {

        if (!e.changedTouches.length) return;

        var diffX = startX - e.changedTouches[0].clientX;
        var diffY = startY - e.changedTouches[0].clientY;

        // Horizontal swipe must exceed 50px
        if (Math.abs(diffX) > 50 &&
            Math.abs(diffX) > Math.abs(diffY)) {

            if (diffX > 0) {
                changeModalPage(1);  // Swipe left
            } else {
                changeModalPage(-1); // Swipe right
            }
        }

    }, { passive: true });

    // Keep indicator synchronized with native scrolling
    pages.addEventListener("scroll", function() {

        if (!pages.clientWidth) return;

        currentModalPage = Math.max(
            0,
            Math.min(1, Math.round(pages.scrollLeft / pages.clientWidth))
        );

        updateModalIndicator();

    }, { passive: true });
}
initializeModalSwipe();
