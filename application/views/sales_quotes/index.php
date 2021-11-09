<script src="js/global.js"></script>
<script src="js/sales_quotes.js"></script>

<div style="height: 50%; width: auto; border-bottom: 4px #ddd inset" class="panel">
    <div class="panel-heading">
        <h3 class="panel-title">List Quotation</h3>
    </div>
    <div class="panel-body" id="menu_content_sales_quotes">
        <table width="100%" border="0">
            <tr>
                <td>
                    <div align="left" class="form-inline" style="padding-top: 2px;">
                        <div class="col-sm-12">
                            <input type="hidden" id="sales_quotesid" value="0" /> <span class="labelelement">Find :</span> 
                            <input class="form-control" type="text" name="sq_number_id" placeholder="Quo Number" id="sq_number_id" size="18" onkeypress="if (event.keyCode == 13) {
                                        sales_quotes_search(0);
                                    }" /> 
                            
                            <label for="customerid_search">Customer</label>
                            <select class="form-control" id="sq_customerid_search" onchange="sales_quotes_search(0)" style="background-color: #f5faff; border: 1px solid #579ddb;">
                                <option value="0"></option>
                                <?php
                                foreach ($customer as $result) {
                                    echo "<option value='" . $result->id . "'>" . $result->name . "</option>";
                                }
                                ?>
                            </select>

                            <button class="btn btn-default" onclick="sales_quotes_search(0)">Search</button>
                        </div>	
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="sales_quotesdata" align="center" style="overflow-x: auto;width:auto;padding: 10px;">                    
                        <?php
                        $data['offset'] = $offset;
                        $this->load->view('sales_quotes/search', $data);
                        ?>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</div>
<div style="height: 50%; width: 100%;" id="sales_quotesdetail_id" >
    <div id="sales_quotesdetail" style="min-height: 560px;overflow-y: auto;max-height:560px; ">
        <br/>
        <div id="sales_quotes-tabs" class="tab-base">
            <ul class="nav nav-tabs">
                <li><a data-toggle="tab" href="#sales_quotes_detail_56y">Detail Item</a></li>
            </ul>
            <div class="tab-content">
                <div id="sales_quotes_detail_56y" class="tab-pane fade active in">
                    <center>Please select 1 quotation first...</center>
                </div>
            </div>
        </div>
    </div>
</div>