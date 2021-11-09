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
                                <table celpadding="0" cellspacing="0" style="border:0px solid black;width:100%">
                                    <thead>
                                        <tr style="border-bottom:1px solid black;">
                                            <td style="border-bottom:1px solid black;width: 10%;" align="left">
                                                To
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 1%;" align="left">
                                                :
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 30%;" align="left">
                                                <?php echo $_REQUEST['to']; ?>
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
                                                <?php echo $_REQUEST['cust']; ?>
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 20%;" align="left">
                                                Date
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 1%;" align="left">
                                                :
                                            </td>
                                            <td style="border-bottom:1px solid black;width: 30%;" align="left">
                                                <?php echo date('d M Y'); ?>
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
                                                <?php echo (int) (round(count($costing) / 2)); ?>
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

                                                <?php 
                                                $ref=$_REQUEST['ref'];
                                                $ref= str_replace("!=!", "&", $ref);
                                                $ref= str_replace("=!=", "#", $ref);
                                                print_r($ref); 
                                                ?>
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
                            <table celpadding="0" cellspacing="0" style="border:0px solid black;width:100%" class="page">
                                <caption>
                                    <h2 onclick="show_hide_header()" style="cursor: pointer;">QUOTATION - No. 
                                        <?php echo "--------------"; ?></h2></caption>
                                <thead>
                                    <tr style="background-color: #dfdfe1;page-break-inside:avoid; page-break-after:auto;">
                                        <th style="border:1px solid black;"><b>No.</b></th>

                                        <th style="border:1px solid black;">Model / Sketch</th>
                                        <th style="border:1px solid #000;padding: 5px;max-width: 100px;width: 100px;word-wrap:break-word;"">Finishes</th>

                                        <th style="border:1px solid #000;padding: 5px;max-width: 150px;width: 150px;word-wrap:break-word;" >Unit Price (US$)</th>
                                        <th style="border:1px solid black;">Remarks</th>

                                    </tr>
                                </thead>
                                <?php
                                $no = 0;
                                $selected_model = array();
                                //var_dump($costing);
                                // echo count($costing);

                                $maxid = $this->model_costing->get_max_sales_quoteid();
                                $sales_quotes_id = $maxid[0]->maks_id;
                                for($j=0;$j<count($costing);$j++) {
                                    $result=$this->model_costing->selectById($costing[$j]);
                                    $no += 1;
                                    ?>
                                    <tr valign="top" style="background-color: <?php echo $no % 2 == 0 ? "#fbfbfb" : "#fff" ?>;">
                                        <td style="border:1px solid #000;padding: 5px;" align="center" valign="middle"><?php echo $no; ?></td>

                                        <td style="border:1px solid #000;padding: 5px;max-width: 350px;width: 350px;max-height: 150px;height: 150px;word-wrap:break-word;vertical-align: bottom;"> 
                                    <center><img src=" <?php echo base_url() ?>/files/<?php echo @$result->filename; ?>" class="miniaction" 
                                                 onclick="model_imageview('<?php echo @$result->filename; ?>')" 
                                                 style="max-width: 150px;width: 150px;max-height: 150px;height: 150px;"></center>
                                    <?php echo "<font color=blue size=2><center>" . $result->custcode . "</center></font><br> " . $result->code . "<br> " . $result->model_desc; ?> <br>
                                    <?php echo 'W ' . number_format(($result->dw / 25.4), 2) . '"'; ?> x
                                    <?php echo 'D ' . number_format(($result->dd / 25.4), 2) . '"'; ?> x
                                    <?php echo 'H ' . number_format(($result->dht / 25.4), 2) . '"'; ?> <br>
                                    <?php echo 'W ' . number_format(($result->dw)/100, 2) . ''; ?> x
                                    <?php echo 'D ' . number_format(($result->dd)/100, 2) . ''; ?> x
                                    <?php echo 'H ' . number_format(($result->dht)/100, 2) . ' cm'; ?> 
                                    </td>
                                    <td style="border:1px solid #000;padding: 5px;" align="center" valign="middle"> 
                                        <?php echo $result->q_finishes; ?> 
                                    </td>
                                    <td style="border:1px solid #000;padding: 5px;" align="center" valign="middle"> 
                                        <?php echo number_format($result->fob_price, 2); ?> 
                                    </td>
                                    <td style="border:1px solid #000;padding: 5px;max-width: 450px;width: 450px;max-height: 280px;height: 280px;word-wrap:break-word;"  valign="middle"> 
                                        <table width="100%" celpadding="0" cellspacing="0" style="border-collapse: collapse;border:0px solid black;font-size: 11px;font-family:Verdana,Georgia,Serif;page-break-inside:auto;word-wrap:break-word;">
                                            <thead style="word-wrap:break-word;">
                                                <?php if ($_GET['wood'] == 'true') { ?>
                                                    <tr>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Wood</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 60%;width: 60%;word-wrap:break-word;" >
                                                            <?php echo $result->q_wood; ?> 
                                                        </td>
                                                    </tr>
                                                    <?php
                                                }
                                                if ($_GET['veneer'] == 'true') {
                                                    ?>
                                                    <tr>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Veneer</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                            <?php echo $result->q_veneer; ?> 
                                                        </td>
                                                    </tr>
                                                    <?php
                                                }
                                                if ($_GET['upstype'] == 'true') {
                                                    ?>
                                                    <tr>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Upholstery Type</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                            <?php echo $result->q_upholstery_type; ?> 
                                                        </td>
                                                    </tr>
                                                    <?php
                                                }
                                                if ($_GET['ship_conf'] == 'true') {
                                                    ?>
                                                    <tr>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Shipping Config</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                            <?php echo $result->q_shipping_conf; ?> 
                                                        </td>
                                                    </tr>
                                                    <?php
                                                }
                                                if ($_GET['fabric'] == 'true') {
                                                    ?>
                                                    <tr>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Fabric</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                            <?php echo $result->q_fabric; ?> 
                                                        </td>
                                                    </tr>
                                                    <?php
                                                }
                                                if ($_GET['leather'] == 'true') {
                                                    ?>
                                                    <tr>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Leather</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                            <?php echo $result->q_leather; ?> 
                                                        </td>
                                                    </tr>
                                                    <?php
                                                }
                                                if ($_GET['packing'] == 'true') {
                                                    ?>
                                                    <tr>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Packing</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                            <?php echo $result->q_packing; ?>
                                                        </td>
                                                    </tr>
                                                    <?php
                                                }
                                                if ($_GET['qtypp'] == 'true') {
                                                    ?>
                                                    <tr>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Qty per Packing</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                            <?php echo $result->q_qty_perbox; ?> 
                                                        </td>
                                                    </tr>
                                                    <?php
                                                }
                                                if ($_GET['other'] == 'true') {
                                                    ?>
                                                    <tr>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 550px;width: 550px;word-wrap:break-word;" >Other Remarks</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                            <?php echo $result->q_other_remarks; ?> 
                                                        </td>
                                                    </tr>
                                                    <?php
                                                }
                                                if ($_GET['box_dim'] == 'true') {
                                                    ?>
                                                    <tr>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Box Dimension</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                                            <?php echo 'W ' . number_format(($result->cw / 25.4), 2) . '"'; ?> x
                                                            <?php echo 'D ' . number_format(($result->cd / 25.4), 2) . '"'; ?> x
                                                            <?php echo 'H ' . number_format(($result->ch / 25.4), 2) . '"'; ?> 
                                                        </td>
                                                    </tr>
                                                    <?php
                                                }
                                                if ($_GET['cube'] == 'true') {
                                                    ?>
                                                    <tr>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Cube</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
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
                <footer id="footer">
                    <?php
// echo count($costing)/2;
                    ?>
                </footer>
            </table>
        </div>
    </body>

</html>