Vue.component('select2', {
  mounted: function () {
    var vm = this
    $(this.$el)
      .select2()
      .trigger('change')
      .on('change', function () {
    	  vm.$emit('input', this.value)
      })
  },
  destroyed: function () {
    $(this.$el).off().select2('destroy')
  },
  template: `
	  <select>
	  	<slot></slot>
	  </select>
  `,
})