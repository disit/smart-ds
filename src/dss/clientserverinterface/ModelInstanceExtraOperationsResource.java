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
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.UriInfo;
import javax.xml.bind.JAXBElement;

import dss.dbinterface.ModelInstanceDB;
import dss.dbinterface.ModelInstanceDBInterface;
import dss.model.ModelStore;
import dss.modelinstance.CriteriaInstance;
import dss.modelinstance.ModelInstance;
import dss.modelinstance.ModelInstanceExtraOperation;
import dss.modelinstance.ModelInstanceStore;
import dss.util.Convert;
import dss.util.WriteXML;

@Path("/modelinstanceoperations")
public class ModelInstanceExtraOperationsResource {

	@Context UriInfo uriInfo;
	@Context ServletContext context;
	@Context Request request;
	@Context HttpServletRequest httpRequest;
	@Context HttpServletResponse httpResponse;
	
	
	@POST
	@Consumes(MediaType.APPLICATION_XML)
	@Produces(MediaType.APPLICATION_XML)
	public String postOperationXML(JAXBElement<ModelInstanceExtraOperation> jaxbOperation) throws Exception {
		
		ModelInstanceExtraOperation operation = jaxbOperation.getValue();
		String desc = operation.getDescription();
		
		System.out.println("- Request POST Operation Model Instance XML: "+uriInfo.getPath()+" - "+desc+"");
		ModelInstance model_instance = ModelInstanceStore.getInstance().getModelInstances(operation.getModelInstanceId(),0).get(0);
		int model_id_forclone = operation.getModelId();
		
		String response = new String();
		ModelInstanceDBInterface dbi = new ModelInstanceDB();
		
		if(desc.equals("printModelInstance"))
			model_instance.printModelInstance(model_instance.getRootCriteriaInstance());
		
		else if(desc.equals("saveModelInstance"))	
			dbi.saveModelInstance(model_instance);

		else if(desc.equals("cloneModelInstance"))
		{
			int modelInstanceId=0;
			if(ModelInstanceStore.getInstance().getNumModelInstancesTmp() == 0)
				modelInstanceId = dbi.getFreeId("model_instance");
			else
				modelInstanceId = ModelInstanceStore.getInstance().getMaxIdModelInstancesTmp()+1;
			
			ModelInstance model_instance_cloned = model_instance.cloneModelInstance(modelInstanceId, operation.getUserInstanceId(), ModelStore.getInstance().getModelById(model_id_forclone));

			model_instance_cloned.specifyTimestampCreateModelInstance(Timestamp.valueOf(Convert.getInstance().getFormatDateTime().format(System.currentTimeMillis())));
			model_instance_cloned.specifyTimestampLastModifyModelInstance(Timestamp.valueOf(Convert.getInstance().getFormatDateTime().format(System.currentTimeMillis())));
			
			ModelInstanceStore.getInstance().addModelInstance(model_instance_cloned);
			response = WriteXML.getInstance().writeModelInstance(model_instance_cloned);
		}
		else if(desc.equals("importDataModelInstance"))
		{			
			System.out.println("Import data from instance "+operation.getModelInstanceIdImportData()+" into instance "+model_instance.getMIId());			
			ModelInstance model_instance_to_import_data = null;
			// Carica l'istanza da DB se non presente nello Store e la aggiunge, altrimenti la preleva dallo Store
			if(ModelInstanceStore.getInstance().getModelInstances(operation.getModelInstanceIdImportData(),0).size() == 0)
			{	
				ModelInstanceDBInterface mid = new ModelInstanceDB();
				model_instance_to_import_data =  mid.loadModelInstance(operation.getModelInstanceIdImportData());
				ModelInstanceStore.getInstance().addModelInstanceLoadedFromDB(model_instance_to_import_data);
			}else{
				model_instance_to_import_data = ModelInstanceStore.getInstance().getModelInstances(operation.getModelInstanceIdImportData(),0).get(0);
			}
			
			model_instance.importDataInstance(model_instance_to_import_data);
			response = WriteXML.getInstance().writeModelInstance(model_instance);
		}
		else if(desc.equals("resetModelInstanceDB"))
		{	
			System.out.println("Reload data instance from DB (RESET instance "+model_instance.getMIId()+")");
			// Operazione di reset per inserire nell'istanza i dati precedentemente salvati su DB
			ModelInstanceStore.getInstance().removeModelInstanceLoadedFromDB(model_instance); //rimuove l'istanza modificata sul client
			ModelInstanceDBInterface mid = new ModelInstanceDB();
			ModelInstance mi = mid.loadModelInstance(model_instance.getMIId());
			ModelInstanceStore.getInstance().addModelInstanceLoadedFromDB(mi);
			response = WriteXML.getInstance().writeModelInstance(mi);
		}
		else if(desc.equals("resetModelInstanceTmp"))
		{	
			System.out.println("Delete instance from temporary area on DB (RESET instance "+model_instance.getMIId()+")");
			ModelInstanceStore.getInstance().removeModelInstanceTmp(model_instance); //rimuove l'istanza modificata sul client
		}
		else if(desc.equals("simulateQuery"))
		{
			System.out.println("- Simulate query logic function "+operation.getQuery()+" on repository "+operation.getRepository());
			CriteriaInstance crit = model_instance.simulateQuery(operation.getLogicFunctionId(), operation.getRepository(), operation.getQuery());
			response = WriteXML.getInstance().writeCriteriaInstance(crit);
		}
		else if(desc.equals("computeDecision"))
		{
			System.out.println("- Compute decision for instance "+model_instance.getMIId());
			model_instance.computeDecision();
			response = WriteXML.getInstance().writeModelInstance(model_instance);
		}
		return response;
	}
	
}
