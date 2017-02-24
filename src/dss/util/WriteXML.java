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

package dss.util;

import java.io.StringWriter;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;

import dss.model.Criteria;
import dss.model.Model;
import dss.modelinstance.CriteriaInstance;
import dss.modelinstance.ModelInstance;
import dss.user.User;

public class WriteXML {

	private static WriteXML instance;
	
	public static WriteXML getInstance()
	{
		if(instance == null)
			instance = new WriteXML();
		return instance;
	}
	
	public String writeModel(Model model)
	{
		StringWriter sw = new StringWriter();
		try {
			Marshaller jaxbMarshaller = JAXBContext.newInstance(Model.class).createMarshaller();
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			jaxbMarshaller.marshal(model, sw);
		} catch (Exception e) {e.printStackTrace();}
		return sw.toString();
	}
	
	public String writeModels(ModelsParserXML models)
	{
		StringWriter sw = new StringWriter();
		try {
			Marshaller jaxbMarshaller = JAXBContext.newInstance(ModelsParserXML.class).createMarshaller();
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			jaxbMarshaller.marshal(models, sw);
		} catch (Exception e) {e.printStackTrace();}
		return sw.toString();
	}
	
	public String writeModelInstance(ModelInstance model_instance)
	{
		StringWriter sw = new StringWriter();
		try {
			Marshaller jaxbMarshaller = JAXBContext.newInstance(ModelInstance.class).createMarshaller();
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			jaxbMarshaller.marshal(model_instance, sw);
		} catch (Exception e) {e.printStackTrace();}
		return sw.toString();
	}
	
	public String writeModelInstances(ModelInstancesParserXML modelinstances)
	{
		StringWriter sw = new StringWriter();
		try {
			Marshaller jaxbMarshaller = JAXBContext.newInstance(ModelInstancesParserXML.class).createMarshaller();
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			jaxbMarshaller.marshal(modelinstances, sw);
		} catch (Exception e) {e.printStackTrace();}
		return sw.toString();
	}
	
	public String writeCriteria(Criteria criteria)
	{
		StringWriter sw = new StringWriter();
		try {
			Marshaller jaxbMarshaller = JAXBContext.newInstance(Criteria.class).createMarshaller();
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			jaxbMarshaller.marshal(criteria, sw);
		} catch (Exception e) {e.printStackTrace();}
		return sw.toString();
	}
	
	public String writeCriteriaInstance(CriteriaInstance criteria_instance)
	{
		StringWriter sw = new StringWriter();
		try {
			Marshaller jaxbMarshaller = JAXBContext.newInstance(CriteriaInstance.class).createMarshaller();
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			jaxbMarshaller.marshal(criteria_instance, sw);
		} catch (Exception e) {e.printStackTrace();}
		return sw.toString();
	}
	
	public String writeUserData(User user)
	{
		StringWriter sw = new StringWriter();
		try {
			Marshaller jaxbMarshaller = JAXBContext.newInstance(User.class).createMarshaller();
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			jaxbMarshaller.marshal(user, sw);
		} catch (Exception e) {e.printStackTrace();}
		return sw.toString();
	}
}
