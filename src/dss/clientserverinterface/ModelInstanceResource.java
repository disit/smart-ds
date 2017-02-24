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

package dss.clientserverinterface;

import java.io.StringWriter;
import java.sql.Timestamp;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;
import javax.xml.bind.JAXBElement;

import dss.dbinterface.ModelInstanceDB;
import dss.dbinterface.ModelInstanceDBInterface;
import dss.modelinstance.ModelInstance;
import dss.modelinstance.ModelInstanceStore;
import dss.util.Convert;
import dss.util.WriteXML;

public class ModelInstanceResource {

	@Context UriInfo uriInfo;
	@Context ServletContext context;
	@Context HttpServletRequest httpRequest;
	@Context HttpServletResponse httpResponse;
	int modelInstanceId;
	
	public ModelInstanceResource(UriInfo uriInfo,
						HttpServletRequest httpRequest,
						HttpServletResponse httpResponse,
						int modelInstanceId) {
		this.uriInfo = uriInfo;
		this.httpRequest = httpRequest;
		this.httpResponse = httpResponse;
		this.modelInstanceId = modelInstanceId;
	}
	
	
	@GET
	@Produces(MediaType.APPLICATION_XML)
	public String getModelInstanceXML() {
		
		System.out.println("\n- Request GET Model Instance XML: "+uriInfo.getPath());
		
		ModelInstance model_instance;
		if(ModelInstanceStore.getInstance().getModelInstances(modelInstanceId, 0).size() == 0)
		{	
			System.out.println("- Model Instance "+modelInstanceId+" loaded from database");
			ModelInstanceDBInterface dbi = new ModelInstanceDB();
			model_instance = dbi.loadModelInstance(modelInstanceId);
			ModelInstanceStore.getInstance().addModelInstanceLoadedFromDB(model_instance);
		}	
		else
		{	
			System.out.println("- Model Instance "+modelInstanceId+" loaded from temporary store(ModelInstanceStore)");
			model_instance = ModelInstanceStore.getInstance().getModelInstances(modelInstanceId, 0).get(0);
		}	
		
		return WriteXML.getInstance().writeModelInstance(model_instance);

	}
	
	
	@PUT
	@Consumes(MediaType.APPLICATION_XML)
	@Produces(MediaType.APPLICATION_XML)
	public String modifyDataModelInstance(JAXBElement<ModelInstance> jaxbModelInstance) throws Exception {
		
		System.out.println("\n- Request PUT ModelInstance XML: "+uriInfo.getPath());
		ModelInstance model_instance_stream = jaxbModelInstance.getValue();
		
		ModelInstance model_instance = ModelInstanceStore.getInstance().getModelInstances(modelInstanceId, 0).get(0);
		model_instance.setSpecificObjective(model_instance_stream.getSpecificObjective());
		
		// Save data on db
		ModelInstanceDBInterface mdbi = new ModelInstanceDB();
		mdbi.saveModelInstanceInfo(model_instance);
				
		// Update date_last_modify ModelInstance
		model_instance.specifyTimestampLastModifyModelInstance(Timestamp.valueOf(Convert.getInstance().getFormatDateTime().format(System.currentTimeMillis())));
		
		return WriteXML.getInstance().writeModelInstance(model_instance);
	}
	
	
	@DELETE 
	@Produces(MediaType.APPLICATION_XML)
	public String deleteModel() {
		System.out.println("\n- Request DELETE ModelInstance: "+uriInfo.getPath());
		
		// Rimozione dell'istanza dallo Store e rimuoverla da database se era stata salvata in precedenza
		ModelInstanceDBInterface mdbi = new ModelInstanceDB();
		ModelInstanceStore.getInstance().removeModelInstanceLoadedFromDB(ModelInstanceStore.getInstance().getModelInstances(modelInstanceId, 0).get(0));
		mdbi.deleteModelInstance(modelInstanceId);
				
		StringWriter sw = new StringWriter();
			// Scrittura operazione eseguita su DB
		return sw.toString();
	}
	
}
