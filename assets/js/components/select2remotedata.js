Vue.component('select2remotedata', {
  props:['url'],
  
  mounted: function () {
	var vm = this
	$(this.$el).select2({
  	  	ajax: {
			    url: url + this.url,
			    delay: 250,
			    dataType: 'json',
			    data: function (params) {
			      var query = {
			        term: params.term,
			      }
			      return query;
			    },
			    processResults: function (data) {
			    	var datas = data.datas;
			    	vm.$emit("onLaodData", datas);
			    	return {
        		        results: datas.options
        		    };
        		    
  		    },
  		    
		  },
    })
    .trigger('change')
    .on('change', function () {
  	  vm.$emit('input', this.value)
    });
	
  },
  
  watch: {
	  'url': function (value) {
		    var vm = this
		    $(this.$el).empty().select2({ data: [] });
		    $(this.$el).select2({
		    	  ajax: {
					    url: url + this.url,
					    delay: 250,
					    dataType: 'json',
					    data: function (params) {
					      var query = {
					        term: params.term,
					      }
					      return query;
					    },
					    processResults: function (data) {
					    	var datas = data.datas;
					    	vm.$emit("onLaodData", datas);
					    	return {
		          		        results: datas.options
		          		    };
		          		    
		    		    },
		    		    
				  },
		      })
		      .trigger('change')
		      .on('change', function () {
		    	  vm.$emit('input', this.value)
		      });
		},
  },
  
  destroyed: function () {
    $(this.$el).off().select2('destroy');
  },
  template: `
	  <select>
	  	<slot></slot>
	  </select>
  `,
})