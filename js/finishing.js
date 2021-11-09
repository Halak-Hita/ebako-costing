/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function finishing_list(){
    $("#dialog2").load(url+'finishing/lists');
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 300,
        position: ['center',50],
        title: 'Finishing List',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function finishing_save(){
    var name = $('#finishingname').val();
    var description = $('#_finishingdescription').val();
    if(name == ''){
        display_error_message("- Field 'Name' required ");
    }else{        
        $.post(url+'finishing/save',{
            name: name,
            description: description
        },function(){
            finishing_list();
        });
    }
}

function finishing_settomodel(id){
    $('#finishingid').val(id);
    $('#name').val($('#name'+id).val());
    $('#finishingdescription').val($('#description'+id).val());
    $("#dialog2").dialog('close');
}

function finishing_edit2(id){
    $("#dialog3").load(url+'finishing/edit2/'+id);
    $("#dialog3").dialog({
        modal: true,
        width: 'auto',
        height: 200,
        position: ['center',50],
        title: 'Edit Finishing',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function finishing_update(){
    var id = $('#e_id').val()
    var name = $('#e_name').val()
    var description = $('#e_description').val()
    if(name == ''){
        display_error_message("Field 'Name' required");
    }else{
        $.post(url+'finishing/update',{
            id: id,
            name: name,
            description: description
        },function(){
            finishing_list()
            $("#dialog3").dialog('close');
        });
    }
}

function finishing_delete2(id){
    if(confirm('Sure?')){
        $.get(url+'finishing/delete/'+id,function(){
            finishing_list();
        });
    }
}