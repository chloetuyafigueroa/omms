(function () {

    
    window.APP_CONFIG = {

        // Permanent remote server address
        REMOTE_API_BASE_URL: window.APP_CONFIG.API_BASE_URL,
		MAPBOX_ACCESS_TOKEN: window.APP_CONFIG.MAPBOX_ACCESS_TOKEN,
		FIREBASE_SERVICE_ACCOUNT_JSON: window.APP_CONFIG.FIREBASE_SERVICE_ACCOUNT_JSON,
		REMOTE_DB_USER: window.APP_CONFIG.REMOTE_DB_USER,
		REMOTE_DB_PASSWORD: window.APP_CONFIG.REMOTE_DB_PASSWORD,
		REMOTE_DB_URL: window.APP_CONFIG.REMOTE_DB_URL,

        // Currently selected server
        API_BASE_URL:
            localStorage.getItem("API_BASE_URL") ||
           window.APP_CONFIG.API_BASE_URL

    };

})();