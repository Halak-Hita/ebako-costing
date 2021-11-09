var Client = {
	message: {
        verifyJsonObject: function(obj, msgDefault, callBack) {
            try {
                if (obj == undefined) {
                    obj = {'message': msgDefault};
                } else if (typeof obj === "string") {
                    obj = {'message': obj};
                }
                if (obj.message !== undefined) {
                    callBack(obj);
                } else {
                    if (obj.responseText !== undefined) {
                        Client.message.error({'message': obj.responseText});
                    } else {
                        Client.message.error({'message': obj});
                    }
                }
            } catch (e) {
                if (obj.responseText !== undefined) {
                    Client.message.error({'message': obj.responseText});
                } else {
                    Client.message.error({'message': obj});
                }
            }
        },
        showThenHideMessage: function(obj) {
        	var duration = 1500;
            if (obj.duration !== undefined) {
                duration = obj.duration;
            }
            $("#top_bar_notification").fadeIn('fast').delay(duration).fadeOut('fast');
        },
        showMessage: function() {
            $("#top_bar_notification").fadeIn('fast');
        },
        hideMessage: function() {
            $("#top_bar_notification").fadeOut('fast');
        },
        info: function(obj) {
            var msgDefault = 'Info';
            Client.message.verifyJsonObject(obj, msgDefault, function(obj) {
                $("#top_bar_notification").html('<div id="message" class="message-info">' + obj.message + '</div>');
                Client.message.showThenHideMessage(obj);
            });
        },
        warning: function(obj) {
            var msgDefault = 'Something wrong...';
            Client.message.verifyJsonObject(obj, msgDefault, function(obj) {
                $("#top_bar_notification").html('<div id="message" class="message-warning">' + obj.message + '</div>');
                Client.message.showThenHideMessage(obj);
            });
        },
        progress: function(obj) {
            var msgDefault = "On Progress...";
            Client.message.verifyJsonObject(obj, msgDefault, function(obj) {
                $("#top_bar_notification").html('<div id="message" class="message-progress">' + obj.message + '</div>');
                Client.message.showThenHideMessage(obj);
            });
        },
        success: function(obj) {
            var msgDefault = "Action has successfully done...";
            Client.message.verifyJsonObject(obj, msgDefault, function(obj) {
                $("#top_bar_notification").html('<div id="message" class="message-success">' + obj.message + '</div>');
                Client.message.showThenHideMessage(obj);
            });
        },
        saving: function(obj) {
            var msgDefault = "Action has successfully done...";
            Client.message.verifyJsonObject(obj, msgDefault, function(obj) {
                $("#top_bar_notification").html('<div id="message" class="message-success">' + obj.message + '</div>');
                Client.message.showMessage();
            });
        },
        savingSuccess: function(obj) {
        	Client.message.hideMessage();
        	if(undefined == obj){
        		obj = "Successfully Saved...";
        	}
        	Client.message.success(obj);
        },
        savingError: function(obj) {
        	Client.message.hideMessage();
        	var msgDefault = "Saving error...";
            Client.message.verifyJsonObject(obj, msgDefault, function(obj) {
                $("#top_bar_notification").html('<div id="message" class="message-error">' + obj.message + '</div>');
                Client.message.showThenHideMessage(obj);
            });
        },
        showHideErrorTraceCode: function() {
            var $isShow = $("#span_message_trace_code").attr('data-is-show');
            if ($isShow == 'false') {
                $("#error_trace_code").hide();
                $("#i_message_trace_code_plus").show();
                $("#i_message_trace_code_minus").hide();
                $("#span_message_trace_code").attr('data-is-show', "true");
            } else {
                $("#error_trace_code").show();
                $("#i_message_trace_code_plus").hide();
                $("#i_message_trace_code_minus").show();
                $("#span_message_trace_code").attr('data-is-show', "false");
            }
        },
        error: function(obj) {
        	var msgDefault = "Action throw error...";
            Client.message.verifyJsonObject(obj, msgDefault, function(obj) {
                $("#top_bar_notification").html('<div id="message" class="message-error">' + obj.message + '</div>');
                Client.message.showThenHideMessage(obj);
            });
        },
    },
	
}