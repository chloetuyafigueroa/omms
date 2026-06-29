package jspbook.tsd;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
@WebServlet("/config.js")
public class ConfigServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/javascript");
        response.setCharacterEncoding("UTF-8");

        String apiBaseUrl = System.getenv("API_BASE_URL");
        String mapboxToken = System.getenv("MAPBOX_ACCESS_TOKEN");

        if (apiBaseUrl == null || apiBaseUrl.trim().isEmpty()) {
            apiBaseUrl = "http://localhost:8080/Joblist";
        }

        if (mapboxToken == null) {
            mapboxToken = "";
        }

        response.getWriter().println("window.APP_CONFIG = {");
        response.getWriter().println("  API_BASE_URL: \"" + escape(apiBaseUrl) + "\",");
        response.getWriter().println("  MAPBOX_ACCESS_TOKEN: \"" + escape(mapboxToken) + "\"");
        response.getWriter().println("};");
    }

    private String escape(String value) {
        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"");
    }
}