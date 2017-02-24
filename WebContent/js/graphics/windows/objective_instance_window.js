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

function createObjectiveInstanceWindow()
{	
	
	var dialog = $('#div_insert_objective').dialog({
		resizable: false,
        height: 200,
        width: 400,
        modal: true,
        dialogClass: 'no-close custom-dialog',
		buttons: [{ text: "Ok", click: function() {
						if($('#input_objective').val() != "")
						{
							objectiveWindowClosed($('#input_objective').val(), $('#input_url_repository').val());
							$(this).dialog('destroy');
						}	
						else{
							$('#input_objective').css("box-shadow", "inset 0 1px 10px red");
						}	
					}
				  },{
					text: "Reset", click: function() {
						$('#input_objective').val("");
						$('#input_url_repository').val("");
					}
				}
			],
			close: function(event, ui){
				$('#input_objective').val("");
				$('#input_url_repository').val("");
				objectiveWindowClosed(null, null);

				$(this).dialog('destroy');
			}
		});
	
	$('#div_insert_objective').keyup(function(e) {
		if (e.keyCode == 13) //enter
		{
			var buttons = dialog.dialog('option', 'buttons');
			buttons[0].click.apply(dialog);
		}   
	});
}