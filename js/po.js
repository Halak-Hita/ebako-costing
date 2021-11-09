/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* global url */

function po_create(prid) {
    if (confirm('Create PO\nSure?')) {

        if ($('#po_dialog')) {
            $('#bodydata').append("<div id='po_dialog'></div>");
        }
        $("#po_dialog").load(url + 'po/create/' + prid, function () {
            $(this).dialog({
                modal: true,
                width: 'auto',
                height: 'auto',
                title: 'CREATE P.O',
                position: {my: "center", at: "center", of: window},
                overlay: {
                    opacity: 0.7,
                    background: "black"
                }, buttons: {
                    Save: function () {
                        po_savenew();
                    }
                },
                create: function () {
                    $(this).css("maxHeight", 500);
                    $(this).css("maxWidth", '100%');
                }
            });
        });
        pr_search(0);
    }
}

function po_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'po');
    my_y_position = 0;
}

function po_savenew() {
    var payterm = document.getElementsByName("payterm[]");
    var deliverterm = document.getElementsByName("deliverterm[]");
    var sumof = document.getElementsByName("sumof[]");
    var id = document.getElementsByName("id[]");

    var payterm_arr = new Array();
    var id_arr = new Array();
    var deliverterm_arr = new Array();
    var sumof_arr = new Array();

    for (var i = 0; i < payterm.length; i++) {
        payterm_arr[i] = payterm[i].value;
        deliverterm_arr[i] = deliverterm[i].value;
        sumof_arr[i] = sumof[i].value;
        id_arr[i] = id[i].value;
    }

    $.ajax({
        type: "post",
        url: url + 'po/savenew',
        data: {
            id: id_arr,
            payterm: payterm_arr,
            deliverterm: deliverterm_arr,
            sumof: sumof_arr
        },
        success: function (data, text) {
            $("#po_dialog").dialog('close');
            po_view();
            //...
            //pr_view();
        },
        error: function (request, status, error) {
            alert(request.responseText.toString());
        }
    });
}

function po_edit(id) {

    if ($('#po_dialog')) {
        $('#bodydata').append("<div id='po_dialog'></div>");
    }

    $("#po_dialog").load(url + 'po/edit/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'Edit Purchase Order',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Update: function () {
                    po_update();
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

function po_update() {
    $.post(url + 'po/update', $('#po_edit_form').serializeObject(), function (content) {
        var result = eval('(' + content + ')');
        if (result.success) {
            $('#po_dialog').dialog('close');
            po_search($('#offset').val());
        } else {
            display_error_message(result.msg);
        }

    });
}

function po_changestatus(poid, el) {
    var status = $(el).val();

    if (status == 2) {
        $.get(url + 'po/changestatus/' + poid + '/' + status, function (content) {
            $("#dialog").empty();
            $("#dialog").append(content);
            $("#dialog").dialog({
                modal: true,
                width: 'auto',
                height: 'auto',
                title: 'Notes',
                position: ['center', 50],
                overlay: {
                    opacity: 0.7,
                    background: "black"
                }
            });
        });
    } else if (status == 1) {
        display_error_message('You can not manualy finish PO<br/>PO will be finish automatically after all item received');
        po_search($('#offset').val())
    }
}

function po_savepostatus() {
    var poid = $('#poid').val();
    var status = $('#status_c').val();
    var notes = $('#notes').val();
    $.post(url + 'po/savepostatus', {
        poid: poid,
        status: status,
        notes: notes
    }, function () {
        $("#dialog").dialog('close');
        po_search($('#offset').val())
    });
}

function po_viewstatus(poid) {
    $.get(url + 'po/viewstatus/' + poid, function (content) {
        $("#dialog").empty();
        $("#dialog").append(content);
        $("#dialog").dialog({
            modal: true,
            width: 500,
            height: 300,
            title: 'Notes',
            position: 'center',
            overlay: {
                opacity: 0.7,
                background: "black"
            }
        });
    });
}

function po_configure_close_approval() {
    $("#dialog2").load(url + 'po/configureCloseApproval');
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: ['center', 50],
        title: 'Configure Close Approval PO',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function po_saveconfigpoapproval() {
    var approval = document.getElementsByName('idapproval[]');
    var arrapproval = new Array();
    for (var i = 0; i < approval.length; i++) {
        arrapproval[i] = approval[i].value;
    }
    $.post(url + 'po/saveconfigpoapproval', {
        approval: arrapproval
    }, function () {
        $("#dialog2").dialog('close');
    });
}

function po_approveclose(poid, status, level) {
    var approvallevel2 = $('#approvallevel2' + poid).val();
    if (confirm('Sure?')) {
        $.post(url + 'po/approveclose', {
            poid: poid,
            status: status,
            level: level,
            approvallevel2: approvallevel2
        }, function () {
            po_search($('#offset').val())
        });
    }
}

function po_viewreceiveitem(id) {
    if ($('#po_dialog')) {
        $('#bodydata').append("<div id='po_dialog'></div>");
    }
    $("#po_dialog").load(url + 'po/viewreceiveitem/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'DETAIL RECEIVE',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Close: function () {
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

function po_search(offset) {
    var ponumber = $('#ponumber').val();
    var prnumber = $('#prnumber').val();
    var date_start = $('#date_start').val();
    var date_end = $('#date_end').val();
    var departmentid = $('#departmentid').val();
    var vendorid = $('#vendorid').val();
    var status = $('#status').val();
    $("#podata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
//    $.post(url + 'po/search/' + offset, {
//        ponumber: ponumber,
//        prnumber: prnumber,
//        date_start: date_start,
//        date_end: date_end,
//        departmentid: departmentid,
//        vendorid: vendorid,
//        status: status
//    }, function (content) {
//        //alert(my_y_position);
//        $('#podata').empty();
//        $('#podata').append(content);
//        $('#bvan_tbl_s_po_qzx').scrollTop(my_y_position);
//    }).done(function () {
//        var str = $('#mat_req_search_form input[name="item_code_description"]').val();
////        alert(str);
//        if (str !== '') {
//            $("table.child").find(":contains('" + str + "')").each(function () {
//                $(this).css("background-color", "#ecb4bb");
//            });
//        }
//        $('#bvan_tbl_s_mat_req_qzx').scrollTop(my_y_position);
//    });

    $.post(url + 'po/search/' + offset, $('#po_search_form').serializeObject(), function (content) {
        //alert(my_y_position);
        $('#podata').empty();
        $('#podata').append(content);
    }).done(function () {
        var str = $('#po_search_form input[name="item_code_description"]').val();
//        alert(str);
        if (str !== '') {
            $("table.child").find(":contains('" + str + "')").each(function () {
                $(this).css("background-color", "#ecb4bb");
            });
        }
        $('#bvan_tbl_s_po_qzx').scrollTop(my_y_position);
    });

}

function po_calculate_grad_total() {
    var total_amount = parseFloat($('#total_amount').val());
    var tracking_cost = parseFloat(isNumeric($('#tracking_cost').val()) ? $('#tracking_cost').val() : 0);
    var ppn = parseFloat(isNumeric($('#ppn').val()) ? $('#ppn').val() : 0);
    var pph = parseFloat(isNumeric($('#pph').val()) ? $('#pph').val() : 0);
    var insurance = parseFloat(isNumeric($('#insurance').val()) ? $('#insurance').val() : 0);
    var id_system = parseFloat(isNumeric($('#id_system').val()) ? $('#id_system').val() : 0);
    var pnbm = parseFloat(isNumeric($('#pnbm').val()) ? $('#pnbm').val() : 0);
    var physical_check = parseFloat(isNumeric($('#physical_check').val()) ? $('#physical_check').val() : 0);
    var clearance = parseFloat(isNumeric($('#clearance').val()) ? $('#clearance').val() : 0);
    var discount = parseFloat(isNumeric($('#discount').val()) ? $('#discount').val() : 0);
    var all_total_price = (total_amount + tracking_cost + ppn + pph + insurance + id_system + pnbm + physical_check + clearance) - discount;
    $('#all_total_price').val(all_total_price);
    var grand_total = (total_amount - discount);
    $('#grand_total').val(grand_total);
}

function po_set_as_costing_price(itemid) {
    var qty = parseFloat($('#qty' + itemid).val());
    var amount = parseFloat($('#amount' + itemid).val());
    var qty_total = parseFloat($('#qty_total').val());
    var curr = $('#curr').val();
    var tracking_cost = parseFloat(isNumeric($('#tracking_cost').val()) ? $('#tracking_cost').val() : 0);
    var ppn = parseFloat(isNumeric($('#ppn').val()) ? $('#ppn').val() : 0);
    var pph = parseFloat(isNumeric($('#pph').val()) ? $('#pph').val() : 0);
    var insurance = parseFloat(isNumeric($('#insurance').val()) ? $('#insurance').val() : 0);
    var id_system = parseFloat(isNumeric($('#id_system').val()) ? $('#id_system').val() : 0);
    var physical_check = parseFloat(isNumeric($('#physical_check').val()) ? $('#physical_check').val() : 0);
    var clearance = parseFloat(isNumeric($('#clearance').val()) ? $('#clearance').val() : 0);
    var discount = parseFloat(isNumeric($('#discount').val()) ? $('#discount').val() : 0);

    var price_item = amount / qty;
    var landed = ((tracking_cost + ppn + pph + insurance + id_system + physical_check + clearance) - discount) / qty_total;
    var costing_price = (landed + price_item).toFixed(2);

    if (confirm('Costing Price =' + costing_price + '. Are you sure? ')) {
        $.post(url + 'item/do_set_costing_price_from_po', {
            itemid: itemid,
            curr: curr,
            costing_price: costing_price
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                display_info('Update Costing Price Success..!');
            } else {
                display_error_message(result.msg);
            }
        });
    }
}

function po_view_detail(poid) {
    $("#dialog").load(url + 'po/view_detail/' + poid + '/' + 0);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 600,
        position: [200, 10],
        title: 'PO Detail',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function po_view_detail_new(poid) {
    if ($('#po_dialog')) {
        $('#bodydata').append("<div id='po_dialog'></div>");
    }
    $("#po_dialog").load(url + 'po/printpo/' + poid + '/' + 0, function () {
        $("#po_dialog").dialog({
            modal: true,
            width: 'auto',
            height: 600,
            position: [200, 10],
            title: 'PO DETAIL',
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Print: function () {
                    open_target('POST', url + 'po/printpo/' + poid + '/' + 3, {}, '_blank');
                    $('#po_s_td_action' + poid).attr('bgcolor', '#80dcaf')
                },
                Close: function () {
                    $(this).dialog("close");
                }
            }
        });
    });

}

function po_report() {
    if ($('#po_dialog')) {
        $('#bodydata').append("<div id='po_dialog'></div>");
    }
    $("#po_dialog").load(url + 'po/report_form', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'PURCHASE ORDER REPORT DIALOG',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Close: function () {
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


function po_rpt_generate(st) {
    if ($('#po_rpt_date_start').val() === '' && $('#po_rpt_date_end').val() === '') {
        alert('Please Input Date');
    } else {
        if (st === 1) {
            $("#po_rpt_temp_preview").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
            $.post(url + 'po/rpt_generate/' + st, $('#po_rpt_form').serializeObject(), function (content) {
                $('#po_rpt_temp_preview').empty();
                $('#po_rpt_temp_preview').append(content);
            });
        } else {
            open_target('post', url + 'po/rpt_generate/' + st, $('#po_rpt_form').serializeObject(), '_blank');
        }
    }
}

function po_critical_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'po/critical');
    my_y_position = 0;
}

function po_critical_search(offset) {
    $("#po_critical_data").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'po/critical_search/' + offset,
            $('#po_critical_search_form').serializeObject()
            , function (content) {
                $('#po_critical_data').empty();
                $('#po_critical_data').append(content);
                $('#bvan_tbl_po_critical').scrollTop(my_y_position);
                //console.log(content);
            });
}

function po_critical_print() {
    open_target('post', url + 'po/critical_print/0', $('#po_critical_search_form').serializeObject(), '_blank');
}

function po_critical_excel() {
    open_target('post', url + 'po/critical_print/1', $('#po_critical_search_form').serializeObject(), '_blank');
}
