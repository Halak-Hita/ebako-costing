/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function costing_view(){
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url+'costing');
    my_y_position = 0;
}

function costing_createfromrequest(id){
    $("#dialog").empty();
    $("#dialog").load(url+'costing/createfromrequest/'+id);    
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: [300,100],        
        title: 'Create Costing',
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
        display_error_message(msg);
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
            $("#dialog").dialog('close');
            costing_search($('#offset').val());
        });
    }  
}

function costing_build(id,flag){ //flag (1->not load new price,2->load new price)
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
//    $("#dialog3").empty();
//    $("#dialog3").load(url+'costing/build/'+id+'/'+flag);
//    $("#dialog3").dialog({
//        modal: true,
//        width: 'auto',
//        height: 520,
//        position: [20,5],        
//        title: 'Costing Detail',
//        overlay: {
//            opacity: 0.7,
//            background: "black"
//        }
//    });
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
    $("#dialog").empty();
    $("#dialog").load(url+'costing/createnew');
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
        display_error_message(msg);
    }else{
        var arrrate = rate.split('-');
        $.get(url+'costing/isexist/'+customerid+'/'+modelid,function(content){        
            if(content == 1){
                display_error_message("- This Costing Already in Database ");
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
                    item_costing_desc: item_costing_desc,
                    date: date
                },function(){
                    $("#dialog").dialog('close');
                    costing_view();
                });     
            }
        });
    }

}


function costing_adddetail(costingid,category){
    $("#dialog2").load(url+'costing/adddetail/'+costingid+'/'+category);
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',        
        position: [100,50],
        title: 'ADD',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
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
        $("#dialog2").dialog('close');
        costing_build(costingid,1);
    });  
}

function costing_editdetail(id,costingid,category){
    $("#dialog2").empty()
    $("#dialog2").load(url+'costing/editdetail/'+id+'/'+costingid+'/'+category);
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',        
        position: [100,50],
        title: 'Add',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });    
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

function costing_approve(id){
    if(confirm('Sure?')){
        $.get(url+'costing/approve/'+id,function(){
            costing_search($('#offset').val());
        });
    }
}


function costing_copyfrom(id){
    $("#dialog2").empty();
    $("#dialog2").load(url+'costing/copyfrom/'+id);    
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',        
        position: [300,50],
        title: 'Copy Costing',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
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
    $("#dialog2").empty();
    $("#dialog2").load(url+'costing/edit/'+id);    
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: [400,50],        
        title: 'Edit',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
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
    var date = $('#date').val();
    
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
        display_error_message(msg);
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
                    newrate: newrate,
                    date: date
                },function(){
                    costing_build(id);
                    costing_view();                    
                });     
            }
        });
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
}

function costing_copypartfrom(costingid,category){    
    $("#dialog2").empty();
    $("#dialog2").load(url+'costing/copypartfrom/'+costingid+'/'+category);    
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',        
        position: [300,50],
        title: 'Copy Costing',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function costing_docopypart(toid,fromid,category){    
    if(confirm("Current data will be removed and replaced with the copy\n Are you Sure?")){        
        $.get(url+'costing/docopypart/'+toid+'/'+fromid+'/'+category,function(){
            $("#dialog2").dialog('close');
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
            costing_build(costingid,1);
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
    $("#datacosting").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url+'costing/search/'+offset,{
        code: code,
        custcode: custcode,
        customerid: customerid,
        datefrom: datefrom,
        dateto: dateto
    },function(content){
        $('#datacosting').empty();
        $('#datacosting').append(content);
        $('#bvan_tbl_s_costing_qzx').scrollTop(my_y_position);
    });
}

