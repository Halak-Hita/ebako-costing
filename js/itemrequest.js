/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* global url */

function itemrequest_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'itemrequest');
}

function itemrequest_search(offset) {
    $("#itemrequestdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'itemrequest/search/' + offset, {
        groupid: $('#groupid_s').val(),
        description: $('#description_s').val(),
        unitid: $('#unitid_s').val()
    }, function (content) {
        $('#itemrequestdata').empty();
        $('#itemrequestdata').append(content);
    });
}

function itemrequest_add() {
    if ($('#itemrequest_dialog')) {
        $('#bodydata').append("<div id='itemrequest_dialog'></div>");
    }

    $("#itemrequest_dialog").load(url + 'itemrequest/add', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'REQUEST CREATE ITEM',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#itemrequest_add_form").valid()) {
                        $.post(url + 'itemrequest/save', $('#itemrequest_add_form').serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#itemrequest_dialog").dialog('close');
                                itemrequest_search(0);
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

function itemrequest_approve(id) {

    if ($('#itemrequest_dialog')) {
        $('#bodydata').append("<div id='itemrequest_dialog'></div>");
    }

    $("#itemrequest_dialog").load(url + 'itemrequest/approve/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'APPROVE NEW ITEM',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    itemrequest_doapprove(id);
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

function itemrequest_doapprove(itemrequestid) {
    var isstock = $('#isstock').val();
    var partnumber = $('#partnumber').val();
    var groupid = $('#groupid').val();
    var woodid = $('#wood').val()
    var description = $('#description').val();
    var unitid = $('#unitid').val();
    var rack = $('#rack').val();
    var notes = $('#notes').val();
    var reorderpoint = $('#reorderpoint').val() == "" ? 0 : $('#reorderpoint').val();
    var moq = $('#moq').val();
    var lt = $('#lt').val();
    var expdate = $('#expdate').val();
    var qccheck = $("#qccheck").is(":checked");
    var whs = document.getElementsByName("whs[]");
    var balance = document.getElementsByName("balance[]");
    var arrwhs = [];
    var arrbalance = [];
    for (var i = 0; i < whs.length; i++) {
        if (whs[i].checked) {
            arrwhs.push(whs[i].value);
            arrbalance.push(balance[i].value);
        }
    }

    var st = 0;
    var msg = "";
    if (groupid == 0) {
        st = 1;
        msg += "- Field 'GROUP' Required<br/>";
    }
    if (partnumber == '') {
        st = 1;
        msg += "- Field 'CODE' Required<br/>";
    }
    if (unitid == 0) {
        st = 1;
        msg += "- Field 'SMALLEST UNIT' Required<br/>";
    }
    if (description == '') {
        st = 1;
        msg += "- Field 'DESCRIPTION' Required<br/>";
    }
    if (arrwhs.length == 0) {
        st = 1;
        msg += "- Choose 'WAHREHOUSE' to store item<br/>";
    }

    if (st == 1) {
        display_error_message(msg);
    } else {
        $.post(url + 'itemrequest/doapprove', {
            itemrequestid: itemrequestid,
            isstock: isstock,
            partnumber: partnumber,
            groupid: groupid,
            woodid: woodid,
            description: description,
            rack: rack,
            reorderpoint: reorderpoint,
            unitid: unitid,
            moq: moq,
            lt: lt,
            expdate: expdate,
            qccheck: qccheck,
            whs: arrwhs,
            balance: arrbalance,
            notes: notes
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                $("#itemrequest_dialog").dialog('close');
                itemrequest_search($('#offset').val());
            } else {
                display_error_message(result.msg);
            }
        })
    }
}

function itemrequest_reject(requestitemid) {
    if ($('#itemrequest_dialog')) {
        $('#bodydata').append("<div id='itemrequest_dialog'></div>");
    }
    var element = "<textarea style='width:200px;height:100px' id=notes></textarea>";
    $("#itemrequest_dialog").empty();
    $("#itemrequest_dialog").append(element);
    $("#itemrequest_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Reject Notes',
        position: {my: "center", at: "center", of: window},
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Save: function () {
                var notes = $('#notes').val();
                $.post(url + 'itemrequest/doreject', {
                    itemrequestid: requestitemid,
                    notes: notes
                }, function (content) {
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $("#itemrequest_dialog").dialog('close');
                        itemrequest_search(0);
                    } else {
                        display_error_message(result.msg);
                    }
                });
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
    });
}

function itemrequest_edit(itemrequestid) {

    if ($('#itemrequest_dialog')) {
        $('#bodydata').append("<div id='itemrequest_dialog'></div>");
    }

    $("#itemrequest_dialog").load(url + 'itemrequest/edit/' + itemrequestid, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'EDIT REQUEST CREATE ITEM',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#itemrequest_edit_form").valid()) {
                        $.post(url + 'itemrequest/update', $('#itemrequest_edit_form').serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#itemrequest_dialog").dialog('close');
                                itemrequest_search(0);
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

function itemrequest_delete(id) {
    if (confirm('Sure?')) {
        $.get(url + 'itemrequest/delete/' + id, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                $("#dialog").dialog('close');
                itemrequest_search(0);
            } else {
                display_error_message(result.msg);
            }
        });
    }
}
