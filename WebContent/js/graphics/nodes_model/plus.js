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

//----------------------------------------------------------------------------------
//--------------------------------- *** NODE PLUS *** ------------------------------
//----------------------------------------------------------------------------------

function addNodePlus(node_plus, gelement)
{			
	gelement.append("image")
	.attr("class", "node plus")
	.attr("id", function(d){
		return ("nodeplus_"+getId(d.position));
	})
  	.attr("xlink:href", node_plus.path)
	.attr("x", (node_plus.x+width_node/2-width_nodeplus/2)-2.5)
	.attr("y", node_plus.y+5)
	.attr("width", width_nodeplus+5)
	.attr("height", height_nodeplus+5)
	.on("click", function (d){
		changeNodePlusToNodeEdit(getId(d.position));
	});
}

function removeNodePlus(id_node)
{
	d3.selectAll("#nodeplus_"+id_node).remove();
}

function changeNodePlusToNodeEdit(id_node)
{		
	// CHIAMATA REST PER AGGIUNTA CRITERIA AL MODEL
	clientRest.addCriteria("C"+id_node, "description_"+id_node);
	
	addNodeEdit(id_node, "Insert description...");
	removeNodePlus(id_node);
	
	update(id_node);
}

function getId(position)
{
	if(position == undefined)
		position = "C0";
	return parseInt(position.substring(1));
}