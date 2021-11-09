/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function groups_view(){
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url+'groups');
}

function groups_add(){
    $("#dialog").load(url+'groups/add');
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Add item Group',
        position: ['center',50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });    
}

function groups_search(offset){    
    $("#groupsdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url+'groups/search/'+offset,{
        code: $('#code_s').val(),
        name: $('#name_s').val(),
        description: $('#description_').val()
    },function(content){
        $('#groupsdata').empty();
        $('#groupsdata').append(content);
    });
}

function groups_print(){
    $.post(url+'groups/prints',{
        codes: $('#codes').val(),
        names: $('#names').val(),
        description: $('#description').val()
    },function(content){
        var myWindow = window.open(url+'groups/prints','blank');
        myWindow.document.write(content);
        myWindow.document.close();
    });
}


function groups_edit(id){
    $("#dialog").load(url+'groups/edit/'+id);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Edit item group',
        position: ['center',50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });    
}

function groups_insert(){
    var codes = $('#codes_g').val();
    var names = $('#names_g').val();    
    var descriptions = $('#descriptions_g').val(); 
    var msg = '';
    if(codes ==''){
        msg +="- Field 'Code' Required<br/>";
    }
    if(names ==''){
        msg +="- Field 'Name' Required<br/>";
    }    
    if(msg != ''){
        display_error_message(msg)
    }else{    
        $.post(url+'groups/insert',{
            code: codes,
            name: names,
            description: descriptions
        },function(content){
            var result = eval('('+content+')');            
            if(result.success){
                $("#dialog").dialog('close');
                groups_search(0);
            } else {
                display_error_message(result.msg);
            }
        });
    }
}

function groups_reload(){
    $.get(url+'groups/reload',function(content){
        $('#groupid').empty();
        $('#groupid').append(content)
    });
}


function groups_update(){
    var id = $('#id').val();
    var codes = $('#codes').val();
    var names = $('#names').val();
    var descriptions = $('#descriptions').val();    
    var msg = '';
    if(codes ==''){
        msg +="- Field 'Code' Required<br/>";
    }
    if(names ==''){
        msg +="- Field 'Name' Required<br/>";
    }    
    if(msg != ''){
        display_error_message(msg);
    }else{   
        $.post(url+'groups/update',{
            id: id,
            codes: codes,
            names: names,
            descriptions: descriptions
        },function(content){
            var result = eval('('+content+')');            
            if(result.success){                
                $("#dialog").dialog('close');
                groups_search($('#offset').val());
                display_info('Update Success!')
            } else {
                display_error_message(result.msg);
            }
        });        
    }
}

function groups_delete(id){
    if(confirm('Sure?') ){
        $.get(url+'groups/delete/'+id,function(content){
            var result = eval('('+content+')');            
            if(result.success){                
                groups_search(0);
            } else {
                display_error_message(result.msg);
            }
        });
    }
}
