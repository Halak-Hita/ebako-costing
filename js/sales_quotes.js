/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/* global url */

var sales_quotes_last_tab = '#model_upholstry_56y';

function sales_quotes_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'sales_quotes');
    my_y_position = 0;
}

function display_info(msg) {

}

function sales_quotes_viewdetail(id, el_tab) {
    $("#sales_quotesdetail").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    //$("input[name='mdl[]']").attr('checked', false);
    $('#mdlid' + id).attr('checked', true);
    $('#sales_quotesid').val(id);

    Client.message.saving("Loading Quotation Detail...");

    $.get(url + 'sales_quotes/viewdetail/' + id, function (content) {
        $('#sales_quotesdetail').empty();
        $('#sales_quotesdetail').append(content);
        Client.message.success("Quotation Detail Successfully Loaded...");

//        $('html, body').animate({
//            scrollTop: $("#sales_quotes_detail_56y").offset().top
//        }, 1000);
    });
}
function sales_quotes_choose(temp, id) {
    $("#dialog4").load(url + 'sales_quotes/lists/' + temp + '/' + id + '/0');
    $("#dialog4").dialog({
        modal: true,
        width: 'auto',
        height: 400,
        title: 'Model List',
        position: [150, 50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function sales_quotes_choose2(temp, id) {
    var billto = $('#billto').val();
    if (billto == 0) {
        App.errorForm.create({message: 'Please Choose Customer First !'});
    } else {
        $("#dialog4").load(url + 'sales_quotes/lists/' + temp + '/' + id + '/' + billto);
        $("#dialog4").dialog({
            modal: true,
            width: 'auto',
            height: 400,
            title: 'Model List',
            position: [150, 50],
            overlay: {
                opacity: 0.7,
                background: "black"
            }
        });
    }

}


function sales_quotes_chooseitem(tempid, tempname) {
    $('#bodydata').append("<div id='dialogtemp'></div>");
    $("#dialogtemp").load(url + 'sales_quotes/chooseitem/' + tempid + '/' + tempname);
    $("#dialogtemp").dialog({
        modal: true,
        width: 1000,
        height: 400,
        title: 'Choose Item',
        position: ['center', 50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}


function display_error(error_str) {
    var regex = /(<([^>]+)>)/ig;
    var result = error_str.replace(regex, "");
    alert(result);
}

function sales_quotes_imageview2(filename) {
    $("#dialog").empty();
    $("#dialog").load(url + 'sales_quotes/imageview/' + filename);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: [80, 50],
        title: 'Image',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function sales_quotes_imageview(filename) {
    App.createContainer('sales_quotes_imageview_temp');
    var bbox = bootbox.dialog({
        title: 'Image',
        message: $('#sales_quotes_imageview_temp'),
        closeButton: true,
    });
    bbox.init(function () {
        $.get(url + 'sales_quotes/imageview/' + filename, function (content) {
            $('#sales_quotes_imageview_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}


function sales_quotes_search(offset) {
    if (undefined == offset) {
        offset = 0;
    }

    var sq_number_id = $('#sq_number_id').val();
    var customerid = $('#sq_customerid_search').val();
    $("#sales_quotesdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'sales_quotes/search/' + offset, {
        sq_number_id: sq_number_id,
        customerid: customerid
    }, function (content) {
        $('#sales_quotesdata').empty();
        $('#sales_quotesdata').append(content);

        $('#sales_quotesdetail').empty();
    });
}

function sales_quotes_search2(offset) {
    var sq_number_id = $('#sq_number_id').val();
    var customerid = $('#sq_customerid_search').val();
    $.post(url + 'sales_quotes/search2/' + offset, {
        sq_number_id: sq_number_id,
        customerid: customerid
    }, function (content) {
        $('#searchsales_quotesdata').empty();
        $('#searchsales_quotesdata').append(content);
    });
}

function sales_quotes_finishingaction() {
    var finishingid = $('#finishingid').val();
    if (finishingid == 'other') {
        alert('test');
    }
}
function sales_quotes_delete(sqid) {
    if (confirm('Are you sure want to delete this Quotation?')) {
        $.get(url + 'sales_quotes/delete/' + sqid, function () {
            $('#modeldetail').empty();
            sales_quotes_search($('#offset').val());
            Client.message.success("Quotation deleted successfully ...");
        }).fail(function (xhr, ajaxOptions, thrownError) {
            Client.message.error("Delete data error...!");
        });
    }
}
function print_quotation(sales_quotesid) {
    var wood = document.querySelector('#wood_id:checked') !== null;
    var veneer = document.querySelector('#veneer_id:checked') !== null;
    var upstype = document.querySelector('#upstype_id:checked') !== null;
    var ship_conf = document.querySelector('#ship_conf_id:checked') !== null;
    var fabric = document.querySelector('#fabric_id:checked') !== null;
    var packing = document.querySelector('#packing_id:checked') !== null;
    var qtypp = document.querySelector('#qtypp_id:checked') !== null;
    var other = document.querySelector('#other_id:checked') !== null;
    var box_dim = document.querySelector('#box_dim_id:checked') !== null;
    var cube = document.querySelector('#cube_id:checked') !== null;
    var leather = document.querySelector('#leather_id:checked') !== null;
   // alert(wood + ' ' + veneer);
    if (sales_quotesid != 0) {
        //var url = "<?php echo base_url() ?>";
        var full_url = url + "costing_pricelist/print_quotation?id="+sales_quotesid
                + "&wood=" + wood
                + "&veneer=" + veneer
                + "&upstype=" + upstype
                + "&ship_conf=" + ship_conf
                + "&fabric=" + fabric
                + "&leather=" + leather
                + "&packing=" + packing
                + "&qtypp=" + qtypp
                + "&other=" + other
                + "&box_dim=" + box_dim
                + "&cube=" + cube
                ;
                //alert(full_url);
            var win = window.open(full_url, '_blank');
        //window.open(url + 'costing_pricelist/print_quotation/' + sales_quotesid, '_blank');
    } else {
        alert('Choose Model');
    }
}