function costing_review_view(){
	costing_review_search(0);
}

function costing_review_search(offset){
    $("#groupsdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url+'costing_review/search/'+offset,{
    	'customer_name': $('#costing_review_search_form input[name=customer_name]').val(),
    	'model_code': $('#costing_review_search_form input[name=model_code]').val()
    },function(content){
        $('#data').empty();
        $('#data').append(content);
    });
}

function costing_review_approve(costingId, offset, fobPrice, rateValue, pickListRateValue, customerId){
    console.log("hahahah");
    $("#groupsdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.get(url+'costing_review/approve/'+costingId+ '/' + customerId +'/'+offset,{
        'fobPrice': fobPrice,
        'rateValue': rateValue,
        'picklistRatevalue': pickListRateValue
    },function(content){
        $('#data').empty();
        $('#data').append(content);
    });
}