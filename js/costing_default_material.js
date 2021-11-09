
function costing_default_material_view(){
    costing_default_material_search(0);
}

function costing_default_material_search(offset){
    var categoryid = $('#costing_default_material__categoryid').val();
    var materialcode = $('#costing_default_material__materialcode').val();
    var materialdescription = $('#costing_default_material__materialdescription').val();
    
    $("#groupsdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post( url + 'costing_default_material/search/' + offset,{
    	categoryid: categoryid,
    	materialcode: materialcode,
    	materialdescription: materialdescription,
    },function(content){
        $('#groupsdata').empty();
        $('#groupsdata').append(content);
    });
}

function costing_default_material_add(){
	App.createContainer('costing_default_material_add_temp');
	var bbox = bootbox.dialog({
		title: 'Create Costing Default Material',
		message: $('#costing_default_material_add_temp'),
		closeButton: true,
		size: 'large',
		className: "modal-size-midle",
		buttons: {
	        Save: {
	        	label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                	costing_default_material_save();
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
		$.get( url+'costing_default_material/add', function (content) {
			$('#costing_default_material_add_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
}

function costing_default_material_save(){
    var data = App.serializeObject("#form_add__costing_default_material");
    $.post( url + 'costing_default_material/save',
    	data
    ,function(){
    	costing_default_material_view();
        App.bootbox.close("costing_default_material_add");
    	Client.message.success("Default Material created successfully ...");
    });
}

function costing_default_material_edit(id){
	App.createContainer('costing_default_material_edit_temp');
	var bbox = bootbox.dialog({
		title: 'Edit Default Material',
		message: $('#costing_default_material_edit_temp'),
		closeButton: true,
		size: 'large',
		className: "modal-size-midle",
		buttons: {
	        Save: {
	        	label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                	costing_default_material_update();
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
		$.get( url+'costing_default_material/edit/'+id, function (content) {
			$('#costing_default_material_edit_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
}

function costing_default_material_update(){
    var id = $('#id').val();
    var data = App.serializeObject("#form_edit__costing_default_material");
    
    $.post(url+'costing_default_material/update',
    	data
    ,function(){
        costing_default_material_view();
        App.bootbox.close("costing_default_material_edit");
    	Client.message.success("Default Material updated successfully ...");
    });
}

function costing_default_material_delete(id){
    if(confirm('Sure')){
        $.get(url+'costing_default_material/delete/'+id,function(){
            costing_default_material_view();
        });
    }
    
}

