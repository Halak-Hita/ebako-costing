<div class="panel">
	<div class="panel-body" id="menu_content_costing">
	<table id="table_rates" class="table table-striped table-bordered " cellspacing="0" width="100%">
			<thead>
				<tr>
					<th>No</th>                        
					<th>Customer Name</th>
					<th>Costing Id</th>
					<th>Model Code</th>
					<th>Rate Value</th>
					<th>Pick List Rate Value</th>
                                        <th>Old FOB</th>
					<th>FOB Price</th>
					
					<th>Margin</th>
					<th>Costing Review Year</th>                  
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				<?php
					$counter = $offset;
					$current_customer_id = 0;
					foreach($costing_reviews as $result) {
						$counter = $counter + 1;
						if($current_customer_id != 0 && $current_customer_id != $result->customer_id) {
						?>
							<tr height="40">
							  <td colspan="10"></td>
							</tr>
						<?php	
						}
						?>
							<tr valign="top">
								<td><?php echo $counter; ?></td>
								<td><?php echo $result->customer_name; ?></td>
								<td><?php echo $result->costing_id; ?></td>
								<td><?php echo $result->model_code; ?></td>
								<td><?php echo $result->rate_value; ?></td>
								<td><?php echo $result->pick_list_rate_value; ?></td>
								<td><?php echo number_format($result->old_fob, 2, '.', ',' ); ?></td>
								<td><?php echo number_format($result->fob_price, 2, '.', ',' ); ?></td>
								<td><?php echo number_format($result->margin, 2, '.', ',' ); ?></td>
								<td><?php echo $result->year; ?></td>
								<td>
									<button>
									<?php
										echo "<a href='javascript:costing_review_approve($result->costing_id, $offset, $result->fob_price, $result->rate_value, $result->pick_list_rate_value, $result->customer_id)'>Approve&nbsp;&nbsp;&nbsp;</a>";
									?> 
									</button>                           
								</td>
							</tr>
						<?php
							$current_customer_id = $result->customer_id;
					}
				?>
			</tbody>
		</table>
	</div>

	<div class="col-sm-12">
		<div style="margin-top: 5px;" class="pull-right">
			<nav class="pagination pagination-sm">
				<input type="hidden" id="offset" value="<?php echo ($offset > 0 ? $offset - 1 : 0) ?>" />
				<ul class="pagination">
					<li class="">
						<a class="page-link-2" style="color: #167495;cursor: pointer;" onclick="costing_review_search(0)">
							<strong><span class="fa fa-refresh"></span> Refresh</strong>
						</a> 
					</li>
					<li class="">&nbsp;&nbsp;&nbsp;&nbsp;</li>
					
					<li class="page-item">
						<a class="page-link" href="#" onclick="costing_review_search(<?php echo $first ?>)">First</a>
					</li>
					<li class="page-item">
					<a class="page-link" href="#" aria-label="Previous" onclick="costing_review_search(<?php echo $prev ?>)">
						<img src="images/prev.png" onclick="costing_review_search(<?php echo $prev ?>)" class="miniaction"/>
					</a>
					</li>
					
					<li class="page-item">
						<a class="page-link"><?php echo $page ?></a>
					</li>
					
					<li class="page-item">
					<a class="page-link" href="#" aria-label="Next" onclick="costing_review_search(<?php echo $next ?>)">
						<img src="images/next.png" onclick="costing_review_search(<?php echo $next ?>)" class="miniaction"/>
					</a>
					</li>
					
					<li class="page-item">
						<a class="page-link" href="#" onclick="costing_review_search(<?php echo $last ?>)">Last</a>
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
	</div>

	<script type="text/javascript">
		$(document).ready(function() {
			var table = $('#table_rates').DataTable( {
				scrollY: "500px",
				scrollX:true,
				scrollCollapse: true,
				paging: false,
				ordering: false,
				info: false,
				searching: false,
				autoWidth: true,
			} );
		} );
	</script>
</div>
