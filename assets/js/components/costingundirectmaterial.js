Vue.component('costingundirectmaterial',{
	  props:['undirectmaterial_row', "index_costingundirectmaterial"],
	  
	  data: function () {
	    return {
	    	sub_total_category: 0,
	    	is_show_form_new_material: false,
	    	picklist_ratevalue: 0,
	    }
	  },
	  
	  created: function () {
		  this.picklist_ratevalue = this.$root.costing.picklist_ratevalue;
	  },
	  
	  computed: {
	  },
	  
	  methods: {
		  add_sub_total_category: function ( amount ) {
			  this.sub_total_category = this.$root.addFloat( this.sub_total_category, amount );
		  },
		  decrease_sub_total_category: function ( amount ) {
			  this.sub_total_category = this.$root.decreaseFloat( this.sub_total_category, amount );
		  },
		  show_form_new_material: function () {
			  this.is_show_form_new_material = true;
		  },
		  hide_form_new_material: function () {
			  this.is_show_form_new_material = false;
		  },
		  onChange_picklist_ratevalue: function () {
			  this.savePicklistRateValue();
		  },
		  savePicklistRateValue: function(){
			  Client.message.saving("Saving Picklist Rate Value...");
			  axios({
				  method: 'post',
				  url: url + 'costing/save_picklist_ratevalue/' + this.$root.costing.id,
				  data: "picklist_ratevalue=" + this.picklist_ratevalue,
			  })
		      .then(response => {
		    	  Client.message.savingSuccess();
		    	  Client.message.success("Picklist Rate Value Successfully Saved...");
		    	  
		    	  this.$root.costing.picklist_ratevalue = this.picklist_ratevalue;
		    	  
		    	  this.$root.loadCosting ();
		      })
		      .catch(error => {
		    	  Client.message.savingError();
		      })
		      .finally(() => {
		      });
		  },
	  },
	  
	  watch: {
		  sub_total_category: function (newData, oldData) {
			  var added_data = newData - oldData;
			  this.$emit('calculate_total_costingundirectmaterial', added_data, this.undirectmaterial_row.category.id);
		  }
	  },
	  
	  template: `
	  	<tbody>
		  <tr>
		  	<td bgcolor="#e9efe8" style="font-size: 11px;border:1px solid black;">
		  		&nbsp;<b>{{undirectmaterial_row.category.name}}</b>
		  	</td>
		  	<td v-if="this.undirectmaterial_row.category.id != '8'" colspan="10" bgcolor="#e9efe8" style="font-size: 11px;border:1px solid black;">
		  		<button v-if="!this.$root.is_costing_locked" v-on:click="show_form_new_material" :key="'button_add_new_material_' + undirectmaterial_row.category.id" class="btn btn-xs button-add-costing-detail">+ add</button>
		  	</td>
		  	
		  	<td v-if="this.undirectmaterial_row.category.id == '8'" colspan="7" bgcolor="#e9efe8" style="font-size: 11px;border:1px solid black;">
		  		<button v-if="!this.$root.is_costing_locked" v-on:click="show_form_new_material" :key="'button_add_new_material_' + undirectmaterial_row.category.id" class="btn btn-xs button-add-costing-detail">+ add</button>
		  	</td>
		  	<td v-if="this.undirectmaterial_row.category.id == '8'" colspan="3" bgcolor="#e9efe8" style="font-size: 11px;border:1px solid black;">
			  	<span v-if="this.undirectmaterial_row.category.id == '8'"> Picklist Rate:</span>
			  	<input style="width:50px;background-color: #cdffc2;border: 1px solid #5b9252;" type="text" 
			  		v-if="!this.$root.is_costing_locked" 
			  		v-model="picklist_ratevalue" 
			  		v-on:change="onChange_picklist_ratevalue" 
			  		:key="'picklist_ratevalue'"
			  	>
			  	<label v-if="this.$root.costing.is_costing_locked">{{this.$root.costing.picklist_ratevalue | float3decimalPoint}}</label>
		  	</td>
		  	
		  </tr>
		  
		  <costingundirectmaterial_newmaterial 
		  		v-if="! this.$root.is_costing_locked && undirectmaterial_row.category.id !='9' && undirectmaterial_row.category.id !='8'" 
		  		@add_sub_total_category="add_sub_total_category" 
		  		@hide_form_new_material="hide_form_new_material" 
		  		v-bind:is_show_form="is_show_form_new_material" 
		  		v-bind:undirectmaterial_row="undirectmaterial_row" 
		  		v-bind:index_costingundirectmaterial="index_costingundirectmaterial"
		  > </costingundirectmaterial_newmaterial>
		  
		  <costingundirectmaterial_newmaterial_directlabour 
		  		v-if="! this.$root.is_costing_locked && undirectmaterial_row.category.id=='9'" 
		  		@add_sub_total_category="add_sub_total_category" 
		  		@hide_form_new_material="hide_form_new_material" 
		  		v-bind:is_show_form="is_show_form_new_material" 
		  		v-bind:undirectmaterial_row="undirectmaterial_row" 
		  		v-bind:index_costingundirectmaterial="index_costingundirectmaterial"
		  > </costingundirectmaterial_newmaterial_directlabour>
		  
		  <costingundirectmaterial_newmaterial_picklist
	  		v-if="! this.$root.is_costing_locked && undirectmaterial_row.category.id=='8'" 
	  		@add_sub_total_category="add_sub_total_category" 
	  		@hide_form_new_material="hide_form_new_material" 
	  		v-bind:is_show_form="is_show_form_new_material" 
	  		v-bind:undirectmaterial_row="undirectmaterial_row" 
	  		v-bind:index_costingundirectmaterial="index_costingundirectmaterial"
	  	  > </costingundirectmaterial_newmaterial_picklist>
		  
		  <undirectmaterial 
		  		@add_sub_total_category="add_sub_total_category" 
		  		@decrease_sub_total_category="decrease_sub_total_category" 
		  		:key="index" 
		  		v-for="(material, index) in undirectmaterial_row.datas" 
		  		v-if="material != null" 
	  			v-bind:material="material" 
		  		v-bind:category="undirectmaterial_row.category" 
		  		v-bind:index_costingundirectmaterial="index_costingundirectmaterial" 
		  		v-bind:index_costingundirectmaterial_datas="index"
		  > </undirectmaterial>
		  
		  <tr>
	          <td colspan="9" align="right" style="border:1px solid black;"><b>Sub Total</b></td>
	          <td align="right" bgcolor="#dfdfe1" style="border:1px solid black;" >{{ sub_total_category | float3decimalPoint }}</td>            
	          <td Style="border: 1px solid black;">&nbsp;</td>        
	      </tr>
		</tbody>  
	  `,
});
