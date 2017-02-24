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
//--------------------------------- *** NODE TEXT *** ------------------------------
//----------------------------------------------------------------------------------
function addNodeText(id_node, text_edit)
{		
	var text_element = d3.selectAll("#gnode_"+id_node);
	
	// Add rectangles to nodes
	text_element.append("rect")
		.attr("width", width_node)
		.attr("height", height_node)
		.attr("class", "node text-only");
	
	text_element.append("rect")
		.attr("width", 0.33*width_node)
		.attr("height", 20)
		.attr("x", 0)
		.attr("y", height_node-20)
		.attr("class","rect_empty");

	text_element.append("rect")
		.attr("width", 0.33*width_node)
		.attr("height", 20)
		.attr("x", 0.33*width_node)
		.attr("y", height_node-20)
		.attr("class","rect_empty");

	text_element.append("rect")
		.attr("width", 0.34*width_node)
		.attr("height", 20)
		.attr("x", (0.33*width_node+0.33*width_node))
		.attr("y", height_node-20)
		.attr("class","rect_empty");
	
	// Add text to nodes
	text_element.append("text")
		.attr("id","textdescription_"+id_node)
		.attr("x", width_node/2)
		.attr("y", (height_node/2)-5)
		.attr("dy", ".35em")
		.attr("text-anchor", "middle")
		.attr("class","text")
		.text(text_edit);
	
	
	var text = d3.selectAll("#textdescription_"+id_node),
    words = text.text().split(/\s+/).reverse(),
    word,
    line = [],
    lineNumber = 0,
    lineHeight = 1.1, // ems 1.1
    x = text.attr("x"),
    y = text.attr("y"),
    dy = parseFloat(text.attr("dy")),
    tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
	while (word = words.pop()) {
		line.push(word);
		tspan.text(line.join(" "));
		if (tspan.node().getComputedTextLength() > width_node) {
			line.pop();
			tspan.text(line.join(" "));
			line = [word];
			tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
		}
	}
	
}