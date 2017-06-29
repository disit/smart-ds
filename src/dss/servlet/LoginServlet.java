/* SmartDS
   Copyright (C) 2017 DISIT Lab http://www.disit.org - University of Florence

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU Affero General Public License as
   published by the Free Software Foundation, either version 3 of the
   License, or (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU Affero General Public License for more details.

   You should have received a copy of the GNU Affero General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>. */

package dss.servlet;

import java.io.IOException;  
import java.io.PrintWriter;
import java.util.Hashtable;

import javax.naming.AuthenticationException;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;  
import javax.servlet.http.HttpServlet;  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
import javax.servlet.http.HttpSession;  

import dss.user.*;
import dss.dbinterface.UserDB;
import dss.dbinterface.UserDBInterface;


public class LoginServlet extends HttpServlet 
{  
	private static final long serialVersionUID = 1L;
	
	private SearchControls getSimpleSearchControls() {
	    SearchControls searchControls = new SearchControls();
	    searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);
	    searchControls.setTimeLimit(30000);
	    //String[] attrIDs = {"objectGUID"};
	    //searchControls.setReturningAttributes(attrIDs);
	    return searchControls;
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)  
                    throws ServletException, IOException {
		
        response.setContentType("text/html");  
        PrintWriter out = response.getWriter();  
        
        request.getRequestDispatcher("login.html").include(request, response);  
          
        String email = request.getParameter("email");  
        String password = request.getParameter("password");
        String guest = request.getParameter("guest");
        String typeLogin = request.getParameter("typeLogin");
        
        if(guest == null)
        {
        	UserDBInterface udi = new UserDB();
        	User user = udi.retrieveUser(email, password);
        	
    		if(user != null )
    		{	
    			HttpSession session = request.getSession();
    			session.setAttribute("User", user);
    			
    			if(user.getType() == 4)
    			{
    				session.setAttribute("Users", udi.getUsers());  
    			}
    			
//				request.setAttribute("messageError", "");
				String encodedURL = response.encodeRedirectURL("home.jsp");
				response.sendRedirect(encodedURL);
			}
    		else if (user == null) {
    			
    			// User not in SmartDS db; try with LDAP centralized Authentication
    			
    			int ldapUserId = -1;
    			String ldapURL = "ldap://localhost";
    			String ldapUser = "cn=" + email + ", dc=ldap,dc=disit,dc=org";
    			Hashtable<String, String> environment = new Hashtable<String, String>();
    			environment.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
    			environment.put(Context.PROVIDER_URL, ldapURL);
    			environment.put(Context.SECURITY_AUTHENTICATION, "simple");
    			environment.put(Context.SECURITY_PRINCIPAL, ldapUser);
    			environment.put(Context.SECURITY_CREDENTIALS, password);

    			try {
    				DirContext authContext = new InitialDirContext(environment);
	    			// user is LDAP authenticated
	    				
	    			DirContext ctx = new InitialDirContext(environment);
	    			
	    			String ldapSearchBase = "dc=ldap,dc=disit,dc=org";
	    			NamingEnumeration<?> namingEnumTool = ctx.search(ldapSearchBase, "(&(objectClass=posixGroup)(cn=SmartDS))", getSimpleSearchControls());
	    			
	    			NamingEnumeration<?> namingEnumUsr = ctx.search(ldapSearchBase, "(&(objectClass=top)(cn="+email+"))", getSimpleSearchControls());
	    			while (namingEnumUsr.hasMore()) {
	    				
	    				SearchResult entryUsr = (SearchResult) namingEnumUsr.next();
	    				ldapUserId = Integer.parseInt((String)entryUsr.getAttributes().get("uidNumber").get());
	    			//	int stopFlag = 1;
	    				
	    			/*	NamingEnumeration<?> namingEnumUserAttr = entryUsr.getAttributes().getAll();
	    				while (namingEnumUserAttr.hasMore()) {
	    					SearchResult entryUsrAttr = (SearchResult) namingEnumUserAttr.next();
	    				}	*/
	    				
	    			}
	    			
	    			while (namingEnumTool.hasMore()) {
	    				
	    				SearchResult entryOut = (SearchResult) namingEnumTool.next();
		    			
	    				NamingEnumeration<?> namingEnumAdmin = ctx.search(ldapSearchBase, "(&(objectClass=organizationalRole)(cn=ToolAdmin)(roleOccupant="+ldapUser+"))", getSimpleSearchControls());
		    			while (namingEnumAdmin.hasMore()) {
		    				  SearchResult entry = (SearchResult) namingEnumAdmin.next();
		    				  user = udi.mapLdapUser(email, "ToolAdmnin", ldapUserId);
		    			 //     System.out.println(entry.getName());
		    			 //     System.out.println(entry.getAttributes().toString());
		    			 //     System.out.println(entry.getAttributes().get(attrID));
		    			}
		    			
		    			NamingEnumeration<?> namingEnumDMaker = ctx.search(ldapSearchBase, "(&(objectClass=organizationalRole)(cn=AreaManager)(roleOccupant="+ldapUser+"))", getSimpleSearchControls());
			    		while (namingEnumDMaker.hasMore()) {
			    			SearchResult entry = (SearchResult) namingEnumDMaker.next();
			    			user = udi.mapLdapUser(email, "AreaManager", ldapUserId);
			    		}
			    		
			    		NamingEnumeration<?> namingEnumAdvanced = ctx.search(ldapSearchBase, "(&(objectClass=organizationalRole)(cn=Manager)(roleOccupant="+ldapUser+"))", getSimpleSearchControls());
			    		while (namingEnumAdvanced.hasMore()) {
			    			SearchResult entry = (SearchResult) namingEnumAdvanced.next();
			    			user = udi.mapLdapUser(email, "Manager", ldapUserId);
			    		}
			    		
			    		NamingEnumeration<?> namingEnumBasic = ctx.search(ldapSearchBase, "(&(objectClass=organizationalRole)(cn=Observer)(roleOccupant="+ldapUser+"))", getSimpleSearchControls());
			    		while (namingEnumBasic.hasMore()) {
			    			SearchResult entry = (SearchResult) namingEnumBasic.next();
			    			user = udi.mapLdapUser(email, "Observer", ldapUserId);
			    		}
			    		
	    			}
	    			
	    			ctx.close();
	    			
	    			HttpSession session = request.getSession();
	        		session.setAttribute("User", user);
	        		
	        		if(user.getType() == 4)
	    			{
	    				session.setAttribute("Users", udi.getUsers());  
	    			}
	    				
	    			String encodedURL = response.encodeRedirectURL("home.jsp");
	    			response.sendRedirect(encodedURL);

    			} catch (AuthenticationException ex) {
    				//ex.printStackTrace();	
    				// Authentication failed
    				String message = "No user found with given email id and password, please register first.";
					
					if(typeLogin.equals("external"))
					{					
						out.println("<script type=\"text/javascript\">");
	            		out.println("warningEmailPass();");
	            		out.println("</script>");
					}
					else{
					    request.setAttribute("messageError", message);
					    request.getRequestDispatcher("/home.jsp").forward(request,response);
					}

    			} catch (NamingException ex) {
    					ex.printStackTrace(); 
    			}
    			
    		}
	/*		else {
				String message = "No user found with given email id and password, please register first.";
				
				if(typeLogin.equals("external"))
				{					
					out.println("<script type=\"text/javascript\">");
            		out.println("warningEmailPass();");
            		out.println("</script>");
				}
				else{
				    request.setAttribute("messageError", message);
				    request.getRequestDispatcher("/home.jsp").forward(request,response);
				}
			}		*/	
        }
        else
        {
        	HttpSession session = request.getSession();
        	User user = new UserBasic("Guest", "guest@guest.com", "Italy", 0, 1);
        	session.setAttribute("User", user);
        	
        	String encodedURL = response.encodeRedirectURL("home.jsp");
        	request.setAttribute("messageError", "");
        	response.sendRedirect(encodedURL);
//	        request.getRequestDispatcher(encodedURL).forward(request,response);
        }
    }  
}
