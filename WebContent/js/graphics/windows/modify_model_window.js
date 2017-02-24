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

function createModifyInfoModelWindow($dialog)
{
	$dialog.dialog({
		height: 400,
        width: 400,
        dialogClass: 'no-close custom-dialog',
		buttons: [{ text: "Ok", title:'Save new information model', 
					click: function() {
						if($('#input_objective_modify_model').val() != "")
						{							
							if($('#input_objective_modify_model').val() != null && $('#input_url_modify_model').val() != null && $('#input_description_modify_model').val() != null)
							{
								// Chiamata REST per la modifica delle info del modello
//								alert("Chiamata REST per la modifica delle informazioni del modello!");
								
								clientRest.modifyDataModel($('#input_objective_modify_model').val(), $('#input_url_modify_model').val(), $('#input_description_modify_model').val());
							
								$('#nameModelInfo').text($('#input_objective_modify_model').val());
//								$('#urlInfo').text($('#input_url_modify_model').val());
								
								$('#urlInfo').empty();
								if($('#input_url_modify_model').val() != "" && $('#input_url_modify_model').val() != "null" && $('#input_url_modify_model').val() != "url")
								{
									var link = $(document.createElement("a"));
								    link.attr("href","http://" + $('#input_url_modify_model').val());
								    link.attr("target","_blank");
								    link.text($('#input_url_modify_model').val());
								    
								    $('#urlInfo').append(link);
								}else
									$('#urlInfo').text($('#input_url_modify_model').val());
								
								$('#descriptionInfo').text($('#input_description_modify_model').val());
							}
							
							$dialog.dialog('destroy');
						}	
						else{
							$('#input_objective_modify_model').css("box-shadow", "inset 0 1px 10px red");
						}	
					}
				  },{
					text: "Reset", click: function() {
						$('#input_objective_modify_model').val($('#nameModelInfo').text());
				  		$('#input_url_modify_model').val($('#urlInfo').text());
				  		$('#input_description_modify_model').val($('#descriptionInfo').text());
					}
				}
			],
			open: function(event, ui) { 	
		  		$('#input_objective_modify_model').val($('#nameModelInfo').text());
		  		$('#input_url_modify_model').val($('#urlInfo').text());
		  		$('#input_description_modify_model').val($('#descriptionInfo').text());
		  	},
			close: function(event, ui){
				$('#input_objective_modify_model').val("");
				$('#input_url_modify_model').val("");
				$('#input_description_modify_model').val("");
				
				$dialog.dialog('destroy');
			}
		});
	
	$dialog.dialog('open');
	
	$('#div_modify_info_model').keyup(function(e) {
		if (e.keyCode == 13) //enter
		{
			var buttons = $dialog.dialog('option', 'buttons');
			buttons[0].click.apply($dialog);
		}   
	});
	
	$('#input_description_modify_model').focusin(function(e){
		$('#div_modify_info_model').off("keyup");
	});
	
	$('#input_description_modify_model').focusout(function(){
		$('#div_modify_info_model').keyup(function(e) {
			if (e.keyCode == 13) //enter
			{
				var buttons = $dialog.dialog('option', 'buttons');
				buttons[0].click.apply($dialog);
			}   
		});
	});
}