/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function quotation_create(rfqid){
    $("#dialog").empty();
    $("#dialog").load(url+'quotation/create/'+rfqid);    
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',        
        position: ['center',50],
        title: 'Create Quotation',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function quotation_save(){
    var rfqid = $('#rfqid').val();
    var quotationnumber = $('#quotationnumber').val();
    var quotationdate = $('#quotationdate').val();
    var quotationvalidity = $('#quotationvalidity').val();
    var msg = "";
    
    if(quotationnumber == ''){
        msg += "- Field 'Number' Required <br/>";
    }
    if(quotationdate == ''){
        msg += "- Field 'Date' Required <br/>";
    }
    if(quotationvalidity == ''){
        msg += "- Field 'Quotation Validity' Required <br/>";
    }
    if(msg!=""){
        display_error_message(msg);
    }else{        
        $.post(url+'quotation/save',{
            rfqid: rfqid,
            quotationnumber: quotationnumber,
            quotationdate: quotationdate,
            quotationvalidity: quotationvalidity
        },function(){
            $("#dialog").dialog('close');
            rfq_view();
        })
    }
}

function quotation_edit(rfqid){
    $("#dialog").empty();
    $("#dialog").load(url+'quotation/edit/'+rfqid);    
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',        
        position: ['center',50],
        title: 'Edit Quotation',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function quotation_update(){
    var rfqid = $('#rfqid').val();
    var quotationnumber = $('#quotationnumber').val();
    var quotationdate = $('#quotationdate').val();
    var quotationvalidity = $('#quotationvalidity').val();
    var msg = "";
    
    if(quotationnumber == ''){
        msg += "- Required 'NUMBER' <br/>";
    }
    if(quotationdate == ''){
        msg += "- Required 'DATE'<br/>";
    }
    if(quotationvalidity == ''){
        msg += "- Field 'Quotation Validity' Required <br/>";
    }
    if(msg!=""){
        display_error_message(msg);
    }else{
        $.post(url+'quotation/update',{
            rfqid: rfqid,
            quotationnumber: quotationnumber,
            quotationdate: quotationdate,
            quotationvalidity: quotationvalidity
        },function(){
            $("#dialog").dialog('close');
            rfq_view();
        })
    }
}

function quotation_print(soid){

}

