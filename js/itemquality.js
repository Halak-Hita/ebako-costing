/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* global url */

function itemquality_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'itemquality');
}

function itemquality_set(id) {

    if ($('#itemquality_dialog')) {
        $('#bodydata').append("<div id='itemquality_dialog'></div>");
    }

    $("#itemquality_dialog").load(url + 'itemquality/set/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            position: {my: "center", at: "center", of: window},
            title: 'Inspection',
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    itemquality_doset();
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            },
            create: function () {
                $(this).css("maxHeight", 500);
                $(this).css("maxWidth", '100%');
            }
        });
    });
}

function itemquality_doset() {
    var poitemid = $('#poitemid').val();
    var itemid = $('#itemid').val();
    var qty = parseFloat($('#qty').val());
    var date = $('#date').val();
    var msg = "";
    if (qty == 0) {
        msg += "- Field 'Stock in ' Required <br/>";
    }
    if (date == '') {
        msg += "- Field 'Date' Required<br/>";
    }
    if (msg != "") {
        display_error_message(msg);
    } else {
        $.post(url + 'itemquality/doset', {
            poitemid: poitemid,
            itemid: itemid,
            qty: qty,
            date: date
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                $("#itemquality_dialog").dialog('close');
                itemquality_search(0);
                gr_search_pending_inspection();
            } else {
                display_error_message(result.msg);
            }
        });
    }
}

function itemquality_search(offset) {
    var ponumber = $('#ponumber').val();
    var date_from = $('#date_from').val();
    var date_to = $('#date_to').val();
    var code = $('#code_s').val();
    var description = $('#description_s').val();
    $("#inspectiondata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'itemquality/search/' + offset, {
        ponumber: ponumber,
        datefrom: date_from,
        dateto: date_to,
        code: code,
        description: description
    }, function (content) {
        $('#inspectiondata').empty();
        $('#inspectiondata').append(content);
    });

}

function itemquality_delete(id) {
    if (confirm('Sure ?')) {

        $.get(url + 'itemquality/delete/' + id, function (content) {
            if (content == '1') {
                display_error_message("Delete Canceled! <br>Already Record by Warehouse");
            }
            itemquality_search(0);
        });
    }
}