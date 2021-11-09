var App = {
    createAndGetContainerTemp: function($element_id){
    	if ($('#' + $element_id + '_temp').length === 0) {
            $('body').append("<div id='" + $id + "'></div>");
        }
        $('#' + $id).empty().append('<p><i class="fa fa-spin fa-spinner"></i> Loading...</p>');
        return $('#' + $element_id + '_temp');
    },
	createContainer: function ($id) {
        if ($('#' + $id).length === 0) {
            $('body').append("<div id='" + $id + "'></div>");
        }
        $('#' + $id).empty().append('<p><i class="fa fa-spin fa-spinner"></i> Loading...</p>');
    },
    loadTab: function (url) {
    	$.niftyNav('slideOut');
    	//loading page
    	$("#page-content").html('<center><button class="btn btn-sm btn-default"><span class="fa fa-spin fa-spinner"></span> Loading....</button></center>');
    	//append content
    	
    	var loadContent = function(){
    		$.get(url).done(function (content) {
	    		$("#page-content").html(content);
	    	}).fail(function (data) {
	    		$("#page-content").html('<center><button class="btn btn-sm btn-default"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Load Page Error....</button></center>');
	    	});
    	}
    	
    	setTimeout(function(){
    		loadContent();
    	},1000);
    	
    },
    bootbox: {
    	close: function(elementId){
    		$('#'+ elementId +'_temp').closest(".bootbox.modal").next(".modal-backdrop").remove();
    		$('#'+ elementId +'_temp').closest(".bootbox.modal").remove();
    		if( $('.bootbox.modal').length < 2 ){
    			$("body").removeClass("modal-open");
    			$("body").css( "padding-right", 0 );
    		}
    	},
    },
    errorForm: {
    	display_error_message: function(message){
    		App.errorForm.create({message:message});
    	},
    	create: function(param){
	    	if($('#error_modal').length != 0) {
	    		$('#error_modal').remove();
	    	}
	    	var title = "Error!...";
	    	if(param.title != undefined){
	    		title = param.title;
	    	}
	    	
			$('body').append('<div class="modal fade" id="error_modal" role="dialog">' +
				'<div class="modal-dialog" role="document">' +
			    '<div class="modal-content">'+
			        
			      	'<div class="modal-header">'+
			          '<h4 class="modal-title">'+title+'</h4>'+
			          '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
			        '</div>'+
			        
			        '<div id="error_modal_content" class="modal-body">'+
			        '</div>'+

			        '<div class="modal-footer">'+
			        	'<button type="button" class="btn btn-md btn-secondary" data-dismiss="modal">Close</button>'+
			        '</div>'+
			        
			      '</div>'+
			    '</div>'+
			'</div>');
	    	
	    	$('#error_modal').modal('show');
	    	$('#error_modal_content').html(param.message);
	    },
    },
    messageForm: {
    	create: function(param){
	    	if($('#message_modal').length != 0) {
	    		$('#message_modal').remove();
	    	}
	    	var title = "Info";
	    	if(param.title != undefined){
	    		title = param.title;
	    	}
	    	
			$('body').append('<div class="modal fade" id="message_modal" role="dialog">' +
				'<div class="modal-dialog" role="document">' +
			    '<div class="modal-content">'+
			        
			      	'<div class="modal-header">'+
			          '<h4 class="modal-title">'+title+'</h4>'+
			          '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
			        '</div>'+
			        
			        '<div id="message_modal_content" class="modal-body">'+
			        '</div>'+

			        '<div class="modal-footer">'+
			        	'<button type="button" class="btn btn-md btn-secondary" data-dismiss="modal">Close</button>'+
			        '</div>'+
			        
			      '</div>'+
			    '</div>'+
			'</div>');
	    	
	    	$('#message_modal').modal('show');
	    	$('#message_modal_content').html(param.message);
	    },
    },
    modalForm: {
	    create: function(param){
	    	if($('#modal_' + param.element).length != 0) {
	    		$('#modal_' + param.element).remove();
	    	}
	    	if(param.large == true){
	    		var modal_dialog = '<div class="modal-dialog modal-lg" role="document">';
	    	}else{
	    		var modal_dialog = '<div class="modal-dialog" role="document">';
	    	}	
	    	
			$('body').append('<div class="modal fade" id="modal_'+param.element+'" tabindex="-1" role="dialog">' +
				modal_dialog+
			    '<div class="modal-content">'+
			        
			      	'<div class="modal-header">'+
			          '<h4 class="modal-title">'+param.title+'</h4>'+
			          '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
			        '</div>'+
			        
			        '<div id="modal_'+param.element+'_content" class="modal-body">'+
			        '</div>'+
			        
			      '</div>'+
			    '</div>'+
			'</div>');
	    	
	    	$('#modal_' + param.element).modal('show');
	    	
	    	$('#modal_' + param.element+'_content').html('<center><button class="btn btn-sm btn-default"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Loading....</button></center>');
	    	
	    	$.get(param.url).done(function (content) {
	    		$('#modal_' + param.element+'_content').html(content);
	        }).fail(function (data) {
	        	$('#modal_' + param.element+'_content').html('<center><button class="btn btn-sm btn-default"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Load Page Error....</button></center>');
	        });
	    },
    
	    show: function(elementId){
	    	$('#' + elementId).modal('show');
	    },
	    hide: function(elementId){
	    	$('#' + elementId).modal('hide');
	    }
    },
    
    resetSelect2: function(el){
    	$(el).val(null).trigger('change');
    },
    isFormValid: function(el){
            var valid = $(el).parsley().validate();
            
            if (!valid) {
                //setTimeout(function() {
                //	$(el).parsley().reset();
                //}, 5000);
            }
            return valid;
    },
    activaTab: function(tab){
        $('.nav-tabs a[href="' + tab + '"]').tab('show');
    },
    serializeObject(el){
    	var form = $(el);
        var unindexed_array = form.serializeArray();
        var indexed_array = {};
        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });
        return indexed_array;
    },
}