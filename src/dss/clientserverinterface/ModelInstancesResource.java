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

import java.sql.Timestamp;
//import java.time.LocalDateTime;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.UriInfo;
import javax.xml.bind.JAXBElement;

import dss.dbinterface.ModelDB;
import dss.dbinterface.ModelDBInterface;
import dss.dbinterface.ModelInstanceDB;
import dss.dbinterface.ModelInstanceDBInterface;
import dss.model.Model;
import dss.model.ModelStore;
import dss.modelinstance.ModelInstance;
import dss.modelinstance.ModelInstanceStore;
import dss.util.ModelInstancesParserXML;
import dss.util.WriteXML;
import dss.util.Convert;


@Path("/modelinstances")
public class ModelInstancesResource {

	@Context UriInfo uriInfo;
	@Context ServletContext context;
	@Context Request request;
	@Context HttpServletRequest httpRequest;
	@Context HttpServletResponse httpResponse;
	
	
	@GET
	@Produces(MediaType.APPLICATION_XML)
	public String getModelsInstancesXML() {
		System.out.println("\n- Request GET Models Instances: "+uriInfo.getPath());
		ModelInstancesParserXML miParser = new ModelInstancesParserXML();
		ModelInstanceDBInterface dbi = new ModelInstanceDB();
		miParser.setModelInstancesListFromDB(dbi.retrieveListModelInstances());
		
		String response = new String();
		if(miParser.getModelInstancesList().size() != 0)
			response = WriteXML.getInstance().writeModelInstances(miParser);
		return response;		
	}
	
	
	@POST
	@Consumes(MediaType.APPLICATION_XML)
	@Produces(MediaType.APPLICATION_XML)
	public String postModelInstanceXML(JAXBElement<ModelInstance> jaxbModelInstance) throws Exception {
		System.out.println("- Request POST ModelInstance XML: "+uriInfo.getPath());
		
		ModelInstance model_inst_tmp = jaxbModelInstance.getValue();
		ModelInstanceDBInterface dbi = new ModelInstanceDB();

		int modelInstanceId=0;
		if(ModelInstanceStore.getInstance().getNumModelInstancesTmp() == 0)
			modelInstanceId = dbi.getFreeId("model_instance");
		else
			modelInstanceId = ModelInstanceStore.getInstance().getMaxIdModelInstancesTmp()+1;

		// Caricamento modello da database se questo non è presente nello Store
		if(ModelStore.getInstance().getModelById(model_inst_tmp.getId()) == null)
		{
			ModelDBInterface mdbi = new ModelDB();
			Model model = mdbi.loadModel(model_inst_tmp.getId());
			ModelStore.getInstance().addModelLoadedFromDB(model);
		}
		
		ModelInstance model_inst = new ModelInstance(modelInstanceId, model_inst_tmp.getSpecificObjective(), model_inst_tmp.getUserInstanceId(), ModelStore.getInstance().getModelById(model_inst_tmp.getId()));

		model_inst.specifyTimestampCreateModelInstance(Timestamp.valueOf(Convert.getInstance().getFormatDateTime().format(System.currentTimeMillis())));
		model_inst.specifyTimestampLastModifyModelInstance(Timestamp.valueOf(Convert.getInstance().getFormatDateTime().format(System.currentTimeMillis())));
		
		ModelInstanceStore.getInstance().addModelInstance(model_inst); 
		
		return WriteXML.getInstance().writeModelInstance(model_inst);
	}
	
	
	@DELETE 
	@Produces(MediaType.APPLICATION_XML)
	public String deleteTemporaryModelInstances() {
		
		System.out.println("- Request DELETE Model Intances temporary: "+uriInfo.getPath());
		int userId = Integer.parseInt(httpRequest.getParameterValues("idUser")[0]);
		ModelInstanceStore.getInstance().deleteModelInstancesTmpUser(userId);
		return new String();
		
	}
	
	//	Per qualunque chiamata al percorso di un model instance specifico viene inoltrata la richiesta al model instance specifico
	@Path("{modelInstanceId}")
	public ModelInstanceResource getModelInstance(
			@PathParam("modelInstanceId") String modelInstanceId,
			@Context HttpServletRequest httpRequest,
			@Context HttpServletResponse httpResponse
			)
	{
		return new ModelInstanceResource(uriInfo, httpRequest, httpResponse, Integer.parseInt(modelInstanceId));
	}
}
