/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* global url */

function customer_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'customer');
}

function customer_search(offset) {
    $("#datacustomer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'customer/search/' + offset, {
        name: $('#name_s').val()
    }, function (content) {
        $('#datacustomer').empty();
        $('#datacustomer').append(content);
    });
}

function customer_print() {
    $.post(url + 'customer/prints', {
        name: $('#name').val()
    }, function (content) {
        var myWindow = window.open(url + 'customer/print', 'blank');
        myWindow.document.write(content);
        myWindow.document.close();
    });
}

function customer_add() {
    if ($('#customer_dialog')) {
        $('#bodydata').append("<div id='customer_dialog'></div>");
    }
    $("#customer_dialog").load(url + 'customer/add', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'ADD CUSTOMER',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#customer_add_form").valid()) {
                        $.post(url + 'customer/save', $("#customer_add_form").serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#customer_dialog").dialog('close');
                                customer_search(0);
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
    }).html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
}

function customer_edit(id) {

    if ($('#customer_dialog')) {
        $('#bodydata').append("<div id='customer_dialog'></div>");
    }
    $("#customer_dialog").load(url + 'customer/edit/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'EDIT CUSTOMER',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#customer_edit_form").valid()) {
                        $.post(url + 'customer/update', $("#customer_edit_form").serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#customer_dialog").dialog('close');
                                customer_search($('#offset').val());
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
    }).html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
}

function customer_delete(id) {

    if ($('#customer_dialog')) {
        $('#bodydata').append("<div id='customer_dialog'></div>");
    }

    $("#customer_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: {my: "center", at: "center", of: window},
        title: 'DELETE CUSTOMER',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Delete: function () {
                $.get(url + 'customer/delete/' + id, function (content) {
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $("#customer_dialog").dialog('close');
                        customer_search($('#offset').val());
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