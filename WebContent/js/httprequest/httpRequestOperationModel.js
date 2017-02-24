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
 * Classe definita per gestire le richieste REST effettuate dal client per operazioni di creazione e modifica 
 * di risorse Model
 */
var HTTPRequestOperationModel = function( )
{
	var type;
	var address_request;
	var async_mode;
	var req_xml;
	var this_app = this;
	
	// Funzione che memorizza il tipo di richiesta nella variabile type, l'indirizzo in address_c e 
	// la modalità di risposta async_mode_c = true se � richiesta una connessione asincrona 
	// e async_mode_c = false per quella sincrona
	this.createRequest = function(type_c, address_c, async_mode_c)
	{
		type = type_c;
		address_request = address_c;
		async_mode = async_mode_c;
	}
	
	
	// Funzione che invia al server una richiesta POST o PUT in formato XML per creazione o modifica di una risorsa Model
	this.doRequestXML = function(xml_model, operation)
	{		
		req_xml = new XMLHttpRequest();
		req_xml.open(type, address_request, async_mode);
		//req_json.setRequestHeader("Accept","application/json");
		req_xml.setRequestHeader("Content-Type","application/xml");
		if(operation == "printModel")
			req_xml.onreadystatechange = function(){ this_app.responsePrintModelXML(); };
		else if(operation == "saveModel")
			req_xml.onreadystatechange = function(){ this_app.responseSaveModelXML(); };
		else if(operation == "cloneModelWithoutInstance")
			req_xml.onreadystatechange = function(){ this_app.responseCloneModelXML(); };
		else if(operation == "cloneModelWithInstance")
			req_xml.onreadystatechange = function(){ this_app.responseCloneModelWithInstanceXML(); };
		else if(operation == "resetModel")
			req_xml.onreadystatechange = function(){ this_app.responseResetModelXML(); };
		req_xml.send(xml_model);
	}
	
	
	// Funzione che cattura la risposta alla richiesta PUT in formato XML per la modifica di una risorsa Model per la modifica di un Criteria
	this.responsePrintModelXML = function()
	{
		if(req_xml.readyState == 4 && req_xml.status == 200)
		{
			view.messageBox("Modello "+modelId+" stampato sul server");
		}	
	}
	
	
	// Funzione che cattura la risposta alla richiesta PUT in formato XML per la modifica di una risorsa Model per la modifica di un Criteria
	this.responseSaveModelXML = function()
	{
		if(req_xml.readyState == 4 && req_xml.status == 200)
		{	
			// Spostamento del modello dal vettore dei modelli tmp a quello dei modelli salvati
			var index = util.getIndexById(models_tmp, modelId);
			if(index != -1)
			{
				models_db.push(new Model(models_tmp[index].getId(), models_tmp[index].getObjective(), models_tmp[index].getUserId(),models_tmp[index].getUrl(), models_tmp[index].getDescription(), models_tmp[index].getDateCreate(), models_tmp[index].getDateLastModify()));
				models_tmp.splice(index,1);	
			}
			
			var index_notsaved = util.getIndexById(models_notsaved, modelId);
			if(index_notsaved != -1)
			{
				models_notsaved.splice(index_notsaved,1);	
			}
			
			view.modelSaved();
		}	
	}
	
	this.responseCloneModelXML = function()
	{
		if(req_xml.readyState == 4 && req_xml.status == 200)
		{
			var obj_xml = req_xml.responseXML;
			var modelIdStart = modelId;
			
//			alert(req_xml.responseText);
			
			modelId = obj_xml.getElementsByTagName("modelId")[0].textContent;
			
			var objective = obj_xml.getElementsByTagName("objective")[0].textContent;
			var userId = obj_xml.getElementsByTagName("modelUserId")[0].textContent;
			var urlModel = obj_xml.getElementsByTagName("url")[0].textContent;
			var descriptionModel = obj_xml.getElementsByTagName("description")[0].textContent;
			var date_createModel = obj_xml.getElementsByTagName("date_create_model")[0].textContent;
			var date_lastmodifyModel = obj_xml.getElementsByTagName("date_last_modify_model")[0].textContent;
			
			// Aggiunta del modello nella lista temporanea dei modelli
			models_tmp.push(new Model(modelId, objective, userId, urlModel, descriptionModel, date_createModel, date_lastmodifyModel));
			
			// Aggiunta del modello nella lista dei modelli che ancora non sono stati salvati su DB
			models_notsaved.push(new Model(modelId, objective, userId, urlModel, descriptionModel, date_createModel, date_lastmodifyModel));
			
			// Aggiunta del modello nella lista di quelli clonati
			var model_cloned = new ModelCloned(modelId, modelIdStart);
			models_cloned.push(model_cloned);
			
			view.modelCloned(modelId, false);
		}	
	}
	
	this.responseCloneModelWithInstanceXML = function()
	{
		if(req_xml.readyState == 4 && req_xml.status == 200)
		{
			var obj_xml = req_xml.responseXML;
			var modelIdStart = modelId;
			
			var id_model = obj_xml.getElementsByTagName("modelId")[0].textContent;
			var objective = obj_xml.getElementsByTagName("objective")[0].textContent;
			var userId = obj_xml.getElementsByTagName("modelUserId")[0].textContent;
			var urlModel = obj_xml.getElementsByTagName("url")[0].textContent;
			var descriptionModel = obj_xml.getElementsByTagName("description")[0].textContent;
			var date_createModel = obj_xml.getElementsByTagName("date_create_model")[0].textContent;
			var date_lastmodifyModel = obj_xml.getElementsByTagName("date_last_modify_model")[0].textContent;
			
			// Aggiunta del modello nella lista temporanea dei modelli
			models_tmp.push(new Model(id_model, objective, userId, urlModel, descriptionModel, date_createModel, date_lastmodifyModel));
			
			// Aggiunta del modello nella lista dei modelli che ancora non sono stati salvati su DB
			models_notsaved.push(new Model(id_model, objective, userId, urlModel, descriptionModel, date_createModel, date_lastmodifyModel));
			
			// Aggiunta del modello nella lista di quelli clonati
			var model_cloned = new ModelCloned(id_model, modelIdStart);
			models_cloned.push(model_cloned);
			
			view.modelCloned(id_model, true);
		}	
	}
	
	this.responseResetModelXML = function()
	{
		if(req_xml.readyState == 4 && req_xml.status == 200)
		{
			var xml_obj = req_xml.responseXML;
			if(xml_obj == null)
			{
				var index = util.getIndexById(models_tmp, modelId);
				models_tmp.splice(index,1);

				modelId = null;
				
				view.resetModelTMP();
			}else{
				
				var xtree = new XML.ObjTree();
				var json = xtree.parseXML(req_xml.responseText);
				var json_string_complete = util.JSONToString(json);
				var json_string = util.adjustStringToModelTree(json_string_complete);
				json_string = util.adjustStringToModelWithOneChildren(json_string);
				json_data = util.StringToJSON(json_string);
				
				view.resetModelDB();
			}
			
			var index = util.getIndexById(models_notsaved, modelId);
			if(index != -1)
				models_notsaved.splice(model);
		}	
	}
}