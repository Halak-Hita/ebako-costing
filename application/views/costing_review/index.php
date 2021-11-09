<script src="<?php echo base_url() ?>js/costing_review.js"></script>
<div class="panel">
    <div class="panel-heading">
        <h3 class="panel-title">Costing Review</h3>
    </div>

    <div class="panel-body" id="menu_content_rate">
        <div class="pad-btm form-inline">
            <div class="row">
                <div class="col-sm-12 table-toolbar-left">
                    <div id="costing_review_search_form" onsubmit="return ;">
			            <span class="labelelement">Search</span><br>
			            <input type="text" name="customer_name" placeholder="Customer Name" style="width: 120px" onkeypress="(costing_review_search(0)"/>
			            <input type="text" name="model_code" placeholder="Model Code" style="width: 120px" onkeypress="(costing_review_search(0)"/>
			            <button type="button" onclick="costing_review_search(0)">Find</button>
			        </div>
	            </div>
	        </div>
        	<div id="data" class="row">
				<?php $costing_review->search(0) ?>
            </div>
	    </div>
    </div>
</div>

