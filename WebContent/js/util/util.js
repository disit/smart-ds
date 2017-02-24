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
 * Classe definita per gestire operazioni di utilità quali:
 * conversione da stringa a xml o viceversa
 * costruzione xml per l'aggiunta di un Model o per l'aggiunta di un Criteria collegato ad un Model
 */
var Util = function( ){

	// Funzione per la creazione del file xml per l'aggiunta di un model
	this.createStringForAddModel = function(objective, url, description, userId)
	{
		var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><model><objective>"+objective+"</objective><url>"+url+"</url><description_model>"+description+"</description_model><modelUserId>"+userId+"</modelUserId></model>";
		return text_xml;
	}
	
	this.createStringForModifyDataModel = function(objective, url, description)
	{
		var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><model><objective>"+objective+"</objective><url>"+url+"</url><description_model>"+description+"</description_model></model>";
		return text_xml;
	}
	
	this.createStringForOperationModel = function(operation, id_model)
	{
		if(operation == "saveModel")
			var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><operation><modelId>"+id_model+"</modelId><description>"+operation+"</description><userId>"+user.getId()+"</userId></operation>";
		else
			var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><operation><modelId>"+modelId+"</modelId><description>"+operation+"</description><userId>"+user.getId()+"</userId></operation>";
		return text_xml;
	}
	
	// Funzione per la creazione del file xml per l'aggiunta di un model instance
	this.createStringForAddModelInstance = function(objective, userId)
	{
		var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><modelinstance><specific_objective>"+objective+"</specific_objective><instanceUserId>"+userId+"</instanceUserId><modelId>"+modelId+"</modelId></modelinstance>";
		return text_xml;
	}
	
	this.createStringForModifyDataModelInstance = function(objective)
	{
		var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><modelinstance><specific_objective>"+objective+"</specific_objective></modelinstance>";
		return text_xml;
	}
	
	this.createStringForOperationModelInstance = function(operation, id_modelinstance, id_model)
	{
		if(operation == "saveModelInstance")
			var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><operationinstance><modelInstanceId>"+id_modelinstance+"</modelInstanceId><modelId>"+id_model+"</modelId><description>"+operation+"</description><instanceUserId>"+user.getId()+"</instanceUserId></operationinstance>";
		else
			var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><operationinstance><modelInstanceId>"+modelInstanceId+"</modelInstanceId><modelId>"+modelId+"</modelId><description>"+operation+"</description><instanceUserId>"+user.getId()+"</instanceUserId></operationinstance>";
		return text_xml;
	}
	
	this.createStringForSimulateQueryModelInstance = function(operation, query, logicFunctionId, repository)
	{
		var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><operationinstance><modelInstanceId>"+modelInstanceId+"</modelInstanceId><description>"+operation+"</description><query>"+query+"</query><logicFunctionId>"+logicFunctionId+"</logicFunctionId><repository>"+repository+"</repository></operationinstance>";
		return text_xml;
	}
	
	this.createStringForImportDataModelInstance = function(operation, idInstance)
	{
		var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><operationinstance><description>"+operation+"</description><modelInstanceId>"+modelInstanceId+"</modelInstanceId><modelId>"+modelId+"</modelId><modelInstanceIdImportData>"+idInstance+"</modelInstanceIdImportData></operationinstance>";
		return text_xml;
	}
	
	this.createStringForAddCriteria = function(position, description)
	{
		var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><criteria><position>"+position+"</position><description>"+description+"</description><modelId>"+modelId+"</modelId></criteria>";
		return text_xml;
	} 
	
	this.createStringForModifyCriteriaDescription = function(description)
	{
		var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><criteria><description>"+description+"</description><modelId>"+modelId+"</modelId></criteria>";
		return text_xml;
	}
	
	this.createStringForModifyURLComment = function(url, comment)
	{
		var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><criteriainstance><url>"+url+"</url><comment>"+comment+"</comment><modelInstanceId>"+modelInstanceId+"</modelInstanceId></criteriainstance>";
		return text_xml;
	}
	
	this.createStringForModifyWeights = function(vect)
	{
		var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><criteriainstance><weightsSerialized>"+vect+"</weightsSerialized><modelInstanceId>"+modelInstanceId+"</modelInstanceId></criteriainstance>";
		return text_xml;
	}
	
	this.createStringForModifyMatrix = function(matrix)
	{
		var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><criteriainstance><matrixSerialized>"+matrix+"</matrixSerialized><modelInstanceId>"+modelInstanceId+"</modelInstanceId></criteriainstance>";
		return text_xml;
	}
	
//	this.createStringForModifyIF = function(green, white, red)
//	{
//		var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><criteriainstance><IF_green>"+green+"</IF_green><IF_white>"+white+"</IF_white><IF_red>"+red+"</IF_red><modelInstanceId>"+modelInstanceId+"</modelInstanceId></criteriainstance>";
//		return text_xml;
//	}
	
	this.createStringForModifyIF = function(green, white, red)
	{
		var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><criteriainstance><IF_insert><IF_green>"+green+"</IF_green>"
						+"<IF_white>"+white+"</IF_white><IF_red>"+red+"</IF_red></IF_insert><modelInstanceId>"+modelInstanceId+"</modelInstanceId></criteriainstance>";
		return text_xml;
	}
	
	this.createStringForInsertLogicFunctionManager = function(query1, compare1, threshold1_lf1, threshold2_lf1, query2, compare2, 
						threshold1_lf2, threshold2_lf2, notFunction1, logicConnector, notFunction2, typeIF1, value_true1, value_false1, typeIF2, value_true2, value_false2, repository)
	{
		var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><criteriainstance><function_manager>";
		text_xml += "<logic_function1><query>"+query1+"</query><compare>"+compare1+"</compare><threshold1>"+threshold1_lf1+"</threshold1><threshold2>"+threshold2_lf1+"</threshold2></logic_function1>";
		text_xml += "<logic_function2><query>"+query2+"</query><compare>"+compare2+"</compare><threshold1>"+threshold1_lf2+"</threshold1><threshold2>"+threshold2_lf2+"</threshold2></logic_function2>";
		text_xml +=	"<notFunction1>"+notFunction1+"</notFunction1><logicConnector>"+logicConnector+"</logicConnector><notFunction2>"+notFunction2+"</notFunction2>";
		text_xml += "<typeIF1>"+typeIF1+"</typeIF1><value_true1>"+value_true1+"</value_true1><value_false1>"+value_false1+"</value_false1>";
		text_xml += "<typeIF2>"+typeIF2+"</typeIF2><value_true2>"+value_true2+"</value_true2><value_false2>"+value_false2+"</value_false2>";
		text_xml += "<SPARQLRepository>"+repository+"</SPARQLRepository>";
		text_xml += "</function_manager><modelInstanceId>"+modelInstanceId+"</modelInstanceId></criteriainstance>";
		return text_xml;
	}
	
	this.createStringForModifyUserLogged = function(email, password, name, country)
	{
		var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><user><email>"+email+"</email><password>"+password+"</password><name>"+name+"</name><country>"+country+"</country></user>";
		return text_xml;
	}
	
	this.createStringForModifyUserFromAdmin = function(userType)
	{
		var text_xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><user><type>"+userType+"</type></user>";
		return text_xml;
	}
	
	// ---------------------------------------------------------------------------------------------------------------------
	
	// Funzioni per la conversione da stringa a xml e viceversa
	this.stringToXml = function(string_req)
	{
		var parser_obj = new DOMParser();
		var dom_obj = parser_obj.parseFromString(string_req, "text\/xml");
		return dom_obj;
	}
	
	this.xmlToString = function(xml_obj)
	{
		return (new XMLSerializer()).serializeToString(xml_obj);
	}
	
	// ---------------------------------------------------------------------------------------------------------------------
	
	// Funzioni per la conversione da stringa a json e viceversa
	
	this.JSONToString = function(json_obj)
	{
		return JSON.stringify(json_obj,null,2);
	}
	
	this.StringToJSON = function(str)
	{
		return JSON.parse(str);
	}
	
	// ---------------------------------------------------------------------------------------------------------------------
	
	// Funzioni di utilità sulle stringhe
	
	this.adjustStringToModelTree = function (json_string) 
	{
		var json_string_copy = "";
		var n = json_string.indexOf("\"children\":")+10;
		
		json_string_copy += json_string.substring(n+1, json_string.length-6);

		return json_string_copy;
	}
	
	this.adjustStringToModelWithOneChildren = function (json_string)
	{
		json_string = json_string.replace(/: {/g, ": [ {");
		
		var indices = this.getIndicesOf("}", json_string);
		for( var i = 0; i < indices.length; i++ )
		{
			var cnt = indices[i]+1;
			
			while(true)
			{				
				if(json_string.charAt(cnt) == ',' || json_string.charAt(cnt) == ']' || (cnt - indices[i]) > 20)
					break;
				else if(json_string.charAt(cnt) == '}'){
					json_string = util.replaceCharInString(json_string, cnt-1, "]");
					break;
				}
				else
					cnt += 1;
			}
		}
		
		return json_string;
	}
	
	this.adjustStringToInstanceTree = function (json_string) 
	{
		var json_string_copy = "";
		var n = json_string.indexOf("\"children\":")+10;
		
		json_string_copy += json_string.substring(n+1, json_string.length-4);

		return json_string_copy;
	}
	
	this.replaceCharInString = function(str, index, character)
	{
		character = character.toString();
	    return str.substr(0, index) + character + str.substr(index+character.length);
	}
	
	this.getIndicesOf = function(searchStr, str) {
	    var startIndex = 0, searchStrLen = searchStr.length;
	    var index, indices = [];
	    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
	        indices.push(index);
	        startIndex = index + searchStrLen;
	    }
	    return indices;
	}
	
	// ---------------------------------------------------------------------------------------------------------------------
	
	// Funzioni di utilità grafiche

	// Recupero della posizione nel vettore dei nodi attraverso il parametro id_node che indica
	// la posizione del nodo nell'albero

	this.get_idvectnode = function(id_node)
	{
		for(var i = 0; i < nodes.length;i++)
		{
			if(nodes[i].id == id_node)
				return i;
		}
		return id_node;
	}
	
	this.get_idvect = function(id_node, vect)
	{
		for(var i = 0; i < vect.length;i++)
		{
			if(vect[i].id == id_node)
				return i;
		}
		return id_node;
	}
	
	// ---------------------------------------------------------------------------------------------------------------------
	
	// Funzione tokenizer
	
	this.tokenizerVector = function(str_vector)
	{
		return str_vector.split(",");
	}
	
	this.tokenizerMatrix = function(str_matrix)
	{	
		if(str_matrix != "")
		{
			var vect_elements = this.tokenizerVector(str_matrix);
			var n = Math.sqrt(vect_elements.length);
			
			var matrix_elements = [];
			var k = 0;
			
			for(var i = 0; i < n; i++)
			{
				matrix_elements[i] = new Array(n);
				for(var j = 0; j < n ; j++)
				{
					matrix_elements[i][j] = vect_elements[k];
					k = k+1;
				}
			}
			
			return matrix_elements;
		}
		else
			return "";
	}
	
	//Funzione valida sia per vettore di Model che per vettore di ModelInstance
	this.getIndexById = function(array, id)
	{
		var index = -1;
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].getId() == id)
			{	
				index = i;
				break;
			}	
		}
		return index;
	}
	
	//Funzione valida sia per vettore di Model che per vettore di ModelInstance
	this.getIdUserByEmail = function(array, email)
	{
		var idUser = 0;
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].getEmail() == email)
			{	
				return array[i].getId();
			}	
		}
	}
	
	this.getInstanceVectorByModelId = function(modelinstances_interface, id, vector)
	{
		for(var i=0; i<modelinstances_interface.length; i++)
		{
			if(modelinstances_interface[i].getModelId() == id)
				vector.push(modelinstances_interface[i]);
		}
		return vector;
	}
}

// ---------------------------------------------------------------------------------------------------------------------




