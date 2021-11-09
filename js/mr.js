/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* global url */

function mr_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'mr')
    my_y_position = 0;
}

function mr_viewdetail(id) {
    $("#dialog2").load(url + 'mr/prints/' + id + '/view');
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 500,
        position: [100, 50],
        title: 'Withdraw Detail',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function mr_add(requesttype) {

    var title = ''
    if (requesttype === 1) {
        title = 'NEW MATERIAL WITHDRAWAL';
    } else {
        title = 'REQUEST TO TRANSFER STOCK';
    }

    if ($('#mr_dialog')) {
        $('#bodydata').append("<div id='mr_dialog'></div>");
    }
    $("#mr_dialog").load(url + 'mr/add/' + requesttype, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 500,
            maxHeight: 500,
            position: {my: "center", at: "center", of: window},
            title: title,
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    mr_save();
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    });
}

var counter_mr = 0;
function mr_additem() {
    counter_mr++;
    $.get(url + 'mr/additem/' + counter_mr, function (content) {
        $('#mrtablebody').append(content);
    });
}

function mr_save() {

    var header = {
        date: $('#mr_input_form #date').val(),
        supervisor: $('#mr_input_form #id1').val(),
        manager: $('#mr_input_form #id2').val(),
        reasonrequirementid: $('#mr_input_form #reasonrequirementid').val(),
        datemustreceive: $('#mr_input_form #datemustreceive').val(),
        soid: $('#mr_input_form #soid').val(),
        request_type: $('#mr_input_form #request_type').val(),
        batch_time: $('#mr_input_form #batch_time').val(),
        dept_divisionid: $('#mr_input_form #dept_divisionid').val(),
        cost_center_id: $('#mr_input_form #cost_center_id').val()
    };

    var err_mrs = '';
    var details = [];
    $.each($("#mr_input_form table > tbody#mrtablebody > tr"), function (key, row) {
        var partnumber = $(row).find("input[name='partnumber']").val();
        if ($(row).find("select[name='unitid']").val() === '0') {
            err_mrs += "- Field '<b>Unit</b>' required for Item " + partnumber + "<br/>";
        }
        if ($(row).find("select[name='warehouseid']").val() === '0') {
            err_mrs += "- Field '<b>Request To</b>' required for Item " + partnumber + "<br/>";
        }
        details.push({
            itemid: $(row).find("input[name='itemid']").val(),
            unitid: $(row).find("select[name='unitid']").val(),
            qty: $(row).find("input[name='qty']").val(),
            warehouseid: $(row).find("select[name='warehouseid']").val(),
            reason: $(row).find("textarea[name='reason']").val()
        });
    });


    if (header.dept_divisionid === '0') {
        err_mrs += "- Field '<b>Devision</b>' Required<br/>";
    }
    if (header.cost_center_id === '0') {
        err_mrs += "- Field '<b>Cost Center</b>' Required<br/>";
        st = 1;
    }
    if (details.length === 0) {
        err_mrs += "- Set Item to Request<br/>";
    }
    if (header.reasonrequirementid === '') {
        err_mrs += "- Field '<b>Reason Of Requirement</b>' Required<br/>";
    }
    if (header.supervisor === '') {
        err_mrs += "- Field '<b>Supervisor</b>' Required<br/>";
    }
    if (header.manager === '') {
        err_mrs += "- Field '<b>Manager</b>' Required<br/>";
    }
    if (header.request_type === 0) {
        err_mrs += "- Field '<b>Request Type</b>' Required<br/>";
    }

    if (err_mrs !== '') {
        display_error_message(err_mrs);
    } else {

        var object = {
            header: header,
            details: details
        };
        console.log(object);

        var param = "data=" + JSON.stringify(object);

        $.post(url + 'mr/save', param, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                $("#mr_dialog").dialog('close');
                mr_view();
            } else {
                display_error_message(result.msg);
            }
        });
    }

}

function mr_edit(id) {

    if ($('#mr_dialog')) {
        $('#bodydata').append("<div id='mr_dialog'></div>");
    }
    $("#mr_dialog").load(url + 'mr/edit/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 500,
            maxHeight: 500,
            position: {my: "center", at: "center", of: window},
            title: 'EDIT MATERIAL WITHDRAWAL',
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    mr_update();
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    });
}

function mr_update() {
    var header = {
        date: $('#mr_edit_form #date').val(),
        supervisor: $('#mr_edit_form #id1').val(),
        manager: $('#mr_edit_form #id2').val(),
        reasonrequirementid: $('#mr_edit_form #reasonrequirementid').val(),
        datemustreceive: $('#mr_edit_form #datemustreceive').val(),
        soid: $('#mr_edit_form #soid').val(),
        request_type: $('#mr_edit_form #request_type').val(),
        batch_time: $('#mr_edit_form #batch_time').val(),
        dept_divisionid: $('#mr_edit_form #dept_divisionid').val(),
        cost_center_id: $('#mr_edit_form #cost_center_id').val()
    };

    var err_mrs = '';
    var details = [];
    $.each($("#mr_edit_form table > tbody#mrtablebody > tr"), function (key, row) {
        var partnumber = $(row).find("input[name='partnumber']").val();
        if ($(row).find("select[name='unitid']").val() === '0') {
            err_mrs += "- Field '<b>Unit</b>' required for Item " + partnumber + "<br/>";
        }
        if ($(row).find("select[name='warehouseid']").val() === '0') {
            err_mrs += "- Field '<b>Request To</b>' required for Item " + partnumber + "<br/>";
        }
        details.push({
            mrdetailid: $(row).find("input[name='mrdetailid']").val(),
            itemid: $(row).find("input[name='itemid']").val(),
            unitid: $(row).find("select[name='unitid']").val(),
            qty: $(row).find("input[name='qty']").val(),
            warehouseid: $(row).find("select[name='warehouseid']").val(),
            reason: $(row).find("textarea[name='reason']").val()
        });
    });


    if (header.dept_divisionid === '0') {
        err_mrs += "- Field '<b>Devision</b>' Required<br/>";
    }
    if (header.cost_center_id === '0') {
        err_mrs += "- Field '<b>Cost Center</b>' Required<br/>";
        st = 1;
    }
    if (details.length === 0) {
        err_mrs += "- Set Item to Request<br/>";
    }
    if (header.reasonrequirementid === '') {
        err_mrs += "- Field '<b>Reason Of Requirement</b>' Required<br/>";
    }
    if (header.supervisor === '') {
        err_mrs += "- Field '<b>Supervisor</b>' Required<br/>";
    }
    if (header.manager === '') {
        err_mrs += "- Field '<b>Manager</b>' Required<br/>";
    }
    if (header.request_type === 0) {
        err_mrs += "- Field '<b>Request Type</b>' Required<br/>";
    }

    if (err_mrs !== '') {
        display_error_message(err_mrs);
    } else {

        var object = {
            id: $('#mr_edit_form #id').val(),
            header: header,
            details: details
        };
        console.log(object);

        var param = "data=" + JSON.stringify(object);

        $.post(url + 'mr/update', param, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                $("#mr_dialog").dialog('close');
                mr_search($('#offset').val());
            } else {
                display_error_message(result.msg);
            }
        });
    }

//
//
//    var arrmrdetailid = new Array();
//    var arritemid = new Array();
//    var arrqty = new Array();
//    var arrunitid = new Array();
//    var arrwarehouseid = new Array();
//    var arrreason = new Array();
//    var st = 0;
//    var err_mrs = '';
//
//    for (var i = 0; i < itemid.length; i++) {
//        arrmrdetailid[i] = mrdetailid[i].value;
//        arritemid[i] = itemid[i].value;
//        arrqty[i] = qty[i].value;
//        arrunitid[i] = unitid[i].value;
//        arrreason[i] = reason[i].value;
//        arrwarehouseid[i] = warehouseid[i].value;
//        if (unitid[i].value === '0') {
//            st = 1;
//            err_mrs += "- Field '<b>Unit</b>' required for Item " + (i + 1) + "<br/>";
//        }
//        if (warehouseid[i].value === 0) {
//            st = 1;
//            err_mrs += "- Field '<b>Request To</b>' required for Item " + (i + 1) + "<br/>";
//        }
//    }
//
//    if (reasonrequirementid === '') {
//        err_mrs += "- Field '<b>Reason Of Requirement</b>' Required<br/>";
//        st = 1;
//    }
//    if (supervisor === '') {
//        err_mrs += "- Field '<b>Supervisor</b>' Required<br/>";
//        st = 1;
//    }
//    if (manager === '') {
//        err_mrs += "- Field '<b>Manager</b>' Required<br/>";
//        st = 1;
//    }
//
//    if (dept_divisionid === '0') {
//        err_mrs += "- Field '<b>Devision</b>' Required<br/>";
//        st = 1;
//    }
//
//    if (cost_center_id === '0') {
//        err_mrs += "- Field '<b>Cost Center</b>' Required<br/>";
//        st = 1;
//    }
//
//    if (st === 1) {
//        display_error_message(err_mrs);
//    } else {
//        $.post(url + 'mr/update', {
//            id: id,
//            number: number,
//            date: date,
//            departmentid: departmentid,
//            dept_divisionid: dept_divisionid,
//            itemid: arritemid,
//            qty: arrqty,
//            unitid: arrunitid,
//            warehouseid: arrwarehouseid,
//            reason: arrreason,
//            supervisor: supervisor,
//            manager: manager,
//            reasonrequirementid: reasonrequirementid,
//            datemustreceive: datemustreceive,
//            soid: soid,
//            mrdetailid: arrmrdetailid,
//            batch_time: batch_time,
//            cost_center_id: cost_center_id
//        }, function (content) {
//            var result = eval('(' + content + ')');
//            if (result.success) {
//                $("#mr_dialog").dialog('close');
//                mr_search($('#offset').val());
//            } else {
//                display_error_message(result.msg);
//            }
//        });
//    }


}
function mr_approve(mrid, approvalid, status, approval, flag) {
    if (status === 1) {

        if ($('#mr_dialog')) {
            $('#bodydata').append("<div id='mr_dialog'></div>");
        }

        $("#mr_dialog").dialog({
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
                    $.post(url + 'mr/approve', {
                        mrid: mrid,
                        status: status,
                        approval: approval
                    }, function (content) {
                        var result = eval('(' + content + ')');
                        if (result.success) {
                            if (flag === 1) {
                                document.location.reload();
                            } else {
                                $('#mr_dialog').dialog("close");
                                mr_search($('#offset').val());
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
        $("#dialog2").empty();
        $("#dialog2").load(url + 'mr/rejectOrPending/' + mrid + '/' + approvalid + '/' + status + '/' + approval + '/' + flag);
        var dialogtitle = (status === 2) ? 'PENDING' : 'REJECT';
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

function mr_do_reject_or_pending() {
    var mrid = $('#mrid_drp').val();
    var approvalid = $('#approvalid_drp').val();
    var who = $('#who_drp').val();
    var status = $('#mr_status_drp').val();
    var flag = $('#flag_drp').val();
    var notes = $('#notes_drp').val();

    $.post(url + 'mr/do_reject_or_pending', {
        mrid: mrid,
        approvalid: approvalid,
        status: status,
        who: who,
        notes: notes
    }, function (content) {
        var result = eval('(' + content + ')');
        if (result.success) {
            if (flag === '0') {
                mr_search($('#offset').val());
                $("#dialog2").dialog('close');
            } else {
                document.location.reload();
            }
        } else {
            display_error_message(result.msg);
        }
    });
}

function mr_view_notes(mat_req_id, employee) {
    $("#dialog").load(url + 'mr/view_notes/' + mat_req_id + '/' + employee);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        maxHeight: '400',
        title: 'Notes',
        position: ['center', 20],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function mr_delete(mrid) {
    if (confirm('Sure?')) {
        $.get(url + 'mr/delete/' + mrid, function () {
            mr_search($('#offset').val());
        });
    }
}

function mr_searchfordialog(temp) {
    var mrvnumber_s = $('#mrvnumber_s').val();
    $.post(url + 'mr/searcfordialog/' + temp, {
        mrvnumber: mrvnumber_s
    }, function (content) {
        $('#mrvdata').empty();
        $('#mrvdata').append(content)
    });
}

function mr_changestatus(el, mrid) {
    var status = $(el).val();
    if (confirm('Are you sure to close this request?')) {
        $.get(url + 'mr/changestatus/' + mrid + '/' + status, function () {
            mr_search($('#offset').val());
        });
    }
}


function mr_search(offset) {
    var number = $('#number').val();
    var start_date = $('#start_date').val();
    var end_date = $('#end_date').val();
    var departmentid = $('#mr_departmentid_s78').val();
    var requestby = $('#requestby').val();
    var supervisorapproval = $('#supervisorapproval').val();
    var managerapproval = $('#managerapproval').val();
    var status = $('#status').val();
    $("#mrdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'mr/search/' + offset, {
        number: number,
        start_date: start_date,
        end_date: end_date,
        departmentid: departmentid,
        requestby: requestby,
        supervisorapproval: supervisorapproval,
        managerapproval: managerapproval,
        status: status,
        item_code_description: $('#mr_s_12_item_code_description').val()
    }, function (content) {
        $('#mrdata').empty();
        $('#mrdata').append(content);
    }).done(function () {
        var str = $('#mr_s_12_item_code_description').val()
//        alert(str);
        if (str !== '') {
            $("table.child").find(":contains('" + str + "')").each(function () {
                $(this).css("background-color", "#ecb4bb");
            });
        }
        $('#bvan_tbl_s_mw76d_qzx').scrollTop(my_y_position);
    });
}

function mr_print() {
    open_target('post', url + 'mr/printlist', {
        number: $('#number').val(),
        start_date: $('#start_date').val(),
        end_date: $('#end_date').val(),
        departmentid: $('#departmentid').val(),
        requestby: $('#requestby').val(),
        supervisorapproval: $('#supervisorapproval').val(),
        managerapproval: $('#managerapproval').val(),
        status: $('#status').val()
    }, '_blank');
}

function mr_searchmropen() {
    var mrno_s = $('#mrno_s').val();
    var departmentid_s = $('#departmentid_s').val();
    var date_s = $('#date_s').val();
    $.post(url + 'mr/searchmropen', {
        mrno: mrno_s,
        departmentid: departmentid_s,
        date: date_s
    }, function (content) {
        $('#datamropen').empty();
        $('#datamropen').append(content);
    });
}

function mr_newreceive(mrid) {
    $("#dialog").load(url + 'mr/newreceive/' + mrid);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: [300, 50],
        title: 'Receive New Item',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function mr_detailreceive(mrid) {
    $("#dialog").load(url + 'mr/detailreceive/' + mrid);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: [300, 50],
        title: 'Detail Receive',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function mr_deleteitem(el, mrdetailid) {
    if (confirm('Are you sure to delete this item?')) {
        $.post(url + 'mr/item_delete', {
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
