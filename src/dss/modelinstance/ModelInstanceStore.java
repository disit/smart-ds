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

package dss.modelinstance;

import java.util.ArrayList;


public class ModelInstanceStore {
	
	private static ModelInstanceStore instance;
	private ArrayList<ModelInstance> modelinstances;
	private ArrayList<ModelInstance> modelinstancesLoadedFromDB;
	
	private ModelInstanceStore()
	{
		modelinstances = new ArrayList<ModelInstance>();
		modelinstancesLoadedFromDB = new ArrayList<ModelInstance>();
	}
	
	public static ModelInstanceStore getInstance()
	{
		if(instance == null)
			instance = new ModelInstanceStore();
		return instance;
	}
	
	public void addModelInstance(ModelInstance mi)
	{
		modelinstances.add(mi);
	}
	
	public void addModelInstanceLoadedFromDB(ModelInstance mi)
	{
		modelinstancesLoadedFromDB.add(mi);
	}
	
	
	// ------------ Funzioni per ricercare istanze nello Store: type=0 singola istanza, type=1 istanze collegate ad un determinato modelId -----------------
	private ArrayList<ModelInstance> searchInModelInstanceStore(ArrayList<ModelInstance> modelinstances_tmp, int id, int type)
	{
		ArrayList<ModelInstance> ami = new ArrayList<ModelInstance>();
		for(int i=0; i<modelinstances_tmp.size(); i++)
		{
			if(type == 0 && modelinstances_tmp.get(i).getMIId() == id) // Cerco un ModelInstance specifico
			{
				ami.add(modelinstances_tmp.get(i));
				break;
			}
			if(type == 1 && modelinstances_tmp.get(i).getId() == id)  // Cerco tutti i ModelInstance di un certo Model
				ami.add(modelinstances_tmp.get(i));
		}
		return ami;
	}
	
	public ArrayList<ModelInstance> getModelInstances(int id, int type)
	{
		ArrayList<ModelInstance> model_inst_array = searchInModelInstanceStore(modelinstances, id, type);
		ArrayList<ModelInstance> model_inst_db_array = searchInModelInstanceStore(modelinstancesLoadedFromDB, id, type);
		model_inst_array.addAll(model_inst_db_array);			
		return model_inst_array;
	}
	// ----------------------------------------------------------------------------------------------------------------------------------------------
	
	
	// ------------ Funzioni per rimuovere elementi dallo Store singole istanze o istanze multiple collegate ad un certo modelId --------------------
	
	// Funzione che consente di rimuovere dallo store un ModelInstance passando alla funzione l'id e type=0
	// oppure rimuovere dallo store tutti i ModelInstance collegati ad un certo modello passando alla funzione
	// l'id del modello e type=1
	public void removeModelInstances(int id, int type)
	{
		ArrayList<ModelInstance> model_instances_to_remove = null;
		model_instances_to_remove = searchInModelInstanceStore(modelinstances, id, type);
		for(int i=0; i<model_instances_to_remove.size(); i++)
			modelinstances.remove(model_instances_to_remove.get(i));

		model_instances_to_remove = searchInModelInstanceStore(modelinstancesLoadedFromDB, id, type);
		for(int i=0; i<model_instances_to_remove.size(); i++)
			modelinstancesLoadedFromDB.remove(model_instances_to_remove.get(i));
	}
	
	public void removeModelInstanceLoadedFromDB(ModelInstance mi)
	{
		modelinstancesLoadedFromDB.remove(mi);	
	}
	
	public void removeModelInstanceTmp(ModelInstance mi)
	{
		modelinstances.remove(mi);	
	}
	// ------------------------------------------------------------------------------------------------------------------------------------
	
	
	
	// -----------------------------  Metodi per cancellare lo Store --------------------------------------------------
	private void deleteArrayModelInstances(ArrayList<ModelInstance> modelinstances_to_delete)
	{
		for(int i=0; i<modelinstances_to_delete.size(); i++)
			modelinstances_to_delete.remove(i);
	}
	
	public void deleteTemporaryStore()
	{
		deleteArrayModelInstances(modelinstances);
		deleteArrayModelInstances(modelinstancesLoadedFromDB);
		instance = null;
	}
	// ---------------------------------------------------------------------------------------------------------------
	

	// ----------------- Metodi per cancellare le istanze temporanee di un utente -------------------------------------
	private void deleteArrayModelInstancesUser(ArrayList<ModelInstance> modelinstances_to_delete, int userId)
	{
		for(int i=0; i<modelinstances_to_delete.size(); i++)
		{	
			if(modelinstances_to_delete.get(i).getModelUserId() == userId)
				modelinstances_to_delete.remove(i);
		}		
	}
	
	public void deleteModelInstancesTmpUser(int userId)
	{
		deleteArrayModelInstancesUser(modelinstances, userId);
		deleteArrayModelInstancesUser(modelinstancesLoadedFromDB, userId);
	}
	// ---------------------------------------------------------------------------------------------------------------	
	
	
	
	
	public int getNumModelInstancesLoadedFromDB()
	{
		return modelinstancesLoadedFromDB.size();
	}
	
	public int getNumModelInstancesTmp()
	{
		return modelinstances.size();
	}
	
	public int getMaxIdModelInstancesTmp()
	{
		int max = 0;
		for(int i=0; i<modelinstances.size(); i++)
		{
			if(modelinstances.get(i).getMIId() > max)
				max = modelinstances.get(i).getMIId();
		}
		return max;
	}
	
}
