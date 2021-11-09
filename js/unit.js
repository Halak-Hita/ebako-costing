/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function unit_view(){
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url+'unit');
}

function unit_search(offset){
    $("#unitdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url+'unit/search/'+offset,{
        name: $('#name_s').val(),
        code: $('#code_s').val(),
        remark: $('#remark_s').val()
    },function(content){
        $('#unitdata').empty();
        $('#unitdata').append(content);
    });
}

function unit_print(){
    var str = "";
    $.post(url+'unit/prints',{
        name: $('#name').val(),
        code: $('#code').val(),
        remark: $('#remark').val()
    },function(content){
        str = content;
        var myWindow = window.open(url+'unit/print','blank');
        myWindow.document.write(str)
        myWindow.document.close();
    });
    
}

function unit_add(){    
    $("#dialog").load(url+'unit/add');
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Add Unit',
        position: ['center',50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function unit_save(){
    var codes = $('#codes').val();
    var names = $('#names').val();
    var remark = $('#remark').val();
    var msg = "";
    
    if(codes == ''){
        msg +="- Field 'Code' Required<br/>";
    }
    if(names == ''){
        msg +="- Field 'Name' Required<br/>";
    }
    if(msg != ''){
        display_error_message(msg);
    }else{
        $.post(url+'unit/insert',{
            codes: codes,
            names: names,
            remark: remark
        },function(content){
            var result = eval('('+content+')');            
            if(result.success){
                $("#dialog").dialog('close');
                unit_search(0);
            } else {
                display_error_message(result.msg);
            }
        });          
    }
}

function unit_edit(id){
    $("#dialog").load(url+'unit/edit/'+id);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Edit Unit',
        position: ['center',50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });    
}

function unit_update(){
    var id = $('#id').val();
    var codes = $('#codes').val();
    var names = $('#names').val();
    var remark = $('#remark').val();
    var msg = "";
    
    if(codes == ''){
        msg +="- Field 'Code' Required<br/>";
    }
    if(names == ''){
        msg +="- Field 'Name' Required<br/>";
    }
    if(msg != ''){
        display_error_message(msg);
    }else{
        $.post(url+'unit/update',{
            id: id,
            codes: codes,
            names: names,
            remark: remark
        },function(content){
            var result = eval('('+content+')');            
            if(result.success){
                $("#dialog").dialog('close');                
                unit_search($('#offset').val());
                display_info('Update Success');
            } else {
                display_error_message(result.msg);
            }
        }); 
    }
}

function unit_delete(id){
    if(confirm('Sure?')){
        $.get(url+'unit/delete/'+id,function(content){
            var result = eval('('+content+')');            
            if(result.success){
                $("#dialog").dialog('close');
                unit_search(0);
            } else {
                display_error_message(result.msg);
            }
        });
    }
}
