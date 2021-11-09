/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function latherinlay_list(){
    $("#dialog2").load(url+'latherinlay/lists');
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 300,
        position: ['center',50],
        title: 'Lather inlay',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function latherinlay_save(){
    var name = $('#latherinlayname').val();
    var description = $('#_latherinlaydescription').val();
    if(name == ''){
        display_error_message("- Field 'Name' Required");
    }else{
        $.post(url+'latherinlay/save',{
            name: name,
            description: description
        },function(){
            latherinlay_list();
        });
    }
}

function latherinlay_settomodel(id){
    $('#latherinlayid').val(id);
    $('#name').val($('#name'+id).val());
    $('#latherinlaydescription').val($('#description'+id).val());
    $("#dialog2").dialog('close');
}

function latherinlay_edit2(id){
    $("#dialog3").load(url+'latherinlay/edit2/'+id);
    $("#dialog3").dialog({
        modal: true,
        width: 'auto',
        height: 200,
        position: ['center',50],
        title: 'Edit Lather Inlay',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function latherinlay_update(){
    var id = $('#e_id').val()
    var name = $('#e_name').val()
    var description = $('#e_description').val()
    if(name == ''){
        display_error_message("- Field 'Name' Required");
    }else{
        $.post(url+'latherinlay/update',{
            id: id,
            name: name,
            description: description
        },function(){
            latherinlay_list()
            $("#dialog3").dialog('close');
        });
    }
}

function latherinlay_delete2(id){
    if(confirm('Sure?')){
        $.get(url+'latherinlay/delete/'+id,function(){
            latherinlay_list();
        });
    }
}