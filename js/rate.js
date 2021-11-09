/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function rate_view(){
    rate_search(0);
}

function rate_search(offset){
    var currency = $('#currency').val();
    $("#groupsdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url+'rate/search/'+offset,{
    	currency: currency
    },function(content){
        $('#groupsdata').empty();
        $('#groupsdata').append(content);
    });
}

function rate_add(){
	App.createContainer('rate_add_temp');
	var bbox = bootbox.dialog({
		title: 'Create Rate',
		message: $('#rate_add_temp'),
		closeButton: true,
		buttons: {
	        Save: {
	        	label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                	rate_save();
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
		$.get( url+'rate/add', function (content) {
			$('#rate_add_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
}

function rate_save(){
    var currency_from = $('#currency_from').val();
    var currency_to = $('#currency_to').val();
    var value = $('#value').val();
    
    $.post(url+'rate/save',{
        currency_from: currency_from,
        currency_to: currency_to,
        value: value
    },function(){
    	rate_view();
        App.bootbox.close("rate_add");
    	Client.message.success("Rate created successfully ...");
    });
}

function rate_edit(id){
	App.createContainer('rate_edit_temp');
	var bbox = bootbox.dialog({
		title: 'Edit Rate',
		message: $('#rate_edit_temp'),
		closeButton: true,
		buttons: {
	        Save: {
	        	label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                	rate_update();
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
		$.get( url+'rate/edit/'+id, function (content) {
			$('#rate_edit_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
}

function rate_update(){
    var id = $('#id').val();
    var currency_from = $('#currency_from').val();
    var currency_to = $('#currency_to').val();
    var value = $('#value').val();
    
    $.post(url+'rate/update',{
        id: id,
        currency_from: currency_from,
        currency_to: currency_to,
        value: value
    },function(){
        rate_view();
        App.bootbox.close("rate_edit");
    	Client.message.success("Rate updated successfully ...");
    });
}

function rate_delete(id){
    if(confirm('Sure')){
        $.get(url+'rate/delete/'+id,function(){
            rate_view();
        });
    }
    
}

