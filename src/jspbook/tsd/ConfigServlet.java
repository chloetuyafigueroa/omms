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

        if (apiBaseUrl == null || apiBaseUrl.trim().isEmpty()) {
            apiBaseUrl = "http://localhost:8080/Joblist";
        }

        response.getWriter().println("window.APP_CONFIG = {");
        response.getWriter().println("  API_BASE_URL: \"" + apiBaseUrl + "\"");
        response.getWriter().println("};");
    }
}