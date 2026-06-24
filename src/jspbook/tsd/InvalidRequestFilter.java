
package jspbook.tsd;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class InvalidRequestFilter implements Filter {
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		String method = request.getProtocol();
		String context = request.getServletContext().getContextPath();
		String clientAddress = request.getRemoteAddr();
		System.out.println("test:" + method + "][" + context + "][" + clientAddress);
		if (method.matches("[A-Za-z]+")) { // Check for valid HTTP methods
			chain.doFilter(request, response);
		} else {
			chain.doFilter(request, response);
			// ((HttpServletResponse)
			// response).sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid HTTP
			// Method");
		}
	}

	@Override
	public void destroy() {
	}
}
