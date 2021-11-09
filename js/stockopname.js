/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global url, my_y_position */

function stockopname_search(offset) {
    $("#stockopnamedata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'stockopname/search/' + offset,
            $('#stockopname_search_form').serializeObject()
            , function (content) {
                $('#stockopnamedata').empty();
                $('#stockopnamedata').append(content);
                $('#bvan_tbl_stockopname').scrollTop(my_y_position);
                //console.log(content);
            });
}

function stockopname_add() {
    if ($('#stockopname_dialog')) {
        $('#bodydata').append("<div id='stockopname_dialog'></div>");
    }
    $("#stockopname_dialog").load(url + 'stockopname/add', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'NEW STOCK OPNAME',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    if ($("#stockopname_add_form").valid()) {
                        $.post(url + 'stockopname/save', $("#stockopname_add_form").serializeObject(), function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                $("#rates_dialog").dialog('close');
                                stockopname_edit(result.id)
                                stockopname_search($('#offset').val());
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

function stockopname_edit(id) {
    if ($('#stockopname_dialog')) {
        $('#bodydata').append("<div id='stockopname_dialog'></div>");
    }
    $("#stockopname_dialog").load(url + 'stockopname/edit/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'EDIT STOCK OPNAME',
            position: {my: "center", at: "top", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    var ids = new Array();
                    var real_stock = new Array();
                    var diff_stock = new Array();

                    $('input[name^="sop_detail8_id"]').each(function () {
                        ids.push($(this).val());
                    });

                    $('input[name^="sopd_real_stock"]').each(function () {
                        real_stock.push($(this).val());
                        console.log('Real :' + $(this).val());
                    });

                    $('input[name^="sopd_diff_stock"]').each(function () {
                        diff_stock.push($(this).val());
                        console.log('Diff :' + $(this).val());
                    });

                    $.post(url + 'stockopname/detail_update', {
                        ids: ids,
                        real_stock: real_stock,
                        diff_stock: diff_stock
                    }, function (content) {
                        var result = eval('(' + content + ')');
                        if (result.success) {
                            display_info('Save Success..!');
                        } else {
                            display_error_message(result.msg);
                        }
                    });
                },
                Close: function () {
                    $(this).dialog("close");
                }
            },
            create: function () {
                $(this).css("maxHeight", 700);
                $(this).css("maxWidth", '100%');
            }
        });
    });
}

function stockopname_add_item(stockopnameid) {

    if ($('#stockopname_add_item_dialog')) {
        $('#bodydata').append("<div id='stockopname_add_item_dialog'></div>");
    }

    $("#stockopname_add_item_dialog").load(url + 'stockopname/add_item/' + stockopnameid, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'ADD ITEM',
            position: {my: "top", at: "top", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    var itemid = new Array();
                    var unitid = new Array();
                    var stock = new Array();
                    $("#sl_sop_dd input:checkbox:checked").map(function () {
                        if (this.value !== 'on') {
                            var temp = this.value.split('/');
                            itemid.push(temp[1]);
                            unitid.push(temp[2]);
                            stock.push(temp[3]);
                        }
                    }).toArray();
                    $.post(url + 'stockopname/save_item/' + stockopnameid, {
                        itemid: itemid,
                        unitid: unitid,
                        stock: stock
                    }, function (content) {
                        var result = eval('(' + content + ')');
                        if (result.success) {
                            $("#stockopname_add_item_dialog").dialog('close');
                            stockopname_load_list_not_in(stockopnameid);
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
    });
}

function stockopname_find_item() {

    //if ($('#stockopname_form_search_item input[name="item_code"]').val() !== '') {
    $.post(url + 'stockopname/find_item', $('#stockopname_form_search_item').serializeObject(), function (content) {
        $('#stock_opname_listsearch').empty();
        $('#stock_opname_listsearch').append(content);
    });
    //}
}

function stockopname_calc_diff(id) {
    var stock = parseFloat($('#sopd_stock' + id).val());
    var real = parseFloat($('#sopd_real_stock' + id).val());
    var diff = stock - real;
    $('#sopd_diff_stock' + id).val(diff);
}

function stockopname_load_list_not_in(stockopnameid) {
    var ids = '0';
    $('input[name^="sop_detail8_id"]').each(function () {
        ids = ids + ',' + $(this).val();
    });

    $.post(url + 'stockopname/load_list_not_in', {
        detail_ids: ids,
        stockopnameid: stockopnameid
    }, function (content) {
        $('#stockopname_item_list').append(content);
    });
}

function stockopname_detail_delete(id, el) {

    if ($('#detail_delete_dialog')) {
        $('#bodydata').append("<div id='detail_delete_dialog'></div>");
    }
    $('#detail_delete_dialog').empty();
    $("#detail_delete_dialog").dialog({
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
                $.get(url + 'stockopname/detail_delete/' + id, function (content) {
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $('#detail_delete_dialog').dialog('close');
                        $(el).parent().parent().remove();
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

function stockopname_delete(id) {
    if ($('#stockopname_dialog')) {
        $('#bodydata').append("<div id='stockopname_dialog'></div>");
    }

    $("#stockopname_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: {my: "center", at: "center", of: window},
        title: 'DELETE TRANSACTION',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Delete: function () {
                $.get(url + 'stockopname/delete/' + id, function (content) {
                    console.log(content);
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $("#stockopname_dialog").dialog('close');
                        stockopname_search($('#offset').val());
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

function stockopname_posting(id) {
    if ($('#stockopname_dialog')) {
        $('#bodydata').append("<div id='stockopname_dialog'></div>");
    }

    $("#stockopname_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: {my: "center", at: "center", of: window},
        title: 'DELETE TRANSACTION',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Posting: function () {
                $.get(url + 'stockopname/posting/' + id, function (content) {
                    console.log(content);
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $("#stockopname_dialog").dialog('close');
                        stockopname_search($('#offset').val());
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
                Posting transaction will update stock in system with Real Stock<br/> \
                <br/><br/>Are you sure?</p>');
}

function stockopname_print(id, type) {
    if (type === 'p') {
        modalWin(url + 'stockopname/prints/' + id + '/' + type);
    } else {
        if ($('#stockopname_dialog')) {
            $('#bodydata').append("<div id='stockopname_dialog'></div>");
        }
        $('#stockopname_dialog').empty();
        $("#stockopname_dialog").load(url + 'stockopname/prints/' + id + '/' + type, function () {
            $(this).dialog({
                modal: true,
                width: 800,
                height: 'auto',
                title: 'VIEW STOCK OPNAME',
                position: {my: "center", at: "top", of: window},
                overlay: {
                    opacity: 0.7,
                    background: "black"
                }, buttons: {
                    Print: function () {
                        stockopname_print(id, 'p');
                    },
                    Close: function () {
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
}


function stockopname_excel(id) {
    open_target('POST', url + 'stockopname/excel/' + id, {}, '_blank');
}

function modalWin(url) {
    if (window.showModalDialog) {
        window.showModalDialog(url, "Stock Opname",
                "dialogWidth:800px;resizable=no");
    } else {
        window.open(url, 'Stock Opname',
                'width=800,toolbar=no,directories=no,status=no,linemenubar=no,scrollbars=yes,resizable=no ,modal=yes');
    }
}
