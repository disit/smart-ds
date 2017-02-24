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
 *  Operazioni sul modello
 */

/*
 *  Inizializzazione variabili per visualizzazione ---------------------------------------------------------------------
 */

// Dimensioni dei nodi grafici
var width_gnode_vertical = 220, height_gnode_vertical = 150;

var width_gnode_horizontal = 300, height_gnode_horizontal = 120;

// Altezza iniziale dei modelli
var initial_height = 80;

// Scarti per la visualizzazione delle label sugli archi
var diff_width_linkLabel = 10, diff_height_linkLabel = 70; 

var zm = null;


/*
 *  Funzioni per la visualizzazione dei modelli ---------------------------------------------------------------------
 */

// Inizializzazione dell'albero utilizzando la variabile root
function initModel()
{
	if(type_rotate == "vertical")
	{
		// Inizializzazione dell'albero con la dimensione preimpostata dei nodi
		tree = d3.layout.tree().nodeSize([width_gnode_vertical, height_gnode_vertical]);
		
		// Separazione dei sottoalberi
		tree.separation(function separation(a, b) {
	        return a.parent == b.parent ? 1 : 1.2;
	    });
		
		diagonal = d3.svg.diagonal()
			.source(function(d) { return {"x":d.source.x, "y":(d.source.y + (height_node/2))}; })            
			.target(function(d) { return {"x":d.target.x, "y":d.target.y - (height_node/2)}; })
			.projection(function(d) { return [d.x, d.y]; });
		
		svg_body = d3.select("#model_body").append("svg")
	    .attr("width", width_tree)
	    .attr("height", height_tree)
	    .call(zm = d3.behavior.zoom().scaleExtent([min_zoom, max_zoom]).on("zoom", redraw))
	    .append("g")
	    .attr("transform", "translate("+ width_tree/2 +","+ initial_height +") scale("+ zoom_initial +")");
		
		zm.translate([width_tree/2, initial_height]);
	}
	else{
		
		// Inizializzazione dell'albero con la dimensione preimpostata dei nodi
		tree = d3.layout.tree().nodeSize([height_gnode_horizontal, width_gnode_horizontal]);
		
		// Separazione dei sottoalberi
		tree.separation(function separation(a, b) {
	        return a.parent == b.parent ? 1.2 : 1;
	    });

		diagonal = d3.svg.diagonal()
			.source(function(d) { return {"x":d.source.x-(height_gnode_horizontal/2), "y":d.source.y+width_node}; })   // d.source.x+(height_gnode_horizontal/2)
			.target(function(d) { return {"x":d.target.x-(height_gnode_horizontal/2), "y":d.target.y}; })		// d.target.x+(height_gnode_horizontal/2)
			.projection(function(d) { return [d.y, d.x]; }); //[d.y,-d.x] per blocchi ribaltati sull'asse x
		
		svg_body = d3.select("#model_body").append("svg")
	    .attr("width", width_tree)
	    .attr("height", height_tree)
	    .call(zm = d3.behavior.zoom().scaleExtent([min_zoom, max_zoom]).on("zoom", redraw))
	    .append("g")
	    .attr("transform", "translate("+(width_tree/2)/2+","+height_tree/2+") scale("+zoom_initial+")");
		
		zm.translate([(width_tree/2)/2, height_tree/2]);
	}
	
	//Inizializzazione dei nodi e della radice dell'albero D3
	nodes = tree(root);
	links = tree.links(nodes);

	//necessary so that zoom knows where to zoom and unzoom from
	zm.scale(zoom_initial);
	
	node = svg_body.selectAll(".node");
	link = svg_body.selectAll(".link");
	
	// Recompute the layout and data join.
	node = node.data(tree.nodes(root), function (d) {
		return getId(d.position);
	});
	link = link.data(tree.links(nodes), function (d) {
    	return getId(d.source.position) + "-" + getId(d.target.position);
	});
}

// Visualizzazione del modello
function showModel()
{
	// Add entering links in the parent's old position.
	link.enter().insert("path", ".g.node")
        .attr("class", "link")
        .attr("d", function (d) {
            var o = {x: d.source.x, y: d.source.y};
            return diagonal({source: o, target: o});
       	})
       	.attr("id",function(d,i){
			return ("link_"+getId(d.target.position));
		})
    	.attr('pointer-events', 'none');
	
	// Transition nodes and links to their new positions.
	var t = svg_body.transition()
		.duration(duration);
	
	t.selectAll(".link")
	    .attr("d", diagonal);
	  	
	// Enter any new nodes at the parent's previous position.
	var nodeEnter = node.enter().append("g")
		.attr("id",function(d){
			return ("gnode_"+getId(d.position));
		});

	nodeEnter.each(function(d,i){
		if(type_rotate == "vertical")
			this.setAttribute("transform", "translate("+(d.x-(width_node/2))+","+(d.y-(height_node/2))+")");
		else
			this.setAttribute("transform", "translate(" +(d.y)+ "," +(d.x-(width_node/2))+ ")"); //d.y,-(d.x-(width_node/2)) per blocchi ribaltati sull'asse x
	});
	
}

//Aggiornamento del modello dopo l'aggiunta di un nuovo nodo
function updateModel()
{
	// Recompute the layout and data join.
	node = node.data(tree.nodes(root), function (d) {
		return getId(d.position);
	});
	link = link.data(tree.links(nodes), function (d) {
    	return getId(d.source.position) + "-" + getId(d.target.position);
	});

	// Add entering nodes in the parentâs old position.
	var new_gelement = node.enter().append("g").attr("id",function(d){
		return ("gnode_"+getId(d.position));
	});
	
	if(type_rotate == "vertical")
		node_plus = {path:path_imgplus, "x":0, "y":0};
	else
		node_plus = {path:path_imgplus, "x":-(width_node/2)+30, "y":12};
	
	new_gelement.each(function(d,i){
		addNodePlus(node_plus, new_gelement);	
	});
	
	// Add entering links in the parentâs old position.
	link.enter().insert("path", ".g.node")
        .attr("class", "link")
        .attr("d", function (d) {
            var o = {x: d.source.x, y: d.source.y};
            return diagonal({source: o, target: o});
       	})
    	.attr('pointer-events', 'none');
	
	// Transition nodes and links to their new positions.
	var t = svg_body.transition()
		.duration(duration);
	
	t.selectAll(".link")
	    .attr("d", diagonal);
	
	translateGNodes();
}

function changeNameRoot(nameModel)
{
	d3.selectAll("#textdescription_0").text(nameModel);
}

//function rotateModel()
//{
//	if(type_rotate == "vertical")
//	{
//		
//		alert("Larghezza del nodo in verticale: " + width_gnode_vertical);
//		
//		tree.nodeSize(width_gnode_vertical, height_gnode_vertical);
//		
//		alert(tree.nodeSize[1] + " ", tree.nodeSize[0]);
//		
//		node.each(function(d,i){
//			$('#gnode_'+getId(d.position)).attr("transform","translate(" +d.x+ "," +d.y+ ") rotate(0)");
//		});
//	      
//		diagonal = d3.svg.diagonal()
//		.source(function(d) { return {"x":d.source.x+(width_node/2), "y":(d.source.y+height_node)}; })            
//		.target(function(d) { return {"x":(d.target.x+(width_node/2)), "y":d.target.y}; })
//		.projection(function(d) { return [d.x, d.y]; });
//	    
//	    link.transition()
//	      .duration(duration)
//	      .attr("d", diagonal);
//	}
//		
//	if(type_rotate == "horizontal")
//	{
//
//		alert("Larghezza del nodo in verticale: " + width_gnode_vertical);
//		
////		tree.nodeSize(width_gnode_vertical, height_gnode_vertical);
//		
//		tree.nodeSize(height_gnode_horizontal, width_gnode_horizontal);
//		
//		var dim_nodetree = tree.nodeSize(2);
//		
//		console.log(dim_nodetree);
//		
//		node.each(function(d,i){
//			$('#gnode_'+getId(d.position)).attr("transform","translate(" +d.y+ "," +(-d.x)+ ")");
//		});
//	      
//	    diagonal = d3.svg.diagonal()
//			.source(function(d) { return {"x":d.source.x+(width_node/2), "y":d.source.y+height_node}; })            
//			.target(function(d) { return {"x":d.target.x+(width_node/2), "y":d.target.y}; })
//			.projection(function(d) { return [d.y, -d.x]; });
//	    
//	    link.transition()
//	      .duration(duration)
//	      .attr("d", diagonal);
//	}
//}



