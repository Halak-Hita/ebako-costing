
function user_view(){
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url+'user');
}

function user_changepassword(){
    $("#dialog_temp").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $("#dialog_temp").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        maxHeight: 500,
        title: 'CHANGE PASSWORD',
        position: ['center', 20],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    }).load(url + 'user/changepassword');
}

function user_adminchangepassword(userid){
	App.createContainer('user_adminchangepassword_temp');
	var bbox = bootbox.dialog({
		title: 'Change Password',
		message: $('#user_adminchangepassword_temp'),
		closeButton: true,
		size: 'large',
		className: "modal-size-midle",
		
		buttons: {
	        Save: {
	        	label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                	user_dochangepassword();
	            	return false;
	            }
	        },
	        Cancel: {
	            label: 'Cancel',
	            className: 'btn-danger'
	        }
	    },
	});
	bbox.init(function () {
		$.get( url + 'user/adminchangepassword/' + userid, function (content) {
			$('#user_adminchangepassword_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
	
}

function user_dochangepassword(){
    var userid = $('#userid').val();
    var newpasswrod = $('#newpasswrod').val();
    var renewpasswrod = $('#renewpasswrod').val();
    if(newpasswrod != ''){
        if(newpasswrod == renewpasswrod){
            $.post(url+'user/dochangepassword',{
                userid: userid,
                newpassword: newpasswrod
            },function(content){
                var result = eval('('+content+')');            
                if(result.success){
                	App.bootbox.close("user_adminchangepassword");
                	Client.message.success("Change Password Success ...");
                } else {
                	bbox.modal("hide");
        			Client.message.error({'data': data});
                }                
            });
        }
        else{
            display_error_message("Password not match");
        }
    }else{
        display_error_message("Please type new password!");
    }
}

function user_add(){    
	App.createContainer('user_add_temp');
	var bbox = bootbox.dialog({
		title: 'Add User',
		message: $('#user_add_temp'),
		closeButton: true,
		buttons: {
	        Save: {
	        	label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                	user_save();
	            	return false;
	            }
	        },
	        Cancel: {
	            label: 'Cancel',
	            className: 'btn-danger'
	        }
	    },
	});
	bbox.init(function () {
		$.get( url+'user/add', function (content) {
			$('#user_add_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
}

function user_save(){
    var id = $('#id').val();
    var departmentid = $('#departmentid').val();
    var password = $('#password').val();
    var repassword = $('#repassword').val();
    var adminwhsfor = $('#adminwhsfor').val();
    var purchasinggroup = $('#purchasinggroup').val();
    var optiongroup = -1;
    var msg = "";
    if(id == 0){
        msg += "- Require Field 'ID'<br/>";
    }
    
    if(departmentid==0){
        msg += "- Require Field 'Department'<br/>";        
    }else{
        if(departmentid == 10){
            optiongroup = adminwhsfor;
        }else if(departmentid == 8){
            optiongroup = purchasinggroup;
        }
    }
    
    
    if(password == ''){
        msg += "- Require Field 'Password'<br/>";
    }
    
    if(repassword == ''){
        msg += "- Require Field 'Retype Password'<br/>";
    }
    
    if((password != '' && repassword != '')){
        if(password != repassword ){
            msg += "- Password not match<br/>";
        }
    }
    
    if(msg != ""){
        display_error_message(msg);
    }else{
        $.post(url+'user/insert',{
            id: id,
            departmentid: departmentid,
            password: password,
            optiongroup: optiongroup
        },
        function(content){           
            var result = eval('('+content+')');            
            if(result.success){
                user_search($('#offset').val());
                App.bootbox.close("user_add");
            	Client.message.success("User created successfully ...");
            } else {
            	Client.message.error({'data': result.msg});
            }
        });
    }
}

function user_config( userid ){
	App.bootbox.close("user_config");
	App.createContainer('user_config_temp');
	var bbox = bootbox.dialog({
		title: 'User Configuration for COSTING',
		message: $('#user_config_temp'),
		closeButton: true,
		//size: 'large',
		className: "modal-size-midle",
		
		buttons: {
	        Save: {
	        	label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                	user_saveconfig();
                	App.bootbox.close("user_config");
                	Client.message.success("Config Save successfully ...");
	            }
	        },
	        Cancel: {
	            label: 'Cancel',
	            className: 'btn-danger'
	        }
	    },
	});
	bbox.init(function () {
		$.get( url + 'user/config/' + userid, function (content) {
			$('#user_config_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
}

function user_configcheckall(){
    var ischeck = $('#checkall').prop('checked');
    if(ischeck == true){
        $("input[name='menu']").attr('checked', true);
    }else{
        $("input[name='menu']").attr('checked', false);
    }
}

function user_saveconfig(){
    var userid = $('#userid').val();
    var arrmenu = new Array();
    arrmenu.push("home");
    $("input:checkbox[name=menu]:checked").each(function(){
        arrmenu.push($(this).val());
    });
    
    $.post(url+'user/saveconfig',{
        userid: userid,
        arrmenu: arrmenu
    },function(){
    	//user_search(0);
    });
}

function user_departmentchange(el){
    if($(el).val()==10){
        $('#adminforwarehouse').show()
    }else{
        $('#adminforwarehouse').hide()
    }
    
    if($(el).val()==8){
        $('#adminforpurchasing').show();       
    }else{
        $('#adminforpurchasing').hide();
    }
}

function user_search(offset){
    var id = $('#id_s').val();
    var name = $('#name_s').val();
    $("#userdata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url+'user/search/'+offset,{
        id: id,
        name: name
    },function(content){
        $('#userdata').empty();
        $('#userdata').append(content);
    });
}

function user_setaction(userid,accessmenu){
	App.createContainer('user_setaction_temp');
	var bbox = bootbox.dialog({
		title: 'Setting User Action',
		message: $('#user_setaction_temp'),
		closeButton: true,
		size: 'large',
		className: "modal-size-midle",
		
		buttons: {
	        Save: {
	        	label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                	user_dosetaction();
	            	return false;
	            }
	        },
	        Cancel: {
	            label: 'Cancel',
	            className: 'btn-danger'
	        }
	    },
	});
	bbox.init(function () {
		$.get( url +'user/setaction/'+userid+'/'+accessmenu, function (content) {
			$('#user_setaction_temp').empty().append(content);
		}).done(function () {
		}).fail(function (data) {
			bbox.modal("hide");
			Client.message.error({'data': data});
		});
	});
	
}

function user_dosetaction(){
    var userid = $("#userid").val();
    var accessmenu = $("#accessmenu").val();
    var action = "view";    
    $("input:checkbox[name=action]:checked").each(function(){
        action += "|"+$(this).val();        
    });
    $.post(url+'user/dosetaction',{
        userid: userid,
        accessmenu: accessmenu,
        action: action
    },function(content){
        var result = eval('('+content+')');            
        if(result.success){
            App.bootbox.close("user_setaction");
        	Client.message.success("User Set Action assign successfully ...");
        	user_config(userid);          
        } else {
            Client.message.error({'data': result.msg});
        }
    
    });
}

function user_removeaction(userid,accessmenu){
    if(confirm('Sure?')){
        $.post(url+'user/removeaction',{
            userid: userid,
            accessmenu: accessmenu
        },function(content){
            var result = eval('('+content+')');            
            if(result.success){                
                user_config(userid);
            } else {
                display_error_message(result.msg);
            }
        });
    }
}

function user_delete(userid){
    if(confirm('Sure ?')){
        $.post(url+'user/delete',{
            userid:userid
        },function(content){
            var result = eval('('+content+')');            
            if(result.success){                
                user_search(0);
            } else {
                display_error_message(result.msg);
            }
        });
    }
}

function user_enable(userid,rule){
    if(confirm('Sure ?')){
        $.post(url+'user/enable',{
            userid:userid,
            rule: rule
        },function(content){
            var result = eval('('+content+')');            
            if(result.success){                
                user_search(0);
            } else {
                display_error_message(result.msg);
            }
        });
    }
}

