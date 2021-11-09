/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function comment_view(idreference, reference) {
    $.post(url + 'comment', {
        referenceid: idreference,
        reference: reference
    }, function (content) {
        $("#dialog").empty();
        $("#dialog").append(content);
        $("#dialog").dialog({
            modal: true,
            width: 350,
            height: 300,
            title: 'View Comment',
            position: ['center', 50],
            overlay: {
                opacity: 0.7,
                background: "black"
            }
        });
        $("#commentlist").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
        $("#commentlist").load(url + 'comment/commentlist/' + idreference + '/' + reference);
    });
}
function comment_post() {
    var comment = $('#comment').val();
    var referenceid = $('#referenceid').val();
    var reference = $('#reference').val();
    if (comment == '') {
        display_error_message('- Please Type Comment');
    } else {
        $.post(url + 'comment/post', {
            comment: comment,
            referenceid: referenceid,
            reference: reference
        }, function (content) {
            $('#comment').val('');
            $('#commentlist').empty();
            $('#commentlist').append(content);
            if (reference === 'PR') {
                pr_search($('#offset').val());
            } else if (reference === 'MR') {
               materialrequisition_search($('#offset').val());
            }
        });
    }
}