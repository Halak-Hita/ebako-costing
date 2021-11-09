<html>
    <head>
        <title>&nbsp;</title>        
    </head>
    <body>
    <center>
        <table width="900"  celpadding="0" cellspacing="0" style="border-collapse: collapse;border:1px solid black;font-size: 9px;font-family:Verdana,Georgia,Serif;">
            <thead>
                <tr>
                    <th align="left" style="border:1px solid black;padding-left: 10px;">Customer</th>
                    <th colspan="3" style="border:1px solid black;"><?php echo $costing->customername ?></th>
                    <th colspan="4" rowspan="3" style="height: 120px;border:1px solid black;">
                        <img src="<?php echo base_url() . "files/" . $costing->filename; ?>" style="max-width: 150px;max-height: 150px;"/>
                    </th>                    
                    <th style="border:1px solid black;">Date</th>
                    <th style="border:1px solid black;">Cust. Code</th>
                    <th style="border:1px solid black;"><?php echo $costing->custcode ?></th>
                </tr>
                <tr>
                    <th align="left" style="padding-left: 10px;">Dimension (mm)</th>
                    <th style="border:1px solid black;"><?php echo $costing->dw ?></th>
                    <th style="border:1px solid black;"><?php echo $costing->dd ?></th>
                    <th style="border:1px solid black;"><?php echo $costing->dht ?></th>                    
                    <th rowspan="2"><?php echo date('d/m/Y', strtotime($costing->date)) ?></th>
                    <th style="border:1px solid black;">Ebako Code</th>
                    <th style="border:1px solid black;"><?php echo $costing->code ?></th>
                </tr>
                <tr>
                    <th style="border:1px solid black;padding-left: 10px;" align="left">Description</th>
                    <th style="border:1px solid black;" colspan="3">
                        <?php echo $costing->description ?>
                    </th>                    
                    <th style="border:1px solid black;">Rate</th>
                    <th style="border:1px solid black;"><?php echo number_format( @$costing->ratevalue , 0, '.', ','); ?></th>

                </tr>
                <tr>
                    <th width="14%" style="border:1px solid black;">Material Code</th>
                    <th width="15%" style="border:1px solid black;">Material Description</th>
                    <th width="5%" style="border:1px solid black;">UOM</th>
                    <th width="9%" style="border:1px solid black;">QTY<br/>based on BOM</th>
                    <th width="10%" style="border:1px solid black;">Yield</th>
                    <th width="9%" style="border:1px solid black;">Allowance</th>
                    <th width="4%" style="border:1px solid black;">REQ'D<br/>QTY</th>
                    <th width="8%" style="border:1px solid black;">UNIT PRICE<br/>(RP)</th>
                    <th width="8%" style="border:1px solid black;">UNIT PRICE<br/>(US$)</th>
                    <th width="10%" style="border:1px solid black;">TOTAL<br/>AMOUNT(US$)</th>
                    <th width="10%" style="border:1px solid black;">%</th>            
                </tr>
            </thead>
            <tbody>
                <?php
                $directmaterialtotal = 0;
                $subtotal = 0;
                foreach ($costingcategory as $costingcategory) {
                    $costingdetail = $this->model_costing->selectCostingByHeaderidAndCategoryId($id, $costingcategory->id);
                    ?>
                    <tr>
                        <td colspan="11" bgcolor="#e9efe8" style="font-size: 11px;border:1px solid black;">&nbsp;<b><?php echo $costingcategory->name ?></b></td>        
                    </tr>
                    <?php
                    $subtotal = 0;
                    $total_in_usd = 0;
                    foreach ($costingdetail as $result) {
                    	
                    	if( @$result->qty <= 0 || @$result->qty == '' )
                			continue;
                    	
                    	$req_qty = $result->req_qty;
                    	if( (empty($result->yield) || $result->yield <= 0 )  ){
                    		
	                    	if( $result->allowance < 0 ){
	                    		$req_qty = 0;
	                    	}
                    	} 
                    	
                        ?>
                        <tr>
                            <td style="border:1px solid black;padding-left:15px;"><?php echo $result->materialcode; ?></td>
                            <td style="border:1px solid black;"><?php echo $result->materialdescription; ?></td>
                            <td align="center" style="border:1px solid black;"><?php echo $result->uom; ?></td>
                            <td align="right" style="border:1px solid black;"><?php echo ($result->qty == 0) ? "" : number_format($result->qty, 3, '.', ''); ?></td>
                            <td align="center" style="border:1px solid black;"><?php echo ($result->yield == 0) ? "" : number_format($result->yield, 3, '.', ''); ?></td>
                            <td align="center" style="border:1px solid black;"><?php echo $result->allowance; ?></td>
                            <td align="center" style="border:1px solid black;"><?php echo ($req_qty == 0) ? "" : number_format($req_qty, 3, '.', ''); ?></td>
                            
                            <?php
                                $unitpricerp = number_format($result->unitpricerp, 3, '.', '');
                                if ($result->unitpriceusd != 0) {
                                    $unitpricerp = number_format(($result->unitpriceusd * $costing->ratevalue), 3, '.', '');
                                }
                            ?>
                            
                            <td align="right" style="border:1px solid black;"><?php echo $unitpricerp; ?></td>
                            <td align="center" style="border:1px solid black;">
                                <?php
                                $unitpriceusd = number_format(($result->unitpricerp / $costing->ratevalue), 3, '.', '');
                                if ($result->unitpriceusd != 0) {
                                    $unitpriceusd = $result->unitpriceusd;
                                }
                                echo $unitpriceusd;
                                ?>
                            </td>            
                            <td align="right" style="border:1px solid black;">
                                <?php
                                $total_in_usd = number_format(($unitpriceusd * $req_qty), 3, '.', ',');
                                echo $total_in_usd;
                                ?>
                            </td>
                            <td style="border:1px solid black;">&nbsp;</td>
                        </tr>       
                        <?php
                        $subtotal = $subtotal + $total_in_usd;
                    }
                    $directmaterialtotal += $subtotal;
                    ?>
                    <tr>
                        <td colspan="9" align="right" style="border:1px solid black;"><b>Sub Total</b></td>
                        <td align="right" bgcolor="#dfdfe1" style="border:1px solid black;"><?php echo number_format(($subtotal), 3, '.', ',') ?></td>            
                        <td style="border: 1px solid black;">&nbsp;</td>          
                    </tr>       
                    <?php
                }
                ?>           
            <tr style="background: #999999;page-break-after:always">
                <td align="right" colspan="9" style="border:1px solid black;"><b>Direct Material Total</b></td>            
                <td align="right" style="border:1px solid black;"><?php echo number_format(($directmaterialtotal), 3, '.', ',') ?></td>                    
                <td style="border:1px solid black;">&nbsp;</td>        
            </tr>
            <tr>
                <td colspan="10" style="border: none;">&nbsp;</td>
            </tr>    
            <?php
            $sum_not_direct = array();
            
            $ratevalue = $costing->ratevalue;
            
            foreach ($costingcategorynotdirect as $costingcategory) {
                $costingdetail = $this->model_costing->selectCostingByHeaderidAndCategoryId($id, $costingcategory->id);
                
                $subtotal = 0;
                $total_in_usd = 0;
                
                if( $costingcategory->id == 8 ){
                	$ratevalue = $costing->picklist_ratevalue;
                }else{
                	$ratevalue = $costing->ratevalue;
                }
                
                ?>
                <tr>
                    <td colspan="11" bgcolor="#e9efe8" style="font-size: 11px;border:1px solid black;">
                    	&nbsp;<b><?php echo $costingcategory->name ?></b>
                    	<?php if( $costingcategory->id == 8 ){
                    		echo " ( Rate = " . $ratevalue . " )";
                    	}?>
                    </td>        
                </tr>
                <?php
                
                foreach ($costingdetail as $result) {
                	
                	if( @$result->qty <= 0 || @$result->qty == '' )
                		continue;
                	
                	$req_qty = $result->req_qty;
                	
                	if( (empty($result->yield) || $result->yield <= 0 )  ){
                		
                		if( $result->allowance < 0 ){
                			$req_qty = 0;
                		}
                			
                		//if( (empty($result->allowance) )  ){
	                    //		$req_qty = 0;
	                    //}
	                    
                	}
                	
                    ?>
                    <tr>
                        <td style="border:1px solid black;padding-left:15px;"><?php echo $result->materialcode; ?></td>
                        <td style="border:1px solid black;"><?php echo $result->materialdescription; ?></td>
                        <td style="border:1px solid black;" align="center"><?php echo $result->uom; ?></td>
                        <td style="border:1px solid black;" align="right"><?php echo ($result->qty == 0) ? "" : number_format($result->qty, 3, '.', ''); ?></td>
                        <td style="border:1px solid black;" align="center"><?php echo ($result->yield == 0) ? "" : number_format($result->yield, 3, '.', ''); ?></td>
                        <td style="border:1px solid black;" align="center"><?php echo $result->allowance; ?></td>
                        <td style="border:1px solid black;" align="center"><?php echo ($req_qty == 0) ? "" : number_format($req_qty, 3, '.', ''); ?></td>
                        
                        <?php
                        		$unitpricerp = number_format($result->unitpricerp, 3, '.', '');
                                if ($result->unitpriceusd != 0) {
                                    $unitpricerp = number_format(($result->unitpriceusd * $ratevalue), 3, '.', '');
                                }
                        ?>
                        
                        <td style="border:1px solid black;" align="right"><?php echo $unitpricerp; ?></td>
                        <td style="border:1px solid black;" align="center">
                            <?php
                            $unitpriceusd = number_format(($result->unitpricerp / $ratevalue), 3, '.', '');
                            if ($result->unitpriceusd != 0) {
                                $unitpriceusd = $result->unitpriceusd;
                            }
                            echo $unitpriceusd;
                            ?>
                        </td>            
                        <td style="border:1px solid black;" align="right">
                            <?php
                            $total_in_usd = number_format(($unitpriceusd * $req_qty), 3, '.', ',');
                            echo $total_in_usd;
                            ?>
                        </td>
                        <td style="border:1px solid black;">&nbsp;</td>
                    </tr>       
                    <?php
                    $subtotal = $subtotal + $total_in_usd;
                }
                $sum_not_direct[$costingcategory->id] = $subtotal;
                ?>
                <tr>
                    <td colspan="9" align="right" style="border:1px solid black;"><b>Sub Total</b></td>
                    <td align="right" bgcolor="#dfdfe1" style="border:1px solid black;"><?php echo number_format(($subtotal), 3, '.', ',') ?></td>            
                    <td style="border:1px solid black;">&nbsp;</td>
                </tr>  
                <?php
            }
            $noname = round( (100 - ($costing->fixed_cost + $costing->variable_cost + $costing->profit_percentage)) / 100 , 3);
            $factory_cost_and_profit = round( ( ( $directmaterialtotal + $sum_not_direct[9]) / $noname), 3);
            
            ?>
            <tr>
                <td colspan="11"style="border:1px solid black;">&nbsp;</td>
            </tr>    
            <tr style="border-top: 1px solid black;">
                <td widtd="14%" style="border-right-color: white;"><b>Summary</b></td>
                <td widtd="15%" style="border-right-color: white;">Direct material<span style="float: right">$</span></td>
                <td widtd="5%"  style="border-right-color: white;text-align: right;"><?php echo number_format($directmaterialtotal, 3, '.', ','); ?></td>
                <td widtd="9%"  style="border-right-color: white;">&nbsp;</td>
                <td widtd="10%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="9%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="4%" style="border-right-color: white;">&nbsp;</td>                    
                <td widtd="10%" style="border-right-color: white;" colspan="2">Pick List Hardware<span style="float: right">$</span></td>
                <td widtd="8%" style="border-right-color: white;text-align: right;">
                	
                	<?php 
	                	if(! empty(@$costing->variable_mark_up_cat_8) ){
	                		$sum_not_direct[8] = round( ($sum_not_direct[8] * $costing->variable_mark_up_cat_8) , 3);
	                	}
	                	echo number_format( $sum_not_direct[8] , 3, '.', ',');
                	?>
                </td>
                <td widtd="10%">&nbsp;</td>            
            </tr>
            <tr style="border-top: 1px solid black;">
                <td widtd="14%" style="border-right-color: white;"></td>
                <td widtd="15%" style="border-right-color: white;">Direct labour<span style="float: right">$</span></td>
                <td widtd="5%" style="border-right-color: white;text-align: right;"><?php echo number_format($sum_not_direct[9], 3, '.', ','); ?></td>
                <td widtd="9%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="10%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="9%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="4%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="10%" style="border-right-color: white;" colspan="2">Sub Contractor<span style="float: right">$</span></td>
                <td widtd="10%" style="border-right-color: white;text-align: right;"><?php echo number_format($sum_not_direct[10], 3, '.', ','); ?></td>
                <td widtd="10%">&nbsp;</td>            
            </tr>
            <tr style="border-top: 1px solid black;">
                <td widtd="14%" align="right" style="border-right-color: white;">
                	<?php if($access_fob_price_and_profit == true){?>
                	<b><?php echo $costing->fixed_cost ?></b>
                	<?php }?>
                </td>
                <td widtd="15%" style="border-right-color: white;">
                	<?php if($access_fob_price_and_profit == true){?>
                		Fixed Cost (<?php echo $costing->fixed_cost ?>%)<span style="float: right">$</span></td>
                	<?php }?>	
                <td widtd="5%"  style="border-right-color: white;;text-align: right;">
                	<?php if($access_fob_price_and_profit == true){?>
                		<?php echo round(($factory_cost_and_profit * $costing->fixed_cost) / 100, 3) ?></td>
                	<?php }?>
                <td widtd="9%"  style="border-right-color: white;">&nbsp;</td>
                <td widtd="10%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="9%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="4%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="10%" style="border-right-color: white;" colspan="2">Port origin cost (<?php echo $costing->port_origin_cost ?>%)<span style="float: right">$</span></td>
                <td widtd="10%" style="border-right-color: white;text-align: right;">
                    <?php
                    $port_origin_cost = round( ($factory_cost_and_profit * $costing->port_origin_cost) / 100 , 3);
                    echo $port_origin_cost;
                    ?>
                </td>
                <td widtd="10%">&nbsp;</td>            
            </tr>
            <tr style="border-top: 1px solid black;">
                <td widtd="14%" align="right" style="border-right-color: white;">
                	<?php if($access_fob_price_and_profit == true){?>
                		<b><?php echo $costing->variable_cost ?></b>
                	<?php }?>
                </td>
                <td widtd="15%" style="border-right-color: white;">
                	<?php if($access_fob_price_and_profit == true){?>
                		Variable Cost (<?php echo $costing->variable_cost ?>%)<span style="float: right">$</span></td>
                	<?php }?>	
                <td widtd="5%"  style="border-right-color: white;text-align: right">
                	<?php if($access_fob_price_and_profit == true){?>
                		<?php echo round(($factory_cost_and_profit * $costing->variable_cost) / 100, 3) ?></td>
                	<?php }?>	
                <td widtd="9%"  style="border-right-color: white;">&nbsp;</td>
                <td widtd="10%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="9%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="4%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="10%" style="border-right-color: white;" colspan="2"><b>Sub Total</b><span style="float: right">$</span></td>                    
                <td widtd="10%" style="border-right-color: white;text-align: right"><?php
                    $subtotal_ = round( $sum_not_direct[8] + $sum_not_direct[10] + $port_origin_cost ,3);
                    echo $subtotal_;
                    ?></td>
                <td widtd="10%">&nbsp;</td>            
            </tr>
            <tr style="border-top: 1px solid black;">
                <td widtd="14%" align="right" style="border-right-color: white;">&nbsp;</td>
                <td widtd="15%" style="border-right-color: white;">
                	<?php if($access_fob_price_and_profit == true){?>
                		Factory Cost + Profit<span style="float: right">$</span>
                	<?php }?>	
               	</td>
                <td widtd="5%"  style="border-right-color: white;text-align: right">
                	<?php if($access_fob_price_and_profit == true){?>
                    	<?php echo $factory_cost_and_profit; ?>
                    <?php }?>
                </td>
                <td widtd="9%"  style="border-right-color: white;">&nbsp;</td>
                <td widtd="10%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="9%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="4%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="8%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="8%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="10%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="10%">&nbsp;</td>            
            </tr>
            <tr style="border-top: 1px solid black;">
                <td widtd="14%" align="right" style="border-right-color: white;">&nbsp;</td>
                <td widtd="15%" style="border-right-color: white;">
                	<?php if($access_fob_price_and_profit == true){?>
                	Profit Percentage
                	<?php }?>
                </td>
                <td widtd="5%"  style="border-right-color: white;text-align: right;font-weight: bold">
                	<?php if($access_fob_price_and_profit == true){?>
                		<?php echo $costing->profit_percentage ?></td>
                	<?php }?>
                <td widtd="9%"  style="border-right-color: white;text-align: right;">
                	<?php if($access_fob_price_and_profit == true){?>
                		<?php echo $noname; ?>
                	<?php }?>
                </td>
                <td widtd="10%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="9%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="4%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="8%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="8%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="10%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="10%">&nbsp;</td>            
            </tr>
            <tr style="border-top: 1px solid black;">
                <td widtd="14%" align="right" style="border-right-color: white;">&nbsp;</td>
                <td widtd="15%" style="border-right-color: white;"></td>
                <td widtd="5%"  style="border-right-color: white;">&nbsp;</td>
                <td widtd="9%"  style="border-right-color: white;">&nbsp;</td>
                <td widtd="10%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="9%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="4%" style="border-right-color: white;">&nbsp;</td>
                <td widtd="10%" style="border-right-color: white;" colspan="2">
                	<?php if($access_fob_price_and_profit == true){?>
                	<b>FOB PRICE</b><span style="float: right">$</span>
                	<?php }?>
                </td>
                <td widtd="10%" style="border-right-color: white;text-align: right;font-weight: bold;">
                	<?php if($access_fob_price_and_profit == true){?>
                	<?php
	                    $fob_price = round( $subtotal_ + $factory_cost_and_profit, 3);
	                    echo number_format( $fob_price, 3, '.', ',');
                    ?>
                    <?php }?>
                </td>
                <td widtd="10%">&nbsp;</td>            
            </tr>
            <tr style="border-top: 1px solid black;">
                <td widtd="14%" align="right">&nbsp;</td>
                <td widtd="15%"></td>
                <td widtd="5%">&nbsp;</td>
                <td widtd="9%" >&nbsp;</td>
                <td widtd="10%">&nbsp;</td>
                <td widtd="9%">&nbsp;</td>
                <td widtd="4%">&nbsp;</td>
                <td widtd="10%" style="color: red" colspan="2"></td>
                <td widtd="10%">&nbsp;</td>
                <td widtd="10%">&nbsp;</td>            
            </tr>
            </tbody>
        </table>      
        <br/>
        <br/>
        <?php
        if ($st2 == 1) {
            ?>
            <a href="<?php echo base_url() . "index.php/costing/prints/" . $id . "/" . $soid . "/" . $modelid . "/print/0" ?>" target="blank"><button style="font-size: 9px;font-weight: none;">Print</button></a><br/><br/>
            <?php
        }

        if ($st == "print") {
            //echo "<script>window.print();</script>";
        }
        ?>

    </center>
</body>
</html>