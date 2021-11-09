function isNumeric(input) {
    var number = /^\-{0,1}(?:[0-9]+){0,1}(?:\.[0-9]+){0,1}$/i;
    var regex = RegExp(number);
    return regex.test(input) && input.length > 0;
}

function display_error_message( msg ){
	App.createContainer('display_error_message_temp');
	var bbox = bootbox.dialog({
		title: 'Error',
		message: $('#display_error_message_temp'),
		closeButton: true,
		buttons: {
	        Cancel: {
	            label: 'OK',
	            className: 'btn-danger'
	        }
	    },
	});
	bbox.init(function () {
			$('#display_error_message_temp').empty().append( msg );
	});
}

$.fn.serializeObject = function ()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function roundTo3( num ) {    
    return +(Math.ceil( num + "e+3")  + "e-3" ) || 0;
}

function roundTo( num, places ) {    
    return +(Math.ceil( num + "e+" + places)  + "e-" + places) || 0;
}
