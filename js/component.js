/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function component_view(){
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url+'component');
}

function component_add(){
    $('#messagelistcontainer').load(url+'component/add');
}


function component_save(){    
    var partnumber = $('#partnumber').val();
    var description = $('#description').val();
    var itemid = $('#itemid0').val();
    var remark = $('#remark').val();
    var price= $('#price').val();
    var turn= $('#turn').val();
    var lam= $('#lam').val();
    var carv= $('#carv').val();
    var mall= $('#mall').val();
    
    var ft = $('#ft').val();
    var fw= $('#fw').val();
    var fl= $('#fl').val();
    
    var rt= $('#rt').val();
    var rw= $('#rw').val();
    var rl= $('#rl').val();
    
    var ven_type = $('#description1').val();
    var ven_id = $('#itemid1').val();
    var ven_s1s = $('#ven_s1s').val();
    var ven_dgb = $('#ven_dgb').val();
    var ven_s2s = $('#ven_s2s').val();
    var mhmd = $('#mhmd').val();
    var sq_ven_a = $('#sq_ven_a').is(':checked');
    var sq_ven_dgb = $('#sq_ven_dgb').is(':checked');
    var msg = "";
    if(itemid == 0 && ven_id == 0){
        msg += "Field 'Material or Veneer' Required<br/>";
    }
    if(partnumber == ''){
        msg += "Field 'Code' Required<br/>";
    }
    if(description ==''){
        msg += "Field 'Description' Required<br/>";
    }
    if(msg != ""){
        display_error_message(msg)
    }else{
        $.ajaxFileUpload({
            url         :url+'component/save',
            secureuri   :false,
            fileElementId  :'fileupload',
            dataType    : 'json',
            data        : {
                partnumber: partnumber,
                description: description,
                itemid: itemid,
                remark: remark,
                price: price,
                turn: turn,
                lam: lam,
                carv: carv,
                mall: mall,
                ft: ft,
                fw: fw,
                fl: fl,
                rt: rt,
                rw: rw,
                rl: rl,
                ven_id: ven_id,
                ven_type: ven_type,
                ven_s1s: ven_s1s,
                ven_dgb: ven_dgb,
                ven_s2s: ven_s2s,
                mhmd: mhmd,
                sq_ven_a: sq_ven_a,
                sq_ven_dgb: sq_ven_dgb                        
            },
            success  : function (content){
                var result = eval('('+content+')');            
                if(result.success){
                    display_info('Save Data Successfull!');
                    component_view();
                }else if(result.nofile){
                    display_info('Succesfull Save Data Without Image');
                    component_view();
                } else {
                    display_error_message(result.msg);
                }
            },
            error : function (content){
                alert(content);
            }
        });
    }
}

function component_update(){
    var id = $('#id').val();
    var partnumber = $('#partnumber').val();
    var description = $('#description').val();
    var itemid = $('#itemid0').val();
    var remark = $('#remark').val();
    var price= $('#price').val();
    var turn= $('#turn').val();
    var lam= $('#lam').val();
    var carv= $('#carv').val();
    var mall= $('#mall').val();
    
    var ft = $('#ft').val();
    var fw= $('#fw').val();
    var fl= $('#fl').val();
    
    var rt= $('#rt').val();
    var rw= $('#rw').val();
    var rl= $('#rl').val();
    
    var ven_type = $('#description1').val();
    var ven_id = $('#itemid1').val();
    var ven_s1s = $('#ven_s1s').val();
    var ven_dgb = $('#ven_dgb').val();
    var ven_s2s = $('#ven_s2s').val();
    var mhmd = $('#mhmd').val();
    var sq_ven_a = $('#sq_ven_a').is(':checked');
    var sq_ven_dgb = $('#sq_ven_dgb').is(':checked');
    var filename = $('#filename').val();
    
    var msg = "";
    if(itemid == ''){
        msg += "Field 'Material' Required<br/>";
    }
    if(partnumber == ''){
        msg += "Field 'Code' Required<br/>";
    }
    if(description ==''){
        msg += "Field 'Description' Required<br/>";
    }
    if(msg != ""){
        display_error_message(msg)
    }else{
        $.ajaxFileUpload({
            url         :url+'component/update',
            secureuri   :false,
            fileElementId  :'fileupload',
            dataType    : 'json',
            data        : {
                id: id,
                partnumber: partnumber,
                description: description,
                itemid: itemid,
                remark: remark,
                price: price,
                turn: turn,
                lam: lam,
                carv: carv,
                mall: mall,
                ft: ft,
                fw: fw,
                fl: fl,
                rt: rt,
                rw: rw,
                rl: rl,
                ven_id: ven_id,
                ven_type: ven_type,
                ven_s1s: ven_s1s,
                ven_dgb: ven_dgb,
                ven_s2s: ven_s2s,
                mhmd: mhmd,
                sq_ven_a: sq_ven_a,
                sq_ven_dgb: sq_ven_dgb,
                filename: filename
            },
            success  : function (content){                
                var result = eval('('+content+')');            
                if(result.success){   
                    $("#dialog3").dialog('close');
                    display_info('Save Sucessfull!')
                    component_search($('#offset').val());
                }else if(result.nofile){
                    $("#dialog3").dialog('close')
                    display_info('Save Without Image');
                    component_search($('#offset').val());
                } else {
                    display_error_message(result.msg);
                }
            },
            error : function (content){
                alert(content);
            }
        });
    }    
}


function component_edit(id){    
    $("#dialog3").load(url+'component/edit/'+id);
    $("#dialog3").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Edit Component',
        position: [300,50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function component_delete(id){
    if(confirm('Sure?')){
        $.get(url+'component/delete/'+id,function(){
            component_view();
        });
    }
}
function component_viewdetail(id){
    $("input[name='comp[]']").attr('checked', false);
    $('#compid'+id).attr('checked',true);
    $('#componentid').val(id);
    $('#componentdetail').load(url+'component/detail/'+id);
}

function component_addmaterial(id){
    var componentid = $('#componentid').val();
    if(componentid != 0){
        $('#dialog').load(url+'component/addmaterial/'+componentid);        
        $("#dialog").dialog({
            modal: true,
            title: 'Add Material',
            position: ['center',50],
            width: 'auto',
            height: 'auto'
        });        
    }else{
        display_error_message("Please Choose Component!")        
    }
}

function component_componentlist(el_id){
    var id = $('#id').val();
    $("#dialog2").load(url+'component/componentlist/'+el_id+'/'+id);
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 300,
        position: ['center',50],
        title: 'Component',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function component_findcomponentlist(el,id){
    $.post(url+'component/findcomponentlist',{
        id: id,
        el: el,
        code: $('#code_s').val(),
        name: $('#name_s').val()        
    },
    function(content){
        $('#listsearch').empty();
        $('#listsearch').append(content);
    });
}

function component_itemlist(el_id){
    $("#dialog2").load(url+'component/itemlist/'+el_id);
    $("#dialog2").dialog({
        modal: true,
        width: 500,
        height: 500,
        position: ['center',50],
        title: 'Raw Material List',
        overlay: {
            opacity: 1,
            background: "black"
        }
    });
}

function component_set(id,receiver){
    //alert($('#names_r'+id).val());
    $('#'+receiver+'id').val($('#id_r'+id).val());
    $('#'+receiver+'name').val($('#descriptions_r'+id).val());
    $.get(url+'item/getOptionUnit/'+id,function(content){
        $('#unitid').empty();
        $('#unitid').append(content);
    });
    $("#dialog2").dialog('close');
}

function component_setcomponent(id,receiver){
    //alert($('#id_r'+id).val());
    $('#componentid').val($('#id_r'+id).val());
    $('#componentname').val($('#descriptions_r'+id).val());
    $("#dialog2").dialog('close');
}

function component_findlist(receiver){
    var partnumber_s = $('#partnumber_s').val();
    var description_s = $('#description_s').val();
    var names_s = $('#names_s').val();    
    $('#listsearch').empty();
    $.post(url+'component/findlist',{
        partnumber: partnumber_s,
        description: description_s,
        names: names_s,
        receiver: receiver
    },function(content){
        $('#listsearch').empty();
        $('#listsearch').append(content);        
    })
}

function component_insertitem(){
    var componentid = $('#componentid').val();
    var itemid = $('#materialid').val();
    var unitid = $('#unitid').val();
    var qty = $('#qty').val();
    var msg = "";
    var st = 0;
    if(itemid == ""){
        st = 1;
        msg += "- Field 'MATERIAL' Required<br/>";
    }
    if(unitid == 0){
        st = 1;
        msg += "- Field 'UNIT' Required<br/>";
    }
    
    if(st == 1){
        display_error_message(msg);
    }else{        
        $.post(url+'component/insertitem',{
            componentid: componentid,
            itemid: itemid,
            unitid: unitid,
            qty: qty
        },function(){
            component_viewdetail(componentid)
            $('#dialog').dialog('close');
        });
    }
}


function component_changeitem(){
    var itemid = $('#itemid').val();
}   

function component_deleteitem(id,componentid){
    if(confirm('Sure?')){
        $.get(url+'component/deleteitem/'+id,function(){
            component_viewdetail(componentid);
        });
    }
}

function component_changecomponentcategoryid(){
    var componentcategoryid = $('#componentcategoryid').val();     
    if(componentcategoryid == 1){
        $('#sq_ven_a').attr("checked",false);
        $('#sq_ven_dgb').attr("checked",false);
        $('#optionven_sqm').hide();
        $('#labelven_sqm').hide();   
        $.get(url+'wood/selectwood',function(content){
            $('#woodlabel').show();
            $('#woodtemp').empty();
            $('#woodtemp').append(content);
        })
    }else{        
        $('#woodtemp').empty();
        $('#woodtemp').append("<input type='hidden' id='wood' name='wood' value='0'>");
        $('#woodlabel').hide();        
        $('#optionven_sqm').show();
        $('#labelven_sqm').show();
    }
}

function component_changecomponentcategoryid_editform(componentid){
    var componentcategoryid = $('#componentcategoryid').val();    
    if(componentcategoryid == 1){        
        $('#optionven_sqm').hide();
        $('#labelven_sqm').hide();
        $.get(url+'wood/selectwoodselected/'+componentid,function(content){
            $('#woodlabel').show();
            $('#woodtemp').empty();
            $('#woodtemp').append(content);
        })
    }else{
        $('#woodtemp').empty();
        $('#woodtemp').append("<input type='hidden' id='wood' name='wood' value='0'>");
        $('#woodlabel').hide();
        $('#optionven_sqm').show();
        $('#labelven_sqm').show();
    }
}

function component_searchfordialog(){
    var code = $('#code_s').val();
    var description = $('#description_s').val();
    $.post(url+'component/searchfordialog',{
        code: code,
        description: description
    },function(content){
        $('#componentdatasearchfordialog').empty()
        $('#componentdatasearchfordialog').append(content);
    });
}

function component_searchfordialog2(e){
    if (e.keyCode == 13) {        
        component_searchfordialog();
    }
}

function component_filterdescription(el){
    var desc = $(el).val();
    
    $.post(url+'component/filterdescription',{
        desc: desc
    },function(content){
        $('#tempcompname').empty();
        $('#tempcompname').append(content);
    });
}

function component_search(offset){
    var code = $('#s_codes').val();
    var description = $('#s_description').val();
    var type = $('#s_groupid').val();
    $("#componentdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url+'component/search/'+offset,{
        code: code,
        description: description,
        type: type
    },function(content){
        $('#componentdata').empty();
        $('#componentdata').append(content)
    });
}

function componen_view_images(filename){
    var content = "";    
    if(filename == 'no-image.png'){
        content = '<h1>No Image</h1>';
    }else{
        content = "<center><img style='max-width:150px;' src='files/"+filename+"'/></center>";
    }
    
    $("#dialog2").html(content);    
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: ['center',50],
        title: 'Componen Picture',
        overlay: {
            opacity: 1,
            background: "black"
        }
    });
}

function component_set_increase_size(flag){
    var final_size = (isNumeric($('#f'+flag).val()) ? $('#f'+flag).val() : 0);
    var increase_size = (isNumeric($('#i'+flag).val()) ? $('#i'+flag).val() : 0);    
    final_size = parseFloat(final_size);
    increase_size = parseFloat(increase_size);
    var rough_size = final_size + increase_size;    
    $('#r'+flag).val(rough_size);
}