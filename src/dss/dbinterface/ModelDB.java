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

package dss.dbinterface;

import java.sql.Timestamp;
import java.util.Vector;

import dss.dbinterface.MySQLDBManager;
import dss.model.Criteria;
import dss.model.Model;
import dss.model.ModelStore;
import dss.util.Convert;

public class ModelDB implements ModelDBInterface {

	
	@Override
	public int getFreeId(String table) {
		int freeId = 0;
		Vector<String[]> v = MySQLDBManager.getInstance().executeQuery( "SELECT MAX(id) FROM "+table+";" );
		String[] record_max = v.elementAt(0);
		String record_max_id = record_max[0];
		if(record_max_id == null)
			freeId = 1;
		else
			freeId = Integer.parseInt(record_max_id) + 1;		
		return freeId;
	}

	@Override
	public boolean isModelSavedOnDB(int modelId) {
		boolean found = false;
		Vector<String[]> v = MySQLDBManager.getInstance().executeQuery( "SELECT * FROM model WHERE id='"+modelId+"';" );
		if(v.size() != 0)
			found = true;
		return found;
	}

	
	// --------------------------------------------------------- Save Info Model on DB ----------------------------------------------------------
	@Override
	public void saveModelInfo(Model model) {

		String query_modify_model = "UPDATE model SET model.objective='"+model.getObjective()+"', model.description='"+model.getDescriptionModel()+"',"
									+ "model.url_model='"+model.getUrl()+"' WHERE id='"+model.getId()+"'";
		MySQLDBManager.getInstance().update(query_modify_model);
		
		String query_modify_root_criteria = "UPDATE criteria SET criteria.description='"+model.getRootCriteria().getDescription()+"'"
										  + "WHERE idModel='"+model.getId()+"' AND criteria.position='C0'";
		
		MySQLDBManager.getInstance().update(query_modify_root_criteria);
		
	}
		

	// --------------------------------------------------------- Save Model on DB ----------------------------------------------------------	
	@Override
	public void saveModel(Model model) {
		
		if(isModelSavedOnDB(model.getId()))
			deleteModel(model.getId());
		
		//8 campi tabella model: (0)id, (1)objective, (2)description, (3)url_model, (4)size, (5)date_create, (6)date_last_modify, (7)idUser 
		String query_model_insert = "INSERT INTO model (id, objective, description, url_model, size, date_create, date_last_modify, idUser) VALUES "
									+ "('"+model.getId()+"','"+model.getObjective()+"','"+model.getDescriptionModel()+"','"+model.getUrl()+"',"
									+ "'"+model.getSize()+"','"+model.getTimestampCreateModel()+"','"+model.getTimestampLastModifyModel()+"','"+model.getModelUserId()+"');";
		MySQLDBManager.getInstance().update(query_model_insert);
		saveCriteriaModel(model.getRootCriteria(), model.getId());
		
	}

	
	private void saveCriteriaModel(Criteria criteria, int modelId)
	{
		String query_criteria_insert = "";
		int idCriteria = getFreeId("criteria");
		
		query_criteria_insert = "INSERT INTO criteria (id, position, description, idModel) VALUES ('"+
					idCriteria+"','"+criteria.getPosition()+"','"+criteria.getDescription()+"','"+modelId+"');";
	
		if(!MySQLDBManager.getInstance().update(query_criteria_insert))
				System.out.println("Errore inserimento criteria su DB: criteria="+criteria.getPosition()+"\tmodel= "+modelId+" - "+
							ModelStore.getInstance().getModelById(criteria.getModelId()).getObjective());
		
		for(int i=0; i < criteria.getNumChildren(); i++)
			saveCriteriaModel(criteria.getChild(i), modelId);
	}
	// --------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	
	
	
	// --------------------------------------------------------- Delete Model on DB for rewrite it ----------------------------------------------------------
	@Override
	public void deleteModel(int modelId) {
		
//		deleteCriteriaModel(model.getId());
		String query_model_delete = "DELETE FROM model WHERE id='"+modelId+"';";
		MySQLDBManager.getInstance().update(query_model_delete);
		
	}
	
//	private void deleteCriteriaModel(int modelId)
//	{		
//		String query_criteria_delete = "DELETE FROM criteria WHERE idModel='"+modelId+"';";
//		
//		if(!MySQLDBManager.getInstance().update(query_criteria_delete))
//			System.out.println("Errore cancellazione criteri con id modello "+modelId+" su DB!");
//	}
	// --------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	
	@Override
	public Vector<String[]> retrieveListModels() {
		Vector<String[]> v = MySQLDBManager.getInstance().executeQuery( "SELECT id, objective, size, idUser FROM model;" );
		return v;
	}

	
	// ---------------------------------- Metodo per recuperare un modello su DB e caricarlo sul server -------------------------------------------------------------
	@Override
	public Model loadModel(int idModel) {
		// Non è necessario controllare il tipo di utente per questa richiesta perchè viene fatta in base ai modelli recuperati in precedenza
		Vector<String[]> vModel = MySQLDBManager.getInstance().executeQuery( "SELECT * FROM model WHERE id="+idModel+";" );
		Vector<String[]> vCriteria = MySQLDBManager.getInstance().executeQuery( "SELECT * FROM criteria WHERE idModel="+idModel+";" );
		Model model = createModelOnServer(vModel, vCriteria); 
		return model;
	}
	
	private Model createModelOnServer(Vector<String[]> vModel, Vector<String[]> vCriteria){	
		//campi tabella model: (0)id, (1)objective, (2)description, (3)url_model, (4)size, (5)date_create, (6)date_last_modify, (7)idUser 
		String[] record_model = vModel.elementAt(0);
		int modelId = Integer.parseInt(record_model[0]);
		String objective = record_model[1];
		String description = record_model[2];
		String url = record_model[3];
		Timestamp date_create = Convert.getInstance().stringToTimestamp(record_model[5]);
		Timestamp date_last_modify = Convert.getInstance().stringToTimestamp(record_model[6]);
		int userId = Integer.parseInt(record_model[7]);
		
		Model model = new Model();
		model.setId(modelId);
		model.setObjective(objective);
		model.setDescriptionModel(description);
		model.setUrl(url);
		model.specifyTimestampCreateModel(date_create);
		model.specifyTimestampLastModifyModel(date_last_modify);
		model.setModelUserId(userId);
		
		Model modelUpdate = insertDataCriteria(model, vCriteria);
		return modelUpdate;
	}
	
	private Model insertDataCriteria(Model model, Vector<String[]> vCriteria)
	{
		// Campi tabella criteria: id, position, description, idModel
		for(int i=0; i<vCriteria.size(); i++)
		{
			String[] record_criteria = vCriteria.elementAt(i);
			String position = record_criteria[1];
			String description = record_criteria[2];
			Criteria criteria = new Criteria(position, description, model.getId());
			
			//Distinzione tra Root Criteria e Internal Criteria
			if(i == 0)
				model.setRootCriteria(criteria);
			else	
				model.addCriteria(criteria);
		}	
		return model;
	}
	// ------------------------------------------------------------------------------------------------------------------------------------------------------------
	
}
