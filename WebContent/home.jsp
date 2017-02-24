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


<%@ page import="dss.user.*"%>
<%@ page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=US-ASCII"
    pageEncoding="US-ASCII"%>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>

<head>

	<meta http-equiv="Content-Type" content="text/html; charset=US-ASCII">
	<meta http-equiv="Cache-control" content="public">
	
	<title>Smart DS</title>
	
	<!-- External library -->
	<script type="text/javascript" src="lib/d3/d3.min.js"></script>
	<script type="text/javascript" src="lib/jquery/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="lib/jquery-ui/jquery-ui.js"></script>
	<link rel="stylesheet" href="lib/jquery-ui/jquery-ui.css" type="text/css" media="screen" />
	<script type="text/javascript" src="lib/spin/spin.js"></script>
	
	<!-- Internal library -->
	<script type="text/javascript" src="lib/XML/ObjTree.js"></script>
	<script type="text/javascript" src="js/client.js"></script>
	<script type="text/javascript" src="js/connection/asyncContext.js"></script>
	<script type="text/javascript" src="js/httprequest/httpRequestModel.js"></script>
	<script type="text/javascript" src="js/httprequest/httpRequestCriteria.js"></script>
	<script type="text/javascript" src="js/httprequest/httpRequestModelInstance.js"></script>
	<script type="text/javascript" src="js/httprequest/httpRequestCriteriaInstance.js"></script>
	<script type="text/javascript" src="js/httprequest/httpRequestOperationModel.js"></script>
	<script type="text/javascript" src="js/httprequest/httpRequestOperationModelInstance.js"></script>
	<script type="text/javascript" src="js/httprequest/httpRequestUser.js"></script>
	<script type="text/javascript" src="js/view/view.js"></script>
	<script type="text/javascript" src="js/util/util.js"></script>
	<script type="text/javascript" src="js/data/user.js"></script>
	<script type="text/javascript" src="js/data/model.js"></script>
	<script type="text/javascript" src="js/data/modelInstance.js"></script>
	<script type="text/javascript" src="js/data/modelCloned.js"></script>
	<script type="text/javascript" src="js/graphics/windows/info_div.js"></script>
	<script type="text/javascript" src="js/graphics/windows/modify_model_window.js"></script>
	<script type="text/javascript" src="js/graphics/windows/alert_window.js"></script>
	
	<!-- Sliding effect -->
	<script src="lib/jquery/slide.js" type="text/javascript"></script>
	
	<!-- Style CSS -->
	<link rel="stylesheet" href="css/menu/menu.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/home.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/window.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/slide_user/style.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/slide_user/slide.css" type="text/css" media="screen" />

</head>


<body onbeforeunload=" return checkUnload()" onunload="deleteTemporaryData()">


	<%
		// Codice Java per il controllo sull'accesso - lo permette solo se la sessione esiste
		User user = null;
		ArrayList<String[]> users = null;
		
		if(session.getAttribute("User") == null) 
		{
// 			response.sendRedirect("login.html");
			request.getRequestDispatcher("login.html").include(request, response);
		}
		else
		{
			user = (User) session.getAttribute("User");
			if(user.getType() == 4)
				users = (ArrayList<String[]>) session.getAttribute("Users");
		}
		
		String userName = null;
		String sessionID = null;
		Cookie[] cookies = request.getCookies();
		if(cookies !=null)
		{
			for(Cookie cookie : cookies)
			{
				if(cookie.getName().equals("user")) 
					userName = cookie.getValue();
				if(cookie.getName().equals("JSESSIONID")) 
					sessionID = cookie.getValue();
			}
		}
		else{
			sessionID = session.getId();
		}
	%>
	
	
	
	<div id="loading" class="loading"></div>
 
<!--   	<button style="position:absolute;left:5px;top:10px" onclick="debug()">Debug Model</button> -->
<!--  	<button style="position:absolute;left:5px;top:30px" onclick="debugMI()">Debug Instance</button>  -->
 
	<!-- MENU PRINCIPALE --> 
	<div id="nav"></div>

	
	<!-- MENU LATERALE --> 
	<div id="menu-side" style="display:none"></div>
	
	
	<!-- SOTTO MENU --> 
	<div id="sub-menu" style="display:none"></div>
	
	
	<!-- SLIDER AL TOP DELLA PAGINA *** LOGIN/LOGOUT USER -->
	<div id="toppanel"></div> 
	
	
	<!-- SEZIONE PRINCIPALE -->
	<div id="section"></div>
	
	
	<!-- INFO MODEL E INSTANCE MODEL -->
	<div id="model_instancemodel_info" style="display:none" title="Click to move panel"> 
		<div class="info-left">
			<span id="spanNameModel">Name Model</span><label id="nameModelInfo" class="label-info"></label>
			<span id="spanNameInstance">Name Process</span><label id="nameInstanceInfo" class="label-info"></label>
			<input type="text" class="input-info" id="inputNameInstance" maxlength=30 onclick="selectTextNameInstance()"><label id="labelConfirmInput" class="label-confirm">ENTER to confirm<br>ESC to reset</label>
			<span id="spanUser">User owner</span><label id="userInfo" class="label-info"></label>
			<span id="spanUrl">Url</span><label id="urlInfo" class="label-info"></label>
		</div>
		<div class="info-right">
			<span id="spanDateCreate">Date creation</span><label id="dateCreateInfo" class="label-info"></label>
			<span id="spanDateLastModify">Date last modify</span><label id="dateLastModifyInfo" class="label-info"></label>
			<span id="spanDescription">Description</span><label id="descriptionInfo" class="label-info"></label>
			<span id="spanTimeStartExec">Start execute</span><label id="startExecInfo" class="label-info"></label>
			<span id="spanTimeEndExec">End execute</span><label id="endExecInfo" class="label-info"></label>
		</div>
		
		<button id="buttonModifyInfoModel" class="button-modify-info" title="Edit information model"></button>
		<button id="buttonModifyInfoInstance" class="button-modify-info" title="Edit information instance" onclick="clickModifyInfoInstance()"></button>
		<div id="container-link-xml">
			<a id="view-xml" href="#" onclick="viewXML()" class="link-xml" target="_blank">View XML structure</a>
		</div>
	</div>
	
	<!-- DIV PER LA MODIFICA DELLE INFORMAZIONI DEL MODELLO -->
	<div id="div_modify_info_model" style="display:none" title="Modify info model">
		<input type="text" class="input_info_model" id="input_objective_modify_model" placeholder="Insert name model" size="30" onfocus="focusInputObjectiveModifyModel()">
		<input type="text" class="input_info_model" id="input_url_modify_model" placeholder="Insert url" size="30">
		<textarea class="input_info_model" id="input_description_modify_model" placeholder="Insert description" rows="10" cols="30"></textarea>
	</div>
	
	<!-- DIV PER ALERT -->
	<div id="div_alert" style="display:none">
		<img src="image/warning.png" id="img_warning">
		<label id="text_alert">Testo alert</label>
	</div>

	<script type="text/javascript">
	
		var target = document.getElementById('loading');
	    var spinner = new Spinner(opts).spin(target);
	
		//Definizione variabili globali  		
		var clientRest; // oggetto classe Client utilizzato per gestire l'aggiunta e la cancellazione di presenze o l'invio di messaggi
		
		var view; // oggetto view per interagire con gli oggetti presenti nella pagina e mandare messaggi a video
		var util; // oggetto utilizzando per le conversioni da stringa a XML e viceversa
		
		var user;
		var users;
		
		var json_data = null;
		
		var modelId;
		var modelInstanceId;
		var specific_object;
		var criteriaInstanceId;
		
		var models_tmp = [];
		var models_db = [];
		var models_cloned = [];
		var models_notsaved = [];
		var modelinstances_tmp = [];
		var modelinstances_db = [];
		var modelinstances_notsaved = [];
		var modelinstances_to_import_data = [];
		
		var options_modelinstances = null;
		
		var messageError = null;
		
		var zoom_initial;
		
		var xml_model = null;
		var xml_instance = null;
		
		var xml_data = null;
		
		var id_currentpage = 0;
		var type_rotate = "vertical";
		
		var timer_tooltip_visible = null;
		
		var intervalReloadInstance = null;
		
		var repository = "";
		
		var id_page_section;
		var green_IFinsert = 0.0, white_IFinsert = 0.0, red_IFinsert = 0.0;
		
		var position_button = null;
		
		$(document).ready(function() 
		{	
			$( "#model_instancemodel_info" ).draggable({ scroll: false });
			
			// Inizializzazione delle funzioni per le richieste REST verso il server
			init();

			openLink("menu.html", 'nav');
			openLink("menuside.html", 'menu-side');
			openLink("submenu.html", 'sub-menu');
			openLink("slider.html", 'toppanel');
			
			var $dialog = $('#div_modify_info_model').dialog({
				autoOpen:false,
				resizable: false,
		        height: 400,
		        width: 400,
		        modal: true
			});

		    $('#buttonModifyInfoModel').click(function() {
		    	createModifyInfoModelWindow($dialog);
		    });
		    
<%-- 		    CONTEXT_ROOT = "<%= request.getContextPath() %>"; --%>
		});
		
		function init()
		{
			view  = new View(this, document);
			util = new Util();
			var http_req_model = new HTTPRequestModel(); 
			var http_req_criteria = new HTTPRequestCriteria();
			var http_req_model_instance = new HTTPRequestModelInstance();
			var http_req_criteria_instance = new HTTPRequestCriteriaInstance();
			var http_req_operation_model = new HTTPRequestOperationModel();
			var http_req_operation_model_instance = new HTTPRequestOperationModelInstance();
			var http_req_user = new HTTPRequestUser();
			
			clientRest = new Client(http_req_model, http_req_criteria, http_req_model_instance, http_req_criteria_instance, http_req_operation_model, http_req_operation_model_instance, http_req_user);
			
			setUserJS();		
		}
		
		function openLink(url, target)
		{
			$("#"+target).load(url);
		}
		
		function setUserJS()
		{
			user = new User();
			user.setUser(<%=user.getId()%>, "<%=user.getName() %>", "<%=user.getEmail() %>", "<%=user.getCountry() %>", <%=user.getType()%>);
			
			<%  int n_permits = user.getPermitsModel().length; 
				for(int i = 0; i < n_permits; i++)
				{%> 
					user.setPermitModel("<%=user.getPermitModel(i).getDescription()%>","<%=user.getPermitModel(i).getValue()%>", <%=i%>);
				<%}
			%>  
			
			if(user.getName() === "Guest")
			{
				messageError = "<%= request.getAttribute("messageError")%>";	
			}
			
			if(user.getType() === 4)
			{
				users = new Array();
				
				<%if(user.getType() == 4)
				{
					int n_users = users.size(); 
					for(int i = 0; i < n_users; i++)
					{%> 
						var user_tmp = new User();
						user_tmp.setUser(<%=users.get(i)[0]%>, "<%=users.get(i)[1]%>", "<%=users.get(i)[2]%>", "<%=users.get(i)[3]%>", <%=users.get(i)[4]%>);
						users.push(user_tmp);
					<%}
				}%>
			}
		}
		
		/*
		 * Funzione che cattura l'evento onbeforeunload (chiusura pagina) di Javascript 
		 * e se avverte l'utente di salvare i modelli modificati dopo il caricamento
		 */
		function checkUnload(){
			if(models_notsaved.length != 0 || modelinstances_notsaved.length != 0)
				return 'Ci sono dei modelli e/o istanze non salvate desideri comunque abbandonare la pagina? Le modifiche non salvate andranno perse.';
		}

		function deleteTemporaryData()
		{		
			if(models_notsaved.length != 0)
				clientRest.deleteModelsTmpOnServer();
			if(modelinstances_notsaved.length != 0)
				clientRest.deleteModelInstancesTmpOnServer();
		}

		function unloadRequests(){
			this.deleteTemporaryData();
		}

		function debug(){
			clientRest.printModel();
		}
		
		function debugMI(){
			clientRest.printModelInstance();
		}
		
		function viewXML()
		{
			if($("#model_body").length > 0)
				$('#view-xml').attr('href','rest/models/'+modelId);
			if($("#instance_body").length > 0)
				$('#view-xml').attr('href','rest/modelinstances/'+modelInstanceId);
			
// 			if(xml_data != null)
// 				$('#view-xml').attr('href','data:text/xml,' + util.xmlToString(xml_data).replace(/"/gi, "'"));
		}

		function xmlModel(xml)
		{
			xml_data = xml;
		}
		
		function xmlInstance(xml)
		{
			xml_data = xml;
		}
		
		function focusInputObjectiveModifyModel()
		{
			$('#input_objective_modify_model').css('box-shadow', 'inset 0 1px 3px rgba(0,0,0,1.0)');
		}
		
		function selectTextNameInstance()
		{
			var focusedElement = $('#inputNameInstance');
	        setTimeout(function () { focusedElement.select(); }, 50);
		}
		
		function loadingFinished()
		{	
			$(".loading").fadeOut("slow");
		}
		
	</script>	

</body>

</html>