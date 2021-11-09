/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* global url */

function vendor_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'vendor');
}

function vendor_add() {
    if ($('#vendor_dialog')) {
        $('#bodydata').append("<div id='vendor_dialog'></div>");
    }
//    $("#com_dialog").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $("#vendor_dialog").load(url + 'vendor/add', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'ADD VENDOR',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#vendor_add_form").valid()) {
                        $.post(url + 'vendor/save', $('#vendor_add_form').serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $('#vendor_dialog').dialog('close');
                                display_info('Update Success..');
                                vendor_search($('#offset').val());
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

function vendor_search(offset) {
    $("#vendordata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    var name = $('#name_s').val();
    $.post(url + 'vendor/search/' + offset, {
        name: name
    }, function (content) {
        $('#vendordata').empty();
        $('#vendordata').append(content);
    });
}

function vendor_print() {
    open_target('POST', url + 'vendor/prints', {name: $('#name_s').val()}, '_blank');
}

function vendor_edit(id) {

    if ($('#vendor_dialog')) {
        $('#bodydata').append("<div id='vendor_dialog'></div>");
    }

    $("#vendor_dialog").load(url + 'vendor/edit/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'ADD VENDOR',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#vendor_edit_form").valid()) {
                        $.post(url + 'vendor/update', $('#vendor_edit_form').serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $('#vendor_dialog').dialog('close');
                                vendor_search($('#offset').val());
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


function vendor_delete(id) {

    if ($('#vendor_dialog')) {
        $('#bodydata').append("<div id='vendor_dialog'></div>");
    }

    $("#vendor_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: {my: "center", at: "center", of: window},
        title: 'DELETE VENDOR',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Delete: function () {
                $.get(url + 'vendor/delete/' + id, function (content) {
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $('#vendor_dialog').dialog('close');
                        vendor_search($('#offset').val());
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