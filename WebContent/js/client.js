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

/*
 * Classe definita per la gestione delle richieste REST verso il server
 * (creazione e aggiornamento risorsa Model - creazione e aggiornamento risorsa ModelInstance)
 */
var Client = function(http_req_model, http_req_criteria, http_req_model_instance, http_req_criteria_instance, http_req_operation_model, http_req_operation_model_instance, http_req_user){
	var req_model = http_req_model;
	var req_criteria = http_req_criteria;
	var req_model_instance = http_req_model_instance;
	var req_criteria_instance = http_req_criteria_instance;
	var req_operation_model = http_req_operation_model;
	var req_operation_model_instance = http_req_operation_model_instance;
	var req_user = http_req_user;
	var obj_app = this;
	
	//Funzione che effettua una richiesta POST per creare un nuovo modello
	this.createModel = function(name_model, url_model, description_model)
	{	
//		if(url_model == "")
//			url_model = "url";
//		if(description_model == "")
//			description_model = "description";
		
		// Richiesta POST per la creazione di un nuovo modello
		var address_request = 'rest/models/';
		req_model.createRequest('POST',address_request,true); 
		req_model.doRequestXML(util.stringToXml(util.createStringForAddModel(name_model, url_model, description_model, user.getId())) );
	}
	
	//Funzione che effettua una richiesta PUT per modificare le info su un modello
	this.modifyDataModel = function(name_model, url_model, description_model)
	{	
		if(modelId == null)
			view.messageBox("Non hai selezionato alcun modello!!");
		else
		{	
			var address_request = 'rest/models/'+modelId;
			req_model.createRequest('PUT',address_request,true); 
			req_model.doRequestXML(util.stringToXml(util.createStringForModifyDataModel(name_model, url_model, description_model)) );
		}	
	}
	
	// Funzione che effettua una richiesta PUT sul modello creato dall'utente passandogli i dati del nuovo criterio
	// da inserire
	this.addCriteria = function(criteria_position, criteria_description)
	{
		if(criteria_position == "" || criteria_description == "")	
			alert("insert information of criteria!");
		else
		{
			// Richiesta POST per la creazione di un nuovo criterio
			var address_request = 'rest/criterias/';
			req_criteria.createRequest('POST', address_request, true);
			req_criteria.doRequestXML(util.stringToXml(util.createStringForAddCriteria(criteria_position, criteria_description)));
		}
	}
	
	this.modifyCriteriaDescription = function(criteria_position, criteria_description)
	{
		if(criteria_position == "" || criteria_description == "")
			alert("Inserisci posizione e descrizione del criterio da modificare!!");				
		else
		{
			// Richiesta PUT per la modifica di un criterio (modifica descrizione)
			var address_request = 'rest/criterias/'+criteria_position;
			req_criteria.createRequest('PUT',address_request,true);
			req_criteria.doRequestXML(util.stringToXml(util.createStringForModifyCriteriaDescription( criteria_description )));
		}
	}
		
	this.deleteCriteria = function(criteriaPosition)
	{
		var address_request = 'rest/criterias/'+criteriaPosition+'?idModel='+modelId;
		
		req_criteria.createRequest('DELETE',address_request,true);
		req_criteria.doRequestXML(null);
	}
	
	this.getModel = function()
	{
		if(modelId == null)
			view.messageBox("Non hai selezionato alcun modello!!");
		else
		{
			// Richiesta POST per la creazione di un nuovo modello
			var address_request = 'rest/models/'+modelId;
			req_model.createRequest('GET',address_request,true); 
			req_model.doRequestXML(null,"getModel");
		}
	}
	
	this.getListModels = function()
	{
		var address_request = 'rest/models';
		req_model.createRequest('GET',address_request,true); 
		req_model.doRequestXML(null,"getModels");
		console.log("Richiesta Inviata : GET  /dss/rest/models");
	}
	
	this.printModel = function()
	{
		if(modelId == null)
			view.messageBox("Non hai selezionato alcun modello!!");
		else
		{
			// Richiesta POST per la creazione di un'operazione speciale di stampa del modello
			var address_request = 'rest/modeloperations/';
			req_operation_model.createRequest('POST',address_request,true); 
			req_operation_model.doRequestXML(util.stringToXml((util.createStringForOperationModel("printModel") )), "printModel" );
		}
	}
	
	this.saveModel = function(id_model)
	{
		if(modelId == null)
			view.messageBox("Non hai selezionato alcun modello!!");
		else
		{	
			// Richiesta POST per la creazione di un'operazione speciale di salvataggio del modello creato
			var address_request = 'rest/modeloperations/';
			req_operation_model.createRequest('POST',address_request,true); 
			req_operation_model.doRequestXML(util.stringToXml((util.createStringForOperationModel("saveModel", id_model) )), "saveModel" );
		}
	}
	
	this.cloneModel = function(withInstance)
	{
		if(modelId == null)
			view.messageBox("Non hai selezionato alcun modello!!");
		else
		{	
			if(withInstance == "cloneModelWithInstance") // Caso in cui si clona un'instanza, prima si deve clonare il modello
			{
				var address_request = 'rest/modeloperations/';
				req_operation_model.createRequest('POST',address_request,true); 
				req_operation_model.doRequestXML(util.stringToXml(util.createStringForOperationModel("cloneModel")), "cloneModelWithInstance" );
			}
			else if(withInstance == "cloneModelWithoutInstance"){
				var address_request = 'rest/modeloperations/';
				req_operation_model.createRequest('POST',address_request,true); 
				req_operation_model.doRequestXML(util.stringToXml(util.createStringForOperationModel("cloneModel")), "cloneModelWithoutInstance" );
			}
		}
	}
	
	this.deleteModel = function()
	{
		if(modelId == null)
			view.messageBox("Non hai selezionato alcun modello!!");
		else
		{
			var address_request = 'rest/models/'+modelId;
			req_model.createRequest('DELETE',address_request,true); 
			req_model.doRequestXML(null,"deleteModel");
		}
	}
	
	this.deleteModelsTmpOnServer = function()
	{
		var address_request = 'rest/models/?idUser='+user.getId();
		req_model.createRequest('DELETE',address_request,true); 
		req_model.doRequestXML(null,"deleteModelsTmp");
	}
	
//	this.resetDataModel = function()
//	{
//		var address_request = 'http://'+server_address+':'+port_number+'/dss/rest/modeloperations/';
//		req_operation_model_instance.createRequest('POST',address_request,true); 
//		req_operation_model_instance.doRequestXML(util.stringToXml(util.createStringForOperationModel("resetDataModel")), "resetDataModel" );
//	}
	
	this.resetModel = function()
	{
		if(modelId == null)
			view.messageBox("Non hai selezionato alcun modello!!");
		else
		{
			var index = util.getIndexById(models_db, modelId);
			var string_request_for_createXML;
			if(index != -1)
				string_request_for_createXML = "resetModelDB";
			else
				string_request_for_createXML = "resetModelTmp";
			
			var address_request = 'rest/modeloperations/';
			req_operation_model.createRequest('POST',address_request,true); 
			req_operation_model.doRequestXML(util.stringToXml(util.createStringForOperationModel(string_request_for_createXML)), "resetModel" );
		}	
	}
	
	// ------------------------------------------------------------------------------------------------------------------------------------------
	// -----------------------------------------------****** PARTE SULLE ISTANZE DEI MODELLI ******----------------------------------------------
	// ------------------------------------------------------------------------------------------------------------------------------------------
	
	//Funzione che effettua una richiesta POST per creare una nuova istanza di un modello
	this.createModelInstance = function(objective_instance)
	{	
		if(modelId == null)
			view.messageBox("Seleziona un modello su cui creare un'istanza!");
		else
		{	
			console.log("Oggetto istanza: " + objective_instance + " id utente: " + user.getId() + " id modello: " + modelId );
			
			var address_request = 'rest/modelinstances/';
			req_model_instance.createRequest('POST',address_request,true); 
			req_model_instance.doRequestXML(util.stringToXml(util.createStringForAddModelInstance(objective_instance, user.getId()) ));
		}
	}
	
	this.modifyDataModelInstance = function(objective_instance)
	{	
		if(modelInstanceId == null)
			view.messageBox("Non hai selezionato alcuna istanza!!");
		else
		{	
			var address_request = 'rest/modelinstances/'+modelInstanceId;
			req_model_instance.createRequest('PUT',address_request,true); 
			req_model_instance.doRequestXML(util.stringToXml(util.createStringForModifyDataModelInstance(objective_instance)) );
		}	
	}
	
	this.getDataCriteriaInstance = function(criteriaPosition, option_selected)
	{
		var address_request = 'rest/criteriasinstance/'+criteriaPosition;
		var request_xml;
		
		// ------------------------- Verifica opzione selezionata per la modifica del criterio con creazione della richiesta specifica ----------------------------------------
		var type_get = "";
		if(option_selected == "url_comment_retrieve")
		{
			address_request += '?idModelInstance='+modelInstanceId;
			req_criteria_instance.createRequest('GET',address_request,true);
			request_xml = null;
			type_get = "url-comment";
		}
		if(option_selected == "weights_retrieve")
		{
			address_request += '?idModelInstance='+modelInstanceId;
			req_criteria_instance.createRequest('GET',address_request,true);
			request_xml = null;
			type_get = "weights";
		}
		else if(option_selected == "if_retrieve")
		{
			address_request += '?idModelInstance='+modelInstanceId;
			req_criteria_instance.createRequest('GET',address_request,true);
			request_xml = null;
			type_get = "if";
		}
		
		req_criteria_instance.doRequestXML(request_xml, type_get);	
	}
	
	this.insertLogicFunctions = function(criteriaPosition, query1, cmp1, thr1_lf1, thr2_lf1, query2, cmp2, thr1_lf2, thr2_lf2, notFunction1, logicConnector, notFunction2,
			typeIF1, value_true1, value_false1, typeIF2, value_true2, value_false2, repository)
	{
		var address_request = 'rest/criteriasinstance/'+criteriaPosition;
		req_criteria_instance.createRequest('PUT',address_request,true); 
		
		console.log("XML For insert LogicFunctionsManagers:\n"+util.createStringForInsertLogicFunctionManager(query1, cmp1, thr1_lf1, thr2_lf1, 
				query2, cmp2, thr1_lf2, thr2_lf2, notFunction1, logicConnector, notFunction2, typeIF1, value_true1, value_false1, typeIF2, value_true2, value_false2, repository));
		var xml_logic_functions_managers = util.stringToXml(util.createStringForInsertLogicFunctionManager(query1, cmp1, thr1_lf1, thr2_lf1, 
				query2, cmp2, thr1_lf2, thr2_lf2, notFunction1, logicConnector, notFunction2, typeIF1, value_true1, value_false1, typeIF2, value_true2, value_false2, repository));
		
		console.log("XML DA INVIARE:\n");
		console.log(xml_logic_functions_managers);
		
		req_criteria_instance.doRequestXML(xml_logic_functions_managers, "insert_logic_functions");		
	}
	
	this.saveInfoCriteriaInstance = function(criteriaPosition, url_instance, comment_instance)
	{
//		alert(criteriaPosition);
		console.log("Dentro save info client:"+criteriaPosition);
		
		var address_request = 'rest/criteriasinstance/'+criteriaPosition;
	
		req_criteria_instance.createRequest('PUT', address_request, true);
		var request_xml = util.stringToXml(util.createStringForModifyURLComment(url_instance, comment_instance));
		
		req_criteria_instance.doRequestXML(request_xml, "info");
	}
	
	this.saveDataCriteriaInstance = function(criteriaPosition, option_selected, data_criteria_instance)
	{
		
		var address_request = 'rest/criteriasinstance/'+criteriaPosition;
		var request_xml;
	
		if(option_selected == "vector_weights_insert")
		{
			req_criteria_instance.createRequest('PUT', address_request, true);
			request_xml = util.stringToXml(util.createStringForModifyWeights(data_criteria_instance));
		}	
		else if(option_selected == "matrix_comparison_insert")
		{
			req_criteria_instance.createRequest('PUT', address_request, true);
			request_xml = util.stringToXml(util.createStringForModifyMatrix(data_criteria_instance));
		}	
		else if(option_selected == "if_insert")
		{
			req_criteria_instance.createRequest('PUT', address_request, true);
			var green_value = data_criteria_instance.green;
			var white_value = data_criteria_instance.white;
			var red_value   = data_criteria_instance.red;
			request_xml = util.stringToXml(util.createStringForModifyIF(green_value, white_value, red_value));
		}	
		
		req_criteria_instance.doRequestXML(request_xml, "data");	
	}
	
	this.saveModelInstance = function(id_modelinstance, id_model)
	{
		if(modelInstanceId == null)
			view.messageBox("Non hai selezionato alcuna istanza!!");
		else
		{	
			var address_request = 'rest/modelinstanceoperations/';
			req_operation_model_instance.createRequest('POST',address_request,true); 
			req_operation_model_instance.doRequestXML(util.stringToXml((util.createStringForOperationModelInstance("saveModelInstance", id_modelinstance, id_model) )), "saveModelInstance" );
		}
	}
	
	this.cloneModelInstance = function()
	{
		if(modelInstanceId == null)
			view.messageBox("Non hai selezionato alcuna istanza!!");
		else
		{	
			var address_request = 'rest/modelinstanceoperations/';
			req_operation_model_instance.createRequest('POST',address_request,true); 
			
			console.log("STRING FOR CLONE MODEL INSTANCE");
			console.log(util.createStringForOperationModelInstance("cloneModelInstance"));
			
//			alert("Model id: "+ modelId + "ModelInstanceId: "+ modelInstanceId);
			
			req_operation_model_instance.doRequestXML(util.stringToXml(util.createStringForOperationModelInstance("cloneModelInstance")), "cloneModelInstance" );
		}
	}
	
	this.printModelInstance = function()
	{
		if(modelInstanceId == null)
			view.messageBox("Non hai selezionato alcuna istanza!!");
		else
		{	
			var address_request = 'rest/modelinstanceoperations/';
			req_operation_model_instance.createRequest('POST',address_request,true); 
			req_operation_model_instance.doRequestXML(util.stringToXml((util.createStringForOperationModelInstance("printModelInstance") )), "printModelInstance" );
		}
	}
	
	this.getModelInstance = function()
	{
		if(modelInstanceId == null)
			view.messageBox("Non hai selezionato alcuna istanza!!");
		else
		{
			var address_request = 'rest/modelinstances/'+modelInstanceId;
			req_model_instance.createRequest('GET',address_request,true); 
			req_model_instance.doRequestXML(null,"getModelInstance");
		}
	}
	
	this.getListModelInstances = function()
	{
		var address_request = 'rest/modelinstances';
		req_model_instance.createRequest('GET',address_request,true); 
		req_model_instance.doRequestXML(null,"getModelInstances");
	}
	
	this.getListStatusModelInstances = function()
	{
		var address_request = 'rest/modelinstances';
		req_model_instance.createRequest('GET',address_request,true); 
		req_model_instance.doRequestXML(null,"getModelInstances_status");
	}
	
	this.deleteModelInstance = function()
	{
		if(modelInstanceId == null)
			alert("Non hai selezionato alcuna istanza!!");
		else
		{
			var address_request = 'rest/modelinstances/'+modelInstanceId;
			req_model_instance.createRequest('DELETE',address_request,true); 
			req_model_instance.doRequestXML(null,"deleteModelInstance");
		}
	}
	
	this.deleteModelInstancesTmpOnServer = function()
	{
		var address_request = 'rest/modelinstances/?idUser='+user.getId();
		req_model_instance.createRequest('DELETE',address_request,true); 
		req_model_instance.doRequestXML(null,"deleteModelInstancesTmp");
	}
	
	this.importDataFromInstance = function(idInstance)
	{
		var address_request = 'rest/modelinstanceoperations/';
		req_operation_model_instance.createRequest('POST',address_request,true); 
		req_operation_model_instance.doRequestXML(util.stringToXml(util.createStringForImportDataModelInstance("importDataModelInstance", idInstance)), "importDataModelInstance" );
	}
	
//	this.resetDataModelInstance = function()
//	{
//		var address_request = 'http://'+server_address+':'+port_number+'/dss/rest/modelinstanceoperations/';
//		req_operation_model_instance.createRequest('POST',address_request,true); 
//		req_operation_model_instance.doRequestXML(util.stringToXml(util.createStringForOperationModelInstance("resetDataModelInstance")), "resetDataModelInstance" );
//	}
	
	this.resetModelInstance = function()
	{
		if(modelInstanceId == null)
			view.messageBox("Non hai selezionato alcuna istanza!!");
		else
		{
			var index = util.getIndexById(modelinstances_db, modelInstanceId);
			var string_request_for_createXML;
			if(index != -1)
				string_request_for_createXML = "resetModelInstanceDB";
			else
				string_request_for_createXML = "resetModelInstanceTmp";
			
			var address_request = 'rest/modelinstanceoperations/';
			req_operation_model_instance.createRequest('POST',address_request,true); 
			req_operation_model_instance.doRequestXML(util.stringToXml(util.createStringForOperationModelInstance(string_request_for_createXML)), "resetModelInstance" );
		}	
	}
	
	this.simulateQuery = function(query, logicFunctionId, repository)
	{	
		var address_request = 'rest/modelinstanceoperations/';
		req_operation_model_instance.createRequest('POST',address_request,true); 
		req_operation_model_instance.doRequestXML(util.stringToXml(util.createStringForSimulateQueryModelInstance("simulateQuery", query, logicFunctionId, repository)), "simulateQuery" );
	}
	
	this.computeDecision = function()
	{
		var address_request = 'rest/modelinstanceoperations/';
		req_operation_model_instance.createRequest('POST',address_request,true); 
		req_operation_model_instance.doRequestXML(util.stringToXml(util.createStringForOperationModelInstance("computeDecision")), "computeDecision" );
	}
	
	
	// ------------------------------------------------------------------------------------------------------------------------------------------
	// -----------------------------------------------------****** PARTE SULL'UTENTE ******-------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------------------------------------
	
//	this.getUserData = function(userId)
//	{
//		var address_request = 'http://'+server_address+':'+port_number+'/dss/rest/users/'+userId;
//		req_user.createRequest('GET', address_request, true); 
//		req_user.doRequestXML(null);
//	}
	
	this.modifyUserLogged = function(email, password, name, country, userId)
	{
		var address_request = 'rest/users/'+userId;
		req_user.createRequest('PUT', address_request, true); 
		req_user.doRequestXML(util.stringToXml((util.createStringForModifyUserLogged(email, password, name, country) )),"modifyUserLogged");
	}
	
	this.modifyUserFromAdmin = function(userType, userId)
	{
		var address_request = 'rest/users/'+userId;
		req_user.createRequest('PUT', address_request, true); 
		req_user.doRequestXML(util.stringToXml((util.createStringForModifyUserFromAdmin(userType) )),"modifyUserFromAdmin");
	}
}
