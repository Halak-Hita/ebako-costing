/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global url */

function materialreceive_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'materialreceive');
    my_y_position = 0;
}

function materialreceive_search(offset) {
    $("#materialreceive_data").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'materialreceive/search/' + offset,
            $('#materialreceive_search_form').serializeObject()
            , function (content) {
                $('#materialreceive_data').empty();
                $('#materialreceive_data').append(content);
                $('#bvan_tbl_mat_receive_xyz').scrollTop(my_y_position);
                //console.log(content);
            });
}
