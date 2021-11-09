/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function wood_view(){
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url+'wood');
}

function wood_search(offset){
    var name = $('#name').val();
    $.post(url+'wood/search/'+offset,{
        name: name
    },function(content){
        $('#wooddata').empty();
        $('#wooddata').append(content);
    });
}

function wood_print(){
    var name = $('#name').val();
    $.post(url+'wood/prints',{
        name: name
    },function(content){
        var myWindow = window.open(url+'wood/print','blank');
        myWindow.document.write(content);
        myWindow.document.close();
    });
}

function wood_add(){
    $('#messagelistcontainer').load(url+'wood/add');
}

function wood_save(){
    $.post(url+'wood/insert',{
        name: $('#name').val()
    },function(){
        wood_view();
    });
}

function wood_edit(id){
    $('#messagelistcontainer').load(url+'wood/edit/'+id);
}

function wood_update(){
    $.post(url+'wood/update',{
        id: $('#id').val(),
        name: $('#name').val()
    },function(){
        wood_view();
    });
}

function wood_delete(id){
    if(confirm("Sure?")){
        $.get(url+'wood/delete/'+id,function(){
            wood_view();
        });
    }
}