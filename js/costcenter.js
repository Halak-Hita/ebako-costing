/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* global url */

function costcenter_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'costcenter');
    my_y_position = 0;
}

function costcenter_search(offset) {
    $("#costcenterdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'costcenter/search/' + offset,
            $('#costcenter_search_form').serializeObject()
            , function (content) {
                $('#costcenterdata').empty();
                $('#costcenterdata').append(content);
                $('#bvan_tbl_costcenter_qzx').scrollTop(my_y_position);
                //console.log(content);
            });
}

function costcenter_add() {
    if ($('#costcenter_dialog')) {
        $('#bodydata').append("<div id='costcenter_dialog'></div>");
    }

    $("#costcenter_dialog").load(url + 'costcenter/add', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'ADD COST CENTER',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#costcenter_add_form").valid()) {
                        $.post(url + 'costcenter/save', $("#costcenter_add_form").serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#costcenter_dialog").dialog('close');
                                costcenter_search($('#offset').val());
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


function costcenter_edit(id) {
    if ($('#costcenter_dialog')) {
        $('#bodydata').append("<div id='costcenter_dialog'></div>");
    }

    $("#costcenter_dialog").load(url + 'costcenter/edit/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'EDIT COST CENTER',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#costcenter_edit_form").valid()) {
                        $.post(url + 'costcenter/update', $("#costcenter_edit_form").serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#costcenter_dialog").dialog('close');
                                costcenter_search($('#offset').val());
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

function costcenter_set_member(id) {
    if ($('#costcenter_dialog')) {
        $('#bodydata').append("<div id='costcenter_dialog'></div>");
    }

    $("#costcenter_dialog").load(url + 'costcenter/set_member/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'SET MEMBER',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#costcenter_set_member_form").valid()) {
                        $.post(url + 'costcenter/do_set_member', $("#costcenter_set_member_form").serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#costcenter_dialog").dialog('close');
                                costcenter_search($('#offset').val());
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

function costcenter_delete(id) {

    if ($('#costcenter_dialog')) {
        $('#bodydata').append("<div id='costcenter_dialog'></div>");
    }

    $("#costcenter_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: {my: "center", at: "center", of: window},
        title: 'DELETE COST CENTER',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Delete: function () {
                $.get(url + 'costcenter/delete/' + id, function (content) {
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $("#costcenter_dialog").dialog('close');
                        costcenter_search($('#offset').val());
                    } else {
                        display_error_message(result.msg);
                    }
                    costcenter_view();
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
                Are you sure?</p>');
}

