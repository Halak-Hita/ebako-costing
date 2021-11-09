/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */




/* global url */

function servicerequest_search(offset) {
    $("#servicerequestdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'servicerequest/search/' + offset, $('#servicerequest_search_form').serializeObject(), function (content) {
        $('#servicerequestdata').empty();
        $('#servicerequestdata').append(content);
    }).done(function () {
        var str = $('#servicerequest_search_form input[name="item_code_description"]').val();
//        alert(str);
        if (str !== '') {
            $("table.child").find(":contains('" + str + "')").each(function () {
                $(this).css("background-color", "#ecb4bb");
            });
        }
        $('#bvan_tbl_s_serv_req_qzx').scrollTop(my_y_position);
    });
}

function servicerequest_add() {
    if ($('#servicerequest_dialog')) {
        $('#bodydata').append("<div id='servicerequest_dialog'></div>");
    }
    $("#servicerequest_dialog").load(url + 'servicerequest/add', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'NEW SERVICE REQUEST',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#servicerequest_add_form").valid()) {
                        $.post(url + 'servicerequest/save', $("#servicerequest_add_form").serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#servicerequest_dialog").dialog('close');
                                servicerequest_search($('#offset').val());
                                servicerequest_edit(result.id);
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

function servicerequest_edit(id) {
    if ($('#servicerequest_dialog')) {
        $('#bodydata').append("<div id='servicerequest_dialog'></div>");
    }
    $("#servicerequest_dialog").load(url + 'servicerequest/edit/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'EDIT SERVICE REQUEST',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#servicerequest_edit_form").valid()) {
                        $.post(url + 'servicerequest/save', $("#servicerequest_edit_form").serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#servicerequest_dialog").dialog('close');
                                servicerequest_search($('#offset').val());
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

function servicerequest_delete(id) {
    if ($('#servicerequest_dialog')) {
        $('#bodydata').append("<div id='servicerequest_dialog'></div>");
    }

    $("#servicerequest_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: {my: "center", at: "center", of: window},
        title: 'DELETE SERVICE REQUEST',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Delete: function () {
                $.post(url + 'servicerequest/delete', {
                    id: id
                }, function (content) {
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $("#servicerequest_dialog").dialog('close');
                        servicerequest_search($('#offset').val());
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

function servicerequest_additem(servicerequestid) {

    if ($('#servicerequest_item_dialog')) {
        $('#bodydata').append("<div id='servicerequest_item_dialog'></div>");
    }
    $('#servicerequest_item_dialog').empty();
    $("#servicerequest_item_dialog").load(url + 'servicerequest/additem/' + servicerequestid, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'ADD ITEM',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#sr_add_item_form").valid()) {
                        $.post(url + 'servicerequest/saveitem', $("#sr_add_item_form").serializeArray(), function (content) {
                            console.log(content);
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#servicerequest_item_dialog").dialog('close');
                                servicerequest_load_item(servicerequestid);
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

function servicerequest_load_item(id) {
    $.get(url + 'servicerequest/reload_item/' + id, function (content) {
        $('#servicerequesttablebody').empty();
        $('#servicerequesttablebody').append(content);
    });
}

function servicerequest_edititem(id, servicerequestid) {

    if ($('#servicerequest_item_dialog')) {
        $('#bodydata').append("<div id='servicerequest_item_dialog'></div>");
    }
    $('#servicerequest_item_dialog').empty();
    $("#servicerequest_item_dialog").load(url + 'servicerequest/edititem/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'EDIT ITEM',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#sr_edit_item_form").valid()) {
//                        console.log( $("#sr_edit_item_form").serializeArray());
                        $.post(url + 'servicerequest/saveitem/' + id, $("#sr_edit_item_form").serializeArray(), function (content) {
                            console.log(content);
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#servicerequest_item_dialog").dialog('close');
                                servicerequest_load_item(servicerequestid);
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

function servicerequest_deleteitem(id, servicerequestid) {

    if ($('#servicerequest_item_dialog')) {
        $('#bodydata').append("<div id='servicerequest_item_dialog'></div>");
    }

    $("#servicerequest_item_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: {my: "center", at: "center", of: window},
        title: 'DELETE ITEM',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Delete: function () {
                $.post(url + 'servicerequest/deleteitem', {
                    id: id
                }, function (content) {
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $("#servicerequest_item_dialog").dialog('close');
                        servicerequest_load_item(servicerequestid);
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


function servicerequest_submit(id) {

    if ($('#servicerequest_dialog')) {
        $('#bodydata').append("<div id='servicerequest_dialog'></div>");
    }

    $("#servicerequest_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: {my: "center", at: "center", of: window},
        title: 'SUBMIT SERVICE REQUEST',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Submit: function () {
                $.post(url + 'servicerequest/submit', {
                    id: id
                }, function (content) {
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        servicerequest_search($('#offset').val());
                        $("#servicerequest_dialog").dialog('close');
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
    }).html('<p style="background:none;border:none;"><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>Are you sure to submit this document?</p>');


}

function servicerequest_set_approval(servicerequestid) {
    $("#dialog2").load(url + 'servicerequest/set_approval/' + servicerequestid);
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: [300, 5],
        title: 'Set Approval',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function servicerequest_saveapproval(servicerequestid) {
    var idapproval = document.getElementsByName("idapproval[]");
    var idapprovalarray = new Array();
    for (var j = 0; j < idapproval.length; j++) {
        idapprovalarray[j] = idapproval[j].value;
    }

    $.post(url + 'servicerequest/saveapproval', {
        servicerequestid: servicerequestid,
        idapprovalarray: idapprovalarray
    }, function () {
        $("#dialog2").dialog('close');
        servicerequest_view();
    });
}

function  servicerequest_edit_approval(servicerequestid) {
    $("#dialog2").load(url + 'servicerequest/edit_approval/' + servicerequestid);
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: ['center', 50],
        title: 'Edit Approval',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function servicerequest_updateapproval(servicerequestid) {
    var id = document.getElementsByName("id[]");
    var idapproval = document.getElementsByName("idapproval[]");
    var idapprovalarray = new Array();
    var idarray = new Array();
    for (var j = 0; j < idapproval.length; j++) {
        idapprovalarray[j] = idapproval[j].value;
        idarray[j] = id[j].value;
    }

    $.post(url + 'servicerequest/updateapproval', {
        servicerequestid: servicerequestid,
        idarray: idarray,
        idapprovalarray: idapprovalarray
    }, function () {
        $("#dialog2").dialog('close');
        servicerequest_view();
    });
}

function servicerequest_approve(servicerequestid, approvalid, status, who, flag) {
    if (status === 1) {
        if ($('#servicerequest_dialog')) {
            $('#bodydata').append("<div id='servicerequest_dialog'></div>");
        }

        $("#servicerequest_dialog").dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            position: {my: "center", at: "center", of: window},
            title: 'APPROVE SERVICE REQUEST',
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Submit: function () {
                    $.post(url + 'servicerequest/approve', {
                        servicerequestid: servicerequestid,
                        approvalid: approvalid,
                        who: who,
                        status: status
                    }, function (content) {
                        var result = eval('(' + content + ')');
                        if (result.success) {
                            if (flag === 0) {
                                servicerequest_search($('#offset').val());
                                $("#servicerequest_dialog").dialog('close');
                            } else {
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
        }).html('<p style="background:none;border:none;"><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>Are you sure to approve this document?</p>');

    } else {

        var dialogtitle = (status === 2) ? 'PENDING' : 'REJECT';
        if ($('#servicerequest_dialog')) {
            $('#bodydata').append("<div id='servicerequest_dialog'></div>");
        }

        $("#servicerequest_dialog").load(url + 'servicerequest/rejectOrPending/' + servicerequestid + '/' + approvalid + '/' + status + '/' + who + '/' + flag, function () {
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
                        $.post(url + 'servicerequest/do_reject_or_pending', $('#sr_reject_or_pending_form').serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                if (flag === 0) {
                                    servicerequest_search($('#offset').val());
                                    $("#servicerequest_dialog").dialog('close');
                                } else {
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
                }
            });
        });
    }
}


function servicerequest_viewdetail(id) {
    if ($('#servicerequest_dialog')) {
        $('#bodydata').append("<div id='servicerequest_dialog'></div>");
    }

    $("#servicerequest_dialog").load(url + 'servicerequest/prints/' + id + '/view', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 500,
            maxHeight: 500,
            title: 'SERVICE REQUISITION DETAIL',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Print: function () {
                    open_target('POST', url + 'servicerequest/prints/' + id + '/prints', {}, '_blank');
                },
                Close: function () {
                    $(this).dialog('close');
                }
            }
        });
    });
}