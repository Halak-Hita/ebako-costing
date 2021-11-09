<div style="margin-bottom: 5px;margin-top: 5px;" class="pull-right">
    <nav class="pagination pagination-sm">
        <input type="hidden" id="offset" value="<?php echo ($offset < 1 ? 0 : ($offset - 1) ) ?>" />
        <ul class="pagination">
            <li class="">
                <a class="page-link-2" style="color: #167495;cursor: pointer;" onclick="sales_quotes_search(0)">
                    <strong><span class="fa fa-refresh"></span> Refresh</strong>
                </a> 
            </li>
            <li class="">&nbsp;&nbsp;&nbsp;&nbsp;</li>

            <li class="page-item">
                <a class="page-link" href="#" onclick="sales_quotes_search(<?php echo $first ?>)">First</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous" onclick="sales_quotes_search(<?php echo $prev ?>)">
                    <img src="images/prev.png" onclick="sales_quotes_search(<?php echo $prev ?>)" class="miniaction"/>
                </a>
            </li>

            <li class="page-item">
                <a class="page-link"><?php echo $page ?></a>
            </li>

            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next" onclick="sales_quotes_search(<?php echo $next ?>)">
                    <img src="images/next.png" onclick="sales_quotes_search(<?php echo $next ?>)" class="miniaction"/>
                </a>
            </li>

            <li class="page-item">
                <a class="page-link" href="#" onclick="sales_quotes_search(<?php echo $last ?>)">Last</a>
            </li>
            <li class="">&nbsp;&nbsp;&nbsp;&nbsp;</li>
            <li class="">
                <a class="page-link-2">
                    Total:  <strong><?php echo $num_page ?></strong> Page(s),
                    <strong><?php echo $num_rows ?></strong> Row(s)
                </a> 
            </li>
        </ul>
    </nav>
</div>

<table id="table_sales_quotes" class="table table-striped table-bordered" cellspacing="0" >

    <tr>
        <td colspan="12"> <font color="blue" size="3">Select tu Print: </font>
            <input type="checkbox" name=wood id="wood_id" value="1" checked="true">Wood &nbsp;&nbsp;
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
    <thead>
        <tr style="border-top: 4px solid #ec9821;">
            <th width="2%" align=center>No</th>
            <th width="8%" align=center>No Quotation</th>
            <th width="10%" align=center>Customer</th>
            <th width="6%" align=center>Quotation Date</th>
            <th width="6%" align=center>Original Date</th>
            <th width="8%" align=center>To</th>
            <th width="8%" align=center>Reference</th>
            <th width="6%" align=center>Fixed Cost</th>
            <th width="6%" align=center>Port Original Cost</th>
            <th width="6%" align=center>Revision</th>
            <th width="6%" align=center>Valid Date</th>
            <th width="6%" align=center>Approved Date</th>
    </thead>
    <?php
    $counter = $offset + 1;
    foreach ($sq as $result) {
        $colour_td = "white";
        if ($counter % 2 == 0)
            $colour_td = "#ccffff";
        ?>
        <tr>
            <td onclick="sales_quotes_viewdetail(<?php echo $result->id ?>)" align="right"><?php echo $counter++ ?></td>
            <td onclick="sales_quotes_viewdetail(<?php echo $result->id ?>)"  ><?php echo $result->quotation_number ?></td>
            <td onclick="sales_quotes_viewdetail(<?php echo $result->id ?>)" ><?php echo $result->name ?></td>
            <td onclick="sales_quotes_viewdetail(<?php echo $result->id ?>)" ><?php echo $result->quo_date ?></td>
            <td onclick="sales_quotes_viewdetail(<?php echo $result->id ?>)" >
                <?php
                if ($result->prev_quo_date == null)
                    echo 'no revision';
                else
                    echo $result->prev_quo_date;
                ?>
            </td>
            <td onclick="sales_quotes_viewdetail(<?php echo $result->id ?>)" ><?php echo $result->to_cp ?></td>
            <td onclick="sales_quotes_viewdetail(<?php echo $result->id ?>)" ><?php echo $result->reference ?></td>
            <td onclick="sales_quotes_viewdetail(<?php echo $result->id ?>)" align="center"><?php echo $result->fixed_cost ?></td>
            <td onclick="sales_quotes_viewdetail(<?php echo $result->id ?>)" align="center"><?php echo $result->port_origin_cost ?></td>
            <td onclick="sales_quotes_viewdetail(<?php echo $result->id ?>)" align="center"><?php echo $result->revision ?></td>

            <td onclick="sales_quotes_viewdetail(<?php echo $result->id ?>)" align="center"><?php echo $result->valid_date ?></td>
            <td onclick="sales_quotes_viewdetail(<?php echo $result->id ?>)" align="center"><?php echo $result->approved_date ?></td>

            <td>
                <div class="drop">
                    <?php
                   // if (in_array('edit', $accessmenu)) {
                        //echo '<a href="javascript:sales_quotes_edit(' . $result->id .
                        // ');"><button class="btn btn-sm btn-success"> <i class="fa fa-edit fa-sm"></i> Edit </button></a>';
//                        echo '<a href="javascript:sales_quotes_copy(' . $result->id .
//                        ');"><button class="btn btn-sm btn-primary"> <i class="fa fa-copy fa-sm"></i> Copy </button></a>';
                        echo '<a href="javascript:print_quotation(' . $result->id .
                        ');"><button class="btn btn-sm btn-success"> <i class="fa fa-print fa-sm"></i> Quo. </button></a>';
                        echo '&nbsp;&nbsp;&nbsp;<a href="javascript:print_quotation(' . $result->id .
                        ');"><button class="btn btn-sm btn-success"> <i class="fa fa-print fa-sm"></i> Project </button></a>';
                   // }

                   // if (in_array('delete', $accessmenu)) {
                        echo "&nbsp;&nbsp;&nbsp;";
                        echo '<a href="javascript:sales_quotes_delete(' . $result->id . ');"><button class="btn btn-sm btn-delete btn-danger"> Delete</button></a>';
                  //  }
                    ?>                                    
                </div>
            </td>
        </tr>
        <?php
    }
    ?>
</table>
<script type="text/javascript">
    $(document).ready(function () {
        var table = $('#table_sales_quotes').DataTable({
            scrollY: "300px",
            scrollX: true,
            scrollCollapse: true,
            paging: false,
            ordering: false,
            info: false,
            searching: false,
            autoWidth: true,
            select: true,
        });

    });
</script>
