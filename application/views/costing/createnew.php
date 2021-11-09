<div class="row" style="width: 700px">
    <table class="" align="center" border="0" width='100%'>
        <tr>
            <td align="right"><span class="labelelement"><span style="color: red;">*&nbsp;</span>Customer :</span></td>
            <td>
                <select id="customerid" class="form-control-sm">
                    <option value="0"></option>
                    <?php
                    foreach ($customer as $result) {
                        echo "<option value='" . $result->id . "'>" . $result->name . "</option>";
                    }
                    ?>
                </select>
            </td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement"><span style="color: red;">*&nbsp;</span>Model :</label></td>  
            <td>
                <input type="hidden" id="modelid0" value="0" />
                <input type="text" id="modelcode0" value="" readonly="readonly" 
                       style="width: 305px;background-color: #fbfbfb;border: 1px solid #aeb5c5;"  class="form-control-sm"/>
                <img style="cursor: pointer;" src="images/list.png" class="miniaction" onclick="costing_model_choose()"/>
            </td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement">Item Costing Desc:</label></td>
            <td><textarea  name="item_costing_desc" id="item_costing_desc"> </textarea></td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement"><span style="color: red;">*&nbsp;</span>Rate :</label></td>
            <td>                    
                <select id="rate" style="width: 120px"  class="form-control-sm">
                    <option value="0"></option>
                    <?php
                    foreach ($rate as $rate) {
                        echo "<option value='" . $rate->id . "-" . $rate->value . "'>" . $rate->currency_from . "->" . $rate->currency_to . "  " . $rate->value . "</option>";
                    }
                    ?>
                </select>
            </td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement"><span style="color: red;">*&nbsp;</span>Fixed Cost :</label></td>
            <td><input type="text" size="3" name="fixed_cost" id="fixed_cost" value="9" style="text-align: center"/>%</td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement"><span style="color: red;">*&nbsp;</span>Variable Cost :</label></td>
            <td><input type="text" size="3" name="variable_cost" id="variable_cost" value="9" style="text-align: center"/>%</td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement"><span style="color: red;">*&nbsp;</span>Profit Percentage :</label></td>
            <td><input type="text" size="3" name="profit_percentage" id="profit_percentage" value="20" style="text-align: center"/></td>
        </tr>            
        <tr>
            <td align="right"><label class="labelelement"><span style="color: red;">*&nbsp;</span>Port origin cost :</label></td>
            <td><input type="text" size="3" name="port_origin_cost" id="port_origin_cost" value="1.45" style="text-align: center"/>%</td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement"><span style="color: red;">*&nbsp;</span>Date :</label></td>
            <td>
                <script type="text/javascript" >
//                     $(function() {
//                         $("#date").datepicker({
//                             dateFormat: "yy-mm-dd",
//                             changeMonth: true,
//                             changeYear:true
//                         }).focus(function() {
//                             $("#date").datepicker("show");
//                         }); 
//                     });
                </script>
                <input type="date" size="10" name="date" id="date" value=""/>
            </td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement">Wood:</label></td>
            <td><textarea  name="q_wood" id="q_wood" rows="1" cols="50"> </textarea></td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement">Veneer:</label></td>
            <td><textarea  name="q_veneer" id="q_veneer" rows="1" cols="50"> </textarea></td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement">Upholstery Type:</label></td>
            <td>
                <select  name="q_upholstery_type" id="q_upholstery_type"> 
                    <option value='CS'>CS</option>
                </select>
            </td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement">Fabric(COM):</label></td>
            <td><textarea  name="q_fabric" id="q_fabric" rows="1" cols="50"> </textarea></td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement">Leather(COL):</label></td>
            <td><textarea  name="q_leather" id="q_leather" rows="1" cols="50"> </textarea></td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement">Other Remarks:</label></td>
            <td><textarea  name="q_other_remarks" id="q_other_remarks" rows="1" cols="50"> </textarea></td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement">Shipping Configuration:</label></td>
            <td>
                <select  name="q_shipping_conf" id="q_shipping_conf"> 
                    <option value='Assembled'>Assembled</option>
                    <option value='KD'>KD</option>
                </select>
            </td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement">Packing:</label></td>
            <td>
                <select  name="q_packing" id="q_packing"> 
                    <option value='BTRS'>BTRS</option>
                </select>
            </td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement">Quantity Per Box</label></td>
            <td><input text name='q_qty_perbox' id='q_qty_perbox'></td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement">Finishes:</label></td>
            <td>
                <select  name="q_finishes" id="item_costing_q_wood"> 
                    <option value='FINISHED'>FINISHED</option>
                    <option value='RAW FRAME'>RAW FRAME</option>
                </select>
            </td>
        </tr>
        <tr>
            <td align="right"><label class="labelelement">Category:</label></td>
            <td>
                <select  name="lod_category_create_id" id="lod_category_create_id"> 
                    <option value='A'>A</option>
                    <option value='B'>B</option>
                    <option value='C'>C</option>
                </select>
            </td>
        </tr>

        <tr valign="top">
            <td colspan="2" style="height: 30px;"></td>
        </tr>
        <tr valign="top">

            <td style="vertical-align: middle" align="right"><span class="labelelement">Prepared By :</span></td>
            <td colspan="2">
                <select id="name-apprvove1" name="preparedby" style="width: 200px;"></select>
                <script>
                    $(function () {
                        function formatEmployee(employee) {
                            return $('<span>' + employee.text + '</span>');
                        }
                        ;
                        $("#name-apprvove1").select2({
                            ajax: {
                                url: url + 'employee/search_autocomplete_prepared_by',
                                delay: 250,
                                dataType: 'json',
                                data: function (params) {
                                    var query = {
                                        term: params.term,
                                    }
                                    return query;
                                },
                                processResults: function (data) {
                                    return {
                                        results: data
                                    };
                                },
                            },
                            minimumInputLength: 1,
                            templateResult: formatEmployee,
                        });
                    });
                </script>
                <button onclick="App.resetSelect2('#name-apprvove1')">Clear</button>
            </td>
        </tr>
        <tr valign="top">
            <td style="vertical-align: middle" align="right"><span class="labelelement">Checked By :</span></td>
            <td colspan="2">
                <select id="name-apprvove2" name="checkedby" style="width: 200px;"></select>
                <script>
                    $(function () {
                        function formatEmployee(employee) {
                            return $('<span>' + employee.text + '</span>');
                        }
                        ;
                        $("#name-apprvove2").select2({
                            ajax: {
                                url: url + 'employee/search_autocomplete2',
                                delay: 250,
                                dataType: 'json',
                                data: function (params) {
                                    var query = {
                                        term: params.term,
                                    }
                                    return query;
                                },
                                processResults: function (data) {
                                    return {
                                        results: data
                                    };
                                },
                            },
                            minimumInputLength: 1,
                            templateResult: formatEmployee,
                        });
                    });
                </script>
                <button onclick="App.resetSelect2('#name-apprvove2')">Clear</button>
            </td>
        </tr>
        <tr valign="top">
            <td style="vertical-align: middle" align="right"><span class="labelelement">Approved By :</span></td>
            <td colspan="2">
                <select id="name-apprvove3" name="approvedby" style="width: 200px;"></select>
                <script>
                    $(function () {
                        function formatEmployee(employee) {
                            return $('<span>' + employee.text + '</span>');
                        }
                        ;
                        $("#name-apprvove3").select2({
                            ajax: {
                                url: url + 'employee/search_autocomplete2',
                                delay: 250,
                                dataType: 'json',
                                data: function (params) {
                                    var query = {
                                        term: params.term,
                                    }
                                    return query;
                                },
                                processResults: function (data) {
                                    return {
                                        results: data
                                    };
                                },
                            },
                            minimumInputLength: 1,
                            templateResult: formatEmployee,
                        });
                    });
                </script>
                <button onclick="App.resetSelect2('#name-apprvove3')">Clear</button>
            </td>
        </tr>



        <tr>
            <td colspan="2" align="center"><br/>
                <button type="button" class="btn btn-md btn-success" onclick="costing_savenew()">Save</button>
                <button type="button" class="btn btn-md btn-secondary" data-dismiss="modal">Cancel</button>
            </td> 
        </tr>
    </table>
</div>
