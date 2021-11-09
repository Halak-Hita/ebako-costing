/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* global url */

function pr_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'pr')
}

function pr_search(offset) {
//    var requestnumber = $('#requestnumber_s').val();
//    var requestdatestart = $('#requestdatestart').val();
//    var requestdateend = $('#requestdateend').val();
//    var departmentid = $('#departmentid_s').val();
//    var capex = $('#capex').val();
//    var mr_no = $('#pr_mr_no_s').val();
//    var state = $('#state_s').val();
//    $("#prdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
//    $.post(url + 'pr/search/' + offset, {
//        requestnumber: requestnumber,
//        requestdatestart: requestdatestart,
//        requestdateend: requestdateend,
//        departmentid: departmentid,
//        capex: capex,
//        mr_no: mr_no,
//        state: state
//    }, function (content) {
//        $('#prdata').empty();
//        $('#prdata').append(content);
//        $('#bvan_tbl_s_pr_qzx').scrollTop(my_y_position);
//    });
    $("#prdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'pr/search/' + offset, $('#pr_search_form').serializeObject(), function (content) {
        //alert(my_y_position);
        $('#prdata').empty();
        $('#prdata').append(content);
    }).done(function () {
        var str = $('#pr_search_form input[name="item_code_description"]').val();
//        alert(str);
        if (str !== '') {
            $("table.child").find(":contains('" + str + "')").each(function () {
                $(this).css("background-color", "#ecb4bb");
            });
        }
        $('#bvan_tbl_s_pr_qzx').scrollTop(my_y_position);
    });

}

function pr_create() {
    $('#dialog_temp').dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'New Purchase Request',
        position: [100, 50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    }).load(url + 'pr/create');
}

var counter = 0;
var counter2 = 0;
function pr_additem() {
    counter++;
    //alert(counter);
    $.get(url + 'pr/additem/' + counter, function (content) {
        $('#prtablebody').append(content);
    });
}

function pr_additem2() {
    counter--;
    //alert(counter);
    $.get(url + 'pr/additem/' + counter, function (content) {
        $('#prtablebody').append(content);
    });
}

function pr_deleteitem(el) {
    //counter--;
    $(el).parent().parent().remove();
}

function pr_deleteitem2(el, id) {
    //counter--;
    if (confirm('Sure?')) {
        $.get(url + 'pr/deleteitem/' + id, function () {
            $(el).parent().parent().remove();
        });
    }

}

function pr_save() {
    var requestnumber = $('#requestnumber').val();
    var requestdate = $('#requestdate').val();
    var departmentid = $('#departmentid').val();
    var enduser = $('#enduser').val();
    var remark = $('#remark').val();
    var sonumber = $('#sonumber').val();
    var mrnumber = $('#mrnumber').val();
    var itemid = document.getElementsByName("itemid[]");
    var itempartnumber = document.getElementsByName("partnumber[]");
    var itemdescription = document.getElementsByName("desciption[]");
    var idunit = document.getElementsByName("unit[]");
    var qty = document.getElementsByName("qty[]");
    var itemarray = new Array();
    var idunitarray = new Array();
    var itempartnumberarray = new Array();
    var itemdescriptionarray = new Array();
    var qtyarray = new Array();
    var st = 0;
    var msg = "";
    if (departmentid == 0) {
        st = 1;
        msg += "- Field 'DEPT. (REQUEST BY)' Required<br/>";
    }
    if (enduser == 0) {
        st = 1;
        msg += "- Field 'END USER' Required<br/>";
    }

    for (var i = 0; i < itemid.length; i++) {
        itemarray[i] = itemid[i].value;
        idunitarray[i] = idunit[i].value;
        qtyarray[i] = qty[i].value;
        itempartnumberarray[i] = itempartnumber[i].value;
        itemdescriptionarray[i] = itemdescription[i].value;
        if (idunit[i].value == 0) {
            st = 1;
            msg += "- Field 'UNIT' Required for item " + (i + 1) + "<br/>";
        }
    }

    if (msg != '') {
        display_error_message(msg);
    } else {
        $.ajax({
            type: "post",
            url: url + 'pr/insert',
            data: {
                requestnumber: requestnumber,
                requestdate: requestdate,
                departmentid: departmentid,
                enduser: enduser,
                remark: remark,
                item: itemarray,
                itempartnumber: itempartnumberarray,
                qty: qtyarray,
                itemdescription: itemdescriptionarray,
                idunit: idunitarray,
                sonumber: sonumber,
                mrnumber: mrnumber
            },
            success: function (data, text) {
                //...
                pr_view();
                $('#dialog_temp').dialog('close');
            },
            error: function (request, status, error) {
                alert(request.responseText.toString());
            }
        });
    }
}


function pr_edit(prid) {
    if ($('#pr_dialog')) {
        $('#bodydata').append("<div id='pr_dialog'></div>");
    }
    $("#pr_dialog").load(url + 'pr/edit/' + prid, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'EDIT PR',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    pr_update();
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

function pr_update() {
    var prid = $('#id').val();
    var requestnumber = $('#requestnumber').val();
    var requestdate = $('#requestdate').val();
    var departmentid = $('#departmentid').val();
    var enduser = $('#enduser').val();
    var remark = $('#remark').val();
    var sonumber = $('#sonumber').val();
    var mrnumber = $('#mrnumber').val();
    var pritemid = document.getElementsByName("pritemid[]");
    var itemid = document.getElementsByName("itemid[]");
    var itempartnumber = document.getElementsByName("partnumber[]");
    var itemdescription = document.getElementsByName("desciption[]");
    var unitid = document.getElementsByName("unit[]");
    var qty = document.getElementsByName("qty[]");
    var pritemidarray = new Array();
    var itemarray = new Array();
    var idunitarray = new Array();
    var itempartnumberarray = new Array();
    var itemdescriptionarray = new Array();
    var qtyarray = new Array();
    var st = 0;

    var msg = "Error!";
    if (departmentid === 0) {
        st = 1;
        msg += "- Field 'DEPT. (REQUEST BY)' Required<br/>";
    }

    if (enduser === 0) {
        st = 1;
        msg += "- Field 'END USER' Required<br/>";
    }

    console.log(unitid);
    for (var i = 0; i < itemid.length; i++) {
        itemarray[i] = itemid[i].value;
        idunitarray[i] = unitid[i].value;
        qtyarray[i] = qty[i].value;
        itempartnumberarray[i] = itempartnumber[i].value;
        itemdescriptionarray[i] = itemdescription[i].value;
        pritemidarray[i] = pritemid[i].value;
        if (unitid[i].value === 0) {
            st = 1;
            msg += "- Field 'UNIT' Required for item " + (i + 1) + "<br/>";
        }
    }

    if (st === 1) {
        display_error_message(msg);
    } else {

        $.post(url + 'pr/update', {
            id: prid,
            requestnumber: requestnumber,
            requestdate: requestdate,
            departmentid: departmentid,
            enduser: enduser,
            remark: remark,
            item: itemarray,
            itempartnumber: itempartnumberarray,
            qty: qtyarray,
            itemdescription: itemdescriptionarray,
            idunit: idunitarray,
            pritemid: pritemidarray,
            sonumber: sonumber,
            mrnumber: mrnumber
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                $('#pr_dialog').dialog('close');
                pr_search($('#offset').val());
            } else {
                display_error_message(result.msg);
            }
        });
    }
}

function pr_delete(id) {
    if ($('#pr_dialog')) {
        $('#bodydata').append("<div id='pr_dialog'></div>");
    }

    $("#pr_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: {my: "center", at: "center", of: window},
        title: 'DELETE P.R',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Delete: function () {
                $.post(url + 'pr/delete/' + id, {}, function (content) {
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $("#pr_dialog").dialog('close');
                        $('#pr_dialog').empty();
                        pr_search($('#offset').val());
                    } else {
                        display_error_message(result.msg);
                    }
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
                These items will be permanently deleted and cannot be recovered<br/> \
                <br/><br/>Are you sure?</p>');
}

function pr_cancel() {
    pr_view();
}

function pr_selectApproval(r_id) {

    $("#dialog").load(url + 'pr/selectApproval/' + r_id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'Select Approval',
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

function pr_searchEmployee(rid) {
    $.post(url + 'pr/searchEmployee/' + rid, {
        employeeid: $('#employeeid_s').val(),
        employeename: $('#employeename_s').val()
    }, function (content) {
        $('#bodyprsearchemployee').empty();
        $('#bodyprsearchemployee').append(content);
    });
}

function pr_selectEmployee(from, to) {
    $('#id' + to).val($('#id' + from).val());
    $('#name-apprvove' + to).val($('#name' + from).val());
    $('#dialog').dialog('close');
}


function pr_clearApproval(id) {
    $('#id' + id).val('');
    $('#name-apprvove' + id).val('');
}

function pr_preview(prid, st) {

    if ($('#pr_dialog2')) {
        $('#bodydata').append("<div id='pr_dialog2'></div>");
    }

    $("#pr_dialog2").load(url + 'pr/preview/' + prid + '/' + st, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            maxHeight: 500,
            title: 'Preview PR',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Print: function () {
                    open_target('POST', url + 'pr/preview/' + prid + '/1', {}, '_blank');
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


function pr_changestate(prid) {
    $.get(url + 'pr/changestate/' + $('#state' + prid).val() + '/' + prid, function () {
        pr_view();
    });
}

function pr_approve(prid, approvalid, status, flag) {
    if (status == 1) {
        if (confirm('Sure?')) {

            $.post(url + 'pr/approvepr', {
                prid: prid,
                approvalid: approvalid,
                status: status
            }, function () {
                if (flag == 1) {
                    pr_search($('#offset').val());
                } else {
                    document.location.reload();
                }
            });
        }
    } else {
        $("#dialog2").empty();
        $("#dialog2").load(url + 'pr/rejectOrPending/' + prid + '/' + approvalid + '/' + status + '/' + flag);
        var dialogtitle = (status === 2) ? 'PENDING PR' : 'REJECT PR';
        $("#dialog2").dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            position: ['center', 50],
            title: dialogtitle,
            overlay: {
                opacity: 0.7,
                background: "black"
            }
        });
    }
}

function pr_do_reject_or_pending() {
    var prid = $('#prid').val();
    var approvalid = $('#approvalid').val();
    var status = $('#status').val();
    var flag = $('#flag').val();
    var notes = $('#notes').val();
    $.post(url + 'pr/do_reject_or_pending', {
        prid: prid,
        approvalid: approvalid,
        status: status,
        notes: notes
    }, function () {
        if (flag == 1) {
            pr_search($('#offset').val());
        } else {
            document.location.reload();
        }
        $("#dialog2").dialog('close');
    });
}

function pr_view_notes(approvalid) {
    $("#dialog2").load(url + 'pr/viewNotes/' + approvalid);
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: ['center', 100],
        title: 'Notes',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function pr_setprapproval(id) {
    if ($('#pr_setprapproval_dialog')) {
        $('#bodydata').append("<div id='pr_setprapproval_dialog'></div>");
    }

    $("#pr_setprapproval_dialog").load(url + 'pr/setprapproval/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'SET APPROVAL',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    var idapprovalarray = new Array();
                    $('#pr_set_approval_form input[name="idapproval[]"]').each(function () {
                        idapprovalarray.push($(this).val());
                    });
                    console.log(idapprovalarray);
                    $.post(url + 'pr/saveapproval', {
                        id: id,
                        idapprovalarray: idapprovalarray
                    }, function (content) {
                        var result = eval('(' + content + ')');
                        if (result.success) {
                            $("#pr_setprapproval_dialog").dialog('close');
                            pr_search($('#offset').val());
                        } else {
                            display_error_message(result.msg);
                        }
                    });
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    });
}

function pr_editprapproval(id) {

    if ($('#pr_dialog')) {
        $('#bodydata').append("<div id='pr_dialog'></div>");
    }
    $("#pr_dialog").load(url + 'pr/editapproval/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'EDIT APPROVAL',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
//                    alert('test');
                    if ($("#pr_edit_approval_form").valid()) {
                        var idapprovalarray = new Array();
                        var idarray = new Array();

                        $('#pr_edit_approval_form input[name="id[]"]').each(function () {
                            idarray.push($(this).val());
                        });

                        $('#pr_edit_approval_form input[name="idapproval[]"]').each(function () {
                            idapprovalarray.push($(this).val());
                        });

                        console.log(idarray);
                        console.log(idapprovalarray);

                        $.post(url + 'pr/updateapproval', {
                            prid: id,
                            idarray: idarray,
                            idapprovalarray: idapprovalarray
                        }, function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#pr_dialog").dialog('close');
                                pr_search($('#offset').val());
                            } else {
                                display_error_message(result.msg);
                            }
                        });
                    }
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

function pr_configapproval() {
    $("#dialog2").load(url + 'pr/configapproval');
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: ['center', 50],
        title: 'Configure Approval',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function pr_saveconfigapproval() {
    var idapproval = document.getElementsByName("idapproval[]");
    var idapprovalarray = new Array();
    for (var i = 0; i < idapproval.length; i++) {
        idapprovalarray[i] = idapproval[i].value;
    }

    $.post(url + 'pr/saveconfigapproval', {
        idapproval: idapprovalarray
    }, function () {

    });
}

function pr_dialogsearchpr(temp) {
    $("#dialog").empty();
    $("#dialog").load(url + 'pr/dialogsearchpr/' + temp);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 200,
        position: ['center', 50],
        title: 'Search MR',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}


function pr_create_from_requisition(mrid) {

    if ($('#pr1_dialog')) {
        $('#bodydata').append("<div id='pr1_dialog'></div>");
    }
    $('#pr1_dialog').empty();
    $("#pr1_dialog").load(url + 'pr/create_from_requisition/' + mrid, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'New Purchase Request',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    pr_save_from_mr();
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

function pr_create_from_servicerequest(srid) {

    if ($('#pr1_dialog')) {
        $('#bodydata').append("<div id='pr1_dialog'></div>");
    }
    $('#pr1_dialog').empty();
    $("#pr1_dialog").load(url + 'pr/create_from_service/' + srid, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            maxHeight: 500,
            title: 'New Purchase Request',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    var header = {
                        date: $('#create_from_service_form input[name="date"]').val(),
                        remark: $('#create_from_service_form textarea[name="remark"]').val()
                    };
                    var details = [];
                    $("#create_from_service_form input:checkbox:checked").map(function () {
                        if (this.value !== 'zxc') {
                            details.push({
                                srd_id: this.value,
                                itemid: $('#create_from_service_form #itemid' + this.value).val(),
                                qty: $('#create_from_service_form #qty' + this.value).val(),
                                unitid: $('#create_from_service_form #unitid' + this.value).val()
                            });
                        }
                    });

                    var object = {
                        header: header,
                        details: details
                    };

                    var param = "data=" + JSON.stringify(object);

                    if (details.length > 0) {
                        $.post(url + 'pr/save_from_sr', param, function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#pr1_dialog").dialog('close');
                                pr_view();
                            } else {
                                display_error_message(result.msg);
                            }
                        });
                    } else {
                        display_error_message('Please check item to ceate PR..!');
                    }
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    });
}

function pr_save_from_mr() {
    var list_tr_mr = $("#create_from_requisition_form tr[is_mr_checked='true']");
    var listOfMRObject = [];
    $.each(list_tr_mr, function (key, row) {
        listOfMRObject.push({
            mr_id: $(row).find("input[name='mr_checked']").val(),
            itemid: $(row).find("input[name='itemid']").val(),
            qty: $(row).find("input[name='qty']").val(),
            unitid: $(row).find("select[name='unitid']").val()
        });
    });
    var mr_header = {
        requestdate: $('#requestdate').val(),
        mat_req_id: $('#mat_req_id').val(),
        sonumber: $('#sonumber').val(),
        departmentid: $('#departmentid').val(),
        remark: $('#remark').val()
    };
    var paramObject = {
        mr_header: mr_header,
        mr_detail: listOfMRObject
    };
    var param = JSON.stringify(paramObject);

    //console.log(param);

    if (listOfMRObject.length > 0) {
        $.post(url + 'pr/pr_save_from_mr', {data_mr: param},
        function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                $("#pr1_dialog").dialog('close');
                pr_view();
            } else {
                display_error_message(result.msg);
            }
        });
    }
}

function pr_check_uncheck_all(el) {
    if ($(el).prop('checked')) {
        $("input[name='mr_checked[]']").attr('checked', true);
    } else {
        $("input[name='mr_checked[]']").attr('checked', false);
    }
}

function pr_config_tax_and_ppn(prid) {

    if ($('#config_tax_and_ppn_dialog')) {
        $('#bodydata').append("<div id='config_tax_and_ppn_dialog'></div>");
    }
//    $("#com_dialog").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $("#config_tax_and_ppn_dialog").load(url + 'pr/config_tax_and_ppn/' + prid, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            title: 'PREPARE PO',
            height: 'auto',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    $.post(url + 'pr/save_prepare_po', $('#pr_prepare_po').serializeObject(), function (content) {
                        var result = eval('(' + content + ')');
                        if (result.success) {
                            $("#config_tax_and_ppn_dialog").dialog('close');
                            pr_search($('#offset').val());
                        } else {
                            display_error_message(result.msg);
                        }
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
        });
    });
}


function pr_calculate_discount(elid) {
    var disc_percent = $('#pr_disc_percent' + elid).val()
    var total_amount = parseFloat($('#pr_total_amount' + elid).val());
    var total_discount = 0;
    if (isNaN(disc_percent) || disc_percent === '') {
        disc_percent = 0;
    }
    total_discount = (disc_percent * total_amount) / 100;
    $('#pr_discount' + elid).val(total_discount);
    var sub_total = total_amount - total_discount;
    $('#pr_sub_total' + elid).val(sub_total);
    pr_calculate_grand_total(elid);
}

function pr_calculate_grand_total(elid) {
    //alert('test');

    var sub_total = parseFloat($('#pr_sub_total' + elid).val());
    var ppn = parseFloat($('#pr_ppn' + elid).val());
    $('#pr_grand_total' + elid).val('' + (sub_total + ppn));
}
function pr_ppn_check(elid) {
    var pr_ppn_percent = 0;
    if ($('#pr_ppn_check' + elid).prop('checked')) {
        pr_ppn_percent = 10;
        $('#pr_ppn_percent' + elid).val(10);
        $('#pr_ppn_percent' + elid).prop('readonly', false);
    } else {
        $('#pr_ppn_percent' + elid).val(0);
        $('#pr_ppn_percent' + elid).prop('readonly', true);
    }
    var sub_total = parseFloat($('#pr_sub_total' + elid).val());
    var ppn = (sub_total * pr_ppn_percent) / 100;
    $('#pr_ppn' + elid).val(ppn);
    pr_calculate_grand_total(elid)
}

function pr_save_prepare_po() {
    $.post(url + 'pr/save_prepare_po', $('#pr_prepare_po').serializeObject(), function (content) {
        var result = eval('(' + content + ')');
        if (result.success) {
            $("#dialog_temp").dialog('close');
            pr_view();
        } else {
            display_error_message(result.msg);
        }
    });
}

function pr_view_po_plan(prid) {

    if ($('#pr_dialog')) {
        $('#bodydata').append("<div id='pr_dialog'></div>");
    }
    $('#pr_dialog').empty();
    $("#pr_dialog").load(url + 'pr/view_po_plan/' + prid, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'PO PLAN',
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

function pr_add_item(prid) {
    if ($('#pr_dialog')) {
        $('#bodydata').append("<div id='pr_dialog'></div>");
    }
    $("#pr_dialog").load(url + 'pr/add_item/' + prid, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'ADD ITEM TO PR ',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    var mr_detail_list = [];
                    $("#pr_item_input_88 input:checkbox:checked").map(function () {
//                        console.log(this.value);
                        mr_detail_list.push({
                            prid: prid,
                            materialrequisition_detail_id: this.value,
                            unitid: $('#i_unitid' + this.value).val(),
                            itemid: $('#itemid_i' + this.value).val(),
                            qty: $('#qty_i' + this.value).val(),
                            outstanding: $('#qty_i' + this.value).val()
                        });
                    });
//                    console.log(mr_detail_list);

                    if (mr_detail_list.length > 0) {
                        var param = "data=" + JSON.stringify(mr_detail_list);
//                        console.log(param);
                        $.post(url + 'pr/save_item', param, function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#pr_dialog").dialog('close');
                                pr_search($('#offset').val());
                            } else {
                                display_error_message(result.msg);
                            }
                        });
//
                    } else {
                        alert('Please Check Item !');
                    }
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

function pr_add_service_item(prid) {
    if ($('#pr_dialog')) {
        $('#bodydata').append("<div id='pr_dialog'></div>");
    }
    $('#pr_dialog').empty();
    $("#pr_dialog").load(url + 'pr/add_service_item/' + prid, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'ADD SERVICE ITEM TO PR ',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    var srd_id = new Array();
                    var unitid = new Array();
                    var itemid = new Array();
                    var qty = new Array();

                    $("#pr_sr_item_input_88 input:checkbox:checked").map(function () {
                        srd_id.push(this.value);
                        itemid.push($('#pr_sr_item_input_88 #itemid_i' + this.value).val());
                        unitid.push($('#pr_sr_item_input_88 #i_unitid' + this.value).val());
                        qty.push($('#pr_sr_item_input_88 #qty_i' + this.value).val());
                    }).toArray();

                    console.log(srd_id);
                    console.log(itemid);
                    console.log(unitid);
                    console.log(qty);

                    if (srd_id.length > 0) {
                        $.post(url + 'pr/save_sr_item', {
                            prid: prid,
                            srd_id: srd_id,
                            unitid: unitid,
                            qty: qty,
                            itemid: itemid
                        }, function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#pr_dialog").dialog('close');
                                $("#pr_dialog").empty();
                                pr_search($('#offset').val());
                            } else {
                                display_error_message(result.msg);
                            }
                        });

                    } else {
                        display_error_message('Please check item to ceate PR..!');
                    }
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
