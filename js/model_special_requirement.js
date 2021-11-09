function model_special_requirement(id){
	App.createContainer('model_special_requirement_temp');
	var bbox = bootbox.dialog({
		title: 'Special Requirement',
		message: $('#model_special_requirement_temp'),
		closeButton: true,
		size:'large',
	});
	bbox.init(function () {
		$.get( url + 'model/special_requirement/' + id, function (content) {
			$('#model_special_requirement_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
}

function model_save_special_requirement(modelid) {
    var special_requirement = document.getElementsByName("special_requirement[]");
    var arr_special_requirement = [];
    for (var i = 0; i < special_requirement.length; i++) {
        if (special_requirement[i].checked) {
            arr_special_requirement.push( special_requirement[i].value );
        }
    }

    var packing_type = document.getElementsByName("packing_type[]");
    var arr_packing_type = [];
    for (i = 0; i < packing_type.length; i++) {
        if (packing_type[i].checked) {
            arr_packing_type.push( packing_type[i].value );
        }
    }
    
    var finish_on_body_frame =  document.getElementsByName( "finish_on_body_frame" )[0].value;
    var finish_on_metal_hardware = document.getElementsByName( "finish_on_metal_hardware" )[0].value;
    
    $.ajax({
    	url: url + 'model/update_special_requirement',
        type: 'post',
        dataType: 'json',
        //contentType: 'application/json',
        data: {
            'modelid': modelid,
            'finish_on_body_frame': finish_on_body_frame,
            'finish_on_metal_hardware': finish_on_metal_hardware,
            'special_requirement': arr_special_requirement,
            'packing_type': arr_packing_type,
        },
        success: function (result) {
            if (result.success) {
            	Client.message.success("Data updated successfully ...");
            	App.bootbox.close("model_special_requirement");
                //model_special_requirement(modelid);
            } else {
                App.errorForm.create({message:result.msg});
            }
        },
        error: function (content) {
            alert(content);
        }
    });
    
}

function model_add_other_special_requirement(modelid, typeid){
	var _title = "";
    if (typeid == 11) {
        _title = 'Add Others Special Requirement';
    } else if (typeid == 12) {
        _title = 'Add Others Packing Type';
    }
    
	App.createContainer('model_add_other_special_requirement_temp');
	var bbox = bootbox.dialog({
		title: _title,
		message: $('#model_add_other_special_requirement_temp'),
		closeButton: true,
	});
	bbox.init(function () {
		$.get( url + 'model/add_other_special_requirement/' + modelid + '/' + typeid , function (content) {
			$('#model_add_other_special_requirement_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
}

function model_edit_other_special_requirement(id, typeid) {
    var _title = "";
    if (typeid == 11) {
        _title = 'Edit Others Special Requirement';
    } else if (typeid == 12) {
        _title = 'Edit Others Packing Type';
    }
    
	App.createContainer('model_edit_other_special_requirement_temp');
	var bbox = bootbox.dialog({
		title: _title,
		message: $('#model_edit_other_special_requirement_temp'),
		closeButton: true,
	});
	bbox.init(function () {
		$.get( url + 'model/edit_other_special_requirement/' + id , function (content) {
			$('#model_edit_other_special_requirement_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
}

function model_save_other_special_requirement() {
    var id = $('#_id').val();
    var modelid = $('#model_id').val();
    var description = $('#description_').val();
    var typeid = $('#type_id').val();
    var msg = '';
    if (description == '') {
        msg = "- Field 'Description' Required<br/>";
    }
    if (msg != '') {
        App.errorForm.create({message:msg});
    } else {
        $.post(url + 'model/save_other_special_requirement', {
            id: id,
            modelid: modelid,
            typeid: typeid,
            description: description
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                Client.message.success("Data inserted successfully ...");
                App.bootbox.close("model_add_other_special_requirement");
                App.bootbox.close("model_edit_other_special_requirement");
                App.bootbox.close("model_special_requirement");
                model_special_requirement(modelid);
            } else {
                App.errorForm.create({message:result.msg});
            }
        });
    }
}

function model_delete_other_special_requirement(id, modelid) {
    if (confirm('Are You Sure?')) {
        $.post(url + 'model/delete_other_special_requirement', {
            id: id
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
            	App.bootbox.close("model_special_requirement");
                model_special_requirement(modelid);
            } else {
                App.errorForm.create({message:result.msg});
            }
        });
    }
}