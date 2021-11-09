/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function directlabour_view(){
	directlabour_search(0);
}

function directlabour_search(offset){
    var description = $('#description_s').val();
    $("#groupsdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url+'directlabour/search/'+offset,{
        description: description
    },function(content){
        $('#groupsdata').empty();
        $('#groupsdata').append(content);
    });
}

function directlabour_add(){
	App.createContainer('directlabour_add_temp');
	var bbox = bootbox.dialog({
		title: 'Create Labour',
		message: $('#directlabour_add_temp'),
		closeButton: true,
		buttons: {
	        Save: {
	        	label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                	directlabour_insert();
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
		$.get( url + 'directlabour/add', function (content) {
			$('#directlabour_add_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
}

function directlabour_insert(){
    var description = $('#description').val();
    var unitid = $('#unitid').val();
    var price = $('#price').val();
    var percentage = $('#percentage').val();
    
    var msg = "";
    if(description == ""){
        msg += "- Field 'Description' Required<br/>";
    }
    if(unitid == 0){
        msg += "- Field 'Unit' Required<br/>";
    }
    if(price == ""){
        msg += "- Field 'Price' Required<br/>";
    }
    if(msg != ""){
        display_error_message(msg);
    }else{
        $.post(url+'directlabour/save',{
            description: description,
            unitid: unitid,
            price: price,
            percentage: percentage,
        },function(){
            directlabour_view();
            App.bootbox.close("directlabour_add");
        	Client.message.success("DirectLabour created successfully ...");
        });
    }
}

function directlabour_edit(id){
	App.createContainer('directlabour_edit_temp');
	var bbox = bootbox.dialog({
		title: 'Edit Labour',
		message: $('#directlabour_edit_temp'),
		closeButton: true,
		buttons: {
	        Save: {
	        	label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                	directlabour_update();
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
		$.get( url+'directlabour/edit/' + id , function (content) {
			$('#directlabour_edit_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
}

function directlabour_update(){
    var id = $('#id').val();
    var description = $('#description').val();
    var unitid = $('#unitid').val();
    var price = $('#price').val();
    var percentage = $('#percentage').val();
    
    var msg = "";
    if(description == ""){
        msg += "- Field 'Description' Required<br/>";
    }
    if(unitid == 0){
        msg += "- Field 'Unit' Required<br/>";
    }
    if(price == ""){
    	msg += "- Field 'Price' Required<br/>";
    }
    if(percentage == ""){
        msg += "- Field 'Percentage' Required<br/>";
    }
    if(msg != ""){
        display_error_message(msg);
    }else{
        $.post(url+'directlabour/update',{
            id: id,
            description: description,
            unitid: unitid,
            price: price,
            percentage: percentage,
        },function(){
            directlabour_view();
            App.bootbox.close("directlabour_edit");
        	Client.message.success("DirectLabour Updated successfully ...");
            
        });
    }
}

function directlabour_delete(id){
    if(confirm('Sure?')){
        $.get(url+'directlabour/delete/'+id,function(){
            directlabour_view();
        });    
    }
}