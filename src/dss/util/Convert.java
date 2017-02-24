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

import java.sql.Timestamp;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Convert {

	private static Convert instance;
	
	
	public static Convert getInstance()
	{
		if(instance == null)
			instance = new Convert();
		return instance;
	}
	
	public double[] splitStringToVectorDouble(String vect_string)
	{
		String [] splits = vect_string.split(",");
		double [] vect_double = new double[splits.length]; 
		int i=0;
		for(String s:splits)
		{	
			vect_double[i] = Double.parseDouble(s);
			i++;
		}
		return vect_double;
	}
	
	public int controlTypeValue(String string)
	{		
		int type = 0;
		boolean numeric_value_ok = string.matches("-?\\d+(\\.\\d+)?");
		if(numeric_value_ok)
		{	
			int number_of_points = 0;
			for(int i=0; i<string.length(); i++)
			{
				if(string.charAt(i) == '.')
					number_of_points++;
			}
			if(number_of_points == 0)
				type = 1;
			else if(number_of_points == 1)
				type = 2;
		}	
		return type;
	}
	
	
	public double[][] generateMatrixFromVector(double[] vect_elements, int matrixNumRows, int matrixNumCols)
	{
		double [][] matrix_elements = new double[matrixNumRows][matrixNumCols];
		int k=0;
		for(int i=0; i<matrixNumRows; i++)
		{	
			for(int j=0; j<matrixNumCols; j++)
			{	
				matrix_elements[i][j] = vect_elements[k];
				k++;
			}
		}
		return matrix_elements;
	}
	

	public Timestamp stringToTimestamp(String string_timestamp)
	{
		Timestamp timestamp = null;
		try{
//		    SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss.SSS");
		    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		    Date parsedDate = dateFormat.parse(string_timestamp);
		    timestamp = new Timestamp(parsedDate.getTime());
		}catch(Exception e){
			System.out.println("Exception message: "+e.getMessage()+"\t\nStack Trace:\n"+e.getStackTrace());
		}
		return timestamp;
	}
	
	public String dateToString(Date date)
	{
		Format formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss.SSS");
		return formatter.format(date);
	}
	
	public SimpleDateFormat getFormatDateTime()
	{
		return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
	}
}
