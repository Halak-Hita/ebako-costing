<html>
    <head>
        <?php $base_url = base_url(); ?>

        <link href="<?php echo $base_url ?>assets/vendors/nifty/css/bootstrap.min.css" rel="stylesheet">
        <link href="<?php echo $base_url ?>assets/vendors/nifty/css/nifty.min.css" rel="stylesheet">
        <script type="text/javascript">var url = '<?php echo base_url() ?>';</script>

        <script src="<?php echo base_url() ?>assets/vendors/jquery/js/jquery-1.9.1.min.js"></script>
        <script src="<?php echo base_url() ?>assets/js/Client.js"></script>
        <script src="<?php echo base_url() ?>js/costing_pricelist.js"></script>
        <style type="text/css">
            table.sample {
                border-width: 0px 0px 0px 0px;
                border-spacing: 0px;
                border-style: solid solid solid solid;
                border-color: black black black black;
                border-collapse: collapse;
                background-color: white;
            }
            table.sample td {
                border-width: 1px 1px 1px 1px;
                padding: 0px 0px 0px 0px;
                border-style: solid solid solid solid;
                border-color: black black black black;
                background-color: white;
                -moz-border-radius: 0px 0px 0px 0px;
                font-size: 12px;
            }
            table.sample th {
                text-align: center;
            }

            table { page-break-inside:avoid }
            tr    { page-break-inside:avoid; page-break-after:avoid }
            @media print {
                a[href]:after {
                    content: none !important;
                }
            }
            @page {
                margin: 10mm;
            }

            body {
                font: 9pt sans-serif;
                line-height: 1.3;

                /* Avoid fixed header and footer to overlap page content */
                margin-top: 100px;
                margin-bottom: 50px;
            }

            #header {
                position: fixed;
                top: 0;
                width: 100%;
                height: 100px;
                /* For testing */
                background: yellow; 
                opacity: 0.5;
            }

            #footer {
                position: fixed;
                bottom: 0;
                width: 100%;
                height: 20px;
                font-size: 9pt;
                color: #777;
                /* For testing */
                /*background: red;*/
                opacity: 0.5;
                content: "Page " counter(page) " of " counter(pages);
            }
        </style>
        <STYLE TYPE="text/css">
            P.breakhere {page-break-before: always};
        </STYLE>

    </head>
    <body style="margin-top: 20px">
    <center>
        <table>
            <thead><tr><td>
                        <div id="top_bar_notification" style="display: none;"></div>
                        <div style="width: 90%;text-align: left;">
                            <h2 onclick="show_hide_header()" style="cursor: pointer;">PRICE LIST</h2>
                        </div>
                        <div id="header_pice_list" style="width: 90%;text-align: center;padding-bottom: 1px;">
                            <table style="float: left;padding-right: 10px;" >
                                <?php if (@$price_list_base_on == "rate") { ?>
                                    <tr>
                                        <td>Range Rate</td>
                                        <td> : </td>
                                        <td> <?php echo @$start_ratevalue; ?> - <?php echo @$end_ratevalue; ?> </td>
                                    </tr>
                                    <tr>
                                        <td align="center">Profit</td>
                                        <td> : </td>
                                        <td> <b><?php echo @$profit_percentage; ?></b> %</td>
                                    </tr>
                                <?php } else { ?>
                                    <tr>
                                        <td align="center">Range Profit (%)</td>
                                        <td> : </td>
                                        <td> <?php echo @$start_profit; ?> - <?php echo @$end_profit; ?> </td>
                                    </tr>
                                    <tr>
                                        <td>Rate</td>
                                        <td> : </td>
                                        <td> <b><?php echo @$ratevalue; ?></b></td>
                                    </tr>
                                <?php } ?>

                                <tr>
                                    <td>Fixed Cost</td>
                                    <td> : </td>
                                    <td> <b><?php echo @$fixed_cost; ?></b> %</td>
                                </tr>
                                <tr>
                                    <td>Picklist Mark-Up</td>
                                    <td> : </td>
                                    <td> <b><?php echo @$picklist_mark_up; ?></b> </td>
                                </tr>
                            </table>
                            <table style="">
                                <tr>
                                    <td colspan="3" style="height: 20px;"></td>
                                </tr>
                                <tr>
                                    <td>Variable Cost </td>
                                    <td> : </td>
                                    <td> <b><?php echo @$variable_cost; ?></b> %</td>
                                </tr>
                                <tr>
                                    <td>Port Origin Cost </td>
                                    <td> : </td>
                                    <td> <b><?php echo @$port_origin_cost; ?></b> %</td>
                                </tr>
                                <tr>
                                    <td>Picklist Rate</td>
                                    <td> : </td>
                                    <td> <b><?php echo @$picklist_ratevalue; ?></b></td>
                                </tr>
                            </table>
                        </div>
                        </center>
                    </td></tr>
            </thead>
            <tr><td style="border:1px solid black;font-family: times;font-size:1 ;">
                    <?php
                    $type = $_REQUEST['type'];
                    ?>
                    <table celpadding="2" cellspacing="2" 
                           class="sample">
                               <?php
                               $ranges_length = sizeof($ranges);
                               ?>
                        <thead>

                            <?php
                            if ($type == 'quotation' || $type == 'quotation_p') {
                                ?>
                                <tr bgcolor="yellow">
                                    <th>
                                        <input type="submit" class="btn btn-md btn-warning pull-left" value="Preview Quotation" onclick="return create_quotation('prev')"></th>
                                    <th>
                                        <input type="submit" class="btn btn-md btn-success pull-left" value="Create Quotation" onclick="return create_quotation('create')"></th>

                                    <th colspan="1">Revision From Quotation</th>
                                    <th colspan="14">
                                        <select  id="parent_sales_quotes_id">
                                            <option value="0"></option>
                                            <?php
                                            foreach ($sales_quotes as $result) {
                                                echo "<option value='" . $result->id . "'>" . $result->id . "=>" . $result->quotation_number . "</option>";
                                            }
                                            ?>
                                        </select>
                                    </th>

                                </tr>
                                <tr bgcolor="yellow" >
                                    <th align="right" >To :</th>
                                    <th colspan=3> <input type="text" name="to" id="quo_to_id" size="50"></th>
                                    <th align="right" colspan="2">Reference :</th>
                                    <th colspan=3>  <input type="text" name="ref" id="quo_ref_id" size="50"></th>
                                    <th align="right" colspan="2">Customer :</th>
                                    <th colspan=6> 
                                        <input type="text" name="cust" id="quo_cust_id" size="50" value="<?php echo $datacust[0]->name; ?>">
                                        <input type="hidden" name="custid" id="quo_custid_id" size="50" value="<?php echo $datacust[0]->id; ?>">
                                        <input type="hidden" name="pick_list_rate_value_id" id="pick_list_rate_value_id" size="50" value="<?php echo $_GET['picklist_ratevalue']; ?>">
                                        <input type="hidden" name="picklist_mark_up_id" id="picklist_mark_up_id" size="50" value="<?php echo $_GET['picklist_mark_up']; ?>">
                                        <input type="hidden" name="fixed_cost_id" id="fixed_cost_id" size="50" value="<?php echo $_GET['fixed_cost']; ?>">
                                        <input type="hidden" name="variable_cost_id" id="variable_cost_id" size="50" value="<?php echo $_GET['variable_cost']; ?>">
                                        <input type="hidden" name="port_origin_cost_id" id="port_origin_cost_id" size="50" value="<?php echo $_GET['port_origin_cost']; ?>">
                                    </th>
                                </tr>
                                <tr>
                                    <th colspan="16"> <b>Valid Until : </b>
                                        <input type="date" name="valid_date" id="valid_date_id"/>
                                    </th>
                                </tr>
                                <tr>
                                    <td colspan="17">
                                        <input type="checkbox" name=wood id="wood_id" checked="true">Wood &nbsp;&nbsp;
                                        <input type="checkbox" name="veneer" id="veneer_id" value="1" checked="true">Veneer &nbsp;&nbsp;
                                        <input type="checkbox" name="upstype" id="upstype_id" value="1" checked="true">Upholstery Type &nbsp;&nbsp;
                                        <input type="checkbox" name="ship_conf" id="ship_conf_id" value="1" checked="true">Shipping Config &nbsp;&nbsp;
                                        <input type="checkbox" name="fabric" id="fabric_id" value="1" checked="true">Fabric &nbsp;&nbsp;
                                        <input type="checkbox" name="leather" id="leather_id" value="1" checked="true">Leather &nbsp;&nbsp;
                                        <input type="checkbox" name="packing" id="packing_id" value="1" checked="true">Packing &nbsp;&nbsp;
                                        <input type="checkbox" name="qtypp" id="qtypp_id" value="1" checked="true">Qty Per Packing &nbsp;&nbsp;
                                        <input type="checkbox" name="other" id="other_id" value="1" checked="true">Other Remarks &nbsp;&nbsp;
                                        <input type="checkbox" name="box_dim" id="box_dim_id" value="1" checked="true">Box Dimension &nbsp;&nbsp;
                                        <input type="checkbox" name="cube" id="cube_id" value="1" checked="true">Cube &nbsp;&nbsp;
                                    </td>
                                </tr>

                            <?php } ?>
                            <tr style="border:1px solid #000;background-color: #dfdfe1;page-break-inside:avoid; page-break-after:auto;">
                                <?php
                                if ($type == 'quotation' || $type == 'quotation_p') {
                                    ?>
                                    <th rowspan="2" width="2%" style="border:1px solid black;"><b></b></th>
                                <?php } ?>
                                <th rowspan="2" width="2%" style="border:1px solid black;"><b>No.</b></th>

                                <th rowspan="2" style="border:1px solid #000;padding: 5px;max-width: 100px;width: 100px;word-wrap:break-word;">Model Code</th>
                                <th rowspan="2" style="border:1px solid #000;padding: 5px;max-width: 100px;width: 100px;word-wrap:break-word;">Cust. Code</th>

                                <th rowspan="2" style="border:1px solid #000;padding: 5px;max-width: 100px;width: 100px;word-wrap:break-word;">Customer</th>
                                <th rowspan="2" style="border:1px solid #000;padding: 5px;max-width: 100px;width: 100px;word-wrap:break-word;">Image</th>
                                <th colspan="3" style="border:1px solid #000;padding: 1px;word-wrap:break-word;">Dimension</th>
                                <th rowspan="2"  style="border:1px solid #000;padding: 5px;max-width: 100px;width: 100px;word-wrap:break-word;">Description</th>
                                <th rowspan="2"  style="border:1px solid #000;padding: 5px;max-width: 100px;width: 100px;word-wrap:break-word;">Material</th>
                                <?php
                                if ($type == 'pricelist') {
                                    ?>
                                    <th rowspan="2" width="2%" style="border:1px solid black;"><b>Category</b></th>
                                <?php } ?>
                                <th rowspan="2" style="border:1px solid #000;padding: 5px;max-width: 100px;width: 100px;word-wrap:break-word;">Target Price</th>
                                <?php
                                if ($type == 'quotation_p' || $type == 'pricelist_p') {
                                    ?>
                                    <th rowspan="2" style="border:1px solid #000;padding: 5px;max-width: 100px;width: 100px;word-wrap:break-word;">Quantity</th>
                                <?php } ?>
                                <th colspan="<?php echo $ranges_length ?>" width="" style="border:1px solid black;height: 25px;text-align: center;">
                                    <b><?php echo @$price_list_base_on == "rate" ? "Rate" : "Profit (%)"; ?></b>
                                </th>

                            </tr>
                            <tr>
                                <th style="border:1px solid black;" width="5">W</th>
                                <th style="border:1px solid black;" width="5">D</th>
                                <th style="border:1px solid black;" width="5">H</th>
                                <?php
                                foreach ($ranges as $range) {
                                    echo '<th style="border:1px solid black;height:30px;background-color: #caffbe;">' . $range . '</th>';
                                }
                                ?>
                            </tr>
                        </thead>
                        <?php
                        $no = 1;
                        $selected_model = array();
                        foreach ($costing as $result) {
                            //var_dump($costing);
                            ?>
                            <tr valign="top" style="background-color: <?php echo $no % 2 == 0 ? "#fbfbfb" : "#fff" ?>;">
                                <?php
                                if ($type == 'quotation' || $type == 'quotation_p') {
                                    ?>
                                    <td style="border:1px solid #000;padding: 5px;">  
                                        <input type="checkbox" name="selected_model" value="<?php echo $result->id; ?>" >
                                    </td>
                                <?php } ?>
                                <td style="border:1px solid #000;padding: 5px;" align="right"><?php echo $no++; ?></td>

                                <td style="border:1px solid #000;padding: 5px;"> 
                                    <?php echo "<a href=\"" . base_url() . "costing/prints/" . $result->id . "/print/0\" target=\"_blank\" style=\"color: #5255f2;text-decoration: none;\">" . $result->code . "</a>"; ?> 
                                    <?php //echo $result->code; ?> 
                                </td>
                                <td style="border:1px solid #000;padding: 5px;"><?php echo $result->custcode ?></td>
                                <td style="border:1px solid #000;padding: 5px;"><?php echo $result->customername ?></td>

                                <td style="border:1px solid #000;text-align: center;vertical-align: middle;" >
                                    <img src=" <?php echo base_url() ?>/files/<?php echo @$result->filename; ?>" class="miniaction" 
                                         onclick="model_imageview('<?php echo @$result->filename; ?>')" 
                                         style="max-width: 60px;width: 60px;">
                                </td>
                                <td style="border:1px solid #000;padding: 5px; text-align: center"><?php echo $result->dw ?></td>
                                <td style="border:1px solid #000;padding: 5px;text-align: center;"><?php echo $result->dd ?></td>
                                <td style="border:1px solid #000;padding: 5px; text-align: center;"><?php echo $result->dht ?></td>
                                <td style="border:1px solid #000;padding: 5px;"><?php echo $result->description ?></td>
                                <td style="border:1px solid #000;padding: 5px;"><?php echo $result->item_costing_desc ?></td>
                                <?php
                                if ($type == 'pricelist') {
                                    ?>
                                <td style="border:1px solid #000;padding: 5px; text-align: center;"><?php echo $result->lod_category ?></td>
                                <?php } ?>

                                <td style="border:1px solid #000;padding: 5px;text-align: right;padding-right: 3px;width: 20px;">
                                    <input style="border: 1px #d0d2cf solid;" type="text" value="<?php echo @$target_price > 0 ? @$target_price : "" ?>" size="8">
                                </td>
                                <?php
                                if ($type == 'quotation_p' || $type == 'pricelist_p') {
                                    ?>
                                    <td style="border:1px solid #000;padding: 5px;text-align: right;padding-right: 3px;width: 20px;">
                                        <input style="border: 1px #d0d2cf solid;" type="text" value="<?php echo @$quantity > 0 ? @$quantity : "" ?>" size="8">
                                    </td>
                                <?php } ?>

                                <?php
                                $ratevalue_tmp = 0;
                                $profit_percentage_tmp = 0;

                                foreach ($ranges as $range) {
                                    if (@$price_list_base_on == "rate") {
                                        $ratevalue_tmp = $range;
                                        $profit_percentage_tmp = @$profit_percentage;
                                    } else {
                                        $ratevalue_tmp = @$ratevalue;
                                        $profit_percentage_tmp = $range;
                                    }
                                    ?>

                                    <td style="border:1px solid #000;padding: 5px;max-width: 80px;width: 50px;word-wrap:break-word;text-align: center" class="td_<?php echo $result->id; ?>" 
                                        id="td_<?php echo $result->id; ?>_rate_<?php echo @$ratevalue_tmp; ?>_profit_<?php echo @$profit_percentage_tmp; ?>">
                                        <a href="javascript:void(0)" style="text-decoration: none;"
                                           onclick="print_preview_cost_sheet(<?php echo "'" . $result->id . "', '" . @$ratevalue_tmp . "', '" . @$profit_percentage_tmp . "', '" . @$fixed_cost . "', '" . @$variable_cost . "', '" . @$port_origin_cost . "', '" . @$picklist_mark_up . "', '" . @$picklist_ratevalue . "'" ?>)">
                                               <?php echo number_format($costing_details[$result->id][$range], 2) ?> 
                                        </a> 
                                        <br/>
                                        <br/>
                                        <input type="radio" name="selected_price_<?php echo $result->id; ?>" value="<?php echo $no; ?>" style="width: 16px;height: 16px;" 
                                               onclick="set_as_fixed_cost_sheet(<?php echo "'" . $result->id . "', '" . @$ratevalue_tmp . "', '" . @$profit_percentage_tmp . "', '" . @$fixed_cost . "', '" . @$variable_cost . "', '" . @$port_origin_cost . "', '" . @$picklist_mark_up . "', '" . @$picklist_ratevalue . "', '" . $costing_details[$result->id][$range] . "'" ?>)"
                                               title="Select Price As Fixed Cost Sheet"
                                               >
                                        </div>
                                    </td>

                                <?php }
                                ?>

                            </tr>
                            <?php
                            // echo $no;
                            // if($no%5==0 && $no>5)
                            //   echo "<P CLASS=breakhere></p>";
                        }
                        ?>

                    </table>	
                </td>
            </tr>
        </table>
    </body>
    <script type="text/javascript">

        function print_preview_cost_sheet(id, ratevalue, profit_percentage, fixed_cost, variable_cost, port_origin_cost, picklist_mark_up, picklist_ratevalue) {
            var url = "<?php echo base_url() ?>";
            var full_url = url + "costing_pricelist/print_preview_cost_sheet?id=" + id
                    + "&ratevalue=" + ratevalue
                    + "&profit_percentage=" + profit_percentage
                    + "&fixed_cost=" + fixed_cost
                    + "&variable_cost=" + variable_cost
                    + "&port_origin_cost=" + port_origin_cost
                    + "&picklist_mark_up=" + picklist_mark_up
                    + "&picklist_ratevalue=" + picklist_ratevalue;

            var win = window.open(full_url, '_blank');
            win.focus();

        }

        function show_hide_header() {
            var e = document.getElementById("header_pice_list");
            if (e.style.display == 'block') {
                e.style.display = 'none';
            } else {
                e.style.display = 'block';
            }
        }
        function create_quotation(jenis)
        {
            //alert("testing");
            var wood = document.querySelector('#wood_id:checked') !== null;
            var veneer = document.querySelector('#veneer_id:checked') !== null;
            var upstype = document.querySelector('#upstype_id:checked') !== null;
            var ship_conf = document.querySelector('#ship_conf_id:checked') !== null;
            var fabric = document.querySelector('#fabric_id:checked') !== null;
            var packing = document.querySelector('#packing_id:checked') !== null;
            var qtypp = document.querySelector('#qtypp_id:checked') !== null;
            var other = document.querySelector('#other_id:checked') !== null;
            var box_dim = document.querySelector('#box_dim_id:checked') !== null;
            var cube = document.querySelector('#cube_id:checked') !== null;
            var leather = document.querySelector('#leather_id:checked') !== null;
            var favorite = [];
            var to = $('#quo_to_id').val();
            var ref = $('#quo_ref_id').val();
            var ref2 = ref.replace('#',"=!=");
            ref = ref2.replace('&',"!=!");
            //alert(ref);
            var cust = $('#quo_cust_id').val();
            var valid_date = $('#valid_date_id').val();
            var custid = $('#quo_custid_id').val();
            var pick_list_rate_value_id = $('#pick_list_rate_value_id').val();
            var picklist_mark_up_id = $('#picklist_mark_up_id').val();
            var fixed_cost_id = $('#fixed_cost_id').val();
            var variable_cost_id = $('#variable_cost_id').val();
            var port_origin_cost_id = $('#port_origin_cost_id').val();
            var parent_sales_quotes = $('#parent_sales_quotes_id').val();
            $.each($("input[name='selected_model']:checked"), function () {
                favorite.push($(this).val());
            });
            // alert("My favourite sports are: " + favorite.join(", "));

            // alert("costing selected=" + favorite);
            var url = "<?php echo base_url() ?>";
            var full_url = url + "costing_pricelist/create_quotation?id=" + favorite + "&to=" + to + "&ref=" + ref + "&cust=" + cust
                    + "&wood=" + wood
                    + "&veneer=" + veneer
                    + "&upstype=" + upstype
                    + "&ship_conf=" + ship_conf
                    + "&fabric=" + fabric
                    + "&leather=" + leather
                    + "&packing=" + packing
                    + "&qtypp=" + qtypp
                    + "&other=" + other
                    + "&box_dim=" + box_dim
                    + "&cube=" + cube
                    + "&valid_date=" + valid_date
                    + "&custid=" + custid
                    + "&pick_list_rate_value=" + pick_list_rate_value_id
                    + "&picklist_mark_up=" + picklist_mark_up_id
                    + "&fixed_cost=" + fixed_cost_id
                    + "&variable_cost=" + variable_cost_id
                    + "&port_origin_cost=" + port_origin_cost_id
                    + "&parent_sales_quotes=" + parent_sales_quotes
                    + "&jenis=" + jenis
                    ;

            var win = window.open(full_url, '_blank');
            win.focus();
        }

    </script>
</html>