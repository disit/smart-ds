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
	<title>New Model</title>

	<!-- Style CSS -->
	<link rel="stylesheet" type="text/css" href="lib/jquery-ui/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="css/model.css">
	<link rel="stylesheet" type="text/css" href="css/window.css">
	
	<!-- Import dei file js necessari -->
	<script type="text/javascript" src="js/graphics/windows/intro_model_window.js"></script>
	<script type="text/javascript" src="js/util/util.js"></script>
	
	<script type="text/javascript" src="js/graphics/nodes_model/plus.js"></script>
	<script type="text/javascript" src="js/graphics/nodes_model/edit.js"></script>
	<script type="text/javascript" src="js/graphics/nodes_model/text_modify.js"></script>
	
	<script type="text/javascript" src="js/graphics/operations_model.js"></script>
	<script type="text/javascript" src="js/graphics/operations_nodes.js"></script>
	<script type="text/javascript" src="js/graphics/zoom.js"></script>

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

	<!-- DIV PER INSERIMENTO DELLE INFORMAZIONI INIZIALI DEL MODELLO -->
	<div id="div_insert_info_model" style="display:none" title="Insert info model">
		<input type="text" class="input_info_model" id="input_objective_model" placeholder="Insert objective" size="30" onfocus="focusInputObjectiveModel()">
		<input type="text" class="input_info_model" id="input_url_model" placeholder="Insert url" size="30">
		<textarea id="input_description_model" class="input_info_model" placeholder="Insert description" rows="10" cols="30"></textarea>
	</div>

	<!-- DIV PRINCIPALE -->
	<div id="model_body"></div>

	<script type="text/javascript">
	
		var width_tree = screen.width, height_tree = screen.height;
		var width_node = 200, height_node = 80;
		var width_nodeplus = 40, height_nodeplus = 40;
		var width_modifyimg = 16, height_modifyimg = 16;
		var width_matriximg = 16, height_matriximg = 16;
		
		var text_modify = "Insert description...";
		var path_imgplus = "image/plus.png";
		
		var duration = 750;
		
		var tree, root, nodes;
		var diagonal, svg_body;
		var node, link;
		
		function confirmNewModel()
		{
			var allnodes_edited = d3.selectAll(".edit-rect");
			
			// Controllo se tutti i criteri hanno le descrizioni
			if(allnodes_edited.empty())
			{
// 				alert("Salvataggio sul DB del modello n.ro: "+modelId);
				
				// CHIAMATA REST PER IL SALVATAGGIO DEL MODELLO SUL DB
				clientRest.saveModel();
			}
			else{
				showAlert("Insert description inside all criterias!");
			}
		}
		
		function clearNewModel()
		{
			d3.select("svg").remove();
			
			clientRest.resetModel();
				
// 			createIntroModelWindow();
		}
		
		//----------------------------------------------------------------------------------
		
		$(document).ready(function () {
			
			createIntroModelWindow();
		});
				
		function introModelWindowClosed(objective, url, description)
		{	
			if(objective != null && url != null && description != null)
			{
				clientRest.createModel(objective, url, description); // CHIAMATA REST - Creazione di una nuova istanza sul server
			
				visualizeMenuside();
				rotateOff();
	 			createSubmenu(2, user.getId());
				
	 			init(objective);
			}
			else
				disableSubMenu();
		}
		
		// Inizializzazione dell'albero partendo dal nodo radice
		function init(objective)
		{	
			root = {};
			
			id_currentpage = 2;
			
			zoom_initial = 1;
			
			// Inizializzazione del modello
			initModel();
			
			// Inizializzazione id del nodo radice
			nodes[0].position = "C0";
			nodes[0].id = 0;
			
			// Aggiunta del group node sul nodo radice con id gnode_0
			node.enter().append("g").attr("id","gnode_0");
			
			// Aggiunta del nodo grafico edit sul nodo radice
			addNodeTextModify(0, objective);
			
			//
			update(0);
		}
		
		function update(id_node)
		{	
			computeNewNodes(id_node);
			
			updateModel();
		}
		
		function focusInputObjectiveModel()
		{
			$('#input_objective_model').css('box-shadow', 'inset 0 1px 3px rgba(0,0,0,1.0)');
		}
	
	</script>

</body>
</html>