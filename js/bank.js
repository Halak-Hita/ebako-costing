/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function bank_view(){
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url+'bank');
}

function bank_add(){
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url+'bank/add');
}

function bank_save(){
    $.post(url+'bank/save',{
        code: $('#code').val(),
        name: $('#name').val(),
        branch: $('#branch').val(),
        city: $('#city').val(),
        country: $('#country').val(),
        kliring: $('#kliring').val(),
        rtgs: $('#rtgs').val(),
        swift: $('#swift').val()
    },function(){
        bank_view()
    });
}

function bank_delete(id){
    if(confirm('Sure ?')){
        $.post(url+'bank/delete',{
            id: id
        },function(content){
            var result = eval('('+content+')');            
            if(result.success){                
                bank_view();
            } else {
                display_error_message(result.msg);
            }
        });
    }
}