
function show_parameter_base_on_ratevalue(){
	$(".group__profit_range").hide();
	$(".group__rate_range").show();
}

function show_parameter_base_on_profit(){
	$(".group__rate_range").hide();
	$(".group__profit_range").show();
}

function show_parameter(val) {
    if(val == 'condition_1') {
        $(".condition_2").hide();
        $(".condition_3").hide();
    } else if(val == 'condition_2') {
        $("." + val).show();
        $(".condition_3").hide();
    } else if(val == 'condition_3') {
        $("." + val).show();
        $(".condition_2").hide();
    } else if(val == 'condition_4') {
        $(".condition_3").show();
        $(".condition_2").show();
    }

}

function costing_pricereview_search(offset){
	var price_review_base_on = $("input[name='price_review_base_on']:checked").val();
    var ratevalue = $('#pricereview__ratevalue').val();
    
    var picklist_ratevalue = $('#pricereview__picklist_ratevalue').val();
    
    
	
    var model_codes = $('#model_codes').val();
	var code = $('#code_search').val();
    var custcode = $('#custcode_search').val();
    
    var margin = $( "#pricereview__picklist_margin" ).val();
    $("#datacosting_pricereview").html("<center><img style='padding-top:50px;' src='" + url + "images/loading1.gif'/></center>");
    $.post( url + 'costing_pricereview/search_pricereview/'+offset,{
    	price_review_base_on: price_review_base_on,
    	
    	ratevalue: ratevalue,
    	picklist_ratevalue: picklist_ratevalue,
    	
    	code: code,
        model_codes: model_codes,
        custcode: custcode,
        margin : margin,
    },function(content){
        $('#datacosting_pricereview').empty();
        $('#datacosting_pricereview').append(content);
        
        $('html, body').animate({
            scrollTop: $("#datacosting_pricereview").offset().top
        }, 1000);
        
    });
}

function costing_pricereview_search_then_print_summary(offset){
    var price_review_base_on = $("input[name='price_review_base_on']:checked").val();
	
    var start_ratevalue = $('#pricereview__start_ratevalue').val();
    var end_ratevalue = $('#pricereview__end_ratevalue').val(); 
    var range_ratevalue = $('#pricereview__range_ratevalue').val();
    var profit_percentage = $('#pricereview__profit_percentage').val();
    
    var start_profit = $('#pricereview__start_profit').val();
    var end_profit = $('#pricereview__end_profit').val(); 
    var range_profit = $('#pricereview__range_profit').val();
    var ratevalue = $('#pricereview__ratevalue').val();
    
    var port_origin_cost = $('#pricereview__port_origin_cost').val();
    var fixed_cost = $('#pricereview__fixed_cost').val();
    var variable_cost = $('#pricereview__variable_cost').val();
    var port_origin_cost = $('#pricereview__port_origin_cost').val();
    var picklist_mark_up = $('#pricereview__picklist_mark_up').val();
    var picklist_ratevalue = $('#pricereview__picklist_ratevalue').val();
	
    var target_price = $('#pricereview__target_price').val();
    
    var model_codes = $('#model_codes').val();
	var code = $('#code_search').val();
    var custcode = $('#custcode_search').val();
    var customerid = $('#customerid_search').val();
    var datefrom = $('#datefrom').val();
    var dateto = $('#dateto').val();
    var is_over_due = $( "#is_over_due:checked" ).val();
    
    var full_url = url + 'costing_pricereview/search_pricereview_then_print_summary/' + offset + "?"
	    + "price_review_base_on=" + price_review_base_on
	    
	    + "&start_ratevalue=" + start_ratevalue
	    + "&end_ratevalue=" + end_ratevalue
	    + "&range_ratevalue=" + range_ratevalue
	    + "&profit_percentage=" + profit_percentage
	    
	    + "&start_profit=" + start_profit
	    + "&end_profit=" + end_profit
	    + "&range_profit=" + range_profit
	    + "&ratevalue=" + ratevalue
	    
	    + "&port_origin_cost=" + port_origin_cost
	    + "&fixed_cost=" + fixed_cost
	    + "&variable_cost=" + variable_cost
	    + "&port_origin_cost=" + port_origin_cost
	    + "&picklist_mark_up=" + picklist_mark_up
	    + "&picklist_ratevalue=" + picklist_ratevalue
	    + "&target_price=" + target_price
	    
    	+ "&code=" + code 
    	+ "&custcode=" + custcode 
    	+ "&customerid=" + customerid 
    	+ "&datefrom=" + datefrom 
    	+ "&dateto=" + dateto
    	+ "&is_over_due=" + is_over_due
        + "&model_codes=" + encodeURIComponent(JSON.stringify( model_codes )); 
    	
    
    
    var win = window.open( full_url, '_blank');
    win.focus();
    
}

function set_as_fixed_cost_sheet(costingid, ratevalue, profit_percentage, fixed_cost, variable_cost, port_origin_cost, picklist_mark_up, picklist_ratevalue, fob_price){
    $.post( url + 'costing_pricereview/set_as_fixed_cost_sheet/',{
    	costingid: costingid,
    	ratevalue: ratevalue,
    	profit_percentage: profit_percentage,
    	fixed_cost: fixed_cost,
    	variable_cost: variable_cost,
    	port_origin_cost: port_origin_cost,
    	picklist_mark_up: picklist_mark_up,
    	picklist_ratevalue: picklist_ratevalue,
    	fob_price: fob_price,
    }).done(function (content) {
		var result = eval('(' + content + ')');
        if (result.success) {
        	Client.message.success("Price Successfully Set As Fixed Cost Sheet ...");
        	$( ".td_" + costingid ).css('background-color', '#fff');
        	$( "#td_" + costingid + "_rate_" + ratevalue + "_profit_" + profit_percentage ).css('background-color', '#fff6a5');
        } else {
        	$("input[name='selected_price_" + costingid + "']").prop('checked', false);
        	$( ".td_" + costingid ).css('background-color', '#fff');
        	Client.message.error({'message': result.msg});
        }
	}).fail(function (data) {
		$("input[name='selected_price_" + costingid + "']").prop('checked', false);
		$( ".td_" + costingid ).css('background-color', '#fff');
		Client.message.error({'message': data.msg});
	});
	return false;
}

