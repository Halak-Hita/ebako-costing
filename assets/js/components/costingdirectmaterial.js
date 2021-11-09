Vue.component('costingdirectmaterial',{
	  props:['directmaterial_row', "index_costingdirectmaterial"],
	  
	  data: function () {
	    return {
	    	sub_total_category: 0,
	    	is_show_form_new_material: false,
	    }
	  },
	  
	  created: function () {
		  this.sub_total_category = 0;
	  },
	  
	  computed: {},
	  
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
		  reset_sub_total_category: function () {
			  this.sub_total_category = 0;
		  },
	  },
	  
	  watch: {
		  sub_total_category: function (newData, oldData) {
			  var added_data = newData - oldData;
			  this.$emit('calculate_total_costingdirectmaterial', added_data);
		  },
	  },
	  
	  template: `
	  	<tbody>
		  <tr>
		  	<td bgcolor="#e9efe8" style="font-size: 11px;border:1px solid black;">
		  		&nbsp;<b>{{directmaterial_row.category.name}}</b>
		  	</td>
		  	<td colspan="10" bgcolor="#e9efe8" style="font-size: 11px;border:1px solid black;">
		  		<button v-if="! this.$root.is_costing_locked" v-on:click="show_form_new_material" :key="'button_add_new_material_' + directmaterial_row.category.id" class="btn btn-xs button-add-costing-detail">+ add</button>
		  	</td>
		  </tr>
	
		  <costingdirectmaterial_newmaterial 
		  		v-if="! this.$root.is_costing_locked" 
		  		@add_sub_total_category="add_sub_total_category" 
		  		@hide_form_new_material="hide_form_new_material" 
		  		v-bind:is_show_form="is_show_form_new_material" 
		  		v-bind:directmaterial_row="directmaterial_row" 
		  		v-bind:index_costingdirectmaterial="index_costingdirectmaterial"
		  > </costingdirectmaterial_newmaterial>
	      
		  <directmaterial 
		  		@add_sub_total_category="add_sub_total_category" 
		  		@decrease_sub_total_category="decrease_sub_total_category" 
		  		:key="index" 
		  		v-for="(material, index) in directmaterial_row.datas" 
		  		v-if="material != null" 
		  		v-bind:material="material" 
		  		v-bind:category="directmaterial_row.category" 
		  		v-bind:index_costingdirectmaterial="index_costingdirectmaterial" 
		  		v-bind:index_costingdirectmaterial_datas="index"
		  > </directmaterial>
		  
		  <tr>
	          <td colspan="9" align="right" style="border:1px solid black;"><b>Sub Total</b></td>
	          <td align="right" bgcolor="#dfdfe1" style="border:1px solid black;" >{{ sub_total_category | float3decimalPoint }}</td>            
	          <td style="border: 1px solid black;">&nbsp;</td>        
	      </tr>
		</tbody>  
	  `,
});
