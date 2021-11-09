/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global url */

function com_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'com');
    my_y_position = 0;
}

function com_search(offset) {
    $("#com_data").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'com/search/' + offset,
            $('#com_search_form').serializeObject()
            , function (content) {
                $('#com_data').empty();
                $('#com_data').append(content);
                $('#bvan_tbl_com_qzx').scrollTop(my_y_position);
                //console.log(content);
            });
}


function com_add() {
    if ($('#com_dialog')) {
        $('#bodydata').append("<div id='com_dialog'></div>");
    }
//    $("#com_dialog").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $("#com_dialog").load(url + 'com/add', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'NEW C.O.M RECEIVE',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
//                if ($("#com_form_input").validate()) {
                    com_save();
//                }
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

function com_save() {
    if ($('#com_form_input select[id=request_type]').val() === "0") {
        display_error_message("- Field 'Department' Required");
    } else {
        $.post(url + 'com/save', $('#com_form_input').serializeObject(), function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                $("#com_dialog").dialog('close');
                com_search(0);
            } else {
                display_error_message(result.msg);
            }
        });
    }
}

function com_edit(id) {
    if ($('#com_dialog')) {
        $('#bodydata').append("<div id='com_dialog'></div>");
    }
//    $("#com_dialog").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $("#com_dialog").load(url + 'com/edit/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'EDIT C.O.M',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Update: function () {
                    com_update(id);
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

function com_update(id) {
    $.post(url + 'com/update/' + id, $('#com_form_input').serializeObject(), function (content) {
        var result = eval('(' + content + ')');
        if (result.success) {
            $("#com_dialog").dialog('close');
            com_search($('#offset').val());
        } else {
            display_error_message(result.msg);
        }
    });
}

function com_delete(id) {
    if ($('#com_dialog')) {
        $('#bodydata').append("<div id='com_dialog'></div>");
    }
    $('#com_dialog').empty();
    $('#com_dialog').append('<p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>\n\
                These items will be permanently deleted and cannot be recovered<br/> \
                <br/><br/>Are you sure?</p>');

    $("#com_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: {my: "center", at: "center", of: window},
        title: 'DELETE C.O.M',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Delete: function () {
                $.get(url + 'com/delete/' + id, function (content) {
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $("#com_dialog").dialog('close');
                        com_search($('#offset').val());
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
}

var counter_com_item = 0;
function com_additem() {
    counter_com_item++;
    $.get(url + 'com/additem/' + counter_com_item, function (content) {
        $('#com_tablebody').append(content);
    });
}

function com_additem2() {
    counter_com_item--;
    $.get(url + 'com/additem/' + counter_com_item, function (content) {
        $('#com_tablebody').append(content);
    });
}


function com_deleteitem(el, comitem_id) {
    if (confirm('Are you sure to delete this item?')) {
        $.post(url + 'com/item_delete', {
            id: comitem_id
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

function com_print(id) {
    open_target('POST', url + 'com/prints/', {id: id}, '_blank');
}
