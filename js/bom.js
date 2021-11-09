/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function bom_view(){
    $('#messagelistcontainer').load(url+'bom');
}

function bom_print(id){
    window.open(url+'bom/prints/'+id, 'blank');
}

function bom_calculateplwdthick(){
    var plwdthick = $('#plwdthick').val();
    var qty = $('#qty').val();
    var rsw = $('#rsw').val();
    var rsl = $('#rsl').val();
    
    if((isNaN(qty)) || (isNaN(rsw)) || (isNaN(rsl)) || (isNaN(plwdthick))){        
        $('#plwdm2').val('');
    }else{
        var temp = (qty * rsw * rsl) / 1000000;
        $('#plwdm2').val(temp);
    }
}
