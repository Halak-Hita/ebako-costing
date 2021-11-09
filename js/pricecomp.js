/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function pricecomp_view(prid) {
    if ($('#pricecomp_data')) {
        $('#bodydata').append("<div id='pricecomp_data'></div>");
    }
    $("#pricecomp_data").load(url + 'pricecomp/view/' + prid);
    $("#pricecomp_data").dialog({
        closeOnEscape: true,
        modal: true,
        width: 'auto',
        height: 'auto',
        position: [10, 10],
        title: 'Vendor and Price Comparison',
        overlay: {
            opacity: 0.7,
            background: "black"
        },
        beforeClose: function (event, ui) {
            $.get(url + 'pr/is_complete_comparison/' + prid, function (content) {
                var result = eval('(' + content + ')');
                if (result.success) {
                    pr_search($('#offset').val())
                    pr_config_tax_and_ppn(prid);
                }
            });
        }
    });
}

function pricecomp_print(prid) {
    $("#dialog").load(url + 'pricecomp/prints/' + prid);
    $("#dialog").dialog({
        modal: true,
        width: 900,
        height: 650,
        position: 'top',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function pricecomp_addvendor(pritemid) {
    $.get(url + 'pricecomp/addvendor/' + pritemid, function (content) {
        $('#itemcom' + pritemid).append(content);
    });
}

function pricecomp_setvendor(id, prid) {
    var vendorid = $('#vendorid' + id).val();
    $.post(url + 'pricecomp/setvendor', {
        id: id,
        vendorid: vendorid
    }, function (content) {
        //display_info(content);
        pricecomp_view(prid);
    });
}

function pricecomp_setcurrency(id, prid) {
    var currencyid = $('#currencyid' + id).val();
    $.post(url + 'pricecomp/setcurrency', {
        id: id,
        currencyid: currencyid
    }, function (content) {
        //display_info(content)
        pricecomp_view(prid);
    });
}

function pricecomp_setprice(id, prid) {
    var price = parseFloat(!isNumeric($('#price' + id).val()) ? 0 : $('#price' + id).val());
    $.post(url + 'pricecomp/setprice', {
        id: id,
        price: price
    }, function (content) {
        display_info(content)
        pricecomp_view(prid);
    });
}

function pricecomp_setdiscount(id, prid) {
    var discount = (!isNumeric($('#discount' + id).val()) || $('#discount' + id).val() == '') ? 0 : $('#discount' + id).val();
    $.post(url + 'pricecomp/setdiscount', {
        id: id,
        discount: discount
    }, function (content) {
        display_info(content)
        pricecomp_view(prid);
    });
}

function pricecomp_setppn(id, prid) {
    var ppn = parseFloat(!isNumeric($('#ppn' + id).val()) ? 0 : $('#ppn' + id).val());
    $.post(url + 'pricecomp/setppn', {
        id: id,
        ppn: ppn
    }, function (content) {
        display_info(content)
        pricecomp_view(prid);
    });
}

function pricecomp_setnote(id, prid) {
    var note = $('#note' + id).val();
    $.post(url + 'pricecomp/setnote', {
        id: id,
        note: note
    }, function (content) {
        display_info(content)
        //pricecomp_view(prid);
    });
}

function pricecomp_setmatras_price(id, prid) {
    var matras_price = parseFloat(!isNumeric($('#matras_price' + id).val()) ? 0 : $('#matras_price' + id).val());
    $.post(url + 'pricecomp/set_matras_price', {
        id: id,
        matras_price: matras_price
    }, function (content) {
        display_info(content)
        pricecomp_view(prid);
    });
}

function pricecomp_used(pritemid, pricecompid, prid, itemid) {
    var msg = '';
    if ($('#currencyid' + pricecompid).val() == 0) {
        msg += " - Field 'Currency' Required <br/>";
    }
    if ($('#vendorid' + pricecompid).val() == 0) {
        msg += " - Field 'Vendor' Required <br/>";
    }
    if ($('#price' + pricecompid).val() == '' || !isNumeric($('#price' + pricecompid).val())) {
        msg += " - Field 'Price' Required a Number<br/>";
    }
    if (msg != '') {
        display_error_message(msg);
    } else {
        $.get(url + 'pricecomp/used/' + pritemid + '/' + pricecompid, function (content) {
            console.log(content);
            pricecomp_view(prid);
        });
    }
}

function pricecomp_remove(pritemid, id, prid) {
    $.get(url + 'pricecomp/remove/' + pritemid + '/' + id, function () {
        pricecomp_view(prid);
    })
}

function pricecomp_set_as_item_price(pricecompid, itemid) {
    if (confirm('Set as item price?')) {
        $.get(url + 'pricecomp/set_as_item_price/' + itemid + '/' + pricecompid, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                display_info('Update Item Price Success..!');
            } else {
                display_error_message(result.msg);
            }
        });
    }
} 