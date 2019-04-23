<template>
	<span class="wkn-cal-grid-item-extra">
		<input type="checkbox" class="wkn-cal-checkbox"
		       :id="id"
		       :disabled="disabled"
					 :value="value"
					 v-model="model"
					 @change="updateValue(value)"
		>
			<label :for="id">{{label}}</label>
	</span>
</template>


<script>
	export default {
		model: {
			prop: 'checked',
			event: 'change'
		},
		props: ['id', 'label', 'value', 'model' ,'disabled'],
		data() {
			return {}
		},
		methods: {
			updateValue: function (value) {
				this.$emit('input', value)
			}
		},
	}
</script>
