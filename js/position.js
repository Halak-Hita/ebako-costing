/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function position_view(){
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url+'position');
}

function position_add(){
    $("#dialog").load(url+'position/add');
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Add Position',
        position: ['center',50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });    
}

function position_search(offset){    
    $("#positiondata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url+'position/search/'+offset,{
        code: $('#code_s').val(),
        name: $('#name_s').val(),
        description: $('#description_s').val()
    },function(content){
        $('#positiondata').empty();
        $('#positiondata').append(content);
    });
}

function position_print(){
    $.post(url+'position/prints',{
        codes: $('#code_s').val(),
        names: $('#name_s').val(),
        description: $('#description_s').val()
    },function(content){
        var myWindow = window.open(url+'position/prints','blank');
        myWindow.document.write(content);
        myWindow.document.close();
    });
}


function position_edit(id){
    $("#dialog").load(url+'position/edit/'+id);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Edit Position',
        position: ['center',50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });    
}

function position_insert(){
    var code = $('#code').val();
    var name = $('#name').val();    
    var description = $('#description').val();    
    var msg = '';
    if(code ==''){
        msg +="- Field 'Code' Required<br/>";
    }
    if(name ==''){
        msg +="- Field 'Name' Required<br/>";
    }    
    if(msg != ''){
        display_error_message(msg)
    }else{    
        $.post(url+'position/insert',{
            code: code,
            name: name,
            description: description
        },function(content){
            var result = eval('('+content+')');            
            if(result.success){
                $("#dialog").dialog('close');
                position_search(0);
            } else {
                display_error_message(result.msg);
            }
        });        
    }
}

function position_reload(){
    $.get(url+'position/reload',function(content){
        $('#groupid').empty();
        $('#groupid').append(content)
    });
}


function position_update(){
    var id = $('#id').val();
    var code = $('#code').val();
    var name = $('#name').val();
    var description = $('#description').val();    
    var msg = '';
    if(code ==''){
        msg +="- Field 'Code' Required<br/>";
    }
    if(name ==''){
        msg +="- Field 'Name' Required<br/>";
    }    
    if(msg != ''){
        display_error_message(msg)
    }else{    
        $.post(url+'position/update',{
            id:id,
            code: code,
            name: name,
            description: description
        },function(content){
            var result = eval('('+content+')');            
            if(result.success){
                $("#dialog").dialog('close');
                position_search(0);
            } else {
                display_error_message(result.msg);
            }
        });        
    }
}

function position_delete(id){
    if(confirm('Sure?') ){
        $.get(url+'position/delete/'+id,function(content){
            var result = eval('('+content+')');            
            if(result.success){
                $("#dialog").dialog('close');
                position_search(0);
            } else {
                display_error_message(result.msg);
            }
        });
    }
}
