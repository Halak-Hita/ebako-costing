Vue.component('costingundirectmaterial_newmaterial',{
	  props:['undirectmaterial_row', 'is_show_form', 'index_costingundirectmaterial'],
	  data: function () {
	    return {
	    	sub_total_category: 0,
	    	is_show_form_new_material: false,
	    	new_material:{
	    		id: "",
	    		costingid: "",
	    		categoryid: "",
	    		itemid: "",
	    		materialcode: "",
	    		materialdescription: "",
	    		uom: "",
	    		qty: 0,
	    		yield: 0,
	    		allowance: 0,
	    		req_qty: 0,
	    		total: 0,
	    		total_in_usd: 0,
	    		unitpricerp: 0,
	    		unitpriceusd: 0,
	    		curr_costing_price:'',
	    		curr_costing_price_new:'',
	    		source:'',
	    	},
	    	new_material_reference:{
	    		groups: [],
	    		items: [],
	    		uoms: [],
	    		selected_group_index: null,
	    		selected_item_index: null,
	    		selected_group:{},
	    		selected_item:{},
	    	},
	    	
	    	new_curr_costing_price:'',
	    	unitpricerp_focused: false,
	    	unitpriceusd_focused: false,
	    	
	    	is_show_currency_price_alert: false,
	    }

	  },
	  
	  created: function () {
		  this.is_show_form_new_material = this.is_show_form;
		  this.new_material.categoryid = this.undirectmaterial_row.category.id;
		  this.new_material.costingid = this.$root.costing.id;
		  this.sub_total_category = 0;
	  },
	  
	  computed: {
		  get_req_qty: function () { //priority is allowance
			  if( this.new_material.yield > 0 ){
				  var req_qty = parseFloat( this.new_material.qty ) / parseFloat(this.new_material.yield);
				  
				  // Notes: jika Category == Finishing, rumusnya di kali
				  if( this.new_material.categoryid == "6" || this.new_material.categoryid == 6 ){
					  req_qty = parseFloat( this.new_material.qty ) * parseFloat(this.new_material.yield);
				  }
				  
				  this.new_material.req_qty = roundTo3( req_qty );
			  }else if( this.new_material.allowance >= 0 ){
				  var material_qty = parseFloat( this.new_material.qty );
				  var allowance = parseFloat(this.new_material.allowance);
				  var req_qty = material_qty + ( material_qty * allowance );
				  this.new_material.req_qty = roundTo3( req_qty );
			  }else{
				  this.new_material.req_qty = 0; 
			  }
			  
			  return this.new_material.req_qty;
		  },
		  get_total_in_usd: function () {
			 var total_in_usd = parseFloat( this.new_material.unitpriceusd ) * parseFloat( this.new_material.req_qty );
			 this.new_material.total_in_usd = roundTo3( total_in_usd );
			 this.new_material.total = this.new_material.total_in_usd;
		     return this.new_material.total_in_usd;
		 },
	  },
	  
	  watch: {
		  "is_show_form": function(){
			  if(this.is_show_form == true){
				  this.show_form_new_material();
			  }else{
				  this.hide_form_new_material();
			  }
		  },
		  sub_total_category: function (newData, oldData) {
			  var added_data = newData - oldData;
			  this.$emit( 'calculate_total_costingundirectmaterial', added_data, this.undirectmaterial_row.category.id );
		  },
		  "new_material_reference.selected_group_index": function(newData, oldData){
			  this.onChangeSelectedGroupIndex();
		  },
		  "new_material_reference.selected_item_index": function(newData, oldData){
			  this.onChangeSelectedItemIndex();
		  },
		  "new_material.unitpricerp": function(){
			  //if(this.unitpricerp_focused){
				  this.calculate_unitpriceusd();
			  //}
		  },
		  "new_material.unitpriceusd": function(){
			  //if(this.unitpriceusd_focused){
				  this.calculate_unitpricerp();
			  //}
		  },
		  "new_material.total_in_usd": function (newData, oldData) {
			  var added_data = newData - oldData;
			  this.$emit('add_sub_total_category', added_data);
		  },
	  },
	  
	  methods: {
		  onChangeYield: function(){
			  if(this.new_material.yield == 0){
				  this.new_material.yield = "";
			  }
		  },
		  onChangeAllowance: function(){
			  if(this.new_material.allowance == 0){
				  //this.new_material.allowance = "";
			  }
		  },
		  onChangeUnitpricerp: function(){
			  if(this.unitpricerp_focused == true){
				  if( this.new_material.curr_costing_price == '' || this.new_material.curr_costing_price == null || this.new_material.curr_costing_price == undefined ){
					  this.new_material.curr_costing_price_new = 'IDR';
				  }
			  }	  
		  },
		  onChangeUnitpriceusd: function(){
			  if(this.unitpriceusd_focused == true){
				  if( this.new_material.curr_costing_price == '' || this.new_material.curr_costing_price == null || this.new_material.curr_costing_price == undefined ){
					  this.new_material.curr_costing_price_new = 'USD';
				  }
			  } 
		  },
		  resetFocusedUnitprice: function(){
			  this.unitpricerp_focused = false;
			  this.unitpriceusd_focused = false;
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
		  calculate_unitpricerp: function () {
			  this.unitpricerp_focused = false;
			  this.unitpriceusd_focused = true;
			  
			  if( this.new_curr_costing_price == ""  || this.new_curr_costing_price == 'IDR'){
				  var unitpricerp = parseFloat( this.new_material.unitpricerp );
				  var unitpriceusd = parseFloat( this.new_material.unitpriceusd );
				  if( unitpricerp <= 0 && unitpriceusd > 0 ){
					  unitpricerp = unitpriceusd * parseFloat( this.$root.costing.ratevalue );
					  unitpricerp = roundTo3( unitpricerp );
					  this.new_material.unitpricerp = unitpricerp;
				  } else if ( unitpricerp > 0 && unitpriceusd <= 0 ){
					  unitpriceusd = unitpricerp / parseFloat( this.$root.costing.ratevalue );
					  unitpriceusd = roundTo3( unitpriceusd );
					  this.new_material.unitpriceusd = unitpriceusd;
				  }
			  }else{
				  var unitpricerp = parseFloat( this.new_material.unitpriceusd ) * parseFloat( this.$root.costing.ratevalue );
				  this.new_material.unitpricerp = roundTo3( unitpricerp );
			  }
			  
		  },
		  calculate_unitpriceusd: function () {
			  this.unitpricerp_focused = true;
			  this.unitpriceusd_focused = false;
			  
			  if( this.new_curr_costing_price == "" || this.new_curr_costing_price == 'USD' ){
				  var unitpricerp = parseFloat( this.new_material.unitpricerp );
				  var unitpriceusd = parseFloat( this.new_material.unitpriceusd );
				  if( unitpricerp <= 0 && unitpriceusd > 0 ){
					  unitpricerp = unitpriceusd * parseFloat( this.$root.costing.ratevalue );
					  unitpricerp = roundTo3( unitpricerp );
					  this.new_material.unitpricerp = unitpricerp;
				  } else if ( unitpricerp > 0 && unitpriceusd <= 0 ){
					  unitpriceusd = unitpricerp / parseFloat( this.$root.costing.ratevalue );
					  unitpriceusd = roundTo3( unitpriceusd );
					  this.new_material.unitpriceusd = unitpriceusd;
				  }
			  }else{
				  var unitpriceusd = parseFloat( this.new_material.unitpricerp ) / parseFloat( this.$root.costing.ratevalue );
				  this.new_material.unitpriceusd = roundTo3( unitpriceusd );
			  }
			  
		  },
		  add_sub_total_category: function ( amount ) {
			  this.sub_total_category = this.$root.addFloat( this.sub_total_category, amount );
		  },
		  show_form_new_material: function () {
			  this.is_show_form_new_material = true;
			  this.init_new_material_reference();
		  },
		  hide_form_new_material: function () {
			  this.is_show_form_new_material = false;
			  this.reset_new_material_reference();
			  this.is_show_currency_price_alert = false;
			  this.$emit('hide_form_new_material', false);
		  },
		  onChangeSelectedGroupIndex: function(){
			  this.new_material_reference.items = [];
			  this.new_material_reference.selected_group = {};
			  
			  if(this.new_material_reference.selected_group_index != null){
				  this.new_material_reference.selected_group = this.new_material_reference.groups[ this.new_material_reference.selected_group_index ];
			  }
			  
			  this.new_material_reference.selected_item = {};
			  this.new_material_reference.selected_item_index = null;
		  },
		  changeItemsOf_new_material_reference: function( datas ){
			  this.new_material_reference.items = datas.items;
		  },
		  onChangeSelectedItemIndex: function(){
			  if(this.new_material_reference.selected_item_index != "" 
				 && this.new_material_reference.selected_item_index != undefined 
				 && this.new_material_reference.selected_item_index != null){
				  
				  var i;
				  for (i = 0; i < this.new_material_reference.items.length; i++) { 
				      if( this.new_material_reference.items[i].id == this.new_material_reference.selected_item_index ){
				    	  this.new_material_reference.selected_item = this.new_material_reference.items[i];
				    	  break;
				      }
				  }
				  
				  this.new_material.itemid = this.new_material_reference.selected_item.id;
				  this.new_material.materialcode = this.new_material_reference.selected_item.partnumber;
				  this.new_material.materialdescription = this.new_material_reference.selected_item.descriptions;
				  
				  this.unitpricerp_focused = true;
				  var price = this.new_material_reference.selected_item.price;
				  var currency = this.new_material_reference.selected_item.curr;
				  if( undefined == price || price < 0 || undefined == currency || currency == "" ){
					  this.is_show_currency_price_alert = true;
					  this.new_material.source = 'Manual';
				  }else{
					  this.is_show_currency_price_alert = false;
					  this.new_material.source = '';
				  }
				  
				  this.new_material.curr_costing_price = currency;
				  
				  if( currency == 'USD' ){
					  this.new_material.unitpriceusd = roundTo3( price );
					  this.calculate_unitpricerp();
				  }else{
					  this.new_material.unitpricerp = roundTo3( price );
					  this.calculate_unitpriceusd();
				  }
				  
			  }else{
				  this.unitpricerp_focused = true;
				  this.new_material.unitpricerp = 0;
				  this.is_show_currency_price_alert = false;
			  }
		  },
		  init_new_material_reference: function(){
			  this.loadGroups();
			  this.loadUoms();
		  },
		  loadGroups: function(){
			  axios.get(url + 'groups/lists')
			  .then(response => {
				  this.new_material_reference.groups = response.data.groups;
			  })
			  .catch(error => {
				  Client.message.error();
			  }).finally(() => {});
		  },
		  loadUoms: function(){
			  axios.get(url + 'unit/lists')
		      .then(response => {
		    	  this.new_material_reference.uoms = response.data.uoms;
		      })
		      .catch(error => {
		    	Client.message.error();
		      }).finally(() => {});
		  },
		  reset_new_material_reference: function(){
			  this.new_material_reference.groups = [];
			  this.new_material_reference.items = [];
			  this.new_material_reference.uoms = [];
			  this.new_material_reference.selected_group = {};
			  this.new_material_reference.selected_item = {};
			  this.new_material_reference.selected_item_index = null;
			  this.new_material_reference.selected_group_index = null;
			  this.new_material = {
					costingid: "",
		    		categoryid: "",
		    		itemid: "",
		    		materialcode: "",
		    		materialdescription: "",
		    		uom: "",
		    		qty: "",
		    		yield: "",
		    		allowance: "",
		    		req_qty: "",
		    		total: 0,
		    		total_in_usd: 0,
		    		unitpricerp: 0,
		    		unitpriceusd: 0,
		    		curr_costing_price:'',
		    		curr_costing_price_new:'',
		    		source:'',
		    	};
			  this.new_material.categoryid = this.undirectmaterial_row.category.id;
			  this.new_material.costingid = this.$root.costing.id;
			  this.sub_total_category = 0;
		  },
		  isNewMaterialValidated: function(){
			  if( this.new_material.itemid == "" || this.new_material.itemid == undefined ){
				  Client.message.error("Item/Material is required..!");
				  return false;
			  }
			  if( this.new_material.uom == "" || this.new_material.uom == undefined ){
				  Client.message.error("UOM is required..!");
				  return false;
			  }
			  
			  var unitpricerp = parseFloat( this.new_material.unitpricerp );
			  unitpricerp = roundTo3( unitpricerp );
			  
			  if( unitpricerp <= 0 ){
				  Client.message.error("Unit Price is required..!");
				  return false;
			  }
			  
			  return true;
		  },
		  save_new_material: function(){
			  if( this.new_material.yield == 0 ){ //avoid invinity
				  this.new_material.yield = "";
			  }
			  if( this.new_material.allowance == 0 ){
				  //this.new_material.allowance = "";
			  }
			  
			  if( this.new_material.curr_costing_price == null || this.new_material.curr_costing_price == undefined ){
				  this.new_material.curr_costing_price = this.new_material.curr_costing_price_new;
			  }
			  
			  //validate new material first before store to DB
			  if( this.isNewMaterialValidated() ){
				  Client.message.saving("Saving New Material to '" + this.undirectmaterial_row.category.name + "'...");
				  
				  this.new_material.source = "Manual";
				  
				  axios({
					  method: 'post',
					  url: url + 'costing/savedetail_from_printout',
					  data: "new_material=" + encodeURIComponent( JSON.stringify( this.new_material ) ),
				  })
			      .then(response => {
			    	  //update id new_material from inserted_DB
			    	  this.new_material.id = response.data.new_inserted_costingdetail_id;
			    	  // add new_material at first index of "costingdirectmaterial"
					  this.$root.costingundirectmaterial[ this.index_costingundirectmaterial ].datas.push( this.new_material );
					  this.hide_form_new_material();
					  Client.message.savingSuccess("New material successfully saved...");
			      })
			      .catch(error => {
			    	  Client.message.savingError();
			      })
			      .finally(() => { });
			  }
			  
		  },
	  },
	  
	  template: `
		  <tr class="m-row" style="background-color: #16ff25;" v-if="is_show_form_new_material">
				<td style="border: 1px solid black;" colspan="2">
					Group:<br/>
					<select2 v-model="new_material_reference.selected_group_index" style="width:60%">
				      <option disabled selected value=""> -- </option>
				      <option :key="index" v-for="(group, index) in new_material_reference.groups" v-bind:value="index"> {{ group.codes+" - "+ group.names }} </option>
				    </select2>
				    
				    <br/>
				    
				    Item/Material:
				    <br/>
					<select2remotedata 
				    	v-model="new_material_reference.selected_item_index" 
				    	v-bind:url="'item/listByGroupForSelection_new_material/' + (new_material_reference.selected_group.id == undefined ? '-1' : new_material_reference.selected_group.id) "
				    	@onLaodData="changeItemsOf_new_material_reference" 
				    	style="width:100%;max-width: 300px;">
				    
				    	<option disabled selected value=""> -- </option>
				    	
					</select2remotedata>
				
				</td>
				
				<td style="border: 1px solid black;vertical-align: bottom;text-align:left;">
					UOM:
					<select2 v-model="new_material.uom" style="width:100px">
					  <option disabled selected value=""> -- </option>
				      <option :key="index" v-for="(uom, index) in new_material_reference.uoms" v-bind:value="uom.codes"> {{ uom.codes +' - '+ uom.names}} </option>
				    </select2>
				</td>
				
				<td align="center" style="border: 1px solid black; vertical-align: bottom;">
					<input class="input-editable" style="width:100%;height: 28px;" type="text" v-model="new_material.qty" :key="'new_material.qty_direct' + undirectmaterial_row.category.id" title="Qty" placeholder="qty"></input>
				</td>
				<td align="center" style="border: 1px solid black; vertical-align: bottom;">
					<input class="input-editable" style="width:100%;height: 28px;" type="text" v-model="new_material.yield" v-on:change="onChangeYield" :key="'new_material.yield_direct' + undirectmaterial_row.category.id" title="Yield" placeholder="yield"></input>
				</td>
				<td align="center" style="border: 1px solid black; vertical-align: bottom;">
					<input class="input-editable" style="width:100%;height: 28px;" type="text" v-model="new_material.allowance" v-on:change="onChangeAllowance" :key="'new_material.allowance_direct' + undirectmaterial_row.category.id" title="Allowance" placeholder="allowance"></input>
				</td>
				<td align="center" style="border: 1px solid black; vertical-align: bottom;padding-bottom: 9px;"> {{ get_req_qty | float3decimalPoint}} </td>
				
				<td align="right" style="border: 1px solid black; vertical-align: bottom;">
					<span v-if="is_show_currency_price_alert == true" style="color:#ff0000;font-size:8px;"><i>No Currency & Price of Item</i><br/></span>
					<input class="input-editable" style="width:100%;height: 28px;" type="text" v-model="new_material.unitpricerp" v-on:change="onChangeUnitpricerp" v-on:keydown="onKeydownUnitpricerp" :key="'new_material.unitpricerp_undirect' + undirectmaterial_row.category.id" title="Price RP"></input>
				</td>
				
				<td align="right" style="border: 1px solid black; vertical-align: bottom;">
					<span v-if="is_show_currency_price_alert == true" style="color:#ff0000;font-size:8px;"><i>No Currency & Price of Item</i><br/></span>
					<input class="input-editable" style="width:100%;height: 28px;" type="text" v-model="new_material.unitpriceusd" v-on:change="onChangeUnitpriceusd" v-on:keydown="onKeydownUnitpriceusd" :key="'new_material.unitpriceusd_undirect' + undirectmaterial_row.category.id" title="Price USD"></input>
				</td>
				
				<td align="right" style="border: 1px solid black; vertical-align: bottom;padding-bottom: 9px;">{{ get_total_in_usd | float3decimalPoint}}</td>
				<td align="center" style="border: 1px solid black; text-align: left; vertical-align: bottom;">
					<button style="width: 90%;" class="btn btn-xs button-new-costing-detail" v-on:click="save_new_material" :key="'save_new_material_' + undirectmaterial_row.category.id">Save</button>
					<button style="width: 90%;" class="btn btn-xs button-add-costing-detail button-cancel-costing-detail" v-on:click="hide_form_new_material" :key="'hide_form_new_material_' + undirectmaterial_row.category.id">Cancel</button>
				</td>
		  </tr>
	  `,
});
