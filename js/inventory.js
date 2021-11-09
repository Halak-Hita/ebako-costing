/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function inventory_view(){
    $('#messagelistcontainer').load(url+'inventory');
}

function inventory_change(){
    var type = $('#type').val();
    if(type == 1){
        $('#btnaddmaterial').show();        
    }else{
        $('#btnaddmaterial').hide();
    }
    $.post(url+'inventory/searchoption',{
        type: type
    },function(content){
        $('#inventorydata').empty()
        $('#inventorydata').append(content);
    });
}
