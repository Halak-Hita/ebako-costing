/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* global url */

function department_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'department');
}

function department_search2(event) {
    if (event.keyCode === 13) {
        department_search(0);
    }
}
function department_search(offset) {
    $("#departmentdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'department/search/' + offset, {
        name: $('#name_s').val(),
        code: $('#code_s').val(),
        description: $('#description_s').val()
    }, function (content) {
        $('#departmentdata').empty();
        $('#departmentdata').append(content);
    });
}

function department_print() {
    $.post(url + 'department/prints', {
        name: $('#name').val(),
        code: $('#code').val(),
        description: $('#description').val()
    }, function (content) {
        var myWindow = window.open(url + 'department/prints', 'blank');
        myWindow.document.write(content);
        myWindow.document.close();
    });
}

function department_add() {
    if ($('#department_dialog')) {
        $('#bodydata').append("<div id='department_dialog'></div>");
    }
    $("#department_dialog").load(url + 'department/add', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'NEW DEPARTMENT',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#department_form_add").valid()) {
                        $.post(url + 'department/insert', $('#department_form_add').serializeArray(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#department_dialog").dialog('close');
                                department_search(0);
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

function department_edit(id) {
    if ($('#department_dialog')) {
        $('#bodydata').append("<div id='department_dialog'></div>");
    }
    $("#department_dialog").load(url + 'department/edit/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'EDIT DEPARTMENT',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#department_form_edit").valid()) {
                        $.post(url + 'department/update', $('#department_form_edit').serializeArray(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#department_dialog").dialog('close');
                                department_search(0);
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

function department_delete(id) {

    if ($('#department_dialog')) {
        $('#bodydata').append("<div id='department_dialog'></div>");
    }

    $("#department_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: {my: "center", at: "center", of: window},
        title: 'DELETE DEPARTMENT',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Delete: function () {
                $.get(url + 'department/delete/' + id, function (content) {
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $("#department_dialog").dialog('close');
                        department_search($('#offset').val());
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
    }).html('<span class="ui-icon ui-icon-alert"></span>These items will be permanently deleted and cannot be recovered<br/>Are you sure?');

//
//    if (confirm("Sure?")) {
//        $.get(url + 'department/delete/' + id, function (content) {
//            var result = eval('(' + content + ')');
//            if (result.success) {
//                $("#dialog").dialog('close');
//                department_search(0);
//            } else {
//                display_error_message(result.msg);
//            }
//        })
//    }
}