/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function warehouse_view(){
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url+'warehouse');
}