/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* global url */

function stockout_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'stockout');
}

function stockout_search(offset) {
    var number = $('#number').val();
    var date_start = $('#date_start').val();
    var date_end = $('#date_end').val();
    var refno = $('#refno').val();
    var departmentid = $('#departmentid').val();
    var outby = $('#outby_s').val();
    var receiveby = $('#receiveby').val();
    $("#stockoutdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'stockout/search/' + offset, {
        number: number,
        date_start: date_start,
        date_end: date_end,
        refno: refno,
        departmentid: departmentid,
        outby: outby,
        receiveby: receiveby
    }, function (content) {
        $('#stockoutdata').empty();
        $('#stockoutdata').append(content);
    });
}

function stockout_printlist() {
    var number = $('#number').val();
    var date_start = $('#date_start').val();
    var date_end = $('#date_end').val();
    var refno = $('#refno').val();
    var departmentid = $('#departmentid').val();
    var outby = $('#outby').val();
    var receiveby = $('#receiveby').val();
    open_target('post', url + 'stockout/printlist', {
        number: number,
        date_start: date_start,
        date_end: date_end,
        refno: refno,
        departmentid: departmentid,
        outby: outby,
        receiveby: receiveby
    }, '_blank');
}

function stockout_viewdetail(id) {
    $("#dialog").empty();
    $("#dialog").load(url + 'stockout/prints/' + id + '/' + 2);
    $("#dialog").dialog({
        modal: true,
        width: 800,
        height: 'auto',
        position: [300, 50],
        title: 'Detail Stock Out',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function stockout_chooseoption() {
    var optionchoose = "<table width=200>" +
            "<tr>" +
            "<td colspan='2' align='center'>Reference from MR ?</td>" +
            "</tr>" +
            "<tr>" +
            "<td>" +
            "<input type='radio' name='option' value='1' style='vertical-align: middle' checked='true'/>&nbsp;&nbsp;YES" +
            "</td>" +
            "<td align=right>" +
            "<input type='radio' name='option' value='0' style='vertical-align: middle'/>&nbsp;&nbsp;No" +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<td colspan='2' align=center><button onclick='stockout_optionchoosed()'>OK</button></td>" +
            "</tr>" +
            "</table>";
    $("#dialog").empty();
    $("#dialog").append(optionchoose);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 100,
        position: ['center', 50],
        title: 'CHOOSE OPTION',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
//$('#messagelistcontainer').load(url+'stockout/add');
}

function stockout_optionchoosed() {
//    var option = $('input:radio[name=option]:checked').val();
//    $("#dialog").dialog('close');
//    if(option==0){
//        $('#messagelistcontainer').load(url+'stockout/add/'+option);
//    }else{
    $("#dialog").empty();
    $("#dialog").load(url + 'mr/viewmropen');
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 400,
        position: [300, 50],
        title: 'Choose MW',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
//} 
}

function stockout_mrchoose(mrid, st) {
    if ($('#stockout_dialog')) {
        $('#bodydata').append("<div id='stockout_dialog'></div>");
    }

    $("#stockout_dialog").load(url + 'stockout/addbychoosemr/' + mrid, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'NEW STOCK OUT',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                'Save': {
                    id: 'mr_save_88_bvn',
                    text: 'Save',
                    click: function () {
                        stockout_savebymrchoose();
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
    if (st === 1) {
        $("#dialog").dialog('close');
    }


}

function stockout_notmrchoose() {
    $('#messagelistcontainer').load(url + 'stockout/add');
}

function stockout_checkqtyout(ots, el) {
    var out = $(el).val();
    if (parseFloat(ots) < parseFloat(out)) {
        alert('Out of Outstanding');
        $(el).val('0');
    }
}

function stockout_savebymrchoose() {

    var header = {
        mrid: $('#stokout_by_mr_choose_amazon #mrid').val(),
        date: $('#stokout_by_mr_choose_amazon #date').val(),
        refno: $('#stokout_by_mr_choose_amazon #refno').val(),
        outby: $('#stokout_by_mr_choose_amazon #outby').val(),
        receiveby: $('#stokout_by_mr_choose_amazon #receiveby').val(),
        receivebyid: $('#stokout_by_mr_choose_amazon #receivebyid').val(),
        departmentid: $('#stokout_by_mr_choose_amazon #departmentid').val(),
        dept_divisionid: $('#stokout_by_mr_choose_amazon #dept_divisionid').val()
    };

    var details = [];
    $.each($("#stokout_by_mr_choose_amazon table > tbody#stockouttablebody > tr"), function (key, row) {
        var out = $(row).find("input[name='out']").val();
        if (out !== '0') {
            details.push({
                itemid: $(row).find("input[name='itemid']").val(),
                mrdetailid: $(row).find("input[name='mrdetailid']").val(),
                out: out,
                unitid: $(row).find("select[name='unitid']").val()
            });
        }
    });

    if (header.dept_divisionid === '0') {
        display_error_message("Field 'Devision' Required<br/>");
        return;
    }
    if (header.outby === '') {
        display_error_message("Field 'OUT BY ' Required");
        return;
    }

    if (details.length > 0) {
        $('#mr_save_88_bvn').prop('disabled', true);
        var object = {
            header: header,
            details: details
        };
        var param = "data=" + JSON.stringify(object);
        $.post(url + 'stockout/savebymrchoose', param, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                $('#stockout_dialog').dialog('close');
                stockout_view();
            } else {
                $('#mr_save_88_bvn').prop('enable', true);
                display_error_message(result.msg);
            }
        });
    } else {
        display_error_message("No Item to Out!");
    }

}

function stockout_save() {
    var mrid = $('#mrid').val();
    var date = $('#date').val();
    var refno = $('#refno').val();
    var outby = $('#outby').val();
    var soid = $('#soid').val();
    var receiveby = $('#receiveby').val();
    var departmentid = $('#departmentid').val();
    var itemid = document.getElementsByName('itemid[]');
    var out = document.getElementsByName('qty[]');
    var unitid = document.getElementsByName('unitid[]');
    var arrname = Array('DEPARTMENT', 'OUT BY', 'RECEIVE BY');
    var arrvalue = Array(departmentid, outby, receiveby);
    var arrtype = Array(Array('notzero'), Array('notempty'), Array('notempty'));
    var arritemid = new Array();
    var arrunitid = new Array();
    var arrout = new Array();
    var msg = "";
    for (var i = 0; i < itemid.length; i++) {
        if (!notempty(itemid[i].value)) {
            msg = msg + "Some Item Field Not Fill<br/>";
            break;
        }
        if (!notzero(out[i].value) || !numeric(out[i].value)) {
            msg = msg + "Qty must be Numeric and not allowed 0<br/>";
            break;
        }
        if (!notzero(unitid[i].value)) {
            msg = msg + "Please Choose Unit For Each Item<br/>";
            break;
        }

        arritemid[i] = itemid[i].value;
        arrunitid[i] = unitid[i].value;
        arrout[i] = out[i].value;
    }

    msg = msg + isValid(arrname, arrvalue, arrtype);
    if (msg.replace(/\s/g, "") == "") {
        $.post(url + 'stockout/save', {
            mrid: mrid,
            date: date,
            refno: refno,
            outby: outby,
            receiveby: receiveby,
            departmentid: departmentid,
            itemid: arritemid,
            unitid: arrunitid,
            out: arrout,
            soid: soid
        }, function () {
            stockout_view();
        });
    } else {
        display_error_message(msg);
    }
}

function stockout_update() {
    var id = $('#id').val();
    var mrid = $('#mrid').val();
    var date = $('#date').val();
    var refno = $('#refno').val();
    var outby = $('#outby').val();
    var receiveby = $('#receiveby').val();
    var departmentid = $('#departmentid').val();
    var dept_divisionid = $('#dept_divisionid').val();
    var itemid = document.getElementsByName('itemid[]');
    var out = document.getElementsByName('out[]');
    var unitid = document.getElementsByName('unitid[]');
    var mrdetailid = document.getElementsByName('mrdetailid[]');
    var stockoutdetailid = document.getElementsByName('stockoutdetailid[]');
    var arritemid = new Array();
    var arrunitid = new Array();
    var arrout = new Array();
    var arrstockoutdetailid = new Array();
    var arrmrdetailid = new Array();
    var msg = "";
    if (dept_divisionid === 0) {
        msg = msg + "Field 'Devision' Required<br/>";
    }
    for (var i = 0; i < itemid.length; i++) {
        if (!notempty(itemid[i].value)) {
            msg = msg + "Some Item Field Not Fill<br/>";
            break;
        }
//        if (!notzero(out[i].value) || !numeric(out[i].value)) {
//            msg = msg + "Qty must be Numeric and not allowed 0<br/>";
//            break;
//        }
        if (!notzero(unitid[i].value)) {
            msg = msg + "Please Choose Unit For Each Item<br/>";
            break;
        }
        arritemid[i] = itemid[i].value;
        arrunitid[i] = unitid[i].value;
        arrout[i] = out[i].value;
        arrstockoutdetailid[i] = stockoutdetailid[i].value;
        arrmrdetailid = mrdetailid[i].value;
    }
    if (msg != "") {
        display_error_message(msg);
    } else {
        $.post(url + 'stockout/update', {
            id: id,
            mrid: mrid,
            date: date,
            refno: refno,
            outby: outby,
            receiveby: receiveby,
            departmentid: departmentid,
            dept_divisionid: dept_divisionid,
            itemid: arritemid,
            unitid: arrunitid,
            stockoutdetailid: arrstockoutdetailid,
            mrdetailid: arrmrdetailid,
            out: arrout
        }, function () {
            stockout_view();
        });
    }

}

function stockout_checkstock(id) {
    var itemid = $('#itemid' + id).val();
    var qtyout = $('#qty' + id).val();
    var unitid = $('#unitid' + id).val();
    //alert(itemid+'#'+qtyout+'#'+unitid);
    if (isNaN(qtyout)) {
        display_error_message('- Qty not valid');
        $('#qty' + id).val('0');
    } else {
        if (qtyout != 0 && unitid != 0) {
            $.get(url + 'item/isavailablestock/' + itemid + '/' + unitid + '/' + qtyout, function (content) {
//alert(content);
                if (content == 0) {
                    display_error_message('Not Enough Stock!');
                    $('#qty' + id).val('0');
                    $('#unitid' + id).val('0');
                }
            });
        }
    }

}

var counter_stockout = 0;
function stockout_additem() {
    counter_stockout++;
    //alert(counter);
    $.get(url + 'stockout/additem/' + counter_stockout, function (content) {
        $('#stockouttablebody').append(content);
    });
}


function stockout_edit(id, mrid) {
    $('#messagelistcontainer').load(url + 'stockout/edit/' + id + '/' + mrid);
}

function stockout_deleteitem2(el, id) {
    if (confirm('Sure?')) {
        $.get(url + 'stockout/deleteitem/' + id, function () {
            $(el).parent().parent().remove();
        });
    }
}

function stockout_delete(id) {
    if (confirm('Sure?')) {
        $.get(url + 'stockout/delete/' + id, function () {
            stockout_view();
        });
    }
}

function stockout_isavailable(id) {
    var ots = $('#ots' + id).val();
    var stock = $('#stock' + id).val();
    var out = $('#out' + id).val();
    //alert(ots+'/'+stock);

    if (out != "") {
        if (isNumeric(out)) {
            if (parseFloat(stock) < parseFloat(out)) {
                display_error_message('Out of stock<br/>Current Stock = ' + stock);
                $('#out' + id).val('0');
            }
            if (parseFloat(ots) < parseFloat(out)) {
                display_error_message('Out of Outstanding<br/>Current Outstanding = ' + ots);
                $('#out' + id).val('0');
            }
            if (parseFloat(out) < 0) {
                display_error_message('Not Allow Negative number');
                $('#out' + id).val('0');
            }
        } else {
            display_error_message('Please enter a number');
            $('#out' + id).val('0');
        }
    } else {
        display_error_message('Not allow null value');
        $('#out' + id).val('0');
    }
}

function stockout_receive(mrid, stockoutid) {
    if (confirm("Sure ?")) {
        $.get(url + 'stockout/receive/' + stockoutid, function () {
            mr_newreceive(mrid);
            mr_view();
        });
    }
}

function stockout_receive2(id) {
    if ($('#stockout_dialog')) {
        $('#bodydata').append("<div id='stockout_dialog'></div>");
    }

    $("#stockout_dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        maxHeight: 500,
        position: {my: "center", at: "center", of: window},
        title: 'Receiving Confirmation',
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            OK: function () {
                $.post(url + 'stockout/do_receive', {id: id}, function (content) {
                    var result = eval('(' + content + ')');
                    if (result.success) {
                        $('#stockout_dialog').dialog('close');
                        materialreceive_search($('#offset').val());
                    } else {
                        display_error_message(result.msg);
                    }
                });
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    }).html('Are you sure to receive this stock?');
}

function stockout_report_form() {

    if ($('#stockout_dialog')) {
        $('#bodydata').append("<div id='stockout_dialog'></div>");
    }
    $("#stockout_dialog").load(url + 'stockout/report_form', function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            title: 'Sock Out Report Dialog',
            position: {my: "center", at: "center", of: window},
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
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

function stockout_rpt_gennerate(st) {
    if (st === 1) {
        $("#sto_rpt_temp_preview").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
        $.post(url + 'stockout/rpt_generate/' + st, $('#sto_rpt_form').serializeObject(), function (content) {
            $('#sto_rpt_temp_preview').empty();
            $('#sto_rpt_temp_preview').append(content);
        });
    } else {
        open_target('post', url + 'stockout/rpt_generate/' + st, $('#sto_rpt_form').serializeObject(), '_blank');
    }
}