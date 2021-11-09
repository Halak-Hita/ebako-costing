Vue.component('directmaterial',{
  props:['material','category','index_costingdirectmaterial','index_costingdirectmaterial_datas'],
  data(){
	  return {
		  req_qty : 0,
		  unitpriceusd : 0,
		  total_in_usd : 0,
		  
		  is_show_form_move_material: false,
		  move_to_category_id : "",
		  
		  new_curr_costing_price:'',
  		  unitpricerp_focused: false,
  		  unitpriceusd_focused: false,
	  };
  },
  created: function () {
	  var qty = parseFloat( this.material.qty )
	  if( qty > 0 ){
		  this.material.qty = roundTo3( qty );
	  }else{
		  this.material.qty = 0;
	  }
	  
	  if(this.material.yield == ""){
		  this.material.yield = 0;
	  }
	  if(this.material.allowance == ""){
		  this.material.allowance = 0;
	  }
	  
	  this.init_unitprice_rp_usd();
	  
  },
  computed: {
	  get_req_qty: function () { //priority is allowance
		  if( this.material.yield > 0 ){
			  var req_qty = parseFloat( this.material.qty ) / parseFloat(this.material.yield);
			  
			  // Notes: jika Category == Finishing, rumusnya di kali
			  if( this.material.categoryid == "6" || this.material.categoryid == 6 ){
				  req_qty = parseFloat( this.material.qty ) * parseFloat(this.material.yield);
			  }
			  
			  this.req_qty = roundTo3( req_qty );
			  this.material.req_qty = this.req_qty; 
		  }else if( this.material.allowance >= 0 ){
			  var material_qty = parseFloat( this.material.qty );
			  var allowance = parseFloat(this.material.allowance);
			  
			  var req_qty = material_qty + ( material_qty * allowance );
			  this.req_qty = roundTo3( req_qty );
			  this.material.req_qty = this.req_qty;
		  }else{
			  this.req_qty = 0;
			  this.material.req_qty = 0; 
		  }
		  return this.req_qty;
	  },
	  get_total_in_usd: function () {
		  this.updateTotalInUsd(); 
	  },
  },
  mounted: function(){ },
  watch: {
	  'material.req_qty': function(){
		  this.updateTotalInUsd(); 
	  },
	  total_in_usd: function (newData, oldData) {
		  var added_data = newData - oldData;
		  this.$emit('add_sub_total_category', added_data);
	  },
	  'material.unitpricerp': function (newData, oldData) {
		  var added_data = newData - oldData;
		  //this.$emit('add_sub_total_category', added_data);
		  this.calculate_unitpriceusd();
		  this.updateTotalInUsd();
	  },
	  'material.unitpriceusd': function (newData, oldData) {
		  var added_data = newData - oldData;
		  //this.$emit('add_sub_total_category', added_data);
		  this.calculate_unitpricerp();
		  this.updateTotalInUsd();
	  }
  },
  methods:{
	  onChangeQty: function(){
		  this.saveCostingDetail();
	  },
	  onChangeYield: function(){
		  if(this.material.yield == ""){
			  this.material.yield = 0;
		  }
		  this.saveCostingDetail();
	  },
	  onChangeAllowance: function(){
		  if(this.material.allowance == ""){
			  this.material.allowance = 0;
		  }
		  this.saveCostingDetail();
	  },
	  
	  setCurrencyCostingPrice: function(){
		  if(this.unitpricerp_focused == true){
			  this.new_curr_costing_price = 'IDR';
		  } else if(this.unitpriceusd_focused == true){
			  this.new_curr_costing_price = 'USD';
		  }
	  },
	  
	  resetUnitPriceFocused: function(){
		  this.unitpricerp_focused = false;
		  this.unitpriceusd_focused = false;
		  this.new_curr_costing_price = 0;
	  },
	  
	  onKeydownUnitpricerp: function(){
		  this.unitpricerp_focused = true;
		  this.unitpriceusd_focused = false;
		  this.new_curr_costing_price = "IDR";
	  },
	  onKeydownUnitpriceusd: function(){
		  this.unitpricerp_focused = false;
		  this.unitpriceusd_focused = true;
		  this.new_curr_costing_price = "USD";
	  },
	  
	  onChangeUnitpricerp: function(){
		  this.updateNewMaterialPrice();
	  },
	  onChangeUnitpriceusd: function(){
		  this.updateNewMaterialPrice();
	  },
	  
	  init_unitprice_rp_usd: function () {
		  var unitpricerp = parseFloat( this.material.unitpricerp );
		  unitpricerp = roundTo3( unitpricerp );
		  this.material.unitpricerp = unitpricerp;
		  
		  var unitpriceusd = parseFloat( this.material.unitpriceusd );
		  unitpriceusd = roundTo3( unitpriceusd );
		  this.material.unitpriceusd = unitpriceusd;
		  
		  if( unitpricerp <= 0 && unitpriceusd > 0 ){
			  unitpricerp = unitpriceusd * parseFloat( this.$root.costing.ratevalue );
			  unitpricerp = roundTo3( unitpricerp );
			  this.material.unitpricerp = unitpricerp;
		  } else if ( unitpricerp > 0 && unitpriceusd <= 0 ){
			  unitpriceusd = unitpricerp / parseFloat( this.$root.costing.ratevalue );
			  unitpriceusd = roundTo3( unitpriceusd );
			  this.material.unitpriceusd = unitpriceusd;
		  }
		  
		  this.unitpriceusd = roundTo3( unitpriceusd );
		  this.setCurrencyCostingPrice();
		  
		  return this.unitpriceusd; 
	  },
	  
	  calculate_unitpricerp: function () {
		  this.unitpricerp_focused = false;
		  this.unitpriceusd_focused = true;
		  
		  if( this.new_curr_costing_price == ""  || this.new_curr_costing_price == 'IDR'){
			  var unitpricerp = parseFloat( this.material.unitpricerp );
			  var unitpriceusd = parseFloat( this.material.unitpriceusd );
			  if( unitpricerp <= 0 && unitpriceusd > 0 ){
				  unitpricerp = unitpriceusd * parseFloat( this.$root.costing.ratevalue );
				  unitpricerp = roundTo3( unitpricerp );
				  this.material.unitpricerp = unitpricerp;
			  } else if ( unitpricerp > 0 && unitpriceusd <= 0 ){
				  unitpriceusd = unitpricerp / parseFloat( this.$root.costing.ratevalue );
				  unitpriceusd = roundTo3( unitpriceusd );
				  this.unitpriceusd = unitpriceusd;
				  this.material.unitpriceusd = unitpriceusd;
			  }
		  }else{
			  var unitpricerp = parseFloat( this.material.unitpriceusd ) * parseFloat( this.$root.costing.ratevalue );
			  this.material.unitpricerp = roundTo3( unitpricerp );
			  this.material.unitpricerp;
		  }
		  
	  },
	  calculate_unitpriceusd: function () {
		  this.unitpricerp_focused = true;
		  this.unitpriceusd_focused = false;
		  
		  if( this.new_curr_costing_price == "" || this.new_curr_costing_price == 'USD' ){
			  var unitpricerp = parseFloat( this.material.unitpricerp );
			  var unitpriceusd = parseFloat( this.material.unitpriceusd );
			  if( unitpricerp <= 0 && unitpriceusd > 0 ){
				  unitpricerp = unitpriceusd * parseFloat( this.$root.costing.ratevalue );
				  unitpricerp = roundTo3( unitpricerp );
				  this.material.unitpricerp = unitpricerp;
			  } else if ( unitpricerp > 0 && unitpriceusd <= 0 ){
				  unitpriceusd = unitpricerp / parseFloat( this.$root.costing.ratevalue );
				  unitpriceusd = roundTo3( unitpriceusd );
				  this.unitpriceusd = unitpriceusd;
				  this.material.unitpriceusd = unitpriceusd;
			  }
		  }else{
			  var unitpriceusd = parseFloat( this.material.unitpricerp ) / parseFloat( this.$root.costing.ratevalue );
			  this.material.unitpriceusd = roundTo3( unitpriceusd );
			  this.material.unitpriceusd; 
		  }
		  
	  },
	  
	  updateTotalInUsd: function(){
		  var total_in_usd = parseFloat( this.material.unitpriceusd ) * parseFloat( this.req_qty );
		  this.total_in_usd = roundTo3( total_in_usd );
		  this.material.total = this.total_in_usd;
		  return this.total_in_usd;
	  },
	  decrease_sub_total_category: function(decreased_amount){
		  this.$emit('decrease_sub_total_category', decreased_amount);
	  },
	  saveCostingDetail: function(){
		  Client.message.saving("Saving...");
		  
		  this.material.source = 'Manual';
		  
		  axios({
			  method: 'post',
			  url: url + 'costing/updatedetail_from_printout',
			  data: "material=" + encodeURIComponent( JSON.stringify( this.material ) ),
		  })
	      .then(response => {
	    	  Client.message.savingSuccess("Successfully Saved...");
	      })
	      .catch(error => {
	    	  Client.message.savingError();
	      })
	      .finally(() => {
	      });
	  },
	  updateNewMaterialPrice: function(){
		  Client.message.saving("Updating Price...");
		  this.material.curr_costing_price = this.new_curr_costing_price;
		  this.material.source = 'Manual';
		  
		  axios({
			  method: 'post',
			  url: url + 'costing/update_price_from_printout',
			  data: "material=" + encodeURIComponent( JSON.stringify( this.material ) ),
		  })
	      .then(response => {
	    	  Client.message.savingSuccess("Price Successfully Updated...");
	    	  this.resetUnitPriceFocused();
	      })
	      .catch(error => {
	    	  Client.message.savingError();
	      })
	      .finally(() => {
	      });
	  },
	  show_form_move_material: function(){
		  this.is_show_form_move_material = true;
		  this.move_to_category_id = "";
	  },
	  hide_form_move_material: function(){
		  this.is_show_form_move_material = false;
		  this.move_to_category_id = "";
	  },
	  deleteCostingDetail: function(){
		  if( confirm("Are you sure want to Delete this row?") ){
			  Client.message.saving("Deleting...");
			  axios({
				  method: 'post',
				  url: url + 'costing/deletedetail_from_printout',
				  data: "costingdetail_id=" + this.material.id,
			  })
		      .then(response => {
		    	  // copy to temp before destroy
		    	  var material = this.material;
		    	  //set material selected to null
		    	  this.$root.costingdirectmaterial[ this.index_costingdirectmaterial ].datas.splice( this.index_costingdirectmaterial_datas, 1 , null);
		    	  //decrease_sub_total_category (summary) in kategori lama
				  this.decrease_sub_total_category( material.total );
				  
				  // hide form move
				  this.hide_form_move_material();
				  
		    	  Client.message.savingSuccess("Successfully Deleted...");
		      })
		      .catch(error => {
		    	  Client.message.savingError();
		      })
		      .finally(() => {
		      });
		  }
	  },
	  isMovedMaterialValidated: function(){
		  if( this.move_to_category_id == "" || this.move_to_category_id == undefined ){
			  Client.message.error("Target Category is required..!");
			  return false;
		  }
		  
		  if( this.move_to_category_id == this.material.categoryid ){
			  Client.message.error("Material Allready in the same Category...!");
			  return false;
		  }
		  
		  return true;
	  },
	  move_material: function(){
		  //1. validate 
    	  if( this.isMovedMaterialValidated() ){
			  Client.message.saving("Moving...");
			  var moved_material_param = {
					  "id": this.material.id,
					  "move_to_category_id": this.move_to_category_id,
			  };
			  axios({
				  method: 'post',
				  url: url + 'costing/movedetail_from_printout',
				  data: "moved_material=" + encodeURIComponent( JSON.stringify( moved_material_param ) ),
			  })
		      .then(response => {
			    	  //move material in front end
			    	  var material_moved = this.material;
			    	  material_moved.categoryid = this.move_to_category_id;
			    	  
			    	  // delete from list data in kategori lama
					  this.$root.costingdirectmaterial[ this.index_costingdirectmaterial ].datas.splice( this.index_costingdirectmaterial_datas, 1 , null);
					  
			    	  // insert ke list data in kategori baru
					  for (var i = 0; i < this.$root.costingcategoryall.length; i++) {
			    		  //
			    		  if( this.$root.costingcategoryall[i].id == this.move_to_category_id ){
			    			  //jika category == direct material
			    			  if( this.$root.costingcategoryall[i].isdirectmaterial == 't' ){
			    				  for (var j = 0; j < this.$root.costingdirectmaterial.length; j++) {
			    					  if( this.$root.costingdirectmaterial[j].category.id == this.move_to_category_id){
			    						  //move here
			    						  this.$root.costingdirectmaterial[ j ].datas.push( material_moved );
			    					  }
			    				  }
			    			  }else{
			    				  for (var k = 0; k < this.$root.costingundirectmaterial.length; k++) {
			    					  if( this.$root.costingundirectmaterial[ k ].category.id == this.move_to_category_id){
			    						  //move here
			    						  this.$root.costingundirectmaterial[ k ].datas.push( material_moved );
			    					  }
			    				  }
			    			  }
			    		  }
			    	  }
			    	  
			    	  //decrease_sub_total_category (summary) in kategori lama
					  this.decrease_sub_total_category( material_moved.total );
					  
					  // hide form move
					  this.hide_form_move_material();
					  
			    	  Client.message.savingSuccess("Successfully Moved...");
		      }).catch(error => {
		    	  Client.message.savingError();
		      }).finally(() => { });
			  
    	  }
    	  
	  },
  },
  template: `
		  	<tr class="m-row" v-bind:style="{ backgroundColor: (material.source=='Manual' ? '#ffeb3b':'#fff') }">
				<td style="border: 1px solid black;padding-left: 15px;">
					{{material.materialcode}}
				</td>
				<td style="border: 1px solid black;"><span v-html="material.materialdescription"></span></td>
				<td align="center" style="border: 1px solid black;">{{material.uom}}</td>
				<td align="right" style="border: 1px solid black;">
					<input v-if="! this.$root.is_costing_locked" class="input-editable" style="width:100%;" type="text" v-model="material.qty" v-on:change="onChangeQty" :key="material.id + '_qty_direct'" title="QTY based on BOM"></input>
					<label v-if="this.$root.is_costing_locked">{{material.qty | float3decimalPoint}}</label>
				</td>
				<td align="center" style="border: 1px solid black;">
					<input v-if="! this.$root.is_costing_locked" class="input-editable" style="width:100%;" type="text" v-model="material.yield" v-on:change="onChangeYield" :key="material.id + '_yield_direct'" title="Yield"></input>
					<label v-if="this.$root.is_costing_locked">{{material.yield}}</label>
				</td>
				<td align="center" style="border: 1px solid black;">
					<input v-if="! this.$root.is_costing_locked" class="input-editable" style="width:100%;" type="text" v-model="material.allowance" v-on:change="onChangeAllowance" :key="material.id + '_allowance_direct'" title="Allowance"></input>
					<label v-if="this.$root.is_costing_locked">{{material.allowance}}</label>
				</td>
				<td align="center" style="border: 1px solid black;">{{ get_req_qty | float3decimalPoint}}</td>
				
				<td align="right" style="border: 1px solid black;">
					<input v-if="! this.$root.is_costing_locked" class="input-editable" style="width:100%;" type="text" v-model="material.unitpricerp" v-on:change="onChangeUnitpricerp" v-on:keydown="onKeydownUnitpricerp" :key="material.id + '_unitpricerp_direct'" title="Unit Price Rp"></input>
					<label v-if="this.$root.is_costing_locked">{{material.unitpricerp | float3decimalPoint}}</label>
				</td>
				<td align="right" style="border: 1px solid black;">
					<input v-if="! this.$root.is_costing_locked" class="input-editable" style="width:100%;" type="text" v-model="material.unitpriceusd" v-on:change="onChangeUnitpriceusd" v-on:keydown="onKeydownUnitpriceusd" :key="material.id + '_unitpriceusd_direct'" title="Unit Price USD"></input>
					<label v-if="this.$root.is_costing_locked">{{material.unitpriceusd | float3decimalPoint}}</label>
				</td>
				
				<td align="right" style="border: 1px solid black;">{{ total_in_usd | float3decimalPoint}}</td>
				<td align="center" style="border: 1px solid black; text-align: left; vertical-align: middle; background-color: #fff;">
					<div v-if="! this.$root.is_costing_locked">
						<label v-if="is_show_form_move_material == true"> Move To Cat.:</label>
						<select2 v-if="is_show_form_move_material == true" v-model="move_to_category_id" style="width:100px">
						  <option disabled selected value=""> -- </option>
					      <option :key="index" v-for="(category, index) in $root.costingcategoryall" v-bind:value="category.id"> {{ category.name}} </option>
					    </select2>
					    <br v-if="is_show_form_move_material == true"/>
					    <button style="width: 40%;" v-if="is_show_form_move_material == true" class="btn btn-xs button-move-costing-detail" v-on:click="move_material" :key="'move_material_' + category.id" title="Move">Move</button>
					  	<button style="width: 40%;" v-if="is_show_form_move_material == true" class="btn btn-xs button-delete-costing-detail" v-on:click="hide_form_move_material" :key="'cancel_move_material_' + category.id" title="Cancel">Cancel</button>
					
						<button style="width: 40%;" v-if="! is_show_form_move_material" class="btn btn-xs button-delete-costing-detail" v-on:click="deleteCostingDetail" :key="'delete_material_' + category.id" title="Delete"> X </button>
					  	<button style="width: 40%;" v-if="! is_show_form_move_material" class="btn btn-xs button-move-costing-detail" v-on:click="show_form_move_material" :key="'show_form_move_material_' + category.id" title="Move">Move</button>
					 </div>
				</td>
			</tr>	
	`,
});
