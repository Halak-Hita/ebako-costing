/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function attachment_view(id, reference) {
    $("#dialog").load(url + 'attachment/view/' + id + '/' + reference);
    $("#dialog").dialog({
        modal: true,
        position: ['center', 50],
        width: 350,
        height: 300,
        title: 'Attachment',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function attachment_save(id, reference) {
    $.ajaxFileUpload({
        url: url + 'attachment/save',
        secureuri: false,
        fileElementId: 'fileupload',
        dataType: 'json',
        data: {
            'title': $('#title').val(),
            'id': id,
            'reference': reference

        },
        success: function(data, status) {
            if (data.status !== 'error') {
                $('#title').val('');
                $('#fileupload').val('');
                refresh_files(id, reference);
            }
        }
    });

}

function refresh_files(refid, ref) {
    $('#listattachment').load(url + 'attachment/getlist/' + refid + '/' + ref);
}

function attachment_delete(refid, id, reference, filename) {
    if (confirm("Are You Sure?")) {
        $.post(url + 'attachment/delete', {
            id: id,
            filename: filename
        }, function() {
            refresh_files(refid, reference);
        });
    }
}


