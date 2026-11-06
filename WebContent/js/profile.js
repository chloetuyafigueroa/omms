window.GISProfile = function($scope) {
	/* Profile initialization */
	$scope.profileVisible = false;
	
	function readStoredProfile() {
	    try {
	        return JSON.parse(localStorage.getItem("omms_profile") || "{}");
	    } catch (e) {
	        return {};
	    }
	}
	
	var savedProfile = readStoredProfile();
	
	$scope.profile = {
	    name: savedProfile.name || "",
	    phone: savedProfile.phone || "",
	    crew: savedProfile.crew || "",
	    towns: savedProfile.towns || {},
	    loggedIn: false
	};
	
	/* Replace with data from your SharedService */
	$scope.crewOptions = [
	    "Crew 1", "Crew 2", "Crew 3",
	    "Maintenance", "Technical"
	];
	
	$scope.townOptions = [
	    "Tigbauan", "Oton", "Guimbal",
	    "Miagao", "San Joaquin",
	    "Tubungan", "Igbaras"
	];
	
	$scope.selectedTownCount = function() {
	    return $scope.townOptions.filter(function(town) {
	        return !!$scope.profile.towns[town];
	    }).length;
	};
	
	$scope.selectAllTowns = function() {
	    $scope.townOptions.forEach(function(town) {
	        $scope.profile.towns[town] = true;
	    });
	};
	
	$scope.clearTowns = function() {
	    $scope.profile.towns = {};
	};
	
	$scope.saveProfile = function() {
	
	    var data = {
	        name: $scope.profile.name,
	        phone: $scope.profile.phone,
	        crew: $scope.profile.crew,
	        towns: $scope.profile.towns
	    };
	
	    localStorage.setItem("omms_profile", JSON.stringify(data));
	
	    alert("Profile saved successfully.");
	};
	
	/*
	 * Connect these to your existing authentication flow.
	 * Do not set loggedIn=true merely because a button was clicked.
	 */
	$scope.profileLogin = function() {
	    $scope.profileVisible = false;
	    // Call your existing login function / show login modal here.
	};
	
	$scope.profileLogout = function() {
	    // Call your existing server logout endpoint,
	    // clear the authenticated session, then update UI.
	    // Do not clear authentication just by changing this flag.
	};
	
	$scope.showSignup = false;
	$scope.signupError = "";
	$scope.signupLoading = false;
	
	$scope.signup = {
	    name: "",
	    phone: "",
	    crew: "",
	    towns: {},
	    password: "",
	    confirmPassword: ""
	};
	
	$scope.registerUser = function() {
	
	    $scope.signupError = "";
	
	    if ($scope.signup.password !== $scope.signup.confirmPassword) {
	        $scope.signupError = "Passwords do not match.";
	        return;
	    }
	
	    var selectedTowns = $scope.townOptions.filter(function(town) {
	        return !!$scope.signup.towns[town];
	    });
	
	    if (selectedTowns.length === 0) {
	        $scope.signupError = "Please select at least one town.";
	        return;
	    }
	
	    var data = {
	        name: $scope.signup.name,
	        phone: $scope.signup.phone,
	        crew: $scope.signup.crew,
	        towns: selectedTowns,
	        password: $scope.signup.password
	    };
	
	    $scope.signupLoading = true;
	
	    $http.post(
	        window.APP_CONFIG.API_BASE_URL + "/Joblist/RegisterUser",
	        data
	    ).then(function(response) {
	
	        if (response.data && response.data.success === true) {
	
	            alert("Account created successfully. Please log in.");
	
	            $scope.showSignup = false;
	
	            $scope.signup = {
	                name: "",
	                phone: "",
	                crew: "",
	                towns: {},
	                password: "",
	                confirmPassword: ""
	            };
	
	        } else {
	            $scope.signupError =
	                (response.data && response.data.message) ||
	                "Registration failed.";
	        }
	
	    }, function(error) {
	
	        $scope.signupError =
	            (error.data && error.data.message) ||
	            "Unable to register. Please try again.";
	
	    }).finally(function() {
	        $scope.signupLoading = false;
	    });
	};
};