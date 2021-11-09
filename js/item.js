/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/* global url */

var itemlist = 1;
var unitid = 0;


function item_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'item');
    my_y_position = 0;
}

function item_search(offset) {
    $("#itemdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'item/search/' + offset, {
        code: $('#code_s').val(),
        descriptions: $('#description_s').val(),
        group: $('#group_s').val(),
        isstock: $('#isstock_s').val(),
        rack: $('#rack_s').val()
    }, function (content) {
        $('#itemdata').empty();
        $('#itemdata').append(content);
        $('#bvan_tbl_s_item_qzx').scrollTop(my_y_position);
    });
}
function item_add() {
    itemlist = 0;
    unitid = 0;
    if ($('#item_dialog')) {
        $('#bodydata').append("<div id='item_dialog'></div>");
    }

    $("#item_dialog").load(url + 'item/add', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            maxHeight: 500,
            position: {my: "center", at: "center", of: window},
            title: 'ADD ITEM',
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    item_save();
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    });

}

function item_save() {
    var isstock = $('#isstock').val();
    var partnumber = $('#partnumber').val();
    var groupid = $('#groupid').val();
    var woodid = $('#wood').val()
    var description = $('#description').val();
    var unitid = $('#unitid').val();
    var rack = $('#rack').val();
    var reorderpoint = ($('#reorderpoint').val() === "") ? 0 : $('#reorderpoint').val();
    var moq = $('#moq').val();
    var lt = $('#lt').val();
    var expdate = $('#expdate').val();
    var qccheck = $("#qccheck").is(":checked");
    var whs = document.getElementsByName("whs[]");
    var balance = document.getElementsByName("balance[]");
    var arrwhs = '0';
    var arrbalance = '0';
    var count_whs = 0;
    for (var i = 0; i < whs.length; i++) {
        if (whs[i].checked) {
            arrwhs += '|' + whs[i].value;
            arrbalance += '|' + balance[i].value;
            //alert(balance[i].value);
            count_whs++;
        }
    }
    //    alert(arrbalance);
    var st = 0;
    var msg = "";
    if (groupid == 0) {
        st = 1;
        msg += "- Field 'GROUP' Required<br/>";
    }
    if (partnumber == '') {
        st = 1;
        msg += "- Field 'CODE' Required<br/>";
    }
    if (unitid == 0) {
        st = 1;
        msg += "- Field 'SMALLEST UNIT' Required<br/>";
    }
    if (description == '') {
        st = 1;
        msg += "- Field 'DESCRIPTION' Required<br/>";
    }
    if (count_whs === 0) {
        st = 1;
        msg += "- Choose 'WAHREHOUSE' to store item<br/>";
    }

    if (st == 1) {
        App.errorForm.display_error_message(msg);
    } else {
        //        alert(arrbalance[0]);
        $.ajaxFileUpload({
            url: url + 'item/save',
            secureuri: false,
            type: 'post',
            fileElementId: 'fileupload',
            dataType: 'json',
            data: {
                isstock: isstock,
                partnumber: partnumber,
                groupid: groupid,
                woodid: woodid,
                description: description,
                rack: rack,
                reorderpoint: reorderpoint,
                unitid: unitid,
                moq: moq,
                lt: lt,
                expdate: expdate,
                qccheck: qccheck,
                whs: arrwhs,
                balance: arrbalance
            },
            success: function (content) {
                //                alert(content);
                var result = eval('(' + content + ')');
                if (result.success) {
                    item_search(0);
                    $('#item_dialog').dialog("close");
                } else {
                    App.errorForm.display_error_message(result.msg);
                }
            }
        });
    }
}

function item_update() {
    var id = $('#id').val();
    var partnumber = $('#partnumber').val();
    var names = $('#names').val();
    var groupid = $('#groupid').val();
    var description = $('#description').val();
    var rack = $('#rack').val();
    var isstock = $('#isstock').val();
    var reorderpoint = $('#reorderpoint').val() == "" ? 0 : $('#reorderpoint').val();
    var expdate = $('#expdate').val();
    var qccheck = $("#qccheck").is(":checked");
    var moq = $('#moq').val();
    var lt = $('#lt').val();
    var yield = $('#yield').val();
    var image = $('#image').val();
    var st = 0;
    var msg = "";
    if (groupid == 0) {
        st = 1;
        msg += "- Field 'GROUP' Required<br/>";
    }
    if (partnumber == '') {
        st = 1;
        msg += "- Field 'CODE' Required<br/>";
    }
    if (description == '') {
        st = 1;
        msg += "- Field 'DESCRIPTION' Required<br/>";
    }

    if (st == 1) {
        App.errorForm.display_error_message(msg);
    } else {
        $.ajaxFileUpload({
            url: url + 'item/update',
            secureuri: false,
            fileElementId: 'fileupload',
            dataType: 'json',
            data: {
                id: id,
                partnumber: partnumber,
                names: names,
                groupid: groupid,
                description: description,
                rack: rack,
                isstock: isstock,
                reorderpoint: reorderpoint,
                moq: moq,
                lt: lt,
                yield: yield,
                expdate: expdate,
                qccheck: qccheck,
                image: image
            },
            success: function (content) {
                var result = eval('(' + content + ')');
                if (result.success) {
//                    display_info('Update Sucess');
                    $("#item_dialog").dialog("close");
                    item_search($('#offset').val());

                } else {
                    App.errorForm.display_error_message(result.msg);
                }
            }
        });
    }

}

function item_edit(id) {

    if ($('#item_dialog')) {
        $('#bodydata').append("<div id='item_dialog'></div>");
    }

    $("#item_dialog").load(url + 'item/edit/' + id, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            maxHeight: 500,
            position: {my: "center", at: "center", of: window},
            title: 'EDIT ITEM',
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Update: function () {
                    item_update();
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        })
    });
}

function item_delete(id) {
    //alert(id);
    if (confirm("Sure?")) {
        $.get(url + 'item/delete/' + id, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                item_search($('#offset').val());
            } else {
                App.errorForm.display_error_message(result.msg);
            }

        })
    }

}

function item_choose_from_order_recommendation(el_id) {
    $("#dialog").empty();
    $("#dialog").load(url + 'item/choose_from_order_recommendation/' + el_id);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 400,
        position: [300, 50],
        title: 'Choose From Order Recommendation',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function item_searchOrderRecommendation(el_id) {
    var partnumber_s = $('#partnumber_s').val();
    var description_s = $('#description_s').val();
    var names_s = $('#names_s').val();
    var groupid_s = $('#groupid_s').val();
    var isstock_s = $('#isstock_s').val();
    $('#listsearch').empty();
    $("#listsearch").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'item/searchOrderRecommendation/' + el_id, {
        partnumber: partnumber_s,
        description: description_s,
        names: names_s,
        groupid: groupid_s,
        isstock: isstock_s
    }, function (content) {
        $('#listsearch').empty();
        $('#listsearch').append(content);
    });
}

function item_listSearch(el_id) {
	App.createContainer('item_select_temp');
	var bbox = bootbox.dialog({
		title: 'Select Item',
		message: $('#item_select_temp'),
		closeButton: true,
		size: 'large',
		//className: "modal-size-midle",
	});
	bbox.init(function () {
		$.get( 'item/listSearch/' + el_id , function (content) {
			$('#item_select_temp').empty().append(content);
		}).done(function () {
			item_searchList( el_id );
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
}

function item_chooseitem(receiver) {
	App.modalForm.create({'element':'item_chooseitem','title':'Select Item' ,'large':true, 'url':'item/listitem/' + receiver });
}

function item_set(id, receiver) {
    $('#' + receiver + 'id').val($('#id_r' + id).val());
    $('#' + receiver + 'name').val($('#names_r' + id).val());
    $('#' + receiver + 'description').val($('#descriptions_r' + id).val());
}

function item_searchList(elid) {
    var soid = 0;
    if ($('#soid').length) {
        soid = $('#soid').val();
    }
    var partnumber_s = $('#partnumber_s').val();
    var description_s = $('#description_s_item').val();
    var names_s = $('#names_s').val();
    var groupid_s = $('#groupid_s').val();
    var isstock_s = $('#isstock_s').val();

    var requesttype = 0;
    if ($('#mrdata').length) {
        if ($('#mr_input_form input[id=request_type]').length) {
            requesttype = $('#mr_input_form input[id=request_type]').val();
        }
    }

    $('#listsearch').empty();
    $("#listsearch").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'item/searchList/' + elid, {
        partnumber: partnumber_s,
        description: description_s,
        names: names_s,
        soid: soid,
        groupid: groupid_s,
        isstock: isstock_s,
        requesttype: requesttype
    }, function (content) {
        $('#listsearch').empty();
        $('#listsearch').append(content);
    });

}

function item_findlist(receiver) {
    var partnumber_s = $('#partnumber_s').val();
    var description_s = $('#description_s').val();
    var names_s = $('#names_s').val();
    $('#listsearch').empty();
    $.post(url + 'item/findlist', {
        partnumber: partnumber_s,
        description: description_s,
        names: names_s,
        receiver: receiver
    }, function (content) {
        $('#listsearch').empty();
        $('#listsearch').append(content);
    })
}

function item_selectToPr(delivery, receive) {
    var item = document.getElementsByName('itemid[]');
    var state = true;

    for (var i = 0; i < item.length; i++) {
        if (item[i].value === delivery) {
            state = false;
            break;
        }
    }
    
    if (state) {
    	
        $('#itemid' + receive).val($('#id_r' + delivery).val());
        $('#partnumber' + receive).val($('#partnumber_r' + delivery).val());
        $('#name' + receive).val($('#names_r' + delivery).val());
        $('#description' + receive).val($('#descriptions_r' + delivery).val());
        $('#moq' + receive).val($('#moq_r' + delivery).val());
        $('#unitid' + receive).empty();
        $('#unitid' + receive).append($('#unitid_r' + delivery).val());
        
        App.bootbox.close("item_select");
        
        var flag = $('#flagstockout').val();
        if (flag == 1) {
            $.get(url + 'item/itemstockforstockout/' + $('#id_r' + delivery).val(), function (content) {
                $('#tempstock' + receive).empty();
                $('#tempstock' + receive).append(content);
            });
        }
        if ($('#warehouseid' + receive).length) {
            $.get(url + 'item/getwarehouse/' + $('#id_r' + delivery).val(), function (content) {
                $('#warehouseid' + receive).empty();
                $('#warehouseid' + receive).append(content);
            });
        }
        if ($('#stock' + receive).length) {
            $('#stock' + receive).load(url + 'item/gettotalstock/' + delivery);
        }
        if ($('#soid').val() != 0) {

        }
    } else {
        App.errorForm.create({message:"- Duplicate Item Not Allowed! "});
    }
}


function item_addunit(itemid, lastunitid) {
    if ($('#item_dialog')) {
        $('#bodydata').append("<div id='item_dialog'></div>");
    }
    $("#item_dialog").load(url + 'item/addunit/' + itemid + '/' + lastunitid, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            maxHeight: 500,
            position: {my: "center", at: "center", of: window},
            title: 'ADD ITEM',
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    item_savenewunit();
                },
                Cancel: function () {
                    $("#item_dialog").dialog("close");
                }
            }
        });
    });
}


function item_deleteunit(el) {
    $(el).parent().remove();
    unitid--;
    //alert(unitid);
    $('#button-alternate-unit' + unitid).show();
    $('#button-alternate-unit-delete' + unitid).show();
}

function item_setfirststock(itemid) {

    if ($('#item_dialog')) {
        $('#bodydata').append("<div id='item_dialog'></div>");
    }

    $("#item_dialog").load(url + 'item/setfirststock/' + itemid, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'SET FIRST STOCK',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    var id = document.getElementsByName('id[]');
                    var qty = document.getElementsByName('qty[]');
                    var arrid = new Array();
                    var arrqty = new Array();
                    for (var i = 0; i < id.length; i++) {
                        arrid[i] = id[i].value;
                        arrqty[i] = qty[i].value;
                    }
                    $.post(url + 'item/savefirststock', {
                        id: arrid,
                        qty: arrqty
                    }, function () {
                        $("#item_dialog").dialog('close');
                        item_search($('#offset').val());
                    });
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

function item_deleteunit(itemid, unitid) {
    if (confirm('Delete Large Unit\nSure?')) {
        $.get(url + 'item/deleteunit/' + itemid + '/' + unitid, function () {
            item_search($('#offset').val());
        });
    }
}


function item_setprice(itemid) {
    $("#dialog").empty();
    $("#dialog").load(url + 'item/setprice/' + itemid);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Set Price',
        position: ['center', 50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function item_pricehistory(itemid) {
    $("#dialog").empty();
    $("#dialog").load(url + 'item/pricehistory/' + itemid);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Price History',
        position: ['center', 50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function item_dosetprice() {
    var itemid = $('#itemid').val();
    var price = $('#price').val();
    var curr = $('#curr').val();
    var msg = "";
    if (price == '') {
        msg += "- Field 'Price' Required<br/>";
    }
    if (id(price)) {
        msg += "- Price must be a number<br/>";
    }
    if (curr == '') {
        msg += '- Field Currency Required<br/>';
    }
    if (msg != "") {
        App.errorForm.display_error_message(msg);
    } else {
        $.post(url + 'item/dosetprice', {
            itemid: itemid,
            curr: curr,
            price: price
        }, function () {
            $("#dialog").dialog('close');
            item_search($('#offset').val());
        });
    }
}

function item_editunit(itemid) {
    $("#dialog").empty();
    $("#dialog").load(url + 'item/editunit/' + itemid);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Edit Unit Item',
        position: ['center', 50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function item_viewallrecommendedtoorder() {
    $("#dialog").empty();
    $("#dialog").load(url + 'item/viewallrecommendedtoorder');
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Recommended to Order',
        position: [30, 30],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function item_savenewunit() {
    var newunitfrom = $('#newunitfrom').val();
    var newunitto = $('#newunitto').val();
    var valueconversion = $('#valueconversion').val();
    var itemid = $('#itemid').val();
    var msg = "";
    if (newunitfrom == 0) {
        msg += "- Require field 'FROM' <br/>";
    }
    if (valueconversion == 0) {
        msg += "- Require  'Conversion' not allow '0' value<br/>";
    }

    if (msg != "") {
        App.errorForm.display_error_message(msg);
    } else {
        $.post(url + 'item/savenewunit', {
            itemid: itemid,
            newunitfrom: newunitfrom,
            newunitto: newunitto,
            valueconversion: valueconversion
        }, function () {
            item_search($('#offset').val());
            $("#item_dialog").dialog("close");
        });
    }
}

function item_setwarehouse(itemid) {
    $("#dialog").empty();
    $("#dialog").load(url + 'item/setwarehouse/' + itemid);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Configure Warehouse',
        position: ['center', 50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function item_warehouse_action(el, itemid) {
    if ($(el).is(':checked')) {
        var arrwhs = new Array();
        arrwhs[0] = $(el).val();
        if (confirm('The Item Will Share to Warehouse Choosed, Are You Sure?')) {
            $.post(url + 'item/doshare', {
                itemid: itemid,
                whs: arrwhs
            }, function () {
                display_info('Share Success..');
                $("#dialog").dialog('close');
                item_search($('#offset').val());
            });
        } else {
            $(el).attr('checked', false);
        }
    } else {
        if (confirm('The Item Will Remove from Warehouse Choosed, Are You Sure?')) {
            var warehouseid = $(el).val();
            $.post(url + 'item/deletefromwarehouse', {
                itemid: itemid,
                warehouseid: warehouseid
            }, function (content) {
                var result = eval('(' + content + ')');
                if (result.success) {
                    display_info('Remove Success..');
                    $("#dialog").dialog('close');
                    item_search($('#offset').val());
                    ;
                } else {
                    App.errorForm.display_error_message(result.msg);
                    $(el).attr('checked', true);
                }

            });
        } else {
            $(el).attr('checked', true);
        }
    }

}

function item_doshare() {
    var whs = document.getElementsByName('whs[]');
    var itemid = $('#itemid').val();
    var arrwhs = new Array();
    for (var i = 0; i < whs.length; i++) {
        if (whs[i].checked) {
            arrwhs[i] = whs[i].value;
        }
    }
    if (arrwhs.length == 0) {
        display_error('Choose Warehouse!');
    } else {
        if (confirm('Sure?')) {
            $.post(url + 'item/doshare', {
                itemid: itemid,
                whs: arrwhs
            }, function () {
                $("#dialog").dialog('close');
                item_search($('#offset').val());
            });
        }
    }
}

function item_transferstock(itemid) {
    $("#dialog").empty();
    $("#dialog").load(url + 'item/transferstock/' + itemid);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Transfer Stock',
        position: ['center', 50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function item_dotransfer() {
    var warehouseid = $('#warehouseid').val();
    var itemid = $('#itemid').val();
    var arrqty = document.getElementsByName('qty[]');
    var arrunitid = document.getElementsByName('unitid[]');
    var qty = new Array();
    var unitid = new Array();
    for (var i = 0; i < arrunitid.length; i++) {
        if (arrqty[i].value != 0) {
            unitid.push(arrunitid[i].value);
            qty.push(arrqty[i].value);
        }
    }

    if (unitid.length > 0) {
        if (confirm('Sure?')) {
            $.post(url + 'item/dotransfer', {
                itemid: itemid,
                unitid: unitid,
                qty: qty,
                warehouseid: warehouseid
            }, function () {
                item_search($('#offset').val());
                ;
                $("#dialog").dialog('close');

            });
        }
    } else {
        App.errorForm.display_error_message('No Qty to Transfer');
    }
}

function item_torecive(itemid) {
    $("#dialog").empty();
    $("#dialog").load(url + 'item/torecive/' + itemid);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Need to Approve',
        position: ['center', 50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function item_approvetransfer(transferid, itemid) {
    if (confirm('Sure?')) {
        $.get(url + 'item/approvetransfer/' + transferid, function () {
            item_search($('#offset').val());
            ;
            item_torecive(itemid);
        });
    }
}

function item_viewtransfered(itemid) {
    $("#dialog").empty();
    $("#dialog").load(url + 'item/viewtransfered/' + itemid);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Transfer Detail',
        position: ['center', 50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function item_viewimage(filename) {
    $("#dialog4").empty();
    $("#dialog4").load(url + 'item/viewimage/' + filename);
    $("#dialog4").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Image',
        position: ['center', 50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function item_set_costing_price(itemid) {
    $("#dialog").empty();
    $("#dialog").load(url + 'item/set_costing_price/' + itemid);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Update Costing Prive',
        position: ['center', 50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function item_do_set_costing_price() {
    var itemid = $('#itemid').val();
    var price = $('#costing_price').val();
    var curr = $('#curr').val();
    var msg = "";
    if (price == '') {
        msg += "- Field 'Price' Required<br/>";
    } else {
        if (!isNumeric(price)) {
            msg += "- Price must be a number<br/>";
        }
    }
    if (curr == '') {
        msg += '- Field Currency Required<br/>';
    }
    if (msg != "") {
        App.errorForm.display_error_message(msg);
    } else {
        $.post(url + 'item/do_set_costing_price', {
            itemid: itemid,
            curr: curr,
            price: price
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                display_info("Costing Price Changed.")
                $("#dialog").dialog('close');
                item_search($('#offset').val());
                ;
            } else {
                App.errorForm.display_error_message(result.msg);
            }

        });
    }
}

function item_editunit(itemid) {
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Edit Unit',
        position: ['center', 50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    }).load(url + 'item/editunit/' + itemid);
}

function item_edit_this_unit(itemid, unitfrom) {
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 100,
        title: 'Edit Unit',
        position: ['center', 50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    }).load(url + 'item/edit_this_unit/' + itemid + '/' + unitfrom);
}

function item_do_edit_this_unit() {
    $.post(url + 'item/do_edit_this_unit', $('#item_edit_this_unit_form').serializeObject(), function (content) {
        var result = eval('(' + content + ')');
        if (result.success) {
            $("#dialog2").dialog('close');
            $("#dialog").dialog('close');
            item_search(0);
        } else {
            App.errorForm.display_error_message(result.msg);
        }
    });
}


function item_slowmoving_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'item/slowmoving');
    my_y_position = 0;
}

function item_slowmoving_search(offset) {
    $("#item_slowmoving_data").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'item/slowmoving_search/' + offset,
            $('#item_slowmoving_search_form').serializeObject()
            , function (content) {
                $('#item_slowmoving_data').empty();
                $('#item_slowmoving_data').append(content);
                $('#bvan_tbl_item_slowmoving').scrollTop(my_y_position);
                //console.log(content);
            });
}

function item_slowmoving_print() {
    open_target('post', url + 'item/slowmoving_print/0', $('#item_slowmoving_search_form').serializeObject(), '_blank');
}

function item_slowmoving_excel() {
    open_target('post', url + 'item/slowmoving_print/1', $('#item_slowmoving_search_form').serializeObject(), '_blank');
}
