/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function packing_list(){
    $("#dialog2").load(url+'packing/lists');
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 300,
        position: ['center',50],
        title: 'Packing List',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function packing_save(){
    var name = $('#packingname').val();
    var description = $('#_packingdescription').val();
    $.post(url+'packing/save',{
        name: name,
        description: description
    },function(){
        packing_list();
    });
}

function packing_settomodel(id){
    $('#packingid').val(id);
    $('#name').val($('#name'+id).val());
    $('#packingdescription').val($('#description'+id).val());
    $("#dialog2").dialog('close');
}

function packing_edit2(id){
    $("#dialog3").load(url+'packing/edit2/'+id);
    $("#dialog3").dialog({
        modal: true,
        width: 'auto',
        height: 200,
        position: ['center',50],
        title: 'Edit Packing',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function packing_update(){
    var id = $('#e_id').val()
    var name = $('#e_name').val()
    var description = $('#e_description').val()
    $.post(url+'packing/update',{
        id: id,
        name: name,
        description: description
    },function(){
        packing_list()
        $("#dialog3").dialog('close');
    });
}

function packing_delete2(id){
    if(confirm('Sure?')){
        $.get(url+'packing/delete/'+id,function(){
            packing_list();
        });
    }
}