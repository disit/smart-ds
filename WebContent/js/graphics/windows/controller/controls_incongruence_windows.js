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

/**
 * 
 */

function focusIFUser()
{
	$("#IFCalculated_div").css("opacity", 0.5);
	$("#IFCalculated_div").css("filter", "alpha(opacity=50)");
	
	$("#IFUser_div").css("opacity", 1.0);
	$("#IFUser_div").css("filter", "alpha(opacity=100)");
}

function confirmIFUser()
{
	$("#IFCalculated_div").css("opacity", 0.2);
	$("#IFCalculated_div").css("filter", "alpha(opacity=20)");
	
	$("body").off("mouseover",'#IFUser_div');			
	$("body").off("mouseover",'#IFCalculated_div');
	
	
	$("#IFUser_div").css("opacity", 1.0);
	$("#IFUser_div").css("filter", "alpha(opacity=100)");
	
}

function focusIFCalculated()
{
	$("#IFUser_div").css("opacity", 0.5);
	$("#IFUser_div").css("filter", "alpha(opacity=50)");
	
	$("#IFCalculated_div").css("opacity", 1.0);
	$("#IFCalculated_div").css("filter", "alpha(opacity=100)");
}

function confirmIFCalculated()
{
	$("#IFUser_div").css("opacity", 0.2);
	$("#IFUser_div").css("filter", "alpha(opacity=20)");
	
	$("body").off("mouseover",'#IFUser_div');			
	$("body").off("mouseover",'#IFCalculated_div');
	
	$("#IFCalculated_div").css("opacity", 1.0);
	$("#IFCalculated_div").css("filter", "alpha(opacity=100)");
	
}