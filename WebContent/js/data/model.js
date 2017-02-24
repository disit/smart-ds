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


var Model = function( idModel, objectiveModel, idUser, urlModel, descriptionModel, date_createModel, date_lastmodifyModel ){
	
	var id = idModel;
	var objective = objectiveModel;
	var userId = idUser;
	var url = urlModel;
	var description = descriptionModel;
	var date_create = date_createModel.substring(0,date_createModel.length-4);
	var date_lastmodify = date_lastmodifyModel.substring(0,date_lastmodifyModel.length-4);
	
	this.getId = function()
	{
		return id;
	}
	
	this.getObjective = function()
	{
		return objective;
	}
	
	this.getUserId = function()
	{
		return userId;
	}
	
	this.getUrl = function()
	{
		return url;
	}
	
	this.getDescription= function()
	{
		return description;
	}
	
	this.getDateCreate = function()
	{
		return date_create;
	}
	
	this.getDateLastModify= function()
	{
		return date_lastmodify;
	}
	
	this.setObjective = function(textObjective)
	{
		objective = textObjective;
	}
}