/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global url */

function returnproduction_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'returnproduction');
    my_y_position = 0;
}

function returnproduction_search(offset) {
    $("#returnproduction_data").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'returnproduction/search/' + offset,
            $('#returnproduction_search_form').serializeObject()
            , function (content) {
                $('#returnproduction_data').empty();
                $('#returnproduction_data').append(content);
                $('#bvan_tbl_returnproduction_qzx').scrollTop(my_y_position);
                //console.log(content);
            });
}


function returnproduction_add() {
    if ($('#returnproduction_dialog')) {
        $('#bodydata').append("<div id='returnproduction_dialog'></div>");
    }
//    $("#returnproduction_dialog").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $("#returnproduction_dialog").load(url + 'returnproduction/add', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'NEW RETURN PRODUCTION',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#returnproduction_add_form").valid()) {
                        $.post(url + 'returnproduction/save', $('#returnproduction_add_form').serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#returnproduction_dialog").dialog('close');
                                returnproduction_search(0);
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
        })
    });
}

function returnproduction_edit(id) {

    if ($('#returnproduction_dialog')) {
        $('#bodydata').append("<div id='returnproduction_dialog'></div>");
    }

    $("#returnproduction_dialog").load(url + 'returnproduction/edit/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'EDIT RETURN PRODUCTION',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#returnproduction_edit_form").valid()) {
                        $.post(url + 'returnproduction/update/' + id, $('#returnproduction_edit_form').serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#returnproduction_dialog").dialog('close');
                                returnproduction_search($('#offset').val());
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

function returnproduction_delete(id) {
    if ($('#returnproduction_dialog')) {
        $('#bodydata').append("<div id='returnproduction_dialog'></div>");
    }
    $('#returnproduction_dialog').empty();
    $("#returnproduction_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: {my: "center", at: "center", of: window},
        title: 'DELETE',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Delete: function () {
                $.post(url + 'returnproduction/delete', {id: id}, function (content) {
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $("#returnproduction_dialog").dialog('close');
                        returnproduction_search($('#offset').val());
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

function returnproduction_recive(id, type) {
    if ($('#returnproduction_dialog')) {
        $('#bodydata').append("<div id='returnproduction_dialog'></div>");
    }
    $('#returnproduction_dialog').empty();
    $("#returnproduction_dialog").load(url + 'returnproduction/receive/' + id + '/' + type, function () {
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
                    if ($("#returnproduction_receive_form").valid()) {
                        $.post(url + 'returnproduction/do_receive', $('#returnproduction_receive_form').serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#returnproduction_dialog").dialog('close');
                                returnproduction_search($('#offset').val());
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


function returnproduction_receive_delete(id) {
    if ($('#returnproduction_dialog')) {
        $('#bodydata').append("<div id='returnproduction_dialog'></div>");
    }
    $('#returnproduction_dialog').empty();
    $("#returnproduction_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: {my: "center", at: "center", of: window},
        title: 'DELETE RECEIVE',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Delete: function () {
                $.post(url + 'returnproduction/delete_receive/' + id, {}, function (content) {
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $("#returnproduction_dialog").dialog('close');
                        returnproduction_search($('#offset').val());
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


function returnproduction_print(id) {
    open_target('POST', url + 'returnproduction/prints/', {id: id}, '_blank');
}
