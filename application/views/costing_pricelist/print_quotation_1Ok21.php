<html>
    <style type="text/css">
        @page {
            margin: 10mm;
        }

        body {
            font: 9pt sans-serif;
            line-height: 1.3;

            /* Avoid fixed header and footer to overlap page content */
            margin-top: 100px;
            margin-bottom: 50px;
            counter-reset: page;
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
        #pageFooter
        {
            page-break-before: always;
            counter-increment: page;
        }
        #pageFooter:after
        {
            display: block;
            text-align: right;
            content: "Page " counter(page);
        }
        #pageFooter.first.page
        {
            page-break-before: avoid;
        }

    </style>
    <?php
    //  var_dump($quotation);
    // echo "<hr>";
    //  var_dump($quo_item);
    //exit();
    ?>
    <body style="margin-top: 10px">
        <div id="content">
            <table>
                <thead>
                    <tr>
                        <td>
                            <div style="text-align: left;">
                                <table celpadding="0" cellspacing="0" style="border:0px solid black;width:100%">
                                    <thead>
                                        <tr>
                                            <th style="border:0px solid #000;padding: 5px;max-width: 150px;width: 150px;word-wrap:break-word;" align="left">
                                                <b>PT EBAKO NUSANTARA</b><br>
                                                <font size="2" face="courier">Jl. Terboyo Industri Blok N-3C <br>
                                                Kawasan Industri Terboyo Semarang - Indonesia<br>
                                                Telp. 62.24.6593407 Fax. 62.24.6591732
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                                <table celpadding="0" cellspacing="0" style="border:0px solid black;width:100%;font-size: 12px;font-family:Verdana,Georgia,Serif;" ">
                                    <thead>
                                        <tr style="border-bottom:1px solid black;">
                                            <td style="border-bottom:1px solid black;width: 10%;" align="left">
                                                To
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 1%;" align="left">
                                                :
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 30%;" align="left">
                                                <?php echo $quotation[0]->to_cp; ?>
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 10%;" align="left">
                                                From
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 1%;" align="left">
                                                :
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 30%;" align="left">
                                                Costing Department
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="border-bottom:1px solid black;width: 10%;" align="left">
                                                Company
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 1%;" align="left">
                                                :
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 30%;" align="left">
                                                <?php echo $quotation[0]->cust_name; ?>
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 20%;" align="left">
                                                Date
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 1%;" align="left">
                                                :
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 30%;" align="left">
                                                <?php
                                                echo date('d M Y', strtotime($quotation[0]->quo_date));
                                                if ($quotation[0]->prev_quo_date != null)
                                                    echo "<br><font color=red size=2>Prev date :" . date('d M Y', strtotime($quotation[0]->prev_quo_date)) . "</font>";
                                                ?>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="border-bottom:1px solid black;width: 10%;" align="left">
                                                Fax No
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 1%;" align="left">
                                                :
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 30%;" align="left">

                                            </td>
                                            <td style="border-bottom:1px solid black;width: 20%;" align="left">
                                                Total Page(<font size=3>s</font>)
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 1%;" align="left">
                                                :
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 30%;" align="left">
                                                <!--<div id="pageFooter"> </div>-->
                                                <?php echo (int) (round(count($quo_item) / 3)); ?>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="border-bottom:1px solid black;width: 10%;" align="left">
                                                Reference
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 1%;" align="left">
                                                :
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 80%;" align="left" colspan="9">

                                                <?php echo $quotation[0]->reference; ?>
                                            </td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <!--</div>-->
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <table celpadding="0" cellspacing="0" style="border:0px solid black;width:100%;font-size: 8px;font-family:Verdana,Georgia,Serif;" class="page">
                                <caption>
                                    <h2 onclick="show_hide_header()" style="cursor: pointer;">QUOTATION - No. 
                                        <?php echo $quotation[0]->quotation_number; ?></h2></caption>
                                <thead>
                                    <tr style="background-color: #dfdfe1;page-break-inside:avoid; page-break-after:auto;">
                                        <th style="border:1px solid black;"><b>No.</b></th>

                                        <th style="border:1px solid black;">Model / Sketch</th>
                                        <th style="border:1px solid #000;padding: 5px;max-width: 70px;width: 70px;word-wrap:break-word;">Finishes</th>

                                        <th style="border:1px solid #000;padding: 5px;max-width: 150px;width: 150px;word-wrap:break-word;" >Unit Price (US$)</th>
                                        <th style="border:1px solid black;">Remarks</th>

                                    </tr>
                                </thead>
                                <?php
                                //exit;
                                $no = 0;
                                $selected_model = array();
                                //var_dump($costing);
                                // echo count($costing);
                                foreach ($quo_item as $result) {
                                    $before = $this->model_costing->select_item_by_quotationid($quotation[0]->parent_sales_quotes_id, $result->costingid);
                                    //var_dump($before);
                                    $no += 1;
                                    ?>
                                    <tr valign="top" style="background-color: <?php echo $no % 2 == 0 ? "#fbfbfb" : "#fff" ?>;">
                                        <td style="border:1px solid #000;padding: 5px;" align="center" valign="middle"><?php echo $no; ?></td>

                                        <td style="border:1px solid #000;padding: 5px;max-width: 390px;width: 390px;max-height: 150px;height: 150px;word-wrap:break-word;vertical-align: bottom;"> 
                                    <center><img src=" <?php echo base_url() ?>/files/<?php echo @$result->filename; ?>" class="miniaction" 
                                                 onclick="model_imageview('<?php echo @$result->filename; ?>')" 
                                                 style="max-width: 150px;width: 150px;max-height: 150px;height: 150px;"></center>
                                        <?php
                                        echo "<font color=blue size=1><center>" . $result->custcode . "</center></font><font size=><br> " . $result->code . "<br> " . $result->model_desc;
                                        echo '<br>W' . number_format(($result->dw / 25.4), 2) . '" x ';
                                        echo 'D' . number_format(($result->dd / 25.4), 2) . '" x ';
                                        echo 'H' . number_format(($result->dht / 25.4), 2) . '"';
                                        echo '<br>W' . number_format(($result->dw) / 10, 2) . ' x ';
                                        echo 'D' . number_format(($result->dd) / 10, 2) . ' x ';
                                        echo 'H' . number_format(($result->dht) / 10, 2) . ' cm';
                                        ?> 
                            </td>
                            <td style="border:1px solid #000;padding: 5px;width: 40px;max-width: 40px;" align="center" valign="middle"> 
                                <?php
                                if (count($before) > 0) {
                                    if ($before[0]->q_finishes != $result->q_finishes)
                                        echo "<font color=red>";
                                }
                                echo $result->q_finishes;
                                ?> 
                            </td>
                            <td style="border:1px solid #000;padding: 5px;" align="center" valign="middle"> 
                                <?php echo number_format($result->fob_price, 2); ?> 
                            </td>
                            <td style="border:1px solid #000;padding: 5px;max-width: 450px;width: 450px;max-height: 230px;height: 230px;word-wrap:break-word;"  valign="middle"> 
                                <table width="100%" celpadding="0" cellspacing="0" style="border-collapse: collapse;border:0px solid black;font-size: 9px;font-family:Verdana,Georgia,Serif;page-break-inside:auto;word-wrap:break-word;">
                                    <thead style="word-wrap:break-word;">
                                        <?php if (count($before) > 0) { ?>
                                            <tr>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" ><font color=red>Previous Price</font></td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 60%;width: 60%;word-wrap:break-word;" >
                                                    <font color=red><?php echo $before[0]->fob_price; ?> </font>
                                                </td>
                                            </tr>
                                            <?php
                                        }
                                        if ($_REQUEST['wood'] == 'true') {
                                            ?>
                                            <tr>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Wood</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 60%;width: 60%;word-wrap:break-word;" >
                                                    <?php
                                                    if (count($before) > 0) {
                                                        if ($before[0]->q_wood != $result->q_wood)
                                                            echo "<font color=red>";
                                                    }
                                                    echo $result->q_wood;
                                                    ?> 
                                                </td>
                                            </tr>
                                            <?php
                                        }
                                        if ($_REQUEST['veneer'] == 'true') {
                                            ?>
                                            <tr>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Veneer</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                    <?php
                                                    if (count($before) > 0) {
                                                        if ($before[0]->q_veneer != $result->q_veneer)
                                                            echo "<font color=red>";
                                                    }
                                                    echo $result->q_veneer;
                                                    ?> 
                                                </td>
                                            </tr>
                                            <?php
                                        }
                                        if ($_REQUEST['upstype'] == 'true') {
                                            ?>
                                            <tr>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Upholstery Type</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                    <?php
                                                    if (count($before) > 0) {
                                                        if ($before[0]->q_upholstery_type != $result->q_upholstery_type)
                                                            echo "<font color=red>";
                                                    }
                                                    echo $result->q_upholstery_type;
                                                    ?> 
                                                </td>
                                            </tr>
                                            <?php
                                        }
                                        if ($_REQUEST['ship_conf'] == 'true') {
                                            ?>
                                            <tr>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Shipping Config</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                    <?php
                                                    if (count($before) > 0) {
                                                        if ($before[0]->q_shipping_conf != $result->q_shipping_conf)
                                                            echo "<font color=red>";
                                                    }
                                                    echo $result->q_shipping_conf;
                                                    ?> 
                                                </td>
                                            </tr>
                                            <?php
                                        }
                                        if ($_REQUEST['fabric'] == 'true') {
                                            ?>
                                            <tr>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Fabric</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                    <?php
                                                    if (count($before) > 0) {
                                                        if ($before[0]->q_fabric != $result->q_fabric)
                                                            echo "<font color=red>";
                                                    }
                                                    echo $result->q_fabric;
                                                    ?> 
                                                </td>
                                            </tr>
                                            <?php
                                        }
                                        if ($_REQUEST['leather'] == 'true') {
                                            ?>
                                            <tr>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Leather</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                    <?php
                                                    if (count($before) > 0) {
                                                        if ($before[0]->q_leather != $result->q_leather)
                                                            echo "<font color=red>";
                                                    }
                                                    echo $result->q_leather;
                                                    ?> 
                                                </td>
                                            </tr>
                                            <?php
                                        }
                                        if ($_REQUEST['packing'] == 'true') {
                                            ?>
                                            <tr>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Packing</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                    <?php
                                                    if (count($before) > 0) {
                                                        if ($before[0]->q_packing != $result->q_packing)
                                                            echo "<font color=red>";
                                                    }
                                                    echo $result->q_packing;
                                                    ?> 
                                                </td>
                                            </tr>
                                            <?php
                                        }
                                        if ($_REQUEST['qtypp'] == 'true') {
                                            ?>
                                            <tr>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Qty per Packing</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                    <?php
                                                    if (count($before) > 0) {
                                                        if ($before[0]->q_qty_perbox != $result->q_qty_perbox)
                                                            echo "<font color=red>";
                                                    }
                                                    echo $result->q_qty_perbox;
                                                    ?> 
                                                </td>
                                            </tr>
                                            <?php
                                        }
                                        if ($_REQUEST['other'] == 'true') {
                                            ?>
                                            <tr>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 550px;width: 550px;word-wrap:break-word;" >Other Remarks</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                    <?php
                                                    if (count($before) > 0) {
                                                        if ($before[0]->q_other_remarks != $result->q_other_remarks)
                                                            echo "<font color=red>";
                                                    }
                                                    echo $result->q_other_remarks;
                                                    ?> 
                                                </td>
                                            </tr>
                                            <?php
                                        }
                                        if ($_REQUEST['box_dim'] == 'true') {
                                            ?>
                                            <tr>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Box Dimension</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                    <?php
                                                    if (count($before) > 0) {
                                                        if ($before[0]->cw != $result->cw || $before[0]->cd != $result->cd || $before[0]->ch != $result->ch)
                                                            echo "<font color=red>";
                                                    }
                                                    ?> 
                                                    <?php echo 'W' . number_format(($result->cw / 25.4), 2) . '"'; ?> x
                                                    <?php echo 'D' . number_format(($result->cd / 25.4), 2) . '"'; ?> x
                                                    <?php echo 'H' . number_format(($result->ch / 25.4), 2) . '"'; ?> 
                                                </td>
                                            </tr>
                                            <?php
                                        }
                                        if ($_REQUEST['cube'] == 'true') {
                                            ?>
                                            <tr>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Cube</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                    <?php
                                                    if (count($before) > 0) {
                                                        if ($before[0]->cw != $result->cw || $before[0]->cd != $result->cd || $before[0]->ch != $result->ch)
                                                            echo "<font color=red>";
                                                    }
                                                    ?> 
                                                    <?php echo number_format(((($result->ch / 25.4) * ($result->cw / 25.4) * ($result->cd / 25.4)) / 1728), 2) . ' CBF'; ?> 
                                                </td>
                                            </tr>
                                        <?php } ?>
                                    </thead>
                                </table>
                            </td>
                            <?php
                            echo "</tr>";
//                                if ($no % 2 == 0 && $no > 2) {
//                                    // echo $no  . "=>" . ($no % 2)  . "<br>";
//                                    echo "<p style='page-break-before: always'>";
//                                }
                        }
                        ?>

            </table>
        </td>
    </tr>
</tbody>
</table>

</div>
</div>
</body>

</html>