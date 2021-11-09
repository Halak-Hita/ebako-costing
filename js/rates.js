function rates_view() {
	rates_search( $('#offset').val() );
}

function rates_search(offset) {
	if(undefined == offset){
		offset = $('#offset').val(); 
	}
	if(undefined == offset){
		offset = 0; 
	}
    $("#ratesdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'rates/search/' + offset,{
    	'evidence_number': $('#rate_search_form input[name=evidence_number]').val(),
    	'start_date': $('#rate_search_form input[name=start_date]').val(),
    	'end_date': $('#rate_search_form input[name=end_date]').val(),
    	'currency': $('#rate_search_form select[name=currency]').val(),
    }, function (content) {
        $('#ratesdata').empty();
        $('#ratesdata').append(content);
    });
}

function rates_add(){
	App.createContainer('rates_add_temp');
	var bbox = bootbox.dialog({
		title: 'Add Rates',
		message: $('#rates_add_temp'),
		closeButton: true,
		buttons: {
	        Save: {
	        	label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                	rates_save();
	            	return false;
	            }
	        },
	        Cancel: {
	            label: 'Cancel',
	            className: 'btn-danger'
	        }
	    },
	});
	bbox.init(function () {
		$.get( url + 'rates/add', function (content) {
			$('#rates_add_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
}

function rates_save(){
    var date = $('#rates_add_form #date').val();
    var currency = $('#rates_add_form #currency').val();
    var exchange_rate = $('#rates_add_form #exchange_rate').val();
    
    var data = App.serializeObject("#rates_add_form");
    
    var msg = "";
    if(data.date == ""){
        msg += "- Field 'Date' Required<br/>";
    }
    if(data.currency == 0){
        msg += "- Field 'Currency' Required<br/>";
    }
    if(data.exchange_rate == ""){
        msg += "- Field 'Exchange Rate' Required<br/>";
    }
    if(msg != ""){
    	display_error_message(msg);
    }else{
        $.post( url + 'rates/save',
        		data
        ,function(){
        	rates_search( $('#offset').val() );
            App.bootbox.close("rates_add");
        	Client.message.success("Rates created successfully ...");
        });
    }
}

function rates_edit(id){
	App.createContainer('rates_edit_temp');
	var bbox = bootbox.dialog({
		title: 'Edit Rates',
		message: $('#rates_edit_temp'),
		closeButton: true,
		buttons: {
	        Save: {
	        	label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                	rates_update();
	            	return false;
	            }
	        },
	        Cancel: {
	            label: 'Cancel',
	            className: 'btn-danger'
	        }
	    },
	});
	bbox.init(function () {
		$.get( url + 'rates/edit/' + id, function (content) {
			$('#rates_edit_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
}

function rates_update(){
	var date = $('#rates_add_form #date').val();
    var currency = $('#rates_add_form #currency').val();
    var exchange_rate = $('#rates_add_form #exchange_rate').val();
    
    var data = App.serializeObject("#rates_edit_form");
    
    var msg = "";
    if(data.date == ""){
        msg += "- Field 'Date' Required<br/>";
    }
    if(data.currency == 0){
        msg += "- Field 'Currency' Required<br/>";
    }
    if(data.exchange_rate == ""){
        msg += "- Field 'Exchange Rate' Required<br/>";
    }
    if(msg != ""){
    	display_error_message(msg);
    }else{
        $.post(url+'rates/update',
        	data
        ,function(){
        	rates_search( $('#offset').val() );
            App.bootbox.close("rates_edit");
        	Client.message.success("Rates updated successfully ...");
        });
    }
}

function rates_delete(id){
	App.createContainer('rates_delete_temp');
	var bbox = bootbox.dialog({
		title: 'Delete Rates',
		message: $('#rates_delete_temp'),
		closeButton: true,
		buttons: {
	        Delete: {
	        	label: "<i class=\"fa fa-remove\"></i> Delete",
                className: "btn btn-danger",
                callback: function () {
                	$.get(url + 'rates/delete/' + id, function (result) {
                        rates_search( $('#offset').val() );
                        App.bootbox.close("rates_delete");
                    	Client.message.success("Rates Deleted successfully ...");
                    });
                	
	            	return false;
	            }
	        },
	        Cancel: {
	            label: 'Cancel',
	            className: 'btn-default'
	        }
	    },
	});
	bbox.init(function () {
		$('#rates_delete_temp').empty().append('<p>These items will be permanently deleted and cannot be recovered<br/> Are you sure?</p>');
	});
}

