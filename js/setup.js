/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function setup_view(){
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url+'setup');
}

function setup_editpurchasinggroup(id){    
    $("#dialog").empty();
    $("#dialog").load(url+'setup/editpurchasinggroup/'+id);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: [300,50],
        title: 'Edit purchasing group',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function setup_updatepurchasinggroup(){
    var id = $('#id').val();
    var name = $('#name').val();    
    var arritemgroup = document.getElementsByName("itemgroup[]");    
    var itemgroup = [];
    
    for(var i=0;i<arritemgroup.length;i++){
        if(arritemgroup[i].checked){
            itemgroup.push(arritemgroup[i].value);
        }
    }
    
    $.post(url+'setup/updatepurchasinggroup',{
        id: id,
        name: name,
        itemgroup: itemgroup
    },function(){
        setup_view();
        $('#dialog').dialog('close');
    });
    
}