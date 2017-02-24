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
 * Window per la gestione dell'incogruenza
 */

function createIncongruityWindow(position, greenUser, whiteUser, redUser, greenCalc, whiteCalc, redCalc)
{
	var dialog = $('#incongruityDiv').dialog({
		resizable: false,
		width: 600,
        height: 300,
        modal: true,
        dialogClass: 'no-close custom-dialog',
		buttons: [{ text: "Save" , click: function() {
				if($('#IFUser_div').css("opacity") == 1.0)
				{
					if($('#greenChangeLabel').val() != 0 || $('#whiteChangeLabel').val() != 0 || $('#redChangeLabel').val() != 0){
						if(Math.abs($('#greenChangeLabel').val() - greenCalc)<<0.1 || 
								Math.abs($('#whiteChangeLabel').val() - whiteCalc)<0.1 || Math.abs($('#redChangeLabel').val() - redCalc)<0.1)
						{
							var dataCriteria = {green:$('#greenChangeLabel').val(), white:$('#whiteChangeLabel').val(), red:$('#redChangeLabel').val()};
							clientRest.saveDataCriteriaInstance(position, "if_insert", dataCriteria);
							
							$(this).dialog('destroy');	
						}	
					}
				}
				else if($('#IFCalculated_div').css("opacity") == 1.0){
					
					var dataCriteria = {green:greenCalc, white:whiteCalc, red:redCalc};
					clientRest.saveDataCriteriaInstance(position, "if_insert", dataCriteria);
					
					$(this).dialog('destroy');
				}
			}
		},{ text: "Reset" , click: function() {
				$('#greenLabel').text(parseFloat(Number(greenUser).toFixed(3)));
				$('#whiteLabel').text(parseFloat(Number(whiteUser).toFixed(3)));
				$('#redLabel').text(parseFloat(Number(redUser).toFixed(3)));
	
				$('#greenCalcLabel').text(parseFloat(Number(greenCalc).toFixed(3)));
				$('#whiteCalcLabel').text(parseFloat(Number(whiteCalc).toFixed(3)));
				$('#redCalcLabel').text(parseFloat(Number(redCalc).toFixed(3)));
				
				$('#greenChangeLabel').text("");
				$('#whiteChangeLabel').text("");
				$('#redChangeLabel').text("");
			}
		}],
		open: function(event, ui) { 
			$('#greenLabel').text(parseFloat(Number(greenUser).toFixed(3)));
			$('#whiteLabel').text(parseFloat(Number(whiteUser).toFixed(3)));
			$('#redLabel').text(parseFloat(Number(redUser).toFixed(3)));

			$('#greenCalcLabel').text(parseFloat(Number(greenCalc).toFixed(3)));
			$('#whiteCalcLabel').text(parseFloat(Number(whiteCalc).toFixed(3)));
			$('#redCalcLabel').text(parseFloat(Number(redCalc).toFixed(3)));
	  	},
		close: function(event, ui){				
			$(this).dialog('destroy');	
		}
	});

}