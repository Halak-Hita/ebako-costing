/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/* global url */

var my_y_position = 0;
/*
document.write('<script type="text/javascript" src="js/employee.js"></script>');
document.write('<script type="text/javascript" src="js/user.js"></script>');
document.write('<script type="text/javascript" src="js/model.js"></script>');
document.write('<script type="text/javascript" src="js/groups.js"></script>');
document.write('<script type="text/javascript" src="js/item.js"></script>');
document.write('<script type="text/javascript" src="js/wood.js"></script>');
document.write('<script type="text/javascript" src="js/unit.js"></script>');
document.write('<script type="text/javascript" src="js/pr.js"></script>');
document.write('<script type="text/javascript" src="js/department.js"></script>');
document.write('<script type="text/javascript" src="js/vendor.js"></script>');
document.write('<script type="text/javascript" src="js/customer.js"></script>');
document.write('<script type="text/javascript" src="js/comment.js"></script>');
document.write('<script type="text/javascript" src="js/attachment.js"></script>');
document.write('<script type="text/javascript" src="js/component.js"></script>');
document.write('<script type="text/javascript" src="js/pricecomp.js"></script>');
document.write('<script type="text/javascript" src="js/po.js"></script>');
document.write('<script type="text/javascript" src="js/gr.js"></script>');
document.write('<script type="text/javascript" src="js/so.js"></script>');
document.write('<script type="text/javascript" src="js/mr.js"></script>');
document.write('<script type="text/javascript" src="js/bom.js"></script>');
document.write('<script type="text/javascript" src="js/bank.js"></script>');
document.write('<script type="text/javascript" src="js/inventory.js"></script>');
document.write('<script type="text/javascript" src="js/stockout.js"></script>');
document.write('<script type="text/javascript" src="js/costing.js"></script>');
document.write('<script type="text/javascript" src="js/validation.js"></script>');
document.write('<script type="text/javascript" src="js/rate.js"></script>');
document.write('<script type="text/javascript" src="js/rates.js"></script>');
document.write('<script type="text/javascript" src="js/finishing.js"></script>');
document.write('<script type="text/javascript" src="js/marble.js"></script>');
document.write('<script type="text/javascript" src="js/latherinlay.js"></script>');
document.write('<script type="text/javascript" src="js/packing.js"></script>');
document.write('<script type="text/javascript" src="js/quotation.js"></script>');
document.write('<script type="text/javascript" src="js/rfq.js"></script>');
document.write('<script type="text/javascript" src="js/setup.js"></script>');
document.write('<script type="text/javascript" src="js/directlabour.js"></script>');
document.write('<script type="text/javascript" src="js/itemquality.js"></script>');
document.write('<script type="text/javascript" src="js/itemrequest.js"></script>');
document.write('<script type="text/javascript" src="js/position.js"></script>');
document.write('<script type="text/javascript" src="js/servicerequest.js"></script>');
document.write('<script type="text/javascript" src="js/warehouse.js"></script>');
document.write('<script type="text/javascript" src="js/modeltype.js"></script>');
document.write('<script type="text/javascript" src="js/materialrequisition.js"></script>');
document.write('<script type="text/javascript" src="js/materialreceive.js"></script>');
document.write('<script type="text/javascript" src="js/outstandingtostockout.js"></script>');
document.write('<script type="text/javascript" src="js/com.js"></script>');
document.write('<script type="text/javascript" src="js/currency.js"></script>');
document.write('<script type="text/javascript" src="js/returnproduction.js"></script>');
//document.write('<script type="text/javascript" src="js/transferstock.js"></script>');
*/
function isNumeric(input) {
    var number = /^\-{0,1}(?:[0-9]+){0,1}(?:\.[0-9]+){0,1}$/i;
    var regex = RegExp(number);
    return regex.test(input) && input.length > 0;
}

function display_error_message(msg) {
    $('#error').remove();
    $('#bodydata').append("<div id='error' style='color:red;max-width:400px;height:400px' title='Error!'></div>");
    $("#error").empty();
    $("#error").append(msg);
    $("#error").dialog({
        resizable: false,
        height: 'auto',
        modal: true,
        position: {my: "center", at: "center", of: window},
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });
}

function display_info(msg) {
	/*
    $('#info').remove();
    $('#bodydata').append("<div id='info' style='color:green;max-width:400px;height:400px'></div>");
    $("#info").empty();
    $("#info").append(msg);
    $("#info").dialog({
        width: 200,
        height: 'auto',
        position: ['right', 'bottom'],
        title: 'Info!',
        overlay: {
            opacity: 0.1,
            background: "black"
        }
    });
    $('#info').delay(5000).fadeOut(1000, function () {
        $('#info').remove();
    })
    */
	App.messageForm.create({'element':'model','message':msg});
    $('#info').delay(5000).fadeOut(1000, function () {
        $('#info').remove();
    })
}


function employee_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'employee');
}

function report_view() {
    $('#messagelistcontainer').load(url + 'gr/report')
}

function stockopname_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'stockopname');
}

function stockcard_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'stockcard');
}

function servicerequest_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'servicerequest');
}

function costcenter_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'costcenter');
}

$.fn.serializeObject = function ()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


function open_window_popup(href, title) {
    var w = 700;
    var h = 500;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    if (window.showModalDialog) {
        window.showModalDialog(href, title, 'dialogWidth=' + w + ', dialogHeight=' + h + ', dialogTop=' + top + ', dialogLeft=' + left);
    } else {
        window.open(href, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, modal=yes,width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        window.focus();
    }
}

open_target = function (method, url, data, target) {
    var form = document.createElement("form");
    form.action = url;
    form.method = method;
    form.target = target || "_self";
    if (data) {
        for (var key in data) {
            var input = document.createElement("textarea");
            input.name = key;
            input.value = typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];
            form.appendChild(input);
        }
    }
    form.style.display = 'none';
    document.body.appendChild(form);
    form.submit();
};

function my_scroll_position(el) {
    my_y_position = $(el).scrollTop();
}

function found_string(str) {
    if (str !== '') {
        $('#bodydata').html().replace(str, '<span style="background:yellow">' + str + '</span>');
//        $('#bodydata').html(newhtml);
    }
}

function cost_center_load_member(el, temporary) {
    $.get(url + 'costcenter/load_member/' + $(el).val(), function (content) {
        $('#' + temporary).empty();
        $('#' + temporary).append(content);
    });
}

jQuery.expr[':'].contains = function (a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};
