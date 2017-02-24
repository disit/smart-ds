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

function showAlert(text_alert)
{
	
	var dialog = $('#div_alert').dialog({
		resizable: false,
        height: 170,
        width: 250,
        modal: true,
        dialogClass: 'no-close custom-dialog',
		buttons: [{ text: "Ok" , click: function(){
//				if(element != undefined && element != null)
//					element.triggerHandler( "select" );
				$(this).dialog('destroy');
			} 
		}],
		open: function(event, ui) { 
	  		$('#text_alert').text(text_alert);
	  	},
		close: function(event, ui){
//			if(element != undefined && element != null)
//				element.triggerHandler( "select" );
			$(this).dialog('destroy');	
		}
	});
	
}