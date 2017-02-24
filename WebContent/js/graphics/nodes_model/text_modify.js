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
//---------------------------- *** NODE TEXT MODIFY *** ----------------------------
//----------------------------------------------------------------------------------
function addNodeTextModify(id_node, text_node)
{
	var textmodify_element = d3.selectAll("#gnode_"+id_node);
	
	textmodify_element.append("rect")
	.attr("class", 'node text-modify')
	.attr("id",'nodetextmodify_'+id_node)
	.attr("width", width_node)
	.attr("height", height_node)
	.attr("x", 0)
	.attr("y", 0);
	
	textmodify_element.append("rect")
	.attr("width", 0.33*width_node)
	.attr("height", 20)
	.attr("x", 0)
	.attr("y", height_node-20)
	.attr("class","rect_empty");

	textmodify_element.append("rect")
	.attr("width", 0.33*width_node)
	.attr("height", 20)
	.attr("x", 0.33*width_node)
	.attr("y", height_node-20)
	.attr("class","rect_empty");

	textmodify_element.append("rect")
	.attr("width", 0.34*width_node)
	.attr("height", 20)
	.attr("x", (0.33*width_node+0.33*width_node))
	.attr("y", height_node-20)
	.attr("class","rect_empty");
	
	textmodify_element.append("foreignObject")
    .attr("width", 180)
    .attr("height", 50)
    .attr("x",10)
    .attr("y",20)
  	.append("xhtml:text")
  	.attr("id","textdescription_"+id_node)
    .attr("class","text")
    .attr("text-anchor", "middle")
    .text(text_node);
    
    textmodify_element.append("image")
	.attr("id", "modifyicon_"+id_node)
  	.attr("xlink:href", "image/modify.png")
  	.attr("title","Change description of this criteria")
  	.attr("x", (width_node-(width_modifyimg*2)-10))
	.attr("y", 2)
	.attr("width", width_modifyimg)
	.attr("height", height_modifyimg)
	.on("click", function (d){
		changeNodeTextModifyToNodeEdit(d.id, text_node);
	});
    
    textmodify_element.append("image")
	.attr("id", "deleteicon_"+id_node)
  	.attr("xlink:href", "image/delete.png")
  	.attr("title","Delete this criteria")
  	.attr("x", (width_node-width_modifyimg-5))
	.attr("y", 2)
	.attr("width", width_modifyimg)
	.attr("height", height_modifyimg)
	.on("click", function (d){
		// CHIAMATA REST PER CANCELLAZIONE CRITERIA
		clientRest.deleteCriteria(d.position);
		if(d.id != 0)
			deleteNodeTextModify(d.id);
		else
			clearNewModel();
	});
}

function removeNodeTextModify(id_node)
{
	d3.selectAll("#nodetextmodify_"+id_node).remove();		
	d3.selectAll("#textdescription_"+id_node).remove();
	d3.selectAll("#modifyicon_"+id_node).remove();
	d3.selectAll("#deleteicon_"+id_node).remove();
}

function changeNodeTextModifyToNodeEdit(id_node, text_node)
{
	addNodeEdit(id_node, text_node);
	removeNodeTextModify(id_node);
}

function deleteNodeTextModify(id_node)
{
	var depth_node_deleted = nodes[util.get_idvectnode(id_node)].depth;
	var str_idnode_deleted = id_node.toString();
	
	// Cancellazione del nodo da eliminare dal vettore di figli del nodo padre 
	nodes[util.get_idvectnode(id_node)].parent.children.splice(util.get_idvect(id_node, nodes[util.get_idvectnode(id_node)].parent.children), 1);
	
	for(var i = nodes.length-1; i >= 0; i--)
	{
		// Cancellazione del nodo da eliminare e di tutti i suoi figli
		if(nodes[i].id.toString().indexOf(str_idnode_deleted) == 0)
			nodes.splice(util.get_idvectnode(nodes[i].id),1);	
	}
	
	//Correzione dell'albero visualizzato
	fix_nodes_tree();
	
	// Rinominazione degli id dei nodi diventati errati dopo la cancellazione 
	for(var i = nodes.length-1; i >= 0; i--)
	{
		// Rinominazione solo se la profondità del nodo è maggiore di 0 
		if(nodes[i].depth > 0)
		{
			var str_node = nodes[i].id.toString();
			
			// Se il nodo da cancellare ha profondità 1 si rinominano tutti i nodi fratelli a destra, altri nodi figli della radice
			if(str_idnode_deleted.length == 1)
			{
				if(str_node.substring(0, 1) > str_idnode_deleted.substring(0, 1))
				{
					nodes[i].id = Number(util.replaceCharInString(str_node, 0, (str_node.substring(0, 1)-1)));
					nodes[i].position = "C" + nodes[i].id;
				}
			}
			
			// Se il nodo da cancellare ha profondità > 1 si rinominano tutti i nodi fratelli a destra e si lasciano invariati gli altri nodi figli del padre 
			else
			{			
				if(str_node.substring(depth_node_deleted-1,depth_node_deleted) > str_idnode_deleted.substring(depth_node_deleted-1, depth_node_deleted))
				{
					if(str_node.substring(0,depth_node_deleted-1) === str_idnode_deleted.substring(0,depth_node_deleted-1))
					{
						nodes[i].id = Number(util.replaceCharInString(str_node, nodes[i].depth-1, (str_node.substring(nodes[i].depth-1,nodes[i].depth)-1)));
						nodes[i].position = "C" + nodes[i].id;
					}
				}
			}
		}
	}
	
	// Rinominazione dei gnode appartenenti ai nodi con id modificato
	relabeling_gnode();
}
