/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* global url */

function gr_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'gr')
}

function gr_viewdetail(grid) {

    if ($('#gr_dialog')) {
        $('#bodydata').append("<div id='gr_dialog'></div>");
    }

    $("#gr_dialog").load(url + 'gr/printdetail/' + grid + '/' + 4, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'GR DETAIL',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Print: function () {
                    $('#gr_s_td_action' + grid).attr('bgcolor', '#80dcaf');
                    //console.log($('#gr_s_td_action' + grid));
                    open_target('POST', url + 'gr/printdetail/' + grid + '/' + 3, {}, '_blank');

                },
                Close: function () {
                    $(this).dialog("close");
                }
            },
            create: function () {
                $(this).css("maxHeight", 500);
            }
        });
    });
}

function gr_getpoitem(poid) {

    if ($('#gr_dialog')) {
        $('#bodydata').append("<div id='gr_dialog'></div>");
    }

    $("#gr_dialog").load(url + 'gr/getpoitem/' + poid, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'RECEIVE ITEM',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    gr_receiveitem();
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            },
            create: function () {
                $(this).css("maxHeight", 500);
            }
        });
    });
}


function gr_getpoitembyvendor(vendorid) {

    if ($('#gr_dialog')) {
        $('#bodydata').append("<div id='gr_dialog'></div>");
    }

    $("#gr_dialog").load(url + 'gr/getpoitembyvendor/' + vendorid, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'RECEIVE ITEM',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    gr_receiveitem();
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            },
            create: function () {
                $(this).css("maxHeight", 500);
            }
        });
    });
}

function gr_receiveitem() {
    var rejectqty = document.getElementsByName("rjqty[]");
    var qty = document.getElementsByName("rqty[]");
    var poitemid = document.getElementsByName("poitemid[]");
    var note = document.getElementsByName("note[]");
    var ots = document.getElementsByName("ots[]");
    var qltid = document.getElementsByName("qltid[]");

    var poid = $('#poid').val();
    var letternumber = $('#letternumber').val();
    var receivedate = $('#receivedate').val();
    var receivedby = $('#receivedby').val();

    var poitemidarray = new Array();
    var qtyarray = new Array();
    var otsarray = new Array();
    var rejectqtyarray = new Array();
    var notearray = new Array();
    var qltidarray = new Array();

    var status = 0;
    var msg = "";

    for (var i = 0; i < poitemid.length; i++) {
        if (qty[i].value != 0 || rejectqty[i].value != 0) {
            poitemidarray[i] = poitemid[i].value;
            qtyarray[i] = parseFloat(qty[i].value);
            otsarray[i] = parseFloat(ots[i].value);
            rejectqtyarray[i] = rejectqty[i].value;
            notearray[i] = note[i].value;
            if (rejectqtyarray[i] != 0 && notearray[i] == '') {
                msg += '- Please write some notes why item reject!<br/>';
                status = 1;
                break;
            }
            if ((qtyarray[i] > otsarray[i]) && notearray[i] == '') {
                //alert(qtyarray[i]+'#'+otsarray[i]);
                msg += '- Please write some notes for receive Qty greater Than Outstanding!<br/>';
                status = 1;
                break;
            }
        }
    }

    for (i = 0; i < qltid.length; i++) {
        qltidarray[i] = qltid[i].value;
    }

    if (qtyarray.length == 0) {
        msg += '- Nohing to save!';
        status = 1;
    }
    if (letternumber != '') {
        if (status == 1) {
            display_error_message(msg);
        } else {
            $.post(url + 'gr/receiveitem', {
                poid: poid,
                poitemid: poitemidarray,
                qty: qtyarray,
                rejectqty: rejectqtyarray,
                letternumber: letternumber,
                receivedate: receivedate,
                receivedby: receivedby,
                note: notearray,
                qltid: qltidarray,
                do_date: $('#do_date').val(),
                vendorid: $('#gr_vendor_id_ix8').val()
            }, function (content) {
                console.log(content);
                var result = eval('(' + content + ')');
                if (result.success) {
                    $("#gr_dialog").dialog('close');
                    gr_view();
                } else {
                    display_error_message(result.msg);
                }
            });
        }
    } else {
        display_error_message("Field 'Delovery Order No.' Required");
    }
}

function gr_edit(id) {

    if ($('#gr_dialog')) {
        $('#bodydata').append("<div id='gr_dialog'></div>");
    }

    $("#gr_dialog").load(url + 'gr/edit/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'EDIT GOODS RECEIVE',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    gr_update();
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            },
            create: function () {
                $(this).css("maxHeight", 500);
            }
        });
    });

}

function gr_deleteitem(el, id, grid) {
    if (confirm('Sure?')) {
        $.get(url + 'gr/deleteitem/' + id, function () {
            gr_edit(grid);
        });
    }
}

function gr_delete(id) {

    if ($('#gr_dialog')) {
        $('#bodydata').append("<div id='gr_dialog'></div>");
    }

    $("#gr_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: {my: "center", at: "center", of: window},
        title: 'Delete Confirmation',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Delete: function () {
                $.get(url + 'gr/delete/' + id, function () {
                    gr_view();
                    $("#gr_dialog").dialog('close');
                });
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        create: function () {
            $(this).css("maxHeight", 500);
            $(this).css("maxWidth", '100%');
        }
    }).html('<p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>\n\
                These items will be permanently deleted and cannot be recovered<br/> \n\
                <br/><br/>Are you sure?</p>');
}

function gr_update() {
    var rjqty = document.getElementsByName("rjqty[]");
    var qty = document.getElementsByName("rqty[]");
    var gritemid = document.getElementsByName("gritemid[]");
    var id = $('#id').val();
    var poid = $('#poid').val();
    var letternumber = $('#letternumber').val();
    var receivedate = $('#receivedate').val();
    var receivedby = $('#receivedby').val();
    var note = document.getElementsByName("note[]");

    var gritemidarray = new Array();
    var qtyarray = new Array();
    var rejectqtyarray = new Array();
    var notearray = new Array();

    for (var i = 0; i < gritemid.length; i++) {
        gritemidarray[i] = gritemid[i].value;
        qtyarray[i] = qty[i].value;
        rejectqtyarray[i] = rjqty[i].value;
        notearray[i] = note[i].value;
    }

    $.post(url + 'gr/update', {
        id: id,
        poid: poid,
        gritemid: gritemidarray,
        qty: qtyarray,
        rejectqty: rejectqtyarray,
        letternumber: letternumber,
        receivedate: receivedate,
        receivedby: receivedby,
        note: notearray
    }, function (content) {
        console.log(content);
        var result = eval('(' + content + ')');
        if (result.success) {
            $("#gr_dialog").dialog('close');
            gr_view();
        } else {
            display_error_message(result.msg);
        }
//        $('#gr_dialog').dialog('close');
//        gr_view();
    });
}

function gr_search(offset) {
    $("#grdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'gr/search/' + offset, $('#gr_form_search').serializeObject(), function (content) {
        $('#grdata').empty();
        $('#grdata').append(content);
    }).done(function () {
        var str = $('#gr_form_search input[name="item_code_description"]').val();
//        alert(str);
        if (str !== '') {
            $("#grdata table.child").find(":contains('" + str + "')").each(function () {
                $(this).css("background-color", "#ecb4bb");
            });
        }
    });
}

function gr_print() {
    open_target('POST', url + 'gr/prints', $('#po_pending_receive_search_form').serializeObject(), '_blank');
}

function gr_isvalid(el, id) {
    if ($(el).val() === '' || parseFloat($(el).val()) < 0 || isNaN($(el).val())) {
        display_error_message('Required NUMBER not Allow Negative Number');
        $(el).val(0);
    } else {
        var qtyin = parseFloat($(el).val());
        var qtlyin = parseFloat($('#qltyqty' + id).val());

        if ((qtyin !== qtlyin) && qtyin !== 0) {
            display_error_message('Qty Sould be same with qty from quality');
            $(el).val(0);
        }
//
//        var ots = parseFloat($('#rcv_qty_ots' + id).val());
//        if (ots < qtyin) {
//            display_error_message('Out of outstanding qty');
//            $(el).val(0);
//        }
    }
}

function gr_report_form() {
    if ($('#gr_dialog')) {
        $('#bodydata').append("<div id='gr_dialog'></div>");
    }

    $("#gr_dialog").load(url + 'gr/report_form', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            maxHeight: 500,
            position: {my: "center", at: "center", of: window},
            title: 'GOODS RECEIVE REPORT DIALOG',
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Close: function () {
                    $(this).dialog("close");
                }
            }
        });
    });
}

function gr_print_receipt() {
    if ($('#gr_dialog')) {
        $('#bodydata').append("<div id='gr_dialog'></div>");
    }

    $("#gr_dialog").load(url + 'gr/print_receipt', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            maxHeight: 500,
            position: {my: "center", at: "center", of: window},
            title: 'PRINT RECEIPT',
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Print: function () {
                    if ($("#gr_print_receipt_form").valid()) {
                        open_target('POST', url + 'gr/do_print_receipt', $('#gr_print_receipt_form').serializeObject(), '_blank');
                    }
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    });
}

function gr_rpt_gennerate(st) {
    if (st === 1) {
        $("#gr_rpt_temp_preview").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
        $.post(url + 'gr/rpt_generate/' + st, $('#gr_rpt_form').serializeObject(), function (content) {
            $('#gr_rpt_temp_preview').empty();
            $('#gr_rpt_temp_preview').append(content);
        });
    } else {
        open_target('post', url + 'gr/rpt_generate/' + st, $('#gr_rpt_form').serializeObject(), '_blank');
    }
}

function gr_search_pending_receive() {
    $("#po_pending_receive").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'gr/search_pending_receive', $('#po_pending_receive_search_form').serializeObject(), function (content) {
        $('#po_pending_receive').empty();
        $('#po_pending_receive').append(content);
    }).done(function () {
        var str = $('#po_pending_receive_search_form input[name="item_code_description"]').val();
//        alert(str);
        if (str !== '') {
            $("#po_pending_receive table.child").find(":contains('" + str + "')").each(function () {
                $(this).css("background-color", "#ecb4bb");
            });
        }

        var str_po = $('#po_pending_receive_search_form input[name="po_no"]').val();
        if (str_po !== '') {
            $("#po_pending_receive table.child").find(":contains('" + str_po + "')").each(function () {
                $(this).css("background-color", "red");
            });
        }
    });
}

function gr_search_pending_inspection() {
    $("#gr_item_pending_inspection").html("<center><img style='padding-top:5px;' src='images/loading1.gif'/></center>");
    $.post(url + 'gr/search_pending_inspection', $('#gr_item_pending_inspection_form').serializeObject(), function (content) {
        $('#gr_item_pending_inspection').empty();
        $('#gr_item_pending_inspection').append(content);
    });
}