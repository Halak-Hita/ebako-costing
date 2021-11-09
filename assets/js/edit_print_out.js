//global function 
function roundTo3( num ) {    
	//return +(Math.ceil( num + "e+3")  + "e-3" ) || 0;
	return +(Math.round( num + "e+3")  + "e-3" ) || 0;
}

//register global filter
Vue.filter('float3decimalPoint', function (value) {
	//return parseFloat( parseFloat( value || 0 ).toFixed(3) ).toLocaleString("id-ID", {maximumFractionDigits:3});
	value = +(Math.ceil( value + "e+3")  + "e-3" ) || 0;
	return parseFloat( parseFloat( value ).toFixed(3) ).toLocaleString("en-US", {maximumFractionDigits:3});
})

//vue instance
new Vue({
	  el: '#app_costing',
	  data: {
		    costingid : '',
			costing: {},
			is_costing_locked: false,
			costingdirectmaterial:[],
			costingundirectmaterial: [],
			costingcategoryall: [{}],
			costingcategory: [{}],
			costingcategorynotdirect: [{}],
			total_category: 0,
			summary:{
			  total_costingdirectmaterial_in_usd: 0,
			  total_costingundirectmaterial_in_usd: {
				  cat_8_original: 0, //pick list without markup
				  cat_8: 0,  //pick list with mark up
				  cat_9: 0,  //Direct Labor
				  cat_10: 0, //Sub Contractor
			  },
			  variable_mark_up_cat_8: 1.1, //mark up picklist
			  fixed_cost: 0,
			  fixed_cost_value: 0,
			  noname : 0, //profit_percentage
			  factory_cost_and_profit: 0,
			  port_origin_cost: 0,
			  variable_cost: 0,
			  variable_cost_value: 0,
			  subtotal_cat_8_10: 0,
			  fob_price: 0,
			  profit_percentage: 0,
			},
	  },
	  created: function () {
		  this.costingid = active_costingid;
	  },
	  
	  computed: {
		  getNoname : function(){
			  var noname = (100 - (parseFloat(this.costing.fixed_cost) + parseFloat(this.costing.variable_cost) + parseFloat(this.costing.profit_percentage) )) / 100;
			  this.summary.noname = parseFloat( parseFloat( noname || 0 ).toFixed(3) );
			  return this.summary.noname;
		  },
		  get_summary_total_costingundirectmaterial_in_usd_cat_8: function () {
			  this.summary.total_costingundirectmaterial_in_usd.cat_8 = parseFloat( this.summary.total_costingundirectmaterial_in_usd.cat_8_original ) * parseFloat( this.summary.variable_mark_up_cat_8 ); 
			  return this.summary.total_costingundirectmaterial_in_usd.cat_8;
		  },
	  },
	  
	  mounted: function(){
		  this.loadCosting();
	  },
	  watch: {
		  'summary.total_costingdirectmaterial_in_usd': function (newData, oldData) {
			  this.calculate_factory_cost_and_profit();
			  //var added_data = newData - oldData;
			  //this.$emit('calculate_sub_total', added_data);
		  },
		  'summary.factory_cost_and_profit': function (newData, oldData) {
			  this.calculate_fixed_cost_value();
			  this.calculate_port_origin_cost();
			  this.calculate_variable_cost_value();
			  this.calculate_fob_price();
		  },
		  'summary.port_origin_cost': function (newData, oldData) {
			  this.calculate_subtotal_cat_8_10();
		  },
		  'summary.total_costingundirectmaterial_in_usd.cat_8': function (newData, oldData) {
			  this.calculate_subtotal_cat_8_10();
		  },
		  'summary.total_costingundirectmaterial_in_usd.cat_9': function (newData, oldData) {
			  this.calculate_factory_cost_and_profit();
			  this.calculate_subtotal_cat_8_10();
		  },
		  'summary.total_costingundirectmaterial_in_usd.cat_10': function (newData, oldData) {
			  this.calculate_subtotal_cat_8_10();
		  },
		  'summary.subtotal_cat_8_10': function (newData, oldData) {
			  this.calculate_fob_price();
		  },
		  'costing.profit_percentage': function(){
			  this.calculate_noname(); //profit_percentage
			  this.calculate_factory_cost_and_profit();
		  },
		  'costing.fixed_cost': function(){
			  this.calculate_noname(); //profit_percentage
			  this.calculate_factory_cost_and_profit();
		  },
		  'costing.variable_cost': function(){
			  this.calculate_noname(); //profit_percentage
			  this.calculate_factory_cost_and_profit();
		  },
	  },
	  methods: {
		  resetCosting: function(){
				this.costingdirectmaterial= [];
				this.costingundirectmaterial= []
				this.costingcategoryall= [];
				this.costingcategory= [{}];
				this.costingcategorynotdirect= [{}];
				this.total_category= 0;
				this.summary.total_costingdirectmaterial_in_usd= 0;
				
				this.summary.total_costingundirectmaterial_in_usd.cat_8_original= 0;
				this.summary.total_costingundirectmaterial_in_usd.cat_8= 0;
				this.summary.total_costingundirectmaterial_in_usd.cat_9= 0;
				this.summary.total_costingundirectmaterial_in_usd.cat_10= 0;
				
				this.summary.variable_mark_up_cat_8 = 1.1; //mark up picklist
				this.summary.fixed_cost = 0;
				this.summary.fixed_cost_value = 0;
				this.summary.noname = 0;
				this.summary.factory_cost_and_profit = 0;
				this.summary.port_origin_cost = 0;
				this.summary.variable_cost = 0;
				this.summary.variable_cost_value = 0;
				this.summary.subtotal_cat_8_10 = 0;
				this.summary.fob_price = 0;
				this.summary.profit_percentage = 0;
				
	    	  Object.assign(this.$data, this.$options.data.apply(this));
		  },
		  loadCosting: function( onLoadSuccess ){
			  
			  Client.message.saving("Loading All Material, please wait...");
			  
			  axios.get(url + 'costing/load_costing/' + this.costingid + "/0")
		      .then(response => {
		    	  
		    	  this.costing = response.data.costing;
		    	  this.costingdirectmaterial = response.data.costing_directmaterial;
		    	  this.costingundirectmaterial = response.data.costing_undirectmaterial;
		    	  this.costingcategoryall = response.data.costingcategoryall;
		    	  this.costingcategory = response.data.costingcategory;
		    	  this.costingcategorynotdirect = response.data.costingcategorynotdirect;
		    	  
		    	  if( this.costing.locked=='t' ){
		    		  this.is_costing_locked = true;
		    	  }
		    	  
		    	  this.calculate_noname(); //profit_percentage
		    	  
		    	  if(undefined != this.costing.variable_mark_up_cat_8){
		    		  this.summary.variable_mark_up_cat_8 = this.costing.variable_mark_up_cat_8;
		    	  }
		    	  
		    	  if( undefined != onLoadSuccess && typeof onLoadSuccess =='function' ){
		    		  onLoadSuccess();
		    	  }
		    	  
		    	  Client.message.success("All Material Successfully Loaded...");
		    	  
		      }).catch(error => {
		    	  console.log("error", error);
		    	  Client.message.error("Loading Error...");
		      }).finally(() => {});
		  },
		  calculate_noname : function(){
			  var noname = (100 - (parseFloat(this.costing.fixed_cost) + parseFloat(this.costing.variable_cost) + parseFloat(this.costing.profit_percentage) )) / 100;
			  this.summary.noname = parseFloat( parseFloat( noname || 0 ).toFixed(3) );
			  return this.summary.noname;
		  },
		  calculate_factory_cost_and_profit: function(){
			  var factory_cost_and_profit = ( parseFloat(this.summary.total_costingdirectmaterial_in_usd) + parseFloat(this.summary.total_costingundirectmaterial_in_usd.cat_9) ) / parseFloat(this.summary.noname);
			  this.summary.factory_cost_and_profit = parseFloat( parseFloat( factory_cost_and_profit || 0 ).toFixed(3) );
			  return this.summary.factory_cost_and_profit;
		  }, 
		  calculate_total_costingdirectmaterial: function ( amount ) {
			  this.summary.total_costingdirectmaterial_in_usd = this.addFloat( this.summary.total_costingdirectmaterial_in_usd, amount );
		  },
		  calculate_total_costingundirectmaterial: function ( amount, category_id ) {
			  if( category_id == "8" ){
				  $total_cost_cat = this.addFloat( this.summary.total_costingundirectmaterial_in_usd[ "cat_"+category_id + "_original" ], amount );
				  this.summary.total_costingundirectmaterial_in_usd[ "cat_" + category_id + "_original" ] = $total_cost_cat;
				  
				  var result_cat_8 = parseFloat($total_cost_cat) * parseFloat( this.summary.variable_mark_up_cat_8 );
				  this.summary.total_costingundirectmaterial_in_usd[ "cat_"+category_id ] = parseFloat( parseFloat( result_cat_8 || 0 ).toFixed(3) );
			  }else{
				  $total_cost_cat = this.addFloat( this.summary.total_costingundirectmaterial_in_usd[ "cat_"+category_id ], amount );
				  this.summary.total_costingundirectmaterial_in_usd[ "cat_" + category_id ] = $total_cost_cat;
			  }
		  },
		  calculate_fixed_cost_value : function(){
			  var fixed_cost_value = (parseFloat(this.summary.factory_cost_and_profit) * parseFloat(this.costing.fixed_cost) ) / 100;
			  this.summary.fixed_cost_value = parseFloat( fixed_cost_value && fixed_cost_value.toLocaleString(undefined, {maximumFractionDigits:3}) || 0 );
			  return this.summary.fixed_cost_value;
		  },
		  calculate_port_origin_cost : function(){
			  var port_origin_cost = (parseFloat(this.summary.factory_cost_and_profit) * parseFloat(this.costing.port_origin_cost) ) / 100;
			  this.summary.port_origin_cost = parseFloat( parseFloat( port_origin_cost || 0 ).toFixed(3) );
			  return this.summary.port_origin_cost;
		  },
		  calculate_variable_cost_value : function(){
			  var variable_cost_value = (parseFloat(this.summary.factory_cost_and_profit) * parseFloat(this.costing.variable_cost) ) / 100;
			  this.summary.variable_cost_value = parseFloat( parseFloat( variable_cost_value || 0 ).toFixed(3) );
			  return this.summary.variable_cost_value;
		  },
		  calculate_subtotal_cat_8_10 : function(){
			  var subtotal_cat_8_10 = parseFloat(this.summary.total_costingundirectmaterial_in_usd.cat_8) + parseFloat(this.summary.total_costingundirectmaterial_in_usd.cat_10) + parseFloat(this.summary.port_origin_cost);
			  this.summary.subtotal_cat_8_10 = parseFloat( parseFloat( subtotal_cat_8_10 || 0 ).toFixed(3) );
			  return this.summary.subtotal_cat_8_10;
		  },
		  calculate_fob_price : function(){
			  var fob_price = parseFloat(this.summary.subtotal_cat_8_10) + parseFloat(this.summary.factory_cost_and_profit);
			  this.summary.fob_price = parseFloat( parseFloat( fob_price || 0 ).toFixed(3) );
			  return this.summary.fob_price;
		  },
		  loadAllMaterialFromBOM: function(){
			  this.resetCosting();
			  
			  if(confirm(' Are you sure want to Load All Material from BOM ? ')){
				  
				  Client.message.saving("Loading All Material from BOM...");
				  axios({
					  method: 'get',
					  url: url + 'costing/loadAllMaterialFromBOM/' + this.costingid + '/' + this.costing.modelid,
				  })
			      .then(response => {
			    	  //	reset costing first
			    	  this.resetCosting();
			    	  
			    	  //load costing 
			    	  var onLoadSuccess = function(){
			    		  Client.message.savingSuccess();
			    		  Client.message.success("All Material Successfully Loaded...");
			    	  };
			    	  this.loadCosting( onLoadSuccess );
			      })
			      .catch(error => {
			    	  Client.message.savingError();
			      })
			      .finally(() => {
			      });
				  
			    }
		  },
		  loadAllMaterialFromDefaultMaterial: function(){
			  if(confirm(' Are you sure want to Load All Material From Default Material ? ')){
				  
				  Client.message.saving("Loading All Material from Default...");
				  axios({
					  method: 'get',
					  url: url + 'costing/loadAllMaterialFromDefaultMaterial/' + this.costingid,
				  })
			      .then(response => {
			    	  //reset costing first
			    	  this.resetCosting();
			    	  
			    	  //load costing
			    	  var onLoadSuccess = function(){
			    		  Client.message.savingSuccess();
			    		  Client.message.success("All Material Successfully Loaded from Default Material...");
			    	  };
			    	  this.loadCosting( onLoadSuccess );
			      })
			      .catch(error => {
			    	  Client.message.savingError();
			      })
			      .finally(() => {
			      });
				  
			    }
		  },
		  loadPrice: function(){
			  if(confirm(' Are you sure want to Load and Replace existing Price ? ')){
				  
				  Client.message.saving("Loading Price...");
				  axios({
					  method: 'get',
					  url: url + 'costing/updatematerialprice/' + this.costingid,
				  })
			      .then(response => {
			    	  //reset costing first
			    	  this.resetCosting();
			    	  
			    	  var onLoadSuccess = function(){
			    		  Client.message.savingSuccess();
			    		  Client.message.success("All Price Successfully Loaded...");
			    	  };
			    	  this.loadCosting( onLoadSuccess );
			      })
			      .catch(error => {
			    	  Client.message.savingError();
			      })
			      .finally(() => {
			      });
				  
			    }
		  },
		  onChange_costing_ratevalue: function () {
			  this.saveCostingRateValue();
		  },
		  onChange_costing_profit_percentage: function () {
			  this.saveCostingSummary();
		  },
		  onChange_costing_fixed_cost: function () {
			  this.saveCostingSummary();
		  },
		  onChange_costing_variable_cost: function () {
			  this.saveCostingSummary();
		  },
		  onChange_costing_quo: function (a) {
                           // alert(a);
			  this.saveCostingQuo(a);
		  },
		  
		  
		  saveCostingRateValue: function(){
			  Client.message.saving("Saving Rate Value...");
			  axios({
				  method: 'post',
				  url: url + 'costing/save_ratevalue/' + this.costingid,
				  data: "costing_ratevalue=" + this.costing.ratevalue,
			  })
		      .then(response => {
		    	  Client.message.savingSuccess();
		    	  Client.message.success("Rate Value Successfully Saved...");
		    	  this.loadCosting ();
		      })
		      .catch(error => {
		    	  Client.message.savingError();
		      })
		      .finally(() => {
		      });
		  },
		  saveCostingQuo: function(a){
			  alert(a);
		  },
		  onChange_variable_mark_up_cat_8: function () {
			  this.summary.total_costingundirectmaterial_in_usd.cat_8 = parseFloat( this.summary.total_costingundirectmaterial_in_usd.cat_8_original ) * parseFloat( this.summary.variable_mark_up_cat_8 );
			  this.saveCostingSummary();
		  },
		  saveCostingSummary: function(){
			  Client.message.saving("Saving Summary...");
			  
			  this.summary.profit_percentage = this.costing.profit_percentage;
			  this.summary.fixed_cost = this.costing.fixed_cost;
			  this.summary.variable_cost = this.costing.variable_cost
			  
			  axios({
				  method: 'post',
				  url: url + 'costing/savefobprice_from_print_out/' + this.costingid,
				  data: "costing_summary=" + encodeURIComponent( JSON.stringify( this.summary ) ),
			  })
		      .then(response => {
		    	  Client.message.savingSuccess();
		    	  Client.message.success("Summary Successfully Saved...");
		      })
		      .catch(error => {
		    	  Client.message.savingError();
		      })
		      .finally(() => {
		      });
		  },
		  
		  lockCosting: function(){
			  if( confirm("Are you sure want to Lock this Costing ?") ){
				  Client.message.saving("Locking...");
				  axios({
					  method: 'post',
					  url: url + 'costing/lock_from_printout',
					  data: "costingid=" + this.costingid,
				  })
				  .then(response => {
					  this.is_costing_locked = true;
					  Client.message.savingSuccess( "Successfully Locked..." );
				  })
				  .catch(error => {
					  Client.message.savingError();
				  })
				  .finally(() => {
				  });
			  }
		  },
		  unlockCosting: function(){
			  if( confirm("Are you sure want to UnLock this Costing ?") ){
				  Client.message.saving("UnLocking...");
				  axios({
					  method: 'post',
					  url: url + 'costing/unlock_from_printout',
					  data: "costingid=" + this.costingid,
				  })
			      .then(response => {
			    	  this.is_costing_locked = false;
			    	  Client.message.savingSuccess( "Successfully UnLocked..." );
			      })
			      .catch(error => {
			    	  Client.message.savingError();
			      })
			      .finally(() => {
			      });
			  }
		  },
		  
		  print: function(data) {
		  },
		  parseFloat: function( string_number ){
		      return parseFloat( parseFloat( string_number || 0 ).toFixed(3) );
		  },
		  addFloat: function( float1, float2 ){
			  float1 = this.parseFloat( float1 );
			  float2 = this.parseFloat( float2 );
			  var result = this.parseFloat( (float1 + float2) );
			  return result; 
		  },
		  decreaseFloat: function( floatSource, amount ){
			  floatSource = this.parseFloat( floatSource );
			  amount = this.parseFloat( amount );
			  var result = this.parseFloat( (floatSource - amount) );
			  return result; 
		  },
		  
		  
	  },
	  
})