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

package dss.model;

import java.util.ArrayList;

public class ModelStore {

	private static ModelStore instance;
	private ArrayList<Model> models;
	private ArrayList<Model> modelsLoadedFromDB;
	private boolean modelDeleteFromDB;
	
	private ModelStore()
	{
		models = new ArrayList<Model>();
		modelsLoadedFromDB = new ArrayList<Model>();
	}
	
	public static ModelStore getInstance()
	{
		if(instance == null)
			instance = new ModelStore();
		return instance;
	}
	
	public void addModel(Model m)
	{
		models.add(m);
	}
	
	public void addModelLoadedFromDB(Model m)
	{
		modelsLoadedFromDB.add(m);
	}
	
	
	private Model searchInModelStore(ArrayList<Model> models_tmp, int id)
	{
		Model m = null;
		for(int i=0; i<models_tmp.size(); i++)
		{
			if(models_tmp.get(i).getId() == id)
			{
				m = models_tmp.get(i);
				break;
			}
		}
		return m;
	}
	
	public Model getModelById(int id)
	{
		Model model_app = null;
		model_app = searchInModelStore(models, id);
		if(model_app == null)
			model_app = searchInModelStore(modelsLoadedFromDB, id);
		return model_app;
	}
	
	
	public boolean getIsModelDeleteFromDB()
	{
		return modelDeleteFromDB;
	}
	
	public void removeModel(int id)
	{
		Model model_to_remove = null;
		model_to_remove = searchInModelStore(models, id);
		if(model_to_remove != null)
		{	
			models.remove(model_to_remove);
			modelDeleteFromDB = false;
		}	
		else
		{
			model_to_remove = searchInModelStore(modelsLoadedFromDB, id);
			if(model_to_remove != null)
			{	
				modelsLoadedFromDB.remove(model_to_remove);
				modelDeleteFromDB = true;
			}	
		}		
	}
	
	
	public void removeModelLoadedFromDB(Model m)
	{
		modelsLoadedFromDB.remove(m);	
	}
	
	public void removeModelTmp(Model m)
	{
		models.remove(m);	
	}
	
	
	// -----------------------------  Metodi per cancellare lo Store --------------------------------------------------
	private void deleteArrayModels(ArrayList<Model> models_to_delete)
	{
		for(int i=0; i<models_to_delete.size(); i++)
			models_to_delete.remove(i);
	}
	
	public void deleteTemporaryStore()
	{
		deleteArrayModels(models);
		deleteArrayModels(modelsLoadedFromDB);
		instance = null;
	}
	// ---------------------------------------------------------------------------------------------------------------
	
	
	// ----------------- Metodi per cancellare i modelli temporanei di un utente -------------------------------------
	private void deleteArrayModelsUser(ArrayList<Model> models_to_delete, int userId)
	{
		for(int i=0; i<models_to_delete.size(); i++)
		{	
			if(models_to_delete.get(i).getModelUserId() == userId)
				models_to_delete.remove(i);
		}		
	}
	
	public void deleteModelsTmpUser(int userId)
	{
		deleteArrayModelsUser(models, userId);
		deleteArrayModelsUser(modelsLoadedFromDB, userId);
	}
	// ---------------------------------------------------------------------------------------------------------------
	
	
	/*
	public int getIdModelLoaded()
	{
		return idModelLoaded;
	}
	*/
	
	/*
	public static Model getModel(int index)
	{
		return models.get(index);
	} 
	*/
	
	public int getNumModelsLoadedFromDB()
	{
		return modelsLoadedFromDB.size();
	}
	
	public int getNumModelsTmp()
	{
		return models.size();
	}
	
	public int getMaxIdModelsTmp()
	{
		int max = 0;
		for(int i=0; i<models.size(); i++)
		{
			if(models.get(i).getId() > max)
				max = models.get(i).getId();
		}
		return max;
	}
}
