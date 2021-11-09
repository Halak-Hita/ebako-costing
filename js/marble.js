/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function marble_list(){
    $("#dialog2").load(url+'marble/lists');
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 300,
        position: ['center',50],
        title: 'Marble',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function marble_save(){
    var name = $('#marblename').val();
    var description = $('#_marbledescription').val();
    if(name == ''){
        display_error_message("- Field 'Name' Required");
    }else{
        $.post(url+'marble/save',{
            name: name,
            description: description
        },function(){
            marble_list();
        });
    }
}

function marble_settomodel(id){
    $('#marbleid').val(id);
    $('#name').val($('#name'+id).val());
    $('#marbledescription').val($('#description'+id).val());
    $("#dialog2").dialog('close');
}

function marble_edit2(id){
    $("#dialog3").load(url+'marble/edit2/'+id);
    $("#dialog3").dialog({
        modal: true,
        width: 'auto',
        height: 200,
        position: ['center',50],
        title: 'EDIT marble',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function marble_update(){
    var id = $('#e_id').val()
    var name = $('#e_name').val()
    var description = $('#e_description').val()
    if(name == ''){
        display_error_message("- Field 'Name' Required");
    }else{
        $.post(url+'marble/update',{
            id: id,
            name: name,
            description: description
        },function(){
            marble_list()
            $("#dialog3").dialog('close');
        });
    }
}

function marble_delete2(id){
    if(confirm('Sure?')){
        $.get(url+'marble/delete/'+id,function(){
            marble_list();
        });
    }
}