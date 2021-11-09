/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var socounter = 1;
function so_view(){
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url+'so');
}

function so_create(){
    socounter = 1;
    $('#messagelistcontainer').load(url+'so/add');
}

function so_edit(id){
    socounter = 0;
    $('#messagelistcontainer').load(url+'so/edit/'+id);
}

function so_delete(soid){
    if(confirm('Sure?')){
        $.get(url+'so/delete/'+soid, function(){
            so_view();
        })
    }
}

function so_deleteitem2(id,el){
    if(confirm("Sure?")){
        $.get(url+'so/deleteitem/'+id, function(){
            $(el).parent().parent().remove();
        });
        if(document.getElementsByName("modelid[]").length == 0){
            $('#billto').prop( "disabled", false );
        }
    }
}

function so_additem(){
    socounter++;
    $.get(url+'so/additem/'+socounter,function(content){
        $('#itemso').append(content);
    });
}

function so_additem2(){
    socounter--;
    $.get(url+'so/additem/'+socounter,function(content){
        $('#itemso').append(content);
    });
}

function so_deleteitem(el){
    $(el).parent().parent().remove();
    if(document.getElementsByName("modelid[]").length == 0){
        $('#billto').prop( "disabled", false );
    }
}

function so_insert(){
    var number = $('#number').val();
    var billto = $('#billto').val();
    var shipto = $('#shipto').val();
    var shippingaddress = $('#shippingaddress').val();
    var shipmentschedule = $('#shipmentschedule').val();
    var shipvia = $('#shipvia').val();
    var paymenttermid = $('#paymentterm').val();
    var ponumber = $('#ponumber').val();    
    var date = $('#date').val();
    var salesperson = $('#salesperson').val();    
    var testing = document.getElementsByName("testing[]");
    var modelid = document.getElementsByName("modelid[]");
    var qty = document.getElementsByName("qty[]");
    var rfqdetailid = document.getElementsByName("rfqdetailid[]");
    var st = 0 ;
    var msg = "";   
    
    
    var arrtesting = [];
    var arrmodelid = []; 
    var arrqty = [];
    var arrrfqdetailid = [];
    for(var i=0;i<testing.length;i++){
        if(testing[i].checked){
            arrtesting.push(testing[i].value);
        }
    }    
    
    if(modelid.length == 0){
        st = 1;
        msg += "- Please Add Model<br/>";
    }else{
        for(i=0;i<modelid.length;i++){
            if(modelid[i].value == 0){
                st = 1;
                msg += "- Please Choose Model<br/>";
                break;
            }else{
                arrmodelid[i] = modelid[i].value;
                arrqty[i] = qty[i].value;
                arrrfqdetailid[i] = rfqdetailid[i].value;
            }
        }
    }
    
    if(billto == 0){
        st=1;
        msg += "- Field 'CUSTOMER' Required<br/>";
    }
    if(shipto == 0){
        st=1;
        msg += "- Field 'SHIP TO' Required<br/>";
    }
    if(shippingaddress == ''){
        st=1;
        msg += "- Field 'SHIPPING ADDRESS' Required<br/>";
    }
    if(paymenttermid == 0){
        st=1;
        msg += "- Field 'PAYMENT TERM' Required<br/>";
    }    
    if(shipmentschedule == ''){
        st=1;
        msg += "- Field 'SHIPMENT SCHEDULE' Required<br/>";
    }
    
    if(st == 1){
        display_error_message(msg);
    }else{
        $.post(url+'so/insert',{
            billto: billto,
            shipto: shipto,
            shippingaddress: shippingaddress,
            shipmentschedule: shipmentschedule,
            shipvia:shipvia,
            number: number,
            date: date,
            salesperson: salesperson,
            arrtesting: arrtesting,
            ponumber: ponumber,
            paymenttermid: paymenttermid,
            modelid: arrmodelid,
            qty: arrqty,
            rfqdetailid: arrrfqdetailid
        },function(){
            so_view();
        });        
    }
}

function so_update(){
    var soid = $('#soid').val();
    var number = $('#number').val();
    var billto = $('#billto').val();
    var shipto = $('#shipto').val();
    var shippingaddress = $('#shippingaddress').val();
    var shipmentschedule = $('#shipmentschedule').val();
    var shipvia = $('#shipvia').val();
    var paymenttermid = $('#paymentterm').val();
    var ponumber = $('#ponumber').val();    
    var date = $('#date').val();
    var salesperson = $('#salesperson').val();    
    var testing = document.getElementsByName("testing[]")
    var sodetailid = document.getElementsByName("id[]");
    var modelid = document.getElementsByName("modelid[]");
    var qty = document.getElementsByName("qty[]");
    var st = 0 ;
    var msg = "";
    var arrtesting = [];
    var arrsodetailid = [];
    var arrmodelid = [];     
    var arrqty = [];
    for(var i=0;i<testing.length;i++){
        if(testing[i].checked){
            arrtesting.push(testing[i].value);
        }
    }
    
    for(i=0;i<sodetailid.length;i++){
        if(modelid[i].value == ""){
            st=1;
            msg += "- Choose Model<br/>";
            break;
        }else{
            arrsodetailid.push(sodetailid[i].value);
            arrmodelid.push(modelid[i].value);
            arrqty.push(qty[i].value);       
        }
    }
    
    if(billto == 0){
        st=1;
        msg += "- Field 'CUSTOMER' Required<br/>";
    }
    if(shipto == 0){
        st=1;
        msg += "- Field 'SHIP TO' Required<br/>";
    }
    if(shippingaddress == ''){
        st=1;
        msg += "- Field 'SHIPPING ADDRESS' Required<br/>";
    }
    if(paymenttermid == 0){
        st=1;
        msg += "- Field 'PAYMENT TERM' Required<br/>";
    }    
    if(shipmentschedule == ''){
        st=1;
        msg += "- Field 'SHIPMENT SCHEDULE' Required<br/>";
    }
    
    if(st == 1){
        display_error_message(msg);
    }else{
        $.post(url+'so/update',{
            soid: soid,
            billto: billto,
            shipto: shipto,
            shippingaddress: shippingaddress,
            shipmentschedule: shipmentschedule,
            shipvia:shipvia,
            number: number,
            date: date,
            salesperson: salesperson,
            arrtesting: arrtesting,
            ponumber: ponumber,
            paymenttermid: paymenttermid,
            sodetailid: arrsodetailid,
            modelid: arrmodelid,
            qty: arrqty
        },function(){
            so_view();
        });        
    }


}

function so_viewitem(soid){
    $("#dialog").load(url+'so/viewitem/'+soid);
    $("#dialog").dialog({
        modal: true,        
        position: 'center',
        width: 700,
        title: 'Sales Order Item',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });    
}

function so_changebillto(el){
    if($(el).val() == 0){
        $('#shipto').val(0);
        $('#shippingaddress').val('');
    }else{
        $.get(url+'customer/loadShipTo/'+$(el).val(),function(content){
            $('#shipto').empty();
            $('#shipto').append(content);
        });        
    }
}

function so_customergetAddress(el){
    if($(el).val() != 0){
        $.get(url+'customer/getAddresById/'+$(el).val(),function(content){
            $('#shippingaddress').empty();
            $('#shippingaddress').append(content);
        });
    }
}

function so_addquotation_validity(){
    $("#dialog").empty();
    $("#dialog").load(url+'so/addquotationvalidity/1');
    $("#dialog").dialog({
        modal: true,        
        position: ['center',50],
        width: 'auto',
        height: 400,
        title: 'Quotation Validity',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function so_save_quotationvalidity(){
    var flag = $('#flag').val();
    var qv_desc = $('#qv_desc').val();
    $.post(url+'so/savequotationvalidity',{
        description: qv_desc
    },function(){
        if(flag == 1){
            so_quotationvalidityreload();
            so_addquotation_validity();
        }
    })
}

function so_update_quotationvalidity(){
    var flag = $('#flag').val();
    var id = $('#id').val();
    var qv_desc = $('#qv_desc').val();
    $.post(url+'so/updatequotationvalidity',{
        id: id,
        description: qv_desc
    },function(){
        if(flag == 1){
            so_quotationvalidityreload();
            so_addquotation_validity();
        }
    })
}

function so_quotationvalidityreload(){
    $.get(url+'so/quotationvalidityoption',function(content){
        $('#quotationvalidityid').empty();
        $('#quotationvalidityid').append(content);
    })
}

function so_deletequotationvalidity(id,flag){
    if(confirm('Sure?')){
        $.get(url+'so/deletequotationvalidity/'+id,function(){
            if(flag == 1){
                so_quotationvalidityreload();
                so_addquotation_validity();
            }
        });
    }
}

function so_editquotationvalidity(id,flag){
    $.get(url+'so/editquotationvalidity/'+id+'/'+flag,function(content){
        $('#qvform').empty();
        $('#qvform').append(content);
    });
}






function so_addloadability(){
    $("#dialog").empty();
    $("#dialog").load(url+'so/addloadability/1');
    $("#dialog").dialog({
        modal: true,        
        position: ['center',50],
        width: 'auto',
        height: 400,
        title: 'LOAD ABILITY',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function so_save_loadability(){
    var flag = $('#flag').val();
    var qv_desc = $('#qv_desc').val();
    $.post(url+'so/saveloadability',{
        description: qv_desc
    },function(){
        if(flag == 1){
            so_loadabilityreload();
            so_addloadability();
        }
    })
}

function so_update_loadability(){
    var flag = $('#flag').val();
    var id = $('#id').val();
    var qv_desc = $('#qv_desc').val();
    $.post(url+'so/updateloadability',{
        id: id,
        description: qv_desc
    },function(){
        if(flag == 1){
            so_loadabilityreload();
            so_addloadability();
        }
    })
}

function so_loadabilityreload(){
    $.get(url+'so/loadabilityoption',function(content){
        $('#loadabilityid').empty();
        $('#loadabilityid').append(content);
    })
}

function so_deleteloadability(id,flag){
    if(confirm('Sure?')){
        $.get(url+'so/deleteloadability/'+id,function(){
            if(flag == 1){
                so_loadabilityreload();
                so_addloadability();
            }
        });
    }
}

function so_editloadability(id,flag){
    $.get(url+'so/editloadability/'+id+'/'+flag,function(content){
        $('#qvform').empty();
        $('#qvform').append(content);
    });
}

//Use
function so_choosequotation(){
    $("#dialog").empty();
    $("#dialog").load(url+'so/choosequotation');
    $("#dialog").dialog({
        modal: true,        
        position: ['center',50],
        width: 'auto',
        height: 400,
        title: 'Choose Quotation',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

//Use
function so_setquotation (rfqid){
    $.get(url+'rfq/getdetail/'+rfqid,function(contents){
        var res = contents.split("||");         
        $('#billto').val(res[2]);
        $('#shipto').val(res[3]);
        $('#shippingaddress').val(res[4]);
        $('#shipvia').val(res[5]);
        $('#salesperson').val(res[6]);
        var rfqtesting = res[7].split(',');        
        var testing = document.getElementsByName("testing[]");
        for(var i=0;i<testing.length;i++){             
            testing[i].checked = false;
            for(var j=0;j<rfqtesting.length;j++){
                if(testing[i].value == rfqtesting[j]){
                    testing[i].checked = true;             
                }
            }            
        }    
        $('#paymentterm').val(res[8]);
        $('#ponumber').val(res[9]);
    });
    $('#itemso').empty();
    $.get(url+'rfq/loadmodeltoso/'+rfqid,function(contents){
        $('#itemso').append(contents)
    });    
    $('#billto').prop( "disabled", true );
    $('#dialog').dialog('close');
}

function so_updatedetailstatus(soid,sodetailid,modelid,el){
    var status = $(el).val();
    var customerid = $('#billto').val();
    if(confirm('Sure?')){
        $.get(url+'so/updatedetailstatus/'+sodetailid+'/'+status+'/'+customerid+'/'+modelid,function(){
            so_edit(soid)
        });
    }
}

function so_createfinalbom(soid){
    if(confirm('Sure?')){
        $.get(url+'so/createfinalebom/'+soid,function(){
            so_edit(soid);
        });
    }    
}

function so_finishbymarketing(soid){
    if(confirm('Sure?')){
        $.get(url+'so/finishByMarketing/'+soid,function(){
            so_edit(soid);
        });
    }
}

function so_finishbyRnd(soid){
    if(confirm('Sure?')){
        $.get(url+'so/finishByRnd/'+soid,function(){
            so_edit(soid);
        });
    }
}

function so_createmrp(soid){
    if(confirm("Sure?")){
        $.get(url+'so/createmrp/'+soid,function(){
            so_edit(soid);
        });
    }
}

function so_viewmrp(soid){
    $("#dialog").empty();
    $("#dialog").load(url+'so/viewmrp/'+soid+'/0');    
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 500,        
        position: [30,30],
        title: 'Material Requirement Planning',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}


function so_search(offset){
    var so = $('#so_s').val();
    var customerid = $('#customerid_s').val();
    var shipto = $('#shipto_s').val();
    var datefrom = $('#datefrom_s').val();
    var dateto = $('#dateto_s').val();
    var status = $('#status_s').val();
    $("#sodata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url+'so/search/'+offset,{
        so: so,
        customerid: customerid,
        shipto: shipto,
        datefrom: datefrom,
        dateto: dateto,
        status: status
    },function(content){
        $('#sodata').empty();
        $('#sodata').append(content);
    });
}

function so_viewonproduction(){
    $("#dialog").empty();
    $("#dialog").load(url+'so/viewonproduction');
    $("#dialog").dialog({
        modal: true,        
        position: [100,50],
        width: 'auto',
        height: 500,
        title: 'SALES ORDER LIST',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function so_searchOnProduction(){
    var sonumber = $('#sonumber_s').val();
    var customerid = $('#customerid_s').val();
    var date = $('#date_s').val();
    $.post(url+'so/searchonproduction',{
        sonumber: sonumber,
        customerid: customerid,
        date: date
    },function(content){
        $('#listsearch').empty()
        $('#listsearch').append(content)
    });
}

function so_doproduction(soid){
    if(confirm('Sure?')){
        $.get(url+'so/updatestatus/'+soid+'/'+1,function(){
            so_search(0);
        });
    }
}

function so_dofinish(soid){
    if(confirm('Sure?')){
        $.get(url+'so/updatestatus/'+soid+'/'+2,function(){
            so_search(0);
        });
    }
}