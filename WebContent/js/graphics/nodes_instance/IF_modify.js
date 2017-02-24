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
//------------------------ *** NODE ITALIAN FLAG MODIFY *** ------------------------
//----------------------------------------------------------------------------------

function addNodeIFModify(id_node, text_description, specific_object, green, white, red, function_manager)
{	
	var IFmodify_element = d3.selectAll("#gnode_"+id_node);
	
	// Add rectangles to nodes
	IFmodify_element.append("rect")
		.attr("width", width_node)
		.attr("height", height_node)
		.attr("id", "rectNodeIF_"+id_node)
		.attr("class", "rect")
		.on('mouseout', function(d){
			if(tip != null)
			{
				timer_tooltip_visible = setTimeout(function(d){
					tip.hide(d);
				}, 500);		
				$('#d3_tooltip').on("mouseover",function(){
					clearTimeout(timer_tooltip_visible);
				});
				$('#d3_tooltip').on("mouseout",function(d){
					console.log(d);
					// Controllo per non far chiudere il tooltip quando ci si sposta sugli elementi interni del tooltip
					if(d.relatedTarget.localName == "svg") 
						tip.hide(d);
				});
			}
		})
		.on('mouseover', function(d){
			if(tip != null)
			{
				if(timer_tooltip_visible){
				    clearTimeout(timer_tooltip_visible);
				    timer_tooltip_visible = null;
				}
					
				tip.show(d);
			}
		});

	// Add text to nodes
	IFmodify_element.append("text")
		.attr("x", width_node / 2)
		.attr("y", height_node / 2-20)
		.attr("id", "textdescription_"+id_node)
		.attr("dy", ".35em")
		.attr("text-anchor", "middle")
		.attr("class","text")
		.text(text_description);
	
	if(id_node == 0)
	{
		// Add text to nodes
		IFmodify_element.append("text")
			.attr("x", width_node / 2)
			.attr("y", height_node / 2+10)
			.attr("id", "textspecificObject")
			.attr("dy", ".35em")
			.attr("text-anchor", "middle")
			.attr("class","text")
			.text(specific_object);
	}
	
	IFmodify_element.append("rect")
		.attr("id", "rectgreen_"+id_node)
		.attr("width", green*200)
		.attr("height", 20)
		.attr("title","Click to change Italian Flag value")
		.attr("x", 0)
		.attr("y", height_node-20)
		.attr("class", "rect-green")
		.on("click", function (d){
			if(d.id != 0)//{
//				if(green_IFinsert != 0.0 || white_IFinsert != 0.0 || red_IFinsert != 0.0)
//					createIFWindow(d, green_IFinsert, white_IFinsert, red_IFinsert, "");
//				else
//					createIFWindow(d, green, white, red, "");
//			}
			createIFWindow(d, green, white, red, "");
		});
	
	IFmodify_element.append("rect")
		.attr("id", "rectwhite_"+id_node)
		.attr("width", white*200)
		.attr("height", 20)
		.attr("title","Click to change Italian Flag value")
		.attr("x", green*200)
		.attr("y", height_node-20)
		.attr("class","rect-white")
		.on("click", function (d){
			if(d.id != 0)
				createIFWindow(d, green, white, red, "");
		});
	
	IFmodify_element.append("rect")
		.attr("id", "rectred_"+id_node)
		.attr("width", red*200)
		.attr("height", 20)
		.attr("title","Click to change Italian Flag value")
		.attr("x", (green*200+white*200))
		.attr("y", height_node-20)
		.attr("class", "rect-red")
		.on("click", function (d){
			if(d.id != 0)
				createIFWindow(d, green, white, red, "");
		});
	
	if(function_manager != null)
	{
		IFmodify_element.append("image")
		.attr("id", "imgStatusLFM_"+id_node)
	  	.attr("xlink:href", function(d){
	  		if(d.function_manager == undefined)
	  			if(function_manager == 1)
	  				return "image/instance/grey_query.png";
	  			else 
	  				return "";
	  		else if(d.function_manager.status == 0)
	  			return "image/instance/grey_query.png";
	  		else if(d.function_manager.status == 1)
	  			return "image/instance/yellow_query.png";
	  		else if(d.function_manager.status == 2)
	  			return "image/instance/green_query.png";
	  		else if(d.function_manager.status == 3)
	  			return "image/instance/red_query.png";
	  	})
	  	.attr("x", width_node - 20)
		.attr("y", height_node / 2)
		.attr("width", 18)
		.attr("height", 18);
	}
	
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
	
	var textSpecObj = d3.selectAll("#textspecificObject"),
    wordsSO = textSpecObj.text().split(/\s+/).reverse(),
    word,
    line = [],
    lineNumber = 0,
    lineHeight = 1.1, // ems 1.1
    x = textSpecObj.attr("x"),
    y = textSpecObj.attr("y"),
    dy = parseFloat(textSpecObj.attr("dy")),
	tspanSO = textSpecObj.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
	while (word = wordsSO.pop()) {
		line.push(word);
		tspanSO.text(line.join(" "));
		if (tspan.node().getComputedTextLength() > width_node) {
			line.pop();
			tspanSO.text(line.join(" "));
			line = [word];
			tspanSO = textSpecObj.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
		}
	}
}

function modifyIFValue(id_node, green, white, red)
{	
	$('#rectgreen_'+id_node).attr("width", green*200);
	$('#rectwhite_'+id_node).attr("width", white*200).attr("x",green*200);
	$('#rectred_'+id_node).attr("width", red*200).attr("x",(green*200+white*200));
}
