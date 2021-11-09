/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/* global url */

var model_last_tab = '#model_master_56y';

function model_view() {
    $("#messagelistcontainer").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $('#messagelistcontainer').load(url + 'model');
    my_y_position = 0;
}

function display_info(msg) {

}

function model_create() {
    App.createContainer('model_create_temp');
    var bbox = bootbox.dialog({
        title: 'Create Model',
        message: $('#model_create_temp'),
        onEscape: false,
        closeButton: true,
        size: 'large',
        //className: "modal-size-midle",

        buttons: {
            Save: {
                label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                    model_savenew();

                    return false;
                }
            },

            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get('model/create', function (content) {
            $('#model_create_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_copy(modelid) {
    //*******************************8
    App.createContainer('model_copy_temp');
    var bbox = bootbox.dialog({
        title: 'Copy Model',
        message: $('#model_copy_temp'),
        onEscape: false,
        closeButton: true,
        size: 'medium',
        //className: "modal-size-midle",
        buttons: {
            Update: {
                label: "<i class=\"fa fa-save\"></i> Copy",
                className: "btn btn-success",
                callback: function () {
                    model_docopy(modelid);
                    return false;
                }
            },
            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/copy/' + modelid, function (content) {
            $('#model_copy_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_copy2(modelid) {
    $("#dialog").dialog({
        modal: true,
        width: 200,
        height: 100,
        position: ['center', 50],
        title: 'Copy Model',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    }).load(url + 'model/copy/' + modelid);
}

function model_docopy() {
    var msg = "";
    var modelid = $('#modelid_copy_id').val();
    var modelno = $('#newcode').val();

    if (msg != "") {
        App.errorForm.create({'message': msg});
    } else {

        if (App.isFormValid("#form_copy_model")) {
            var data = new FormData($('#form_copy_model')[0]);
            data.set('modelid', modelid);
            data.set('modelno', modelno);

            jQuery.ajax({
                type: 'POST',
                method: 'POST',
                url: url + 'model/docopy',
                data: data,
                enctype: 'multipart/form-data',
                cache: false,
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function (data) {
                    App.bootbox.close("model_copy");
                    model_search($('#offset').val());
                    Client.message.success("Model updated successfully ...");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    Client.message.error("Update data error...!");
                },
            });

        }

    }
}
function model_docopy_def() {
    // alert ('test');
    var modelid = $('#modelid_copy_id').val();
    var modelno = $('#newcode').val();
    if (modelno !== '') {

        $.post(url + 'model/docopy', {
            modelid: modelid,
            modelno: modelno
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                $("#model_dialog").dialog('close');
                model_view();
            } else {
                App.errorForm.create({message: result.msg});
            }
        });
    } else {
        App.errorForm.create({message: '-Set model Code!'});
    }
}

function model_save() {
    var modelno = $('#modelno').val();
    var description = $('#description').val();
    var color = $('#color').val();
    var modeltypeid = $('#modeltypeid').val();
    var customerid = $('#customerid').val();
    var w = $('#w').val();
    var d = $('#d').val();
    var ht = $('#ht').val();
    var cw = $('#cw').val();
    var cd = $('#cd').val();
    var ch = $('#ch').val();
    var volume_package = $('#volume_package').val();
    var yield = $('#yield').val();
    var custcode = $('#custcode').val();
    var preparedby = $('#name-apprvove1').val();
    var checkedby = $('#name-apprvove2').val();
    var approvedby = $('#name-apprvove3').val();

    var is_temporary_photo = $("input[name='is_temporary_photo']:checked").val();

    var finishoverview = document.getElementsByName("finishoverview[]");
    var arrfinishoverview = [];
    var constructionoverview = document.getElementsByName("constructionoverview[]");
    var arrconstructionoverview = [];


    for (var i = 0; i < finishoverview.length; i++) {
        if (finishoverview[i].checked) {
            arrfinishoverview.push(finishoverview[i].value);
        }
    }

    for (i = 0; i < constructionoverview.length; i++) {
        if (constructionoverview[i].checked) {
            arrconstructionoverview.push(constructionoverview[i].value);
        }
    }

    if (modelno === "" || modeltypeid === 0) {
        App.errorForm.create({message: '- Please fill model No. and choose model type'});
    } else {
        $.ajaxFileUpload({
            url: url + 'model/save',
            secureuri: false,
            fileElementId: 'fileupload',
            dataType: 'json',
            data: {
                'modelno': modelno,
                'description': description,
                'color': color,
                'w': w,
                'd': d,
                'ht': ht,
                'cw': cw,
                'cd': cd,
                'ch': ch,
                'volume_package': volume_package,
                'modeltypeid': modeltypeid,
                'yield': yield,
                'custcode': custcode,
                'customerid': customerid,
                'finishoverview': arrfinishoverview,
                'constructionoverview': arrconstructionoverview,
                'preparedby': preparedby,
                'checkedby': checkedby,
                'approvedby': approvedby,
                'is_temporary_photo': is_temporary_photo,
            },
            success: function (content) {
                var result = eval('(' + content + ')');
                if (result.success) {
                    display_info('Save Data Successfull!');
                    model_view();
                } else if (result.nofile) {
                    display_info('Succesfull Save Data Without Image');
                    model_view();
                } else {
                    App.errorForm.create({message: result.msg});
                }
            },
            error: function (content) {
                alert(content);
            }
        });
    }
}

function model_savenew() {
    var msg = "";

    var modelno = $('#modelno').val();
    var description = $('#description').val();
    var color = $('#color').val();
    var modeltypeid = $('#modeltypeid').val();
    var w = $('#w').val();
    var d = $('#d').val();
    var ht = $('#ht').val();
    var cw = $('#cw').val();
    var cd = $('#cd').val();
    var ch = $('#ch').val();
    var customerid = $('#customerid').val();
    var volume_package = $('#volume_package').val();
    var yield = $('#yield').val();
    var custcode = $('#custcode').val();
    var preparedby = $('#name-apprvove1').val();
    var checkedby = $('#name-apprvove2').val();
    var approvedby = $('#name-apprvove3').val();

    var is_temporary_photo = $("input[name='is_temporary_photo']:checked").val();

    var finishoverview = document.getElementsByName("finishoverview[]");
    var arrfinishoverview = [];
    var constructionoverview = document.getElementsByName("constructionoverview[]");
    var arrconstructionoverview = [];


    for (var i = 0; i < finishoverview.length; i++) {
        if (finishoverview[i].checked) {
            arrfinishoverview.push(finishoverview[i].value);
        }
    }

    for (i = 0; i < constructionoverview.length; i++) {
        if (constructionoverview[i].checked) {
            arrconstructionoverview.push(constructionoverview[i].value);
        }
    }

    //if(date == ''){
    //    msg += "- Field 'DATE' reqiured";
    //}

    if (msg != "") {
        App.errorForm.create({'message': msg});
    } else {

        if (App.isFormValid("#form_create_model")) {
            var data = new FormData($('#form_create_model')[0]);
            data.set('modelno', modelno);
            data.set('description', description);
            data.set('color', color);
            data.set('w', w);
            data.set('d', d);
            data.set('ht', ht);
            data.set('cw', cw);
            data.set('cd', cd);
            data.set('ch', ch);
            data.set('customerid', customerid);
            data.set('volume_package', volume_package);
            data.set('modeltypeid', modeltypeid);
            data.set('yield', yield);
            data.set('custcode', custcode);
            data.set('finishoverview', arrfinishoverview);
            data.set('constructionoverview', arrconstructionoverview);
            data.set('preparedby', preparedby);
            data.set('checkedby', checkedby);
            data.set('approvedby', approvedby);
            data.set('is_temporary_photo', is_temporary_photo);

            jQuery.ajax({
                type: 'POST',
                method: 'POST',
                url: url + 'model/save',
                data: data,
                enctype: 'multipart/form-data',
                cache: false,
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function (data) {
                    App.bootbox.close("model_create");
                    model_search(0);
                    Client.message.success("Model created successfully ...");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Client.message.error("Save data error...!");
                },
            });

        }

    }

}

function model_update2() {
    var id = $('#id').val();
    var modelno = $('#modelno').val();
    var description = $('#mdl_description_e').val();
    var color = $('#color').val();
    var modeltypeid = $('#modeltypeid_e').val();
    var w = $('#w').val();
    var d = $('#d').val();
    var ht = $('#ht').val();
    var cw = $('#cw').val();
    var cd = $('#cd').val();
    var ch = $('#ch').val();
    var volume_package = $('#volume_package').val();
    var yield = $('#yield').val();
    var filename = $('#filename').val();
    var custcode = $('#custcode').val();
    var preparedby = $('#name-apprvove1').val();
    var checkedby = $('#name-apprvove2').val();
    var approvedby = $('#name-apprvove3').val();

    var finishoverview = document.getElementsByName("finishoverview[]");
    var arrfinishoverview = [];
    var constructionoverview = document.getElementsByName("constructionoverview[]");
    var arrconstructionoverview = [];


    for (var i = 0; i < finishoverview.length; i++) {
        if (finishoverview[i].checked) {
            arrfinishoverview.push(finishoverview[i].value);
        }
    }

    for (i = 0; i < constructionoverview.length; i++) {
        if (constructionoverview[i].checked) {
            arrconstructionoverview.push(constructionoverview[i].value);
        }
    }

    var expose = document.getElementsByName("expose[]");
    var arrexpose = [];
    for (i = 0; i < expose.length; i++) {
        if (expose[i].checked) {
            arrexpose.push(expose[i].value);
        }
    }

    var internal = document.getElementsByName("internal[]");
    var arrinternal = [];
    for (i = 0; i < internal.length; i++) {
        if (internal[i].checked) {
            arrinternal.push(internal[i].value);
        }
    }

    var panel = document.getElementsByName("panel[]");
    var arrpanel = [];
    for (i = 0; i < panel.length; i++) {
        if (panel[i].checked) {
            arrpanel.push(panel[i].value);
        }
    }

    var veneer = document.getElementsByName("veneer[]");
    var arrveneer = [];
    for (i = 0; i < veneer.length; i++) {
        if (veneer[i].checked) {
            arrveneer.push(veneer[i].value);
        }
    }

    var others = document.getElementsByName("others[]");
    var arrothers = [];
    for (i = 0; i < others.length; i++) {
        if (others[i].checked) {
            arrothers.push(others[i].value);
        }
    }

    $.ajaxFileUpload({
        url: url + 'model/update/',
        secureuri: false,
        fileElementId: 'fileupload',
        dataType: 'json',
        data: {
            'id': id,
            'modelno': modelno,
            'description': description,
            'color': color,
            'w': w,
            'd': d,
            'ht': ht,
            'cw': cw,
            'cd': cd,
            'ch': ch,
            'volume_package': volume_package,
            'modeltypeid': modeltypeid,
            'yield': yield,
            'filename': filename,
            'custcode': custcode,
            'finishoverview': arrfinishoverview,
            'constructionoverview': arrconstructionoverview,
            'preparedby': preparedby,
            'checkedby': checkedby,
            'approvedby': approvedby,
            'expose': arrexpose,
            'internal': arrinternal,
            'panel': arrpanel,
            'veneer': arrveneer,
            'others': arrothers
        },
        success: function (content) {
            console.log(content);
            $('#model_dialog').dialog('close');

            model_search($('#offset').val());
            setTimeout(function () {
                $('#bvan_tbl_s_model76d_qzx').scrollTop(my_y_position);
                model_viewdetail(id);
            }, 500);
        },
        error: function (content) {
            alert(content);
        }
    });
}

function model_update() {
    var msg = "";

    var modelno = $('#modelno').val();
    var description = $('#description').val();
    var color = $('#color').val();
    var modeltypeid = $('#modeltypeid').val();
    var w = $('#w').val();
    var d = $('#d').val();
    var ht = $('#ht').val();
    var cw = $('#cw').val();
    var cd = $('#cd').val();
    var ch = $('#ch').val();
    var volume_package = $('#volume_package').val();
    var yield = $('#yield').val();
    var custcode = $('#custcode').val();
    var customerid = $('#customerid').val();
    var preparedby = $('#name-apprvove1').val();
    var checkedby = $('#name-apprvove2').val();
    var approvedby = $('#name-apprvove3').val();
    var is_temporary_photo = $("input[name='is_temporary_photo']:checked").val();

    var finishoverview = document.getElementsByName("finishoverview[]");
    var arrfinishoverview = [];
    var constructionoverview = document.getElementsByName("constructionoverview[]");
    var arrconstructionoverview = [];


    for (var i = 0; i < finishoverview.length; i++) {
        if (finishoverview[i].checked) {
            arrfinishoverview.push(finishoverview[i].value);
        }
    }

    for (i = 0; i < constructionoverview.length; i++) {
        if (constructionoverview[i].checked) {
            arrconstructionoverview.push(constructionoverview[i].value);
        }
    }

    var expose = document.getElementsByName("expose[]");
    var arrexpose = [];
    for (i = 0; i < expose.length; i++) {
        if (expose[i].checked) {
            arrexpose.push(expose[i].value);
        }
    }

    var internal = document.getElementsByName("internal[]");
    var arrinternal = [];
    for (i = 0; i < internal.length; i++) {
        if (internal[i].checked) {
            arrinternal.push(internal[i].value);
        }
    }

    var panel = document.getElementsByName("panel[]");
    var arrpanel = [];
    for (i = 0; i < panel.length; i++) {
        if (panel[i].checked) {
            arrpanel.push(panel[i].value);
        }
    }

    var veneer = document.getElementsByName("veneer[]");
    var arrveneer = [];
    for (i = 0; i < veneer.length; i++) {
        if (veneer[i].checked) {
            arrveneer.push(veneer[i].value);
        }
    }

    var others = document.getElementsByName("others[]");
    var arrothers = [];
    for (i = 0; i < others.length; i++) {
        if (others[i].checked) {
            arrothers.push(others[i].value);
        }
    }


    if (msg != "") {
        App.errorForm.create({'message': msg});
    } else {

        if (App.isFormValid("#form_update_model")) {
            var data = new FormData($('#form_update_model')[0]);
            data.set('modelno', modelno);
            data.set('description', description);
            data.set('color', color);
            data.set('w', w);
            data.set('d', d);
            data.set('ht', ht);
            data.set('cw', cw);
            data.set('cd', cd);
            data.set('ch', ch);
            data.set('volume_package', volume_package);
            data.set('modeltypeid', modeltypeid);
            data.set('yield', yield);
            data.set('custcode', custcode);
            data.set('finishoverview', arrfinishoverview);
            data.set('constructionoverview', arrconstructionoverview);
            data.set('preparedby', preparedby);
            data.set('checkedby', checkedby);
            data.set('approvedby', approvedby);

            data.set('is_temporary_photo', is_temporary_photo);

            data.set('expose', arrexpose);
            data.set('internal', arrinternal);
            data.set('panel', arrpanel);
            data.set('veneer', arrveneer);
            data.set('others', arrothers);
            data.set('customerid', customerid);

            jQuery.ajax({
                type: 'POST',
                method: 'POST',
                url: url + 'model/update',
                data: data,
                enctype: 'multipart/form-data',
                cache: false,
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function (data) {
                    App.bootbox.close("model_edit");
                    model_search($('#offset').val());
                    Client.message.success("Model updated successfully ...");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    Client.message.error("Update data error...!");
                },
            });

        }

    }

}

function model_viewdetail(id, el_tab) {
    $("#modeldetail").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    //$("input[name='mdl[]']").attr('checked', false);
    $('#mdlid' + id).attr('checked', true);
    $('#modelid').val(id);

    Client.message.saving("Loading Model Detail...");

    $.get(url + 'model/viewdetail/' + id, function (content) {
        $('#modeldetail').empty();
        $('#modeldetail').append(content);
        if (undefined != el_tab && "" != el_tab) {
            App.activaTab(el_tab);
        }
        Client.message.success("Model Detail Successfully Loaded...");

        $('html, body').animate({
            scrollTop: $("#modeldetail").offset().top
        }, 1000);
    });
}

function model_view_model_detail(modelid) {
    $.get(url + 'model/viewdetail/' + modelid, function (content) {
        $('#modeldetail').empty();
        $('#modeldetail').append(content);
    });
}

function model_bomitemchoose(id) {
    $("input[name='bomitem[]']").attr('checked', false);
    $('#bomitemid' + id).attr('checked', true);
    $('#bomitemid').val(id);
}

function model_bomdeleteitem(modelid) {
    var component = $('#bomitemid').val();
    if (component != 0) {
        if (confirm('Are Yeu Sure?')) {
            $.get(url + 'model/bomdeleteitemid/' + component, function () {
                model_bomrefresh(modelid);
            });
        }
    } else {
        App.errorForm.create({message: '- Choose component'});
    }
}

function model_bomedititem(modelid) {
    var component = $('#bomitemid').val();
    if (component !== 0) {

        if ($('#model_dialog')) {
            $('#bodydata').append("<div id='model_dialog'></div>");
        }

        $("#model_dialog").load(url + 'model/bomedititem/' + component + '/' + modelid, function () {
            $(this).dialog({
                modal: true,
                width: 'auto',
                height: 'auto',
                position: {my: "center", at: "center", of: window},
                title: 'EDIT COMPONENT',
                overlay: {
                    opacity: 0.7,
                    background: "black"
                }, buttons: {
                    Update: function () {
                        model_updatebomitem()
                    },
                    Cancel: function () {
                        $(this).dialog("close");
                    }
                },
                create: function () {
                    $(this).css("maxHeight", 500);
                    $(this).css("maxWidth", '100%');
                }
            });
        });
        //
        //        $("#dialog2").load(url + 'model/bomedititem/' + component + '/' + modelid);
        //        $("#dialog2").dialog({
        //            modal: true,
        //            width: 'auto',
        //            height: 120,
        //            position: ['center', 50],
        //            title: 'Edit Item',
        //            overlay: {
        //                opacity: 0.7,
        //                background: "black"
        //            }
        //        });
    } else {
        App.errorForm.create({message: '- Choose component'});
    }
}

function model_addmaterial(parentid) {
    var modelid = $('#modelid').val();
    var chooseoption = $('#chooseoption').val();
    if (modelid == 0) {
        App.errorForm.create({message: '- Please Choose Or Add New Model'});
    } else {
        if (chooseoption == 2) {
            $("#scroll_area").load(url + 'model/addmaterial/' + modelid + '/' + parentid);
        } else {
            alert("Under Construction");
        }
    }
}

function model_insertitem() {
    var modelid = $('#modelid').val();
    var parentid = $('#parentid').val();
    var itemid = $('#itemid').val();
    var description = $('#itemdescription').val();
    var unitid = $('#unitid').val();
    var qty = $('#qty').val();
    var standardcost = $('#standardcost').val();
    $.post(url + 'model/insertitem', {
        modelid: modelid,
        parentid: parentid,
        itemid: itemid,
        description: description,
        unitid: unitid,
        qty: qty,
        standardcost: standardcost
    }, function () {
        $.get(url + 'model/viewitem/' + modelid, function (content) {
            $('#scroll_area').empty()
            $('#scroll_area').append(content);
        });
    })

}

/* Javascript set up wood type to model */
function model_setfinishing(modelid) {
    $("#dialog").load(url + 'model/setfinishing/' + modelid);
    $("#dialog").dialog({
        modal: true,
        width: 350,
        height: 'auto',
        position: ['center', 50],
        title: 'SET FINISHING',
        overlay: {
            opacity: 0.7,
            background: "black"
        },
        close: function () {
            model_viewdetail(modelid)
        }
    });
}

function model_savefinishing() {
    var finishingid = $('#finishingid').val();
    var modelid = $('#modelid').val();
    $.post(url + 'model/savefinishing', {
        modelid: modelid,
        finishingid: finishingid
    }, function () {
        $("#dialog").dialog('close');
        model_viewdetail(modelid);
    });
}

function model_deletefinishing(id, modelid) {
    if (confirm("Are You Sure ?")) {
        $.get(url + 'model/deletefinishing/' + id, function () {
            model_viewdetail(modelid);
        });
    }
}

function model_setmarble(modelid) {
    App.createContainer('model_setmarble_temp');
    var bbox = bootbox.dialog({
        title: 'Add More Marble',
        message: $('#model_setmarble_temp'),
        closeButton: true,
        //size: 'large',
        //className: "modal-size-midle",
        buttons: {
            Save: {
                label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                    model_savemarble(modelid);
                    return false;
                }
            },
            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/setmarble/' + modelid, function (content) {
            $('#model_setmarble_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_savemarble() {
    var type = $('#type').val();
    var itemid = $('#itemid0').val();
    var unitid = $('#unitid0').val();
    var modelid = $('#modelid_').val();
    var thickness = $('#thickness').val();
    var length = $('#length').val();
    var width = $('#width').val();
    var qty = $('#qty').val();
    var location = $('#location').val();
    var specifications = $('#specifications').val();

    var msg = "";
    if (type == '') {
        msg += "- Field 'TYPE' Required<br/>";
    }
    if (itemid == 0) {
        msg += "- Field 'ITEM' Required<br/>";
    }
    if (unitid == 0) {
        msg += "- Field 'UNIT' Required<br/>";
    }
    if (isNaN(qty) || qty == "") {
        msg += "- Field 'QTY' Required Number<br/>";
    }

    if (msg != "") {
        App.errorForm.create({message: msg});
    } else {
        $.post(url + 'model/savemarble', {
            type: type,
            modelid: modelid,
            itemid: itemid,
            unitid: unitid,
            thickness: thickness,
            length: length,
            width: width,
            qty: qty,
            location: location,
            specifications: specifications
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                Client.message.success("Insert Success!");
                App.bootbox.close("model_setmarble");
                model_setmarble(modelid);
                model_viewdetail(modelid, '#model_marble_u6y');
            } else {
                App.errorForm.create({message: result.msg});
            }
        });
    }
}


function model_editmarble(modelid, id) {
    App.createContainer('model_editmarble_temp');
    var bbox = bootbox.dialog({
        title: 'Edit Marble',
        message: $('#model_editmarble_temp'),
        onEscape: false,
        closeButton: true,
        //size: 'large',
        className: "modal-size-midle",
        buttons: {
            Update: {
                label: "<i class=\"fa fa-save\"></i> Update",
                className: "btn btn-success",
                callback: function () {
                    model_updatemarble(modelid);
                    return false;
                }
            },
            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/editmarble/' + modelid + '/' + id, function (content) {
            $('#model_editmarble_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });

}

function model_updatemarble(modelid) {
    var msg = "";
    if ($('#type').val() === '') {
        msg += "- Field 'TYPE' Required<br/>";
    }
    if ($('#itemid0').val() === 0) {
        msg += "- Field 'ITEM' Required<br/>";
    }
    if ($('#unitid0').val() === 0) {
        msg += "- Field 'UNIT' Required<br/>";
    }
    if (isNaN($('#qty').val()) || $('#qty').val() === "") {
        msg += "- Field 'QTY' Required Number<br/>";
    }

    if (msg !== "") {
        App.errorForm.create({message: msg});
    } else {
        $.post(url + 'model/updatemarble', $('#model_marble_form_edit').serializeObject(), function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                Client.message.success("Update Success!");
                App.bootbox.close("model_editmarble");
                model_viewdetail($('#modelid').val(), '#model_marble_u6y');

            } else {
                App.errorForm.create({message: result.msg});
            }
        });
    }
}

function model_deletemarble(modelid, id) {
    if (confirm('Are Yeu Sure?')) {

        $.get(url + 'model/deletemarble/' + id, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                //$("#model_dialog").dialog('close');
                model_viewdetail(modelid, '#model_marble_u6y');
            } else {
                App.errorForm.create({message: result.msg});
            }
        });

    }
}

function model_setpacking(modelid) {
    App.createContainer('model_setpacking_temp');
    var bbox = bootbox.dialog({
        title: 'Add More Packing',
        message: $('#model_setpacking_temp'),
        closeButton: true,
        //size: 'large',
        //className: "modal-size-midle",
        buttons: {
            Save: {
                label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                    model_savepacking(modelid);
                    return false;
                }
            },

            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/setpacking/' + modelid, function (content) {
            $('#model_setpacking_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_savepacking(modelid) {
    var type = $('#type').val();
    var itemid = $('#itemid0').val();
    var unitid = $('#unitid0').val();
    var modelid = $('#modelid_').val();
    var width = $('#width').val();
    var depth = $('#depth').val();
    var height = $('#height').val();
    var qty = $('#qty').val();
    var location = $('#location').val();
    var specifications = $('#specifications').val();
    var msg = "";

    if (itemid == 0) {
        msg += "- Field 'ITEM' Required<br/>";
    }
    if (unitid == 0) {
        msg += "- Field 'UNIT' Required<br/>";
    }
    if (isNaN(qty) || qty == "") {
        msg += "- Field 'QTY' Required Number<br/>";
    }
    if (msg != "") {
        App.errorForm.create({message: msg});
    } else {
        $.post(url + 'model/savepacking', {
            type: type,
            modelid: modelid,
            itemid: itemid,
            unitid: unitid,
            width: width,
            depth: depth,
            height: height,
            qty: qty,
            location: location,
            specifications: specifications
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                Client.message.success("Insert Success!");
                App.bootbox.close("model_setpacking");
                model_setpacking(modelid);
                model_viewdetail(modelid, '#model_packing_material_56y');
            } else {
                App.errorForm.create({message: result.msg});
            }

        });
    }
}

function model_deletepacking(modelid, id) {
    if (confirm('Are Yeu Sure?')) {

        $.get(url + 'model/deletepacking/' + id, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                model_viewdetail(modelid, '#model_packing_material_56y');
            } else {
                App.errorForm.create({message: result.msg});
            }
        });

    }
}

function model_setlatherinlay(modelid) {
    App.createContainer('model_setlatherinlay_temp');
    var bbox = bootbox.dialog({
        title: 'Add More Frame/Inlay',
        message: $('#model_setlatherinlay_temp'),
        closeButton: true,
        //size: 'large',
        //className: "modal-size-midle",
        buttons: {
            Save: {
                label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                    model_savelatherinlay(modelid);
                    return false;
                }
            },

            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/setlatherinlay/' + modelid, function (content) {
            $('#model_setlatherinlay_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_savelatherinlay(modelid) {
    var itemid = $('#itemid0').val();
    var unitid = $('#unitid0').val();
    var modelid = $('#modelid_').val();
    var thickness = $('#thickness').val();
    var length = $('#length').val();
    var width = $('#width').val();
    var qty = $('#qty').val();
    var location = $('#location').val();
    var specifications = $('#specifications').val();
    var msg = "";

    if (itemid == 0) {
        msg += "- Field 'ITEM' Required<br/>";
    }
    if (unitid == 0) {
        msg += "- Field 'UNIT' Required<br/>";
    }
    if (isNaN(qty) || qty == "") {
        msg += "- Field 'QTY' Required Number<br/>";
    }

    if (msg != "") {
        App.errorForm.create({message: msg});
    } else {
        $.post(url + 'model/savelatherinlay', {
            modelid: modelid,
            itemid: itemid,
            unitid: unitid,
            thickness: thickness,
            length: length,
            width: width,
            qty: qty,
            location: location,
            specifications: specifications
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                Client.message.success("Insert Success!");
                App.bootbox.close("model_setlatherinlay");
                model_setlatherinlay(modelid);
                model_viewdetail(modelid, '#model_frame_in_lay_56y');
            } else {
                App.errorForm.create({message: result.msg});
            }

        });
    }
}

function model_setglass(modelid) {
    App.createContainer('model_setglass_temp');
    var bbox = bootbox.dialog({
        title: 'Add More Glass / Mirror',
        message: $('#model_setglass_temp'),
        closeButton: true,
        //size: 'large',
        //className: "modal-size-midle",
        buttons: {
            Save: {
                label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                    model_saveglass(modelid);
                    return false;
                }
            },

            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/setglass/' + modelid, function (content) {
            $('#model_setglass_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_saveglass(modelid) {
    var itemid = $('#itemid0').val();
    var unitid = $('#unitid0').val();
    var modelid = $('#modelid_').val();
    var thickness = $('#thickness').val();
    var length = $('#length').val();
    var width = $('#width').val();
    var qty = $('#qty').val();
    var location = $('#location').val();
    var specifications = $('#specifications').val();
    var msg = "";

    if (itemid == 0) {
        msg += "- Field 'ITEM' Required<br/>";
    }
    if (unitid == 0) {
        msg += "- Field 'UNIT' Required<br/>";
    }
    if (isNaN(qty) || qty == "") {
        msg += "- Field 'QTY' Required Number<br/>";
    }

    if (msg != "") {
        App.errorForm.create({message: result.msg});
    } else {
        $.post(url + 'model/saveglass', {
            modelid: modelid,
            itemid: itemid,
            unitid: unitid,
            thickness: thickness,
            length: length,
            width: width,
            qty: qty,
            location: location,
            specifications: specifications
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                Client.message.success("Insert Success!");
                App.bootbox.close("model_setglass");
                model_setglass(modelid);
                model_viewdetail(modelid, '#glass_mirror');
            } else {
                App.errorForm.create({message: result.msg});
            }
        });
    }
}


function model_editglass(modelid, id) {
    App.createContainer('model_editglass_temp');
    var bbox = bootbox.dialog({
        title: 'Edit Glass/Mirror',
        message: $('#model_editglass_temp'),
        onEscape: false,
        closeButton: true,
        //size: 'large',
        className: "modal-size-midle",
        buttons: {
            Update: {
                label: "<i class=\"fa fa-save\"></i> Update",
                className: "btn btn-success",
                callback: function () {
                    model_updateglass(modelid);
                    return false;
                }
            },
            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/editglass/' + modelid + '/' + id, function (content) {
            $('#model_editglass_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });

}

function model_updateglass(modelid) {
    var msg = '';
    if ($('#unitid0').val() === 0) {
        msg += "- Field 'UNIT' Required<br/>";
    }
    if (isNaN($('#qty').val()) || $('#qty').val() === "") {
        msg += "- Field 'QTY' Required Number<br/>";
    }

    if (msg !== "") {
        App.errorForm.create({message: msg});
    } else {
        $.post(url + 'model/updateglass', $('#model_glass_edit_form').serializeObject(), function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                Client.message.success("Update Success!");
                App.bootbox.close("model_editglass");
                model_viewdetail($('#modelid').val(), '#glass_mirror');
            } else {
                App.errorForm.create({message: result.msg});
            }
        });
    }
}

function model_deleteglass(modelid, id) {
    if (confirm('Are Yeu Sure?')) {

        $.get(url + 'model/deleteglass/' + id, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                model_viewdetail(modelid, '#glass_mirror');
            } else {
                App.errorForm.create({message: result.msg});
            }
        });

    }
}

function model_deletelatherinlay(modelid, id) {
    if (confirm('Are Yeu Sure?')) {

        $.get(url + 'model/deletelatherinlay/' + id, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                model_viewdetail(modelid, '#model_frame_in_lay_56y');
            } else {
                App.errorForm.create({message: result.msg});
            }
        });

    }
}

function model_addhardwarecomponent(modelid, type) {

    $("#dialog").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $("#dialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        position: ['center', 50],
        title: 'Hardware',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    }).load(url + 'model/addcomponent/' + modelid + '/' + type + '/' + 1);
}

function model_addhardware(modelid) {
    App.createContainer('model_adddetail_temp');
    var bbox = bootbox.dialog({
        title: 'Add More Hardware',
        message: $('#model_adddetail_temp'),
        closeButton: true,
        //size: 'large',
        className: "modal-size-midle",
    });
    bbox.init(function () {
        $.get('model/addhardware/' + modelid, function (content) {
            $('#model_adddetail_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_choosecomponent(element) {
    $("#dialog2").empty();
    $("#dialog2").load(url + 'model/choosecomponent/' + element);
    $("#dialog2").dialog({
        modal: true,
        position: 'center',
        width: 500,
        height: 400,
        title: 'Choose Component',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function model_choosematerial(element) {
    $("#dialog2").empty();
    $("#dialog2").load(url + 'model/choosematerial/' + element);
    $("#dialog2").dialog({
        modal: true,
        position: 'center',
        width: 500,
        title: 'Choose Material',
        height: 400,
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function model_viewlisthardware(element) {
    $("#dialog").empty();
    $("#dialog").load(url + 'model/viewlisthardware/' + element);
    $("#dialog").dialog({
        modal: true,
        position: ['center', 50],
        width: 500,
        height: 400,
        title: 'Choose Hardware',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function model_setcomponent(element, id) {
    $('#' + element + 'id').val($('#id_s' + id).val());
    $('#' + element + 'name').val($('#description_s' + id).val());
    $("#dialog").dialog('close');
}

function model_choose(temp, id) {
    $("#dialog4").load(url + 'model/lists/' + temp + '/' + id + '/0');
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

function model_choose2(temp, id) {
    var billto = $('#billto').val();
    if (billto == 0) {
        App.errorForm.create({message: 'Please Choose Customer First !'});
    } else {
        $("#dialog4").load(url + 'model/lists/' + temp + '/' + id + '/' + billto);
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

function model_set(id, temp, tempid) {
    $('#' + temp + 'id' + tempid).val(id);
    $('#' + temp + 'code' + tempid).val($('#code' + id).val());
    $('#' + temp + 'description' + tempid).val($('#description' + id).val());
    $("#dialog4").dialog('close');
}

function model_set2(id, temp, tempid) {
    var modelid = document.getElementsByName('modelid[]');
    var st = 0;
    for (var i = 0; i < modelid.length; i++) {
        if (modelid[i].value == id) {
            st = 1;
            break;
        }
    }
    if (st == 0) {
        $('#' + temp + 'id' + tempid).val(id);
        $('#' + temp + 'code' + tempid).val($('#code' + id).val());
        $('#' + temp + 'description' + tempid).val($('#description' + id).val());
        $('#' + temp + 'finishing' + tempid).val($('#finishoverview' + id).val());
        $('#' + temp + 'fabrication' + tempid).val($('#constructionoverview' + id).val());
        $('#billto').prop("disabled", true);
        App.bootbox.close("costing_model");
    } else {
        App.errorForm.create({message: ' - Duplicate Model!'});
    }

}

function model_inserthardware() {
    var modelid = $('#modelid_').val();
    if ($('#itemid77').val() === "") {
        alert('Please Choose Component!');
    } else {
        if ($('#itemqty').val() === "" || $('#itemqty').val() == 0) {
            alert('Not Allow Null or 0 Quantity!');
        } else if ($('#unitid77').val() == 0) {
            alert('Please Choose Unit');
        } else {
            $.post(url + 'model/inserthardware', {
                modelid: $('#modelid_').val(),
                itemid: $('#itemid77').val(),
                qty: $('#itemqty').val(),
                hardwaretypeid: $('#hardwaretypeid').val(),
                unitid: $('#unitid77').val(),
                location: $('#location').val(),
                supplier: $('#supplier').val(),
                notes: $('#notes').val(),
                is_picklist: document.getElementById('is_picklist_item_id').value,
            }, function (content) {
                var result = eval('(' + content + ')');
                if (result.success) {
                    Client.message.success("Inserted successfully ...");
                    App.bootbox.close("model_adddetail");
                    model_addhardware(modelid);
                    model_viewdetail(modelid, '#model_harware_56y');

                } else {
                    App.errorForm.create({message: result.msg});
                }
            });
        }
    }
}

function model_bom() {

    var modelid = $('#modelid').val();

    $("#dialog4").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>")
    $("#dialog4").load(url + 'model/bom/' + modelid, function () {
        $('#bvan_tbl_model_bom_qzx').scrollTop(my_y_position);
    }).dialog({
        modal: true,
        width: '99%',
        height: 550,
        title: 'Cutting List',
        position: ['center', 10],
        overlay: {
            opacity: 0.7,
            background: "black"
        }, buttons: {
            Close: function () {
                $('#dialog4').dialog("close");
            }
        }
    });
//    alert(my_y_position);
//    setTimeout(function(){
//        $('#bvan_tbl_model_bom_qzx').scrollTop(my_y_position);
//    //your code to be executed after 1 seconds
//    },2000); 

}

function model_bom2(modelid) {
    $("#dialog4").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $("#dialog4").dialog({
        modal: true,
        width: '99%',
        height: 500,
        title: 'Cutting List',
        position: ['center', 50],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    }).load(url + 'model/bom/' + modelid);
}

function model_bomadditem(modelid) {

    if ($('#model_dialog')) {
        $('#bodydata').append("<div id='model_dialog'></div>");
    }

    $("#model_dialog").load(url + 'model/bomadditem/' + modelid, function () {
        $(this).dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            position: {my: "center", at: "center", of: window},
            title: 'ADD COMPONENT',
            overlay: {
                opacity: 0.7,
                background: "black"
            }, buttons: {
                Save: function () {
                    model_savebomitem();
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            },
            create: function () {
                $(this).css("maxHeight", 500);
                $(this).css("maxWidth", '100%');
            }
        });
    });
}

function model_savebomitem() {

    var partnumber = $('#partnumber').val();
    var description = $('#description_input_model').val();
    var itemid = $('#itemid-45').val();
    var remark = $('#remark').val();
    var price = $('#price').val();
    var turn = $('#turn').val();
    var lam = $('#lam').val();
    var carv = $('#carv').val();
    var mall = $('#mall').val();

    var ft = $('#ft').val();
    var fw = $('#fw').val();
    var fl = $('#fl').val();

    var rt = $('#rt').val();
    var rw = $('#rw').val();
    var rl = $('#rl').val();

    var ven_type = $('#description1').val();
    var ven_id = $('#itemid1').val();
    var ven_s1s = $('#ven_s1s').val();
    var ven_dgb = $('#ven_dgb').val();
    var ven_s2s = $('#ven_s2s').val();
    var mhmd = $('#mhmd').val();
    var sq_ven_a = $('#sq_ven_a').is(':checked');
    var sq_ven_dgb = $('#sq_ven_dgb').is(':checked');
    var msg = "";

    if (itemid === 0 && ven_id === 0) {
        msg += "Field 'Material or Veneer' Required<br/>";
    }
//    if (partnumber === '') {
//        msg += "Field '<b>Component Code</b>' Required<br/>";
//    }
    if (description === '') {
        msg += "Field '<b>Description</b>' Required<br/>";
    }
    if ($('#qty').val() === "" || isNaN($('#qty').val())) {
        msg += "Field '<b>Qty</b>' Required Number<br/>";
    }

    if (msg !== "") {
        App.errorForm.create({message: msg});
    } else {
        $.post(url + 'model/savebomitem', {
            modelid: $('#modelid').val(),
            partnumber: partnumber,
            description: description,
            itemid: itemid,
            remark: remark,
            price: price,
            turn: turn,
            lam: lam,
            carv: carv,
            mall: mall,
            ft: ft,
            fw: fw,
            fl: fl,
            rt: rt,
            rw: rw,
            rl: rl,
            ven_id: ven_id,
            ven_type: ven_type,
            ven_s1s: ven_s1s,
            ven_dgb: ven_dgb,
            ven_s2s: ven_s2s,
            mhmd: mhmd,
            sq_ven_a: sq_ven_a,
            sq_ven_dgb: sq_ven_dgb,
            qty: $('#qty').val(),
            location: $('#location').val()
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                model_bomrefresh($('#modelid').val());
                model_bomadditem($('#modelid').val());
                $("#model_dialog").dialog('close');
            } else {
                App.errorForm.create({message: result.msg});
            }

        });
    }
}

function model_updatebomitem() {

    var id = $('#id').val();
    var partnumber = $('#partnumber').val();
    var description = $('#description_input_model').val();
    var itemid = $('#itemid-45').val();
    var remark = $('#remark').val();
    var price = $('#price').val();
    var turn = $('#turn').val();
    var lam = $('#lam').val();
    var carv = $('#carv').val();
    var mall = $('#mall').val();

    var ft = $('#ft').val();
    var fw = $('#fw').val();
    var fl = $('#fl').val();

    var rt = $('#rt').val();
    var rw = $('#rw').val();
    var rl = $('#rl').val();

    var ven_type = $('#description1').val();
    var ven_id = $('#itemid1').val();
    var ven_s1s = $('#ven_s1s').val();
    var ven_dgb = $('#ven_dgb').val();
    var ven_s2s = $('#ven_s2s').val();
    var mhmd = $('#mhmd').val();
    var sq_ven_a = $('#sq_ven_a').is(':checked');
    var sq_ven_dgb = $('#sq_ven_dgb').is(':checked');
    var msg = "";
    if (itemid === 0 && ven_id === 0) {
        msg += "Field 'Material or Veneer' Required<br/>";
    }
//    if (partnumber === '') {
//        msg += "Field 'Code' Required<br/>";
//    }
    if (description === '') {
        msg += "Field 'Description' Required<br/>";
    }
    if ($('#qty').val() === "" || isNaN($('#qty').val())) {
        msg += "Field 'Qty' Required Number<br/>";
    }

    if (msg !== "") {
        App.errorForm.create({message: msg});
    } else {
        $.post(url + 'model/updatebomitem', {
            id: id,
            partnumber: partnumber,
            description: description,
            itemid: itemid,
            remark: remark,
            price: price,
            turn: turn,
            lam: lam,
            carv: carv,
            mall: mall,
            ft: ft,
            fw: fw,
            fl: fl,
            rt: rt,
            rw: rw,
            rl: rl,
            ven_id: ven_id,
            ven_type: ven_type,
            ven_s1s: ven_s1s,
            ven_dgb: ven_dgb,
            ven_s2s: ven_s2s,
            mhmd: mhmd,
            sq_ven_a: sq_ven_a,
            sq_ven_dgb: sq_ven_dgb,
            qty: $('#qty').val(),
            location: $('#location').val()
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                model_bomrefresh($('#modelid').val());
                $('#bomitemid' + id).prop('checked', true)
                $("#model_dialog").dialog('close');
            } else {
                App.errorForm.create({message: result.msg});
            }
        });
    }
}

function model_chooseitem(tempid, tempname) {
    $('#bodydata').append("<div id='dialogtemp'></div>");
    $("#dialogtemp").load(url + 'model/chooseitem/' + tempid + '/' + tempname);
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

function model_bomsetitem(type, id) {
    $('#itemid').val($('#id' + type + '' + id).val());
    $('#bomitemname').val($('#description' + type + '' + id).val());
    $('#typeitem').val(type);
    $("#dialogtemp").dialog('close');
}

function model_bomrefresh(modelid) {
    model_bom(modelid);

}

function model_calculatevolume(el) {
    var qty = $('#qty').val();
    var rst = $('#rst').val();
    var rsw = $('#rsw').val();
    var rsl = $('#rsl').val();

    $('#v2525').val('');
    $('#v3032').val('');
    $('#v4038').val('');
    $('#v5050').val('');
    $('#v6060').val('');
    $('#v7070').val('');
    var volume = (rst * rsw * rsl * qty) / 1000000000;
    $(el).val(volume);
}

function model_delete(modelid) {
    if (confirm('Are you sure want to delete this Model?')) {
        $.get(url + 'model/delete/' + modelid, function () {
            $('#modeldetail').empty();
            model_search($('#offset').val());
            Client.message.success("Model deleted successfully ...");
        }).fail(function (xhr, ajaxOptions, thrownError) {
            Client.message.error("Delete data error...!");
        });
    }
}

function display_error(error_str) {
    var regex = /(<([^>]+)>)/ig;
    var result = error_str.replace(regex, "");
    alert(result);
}

function model_imageview2(filename) {
    $("#dialog").empty();
    $("#dialog").load(url + 'model/imageview/' + filename);
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

function model_imageview(filename) {
    App.createContainer('model_imageview_temp');
    var bbox = bootbox.dialog({
        title: 'Image',
        message: $('#model_imageview_temp'),
        closeButton: true,
    });
    bbox.init(function () {
        $.get(url + 'model/imageview/' + filename, function (content) {
            $('#model_imageview_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_edit(modelid) {
    App.createContainer('model_edit_temp');
    var bbox = bootbox.dialog({
        title: 'Edit Model',
        message: $('#model_edit_temp'),
        onEscape: false,
        closeButton: true,
        size: 'large',
        //className: "modal-size-midle",
        buttons: {
            Update: {
                label: "<i class=\"fa fa-save\"></i> Update",
                className: "btn btn-success",
                callback: function () {
                    model_update();
                    return false;
                }
            },
            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/edit/' + modelid, function (content) {
            $('#model_edit_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_deletehardware(modelid, hardwareid) {
    var part_number = $('#row-' + hardwareid).children('td.partnumber').text();
    var description = $('#row-' + hardwareid).children('td.description').text();

    App.createContainer('model_deletehardware_temp');
    var bbox = bootbox.dialog({
        title: 'Delete Hardware Confirmation',
        message: $('#model_deletehardware_temp'),
        closeButton: true,
        //size: 'large',
        //className: "modal-size-midle",
        buttons: {
            Delete: {
                label: "<i class=\"fa fa-save\"></i> Delete",
                className: "btn btn-danger",
                callback: function () {
                    $.get(url + 'model/deletehardware/' + hardwareid, function (content) {
                        var result = eval('(' + content + ')');
                        if (result.success) {
                            Client.message.success("Delete Success!");
                            App.bootbox.close("model_deletehardware");
                            model_viewdetail(modelid, "#model_harware_56y");
                            return false;
                        } else {
                            App.errorForm.create({message: result.msg});
                        }

                    });
                    return false;
                }
            },
            Cancel: {
                label: 'Cancel',
                className: 'btn-default'
            }
        },
    });
    bbox.init(function () {
        $('#model_deletehardware_temp').empty().append('<p>\
	                These items will be permanently deleted and cannot be recovered<br/>\
	                Item Code: ' + part_number + ' <br/> Item Description: ' + description + '\
	                <br/><br/>Are you sure?</p>');
    });

}

function model_delete_upholstry(modelid, hardwareid) {
    if (confirm('Are Yeu Sure?')) {

        $.get(url + 'model/deletehardware/' + hardwareid, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                model_viewdetail(modelid, '#model_upholstry_56y');
            } else {
                App.errorForm.create({message: result.msg});
            }
        });

    }
}

function model_search(offset) {
    if (undefined == offset) {
        offset = 0;
    }

    var code = $('#code_s').val();
    var custcode = $('#custcode_s').val();
    var description = $('#description_s').val();
    var modeltypeid = $('#modeltypeid_s').val();
    var customerid = $('#customerid_search').val();
    var status_search_id = $('#status_search_id').val();
    $("#modeldata").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>");
    $.post(url + 'model/search/' + offset, {
        code: code,
        description: description,
        modeltypeid: modeltypeid,
        customerid: customerid,
        status_search_id: status_search_id,
        custcode: custcode
    }, function (content) {
        $('#modeldata').empty();
        $('#modeldata').append(content);

        $('#modeldetail').empty();
    });
}

function model_search2(offset) {
    var id = $('#id').val();
    var temp = $('#temp').val();
    var code = $('#code_sd').val();
    var custcode = $('#custcode_s').val();
    var description = $('#description_sd').val();
    var modeltypeid = $('#modeltypeid_sd').val();
    var billto = $('#billto_s').val();
    $.post(url + 'model/search2/' + offset, {
        code: code,
        description: description,
        modeltypeid: modeltypeid,
        id: id,
        temp: temp,
        billto: billto,
        custcode: custcode
    }, function (content) {
        $('#searchmodeldata').empty();
        $('#searchmodeldata').append(content);
    });
}

function model_finishingaction() {
    var finishingid = $('#finishingid').val();
    if (finishingid == 'other') {
        alert('test');
    }
}

function model_cdsprint() {
    var modelid = $('#modelid').val();
    if (modelid != 0) {
        window.open(url + 'model/cdsprint/' + modelid + '/0', '_blank');
    } else {
        alert('Choose Model');
    }
}

function model_cdsprint2(modelid) {
    window.open(url + 'model/cdsprint/' + modelid + '/0', '_blank');
}

function model_viewrequest() {

//    if ($('#model_dialog')) {
//        $('#bodydata').append("<div id='model_dialog'></div>");
//    }
//
//    $("#model_dialog").load(url + 'model/viewrequest', function () {
//        $(this).dialog({
//            modal: true,
//            width: 'auto',
//            height: 'auto',
//            position: {my: "center", at: "center", of: window},
//            title: 'NEW MODEL REQUEST',
//            overlay: {
//                opacity: 0.7,
//                background: "black"
//            }, buttons: {
//                Close: function () {
//                    $(this).dialog("close");
//                }
//            },
//            create: function () {
//                $(this).css("maxHeight", 500);
//                $(this).css("maxWidth", '100%');
//            }
//        });
//    });


    $("#dialog3").html("<center><img style='padding-top:50px;' src='images/loading1.gif'/></center>").dialog({
        modal: true,
        width: 'auto',
        height: 500,
        position: [50, 50],
        title: '<b>New Model Request</b>',
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    }).load(url + 'model/viewrequest');
}


function model_createbom(modelid) {
    if (confirm('Sure?')) {
        $.get(url + 'model/createbom/' + modelid, function () {
            model_viewdetail(modelid, '#model_master_56y');
        });
    }
}

function model_processtocosting(modelid, customerid) {
    $.post(url + 'costing/addfromrequestmodel', {
        modelid: modelid,
        customerid: customerid
    }, function () {

    });
}

function model_dosetmodelrfqdetail() {
    var customerid = $('#customerid').val();
    var rfqdetailid = $('#rfqdetailid').val();
    var refmodelid = $('#refmodelid').val();
    var modelid = $('#modelid0').val();
    var cust_code = $('#cust_code_new').val();
    var st = 0;
    var msg = "";
    if (modelid == refmodelid) {
        st = 1;
        msg += "- Choose another model<br/>";
    }
    if (modelid == 0) {
        st = 1;
        msg += "- Choose model<br/>";
    }
    if (st == 1) {
        App.errorForm.create({message: result.msg});
    } else {
        $.get(url + 'costing/isexist/' + customerid + '/' + modelid, function (content) {
            if (content == 1) {
                App.errorForm.create({message: "- Already have costing. Choose Another One!"});
            } else {
                if (confirm('Automatically forward to Costing Department to Create Costing for this Model\nAre you Sure?')) {
                    $.post(url + 'model/dosetmodelrfqdetail', {
                        rfqdetailid: rfqdetailid,
                        modelid: modelid,
                        cust_code: cust_code
                    }, function (content) {
                        if (content == '1') {
                            model_processtocosting(modelid, customerid)
                            $("#dialog2").dialog('close');
                            model_viewrequest();
                            model_view();
                        }
                    });
                }
            }

        });

    }
}

function model_setmodelrfqdetail(id, modelid, customerid, cust_code) {
    $("#dialog2").empty();
    $.get(url + "model/setmodelrfqdetail/" + id + "/" + modelid + "/" + customerid + "/" + cust_code, function (content) {
        $("#dialog2").append(content);
        $("#dialog2").dialog({
            modal: true,
            width: 'auto',
            height: 'auto',
            position: [300, 50],
            title: 'Set Model',
            overlay: {
                opacity: 0.7,
                background: "black"
            }
        });
    });

}

function model_printcuttinglist(id) {
    var printyield = $('#printyield').prop('checked');
    window.open(url + 'model/printcuttinglist/' + id + '/' + printyield, 'blank');
}

function model_additionalnotes(id) {
    App.createContainer('model_additionalnotes_temp');
    var bbox = bootbox.dialog({
        title: 'Additional Notes',
        message: $('#model_additionalnotes_temp'),
        closeButton: true,
    });
    bbox.init(function () {
        $.get(url + 'model/additionalnotes/' + id, function (content) {
            $('#model_additionalnotes_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_updateadditionalnotes() {
    var modelid = $('#modelid').val();
    var additionalnotes = $('#additionalnotes').val();
    $.post(url + 'model/updateadditionalnotes', {
        modelid: modelid,
        additionalnotes: additionalnotes
    }, function () {
        App.bootbox.close("model_additionalnotes");
        Client.message.success("Update Additional Notes successfully ...");
    });
}

function model_layout(id) {
    App.createContainer('model_layout_temp');
    var bbox = bootbox.dialog({
        title: 'Additional Layot',
        message: $('#model_layout_temp'),
        closeButton: true,
        //size: 'large',
        //className: "modal-size-midle",
    });
    bbox.init(function () {
        $.get(url + 'model/layout/' + id, function (content) {
            $('#model_layout_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_uploadlayout() {
    var modelid = $('#modelid').val();

    var formData = new FormData();
    formData.append('modelid', modelid);
    formData.append('fileupload', $('input[type=file]')[0].files[0]);

    jQuery.ajax({
        type: 'POST',
        method: 'POST',
        url: url + 'model/uploadlayout',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (data) {
            Client.message.success("Uplaod layout successfully ...");
            App.bootbox.close("model_layout");
            model_layout(modelid);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Client.message.error("Upload data error...!");
        },
    });

}

function model_deletelayout(id, filename) {
    var modelid = $('#modelid').val();
    if (confirm('Are you sure?')) {
        $.get(url + 'model/deletelayout/' + id, function () {
            Client.message.success("Delete layout successfully ...");
            App.bootbox.close("model_layout");
            model_layout(modelid);
        }).fail(function (xhr, ajaxOptions, thrownError) {
            Client.message.error("Delete data error...!");
        });
    }
}

function model_deletelayout(id, filename) {
    var modelid = $('#modelid').val();
    if (confirm('Sure?')) {
        jQuery.ajax({
            url: url + 'model/deletelayout',
            type: 'POST',
            method: 'POST',
            dataType: 'json',
            data: {
                'id': id,
                'filename': filename
            },
            success: function (data) {
                Client.message.success("Delete layout successfully ...");
                App.bootbox.close("model_layout");
                model_layout(modelid);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Client.message.error("Delete data error...!");
            },
        });
    }
}

function model_reviewnotesandhistory(modelid) {
    App.createContainer('model_reviewnotesandhistory_temp');
    var bbox = bootbox.dialog({
        title: 'Review And Notes History',
        message: $('#model_reviewnotesandhistory_temp'),
        closeButton: true,
    });
    bbox.init(function () {
        $.get(url + 'model/reviewnotesandhistory/' + modelid, function (content) {
            $('#model_reviewnotesandhistory_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_addreviewnotesandhistory() {
    App.createContainer('model_addreviewnotesandhistory_temp');
    var bbox = bootbox.dialog({
        title: 'Review And Notes History',
        message: $('#model_addreviewnotesandhistory_temp'),
        closeButton: true,
    });
    bbox.init(function () {
        $.get(url + 'model/addreviewnotesandhistory', function (content) {
            $('#model_addreviewnotesandhistory_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_savereviewnotesandhistory() {
    var modelid = $('#modelid').val();
    var date = $('#date').val();
    var reviewedby = $('#reviewedby').val();
    var notes = $('#notes').val();

    var msg = "";
    if (date == '') {
        msg += "- Required 'Date'<br/>";
    }
    if (reviewedby == "") {
        msg += "- Required 'Reviewed By'<br/>";
    }
    if (notes == "") {
        msg += "- Required 'Notes'<br/>";
    }

    if (msg != "") {
        App.errorForm.create({message: msg});
    } else {
        $.post(url + 'model/savereviewnotesandhistory', {
            modelid: modelid,
            date: date,
            reviewedby: reviewedby,
            notes: notes
        }, function () {
            model_reviewnotesandhistory(modelid);
            model_addreviewnotesandhistory();
        });
    }
}

function model_editreviewnotesandhistory(id) {
    App.createContainer('model_reviewnotesandhistory_temp');
    var bbox = bootbox.dialog({
        title: 'Edit Review And Notes History',
        message: $('#model_reviewnotesandhistory_temp'),
        closeButton: true,
    });
    bbox.init(function () {
        $.get(url + 'model/editreviewnotesandhistory' + id, function (content) {
            $('#model_reviewnotesandhistory_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_updatereviewnotesandhistory() {
    var id = $('#id').val();
    var modelid = $('#modelid').val();
    var date = $('#date').val();
    var reviewedby = $('#reviewedby').val();
    var notes = $('#notes').val();

    var msg = "";
    if (date == '') {
        msg += "- Required 'Date'<br/>";
    }
    if (reviewedby == "") {
        msg += "- Required 'Reviewed By'<br/>";
    }
    if (notes == "") {
        msg += "- Required 'Notes'<br/>";
    }

    if (msg != "") {
        App.errorForm.create({message: msg});
    } else {
        $.post(url + 'model/updatereviewnotesandhistory', {
            id: id,
            date: date,
            reviewedby: reviewedby,
            notes: notes
        }, function () {
            model_reviewnotesandhistory(modelid);
            $('#dialog2').dialog('close');
        });
    }
}

function model_deletereviewnotesandhistory(id) {
    var modelid = $('#modelid').val();
    if (confirm('Sure?')) {
        $.get(url + 'model/deletereviewnotesandhistory/' + id, function () {
            model_reviewnotesandhistory(modelid);
        });
    }
}

function model_material_overview(id) {
    App.createContainer('model_overview_temp');
    var bbox = bootbox.dialog({
        title: 'Material Overview',
        message: $('#model_overview_temp'),
        closeButton: true,
        size: 'large',
    });
    bbox.init(function () {
        $.get(url + 'model/material_overview/' + id, function (content) {
            $('#model_overview_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_save_material_overview(modelid) {
    var expose = document.getElementsByName("expose[]");
    var arrexpose = [];
    for (var i = 0; i < expose.length; i++) {
        if (expose[i].checked) {
            arrexpose.push(expose[i].value);
        }
    }

    var internal = document.getElementsByName("internal[]");
    var arrinternal = [];
    for (i = 0; i < internal.length; i++) {
        if (internal[i].checked) {
            arrinternal.push(internal[i].value);
        }
    }

    var panel = document.getElementsByName("panel[]");
    var arrpanel = [];
    for (i = 0; i < panel.length; i++) {
        if (panel[i].checked) {
            arrpanel.push(panel[i].value);
        }
    }

    var veneer = document.getElementsByName("veneer[]");
    var arrveneer = [];
    for (i = 0; i < veneer.length; i++) {
        if (veneer[i].checked) {
            arrveneer.push(veneer[i].value);
        }
    }

    var others = document.getElementsByName("others[]");
    var arrothers = [];
    for (i = 0; i < others.length; i++) {
        if (others[i].checked) {
            arrothers.push(others[i].value);
        }
    }

    $.ajax({
        url: url + 'model/update_material_overview',
        type: 'post',
        dataType: 'json',
        //contentType: 'application/json',
        data: {
            modelid: modelid,
            expose: arrexpose,
            internal: arrinternal,
            panel: arrpanel,
            veneer: arrveneer,
            others: arrothers
        },
        success: function (result) {
            if (result.success) {
                Client.message.success("Data updated successfully ...");
                App.bootbox.close("model_overview");
                //model_material_overview(modelid);
            } else {
                App.errorForm.create({message: result.msg});
            }
        },
        error: function (content) {
            alert(content);
        }
    });

}

function model_add_other_material_overview(modelid, typeid) {
    var _title = "";
    if (typeid == 1) {
        _title = 'Add Others Expose';
    } else if (typeid == 2) {
        _title = 'Add Others Internal';
    } else if (typeid == 3) {
        _title = 'Add Others Panels';
    } else if (typeid == 4) {
        _title = 'Add Others Veneer';
    } else if (typeid == 5) {
        _title = 'Add Others';
    }
    App.createContainer('model_add_other_material_overview_temp');
    var bbox = bootbox.dialog({
        title: _title,
        message: $('#model_add_other_material_overview_temp'),
        closeButton: true,
    });
    bbox.init(function () {
        $.get(url + 'model/add_other_material_overview/' + modelid + '/' + typeid, function (content) {
            $('#model_add_other_material_overview_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_edit_other_material_overview(id, typeid) {
    var _title = "";
    if (typeid == 1) {
        _title = 'Edit Others Expose';
    } else if (typeid == 2) {
        _title = 'Edit Others Internal';
    } else if (typeid == 3) {
        _title = 'Edit Others Panels';
    } else if (typeid == 4) {
        _title = 'Edit Others Veneer';
    } else if (typeid == 5) {
        _title = 'Edit Others';
    }
    App.createContainer('model_edit_other_material_overview_temp');
    var bbox = bootbox.dialog({
        title: _title,
        message: $('#model_edit_other_material_overview_temp'),
        closeButton: true,
    });
    bbox.init(function () {
        $.get(url + 'model/edit_other_material_overview/' + id, function (content) {
            $('#model_edit_other_material_overview_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_save_other_material_overview() {
    var id = $('#_id').val();
    var modelid = $('#model_id').val();
    var description = $('#description_').val();
    var typeid = $('#type_id').val();
    var msg = '';
    if (description == '') {
        msg = "- Field 'Description' Required<br/>";
    }
    if (msg != '') {
        App.errorForm.create({message: msg});
    } else {
        $.post(url + 'model/save_other_material_overview', {
            id: id,
            modelid: modelid,
            typeid: typeid,
            description: description
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                Client.message.success("Data inserted successfully ...");
                App.bootbox.close("model_add_other_material_overview");
                App.bootbox.close("model_edit_other_material_overview");
                App.bootbox.close("model_overview");
                model_material_overview(modelid);
            } else {
                App.errorForm.create({message: result.msg});
            }
        });
    }
}

function model_delete_other_material_overview(id, modelid) {
    if (confirm('Are You Sure?')) {
        $.post(url + 'model/delete_other_material_overview', {
            id: id
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                App.bootbox.close("model_overview");
                model_material_overview(modelid);
            } else {
                App.errorForm.create({message: result.msg});
            }
        });
    }
}

function model_setupholstry(modelid) {
    App.createContainer('model_setupholstry_temp');
    var bbox = bootbox.dialog({
        title: 'Add More Upholstry',
        message: $('#model_setupholstry_temp'),
        onEscape: false,
        closeButton: true,
        //size: 'large',
        //className: "modal-size-midle",
        buttons: {
            Save: {
                label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                    model_saveupholstry();
                    return false;
                }
            },

            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/setupholstry/' + modelid, function (content) {
            $('#model_setupholstry_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_saveupholstry() {
    var itemid = $('#itemid0').val();
    var unitid = $('#unitid0').val();
    var modelid = $('#modelid_').val();
    var thickness = $('#thickness').val();
    var length = $('#length').val();
    var width = $('#width').val();
    var qty = $('#qty').val();
    var location = $('#location').val();
    var is_picklist = document.getElementById('is_picklist_item_id').value;
    var specifications = $('#specifications').val();
    var msg = "";

    if (itemid == 0) {
        msg += "- Field 'ITEM' Required<br/>";
    }
    if (unitid == 0) {
        msg += "- Field 'UNIT' Required<br/>";
    }
    if (isNaN(qty) || qty == "") {
        msg += "- Field 'QTY' Required Number<br/>";
    }

    if (msg != "") {
        App.errorForm.create({message: msg});
    } else {
        $.post(url + 'model/saveupholstry', {
            modelid: modelid,
            itemid: itemid,
            unitid: unitid,
            thickness: thickness,
            length: length,
            width: width,
            qty: qty,
            location: location,
            specifications: specifications,
            is_picklist: is_picklist,
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                Client.message.success("Insert Success!");
                App.bootbox.close("model_setupholstry");
                model_setupholstry(modelid);
                model_viewdetail(modelid, '#model_upholstry_56y');
            } else {
                App.errorForm.create({message: result.msg});
            }

        });
    }
}

function model_editupholstry(modelid, id) {
    App.createContainer('model_editupholstry_temp');
    var bbox = bootbox.dialog({
        title: 'Edit Upholstry',
        message: $('#model_editupholstry_temp'),
        onEscape: false,
        closeButton: true,
        //size: 'large',
        className: "modal-size-midle",
        buttons: {
            Update: {
                label: "<i class=\"fa fa-save\"></i> Update",
                className: "btn btn-success",
                callback: function () {
                    model_updateupholstry(modelid);
                    return false;
                }
            },
            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/editupholstry/' + modelid + '/' + id, function (content) {
            $('#model_editupholstry_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });

}

function model_updateupholstry(modelid) {
    $.post(url + 'model/updateupholstry', $('#form_edit_model_upholstry').serializeObject(), function (content) {
        var result = eval('(' + content + ')');
        if (result.success) {
            Client.message.success("Update Success!");
            App.bootbox.close("model_editupholstry");
            model_viewdetail($('#modelid').val(), '#model_upholstry_56y');
        } else {
            App.errorForm.create({message: result.msg});
        }
    });
}

function model_edithardware(modelid, hardwareid) {
    App.createContainer('model_edithardware_temp');
    var bbox = bootbox.dialog({
        title: 'Edit Hardware',
        message: $('#model_edithardware_temp'),
        onEscape: false,
        closeButton: true,
        //size: 'large',
        className: "modal-size-midle",
        buttons: {
            Update: {
                label: "<i class=\"fa fa-save\"></i> Update",
                className: "btn btn-success",
                callback: function () {
                    model_updatehardware();
                    return false;
                }
            },
            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/edithardware/' + modelid + '/' + hardwareid, function (content) {
            $('#model_edithardware_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });

}

function model_updatehardware() {
    $.post(url + 'model/updatehardware', $('#model_hardware_form_edit').serializeObject(), function (content) {
        var result = eval('(' + content + ')');
        if (result.success) {
            Client.message.success("Update Success!");
            App.bootbox.close("model_edithardware");
            model_viewdetail($('#modelid').val(), '#model_harware_56y');
        } else {
            App.errorForm.create({message: msg});
        }
    });
}

function model_editlatherinlay(modelid, id) {
    App.createContainer('model_editlatherinlay_temp');
    var bbox = bootbox.dialog({
        title: 'Edit Frame/Inlay',
        message: $('#model_editlatherinlay_temp'),
        onEscape: false,
        closeButton: true,
        //size: 'large',
        className: "modal-size-midle",
        buttons: {
            Update: {
                label: "<i class=\"fa fa-save\"></i> Update",
                className: "btn btn-success",
                callback: function () {
                    model_updatelatherinlay(modelid);
                    return false;
                }
            },
            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/editlatherinlay/' + modelid + '/' + id, function (content) {
            $('#model_editlatherinlay_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });

}

function model_updatelatherinlay(modelid) {
    $.post(url + 'model/updatelatherinlay', $('#model_latherinlay_edit_form').serializeObject(), function (content) {
        var result = eval('(' + content + ')');
        if (result.success) {
            Client.message.success("Update Success!");
            App.bootbox.close("model_editlatherinlay");
            model_viewdetail($('#modelid').val(), '#model_frame_in_lay_56y');
        } else {
            App.errorForm.create({message: result.msg});
        }
    });
}

function model_editpacking(modelid, id) {
    App.createContainer('model_editpacking_temp');
    var bbox = bootbox.dialog({
        title: 'Edit Packing',
        message: $('#model_editpacking_temp'),
        onEscape: false,
        closeButton: true,
        //size: 'large',
        className: "modal-size-midle",
        buttons: {
            Update: {
                label: "<i class=\"fa fa-save\"></i> Update",
                className: "btn btn-success",
                callback: function () {
                    model_updatepacking(modelid);
                    return false;
                }
            },
            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/editpacking/' + modelid + '/' + id, function (content) {
            $('#model_editpacking_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });

}

function model_updatepacking(modelid) {
    $.post(url + 'model/updatepacking', $('#model_packing_edit_form').serializeObject(), function (content) {
        var result = eval('(' + content + ')');
        if (result.success) {
            Client.message.success("Update Success!");
            App.bootbox.close("model_editpacking");
            model_viewdetail($('#modelid').val(), '#model_packing_material_56y');
        } else {
            App.errorForm.create({message: result.msg});
        }
    });
}

function model_approve(modelid, approvalid, status, who, flag) {
    //close if exist
    App.bootbox.close("model_view_approval_notes");

    if (status === 1) {
        App.createContainer('model_approve_temp');
        var bbox = bootbox.dialog({
            title: 'Approve Model',
            message: $('#model_approve_temp'),
            closeButton: true,
            size: 'large',
            className: "modal-size-midle",
            buttons: {
                Approve: {
                    label: "<i class=\"fa fa-save\"></i> Approve",
                    className: "btn btn-success",
                    callback: function () {
                        $.post(url + 'model/approve', {
                            modelid: modelid,
                            approvalid: approvalid,
                            who: who,
                            status: status
                        }).done(function (content) {
                            var result = eval('(' + content + ')');
                            if (result.success) {
                                if (flag === 0) {
                                    model_search($('#offset').val());
                                    App.bootbox.close("model_approve");
                                    Client.message.success("Model Approved Successfully ...");
                                } else {
                                    model_search($('#offset').val());
                                    bbox.modal("hide");
                                    Client.message.error({'message': data.msg});
                                }
                            } else {
                                Client.message.error({'message': result.msg});
                            }
                        }).fail(function (data) {
                            bbox.modal("hide");
                            Client.message.error({'message': data.msg});
                        });
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
            $('#model_approve_temp').empty().append('<span><br/>Are you sure to approve this document?</span>');
        });
    } else {
        var dialogtitle = (status === 2) ? 'PENDING' : 'REJECT';
        App.createContainer('model_approve_temp');
        var bbox = bootbox.dialog({
            title: dialogtitle,
            message: $('#model_approve_temp'),
            closeButton: true,
            //size: 'large',
            //className: "modal-size-midle",
            buttons: {
                Save: {
                    label: "<i class=\"fa fa-save\"></i> Save",
                    className: "btn btn-success",
                    callback: function () {
                        model_do_reject_or_pending();
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
            $.get(url + 'model/rejectOrPending/' + modelid + '/' + approvalid + '/' + status + '/' + who + '/' + flag, function (content) {
                $('#model_approve_temp').empty().append(content);
            }).done(function () {
            }).fail(function (data) {
                bbox.modal("hide");
                Client.message.error({'message': data});
            });
        });

    }
}

function model_do_reject_or_pending() {
    var modelid = $('#model_modelid').val();
    var approvalid = $('#model_approvalid').val();
    var who = $('#model_who').val();
    var status = $('#model_status').val();
    var flag = $('#model_flag').val();
    var notes = $('#model_notes').val();

    var dialogtitle = (status === 2) ? 'PENDING' : 'REJECT';

    $.post(url + 'model/do_reject_or_pending', {
        modelid: modelid,
        approvalid: approvalid,
        status: status,
        who: who,
        notes: notes
    }, function (content) {
        var result = eval('(' + content + ')');
        if (result.success) {
            if (flag === '0') {
                model_search($('#offset').val());
                App.bootbox.close("model_approve");
                Client.message.success(dialogtitle + " Done Successfully ...");
            } else {
                model_search($('#offset').val());
            }
        } else {
            Client.message.error({'message': result.msg});
        }
    });
}


function model_view_notes(mat_req_id, employee) {
    $("#mat_req_n").load(url + 'model/view_notes/' + mat_req_id + '/' + employee);
    $("#mat_req_n").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        title: 'Notes',
        position: ['center', 20],
        overlay: {
            opacity: 0.7,
            background: "black"
        }
    });
}

function model_view_approval_notes(modelid, status, who) {
    App.createContainer('model_view_approval_notes_temp');
    var bbox = bootbox.dialog({
        title: "Notes",
        message: $('#model_view_approval_notes_temp'),
        closeButton: true,
        //size: 'large',
        //className: "modal-size-midle",
        buttons: {
            Cancel: {
                label: 'Close',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/view_approval_notes/' + modelid + '/' + status + "/" + who, function (content) {
            $('#model_view_approval_notes_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'message': data});
        });
    });
}

// model veneer

function model_setveneer(modelid) {
    App.createContainer('model_setveneer_temp');
    var bbox = bootbox.dialog({
        title: 'Add More Veneer',
        message: $('#model_setveneer_temp'),
        closeButton: true,
        //size: 'large',
        //className: "modal-size-midle",
        buttons: {
            Save: {
                label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                    model_saveveneer(modelid);
                    return false;
                }
            },

            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/setveneer/' + modelid, function (content) {
            $('#model_setveneer_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_saveveneer(modelid) {
    var itemid = $('#itemid0').val();
    var unitid = $('#unitid0').val();
    var modelid = $('#modelid_').val();
    var thickness = $('#thickness').val();
    var length = $('#length').val();
    var width = $('#width').val();
    var qty = $('#qty').val();
    var location = $('#location').val();
    var specifications = $('#specifications').val();
    var yield = $('#yield').val();
    var cutting_list = $('#cutting_list').val();
    var msg = "";

    if (itemid == 0) {
        msg += "- Field 'ITEM' Required<br/>";
    }
    if (unitid == 0) {
        msg += "- Field 'UNIT' Required<br/>";
    }
    if (isNaN(qty) || qty == "") {
        msg += "- Field 'Requirement' Required Number<br/>";
    }

    if (msg != "") {
        App.errorForm.create({message: result.msg});
    } else {
        $.post(url + 'model/saveveneer', {
            modelid: modelid,
            itemid: itemid,
            unitid: unitid,
            thickness: thickness,
            length: length,
            width: width,
            qty: qty,
            location: location,
            specifications: specifications,
            yield: yield,
            cutting_list: cutting_list,
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                Client.message.success("Insert Success!");
                App.bootbox.close("model_setveneer");
                model_setveneer(modelid);
                model_viewdetail(modelid, '#model_veneer');
            } else {
                App.errorForm.create({message: result.msg});
            }
        });
    }
}

function model_editveneer(modelid, id) {
    App.createContainer('model_editveneer_temp');
    var bbox = bootbox.dialog({
        title: 'Edit Veneer',
        message: $('#model_editveneer_temp'),
        onEscape: false,
        closeButton: true,
        //size: 'large',
        className: "modal-size-midle",
        buttons: {
            Update: {
                label: "<i class=\"fa fa-save\"></i> Update",
                className: "btn btn-success",
                callback: function () {
                    model_updateveneer(modelid);
                    return false;
                }
            },
            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/editveneer/' + modelid + '/' + id, function (content) {
            $('#model_editveneer_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });

}

function model_updateveneer(modelid) {
    var msg = '';
    if ($('#unitid0').val() === 0) {
        msg += "- Field 'UNIT' Required<br/>";
    }
    if (isNaN($('#qty').val()) || $('#qty').val() === "") {
        msg += "- Field 'QTY' Required Number<br/>";
    }

    if (msg !== "") {
        App.errorForm.create({message: msg});
    } else {
        $.post(url + 'model/updateveneer', $('#model_veneer_edit_form').serializeObject(), function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                Client.message.success("Update Success!");
                App.bootbox.close("model_editveneer");
                model_viewdetail($('#modelid').val(), '#model_veneer');
            } else {
                App.errorForm.create({message: result.msg});
            }
        });
    }
}

function model_deleteveneer(modelid, id) {
    if (confirm('Are Yeu Sure?')) {
        $.get(url + 'model/deleteveneer/' + id, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                model_viewdetail(modelid, '#model_veneer');
            } else {
                App.errorForm.create({message: result.msg});
            }

        });
    }
}

//model solid wood

function model_setsolidwood(modelid) {
    App.createContainer('model_setsolidwood_temp');
    var bbox = bootbox.dialog({
        title: 'Add More Solidwood',
        message: $('#model_setsolidwood_temp'),
        closeButton: true,
        //size: 'large',
        //className: "modal-size-midle",
        buttons: {
            Save: {
                label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                    model_savesolidwood(modelid);
                    return false;
                }
            },

            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/setsolidwood/' + modelid, function (content) {
            $('#model_setsolidwood_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_savesolidwood(modelid) {
    var itemid = $('#itemid0').val();
    var unitid = $('#unitid0').val();
    var modelid = $('#modelid_').val();
    var thickness = $('#thickness').val();
    var length = $('#length').val();
    var width = $('#width').val();
    var qty = $('#qty').val();
    var location = $('#location').val();
    var specifications = $('#specifications').val();
    var yield = $('#yield').val();
    var cutting_list = $('#cutting_list').val();
    var msg = "";

    if (itemid == 0) {
        msg += "- Field 'ITEM' Required<br/>";
    }
    if (unitid == 0) {
        msg += "- Field 'UNIT' Required<br/>";
    }
    if (isNaN(qty) || qty == "") {
        msg += "- Field 'QTY' Required Number<br/>";
    }

    if (msg != "") {
        App.errorForm.create({message: result.msg});
    } else {
        $.post(url + 'model/savesolidwood', {
            modelid: modelid,
            itemid: itemid,
            unitid: unitid,
            thickness: thickness,
            length: length,
            width: width,
            qty: qty,
            location: location,
            specifications: specifications,
            yield: yield,
            cutting_list: cutting_list,
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                Client.message.success("Insert Success!");
                App.bootbox.close("model_setsolidwood");
                model_setsolidwood(modelid);
                model_viewdetail(modelid, '#model_solidwood');
            } else {
                App.errorForm.create({message: result.msg});
            }
        });
    }
}

function model_editsolidwood(modelid, id) {
    App.createContainer('model_editsolidwood_temp');
    var bbox = bootbox.dialog({
        title: 'Edit Solid Wood',
        message: $('#model_editsolidwood_temp'),
        onEscape: false,
        closeButton: true,
        //size: 'large',
        className: "modal-size-midle",
        buttons: {
            Update: {
                label: "<i class=\"fa fa-save\"></i> Update",
                className: "btn btn-success",
                callback: function () {
                    model_updatesolidwood(modelid);
                    return false;
                }
            },
            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/editsolidwood/' + modelid + '/' + id, function (content) {
            $('#model_editsolidwood_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_updatesolidwood(modelid) {
    var msg = '';
    if ($('#unitid0').val() === 0) {
        msg += "- Field 'UNIT' Required<br/>";
    }
    if (isNaN($('#qty').val()) || $('#qty').val() === "") {
        msg += "- Field 'QTY' Required Number<br/>";
    }

    if (msg !== "") {
        App.errorForm.create({message: msg});
    } else {
        $.post(url + 'model/updatesolidwood', $('#model_solidwood_edit_form').serializeObject(), function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                Client.message.success("Update Success!");
                App.bootbox.close("model_editsolidwood");
                model_viewdetail($('#modelid').val(), '#model_solidwood');
            } else {
                App.errorForm.create({message: result.msg});
            }
        });
    }
}

function model_deletesolidwood(modelid, id) {
    if (confirm('Are Yeu Sure?')) {
        $.get(url + 'model/deletesolidwood/' + id, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                model_viewdetail(modelid, '#model_solidwood');
            } else {
                App.errorForm.create({message: result.msg});
            }

        });
    }
}

//model plywood

function model_setplywood(modelid) {
    App.createContainer('model_setplywood_temp');
    var bbox = bootbox.dialog({
        title: 'Add More Plywood',
        message: $('#model_setplywood_temp'),
        closeButton: true,
        //size: 'large',
        //className: "modal-size-midle",
        buttons: {
            Save: {
                label: "<i class=\"fa fa-save\"></i> Save",
                className: "btn btn-success",
                callback: function () {
                    model_saveplywood(modelid);
                    return false;
                }
            },

            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/setplywood/' + modelid, function (content) {
            $('#model_setplywood_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_saveplywood(modelid) {
    var itemid = $('#itemid0').val();
    var unitid = $('#unitid0').val();
    var modelid = $('#modelid_').val();
    var thickness = $('#thickness').val();
    var length = $('#length').val();
    var width = $('#width').val();
    var qty = $('#qty').val();
    var location = $('#location').val();
    var specifications = $('#specifications').val();
    var yield = $('#yield').val();
    var cutting_list = $('#cutting_list').val();
    var msg = "";

    if (itemid == 0) {
        msg += "- Field 'ITEM' Required<br/>";
    }
    if (unitid == 0) {
        msg += "- Field 'UNIT' Required<br/>";
    }
    if (isNaN(qty) || qty == "") {
        msg += "- Field 'Requirement' Required Number<br/>";
    }

    if (msg != "") {
        App.errorForm.create({message: result.msg});
    } else {
        $.post(url + 'model/saveplywood', {
            modelid: modelid,
            itemid: itemid,
            unitid: unitid,
            thickness: thickness,
            length: length,
            width: width,
            qty: qty,
            location: location,
            specifications: specifications,
            yield: yield,
            cutting_list: cutting_list,
        }, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                Client.message.success("Insert Success!");
                App.bootbox.close("model_setplywood");
                model_setplywood(modelid);
                model_viewdetail(modelid, '#model_plywood');
            } else {
                App.errorForm.create({message: result.msg});
            }
        });
    }
}

function model_editplywood(modelid, id) {
    App.createContainer('model_editplywood_temp');
    var bbox = bootbox.dialog({
        title: 'Edit PlyWood',
        message: $('#model_editplywood_temp'),
        onEscape: false,
        closeButton: true,
        //size: 'large',
        className: "modal-size-midle",
        buttons: {
            Update: {
                label: "<i class=\"fa fa-save\"></i> Update",
                className: "btn btn-success",
                callback: function () {
                    model_updateplywood(modelid);
                    return false;
                }
            },
            cancel: {
                label: 'Cancel',
                className: 'btn-danger'
            }
        },
    });
    bbox.init(function () {
        $.get(url + 'model/editplywood/' + modelid + '/' + id, function (content) {
            $('#model_editplywood_temp').empty().append(content);
        }).done(function () {
        }).fail(function (data) {
            bbox.modal("hide");
            Client.message.error({'data': data});
        });
    });
}

function model_updateplywood(modelid) {
    var msg = '';
    if ($('#unitid0').val() === 0) {
        msg += "- Field 'UNIT' Required<br/>";
    }
    if (isNaN($('#qty').val()) || $('#qty').val() === "") {
        msg += "- Field 'Requirement' Required<br/>";
    }

    if (msg !== "") {
        App.errorForm.create({message: msg});
    } else {
        $.post(url + 'model/updateplywood', $('#model_plywood_edit_form').serializeObject(), function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                Client.message.success("Update Success!");
                App.bootbox.close("model_editplywood");
                model_viewdetail($('#modelid').val(), '#model_plywood');
            } else {
                App.errorForm.create({message: result.msg});
            }
        });
    }
}

function model_deleteplywood(modelid, id) {
    if (confirm('Are Yeu Sure?')) {
        $.get(url + 'model/deleteplywood/' + id, function (content) {
            var result = eval('(' + content + ')');
            if (result.success) {
                model_viewdetail(modelid, '#model_plywood');
            } else {
                App.errorForm.create({message: result.msg});
            }

        });
    }
}