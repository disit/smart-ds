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
 * Operazioni sui nodi
 */


// Calcolo dei nuovi nodi da inserire nel modello dopo il click su un plus node
function computeNewNodes(id_node)
{
	
	// Calcolo degli indici dei nodi da creare nell'albero 
	if (nodes.length >= 500) 
		return clearInterval(timer);
	
	var id_newnode;
	if(id_node > 0)
		id_newnode = id_node * 10 + 1;
	else
		id_newnode = 1;
	
	// Add a new node to a parent.
	var n = {id: id_newnode, position: "C"+id_newnode};
	var p = nodes[util.get_idvectnode(id_node)];
	
	if (p.children) 
		p.children.push(n); 
	else 
		p.children = [n];
	nodes.push(n);
	
	if(id_node == 0)
		var father = null;
	else
		var father = nodes[util.get_idvectnode(id_node)].parent;
		
	if(father)
	{
		var n2 = {id: father.children[father.children.length-1].id+1, position: "C"+(father.children[father.children.length-1].id+1)};
		
		father.children.push(n2);
		nodes.push(n2);
	}		
}

//Calcolo dei nuovi nodi da inserire su un modello caricato dal server
function computeNewNodeOnExisting(d)
{
	if(nodes[util.get_idvectnode(d.id)].children)
	{
		var father = nodes[util.get_idvectnode(d.id)];
			
		if(father)
		{
			var n2 = {id: (father.children[father.children.length-1].id+1), position: "C"+(father.children[father.children.length-1].id+1)};
			
			father.children.push(n2);
			nodes.push(n2);
		}
	}
	else{
		var id_newnode = d.id * 10 + 1;
		
		var n = {id: id_newnode, position: "C"+id_newnode};
		var p = nodes[util.get_idvectnode(d.id)];
		
		if (p.children) 
			p.children.push(n); 
		else 
			p.children = [n];
		nodes.push(n);
	}
}

// Operazione di sistemazione dell'albero in seguito alla cancellazione di un nodo
function fix_nodes_tree()
{
	
	// Recompute the layout and data join.
	node = node.data(tree.nodes(root), function (d) {		
		return d.id;
	});
	link = link.data(tree.links(nodes), function (d) {
    	return d.source.id + "-" + d.target.id;
	});
	
	node.exit().remove();
	link.exit().remove();
	
	// Transition nodes and links to their new positions.
	var t = svg_body.transition()
		.duration(duration);
	
	t.selectAll(".link")
	    .attr("d", diagonal);
	    	
	translateGNodes();
}

//Operazione di ridenominazione dell'id dei nodi dell'albero in seguito alla cancellazione di un nodo
function relabeling_gnode()
{
	node.each(function(d,i) 
	{
		var str = this.getAttribute("id");
		var id_old = str.substring(str.indexOf("_")+1);
		
		if(id_old != d.id)
		{

			this.setAttribute("id","gnode_"+d.id);
			
			// Caso di un nodo plus
			d3.selectAll("#nodeplus_"+id_old).attr("id","nodeplus_"+d.id);
			
			// Caso di un nodo edit-rect
			d3.selectAll("#nodeedit_"+id_old).attr("id","nodeedit_"+d.id);
			d3.selectAll("#div_nodeedit_"+id_old).attr("id","div_nodeedit_"+d.id);
			d3.selectAll("#input_nodeedit_"+id_old).attr("id","input_nodeedit_"+d.id);
			d3.selectAll("#deleteicon_"+id_old).attr("id","deleteicon_"+d.id);
			
			// Caso di un nodo text-modify
			d3.selectAll("#nodetextmodify_"+id_old).attr("id","nodetextmodify_"+d.id);
			d3.selectAll("#textdescription_"+id_old).attr("id","textdescription_"+d.id);
			d3.selectAll("#modifyicon_"+id_old).attr("id","modifyicon_"+d.id);
		}
	});	
}

// Operazione di traslazione dei nodi grafici
function translateGNodes()
{
	node.each(function(d,i) 
	{
		if(type_rotate == "vertical")
			this.setAttribute("transform", "translate("+(d.x-(width_node/2))+","+(d.y-(height_node/2))+")");
		else
			this.setAttribute("transform", "translate("+(d.y)+","+(-d.x-(width_node/2))+")");
	});
}

function getId(position)
{
	if(position == undefined)
		position = "C0";
	return parseInt(position.substring(1));
}