/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function modeltype_view(){
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url+'modeltype');
}

function modeltype_add(){
    $("#dialog").load(url+'modeltype/add');
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Add Model Type',
        position: ['center',50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });    
}

function modeltype_search(offset){    
    $("#modeltypedata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url+'modeltype/search/'+offset,{
        code: $('#code_s').val(),
        name: $('#name_s').val(),
        description: $('#description_').val()
    },function(content){
        $('#modeltypedata').empty();
        $('#modeltypedata').append(content);
    });
}

function modeltype_print(){
    $.post(url+'modeltype/prints',{
        codes: $('#codes').val(),
        names: $('#names').val(),
        description: $('#description').val()
    },function(content){
        var myWindow = window.open(url+'modeltype/prints','blank');
        myWindow.document.write(content);
        myWindow.document.close();
    });
}


function modeltype_edit(id){
    $("#dialog").load(url+'modeltype/edit/'+id);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Edit Model Type',
        position: ['center',50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });    
}

function modeltype_insert(){
    var code = $('#input_code').val();
    var description = $('#input_description').val(); 
    var msg = '';
    if(code ==''){
        msg +="- Field 'Code' Required<br/>";
    }
    if(msg != ''){
        display_error_message(msg)
    }else{    
        $.post(url+'modeltype/insert',{
            code: code,
            description: description
        },function(content){
            var result = eval('('+content+')');            
            if(result.success){
                $("#dialog").dialog('close');
                modeltype_search(0);
            } else {
                display_error_message(result.msg);
            }
        });
    }
}

function modeltype_reload(){
    $.get(url+'modeltype/reload',function(content){
        $('#groupid').empty();
        $('#groupid').append(content)
    });
}


function modeltype_update(){
    var id = $('#id').val();
    var code = $('#input_code').val();
    var description = $('#input_description').val();     
    var msg = '';
    if(code ==''){
        msg +="- Field 'Code' Required<br/>";
    }
    if(msg != ''){
        display_error_message(msg);
    }else{   
        $.post(url+'modeltype/update',{
            id: id,
            code: code,
            description: description
        },function(content){
            var result = eval('('+content+')');            
            if(result.success){                
                $("#dialog").dialog('close');
                modeltype_search($('#offset').val());
                display_info('Update Success!')
            } else {
                display_error_message(result.msg);
            }
        });        
    }
}

function modeltype_delete(id){
    if(confirm('Sure?') ){
        $.get(url+'modeltype/delete/'+id,function(content){
            var result = eval('('+content+')');            
            if(result.success){                
                modeltype_search(0);
            } else {
                display_error_message(result.msg);
            }
        });
    }
}
