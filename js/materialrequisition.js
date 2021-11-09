/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* global url */

function materialrequisition_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'materialrequisition');
    my_y_position = 0;
}

function materialrequisition_search(offset) {
    $("#mat_req_n_data").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'materialrequisition/search/' + offset, $('#mat_req_search_form').serializeObject(), function (content) {
        $('#mat_req_n_data').empty();
        $('#mat_req_n_data').append(content);
        //console.log(content);
    }).done(function () {
        var str = $('#mat_req_search_form input[name="item_code_description"]').val();
//        alert(str);
        if (str !== '') {
            $("table.child").find(":contains('" + str + "')").each(function () {
                $(this).css("background-color", "#ecb4bb");
            });
        }
        $('#bvan_tbl_s_mat_req_qzx').scrollTop(my_y_position);
    });
}

function materialrequisition_print() {


}

function materialrequisition_add() {

    if ($('#materialrequisition_dialog')) {
        $('#bodydata').append("<div id='materialrequisition_dialog'></div>");
    }

    $("#materialrequisition_dialog").load(url + 'materialrequisition/add', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 500,
            maxHeight: 500,
            position: {my: "center", at: "center", of: window},
            title: 'NEW MATERIAL REQUISITION',
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    materialrequisition_save();
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    });
}

var counter_mat_req = 0;
function materialrequisition_additem() {
    counter_mat_req++;
    $.get(url + 'materialrequisition/additem/' + counter_mat_req, function (content) {
        $('#mat_req_tablebody').append(content);
    });
}

var counter_mat_req = 0;
function materialrequisition_additem2() {
    counter_mat_req--;
    $.get(url + 'materialrequisition/additem/' + counter_mat_req, function (content) {
        $('#mat_req_tablebody').append(content);
    });
}

function materialrequisition_save() {
    var mat_req_date = $('#mat_req_date').val();
    var mat_req_must_receive_date = $('#mat_req_must_receive_date').val();
    var mat_req_reason_requirement = $('#mat_req_reason_requirement').val()
    var dept_divisionid = $('#dept_divisionid').val();
    var cost_center_id = $('#cost_center_id').val();

    var supervisor = $('#id1').val();
    var manager = $('#id2').val();

    var itemid = document.getElementsByName('itemid[]');
    var qty = document.getElementsByName('qty[]');
    var unitid = document.getElementsByName('unitid[]');
    var reason = document.getElementsByName('reason[]');


    var arritemid = new Array();
    var arrqty = new Array();
    var arrunitid = new Array();
    var arrreason = new Array();

    var err_mrs = '';

    for (var i = 0; i < itemid.length; i++) {
        arritemid[i] = itemid[i].value;
        arrqty[i] = qty[i].value;
        arrunitid[i] = unitid[i].value;
        arrreason[i] = reason[i].value;
        if (itemid[i].value === '0') {
            err_mrs += "- Field '<b>Item Code</b>' required for Item " + (i + 1) + "<br/>";
        } else {
            if (unitid[i].value === '0') {
                err_mrs += "- Field '<b>Unit</b>' required for Item " + (i + 1) + "<br/>";
            }
        }
    }
    if (arritemid.length === 0) {
        err_mrs += "- Set Item to Request<br/>";
    }

    if (mat_req_date === '') {
        err_mrs += "- Field 'Date' Required<br/>";
    }
    if (mat_req_must_receive_date === '') {
        err_mrs += "- Field 'Must Receive At' Required<br/>";
    }
    if (mat_req_reason_requirement === '') {
        err_mrs += "- Field 'Reason Of Requirement' Required<br/>";
    }
    if (supervisor === '') {
        err_mrs += "- Field '<b>Supervisor</b>' Required<br/>";
    }
    if (manager === '') {
        err_mrs += "- Field '<b>Manager</b>' Required<br/>";
    }

    if (dept_divisionid === '0') {
        err_mrs += "- Field '<b>End User</b>' Required<br/>";
    }

    if (cost_center_id === '0') {
        err_mrs += "- Field '<b>Cost Center</b>' Required<br/>";
        st = 1;
    }

    if (err_mrs !== '') {
        display_error_message(err_mrs);
    } else {
        $.post(url + 'materialrequisition/insert', {
            mat_req_date: mat_req_date,
            mat_req_must_receive_date: mat_req_must_receive_date,
            mat_req_reason_requirement: mat_req_reason_requirement,
            dept_divisionid: dept_divisionid,
            cost_center_id: cost_center_id,
            supervisor: supervisor,
            manager: manager,
            itemid: arritemid,
            qty: arrqty,
            unitid: arrunitid,
            reason: arrreason
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                $("#materialrequisition_dialog").dialog('close');
                materialrequisition_search(0);
            } else {
                display_error_message(result.msg);
            }
        });
    }
}

function materialrequisition_edit(id) {

    if ($('#materialrequisition_dialog')) {
        $('#bodydata').append("<div id='materialrequisition_dialog'></div>");
    }

    $("#materialrequisition_dialog").load(url + 'materialrequisition/edit/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 500,
            maxHeight: 500,
            position: {my: "center", at: "center", of: window},
            title: 'EDIT MATERIAL REQUISITION',
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    materialrequisition_update();
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    });
}

function materialrequisition_update() {
    var id = $('#mat_req_id').val();
    var mat_req_date = $('#mat_req_date').val();
    var mat_req_must_receive_date = $('#mat_req_must_receive_date').val();
    var mat_req_reason_requirement = $('#mat_req_reason_requirement').val();
    var dept_divisionid = $('#dept_divisionid').val();
    var cost_center_id = $('#cost_center_id').val();

    var supervisor = $('#id1').val();
    var manager = $('#id2').val();

    var detailid = document.getElementsByName('mrdetailid[]');
    var itemid = document.getElementsByName('itemid[]');
    var qty = document.getElementsByName('qty[]');
    var unitid = document.getElementsByName('unitid[]');
    var reason = document.getElementsByName('reason[]');

    var arrdetailid = new Array();
    var arritemid = new Array();
    var arrqty = new Array();
    var arrunitid = new Array();
    var arrreason = new Array();

    var err_mrs = '';

    for (var i = 0; i < itemid.length; i++) {
        arrdetailid[i] = detailid[i].value;
        arritemid[i] = itemid[i].value;
        arrqty[i] = qty[i].value;
        arrunitid[i] = unitid[i].value;
        arrreason[i] = reason[i].value;
        if (unitid[i].value === '0') {
            err_mrs += "- Field 'UNIT' required for Item " + (i + 1) + "<br/>";
        }
    }
    if (arritemid.length === 0) {
        err_mrs += "- Set Item to Request<br/>";
    }

    var msg = "";

    if (mat_req_date === '') {
        msg += "- Field 'Date' Required<br/>";
    }
    if (mat_req_must_receive_date === '') {
        msg += "- Field 'Must Receive At' Required<br/>";
    }
    if (supervisor === '') {
        err_mrs += "- Field 'APPROVAL SUPERVISOR' Required<br/>";
    }
    if (manager === '') {
        err_mrs += "- Field 'APPROVAL MANAGER' Required<br/>";
    }

    if (dept_divisionid === '0') {
        err_mrs += "- Field '<b>End User</b>' Required<br/>";
    }

    if (cost_center_id === '0') {
        err_mrs += "- Field '<b>Cost Center</b>' Required<br/>";
    }

    if (err_mrs !== '') {
        display_error_message(msg);
    } else {
        $.post(url + 'materialrequisition/update', {
            id: id,
            mat_req_date: mat_req_date,
            mat_req_must_receive_date: mat_req_must_receive_date,
            mat_req_reason_requirement: mat_req_reason_requirement,
            dept_divisionid: dept_divisionid,
            cost_center_id: cost_center_id,
            supervisor: supervisor,
            manager: manager,
            detailid: arrdetailid,
            itemid: arritemid,
            qty: arrqty,
            unitid: arrunitid,
            reason: arrreason
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                $("#materialrequisition_dialog").dialog('close');
                materialrequisition_search($('#offset').val());
            } else {
                display_error_message(result.msg);
            }
        });
    }
}

function materialrequisition_delete(id) {

    if ($('#materialrequisition_dialog')) {
        $('#bodydata').append("<div id='materialrequisition_dialog'></div>");
    }

    $("#materialrequisition_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: {my: "center", at: "center", of: window},
        title: 'DELETE REQUEST',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Delete: function () {
                $.get(url + 'materialrequisition/delete/' + id, function (content) {
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $("#materialrequisition_dialog").dialog("close");
                        materialrequisition_search($('#offset').val());
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


function materialrequisition_approve(materialrequisitionid, approvalid, status, who, flag) {
    if (status === 1) {
        if ($('#materialrequisition_dialog')) {
            $('#bodydata').append("<div id='materialrequisition_dialog'></div>");
        }
        $("#materialrequisition_dialog").dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            position: {my: "center", at: "center", of: window},
            title: 'APPROVE.!',
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Approve: function () {
                    $.post(url + 'materialrequisition/approve', {
                        materialrequisitionid: materialrequisitionid,
                        approvalid: approvalid,
                        who: who,
                        status: status
                    }, function (content) {
                        var result = eval('(' + content + ')');
                        if (result.success) {
                            if (flag === 0) {
                                $("#materialrequisition_dialog").dialog("close");
                                materialrequisition_search($('#offset').val());
                            } else {
                                $("#materialrequisition_dialog").dialog("close");
                                document.location.reload();
                            }
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
        }).html('<span><br/>Are you sure to approve this document?</span>');
    } else {
        var dialogtitle = (status === 2) ? 'PENDING' : 'REJECT';
        if ($('#materialrequisition_dialog')) {
            $('#bodydata').append("<div id='materialrequisition_dialog'></div>");
        }
        $("#materialrequisition_dialog").load(url + 'materialrequisition/rejectOrPending/' + materialrequisitionid + '/' + approvalid + '/' + status + '/' + who + '/' + flag, function () {
            $(this).dialog({
                modal: true,
                width: 'auto',
                height: 'auto',
                maxHeight: 500,
                position: {my: "center", at: "center", of: window},
                title: dialogtitle,
                overlay: {
                    opacity: 0.7,
                    background: "black"
                }, buttons: {
                    Save: function () {
                        materialrequisition_do_reject_or_pending();
                    },
                    Cancel: function () {
                        $(this).dialog("close");
                    }
                }
            });
        });
    }
}

function materialrequisition_do_reject_or_pending() {
    var materialrequisitionid = $('#materialrequisitionid').val();
    var approvalid = $('#approvalid').val();
    var who = $('#who').val();
    var status = $('#mat_req_status').val();
    var flag = $('#flag').val();
    var notes = $('#notes').val();

//    alert(flag);

    $.post(url + 'materialrequisition/do_reject_or_pending', {
        materialrequisitionid: materialrequisitionid,
        approvalid: approvalid,
        status: status,
        who: who,
        notes: notes
    }, function (content) {
        var result = eval('(' + content + ')');
        if (result.success) {
            if (flag === '0') {
                materialrequisition_search($('#offset').val());
                $("#materialrequisition_dialog").dialog('close');
            } else {
                document.location.reload();
            }
        } else {
            display_error_message(result.msg);
        }
    });
}


function materialrequisition_view_notes(mat_req_id, employee) {
    $("#mat_req_n").load(url + 'materialrequisition/view_notes/' + mat_req_id + '/' + employee);
    $("#mat_req_n").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Notes',
        position: ['center', 20],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function materialrequisition_submit(mat_req_id) {

    if ($('#materialrequisition_dialog')) {
        $('#bodydata').append("<div id='materialrequisition_dialog'></div>");
    }

    $("#materialrequisition_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: {my: "center", at: "center", of: window},
        title: 'SUBMIT.!',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            OK: function () {
                $.post(url + 'materialrequisition/submit', {
                    materialrequisitionid: mat_req_id
                }, function (content) {
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $('#materialrequisition_dialog').dialog("close");
                        materialrequisition_search($('#offset').val());
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
            $(this).dialog("center");
        }
    }).html('<span><br/>Are you sure to submit this document?</span>');
}

function materialrequisition_viewdetail(id) {


    if ($('#materialrequisition_dialog')) {
        $('#bodydata').append("<div id='materialrequisition_dialog'></div>");
    }

    $("#materialrequisition_dialog").load(url + 'materialrequisition/prints/' + id + '/view', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 500,
            maxHeight: 500,
            title: 'MATERIAL REQUISITION DETAIL',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Print: function () {
                    open_target('POST', url + 'materialrequisition/prints/' + id + '/prints', {}, '_blank');
                },
                Close: function () {
                    $(this).dialog('close');
                }
            }
        });
    });
}

function mat_req_deleteitem(el, mrdetailid) {
    if (confirm('Are you sure to delete this item?')) {
        $.post(url + 'materialrequisition/item_delete', {
            id: mrdetailid
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                $(el).parent().parent().remove();
            } else {
                display_error_message(result.msg);
            }
        });
    }
}

function materialrequisitionots_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'materialrequisition/otscreatepr');
    my_y_position = 0;
}

function mat_req_ots_search(offset) {
    $("#mat_req_ots_n_data").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'materialrequisition/search_ots/' + offset,
            $('#mat_req_ots_search_form').serializeObject()
            , function (content) {
                $('#mat_req_ots_n_data').empty();
                $('#mat_req_ots_n_data').append(content);
                $('#bvan_tbl_ots_create_pr').scrollTop(my_y_position);
                //console.log(content);
            });
}

function mat_req_ots_print() {
    open_target('post', url + 'materialrequisition/otscreatepr_print/0', $('#mat_req_ots_search_form').serializeObject(), '_blank');
}

function mat_req_ots_excel() {
    open_target('post', url + 'materialrequisition/otscreatepr_print/1', $('#mat_req_ots_search_form').serializeObject(), '_blank');
}


function mat_req_ots_create_pr_search(offset) {
    $("#mat_req_ots_n_data").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'pr/search_mr_item_available/' + offset, $('#mat_req_ots_create_pr_search_form').serializeObject(), function (content) {
        $('#mat_req_ots_create_pr_n_data').empty();
        $('#mat_req_ots_create_pr_n_data').append(content);
//                $('#bvan_tbl_ots_create_pr').scrollTop(my_y_position);
        //console.log(content);
    });
}