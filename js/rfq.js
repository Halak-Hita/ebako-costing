/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function rfq_view(){
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url+'rfq')
}

function rfq_add(){
    $('#messagelistcontainer').load(url+'rfq/add')
}

function rfq_insert(){
    var billto = $('#billto').val();
    var shipto = $('#shipto').val();
    var shippingaddress = $('#shippingaddress').val();
    var promiseddate = $('#promiseddate').val();
    var shipvia = $('#shipvia').val();
    var number = $('#number').val();
    var date = $('#date').val();
    var salesperson = $('#salesperson').val();    
    var testing = document.getElementsByName("testing[]");    
    var paymenttermid = $('#paymenttermid').val();
    var arrtesting = [];
    
    for(var i=0;i<testing.length;i++){
        if(testing[i].checked){
            arrtesting.push(testing[i].value);
        }
    }
    
    
    var st = 0 ;
    var msg = "";
    
    if(billto == 0){
        st=1;
        msg += "- Field 'Customer Required'<br/>";
    }
    if(shipto == 0){
        st=1;
        msg += "- Field 'Ship To'<br/>";
    }
    if(shippingaddress == ''){
        st=1;
        msg += "- Field 'Shipping Address' Required<br/>";
    }
    if(paymenttermid == 0){
        st=1;
        msg += "- Field 'Payment Term' Required<br/>";
    }
    
    if(st == 1){
        display_error_message(msg);
    }else{
        $.post(url+'rfq/insert',{
            billto: billto,
            shipto: shipto,
            shippingaddress: shippingaddress,
            promiseddate: promiseddate,
            shipvia:shipvia,
            number: number,
            date: date,
            salesperson: salesperson,
            arrtesting: arrtesting,
            paymenttermid: paymenttermid
        },function(){
            rfq_view();
        });
    }    
}

function rfq_edit(id){
    $('#messagelistcontainer').load(url+'rfq/edit/'+id);
}

function rfq_update(){
    var id = $('#id').val();
    var billto = $('#billto').val();
    var shipto = $('#shipto').val();
    var shippingaddress = $('#shippingaddress').val();
    var promiseddate = $('#promiseddate').val();
    var shipvia = $('#shipvia').val();
    var number = $('#number').val();
    var date = $('#date').val();
    var salesperson = $('#salesperson').val();    
    var paymenttermid = $('#paymenttermid').val();
    var testing = document.getElementsByName("testing[]");    
    var arrtesting = [];
    
    for(var i=0;i<testing.length;i++){
        if(testing[i].checked){
            arrtesting.push(testing[i].value);
        }
    }
    
    
    var st = 0 ;
    var msg = "";
    
    if(billto == 0){
        st=1;
        msg += "\n - Field 'Customer' Required<br/>";
    }
    if(shipto == 0){
        st=1;
        msg += "\n - Field 'Ship To' Required<br/>";
    }
    if(shippingaddress == ''){
        st=1;
        msg += "\n - Field 'Shipping Address' Required<br/>";
    }
    if(paymenttermid == 0){
        st=1;
        msg += "\n - Field 'Payment Term' Required<br/>";
    }
    if(st == 1){
        display_error_message(msg);
    }else{
        $.post(url+'rfq/update',{
            id: id,
            billto: billto,
            shipto: shipto,
            shippingaddress: shippingaddress,
            promiseddate: promiseddate,
            shipvia:shipvia,
            number: number,
            date: date,
            salesperson: salesperson,
            arrtesting: arrtesting,
            paymenttermid: paymenttermid
        },function(content){
            if(content == '1'){                
                alert('Update Success!')
            }else{
                alert('Update Faild!')
            }
            rfq_edit(id);
        });
    }    
}

function rfq_adddetail(rfqid,type){
    var _title = "";
    if(type == 1){
        _title = "Existing Model";
    }else if(type == 2){
        _title = "Customize Model";
    }else if(type == 3){
        _title = "New Model";
    }    
    $("#dialog2").empty();
    $("#dialog2").load(url+'rfq/adddetail/'+rfqid+'/'+type);    
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: [300,50],
        title: _title,
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function rfq_savefornewmodel(){
    var custcode = $('#modelcustcode0').val();
    var rfqid = $('#rfqid').val();
    var qty = $('#qty').val();
    var description = $('#description').val();
    var st = 0;
    var msg = '';
    
    if(qty == 0){
        st = 1;
        msg += "- Field 'QTY' Required <br/>";
    }
    if(description == ''){
        st = 1;
        msg += "- Description Required<br/>";
    }
    
    if(st == 1){
        display_error_message(msg)
    }else{
        var answer = true;
        if(description.length < 50){
            answer = confirm('The description of new model is too short.\n Are you Sure?')
        }
        if(answer){
            $.post(url+'rfq/savefornewmodel',{
                rfqid: rfqid,
                description: description,
                qty: qty,
                custcode: custcode
            },function(){
                rfq_edit(rfqid);
                $('#dialog2').dialog('close')
            }); 
        }
    }   
}

function rfq_savecustomizemodel(){
    var custcode = $('#modelcustcode0').val();
    var rfqid = $('#rfqid').val();
    var qty = $('#qty').val();
    var description = $('#customizedescription').val();
    var modelid = $('#modelid0').val();
    var st = 0;
    var msg = '';
    if(qty == 0){
        st = 1;
        msg += "- Field 'QTY' Required<br/>";
    }
    if(modelid == 0){
        st = 1;
        msg += "- Field 'MODEL' Required<br/>";
    }
    if(description == ''){
        st = 1;
        msg += "- Description  Required<br/>";
    }
    
    if(st == 1){
        display_error_message(msg);
    }else{
        var answer = true;
        if(description.length < 50){
            answer = confirm('The description of new model is too short.\n Are you Sure?')
        }
        if(answer){
            $.post(url+'rfq/savecustomizemodel',{
                rfqid: rfqid,
                description: description,
                qty: qty,
                modelid: modelid,
                custcode: custcode
            },function(){
                rfq_edit(rfqid);
                $('#dialog2').dialog('close')
            });
        }
    }
}


function rfq_saveexistingmodel(){
    var custcode = $('#modelcustcode0').val();
    var rfqid = $('#rfqid').val();
    var qty = $('#qty').val();
    var modelid = $('#modelid0').val();
    var st = 0;
    var msg = '';
    if(qty == 0){
        st = 1;
        msg += "- Field 'Qty' Required<br/>";
    }
    if(modelid == 0){
        st = 1;
        msg += "- Field 'Model' Required<br/>";
    }    
    if(st == 1){
        display_error_message(msg);
    }else{        
        $.post(url+'rfq/saveexistingmodel',{
            rfqid: rfqid,
            qty: qty,
            modelid: modelid,
            custcode: custcode
        },function(){
            rfq_edit(rfqid);
            $('#dialog2').dialog('close')
        });
    }
}


function rfq_updatefornewmodel(){
    var id = $('#rfqdetailid').val();
    var rfqid = $('#rfqid').val();
    var qty = $('#qty').val();
    var description = $('#description').val();
    var custcode = $('#custcode0').val();
    var st = 0;
    var msg = '';
    if(qty == 0){
        st = 1;
        msg += "- Field 'Qty' Required<br/>";
    }
    if(description == ''){
        st = 1;
        msg += "\n - Description  Required<br/>";
    }
    
    if(st == 1){
        display_error_message(msg);
    }else{
        var answer = true;
        if(description.length < 50){
            answer = confirm('The description of new model is too short.\n Are you Sure?')
        }
        if(answer){
            $.post(url+'rfq/updatefornewmodel',{
                id: id,
                description: description,
                qty: qty,
                custcode: custcode
            },function(){
                rfq_edit(rfqid);
                $('#dialog2').dialog('close')
            }); 
        }
    }   
}

function rfq_updatecustomizemodel(){
    var id = $('#rfqdetailid').val();
    var rfqid = $('#rfqid').val();
    var qty = $('#qty').val();
    var description = $('#customizedescription').val();
    var modelid = $('#modelid0').val();
    var custcode = $('#custcode0').val();
    var st = 0;
    var msg = '';
    if(qty == 0){
        st = 1;
        msg += "- Field 'Qty' Required<br/>";
    }
    if(modelid == 0){
        st = 1;
        msg += "- Field 'Model' Required<br/>";
    }
    if(description == ''){
        st = 1;
        msg += "- Description Required<br/>";
    }
    
    if(st == 1){
        display_error_message(msg);
    }else{
        var answer = true;
        if(description.length < 50){
            answer = confirm('The description of new model is too short.\n Are you Sure?')
        }
        if(answer){
            $.post(url+'rfq/updatecustomizemodel',{
                id: id,
                description: description,
                qty: qty,
                modelid: modelid,
                custcode: custcode
            },function(){
                rfq_edit(rfqid);
                $('#dialog2').dialog('close')
            });
        }
    }
}


function rfq_updateexistingmodel(){
    var id = $('#rfqdetailid').val();
    var rfqid = $('#rfqid').val();
    var qty = $('#qty').val();
    var modelid = $('#modelid0').val();
    var custcode = $('#modelcustcode0').val();
    var st = 0;
    var msg = '';
    if(qty == 0){
        st = 1;
        msg += "- Field 'Qty' Required<br/>";
    }
    if(modelid == 0){
        st = 1;
        msg += "- Field 'Model' Required<br/>";
    }    
    if(st == 1){
        display_error_message(msg);
    }else{        
        $.post(url+'rfq/updateexistingmodel',{
            id: id,
            qty: qty,
            modelid: modelid,
            custcode: custcode
        },function(){
            rfq_edit(rfqid);
            $('#dialog2').dialog('close')
        });
    }
}

function rfq_edititem(id,type){
    $("#dialog2").empty();
    $("#dialog2").load(url+'rfq/edititem/'+id+'/'+type);
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: [300,50],
        title: 'Edit',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function rfq_deleteitem(rfqid,id){
    if(confirm('Sure?')){        
        $.get(url+'rfq/deleteitem/'+id,function(content){
            rfq_edit(rfqid)
        });
    }
}




function rfq_notes(rfqdetailid){
    $("#dialog2").empty();
    $("#dialog2").load(url+'rfq/detailnotes/'+rfqdetailid);
    $("#dialog2").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: [300,50],
        title: 'Notes',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function rfq_process(rfqid){
    if(confirm('Sure?')){
        $.get(url+'rfq/process/'+rfqid,function(){            
            rfq_view();
        });
    }
}

function rfq_quotation(rfqid){
    var ischeck = $('#quokind'+rfqid).prop('checked');    
    $("#dialog").load(url+'rfq/quotation/'+rfqid+'/'+ischeck);    
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',        
        position: [200,20],
        title: 'Quotation',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });    
}
var inputvalue = 0;
function rfq_changestatus(el,rfqid){
    var status = $(el).val();
    if(status == 1){
        $("#dialog").empty();
        $("#dialog").load(url+'rfq/approve/'+rfqid);
        $("#dialog").dialog({
            modal: true,        
            position: ['center',50],
            width: 'auto',
            height: 'auto',
            title: 'Approve',
            overlay: {
                opacity: 0.7,
                background: "black"
            }
        });
    }else if(status == 2){
        if(confirm('Close the RFQ')){
            $.get(url+'rfq/close/'+rfqid,function(){
                rfq_searh(0);
            });
        }
    }
    rfq_searh(0);
}

function rfq_checkAll(el){
    if(el.checked){
        $("input[name='modelid[]']").attr('checked', true);
    }else{
        $("input[name='modelid[]']").attr('checked', false);
    }   
}

function rfq_doapprove(){
    var rfqid = $('#rfqid').val();
    var dateapprove = $('#dateapprove').val();
    var pocustomer = $('#pocustomer').val();
    var tempmodelid = document.getElementsByName('modelid[]');
    var arrmodel = new Array();
    var msg = "";
    
    for(var i=0;i<tempmodelid.length;i++){
        if(tempmodelid[i].checked){
            arrmodel.push(tempmodelid[i].value);
        }
    }
    
    if(dateapprove == ""){
        msg += "- Please Set Date Approve<br/>";
    }
    if(arrmodel.length == 0){
        msg += "- Please Item model to approve<br/>";
    }
    
    if(msg != ""){
        display_error_message(msg);
    }else{
        if(confirm('Sure?')){
            $.ajaxFileUpload({
                url         :url+'rfq/doapprove',
                secureuri   :false,
                fileElementId  :'fileupload',
                dataType    : 'json',
                data        : {
                    'rfqid': rfqid,
                    'dateapprove': dateapprove,
                    'pocustomer': pocustomer,
                    'modelid': arrmodel
                },
                success  : function (content){
                    if(content != 1){
                        alert(content);
                    }else{
                        rfq_searh(0);
                        $("#dialog").dialog('close');
                    }
                }
            });
        }
    }
}

function rfq_searh(offset){
    var rfqno = $('#rfqno_s').val();
    var datefrom = $('#datefrom_s').val();
    var dateto = $('#dateto_s').val();
    var customerid = $('#customerid_s').val();
    var status = $('#status_s').val();
    $("#rfqdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url+'rfq/searh/'+offset,{
        rfqno: rfqno,
        datefrom: datefrom,
        dateto: dateto,
        customerid: customerid,
        status: status
    },function(content){
        $('#rfqdata').empty();
        $('#rfqdata').append(content);
    });
}

function rfq_delete(id){
    if(confirm('Sure?')){
        $.get(url+'rfq/delete/'+id,function(){
            rfq_view();
        });
    }
}

function rfq_item_attachment(rfqitemid,rfqid){
    $("#dialog").empty();
    $("#dialog").load(url+'rfq/detail_attachment/'+rfqitemid+'/'+rfqid);
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: [300,50],
        title: 'Attachment',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function rfq_upload_detail_attachment(){
    var rfqdetailid = $('#rfqdetailid_upload').val();
    var rfqid = $('#rfqid_upload').val();
    var title = $('#title_upload').val();
    var fileupload = $('#fileupload').val();
    var msg = '';
    if(title == ''){
        msg += "- Field 'Title' Required<br/>";
    }
    if(fileupload == ''){
        msg += "- Field 'File' Required";
    }
    if(msg != ''){
        display_error_message(msg);
    }else{
        $.ajaxFileUpload({
            url         :url+'rfq/upload_detail_attachment',
            secureuri   :false,
            fileElementId  :'fileupload',
            dataType    : 'json',
            data        : {
                'rfqdetailid': rfqdetailid,
                'title':title
            },
            success  : function (content){                
                rfq_item_attachment(rfqdetailid,rfqid)
            }
        });
    }
}

function rfq_delete_detail_attachment(id,rfqdetailid,rfqid,filename){
    if(confirm('Sure to delete Data?')){
        $.post(url+'rfq/delete_detail_attachment',{
            id: id,
            filename: filename
        },function(content){
            var result = eval('('+content+')');            
            if(result.success){                
                rfq_item_attachment(rfqdetailid,rfqid);
            } else {
                display_error_message(result.msg);
            }
        });
    }

}

