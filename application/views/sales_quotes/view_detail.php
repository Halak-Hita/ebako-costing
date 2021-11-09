<script src="js/sales_quotes.js"></script>
<br/>
<div id="sales_quotes-tabs" class="tab-base">
    <ul class="nav nav-tabs">
        <li><a data-toggle="tab" href="#sales_quotes_detail_56y">Item / Product</a></li>
    </ul>
    <div class="tab-content">
        <div id="sales_quotes_detail_56y" class="tab-detail tab-pane fade active in">
            <div style="margin-top: 5px;margin-bottom: 6px">
                <?php
                if ($this->session->userdata('department') == 4 || $this->session->userdata('department') == 9 /* RND or CST */) {
                    if (in_array('add_material', $accessmenu)) {
                        echo "<button class='btn btn-success' onclick = 'sales_quotes_setupholstry($id)'>Add</button>";
                    }
                }
                ?>
            </div>
            <table id="table_sales_quotes_detail_56y" class="table table-striped table-bordered" cellspacing="0" width="100%">
                <tr>
                    <th style="border:1px solid black;" width="2%"><b>No.</b></th>

                    <th style="border:1px solid black;" width="20%">Model / Sketch</th>
                    <th style="border:1px solid black;" width="10%">Finishes</th>

                    <th style="border:1px solid black;"  width="10%">Unit Price (US$)</th>
                    <th style="border:1px solid black;">Remarks</th>
                </tr>

                <?php
                if (!empty($sqdetail)) {
                    $no = 1;
                    foreach ($sqdetail as $result) {
                       // $before = $this->model_costing->select_item_by_quotationid($quotation[0]->parent_sales_quotes_id, $result->costingid);
                        ?>
                        <tr valign="top" style="background-color: <?php echo $no % 2 == 0 ? "#fbfbfb" : "#fff" ?>;">
                            <td><?php echo $no; ?></td>

                            <td> 
                        <center><img src=" <?php echo base_url() ?>/files/<?php echo @$result->filename; ?>" class="miniaction" 
                                     onclick="model_imageview('<?php echo @$result->filename; ?>')" 
                                     style="max-width: 150px;width: 150px;max-height: 150px;height: 150px;"></center>
                        <?php echo "<font color=blue size=4><center>" . $result->custcode . "</center></font><br> " . $result->code . "<br> " . $result->model_desc; ?> <br>

                        <?php echo 'W ' . number_format(($result->dw / 25.4), 2) . '"'; ?> x
                        <?php echo 'D ' . number_format(($result->dd / 25.4), 2) . '"'; ?> x
                        <?php echo 'H ' . number_format(($result->dht / 25.4), 2) . '"'; ?> 
                        </td>
                        <td align="center" valign="middle"> 
                            <?php echo $result->q_finishes; ?> 
                        </td>
                        <td  align="center" valign="middle"> 
                            <?php echo number_format($result->fob_price, 2); ?> 
                        </td>
                        <td valign="middle"> 
                            <table width="100%" celpadding="0" cellspacing="0" style="border-collapse: collapse;border:0px solid black;font-size: 10px;font-family:Verdana,Georgia,Serif;page-break-inside:auto;word-wrap:break-word;">
                                <thead style="word-wrap:break-word;">
                                    <tr>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" ><font color=red>Previous Price</font></td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 60%;width: 60%;word-wrap:break-word;" >
                                            <font color=red><?php echo $result->fob_price_before; ?> </font>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Wood</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 60%;width: 60%;word-wrap:break-word;" >
                                            <?php echo $result->q_wood; ?> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Veneer</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                            <?php echo $result->q_veneer; ?> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Upholstery Type</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                            <?php echo $result->q_upholstery_type; ?> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Shipping Config</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                            <?php echo $result->q_shipping_conf; ?> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Fabric</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                            <?php echo $result->q_fabric; ?> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Leather</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                            <?php echo $result->q_leather; ?> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Packing</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                            <?php echo $result->q_packing; ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Qty per Packing</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                            <?php echo $result->q_qty_perbox; ?> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 550px;width: 550px;word-wrap:break-word;" >Other Remarks</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                            <?php echo $result->q_other_remarks; ?> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Box Dimension</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                            <?php echo 'W ' . number_format(($result->cw / 25.4), 2) . '"'; ?> x
                                            <?php echo 'D ' . number_format(($result->cd / 25.4), 2) . '"'; ?> x
                                            <?php echo 'H ' . number_format(($result->ch / 25.4), 2) . '"'; ?> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >Cube</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 50px;width: 50px;word-wrap:break-word;">:</td>
                                        <td style="border:0px solid #000;padding: 5px;max-width: 750px;width: 750px;word-wrap:break-word;" >
                                            <?php echo number_format(((($result->ch / 25.4) * ($result->cw / 25.4) * ($result->cd / 25.4)) / 1728), 2) . ' CBF'; ?> 
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                        </td>
                        <?php
                        echo "</tr>";
                        $no += 1;
                    }
                }
                ?>
            </table>
            <script type="text/javascript">
                $(document).ready(function () {
                    var table = $('#table_sales_quotes_detail_56y').DataTable({
                        scrollY: "300px",
                        scrollX: true,
                        scrollCollapse: true,
                        paging: false,
                        ordering: false,
                        info: false,
                        searching: false,
                        autoWidth: false,
                    });

                });
            </script>
        </div>


    </div>
</div>