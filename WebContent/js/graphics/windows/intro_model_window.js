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

function createIntroModelWindow()
{
	var dialog = $('#div_insert_info_model').dialog({
		resizable: false,
        height: 400,
        width: 400,
        modal: true,
        dialogClass: 'no-close custom-dialog',
		buttons: [{ text: "Ok", click: function() {

						if($('#input_objective_model').val() != "")
						{
							introModelWindowClosed($('#input_objective_model').val(), $('#input_url_model').val(), $('#input_description_model').val());
							$(this).dialog('destroy');
						}	
						else{
							$('#input_objective_model').css("box-shadow", "inset 0 1px 10px red");
						}	
					}
				  },{
					text: "Reset", click: function() {
						$('#input_objective_model').val("");
						$('#input_url_model').val("");
						$('#input_description_model').val("");
					}
				}
			],
			close: function(event, ui){
				$('#input_objective_model').val("");
				$('#input_url_model').val("");
				$('#input_description_model').val("");
				introModelWindowClosed(null, null, null);

				$(this).dialog('destroy');
			}
		});
	
	$('#div_insert_info_model').keyup(function(e) {
		if (e.keyCode == 13) //enter
		{
			var buttons = dialog.dialog('option', 'buttons');
			buttons[0].click.apply(dialog);
		}   
	});
	
	$('#input_description_model').focusin(function(e){
		$('#div_insert_info_model').off("keyup");
	});
	
	$('#input_description_model').focusout(function(){
		$('#div_insert_info_model').keyup(function(e) {
			if (e.keyCode == 13) //enter
			{
				var buttons = dialog.dialog('option', 'buttons');
				buttons[0].click.apply(dialog);
			}   
		});
	});
}