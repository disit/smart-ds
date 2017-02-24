<%-- SmartDS
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
along with this program.  If not, see <http://www.gnu.org/licenses/>. --%>
	
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>

<head>

	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Modify Tree</title>
    
    <!-- Style CSS -->
    <link rel="stylesheet" type="text/css" href="lib/jquery-ui/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="css/model.css">

	<!-- Import delle librerie -->

	
	<!-- Import dei file js necessari -->
	<script type="text/javascript" src="js/util/util.js"></script>
	<script type="text/javascript" src="js/graphics/nodes_model/plus.js"></script>
	<script type="text/javascript" src="js/graphics/nodes_model/edit.js"></script>
	<script type="text/javascript" src="js/graphics/nodes_model/text_modify.js"></script>
	<script type="text/javascript" src="js/graphics/operations_model.js"></script>
	<script type="text/javascript" src="js/graphics/operations_nodes.js"></script>
    
</head>

<body>
	
	<%
		// Codice Java per il controllo sull'accesso - lo permette solo se la sessione esiste
	 	String userName = null;
		
		if(session.getAttribute("User") == null)
		{
			response.sendRedirect("login.html");
			%> 
			<script> 
				$('#nav').remove();
				$('#menu-side').remove();
				$('#sub-menu').remove();
				$('#toppanel').remove();
				$('#model_instancemodel_info').remove();	
			</script> 
		<% 
		}
		else 
			userName = (String) session.getAttribute("user");
		
		String sessionID = null;
		Cookie[] cookies = request.getCookies();
		if(cookies !=null)
		{
			for(Cookie cookie : cookies){
				if(cookie.getName().equals("User")) 
					userName = cookie.getValue();
				if(cookie.getName().equals("JSESSIONID")) 
					sessionID = cookie.getValue();
			}
		}
	%>
	
	<!-- DIV PRINCIPALE -->
	<div id="model_body"></div>
	
	<script type="text/javascript">
	
		var width_tree = screen.width, height_tree = screen.height;
		var width_node = 200, height_node = 80;
		var width_nodeplus = 40, height_nodeplus = 40;
		var width_modifyimg = 16, height_modifyimg = 16;
		
		var text_modify = "Insert description...";
		var path_imgplus = "image/plus.png";
		
		var duration = 750;
		
		var tree, nodes, links;
		var diagonal, svg_body;
		var node, link;
		
		var root_original;
		
		function confirmEditedModel()
		{
			var allnodes_edited = d3.selectAll(".edit-rect");
			
			// Controllo se tutti i criteri hanno le descrizioni
			if(allnodes_edited.empty())
				clientRest.saveModel(); // CHIAMATA REST PER IL SALVATAGGIO DEL MODELLO SUL DB
			else
				showAlert("Insert description inside all criterias!");
		}
		
		function clearEditedModel()
		{
			d3.select("svg").remove();
			
			clientRest.resetModel();
		}
		
		//----------------------------------------------------------------------------------
		
		$(document).ready(function () 
		{			
			edit_model();
			
			createSubmenu(3, user.getId());
		});
		

		function edit_model()
		{
			id_currentpage = 3;
			
			zoom_initial = 0.7;
			
			root = json_data;
			
			console.log(root);
			
			rotateOff();
			
			// Inizializzazione del modello caricato dal server
			initModel();	
			
			// Visualizzazione del modello caricato dal server
			showModel();
		  	
			// Per ogni nodo si inserisce un nodo text modify
			node.each(function(d,i){
				addNodeTextModify(getId(d.position), d.description);
			});
			
			// Aggiunta del campo id nel modello caricato dal server
			for(var i = 0; i < nodes.length; i++)
			{
				nodes[i].id = getId(nodes[i].position);
			}
		
			// Aggiunta dei nodi plus
			addAdditionalNodes();
		}
		

		function addAdditionalNodes()
		{
			node.each(function(d,i) 
			{
				computeNewNodeOnExisting(d);
			});
			
			updateModel();
		}
		
		function update(id_node)
		{
			computeNewNodes(id_node);
			
			updateModel();
		}	
	   			
	</script>

</body>
</html>