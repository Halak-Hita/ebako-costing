var my_y_position = 0;

function costing_view(){
	costing_search(0);
    my_y_position = 0;
}

function costing_createfromrequest(id){
	App.modalForm.create({ 'element':'costing_from_request','title':'Create Costing','url':'costing/createfromrequest/'+id });
}

function costing_savefromrequest(){
    var id = $('#id').val();
    var rate =  $('#rate').val();
    var fixed_cost = $('#fixed_cost').val();
    var variable_cost = $('#variable_cost').val();
    var profit_percentage = $('#profit_percentage').val();
    var port_origin_cost = $('#port_origin_cost').val();
    var date = $('#date').val();
    
    var msg = "";
    if(rate == 0){
        msg += "- Field 'RATE' reqiured<br/>";
    }
    if(fixed_cost == ''){
        msg += "- Field 'FIXED COST' reqiured<br/>";
    }
    if(variable_cost == ''){
        msg += "- Field 'VARIABLE COST' reqiured<br/>";
    }
    if(profit_percentage == ''){
        msg += "- Field 'PROFIT PERCENTAGE' reqiured<br/>";
    }
    if(port_origin_cost == ''){
        msg += "- Field 'PORT ORIGIN COST' reqiured<br/>";
    }
    if(date == ''){
        msg += "- Field 'DATE' reqiured<br/>";
    }    
    
    if(msg != ""){
        App.errorForm.create({message:msg});
    }else{
        var arrrate = rate.split('-');
        $.post(url+'costing/savefromrequest',{
            id: id,
            rateid: arrrate[0],
            ratevalue: arrrate[1],
            fixed_cost: fixed_cost,
            variable_cost: variable_cost,
            profit_percentage: profit_percentage,
            port_origin_cost: port_origin_cost,
            date: date
        },function(){
            App.modalForm.hide('costing_from_request');
            costing_search($('#offset').val());
        });
    }  
}

function costing_build(id,flag){
	
	$('#menu_content_costing').hide();
		
	if( $('#menu_content_costing_detail').length != 0 ) {
		$('#menu_content_costing_detail').remove();
	}
	
	$('#menu_content_costing').after('<div id="menu_content_costing_detail"></div>');
	//loading page
	$("#menu_content_costing_detail").html('<center><button class="btn btn-sm btn-default"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Loading....</button></center>');
	//append content
	$.get( 'costing/build/'+id+'/'+flag ).done(function (content) {
		$("#menu_content_costing_detail").html(content);
    }).fail(function (data) {
    	$("#menu_content_costing_detail").html('<center><button class="btn btn-sm btn-default"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Load Page Error....</button></center>');
    });
	
}

function costing_back_to_menu_costing(){
	$('#menu_content_costing_detail').remove();
	$('#menu_content_costing').show();
}

function costing_build2(id,flag){
    $("#dialog3").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>")
    $("#dialog3").load(url+'costing/build/'+id+'/'+flag,function(){
        $('#bvan_tbl_costing_qzx').scrollTop(my_y_position);
    }).dialog({
        modal: true,
        width: '99%',
        height: 600,
        title: 'Costing Detail',
        position: ['center', 10],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function costing_create(id,soid,modelid){
    $("#dialog").empty();
    $("#dialog").load(url+'costing/create/'+id+'/'+soid+'/'+modelid);    
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: [300,5],
        title: 'Create Costing',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function costing_createnew(){
	//App.modalForm.create({'element':'costing','title':'Create Costing','url':'costing/createnew'});
	App.createContainer('costing_temp');
	var bbox = bootbox.dialog({
		title: 'Create Costing',
		message: $('#costing_temp'),
		closeButton: true,
	});
	bbox.init(function () {
		$.get('costing/createnew', function (content) {
			$('#costing_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
}

function costing_model_choose(){
	//App.modalForm.create({'element':'costing_model','title':'Select Model','large':true, 'url':'model/lists/model/0/0'});
	App.createContainer('costing_model_temp');
	var bbox = bootbox.dialog({
		title: 'Select Model',
		message: $('#costing_model_temp'),
		closeButton: true,
		size:'large',
	});
	bbox.init(function () {
		$.get('model/lists/model/0/0', function (content) {
			$('#costing_model_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
}

function costing_model_set(id, temp, tempid){
	    $('#' + temp + 'id' + tempid).val(id);
	    $('#' + temp + 'code' + tempid).val($('#code' + id).val());
	    $('#' + temp + 'description' + tempid).val($('#description' + id).val());
	    App.modalForm.hide('costing_model');
}

function costing_model_set2(id, temp, tempid) {
    var modelid = document.getElementsByName('modelid[]');
    var st = 0;
    for (var i = 0; i < modelid.length; i++) {
        if (modelid[i].value == id) {
            st = 1;
            break;
        }
    }
    if (st == 0) {
        $('#' + temp + 'id' + tempid).val(id);
        $('#' + temp + 'code' + tempid).val($('#code' + id).val());
        $('#' + temp + 'description' + tempid).val($('#description' + id).val());
        $('#' + temp + 'finishing' + tempid).val($('#finishoverview' + id).val());
        $('#' + temp + 'fabrication' + tempid).val($('#constructionoverview' + id).val());
        $('#billto').prop("disabled", true);
        App.modalForm.hide('costing_model');
    } else {
    	App.errorForm.create({message:' - Duplicate Model!'});
    }
}

function costing_savenew(){
    var customerid = $('#customerid').val();
    var modelid = $('#modelid0').val();
    var rate =  $('#rate').val();
    var fixed_cost = $('#fixed_cost').val();
    var variable_cost = $('#variable_cost').val();
    var profit_percentage = $('#profit_percentage').val();
    var port_origin_cost = $('#port_origin_cost').val();
    var item_costing_desc = $('#item_costing_desc').val();
    var date = $('#date').val();
    var msg = "";
    
    var preparedby = $('#name-apprvove1').val();
    var checkedby = $('#name-apprvove2').val();
    var approvedby = $('#name-apprvove3').val();
    
    if(customerid == 0){
        msg += "- Field 'CUSTOMER' reqiured<br/>";
    }
    if(modelid == 0){
        msg += "- Field 'MODEL' reqiured";
    }    
    if(rate == 0){
        msg += "- Field 'RATE' reqiured";
    }
    if(fixed_cost == ''){
        msg += "- Field 'FIXED COST' reqiured";
    }
    if(variable_cost == ''){
        msg += "- Field 'VARIABLE COST' reqiured";
    }
    if(profit_percentage == ''){
        msg += "- Field 'PROFIT PERCENTAGE' reqiured";
    }
    if(port_origin_cost == ''){
        msg += "- Field 'PORT ORIGIN COST' reqiured";
    }
    if(date == ''){
        msg += "- Field 'DATE' reqiured";
    }
    
    if(msg != ""){
        App.errorForm.create({'message':msg});
    }else{
        var arrrate = rate.split('-');
        $.get(url+'costing/isexist/'+customerid+'/'+modelid,function(content){        
            if(content == 1){
            	App.errorForm.create({message:"- This Costing Already in Database "});
            }else{
                $.post(url+'costing/savenew',{
                    customerid: customerid,
                    modelid: modelid,
                    rateid: arrrate[0],
                    ratevalue: arrrate[1],
                    fixed_cost: fixed_cost,
                    variable_cost: variable_cost,
                    profit_percentage: profit_percentage,
                    port_origin_cost: port_origin_cost,
                    date: date,
                    item_costing_desc: item_costing_desc,
                    q_wood: $('#q_wood').val(),
                    q_veneer: $('#q_veneer').val(),
                    q_upholstery_type: $('#q_upholstery_type').val(),
                    q_fabric: $('#q_fabric').val(),
                    q_leather: $('#q_leather').val(),
                    q_other_remarks: $('#q_other_remarks').val(),
                    q_shipping_conf: $('#q_shipping_conf').val(),
                    q_packing: $('#q_packing').val(),
                    q_qty_perbox: $('#q_qty_perbox').val(),
                    q_finishes: $('#q_finishes').val(),
                    'preparedby': preparedby,
                    'checkedby': checkedby,
                    'approvedby': approvedby
                    
                },function(){
                	App.bootbox.close("costing");
                	costing_view();
                	Client.message.success("Costing created successfully ...");
                });     
            }
        });
    }

}


function costing_adddetail(costingid,category,category_name){
	App.modalForm.create({'element':'costing_adddetail','title':'Add to category : [ ' + category_name + ' ]' ,'large':true, 'url':'costing/adddetail/'+costingid+'/'+category});
}

function costing_savedetail(){    
    var costingid = $('#costingid').val();
    var categoryid = $('#categoryid').val();
    var materialcode = $('#materialcode').val();
    var materialdescription = $('#materialdescription').val();
    var uom = $('#uom').val();
    var qty = $('#qty').val();
    var yield = $('#yield').val();
    var allowance = $('#allowance').val();
    var req_qty = $('#req_qty').val();
    var unitpricerp = $('#unitpricerp').val();
    var unitpriceusd = $('#unitpriceusd').val();
    $.post(url+'costing/savedetail',{
        costingid: costingid,
        categoryid: categoryid,
        materialcode: materialcode,
        materialdescription: materialdescription,
        uom: uom,
        qty: qty,
        yield: yield,
        allowance: allowance,
        req_qty: req_qty,
        unitpricerp: unitpricerp,
        unitpriceusd: unitpriceusd
    },function(){
        costing_build(costingid,1);
        costing_adddetail(costingid, categoryid)
    });  
}

function costing_updatedetail(){
    var id = $('#id').val();    
    var costingid = $('#costingid').val();
    var materialcode = $('#materialcode').val();
    var materialdescription = $('#materialdescription').val();
    var uom = $('#uom').val();
    var qty = $('#qty').val();
    var yield = $('#yield').val();
    var allowance = $('#allowance').val();
    var req_qty = $('#req_qty').val();
    var unitpricerp = $('#unitpricerp').val();
    var unitpriceusd = $('#unitpriceusd').val();
    var itemid = $('#itemid0').val();
    $.post(url+'costing/updatedetail',{
        id: id,
        costingid: costingid,
        materialcode: materialcode,
        materialdescription: materialdescription,
        uom: uom,
        qty: qty,
        yield: yield,
        allowance: allowance,
        req_qty: req_qty,
        unitpricerp: unitpricerp,
        unitpriceusd: unitpriceusd,
        itemid: itemid
    },function(){
    	App.modalForm.hide("costing_adddetail");
        costing_build(costingid,1);
    });  
}

function costing_editdetail(id,costingid,category){
	App.modalForm.create({'element':'costing_adddetail','title':'Edit' ,'large':true, 'url':'costing/editdetail/'+id+'/'+costingid+'/'+category });
}

function costing_deletedetail(id,costingid){    
    if(confirm("Sure?")){
        $.get(url+'costing/deletedetail/'+id,function(){
            costing_build(costingid);
        });
    }
}

function costing_move(el,id,costingid){
    var category = $(el).val();
    if(category != 0){        
        $.get(url+'costing/move/'+id+'/'+category,function(){
            costing_build(costingid)
        });
    }
}

function costing_approve2(id){
    if(confirm('Sure?')){
        $.get(url+'costing/approve/'+id,function(){
            costing_search($('#offset').val());
        });
    }
}

function costing_view_approval_notes( costingid, status, who){
	App.createContainer('costing_view_approval_notes_temp');
	var bbox = bootbox.dialog({
		title: "Notes",
		message: $('#costing_view_approval_notes_temp'),
		closeButton: true,
		//size: 'large',
		//className: "modal-size-midle",
		buttons: {
	        Cancel: {
	            label: 'Close',
	            className: 'btn-danger'
	        }
	    },
	});
	bbox.init(function () {
		$.get( url + 'costing/view_approval_notes/' + costingid + '/' + status + '/' + who , function (content) {
			$('#costing_view_approval_notes_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'message': data});
		});
	});
}

function costing_approve( costingid, approvalid, status, who, flag ){
	//close if exist
	App.bootbox.close("costing_view_approval_notes");
	
	if (status === 1) {
		App.createContainer('costing_approve_temp');
		var bbox = bootbox.dialog({
			title: 'Approve Costing',
			message: $('#costing_approve_temp'),
			closeButton: true,
			size: 'large',
			className: "modal-size-midle",
			buttons: {
				Approve: {
		        	label: "<i class=\"fa fa-save\"></i> Approve",
	                className: "btn btn-success",
	                callback: function () {
	                	$.post(url + 'costing/approve', {
	                        costingid: costingid,
	                        approvalid: approvalid,
	                        who: who,
	                        status: status
	                    }).done(function (content) {
	                		var result = eval('(' + content + ')');
	                        if (result.success) {
	                            if (flag === 0) {
	                                costing_search( $('#offset').val() );
	                                App.bootbox.close("costing_approve");
	                            	Client.message.success("Costing Approved Successfully ...");
	                            } else {
	                            	costing_search( $('#offset').val() );
	                                bbox.modal("hide");
	                    			Client.message.error({'message': data.msg});
	                            }
	                        } else {
	                        	Client.message.error({'message': result.msg});
	                        }
	                	}).fail(function (data) {
	            			bbox.modal("hide");
	            			Client.message.error({'message': data.msg});
	            		});
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
				$('#costing_approve_temp').empty().append( '<span><br/>Are you sure to approve this document?</span>' );
		});
	} else {
		var dialogtitle = (status === 2) ? 'PENDING' : 'REJECT';
		App.createContainer('costing_approve_temp');
		var bbox = bootbox.dialog({
			title: dialogtitle,
			message: $('#costing_approve_temp'),
			closeButton: true,
			//size: 'large',
			//className: "modal-size-midle",
			buttons: {
		        Save: {
		        	label: "<i class=\"fa fa-save\"></i> Save",
	                className: "btn btn-success",
	                callback: function () {
	                	costing_do_reject_or_pending();
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
			$.get( url + 'costing/rejectOrPending/' + costingid + '/' + approvalid + '/' + status + '/' + who + '/' + flag , function (content) {
				$('#costing_approve_temp').empty().append(content);
			}).done(function () {
			}).fail(function (data) {
				bbox.modal("hide");
				Client.message.error({'message': data});
			});
		});
		
	}
}

function costing_do_reject_or_pending() {
    var costingid = $('#costing_costingid').val();
    var approvalid = $('#costing_approvalid').val();
    var who = $('#costing_who').val();
    var status = $('#costing_status').val();
    var flag = $('#costing_flag').val();
    var notes = $('#costing_notes').val();
    
    var dialogtitle = (status === 2) ? 'PENDING' : 'REJECT';

    $.post(url + 'costing/do_reject_or_pending', {
        costingid: costingid,
        approvalid: approvalid,
        status: status,
        who: who,
        notes: notes
    }, function (content) {
        var result = eval('(' + content + ')');
        if (result.success) {
            if (flag === '0') {
                costing_search($('#offset').val());
                App.bootbox.close("costing_approve");
            	Client.message.success( dialogtitle + " Done Successfully ...");
            	
            } else {
            	costing_search( $('#offset').val() );
            }
        } else {
        	Client.message.error({'message': result.msg});
        }
    });
}

function costing_view_additional_notes( costingid){
	App.createContainer('costing_view_additional_notes_temp');
	var bbox = bootbox.dialog({
		title: "Additional Notes",
		message: $('#costing_view_additional_notes_temp'),
		closeButton: true,
		//size: 'large',
		//className: "modal-size-midle",
		buttons: {
			Save: {
	        	label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                	costing_save_additional_notes();
	            	return false;
	            }
	        },
	        Cancel: {
	            label: 'Close',
	            className: 'btn-danger'
	        }
	    },
	});
	bbox.init(function () {
		$.get( url + 'costing/view_additional_notes/' + costingid , function (content) {
			$('#costing_view_additional_notes_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'message': data});
		});
	});
}

function costing_save_additional_notes() {
    var costingid = $('#costing_costingid').val();
    var additional_notes = $('#costing_additional_notes').val();
    
    $.post(url + 'costing/save_additional_notes', {
        costingid: costingid,
        additional_notes: additional_notes
    }, function (content) {
        var result = eval('(' + content + ')');
        if (result.success) {
            App.bootbox.close("costing_view_additional_notes");
        	Client.message.success( " Additional Notes Save Successfully ...");
        } else {
        	Client.message.error({'message': result.msg});
        }
    });
}

function costing_copyfrom(id){
	App.modalForm.create({'element':'costing_model','title':'Select Model','large':true, 'url':'costing/copyfrom/'+id});
}

function costing_loadfromcuttinglist(id,soid,modelid){
    if(confirm('Sure?')){
        $.get(url+'costing/loadfromcuttinglist/'+id+'/'+soid+'/'+modelid,function(){       
            costing_create(id,soid,modelid);
        });
    }
}

function costing_load_all_material(id,modelid){
    if(confirm('Sure?')){
        $.get(url+'costing/loadAllMaterial/'+id+'/'+modelid,function(){       
            costing_build(id, 1);
        });
    }
}

function costing_docopy(toid,fromid){
    if(confirm("Current data will be removed and replaced with the copy\n Are you Sure?")){        
        $.get(url+'costing/docopy/'+toid+'/'+fromid,function(){
            $("#dialog2").dialog('close');
            costing_build(toid);
        });
    }
}

function costing_savefobprice(id){
    if(confirm('Sure ?')){
        var fobprice = $('#fobprice').val();    
        var directmaterial = $('#directmaterial').val();
        var directlabour = $('#directlabour').val();
        var fixed_cost_value = $('#fixed_cost_value').val();
        var variable_cost_value = $('#variable_cost_value').val();
        var sellprice = $('#newsellprice').val();
        var profit_percentage = $('#profit_percentage').val();
        var pick_list_hardware = $('#pick_list_hardware').val();
        var sub_contractor = $('#sub_contractor').val();
        var port_origin_cost = $('#port_origin_cost').val();
        var sub_total = $('#sub_total').val();    
        $.post(url+'costing/savefobprice',{
            id: id,
            directmaterial: directmaterial,
            directlabour: directlabour,
            fixed_cost_value: fixed_cost_value,
            variable_cost_value: variable_cost_value,
            sellprice: sellprice,
            profit_percentage: profit_percentage,
            pick_list_hardware: pick_list_hardware,
            sub_contractor: sub_contractor,
            port_origin_cost: port_origin_cost,
            sub_total: sub_total,        
            fobprice: fobprice
        },function(){
            alert('Saved!');
        });
    }
//}

}


function costing_edit(id){
	//App.modalForm.create({ 'element':'costing_update','title':'Edit','large':false, 'url':'costing/edit/'+id });
	
	App.createContainer('costing_update_temp');
	var bbox = bootbox.dialog({
		title: 'Update Costing',
		message: $('#costing_update_temp'),
		closeButton: true,
	});
	bbox.init(function () {
		$.get( 'costing/edit/'+id , function (content) {
			$('#costing_update_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
}

function costing_update(){
    var id = $('#id').val();
    var customerid = $('#customerid').val();
    var modelid = $('#modelid0').val();
    var temprate = $('#rate').val();
    var rate = temprate.split('-', 2);
    var fixed_cost = $('#fixed_cost').val();
    var variable_cost = $('#variable_cost').val();
    var profit_percentage = $('#profit_percentage').val();
    var port_origin_cost = $('#port_origin_cost').val();    
    var currentratevalue = $('#ratevalue').val();
    var newrate = $('#newrate').prop('checked');
    var item_costing_desc = $('#item_costing_desc').val();
    var date = $('#date').val();
    
    var preparedby = $('#name-apprvove1').val();
    var checkedby = $('#name-apprvove2').val();
    var approvedby = $('#name-apprvove3').val();
    
    var msg = "";
    if(customerid == 0){
        msg += "Field 'CUSTOMER' reqiured<br/>";
    }
    if(modelid == 0){
        msg += "- Field 'MODEL' reqiured<br/>";
    }    
    if(rate == 0){
        msg += "- Field 'RATE' reqiured<br/>";
    }
    if(fixed_cost == ''){
        msg += "- Field 'FIXED COST' reqiured<br/>";
    }
    if(variable_cost == ''){
        msg += "- Field 'VARIABLE COST' reqiured<br/>";
    }
    if(profit_percentage == ''){
        msg += "- Field 'PROFIT PERCENTAGE' reqiured<br/>";
    }
    if(port_origin_cost == ''){
        msg += "- Field 'PORT ORIGIN COST' reqiured<br/>";
    }
    if(date == ''){
        msg += "- Field 'DATE' reqiured<br/>";
    }
    
    if(msg != ""){
    	App.errorForm.create({message:msg});
    }else{        
        $.get(url+'costing/isexist2/'+customerid+'/'+modelid+'/'+id,function(content){        
            if(content == 1){
                alert("Error!"+"\n - This Costing Already in Database ");
            }else{
                $.post(url+'costing/update',{
                    customerid: customerid,
                    modelid: modelid,
                    id: id,
                    rateid: rate[0],
                    ratevalue: rate[1],
                    fixed_cost: fixed_cost,
                    variable_cost: variable_cost,
                    profit_percentage: profit_percentage,
                    port_origin_cost: port_origin_cost,
                    currentratevalue: currentratevalue,
                    item_costing_desc: item_costing_desc,
                    q_wood: $('#q_wood').val(),
                    q_veneer: $('#q_veneer').val(),
                    q_upholstery_type: $('#q_upholstery_type').val(),
                    q_fabric: $('#q_fabric').val(),
                    q_leather: $('#q_leather').val(),
                    q_other_remarks: $('#q_other_remarks').val(),
                    q_shipping_conf: $('#q_shipping_conf').val(),
                    q_packing: $('#q_packing').val(),
                    q_qty_perbox: $('#q_qty_perbox').val(),
                    q_finishes: $('#q_finishes').val(),
                    newrate: newrate,
                    date: date,
                    
                    'preparedby': preparedby,
                    'checkedby': checkedby,
                    'approvedby': approvedby
                    
                },function(){
                    //costing_build(id);
                	App.bootbox.close("costing_update");
                	Client.message.success("Costing updated successfully...");
                	costing_search(0);                    
                });     
            }
        });
        
        //App.modalForm.hide("costing_update");
        
    }
}

function costing_preview(id,soid,modelid){
    $("#dialog2").empty();
    $("#dialog2").load(url+'costing/prints/'+id+'/'+modelid+'/'+soid+'/view/1');    
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: [50,40],        
        title: 'Edit Costing',
        overlay: {
            opacity: 0.7,
            background: "black"
        },
        create: function() {
            $(this).css("maxHeight", 500);
            $(this).css("maxWidth", 1100);
        }
    });
}

function costing_loadfrommaterial(costingid,costingcategory,modelid){
    //alert(costingid+'/'+costingcategory+'/'+modelid);
    if(confirm('Sure?')){
        $.get(url+'costing/loadfrommaterial/'+costingid+'/'+costingcategory+'/'+modelid,function(){
            costing_build(costingid,1);
        });
    }
}

function costing_delete(id){
    if(confirm('Sure?')){
        $.get(url+'costing/delete/'+id,function(){
            costing_view();
        });
    }
}function submit_to_check(id){
    if(confirm('Submit to check?')){
        $.get(url+'costing/submit_to_check/'+id,function(){
            costing_view();
        });
    }
}

function costing_copypartfrom(costingid,category){    
	App.modalForm.create({ 'element':'costing_model_detail','title':'Select Model','large':true, 'url':'costing/copypartfrom/'+costingid+'/'+category });
}

function costing_docopypart(toid,fromid,category){    
    if(confirm("Current data will be removed and replaced with the copy\n Are you Sure?")){        
        $.get(url+'costing/docopypart/'+toid+'/'+fromid+'/'+category,function(){
        	App.modalForm.hide("costing_model_detail");
            costing_build(toid,1);
        });
    }
}

function costing_loaddirectlabour(id,categoryid){
    //alert(id+'/'+categoryid);
    if(confirm("Current data will be removed and replaced with the default\n Are you Sure?")){        
        $.get(url+'costing/loaddirectlabour/'+id,function(){            
            costing_build(id,1);
        });
    }
}

function costing_lock(costingid){
    if(confirm('Lock indicates the costing is final, you cannot make changes anymore.\nSure?')){
        $.get(url+'costing/lock/'+costingid,function(){
            $("#dialog3").dialog('close');
            costing_search($('#offset').val());
        });
    }
}

function costing_unlock(costingid){
    if(confirm('UnLock?')){
        $.get(url+'costing/unlock/'+costingid,function(){            
            costing_search($('#offset').val());
        });
    }
}


function costing_updatematerialprice(costingid,valid){
    if(valid == 0){
        if(confirm("No Price For Some Item\n When you try to update the pirce for item will be set as 0.\n Do You Really Force to Update?")){
            $.get(url+'costing/updatematerialprice/'+costingid,function(){
                costing_build(costingid,1);
            });
        }   
    }else{
        if(confirm('Sure?')){
            $.get(url+'costing/updatematerialprice/'+costingid,function(){
                costing_build(costingid,1);
            });
        }
    }
}

function costing_searchcopycosting(){
    var id = $('#id_s').val();
    var modelcode_s = $('#modelcode_s').val();
    var custcode_s = $('#custcode_s').val();
    var modeldescription_s = $('#modeldescription_s').val();
    var customerid_s = $('#customerid_s').val();    
    $.post(url+'costing/searchcopycosting',{
        id : id,
        modelcode: modelcode_s,
        custcode: custcode_s,
        modeldescription: modeldescription_s,
        customerid: customerid_s
    },function(content){
        $('#datacostingcopyfrom').empty();
        $('#datacostingcopyfrom').append(content);
    });
}

function costing_review_fixed_sell_price(){
    var sellprice = parseFloat($('#sellprice').val());
    var directmaterial = parseFloat($('#directmaterial').val());
    var directlabour = parseFloat($('#directlabour').val());
    var fixed_cost_percent = parseFloat($('#fixed_cost_percent').val());
    var variable_cost_percent = parseFloat($('#variable_cost_percent').val());
    var pick_list_hardware = parseFloat($('#pick_list_hardware').val());
    var sub_contractor = parseFloat($('#sub_contractor').val());    
    
    var newfactorycost = directmaterial + directlabour;    
    var sell_percentage = (newfactorycost / sellprice).toFixed(2);
    var profit_percentage = ((0.82 - sell_percentage) * 100).toFixed(2);     
    var variable_cost_value = parseFloat(((sellprice * variable_cost_percent)/100).toFixed(2))
    var fixed_cost_value = parseFloat(((sellprice * fixed_cost_percent)/100).toFixed(2))
    var port_origin_cost  = parseFloat(((sellprice * 0.0145)).toFixed(2));
    var sub_total = parseFloat(pick_list_hardware + sub_contractor + parseFloat(port_origin_cost));
    var fobprice =  parseFloat(sub_total) + parseFloat(sellprice);
    //    var msg = newfactorycost+'/'+sell_percentage;
    //    
    //    alert(msg);
    $("#profit_percentage").val(profit_percentage);
    $("#sell_percentage").val(sell_percentage);
    $("#newsellprice").val(sellprice);
    $("#variable_cost_value").val(variable_cost_value);
    $("#fixed_cost_value").val(fixed_cost_value);
    $("#port_origin_cost").val(port_origin_cost);   
    $('#sub_total').val(sub_total);    
    $('#fobprice').val(fobprice.toFixed(2));
}

function costing_review(){
    $('#review').hide();
    $('#ok').show();
    $('#cancel').show();
    $('#review_fixed_profit_percentage').show();
    $('#review_fixed_sell_price').show();
}

function costing_ok(){
    $('#ok').hide();    
    $('#review_fixed_profit_percentage').hide();
    $('#review_fixed_sell_price').hide();
    $('#cancel').show();
    $('#costingsave').show();
}

function costing_cancel(){
    $('#review').show();
    $('#review_fixed_profit_percentage').hide();
    $('#review_fixed_sell_price').hide();
    $('#cancel').hide();
    $('#costingsave').hide();
    $('#ok').hide();
}

function costing_review_fixed_profit_percentage(){
    $("#profit_percentage").val($("#temp_profit_percentage").val());
    $("#sell_percentage").val($("#temp_sell_percentage").val());
    $("#newsellprice").val($("#temp_newsellprice").val());
    $("#variable_cost_value").val($("#temp_variable_cost_value").val());
    $("#fixed_cost_value").val($("#temp_fixed_cost_value").val());
    $("#port_origin_cost").val($("#temp_port_origin_cost").val());   
    $('#sub_total').val($('#temp_sub_total').val());    
    $('#fobprice').val($('#temp_fobprice').val());
}

function costing_search(offset){
    var code = $('#code_search').val();
    var custcode = $('#custcode_search').val();
    var customerid = $('#customerid_search').val();
    var datefrom = $('#datefrom').val();
    var dateto = $('#dateto').val();
    var is_over_due = $( "#is_over_due:checked" ).val();
    var status_search_costing_id = $('#status_search_costing_id').val();
    
    $("#datacosting").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url+'costing/search/'+offset,{
        code: code,
        custcode: custcode,
        customerid: customerid,
        datefrom: datefrom,
        dateto: dateto,
        is_over_due: is_over_due,
        status_search_costing_id: status_search_costing_id,
    },function(content){
        $('#datacosting').empty();
        $('#datacosting').append(content);
        $('#bvan_tbl_s_costing_qzx').scrollTop(my_y_position);
    });
}

function costing_search_over_due(){
	$("#is_over_due").prop('checked', true);
	costing_search(0);
	
	$('html, body').animate({
        scrollTop: $("#costing_filter").offset().top
    }, 1000);
}

function costing_search_then_print_summary(offset){
    var code = $('#code_search').val();
    var custcode = $('#custcode_search').val();
    var customerid = $('#customerid_search').val();
    var datefrom = $('#datefrom').val();
    var dateto = $('#dateto').val();
    var is_over_due = $( "#is_over_due:checked" ).val();
    
    var full_url = url + 'costing/search_then_print_summary/' + offset + "?code=" + code + "&custcode=" + custcode + 
    		  "&customerid=" + customerid + "&datefrom=" + datefrom + "&dateto=" + dateto + "&is_over_due=" + is_over_due;
    
    var win = window.open( full_url, '_blank');
    win.focus();
    
}
