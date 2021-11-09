/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* global url */


function employee_add() {
    if ($('#employee_dialog')) {
        $('#bodydata').append("<div id='employee_dialog'></div>");
    }
    $("#employee_dialog").load(url + 'employee/add', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'NEW EMPLOYEE',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#employee_add_form").valid()) {

                        var data = $("#employee_add_form").serializeArray();

                        var optiongroup = -1;

                        if ($('#departmentid').val() === 10) {
                            optiongroup = $('#adminwhsfor').val();
                        } else if ($('#departmentid').val() === 8) {
                            optiongroup = $('#purchasinggroup').val();
                        }

                        data.push({name: "optiongroup", value: optiongroup});

                        $.post(url + 'employee/insert', data, function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#employee_dialog").dialog("close");
                                employee_search(0);
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

function employee_edit(id) {

    if ($('#employee_dialog')) {
        $('#bodydata').append("<div id='employee_dialog'></div>");
    }
    $("#employee_dialog").load(url + 'employee/edit/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'EDIT EMPLOYEE',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#employee_edit_form").valid()) {

                        var data = $("#employee_edit_form").serializeArray();

                        var optiongroup = -1;
                        console.log($('#departmentid').val());
                        if ($('#departmentid').val() === '10') {
                            optiongroup = $('#adminwhsfor').val();
                        } else if ($('#departmentid').val() === '8') {
                            optiongroup = $('#purchasinggroup').val();
                        }

                        data.push({name: "optiongroup", value: optiongroup}, {name: "id", value: id});

                        $.post(url + 'employee/update', data, function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#employee_dialog").dialog("close");
                                employee_search(0);
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

function employee_update() {
    var msg = '';
    if ($('#id').val() == '') {
        msg += "- Field 'ID' Required<br/>";
    }
    if ($('#name').val() == '') {
        msg += "- Field 'Name' Required<br/>";
    }
    var optiongroup = -1;
    if ($('#departmentid').val() == 0) {
        msg += "- Field 'Department' Required<br/>";
    } else {
        if ($('#departmentid').val() == 10) {
            optiongroup = $('#adminwhsfor').val();
        } else if ($('#departmentid').val() == 8) {
            optiongroup = $('#purchasinggroup').val();
            ;
        }
    }
    if (msg != '') {
        display_error_message(msg);
    } else {
        $.post(url + 'employee/update', {
            id: $('#id').val(),
            name: $('#name').val(),
            address: $('#address').val(),
            city: $('#city').val(),
            state: $('#state').val(),
            zipcode: $('#zipcode').val(),
            workphone: $('#workphone').val(),
            homephone: $('#homephone').val(),
            startdate: $('#startdate').val(),
            enddate: $('#enddate').val(),
            email: $('#email').val(),
            dob: $('#dob').val(),
            positionid: $('#positionid').val(),
            departmentid: $('#departmentid').val(),
            optiongroup: optiongroup
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                $('#dialog').dialog('close');
                display_info('Update Success..');
                employee_search($('#offset').val());
            } else {
                display_error_message(result.msg);
            }
        });
    }
}

function employee_search(offset) {
    var id = $('#id_s').val();
    var name = $('#name_s').val();
    var address = $('#address_s').val();
    var city = $('#city_s').val();
    $("#dataemployee").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'employee/search/' + offset, {
        id: id,
        name: name,
        address: address,
        city: city
    }, function (content) {
        $('#dataemployee').empty();
        $('#dataemployee').append(content)
    });
}

function employee_delete(id) {
    if (confirm("Sure?")) {
        $.post(url + 'employee/delete', {
            id: id
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                employee_search(0);
            } else {
                display_error_message(result.msg);
            }
        });
    }
}