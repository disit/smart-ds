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

import dss.dbinterface.ModelDB;
import dss.dbinterface.ModelDBInterface;
import dss.model.Model;
import dss.model.ModelExtraOperation;
import dss.model.ModelStore;
import dss.util.WriteXML;
import dss.util.Convert;


@Path("/modeloperations")
public class ModelExtraOperationsResource {

	@Context UriInfo uriInfo;
	@Context ServletContext context;
	@Context Request request;
	@Context HttpServletRequest httpRequest;
	@Context HttpServletResponse httpResponse;
	
	
	@POST
	@Consumes(MediaType.APPLICATION_XML)
	@Produces(MediaType.APPLICATION_XML)
	public String postOperationXML(JAXBElement<ModelExtraOperation> jaxbOperation) throws Exception {
		
		ModelExtraOperation operation = jaxbOperation.getValue();
		String desc = operation.getDescription();
		
		System.out.println("- Request POST Operation Model XML: "+uriInfo.getPath()+" - "+desc+"\n\n");
		Model model = ModelStore.getInstance().getModelById(operation.getModelId());

		String response = new String();
		ModelDBInterface dbi = new ModelDB();
		
		if(desc.equals("printModel"))
			model.printModel(model.getRootCriteria());
		
		else if(desc.equals("saveModel"))
			dbi.saveModel(model);
		
		else if(desc.equals("cloneModel"))
		{
			int modelId=0;
			if(ModelStore.getInstance().getNumModelsTmp() == 0)
				modelId = dbi.getFreeId("model");
			else
				modelId = ModelStore.getInstance().getMaxIdModelsTmp()+1;
			
			Model model_cloned = model.cloneModel(modelId, operation.getUserId());
			
			model_cloned.specifyTimestampCreateModel(Timestamp.valueOf(Convert.getInstance().getFormatDateTime().format(System.currentTimeMillis())));
			model_cloned.specifyTimestampLastModifyModel(Timestamp.valueOf(Convert.getInstance().getFormatDateTime().format(System.currentTimeMillis())));
			
			ModelStore.getInstance().addModel(model_cloned);
			response = WriteXML.getInstance().writeModel(model_cloned);
		}
		else if(desc.equals("resetModelDB"))
		{	
			// Operazione di reset per inserire nel modello i dati precedentemente salvati su DB
			ModelStore.getInstance().removeModelLoadedFromDB(model);
			ModelDBInterface md = new ModelDB();
			Model m = md.loadModel(model.getId());
			ModelStore.getInstance().addModelLoadedFromDB(m);
			response = WriteXML.getInstance().writeModel(m);
		}
		else if(desc.equals("resetModelTmp"))
		{	
			// Operazione di reset che consiste nell'eliminare la risorsa temporanea presente sul server
			ModelStore.getInstance().removeModelTmp(model);
		}
		return response;
		
	}

	
}
