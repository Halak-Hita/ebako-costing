/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function outstandingtostockout_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'outstandingtostockout')
    my_y_position = 0;
}

function outstandingtostockout_search(offset) {
    $("#outstandingtostockoutdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'outstandingtostockout/search/' + offset,
            $('#outstandingtostockoutdata_search_form').serializeObject()
            , function (content) {
                $('#outstandingtostockoutdata').empty();
                $('#outstandingtostockoutdata').append(content);
                $('#outstandingtostockoutdata').scrollTop(my_y_position);
                //console.log(content);
            });
}

function outstandingtostockout_print_list(offset) {
    open_target('post',
            url + 'outstandingtostockout/print_list',
            $('#outstandingtostockoutdata_search_form').serializeObject(),
            '_blank'
            );
} 