/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* global url */

function currency_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'currency');
    my_y_position = 0;
}

function currency_search(offset) {
    $("#currencydata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'currency/search/' + offset,
            $('#currency_search_form').serializeObject()
            , function (content) {
                $('#currencydata').empty();
                $('#currencydata').append(content);
                $('#bvan_tbl_currency_qzx').scrollTop(my_y_position);
                //console.log(content);
            });
}

function currency_add() {
    if ($('#currency_dialog')) {
        $('#bodydata').append("<div id='currency_dialog'></div>");
    }

    $("#currency_dialog").load(url + 'currency/add', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'ADD CURRENCY',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#currency_add_form").valid()) {
                        $.post(url + 'currency/save', $("#currency_add_form").serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#currency_dialog").dialog('close');
                                currency_search($('#offset').val());
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


function currency_edit(id) {
    if ($('#currency_dialog')) {
        $('#bodydata').append("<div id='currency_dialog'></div>");
    }

    $("#currency_dialog").load(url + 'currency/edit/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'EDIT CURENCY',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#currency_edit_form").valid()) {
                        $.post(url + 'currency/update', $("#currency_edit_form").serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#currency_dialog").dialog('close');
                                currency_search($('#offset').val());
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

function currency_delete(id) {

    if ($('#currency_dialog')) {
        $('#bodydata').append("<div id='currency_dialog'></div>");
    }

    $("#currency_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: {my: "center", at: "center", of: window},
        title: 'DELETE CURRENCY',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Delete: function () {
                $.get(url + 'currency/delete/' + id, function (content) {
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $("#currency_dialog").dialog('close');
                        currency_search($('#offset').val());
                    } else {
                        display_error_message(result.msg);
                    }
                    currency_view();
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

