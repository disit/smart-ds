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
 * Gestione della finestra Matrix
 */

function presenceMatrixIcon()
{
	node.each(function(d,i) 
	{
		var node_matrixicon = d3.selectAll("#matrixicon_"+d.id);
		if(node_matrixicon.empty())
		{
			var gnode = d3.selectAll("#gnode_"+d.id);
			if(nodes[util.get_idvectnode(d.id)].children)
			{
				if(nodes[util.get_idvectnode(d.id)].children.length > 1)
				{
					gnode.append("image")
			    	.attr("id", "matrixicon_"+d.id)
			      	.attr("xlink:href", "image/matrix.png")
			      	.attr("x", (width_node/2)-(width_matriximg/2))
			    	.attr("y", height_node)
			    	.attr("width", width_matriximg)
			    	.attr("height", height_matriximg)
			    	.attr("title","Change matrix comparison or weights of edges")
			    	.on("click", function (d){
			    		openWindowMatrix(d);
			    	});	
				}	
			}
		}
		else{
			if(nodes[util.get_idvectnode(d.id)].children)
			{
				if(nodes[util.get_idvectnode(d.id)].children.length < 2)
					node_matrixicon.remove();		
			}
		}	
	});	
}

function openWindowMatrix(d)
{
	var array_text = new Array();
	
	// Creazione del vettore delle descrizioni dei nodi figli per la costruzione della finestra di inserimento dei pesi
	for(var i = 0; i < d.children.length; i++)
		array_text.push(d.children[i].description);
	
	controlWindow(d.id, array_text, d.children.length+1);
}